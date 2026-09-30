export interface LearningRoute {
  slug: string;
  title: string;
  summary: string;
  guideSlugs: string[];
}

export const LEARNING_ROUTES: LearningRoute[] = [
  {
    slug: "primeros-pasos",
    title: "Primeros Pasos: Fundamentos de Entorno",
    summary:
      "Domina la base indispensable para cualquier desarrollador de IA: Git para clonar repositorios y Node.js con pnpm para ejecutar agentes y servidores MCP locales.",
    guideSlugs: ["instalar-git", "instalar-nodejs"],
  },
  {
    slug: "python-entornos",
    title: "Python y Entornos Virtuales para IA",
    summary:
      "Configura el runtime más utilizado en Inteligencia Artificial y domina uv para crear y gestionar entornos virtuales ultrarrápidos y sin fricción.",
    guideSlugs: ["instalar-python", "instalar-uv"],
  },
];

export function getRouteBySlug(slug: string): LearningRoute | undefined {
  return LEARNING_ROUTES.find((r) => r.slug === slug);
}
