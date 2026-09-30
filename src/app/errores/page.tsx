import type { Metadata } from "next";
import { getAllGuides } from "@/lib/content/loader";
import { ErrorsCatalog, ErrorItem } from "@/components/catalog/errors-catalog";

export const metadata: Metadata = {
  title: "Catálogo de Errores Frecuentes | primer-agente",
  description:
    "Soluciones directas y verificadas para los fallos más comunes al instalar y configurar terminales, Git, Node.js y agentes de IA.",
};

export default function ErroresPage() {
  const guides = getAllGuides();

  const allErrors: ErrorItem[] = guides.flatMap((guide) =>
    guide.frontmatter.errors.map((err) => ({
      guideSlug: guide.frontmatter.slug,
      guideTitle: guide.frontmatter.title,
      track: guide.frontmatter.track,
      tools: guide.frontmatter.tools,
      symptom: err.symptom,
      cause: err.cause,
      fix: err.fix,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="space-y-2 border-b border-outline-variant/60 pb-6">
        <h1 className="font-heading text-3xl font-bold text-on-surface tracking-tight">
          Catálogo de Errores y Diagnóstico
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-3xl">
          ¿Te saltó un mensaje rojo en la terminal? Busca el síntoma exacto que estás experimentando para encontrar la causa técnica y el comando que lo resuelve.
        </p>
      </div>

      <ErrorsCatalog errors={allErrors} />
    </div>
  );
}
