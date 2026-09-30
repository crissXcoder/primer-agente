import { z } from "zod";

export const OsEnum = z.enum(["windows", "macos", "linux"]);
export type OsType = z.infer<typeof OsEnum>;

export const LevelEnum = z.enum(["principiante", "intermedio"]);
export type LevelType = z.infer<typeof LevelEnum>;

export const TrackEnum = z.enum(["git", "nodejs", "python", "conocimiento", "geoespacial", "entender", "skills"]);
export type TrackType = z.infer<typeof TrackEnum>;
export const TRACK_LABELS: Record<TrackType, string> = {
  git: "Git",
  nodejs: "Node.js",
  python: "Python",
  conocimiento: "Bóveda y conocimiento",
  geoespacial: "QGIS y datos geoespaciales",
  entender: "Entender los agentes",
  skills: "Skills y procedimientos",
};

export const AudienceEnum = z.enum(["todos", "programadores", "no-programadores"]);
export type AudienceType = z.infer<typeof AudienceEnum>;
export const AUDIENCE_LABELS: Record<AudienceType, string> = {
  todos: "Todas las personas",
  programadores: "Programadores",
  "no-programadores": "No programadores",
};

export const EvidenceEnum = z.enum(["docs-oficiales", "ejecutada", "reportada", "no-verificada"]);
export type EvidenceType = z.infer<typeof EvidenceEnum>;

export const KindEnum = z.enum(["concepto", "instalacion", "checklist", "referencia"]);
export type KindType = z.infer<typeof KindEnum>;

export const GuideErrorSchema = z.object({
  symptom: z.string().min(1, "El síntoma del error no puede estar vacío"),
  cause: z.string().min(1, "La causa del error no puede estar vacía"),
  fix: z.string().min(1, "La solución del error no puede estar vacía"),
});
export type GuideError = z.infer<typeof GuideErrorSchema>;

export const GuideFrontmatterSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug debe estar en formato kebab-case (ej. instalar-git)"),
  summary: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  track: TrackEnum,
  kind: KindEnum.default("instalacion"),
  audience: AudienceEnum,
  level: LevelEnum,
  os: z.array(OsEnum).min(1, "Debe soportar al menos un sistema operativo"),
  tools: z.array(z.string().min(1)).min(1, "Debe especificar al menos una herramienta"),
  tags: z.array(z.string().min(1)).min(1, "Debe especificar al menos un tag"),
  prerequisites: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  timeMinutes: z.number().int().positive("timeMinutes debe ser un entero positivo"),
  verifiedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "verifiedAt debe tener formato YYYY-MM-DD")
    .refine((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) return false;
      const today = new Date();
      // Comparar a nivel de día en zona horaria local/UTC
      const todayStr = today.toISOString().split("T")[0];
      return val <= todayStr;
    }, "verifiedAt no puede ser una fecha futura"),
  appliesTo: z
    .record(z.string(), z.string())
    .refine((val) => Object.keys(val).length > 0, "appliesTo debe contener al menos una herramienta y rango de versión"),
  evidence: z
    .record(z.string(), EvidenceEnum)
    .refine(
      (val) => Object.keys(val).length > 0 && Object.keys(val).every((k) => ["windows", "macos", "linux"].includes(k)),
      "evidence debe contener únicamente claves válidas de sistema operativo ('windows', 'macos', 'linux')"
    ),
  sources: z
    .array(z.string().url("Cada fuente debe ser una URL válida"))
    .min(1, "Debe citar al menos una fuente oficial en sources"),
  errors: z.array(GuideErrorSchema).default([]),
});

export type GuideFrontmatter = z.infer<typeof GuideFrontmatterSchema>;

export interface Guide {
  frontmatter: GuideFrontmatter;
  content: string;
  filePath: string;
}
