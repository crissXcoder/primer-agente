import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllGuides, getGuideBySlug } from "@/lib/content/loader";
import { AUDIENCE_LABELS, TRACK_LABELS } from "@/lib/content/schema";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OsSelector } from "@/components/guide/os-selector";

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({
    slug: g.frontmatter.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: "Guía no encontrada | primer-agente" };
  }

  return {
    title: `${guide.frontmatter.title} | primer-agente`,
    description: guide.frontmatter.summary,
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const { frontmatter, content } = guide;
  const allGuides = getAllGuides();

  // Obtener información de prerrequisitos y relacionadas
  const prerequisitesGuides = allGuides.filter((g) =>
    frontmatter.prerequisites.includes(g.frontmatter.slug)
  );
  const relatedGuides = allGuides.filter((g) =>
    frontmatter.related.includes(g.frontmatter.slug)
  );

  // Generar URL prellenada para reportar errores en GitHub
  const issueTitle = encodeURIComponent(`[Error en guía: ${frontmatter.slug}]`);
  const issueBody = encodeURIComponent(
    `### Reporte de Error en Guía
* **Guía**: ${frontmatter.title} (\`${frontmatter.slug}\`)
* **Sistema Operativo**: (Windows / macOS / Linux)
* **Herramienta y Versión**: 

#### Descripción del problema:
(Explica qué paso falló o qué mensaje de error recibiste)

#### Salida de la terminal:
\`\`\`bash

\`\`\`
`
  );
  const reportIssueUrl = `https://github.com/crissXcoder/primer-agente/issues/new?title=${issueTitle}&body=${issueBody}`;

  return (
    <article className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Navegación superior / Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/guias" className="hover:text-primary transition-colors">
          Guías
        </Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">{frontmatter.slug}</span>
      </nav>

      {/* Cabecera de la Guía */}
      <header className="space-y-4 border-b border-outline-variant/60 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge status="verified" label={`Verificada: ${frontmatter.verifiedAt}`} />
          <Badge status="neutral" label={`Pista: ${TRACK_LABELS[frontmatter.track]}`} />
          <Badge status="neutral" label={AUDIENCE_LABELS[frontmatter.audience]} />
          <span className="font-mono text-xs text-on-surface-variant capitalize">
            Nivel {frontmatter.level} · ⏱ {frontmatter.timeMinutes} minutos
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-tight">
          {frontmatter.title}
        </h1>

        <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
          {frontmatter.summary}
        </p>

        {/* Evidencias por sistema operativo */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-on-surface-variant font-medium">
            Evidencia verificada:
          </span>
          {Object.entries(frontmatter.evidence).map(([os, type]) => (
            <span
              key={os}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono bg-surface-container border border-outline-variant text-on-surface"
            >
              <strong className="capitalize">{os}:</strong> {type}
            </span>
          ))}
        </div>
      </header>

      {/* Panel "De un vistazo" y selector persistente de SO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-surface-container-lowest">
          <CardHeader>
            <CardTitle className="text-base font-mono">📋 Ficha Técnica de un Vistazo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs font-mono">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-on-surface-variant block">Versiones aplicables:</span>
                {Object.entries(frontmatter.appliesTo).map(([tool, ver]) => (
                  <span key={tool} className="text-primary font-semibold block">
                    {tool}: {ver}
                  </span>
                ))}
              </div>
              <div>
                <span className="text-on-surface-variant block">Herramientas:</span>
                <span className="text-on-surface font-semibold">
                  {frontmatter.tools.join(", ")}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
              <span>Sistemas soportados:</span>
              <span className="text-on-surface font-semibold uppercase">
                {frontmatter.os.join(" · ")}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Selector de SO que persiste en sesión */}
        <div className="flex flex-col justify-center">
          <OsSelector supportedOs={frontmatter.os} />
        </div>
      </div>

      {/* Prerrequisitos de la guía (si existen) */}
      {prerequisitesGuides.length > 0 && (
        <section aria-label="Prerrequisitos" className="rounded-lg border border-primary-container/40 bg-surface-container-low p-4 space-y-2">
          <h2 className="font-heading text-sm font-semibold text-primary flex items-center gap-2">
            <span>⚡ Prerrequisitos Necesarios</span>
          </h2>
          <p className="font-sans text-xs text-on-surface-variant">
            Antes de comenzar esta guía, asegúrate de haber completado:
          </p>
          <ul className="space-y-1">
            {prerequisitesGuides.map((prereq) => (
              <li key={prereq.frontmatter.slug} className="text-xs font-mono">
                <Link
                  href={`/guias/${prereq.frontmatter.slug}`}
                  className="text-secondary font-medium hover:underline flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>{prereq.frontmatter.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Contenido Principal Renderizado desde MDX */}
      <section className="prose max-w-none font-sans text-on-surface">
        <MDXRemote source={content} components={mdxComponents} />
      </section>

      {/* Sección Errores Frecuentes */}
      {frontmatter.errors.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-outline-variant/60">
          <h2 className="font-heading text-2xl font-bold text-on-surface flex items-center gap-2">
            <span>⚠️ Errores Frecuentes y Soluciones</span>
          </h2>
          <div className="space-y-3">
            {frontmatter.errors.map((err, i) => (
              <Card key={i} className="border-error/40 bg-surface-container-lowest">
                <CardHeader>
                  <span className="font-mono text-xs text-error font-semibold uppercase">
                    Síntoma detectado:
                  </span>
                  <p className="font-mono text-sm font-bold text-on-surface mt-1">
                    {err.symptom}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2 text-xs font-sans">
                  <div>
                    <strong className="text-on-surface">Causa raíz:</strong>{" "}
                    <span className="text-on-surface-variant">{err.cause}</span>
                  </div>
                  <div className="rounded bg-surface-container-low p-3 font-mono border border-outline-variant/60">
                    <strong className="text-tertiary block mb-1">Solución paso a paso:</strong>
                    <p className="text-on-surface">{err.fix}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Guías Relacionadas */}
      {relatedGuides.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-outline-variant/60">
          <h2 className="font-heading text-xl font-bold text-on-surface">
            Guías Relacionadas Siguientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedGuides.map((rel) => (
              <Card key={rel.frontmatter.slug} className="hover:border-primary-container transition-colors">
                <CardHeader>
                  <Badge status="neutral" label={rel.frontmatter.track} />
                  <CardTitle className="text-base mt-2">
                    <Link href={`/guias/${rel.frontmatter.slug}`} className="hover:text-primary transition-colors">
                      {rel.frontmatter.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-on-surface-variant line-clamp-2">
                    {rel.frontmatter.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Pie de Guía: Fuentes oficiales y enlace para reportar error */}
      <footer className="pt-6 border-t border-outline-variant/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-on-surface-variant">
        <div>
          <span className="font-semibold block mb-1">Fuentes oficiales consultadas:</span>
          <ul className="list-disc pl-4 space-y-0.5">
            {frontmatter.sources.map((src) => (
              <li key={src}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                  {src} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={reportIssueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-error/50 bg-error-container/30 text-error hover:bg-error-container/50 font-medium transition-colors"
        >
          <span>🚩</span>
          <span>¿Algo no funcionó? Reportar error en GitHub</span>
        </a>
      </footer>
    </article>
  );
}
