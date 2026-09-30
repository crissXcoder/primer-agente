import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Guide, GuideFrontmatterSchema } from "./schema";
import { validateContentIntegrity } from "./validator";

const CONTENT_DIR = path.join(process.cwd(), "content", "guias");

/**
 * Obtiene la ruta al directorio de guías.
 */
export function getContentDirectory(): string {
  return CONTENT_DIR;
}

/**
 * Lee y valida una guía individual por su ruta de archivo.
 */
export function loadGuideFromFile(filePath: string): Guide {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  const parseResult = GuideFrontmatterSchema.safeParse(data);
  if (!parseResult.success) {
    const errorDetails = parseResult.error.issues
      .map((err) => `  - ${err.path.join(".")}: ${err.message}`)
      .join("\n");
    throw new Error(
      `Error de validación de esquema en '${path.basename(filePath)}':\n${errorDetails}`
    );
  }

  return {
    frontmatter: parseResult.data,
    content,
    filePath,
  };
}

/**
 * Carga todas las guías del directorio /content/guias y valida la integridad de la colección.
 * Lanza un error si el frontmatter o las relaciones fallan.
 */
export function getAllGuides(): Guide[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(CONTENT_DIR);
  const mdxFiles = fileNames.filter((file) => file.endsWith(".mdx"));

  const guides = mdxFiles.map((file) => {
    const fullPath = path.join(CONTENT_DIR, file);
    return loadGuideFromFile(fullPath);
  });

  // Validar integridad de la colección (slugs únicos, referencias rotas, ciclos, imágenes sin alt)
  const integrity = validateContentIntegrity(guides);
  if (!integrity.valid) {
    const formattedErrors = integrity.errors.map((e) => `  - ${e}`).join("\n");
    throw new Error(
      `Fallo de integridad en la colección de guías:\n${formattedErrors}`
    );
  }

  return guides;
}

/**
 * Busca una guía específica por su slug.
 */
export function getGuideBySlug(slug: string): Guide | undefined {
  const guides = getAllGuides();
  return guides.find((g) => g.frontmatter.slug === slug);
}
