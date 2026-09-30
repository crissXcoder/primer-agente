import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Código QR del taller",
  description: "Código QR directo al checklist de preparación del taller.",
};

export default async function WorkshopQrPage() {
  const qrSvg = await readFile(join(process.cwd(), "public", "qr", "taller.svg"), "utf8");
  const label = qrSvg.match(/aria-label="Código QR que abre ([^"]+)"/)?.[1];
  if (!label) throw new Error("El SVG del código QR no contiene su URL accesible.");
  const workshopUrl = label
    .replaceAll("&quot;", '"')
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&");

  return (
    <article className="qr-page mx-auto flex w-full max-w-4xl flex-col items-center gap-6 py-4 text-center">
      <p className="qr-eyebrow font-mono text-xs font-medium uppercase tracking-wider text-on-surface-variant">
        Semana U · UNA Nicoya
      </p>
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">
        Abrí el checklist del taller
      </h1>
      <div
        className="qr-artwork aspect-square shrink-0 bg-white p-2"
        dangerouslySetInnerHTML={{ __html: qrSvg }}
      />
      <a
        className="qr-url max-w-full break-all font-mono text-lg font-medium text-on-surface underline decoration-primary decoration-2 underline-offset-4 md:text-xl"
        href={workshopUrl}
      >
        {workshopUrl}
      </a>
      <nav className="qr-downloads flex flex-wrap justify-center gap-3" aria-label="Descargar código QR">
        <a className="rounded border border-outline px-4 py-2 font-mono text-sm font-medium text-on-surface hover:bg-surface-container-low" href="/qr/taller.svg" download="taller.svg">
          Descargar SVG
        </a>
        <a className="rounded border border-outline px-4 py-2 font-mono text-sm font-medium text-on-surface hover:bg-surface-container-low" href="/qr/taller.png" download="taller.png">
          Descargar PNG
        </a>
      </nav>
    </article>
  );
}
