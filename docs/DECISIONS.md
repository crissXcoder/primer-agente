# Registro de Decisiones de Arquitectura (ADR)

Este documento registra las decisiones técnicas clave tomadas para el proyecto **primer-agente**, evaluando opciones, ventajas, desventajas y la justificación según los requerimientos de [`docs/SPEC.md`](file:///c:/Users/crisa/Chambas/primer-agente/docs/SPEC.md).

---

## 1. Selección de Librería MDX

### Contexto y Requerimientos
El proyecto es una base de conocimiento estática con guías estructuradas. El frontmatter de cada archivo MDX debe ser validado rigurosamente mediante esquemas Zod antes de su renderizado. El stack utiliza Next.js 16 (App Router), React 19 y Turbopack.

### Opciones Evaluadas
1. **`@next/mdx` (Oficial de Next.js)**:
   * *Ventajas*: Mantenido directamente por el equipo de Next.js.
   * *Desventajas*: Trata los archivos MDX como páginas/rutas directas o requiere loaders complejos. Dificulta separar metadatos de frontmatter para pasarlos por validación Zod previa al renderizado, y complica el filtrado, listado y ordenamiento de guías en colecciones dinámicas (`/guias`, `/guias/[slug]`).
2. **`contentlayer`**:
   * *Desventajas*: Proyecto abandonado/sin mantenimiento activo para las versiones modernas de Next.js y React 19.
3. **`next-mdx-remote` (con React Server Components `next-mdx-remote/rsc`)**:
   * *Ventajas*:
     * Diseñado específicamente para React Server Components (RSC) y App Router.
     * El procesamiento y renderizado ocurre 100% en tiempo de compilación/servidor (SSG), enviando cero JavaScript del compilador MDX al navegador del cliente.
     * Permite desacoplar la lectura del archivo (`fs.readFile`) y la extracción del frontmatter (vía `gray-matter`) para validarlo estrictamente con Zod antes de pasarlo al componente.
     * Compatible con Turbopack y sin necesidad de alterar `next.config.ts` con plugins complejos.

### Decisión
Adoptar **`next-mdx-remote/rsc`** junto con **`gray-matter`**.
* Justificación: Brinda el máximo control sobre la validación Zod del frontmatter, excelente rendimiento estático en App Router, soporte de componentes React personalizados dentro del markdown y cero sobrecarga de bundle en el cliente.

---

## 2. Selección de Motor de Búsqueda en Cliente

### Contexto y Requerimientos
Búsqueda y filtrado rápido en el cliente sobre el contenido de las guías sin dependencias de backend, bases de datos ni servicios de terceros (Algolia, Firebase, etc.), respetando el plan Hobby de Vercel y el hosting estático.

### Opciones Evaluadas
1. **`pagefind`**:
   * *Ventajas*: Motor de indexación estática muy eficiente para sitios web completos.
   * *Desventajas*: Requiere un paso posterior al build que inspecciona el HTML generado (`postbuild`), lo cual añade complejidad en Vercel y dificulta la integración directa con la interfaz de usuario reactiva de filtros combinados (por sistema operativo, track o tags).
2. **`fuse.js`**:
   * *Ventajas*: Muy popular para búsqueda difusa en arreglos JavaScript.
   * *Desventajas*: Más pesado (~12kB gzipped) y con menor rendimiento en consultas de texto libre o búsqueda por prefijo en tiempo real en comparación con soluciones indexadas.
3. **`minisearch`**:
   * *Ventajas*:
     * Ultraligero (< 5kB gzipped, cero dependencias).
     * Construye un índice invertido eficiente que soporta búsqueda por prefijo (escribir mientras se busca), búsqueda exacta y difusa (*fuzzy search*).
     * Soporta ponderación de campos (*field boosting*), permitiendo priorizar coincidencias en el título, tags y herramientas sobre el cuerpo del resumen.
     * Se alimenta directamente de un archivo JSON generado en el build (`search-index.json`), el cual se puede cachear y cargar de forma asíncrona solo cuando el usuario interactúa con la barra de búsqueda.

### Decisión
Adoptar **`minisearch`** con un índice generado durante el proceso de build.
* Justificación: Proporciona la mejor combinación de velocidad de respuesta, ligereza de carga en el cliente, soporte de prefijos/tolerancia a errores, y cero costo de infraestructura externa.
