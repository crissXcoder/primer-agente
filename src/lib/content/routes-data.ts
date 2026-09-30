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
];

export function getRouteBySlug(slug: string): LearningRoute | undefined {
  return LEARNING_ROUTES.find((r) => r.slug === slug);
}
