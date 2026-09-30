import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Guide, GuideFrontmatterSchema } from "./schema";
import { validateContentIntegrity } from "./validator";

const CONTENT_ROOT_DIR = path.join(process.cwd(), "content");
const GUIDE_CONTENT_DIR = path.join(CONTENT_ROOT_DIR, "guias");

/**
 * Obtiene la ruta al directorio de guías.
 */
export function getContentDirectory(): string {
  return GUIDE_CONTENT_DIR;
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
 * Carga guías desde /content y /content/guias y valida la integridad de la colección.
 * Lanza un error si el frontmatter o las relaciones fallan.
 */
export function getAllGuides(): Guide[] {
  const contentDirs = [CONTENT_ROOT_DIR, GUIDE_CONTENT_DIR];
  const guides = contentDirs.flatMap((directory) => {
    if (!fs.existsSync(directory)) {
      return [];
    }

    return fs
      .readdirSync(directory)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => loadGuideFromFile(path.join(directory, file)));
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
