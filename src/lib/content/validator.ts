import { Guide, GuideFrontmatter } from "./schema";

export interface IntegrityValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Valida la accesibilidad de imágenes en el contenido MDX (alt obligatorio y no vacío).
 */
export function validateImageAltText(content: string, slug: string): string[] {
  const errors: string[] = [];

  // 1. Validar sintaxis Markdown ![alt](url)
  const mdImageRegex = /!\[(.*?)\]\((.*?)\)/g;
  let match: RegExpExecArray | null;
  while ((match = mdImageRegex.exec(content)) !== null) {
    const altText = match[1].trim();
    if (!altText) {
      errors.push(`Guía '${slug}': Se encontró una imagen Markdown sin atributo 'alt' descriptivo (![](${match[2]})).`);
    }
  }

  // 2. Validar componente <Screenshot ... /> o <img ... />
  const jsxImageRegex = /<(?:Screenshot|img)\b([^>]*)\/?>/g;
  while ((match = jsxImageRegex.exec(content)) !== null) {
    const attrs = match[1];
    const altMatch = /alt=["'](.*?)["']/.exec(attrs);
    if (!altMatch || !altMatch[1].trim()) {
      errors.push(`Guía '${slug}': Componente <Screenshot> o <img> sin atributo 'alt' no vacío en: <${match[0].slice(1, 40)}...>.`);
    }
  }

  return errors;
}

/**
 * Detecta dependencias circulares en los prerrequisitos de las guías usando búsqueda en profundidad (DFS).
 */
export function detectCircularPrerequisites(
  guidesMap: Map<string, GuideFrontmatter>
): string[] {
  const errors: string[] = [];
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function dfs(currentSlug: string, path: string[]): boolean {
    visited.add(currentSlug);
    recStack.add(currentSlug);

    const guide = guidesMap.get(currentSlug);
    if (guide && guide.prerequisites) {
      for (const prereqSlug of guide.prerequisites) {
        if (!guidesMap.has(prereqSlug)) {
          // La referencia rota se valida en otra función
          continue;
        }

        if (!visited.has(prereqSlug)) {
          if (dfs(prereqSlug, [...path, prereqSlug])) {
            return true;
          }
        } else if (recStack.has(prereqSlug)) {
          const cycle = [...path, prereqSlug].join(" -> ");
          errors.push(`Referencia circular detectada en la cadena de prerrequisitos: ${cycle}`);
          return true;
        }
      }
    }

    recStack.delete(currentSlug);
    return false;
  }

  for (const slug of guidesMap.keys()) {
    if (!visited.has(slug)) {
      dfs(slug, [slug]);
    }
  }

  return errors;
}

/**
 * Valida la integridad completa de una colección de guías.
 */
export function validateContentIntegrity(guides: Guide[]): IntegrityValidationResult {
  const errors: string[] = [];
  const slugCounts = new Map<string, number>();
  const guidesMap = new Map<string, GuideFrontmatter>();

  // 1. Validar unicidad de slugs
  for (const guide of guides) {
    const slug = guide.frontmatter.slug;
    slugCounts.set(slug, (slugCounts.get(slug) || 0) + 1);
    guidesMap.set(slug, guide.frontmatter);
  }

  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      errors.push(`Slug duplicado detectado: '${slug}' aparece ${count} veces en los contenidos.`);
    }
  }

  // 2. Validar referencias rotas y autoreferencias
  for (const guide of guides) {
    const { slug, prerequisites, related } = guide.frontmatter;

    // Prerrequisitos
    for (const prereq of prerequisites) {
      if (prereq === slug) {
        errors.push(`Guía '${slug}': Autoreferencia inválida (no puede ser su propio prerrequisito).`);
      } else if (!guidesMap.has(prereq)) {
        errors.push(`Guía '${slug}': Referencia rota en 'prerequisites' -> '${prereq}' no existe.`);
      }
    }

    // Guías relacionadas
    for (const rel of related) {
      if (rel === slug) {
        errors.push(`Guía '${slug}': Autoreferencia inválida (no puede ser su propia guía relacionada).`);
      } else if (!guidesMap.has(rel)) {
        errors.push(`Guía '${slug}': Referencia rota en 'related' -> '${rel}' no existe.`);
      }
    }

    // 3. Validar imágenes en el cuerpo MDX
    const imageErrors = validateImageAltText(guide.content, slug);
    errors.push(...imageErrors);
  }

  // 4. Validar ciclos circulares
  const circularErrors = detectCircularPrerequisites(guidesMap);
  errors.push(...circularErrors);

  return {
    valid: errors.length === 0,
    errors,
  };
}
