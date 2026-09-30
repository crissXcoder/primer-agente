# primer-agente

> Guías paso a paso, verificables y accesibles para instalar y configurar agentes de IA y sus herramientas base (terminal, Git, Node.js, Python, uv, MCP, skills). Diseñado para principiantes absolutos: participantes del taller de agentes de IA de la Semana U (Universidad Nacional de Costa Rica - UNA, Campus Nicoya) y público general.

Sitio 100% estático, rápido y accesible, pensado para ser desplegado en Vercel (Plan Hobby, uso no comercial).

---

## 🛠️ Stack Tecnológico

* **Framework**: [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19
* **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) en modo estricto (`strict: true`, cero `any`)
* **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Validación**: [Zod](https://zod.dev/) para esquemas de frontmatter de guías
* **Contenido**: MDX (`next-mdx-remote/rsc` + `gray-matter`)
* **Búsqueda**: Índice estático generado en build con `minisearch` en cliente
* **Gestor de paquetes**: `pnpm`

---

## 📋 Prerrequisitos

* **Node.js**: `v20.x` o superior (probado en Node `v24.x`)
* **pnpm**: `v10.x` o superior
* **Git**: `v2.x`

---

## 🚀 Inicio Rápido

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/crissXcoder/primer-agente.git
   cd primer-agente
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

---

## 🧪 Comandos de Calidad y Verificación

Antes de enviar cambios o crear ramas de despliegue, verifica que todo esté en verde:

```bash
# 1. Pruebas unitarias de integridad y validación Zod
pnpm test

# 2. Verificación estricta de tipos TypeScript
pnpm typecheck

# 3. Análisis estático y formateo con ESLint
pnpm lint

# 4. Compilación estática de producción (Turbopack)
pnpm build
```

---

## ✍️ Cómo Contribuir una Guía

¡Las contribuciones de la comunidad son bienvenidas! Para mantener la calidad pedagógica y técnica del sitio, cada nueva guía debe seguir estas pautas:

### Checklist de Verificación de Contenido:
- [ ] **Documentación oficial vigente**: No escribas comandos de memoria; consúltalos en la documentación oficial de la herramienta y añade los enlaces en el campo `sources`.
- [ ] **Enfoque para principiantes**: Explica los conceptos nuevos (como qué es `PATH`, por qué reiniciar la terminal o qué es un entorno virtual) sin asumir experiencia previa en línea de comandos.
- [ ] **Verificación observable**: Cada paso técnico debe terminar con una comprobación visible. Incluye siempre el componente `<Verify>` con la sección *"¿Cómo sé que funcionó?"* y la salida exacta que verá el usuario.
- [ ] **Frontmatter Zod estricto**: Cumple con todos los campos requeridos en [`src/lib/content/schema.ts`](./src/lib/content/schema.ts) (`title`, `slug`, `summary`, `track`, `level`, `os`, `tools`, `tags`, `timeMinutes`, `verifiedAt`, `appliesTo`, `evidence`, `sources`, `errors`).
- [ ] **Advertencias de seguridad**: Cualquier riesgo sobre claves de API, permisos de administrador (`sudo`) o paquetes no confiables debe advertirse en un componente `<Callout type="peligro">`.
- [ ] **Pruebas y Build en verde**: Asegúrate de que `pnpm test`, `pnpm typecheck`, `pnpm lint` y `pnpm build` finalicen con código de salida 0 antes de abrir un Pull Request.

Para más detalles, consulta la [Guía de Contribución](./CONTRIBUTING.md).

---

## 📁 Estructura del Proyecto

```text
├── docs/
│   ├── SPEC.md           # Especificación completa y modelo de datos
│   └── DECISIONS.md      # Registro de decisiones de arquitectura (ADR)
├── src/
│   └── app/              # Rutas y páginas de Next.js App Router
├── AGENTS.md             # Reglas operativas para asistentes de IA y desarrollo
├── CLAUDE.md             # Reglas y atajos para Claude Code
├── LICENSE               # Licencia dual (MIT para código, CC BY 4.0 para contenido)
└── package.json          # Scripts y dependencias del proyecto
```

---

## 📄 Licencia

* **Código fuente**: Licencia [MIT](./LICENSE).
* **Contenido educativo y guías**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
