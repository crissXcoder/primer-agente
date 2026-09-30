import { describe, it, expect } from "vitest";
import { GuideFrontmatterSchema, Guide } from "../src/lib/content/schema";
import {
  validateContentIntegrity,
  validateImageAltText,
} from "../src/lib/content/validator";
import { normalizeText, generateSearchDocuments } from "../src/lib/content/search-index";

describe("1. Validación Zod de Frontmatter (GuideFrontmatterSchema)", () => {
  const validFrontmatter = {
    title: "Guía de Prueba Válida",
    slug: "guia-de-prueba",
    summary: "Este es un resumen válido con más de diez caracteres.",
    track: "terminal",
    level: "principiante" as const,
    os: ["windows" as const, "linux" as const],
    tools: ["git", "bash"],
    tags: ["terminal", "setup"],
    prerequisites: [],
    related: [],
    timeMinutes: 15,
    verifiedAt: "2026-09-29",
    appliesTo: { git: ">=2.40" },
    evidence: {
      windows: "ejecutada" as const,
      linux: "docs-oficiales" as const,
    },
    sources: ["https://ejemplo.com/docs"],
    errors: [
      {
        symptom: "Comando no encontrado",
        cause: "Variable PATH no configurada",
        fix: "Reiniciar la terminal",
      },
    ],
  };

  it("debe aceptar un frontmatter completamente válido", () => {
    const result = GuideFrontmatterSchema.safeParse(validFrontmatter);
    expect(result.success).toBe(true);
  });

  it("adversarial: debe fallar si verifiedAt es una fecha en el futuro", () => {
    const invalidFm = {
      ...validFrontmatter,
      verifiedAt: "2099-12-31",
    };
    const result = GuideFrontmatterSchema.safeParse(invalidFm);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("no puede ser una fecha futura");
    }
  });

  it("adversarial: debe fallar si sources está vacío o contiene URLs inválidas", () => {
    const emptySources = {
      ...validFrontmatter,
      sources: [],
    };
    const invalidUrlSources = {
      ...validFrontmatter,
      sources: ["esto-no-es-una-url"],
    };

    expect(GuideFrontmatterSchema.safeParse(emptySources).success).toBe(false);
    expect(GuideFrontmatterSchema.safeParse(invalidUrlSources).success).toBe(false);
  });

  it("adversarial: debe fallar si el slug tiene mayúsculas o espacios", () => {
    const invalidSlug = {
      ...validFrontmatter,
      slug: "Mi Guia Invalida!",
    };
    const result = GuideFrontmatterSchema.safeParse(invalidSlug);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("kebab-case");
    }
  });

  it("adversarial: debe fallar si level no es 'principiante' o 'intermedio'", () => {
    const invalidLevel = {
      ...validFrontmatter,
      level: "experto-avanzado",
    };
    expect(GuideFrontmatterSchema.safeParse(invalidLevel).success).toBe(false);
  });

  it("adversarial: debe fallar si appliesTo está vacío", () => {
    const emptyAppliesTo = {
      ...validFrontmatter,
      appliesTo: {},
    };
    expect(GuideFrontmatterSchema.safeParse(emptyAppliesTo).success).toBe(false);
  });
});

describe("2. Integridad de la Colección y Grafo de Dependencias", () => {
  const baseGuide = (slug: string, prereqs: string[] = [], related: string[] = []): Guide => ({
    filePath: `/content/guias/${slug}.mdx`,
    content: "Contenido de prueba sin imágenes rotas.",
    frontmatter: {
      title: `Guía ${slug}`,
      slug,
      summary: "Resumen de prueba para validación de grafo.",
      track: "general",
      level: "principiante",
      os: ["windows"],
      tools: ["test"],
      tags: ["test"],
      prerequisites: prereqs,
      related,
      timeMinutes: 5,
      verifiedAt: "2026-09-29",
      appliesTo: { test: "1.0" },
      evidence: { windows: "ejecutada" },
      sources: ["https://ejemplo.com"],
      errors: [],
    },
  });

  it("adversarial: debe detectar y rechazar slugs duplicados", () => {
    const guides = [baseGuide("guia-a"), baseGuide("guia-a")];
    const validation = validateContentIntegrity(guides);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((e) => e.includes("Slug duplicado detectado: 'guia-a'"))).toBe(true);
  });

  it("adversarial: debe detectar referencias rotas en prerequisites", () => {
    const guides = [baseGuide("guia-a", ["guia-fantasma"])];
    const validation = validateContentIntegrity(guides);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((e) => e.includes("guia-fantasma' no existe"))).toBe(true);
  });

  it("adversarial: debe detectar autoreferencias (guía depende de sí misma)", () => {
    const guides = [baseGuide("guia-a", ["guia-a"])];
    const validation = validateContentIntegrity(guides);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((e) => e.includes("Autoreferencia inválida"))).toBe(true);
  });

  it("adversarial: debe detectar ciclos circulares directos A -> B -> A", () => {
    const guideA = baseGuide("guia-a", ["guia-b"]);
    const guideB = baseGuide("guia-b", ["guia-a"]);

    const validation = validateContentIntegrity([guideA, guideB]);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((e) => e.includes("Referencia circular"))).toBe(true);
  });

  it("adversarial: debe detectar ciclos circulares indirectos A -> B -> C -> A", () => {
    const guideA = baseGuide("guia-a", ["guia-b"]);
    const guideB = baseGuide("guia-b", ["guia-c"]);
    const guideC = baseGuide("guia-c", ["guia-a"]);

    const validation = validateContentIntegrity([guideA, guideB, guideC]);
    expect(validation.valid).toBe(false);
    expect(validation.errors.some((e) => e.includes("Referencia circular"))).toBe(true);
  });

  it("debe validar exitosamente grafos acíclicos dirigidos válidos (DAG)", () => {
    // C depende de B; B depende de A; A no depende de nadie
    const guideA = baseGuide("guia-a", []);
    const guideB = baseGuide("guia-b", ["guia-a"]);
    const guideC = baseGuide("guia-c", ["guia-b"]);

    const validation = validateContentIntegrity([guideA, guideB, guideC]);
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });
});

describe("3. Accesibilidad de Imágenes en Contenido MDX", () => {
  it("adversarial: debe fallar si una imagen Markdown carece de texto alt", () => {
    const content = "Paso 1: Mira esta pantalla\n\n![](/captura-vacia.png)\n\nContinúa aquí.";
    const errors = validateImageAltText(content, "guia-test");
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("sin atributo 'alt' descriptivo");
  });

  it("adversarial: debe fallar si un componente <Screenshot> tiene alt vacío o ausente", () => {
    const content = '<Screenshot src="/shot.png" alt="   " caption="Ventana" />';
    const errors = validateImageAltText(content, "guia-test");
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("sin atributo 'alt' no vacío");
  });

  it("debe aceptar imágenes con alt descriptivo", () => {
    const content = `
      ![Terminal mostrando git version 2.53](/git-terminal.png)
      <Screenshot src="/setup.png" alt="Pantalla de confirmación de instalación exitosa" />
    `;
    const errors = validateImageAltText(content, "guia-test");
    expect(errors).toHaveLength(0);
  });
});

describe("4. Normalización Lingüística e Índice de Búsqueda", () => {
  it("debe normalizar tildes, mayúsculas y espacios en blanco", () => {
    expect(normalizeText("Instalación")).toBe("instalacion");
    expect(normalizeText("CONFIGURACIÓN")).toBe("configuracion");
    expect(normalizeText("  Guía    Rápida  ")).toBe("guia rapida");
    expect(normalizeText("Árbol, Éxito, Ícono, Órgano, Úvula")).toBe("arbol, exito, icono, organo, uvula");
  });

  it("debe generar documentos de búsqueda con campos canónicos y normalizados", () => {
    const sampleGuide: Guide = {
      filePath: "/test.mdx",
      content: "test",
      frontmatter: {
        title: "Instalación de Python",
        slug: "instalar-python",
        summary: "Configuración inicial de entornos virtuales.",
        track: "python",
        level: "principiante",
        os: ["windows"],
        tools: ["Python", "UV"],
        tags: ["Entornos", "Configuración"],
        prerequisites: [],
        related: [],
        timeMinutes: 10,
        verifiedAt: "2026-09-29",
        appliesTo: { python: ">=3.12" },
        evidence: { windows: "ejecutada" },
        sources: ["https://python.org"],
        errors: [{ symptom: "Error de compilación", cause: "Falta C++", fix: "Instalar build tools" }],
      },
    };

    const docs = generateSearchDocuments([sampleGuide]);
    expect(docs).toHaveLength(1);
    const doc = docs[0];
    expect(doc.titleNormalized).toBe("instalacion de python");
    expect(doc.summaryNormalized).toBe("configuracion inicial de entornos virtuales.");
    expect(doc.tagsNormalized).toContain("configuracion");
    expect(doc.toolsNormalized).toContain("uv");
    expect(doc.errorSymptomsNormalized).toContain("error de compilacion");
  });
});
