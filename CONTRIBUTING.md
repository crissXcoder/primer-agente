# Guía de Contribución para primer-agente

¡Pura vida y gracias por interesarte en colaborar con **primer-agente**! 🇨🇷

Este repositorio es una iniciativa educativa pública y gratuita creada para apoyar a participantes del taller de agentes de IA de la Semana U (Universidad Nacional de Costa Rica - UNA, Campus Nicoya) y a cualquier persona que esté dando sus primeros pasos en tecnología y terminales.

---

## 📜 Reglas de Oro para Redactar Guías

Para asegurar la calidad pedagógica y técnica, todas las guías deben cumplir con las siguientes directrices establecidas en [`AGENTS.md`](./AGENTS.md):

1. **Cero comandos de memoria**: Ningún comando de instalación o configuración se escribe de memoria. Todo debe verificarse en la documentación oficial vigente de la herramienta y citarse en el campo `sources` del frontmatter.
2. **Público principiante**: Asume que el lector nunca ha tocado una consola. Explica conceptos nuevos la primera vez que aparecen (como qué es `PATH`, por qué reiniciar la terminal o qué es un entorno virtual).
3. **Verificación observable**: Cada paso técnico debe tener una comprobación visible. Toda guía debe incluir el componente `<Verify>` con el comando de comprobación y la salida exacta esperada (*"¿Cómo sé que funcionó?"*).
4. **Frontmatter validado con Zod**: El encabezado de cada archivo `.mdx` en `content/guias/` debe cumplir estrictamente el esquema Zod definido en [`src/lib/content/schema.ts`](./src/lib/content/schema.ts).
5. **Seguridad y Advertencias**: Cualquier advertencia sobre claves de API, permisos de administrador o dependencias de terceros debe colocarse dentro de un componente `<Callout type="peligro">`.
6. **Evidencia veraz**: En el campo `evidence`, marca `"ejecutada"` únicamente si probaste personalmente los comandos en ese sistema operativo; de lo contrario, utiliza `"docs-oficiales"`.

---

## 🛠️ Flujo de Trabajo Local

1. **Clonar e instalar dependencias:**
   ```bash
   git clone https://github.com/crissXcoder/primer-agente.git
   cd primer-agente
   pnpm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para previsualizar los cambios.

3. **Checklist obligatorio antes de abrir un Pull Request:**
   Antes de solicitar revisión, todos los siguientes comandos deben terminar con código de salida **0**:
   ```bash
   # 1. Pruebas unitarias de integridad y validación Zod
   pnpm test

   # 2. Verificación estricta de tipos de TypeScript
   pnpm typecheck

   # 3. Análisis de código estático y estilos
   pnpm lint

   # 4. Compilación estática de producción (SSG)
   pnpm build
   ```

---

## 📄 Licencias

Al contribuir a este repositorio, aceptas que tus aportes se distribuyen bajo:
* **Código fuente**: Licencia [MIT](./LICENSE).
* **Contenido educativo, guías y textos**: [Creative Commons Atribución 4.0 Internacional (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
