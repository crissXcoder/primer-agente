import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/content/loader";
import { LEARNING_ROUTES } from "@/lib/content/routes-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://primer-agente.vercel.app";
  const now = new Date();

  // Rutas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/guias`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/rutas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/errores`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/taller`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Rutas dinámicas de guías individuales
  const guides = getAllGuides();
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${siteUrl}/guias/${guide.frontmatter.slug}`,
    lastModified: new Date(guide.frontmatter.verifiedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Rutas dinámicas de rutas de aprendizaje
  const learningRoutes: MetadataRoute.Sitemap = LEARNING_ROUTES.map((route) => ({
    url: `${siteUrl}/rutas/${route.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...guideRoutes, ...learningRoutes];
}
