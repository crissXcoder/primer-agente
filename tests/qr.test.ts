import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PNG } from "pngjs";
import decodeQR from "qr/decode.js";
import {
  generateQrFiles,
  isVercelPreviewUrl,
  normalizePublicUrl,
  QR_OPTIONS,
} from "../scripts/generar-qr.mjs";

const targetUrl = "https://primer-agente-two.vercel.app/taller";

describe("generación de códigos QR", () => {
  it("genera un PNG decodificable exactamente a la URL y un SVG accesible", async () => {
    const temporaryDirectory = await mkdtemp(join(tmpdir(), "primer-agente-qr-"));

    try {
      const files = await generateQrFiles(targetUrl, "taller", temporaryDirectory);
      const pngFile = PNG.sync.read(await readFile(files.pngPath));
      const decoded = await decodeQR({
        data: new Uint8ClampedArray(pngFile.data),
        width: pngFile.width,
        height: pngFile.height,
      });
      const svg = await readFile(files.svgPath, "utf8");

      expect(files.url).toBe(targetUrl);
      expect(pngFile.width).toBeGreaterThanOrEqual(1024);
      expect(pngFile.height).toBeGreaterThanOrEqual(1024);
      expect(pngFile.data[0]).toBe(255);
      expect(pngFile.data[1]).toBe(255);
      expect(pngFile.data[2]).toBe(255);
      expect(pngFile.data[3]).toBe(255);
      expect(decoded).toBe(targetUrl);
      expect(svg).toContain('role="img"');
      expect(svg).toContain(`aria-label="Código QR que abre ${targetUrl}"`);
      expect(svg).toContain("#171c1f");
      expect(svg).toContain("#ffffff");
      expect(svg).toContain('viewBox="0 0 41 41"');
      expect(svg).toMatch(/<path stroke="#171c1f" d="M4 /);
    } finally {
      await rm(temporaryDirectory, { recursive: true, force: true });
    }
  });

  it("usa corrección Q y quiet zone de cuatro módulos", () => {
    expect(QR_OPTIONS.errorCorrectionLevel).toBe("Q");
    expect(QR_OPTIONS.margin).toBe(4);
    expect(QR_OPTIONS.color).toEqual({ dark: "#171c1f", light: "#ffffff" });
  });

  it.each([
    "http://example.com",
    "https://localhost/",
    "https://127.0.0.1/",
    "https://10.0.0.2/",
    "https://172.16.0.1/",
    "https://192.168.1.1/",
    "https://[::1]/",
    "https://[fc00::1]/",
    "https://[fe80::1]/",
    "https://[::ffff:192.168.1.1]/",
    "https://[::ffff:c0a8:101]/",
    "https://example.com/?utm_source=taller",
    "https://example.com/#seccion",
  ])("rechaza URL no permitida: %s", (url) => {
    expect(() => normalizePublicUrl(url)).toThrow();
  });

  it("avisa sobre URLs de vista previa de Vercel, pero acepta el dominio definitivo", () => {
    expect(isVercelPreviewUrl("https://primer-agente-git-main-equipo.vercel.app/taller")).toBe(true);
    expect(isVercelPreviewUrl("https://primer-agente-a1b2c3d4.vercel.app/taller")).toBe(true);
    expect(isVercelPreviewUrl(targetUrl)).toBe(false);
  });
});
