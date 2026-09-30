import { mkdir, writeFile } from "node:fs/promises";
import { isIP } from "node:net";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import QRCode from "qrcode";

export const QR_OPTIONS = Object.freeze({
  errorCorrectionLevel: "Q",
  margin: 4,
  color: {
    dark: "#171c1f",
    light: "#ffffff",
  },
});

const PNG_OPTIONS = Object.freeze({ ...QR_OPTIONS, width: 1024, type: "png" });
const SVG_OPTIONS = Object.freeze({ ...QR_OPTIONS, type: "svg" });

function isPrivateIpv4(hostname) {
  const octets = hostname.split(".").map(Number);
  if (octets.length !== 4 || octets.some((part) => part < 0 || part > 255)) return false;

  const [first, second] = octets;
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    first >= 224
  );
}

function isPrivateIpv6(hostname) {
  const address = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  const sides = address.split("::");
  if (sides.length > 2) return false;

  const parseSide = (side) => {
    if (!side) return [];
    return side.split(":").flatMap((part, index, parts) => {
      if (!part.includes(".")) return [Number.parseInt(part, 16)];
      if (index !== parts.length - 1) return [];
      const octets = part.split(".").map(Number);
      if (octets.length !== 4 || octets.some((octet) => octet < 0 || octet > 255)) return [];
      return [(octets[0] << 8) | octets[1], (octets[2] << 8) | octets[3]];
    });
  };

  const left = parseSide(sides[0]);
  const right = parseSide(sides[1]);
  const missingGroups = 8 - left.length - right.length;
  if ((sides.length === 1 && missingGroups !== 0) || missingGroups < 0) return false;
  const groups = [...left, ...Array.from({ length: missingGroups }, () => 0), ...right];
  if (groups.length !== 8) return false;

  if (address === "::" || (groups.slice(0, 7).every((group) => group === 0) && groups[7] === 1)) {
    return true;
  }

  const firstGroup = groups[0];
  if ((firstGroup & 0xfe00) === 0xfc00) return true;
  if ((firstGroup & 0xffc0) === 0xfe80 || (firstGroup & 0xffc0) === 0xfec0) return true;

  const isIpv4Mapped = groups.slice(0, 5).every((group) => group === 0) && groups[5] === 0xffff;
  const isIpv4Compatible = groups.slice(0, 6).every((group) => group === 0);
  if (!isIpv4Mapped && !isIpv4Compatible) return false;

  const ipv4 = [groups[6] >> 8, groups[6] & 0xff, groups[7] >> 8, groups[7] & 0xff].join(".");
  return isPrivateIpv4(ipv4);
}

export function normalizePublicUrl(input) {
  const value = input?.trim();
  if (!value) throw new Error("Indica una URL HTTPS con --url.");

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("La URL indicada no es válida.");
  }

  if (url.protocol !== "https:") throw new Error("La URL debe usar HTTPS.");
  if (url.username || url.password) throw new Error("La URL no puede incluir credenciales.");
  if (url.search || url.hash || value.includes("?") || value.includes("#")) {
    throw new Error("La URL no puede incluir parámetros de consulta ni fragmentos.");
  }

  const hostname = url.hostname.toLowerCase();
  const ipVersion = isIP(hostname.replace(/^\[|\]$/g, ""));
  const isLocalHostname =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal");
  const isPrivateAddress =
    (ipVersion === 4 && isPrivateIpv4(hostname)) ||
    (ipVersion === 6 && isPrivateIpv6(hostname));

  if (isLocalHostname || isPrivateAddress) {
    throw new Error("La URL no puede apuntar a localhost ni a una dirección privada.");
  }

  return url.href;
}

export function isVercelPreviewUrl(url) {
  const hostname = new URL(url).hostname.toLowerCase();
  if (!hostname.endsWith(".vercel.app")) return false;

  const deploymentName = hostname.slice(0, -".vercel.app".length);
  return deploymentName.includes("-git-") || /(?:^|-)[a-f0-9]{8,}(?:-|$)/.test(deploymentName);
}

function escapeXmlAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function generateQrFiles(url, slug, outputDirectory) {
  const normalizedUrl = normalizePublicUrl(url);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("El nombre debe ser un slug en minúsculas, con letras, números y guiones.");
  }

  await mkdir(outputDirectory, { recursive: true });
  const svgPath = resolve(outputDirectory, `${slug}.svg`);
  const pngPath = resolve(outputDirectory, `${slug}.png`);
  const [png, rawSvg] = await Promise.all([
    QRCode.toBuffer(normalizedUrl, PNG_OPTIONS),
    QRCode.toString(normalizedUrl, SVG_OPTIONS),
  ]);
  const svgLabel = escapeXmlAttribute(`Código QR que abre ${normalizedUrl}`);
  const svg = rawSvg.replace(
    /<svg\b/,
    `<svg role="img" aria-label="${svgLabel}" focusable="false"`,
  );

  await Promise.all([writeFile(pngPath, png), writeFile(svgPath, svg, "utf8")]);
  return { url: normalizedUrl, svgPath, pngPath };
}

function parseArguments(args) {
  const values = new Map();
  const options = args[0] === "--" ? args.slice(1) : args;

  for (let index = 0; index < options.length; index += 1) {
    const name = options[index];
    if (name !== "--url" && name !== "--nombre") {
      throw new Error(`Opción desconocida: ${name}`);
    }
    if (values.has(name)) throw new Error(`La opción ${name} no se puede repetir.`);
    const value = options[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Falta el valor de ${name}.`);
    values.set(name, value);
    index += 1;
  }

  const url = values.get("--url");
  const slug = values.get("--nombre");
  if (!url) throw new Error("La URL es obligatoria: --url <URL>.");
  if (!slug) throw new Error("El nombre es obligatorio: --nombre <slug>.");
  return { url, slug };
}

async function main() {
  try {
    const { url, slug } = parseArguments(process.argv.slice(2));
    const normalizedUrl = normalizePublicUrl(url);
    console.info(`URL que se codificará: ${normalizedUrl}`);
    if (normalizedUrl.length > 40) {
      console.warn(
        `Aviso: la URL tiene ${normalizedUrl.length} caracteres; el texto más largo aumenta la densidad del QR y puede dificultar el escaneo a distancia.`,
      );
    }
    if (isVercelPreviewUrl(normalizedUrl)) {
      console.warn("Aviso: el host parece una URL de vista previa de Vercel; confirma que no vaya a expirar.");
    }

    const outputDirectory = resolve(process.cwd(), "public", "qr");
    const files = await generateQrFiles(normalizedUrl, slug, outputDirectory);
    console.info(`QR SVG: ${files.svgPath}`);
    console.info(`QR PNG: ${files.pngPath} (1024 px, fondo blanco opaco)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido.";
    console.error(`No se pudo generar el QR: ${message}`);
    process.exitCode = 1;
  }
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) await main();
