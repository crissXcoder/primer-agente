import { Guide } from "./schema";

export interface SearchDocument {
  id: string; // slug como identificador principal
  slug: string;
  title: string;
  titleNormalized: string;
  summary: string;
  summaryNormalized: string;
  track: string;
  level: string;
  os: string[];
  tools: string[];
  toolsNormalized: string[];
  tags: string[];
  tagsNormalized: string[];
  errorSymptoms: string[];
  errorSymptomsNormalized: string[];
}

/**
 * Normaliza una cadena de texto para búsqueda lingüística en español:
 * 1. Convierte a minúsculas.
 * 2. Elimina tildes y signos diacríticos ("instalación" -> "instalacion").
 * 3. Normaliza espacios en blanco.
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Genera la lista de documentos de búsqueda indexables a partir de las guías validadas.
 */
export function generateSearchDocuments(guides: Guide[]): SearchDocument[] {
  return guides.map((guide) => {
    const fm = guide.frontmatter;

    const errorSymptoms = fm.errors.map((e) => e.symptom);

    return {
      id: fm.slug,
      slug: fm.slug,
      title: fm.title,
      titleNormalized: normalizeText(fm.title),
      summary: fm.summary,
      summaryNormalized: normalizeText(fm.summary),
      track: fm.track,
      level: fm.level,
      os: fm.os,
      tools: fm.tools,
      toolsNormalized: fm.tools.map(normalizeText),
      tags: fm.tags,
      tagsNormalized: fm.tags.map(normalizeText),
      errorSymptoms,
      errorSymptomsNormalized: errorSymptoms.map(normalizeText),
    };
  });
}
