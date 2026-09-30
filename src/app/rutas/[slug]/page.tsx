import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { LEARNING_ROUTES, getRouteBySlug } from "@/lib/content/routes-data";
import { getAllGuides } from "@/lib/content/loader";
import { RouteProgress } from "@/components/routes/route-progress";

interface RoutePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return LEARNING_ROUTES.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({
  params,
}: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) {
    return { title: "Ruta no encontrada | primer-agente" };
  }

  return {
    title: `${route.title} | Rutas primer-agente`,
    description: route.summary,
  };
}

export default async function RouteDetailPage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  const allGuides = getAllGuides();
  // Ordenar las guías según el orden estricto de la ruta
  const routeGuides = route.guideSlugs
    .map((s) => allGuides.find((g) => g.frontmatter.slug === s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))
    .map((g) => g.frontmatter);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Navegación Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/rutas" className="hover:text-primary transition-colors">
          Rutas
        </Link>
        <span>/</span>
        <span className="text-on-surface font-semibold">{route.slug}</span>
      </nav>

      {/* Encabezado de la Ruta */}
      <div className="space-y-3 border-b border-outline-variant/60 pb-6">
        <span className="font-mono text-xs text-primary font-bold">
          SECUENCIA FORMATIVA GUIADA
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          {route.title}
        </h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed max-w-3xl">
          {route.summary}
        </p>
      </div>

      {/* Componente de Progreso y Guías Ordenadas */}
      <RouteProgress
        routeSlug={route.slug}
        routeTitle={route.title}
        guides={routeGuides}
      />
    </div>
  );
}
