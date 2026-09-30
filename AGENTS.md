<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas de Trabajo para Agentes — primer-agente

Este documento establece las directrices operativas, arquitectónicas y de desarrollo para cualquier agente de IA o desarrollador que trabaje en el repositorio **primer-agente**.

## 1. Contexto del Proyecto
* **Nombre**: `primer-agente`
* **Propósito**: Base de conocimiento estática, buscable y filtrable, con guías paso a paso de instalación y configuración verificables de herramientas y agentes de IA (terminal, Git, Node.js, Python, uv, MCP, skills).
* **Audiencia principal**: Principiantes absolutos, participantes del taller de agentes de IA de la Semana U (Universidad Nacional de Costa Rica - UNA, Campus Nicoya) y público general.
* **Hosting**: Vercel (Plan Hobby, uso no comercial).
* **Idioma**: Español (mensajes de error y modismos amables en español de Costa Rica).

## 2. No-Objetivos (MVP)
* Sin cuentas de usuario ni autenticación.
* Sin base de datos ni CMS externo.
* Sin comentarios ni analítica.
* Sin anuncios comerciales.
* Sin modo oscuro forzado (respetar el diseño base de `DESIGN.md`).
* Sin i18n multilingüe.
* Sin librerías pesadas innecesarias (p. ej. TanStack Query).

## 3. Stack Tecnológico
* **Framework**: Next.js 16 (App Router) + React 19.
* **Lenguaje**: TypeScript en modo estricto (`strict: true`, cero tolerancia a `any`).
* **Estilos**: Tailwind CSS v4 (con tokens definidos en `DESIGN.md`).
* **Gestor de paquetes**: `pnpm` (no usar `npm` ni `yarn`).
* **Validación**: Zod para esquemas de frontmatter y metadatos.
* **Contenido**: MDX (`next-mdx-remote/rsc` + `gray-matter`).
* **Búsqueda**: `minisearch` en cliente sobre índice estático generado en build time.
* **UI**: Primitivas accesibles de Radix / shadcn/ui tematizadas con tokens propios.

## 4. Comandos de Desarrollo y Verificación
Todos los comandos deben ejecutarse con `pnpm`:
* Servidor de desarrollo:
  ```bash
  pnpm dev
  ```
* Verificación de tipos TypeScript:
  ```bash
  pnpm typecheck
  ```
* Análisis estático de código:
  ```bash
  pnpm lint
  ```
* Compilación para producción:
  ```bash
  pnpm build
  ```

> [!IMPORTANT]
> Antes de dar por finalizada cualquier tarea o proponer un commit/PR, los comandos `pnpm typecheck`, `pnpm lint` y `pnpm build` **deben terminar con código de salida 0**.

## 5. Reglas de Contenido para Guías
1. **Nada de memoria**: Ningún comando ni instrucción de instalación se redacta de memoria; todo debe ser verificado en la documentación oficial vigente y citado en `sources`.
2. **Verificación observable**: Cada paso técnico debe terminar con un comando o resultado verificable por el usuario.
3. **Sección obligatoria**: Toda guía debe incluir la sección clara de *"¿Cómo sé que funcionó?"* con la salida esperada.
4. **Validación de metadatos**: El frontmatter de cada guía debe cumplir el esquema Zod definido en [`docs/SPEC.md`](file:///c:/Users/crisa/Chambas/primer-agente/docs/SPEC.md).

## 6. Estándares de Calidad y Seguridad
* Accesibilidad conforme al estándar **WCAG AA**.
* Cero secretos, tokens o credenciales expuestos en el código o historial de Git.
* Cero peticiones o scripts a terceros que no sean estrictamente esenciales.
