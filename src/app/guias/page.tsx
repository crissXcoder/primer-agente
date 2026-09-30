import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllGuides } from "@/lib/content/loader";
import { GuidesCatalog } from "@/components/catalog/guides-catalog";

export const metadata: Metadata = {
  title: "Catálogo de Guías | primer-agente",
  description:
    "Guías verificadas paso a paso para instalar y configurar Git, Node.js, Python, uv y el protocolo MCP sin errores.",
};

export default function GuiasPage() {
  const guides = getAllGuides();
  const levelPriority = { principiante: 0, intermedio: 1 };
  const frontmatters = guides
    .map((g) => g.frontmatter)
    .sort((a, b) => levelPriority[a.level] - levelPriority[b.level]);

  return (
    <div className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="space-y-2 border-b border-outline-variant/60 pb-6">
        <h1 className="font-heading text-3xl font-bold text-on-surface tracking-tight">
          Catálogo de Guías Técnicas
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-3xl">
          Instrucciones verificables paso a paso para configurar tu entorno de desarrollo y agentes de IA. Selecciona tu sistema operativo o filtra por herramientas específicas.
        </p>
      </div>

      {/* Catálogo con Suspense para uso de useSearchParams */}
      <Suspense
        fallback={
          <div className="p-8 text-center font-mono text-sm text-on-surface-variant">
            Cargando catálogo de guías...
          </div>
        }
      >
        <GuidesCatalog initialGuides={frontmatters} />
      </Suspense>

      {/* Respaldo accesible para navegación sin JavaScript */}
      <noscript>
        <div className="rounded border border-outline-variant p-4 bg-surface-container-low space-y-2">
          <p className="font-heading text-sm font-semibold">Listado de Guías (Modo sin JavaScript):</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {frontmatters.map((g) => (
              <li key={g.slug}>
                <a href={`/guias/${g.slug}`} className="text-secondary underline">
                  {g.title} ({g.track}) - {g.summary}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </noscript>
    </div>
  );
}
