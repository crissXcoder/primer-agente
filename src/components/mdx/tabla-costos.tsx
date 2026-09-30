const rows = [
  ["CLAUDE.md / AGENTS.md", "Inicio de sesión", "El sistema lo incorpora", "Siempre", "Instrucciones largas compiten por atención"],
  ["Reglas por ruta", "Al aplicar la ruta o el archivo", "El sistema según el contexto", "Al aplicar", "Una regla ambigua puede afectar tareas relacionadas"],
  ["Skill", "Descripción disponible; procedimiento al invocarse", "Tú o el modelo", "Al usarla; descripción disponible", "Puede orientar mal o contener instrucciones no confiables"],
  ["MCP", "Herramientas disponibles al conectar o buscarlas", "Tú configuras; modelo solicita", "Al usarla", "Permite acceso a servicios y datos externos"],
  ["Hook", "En el evento configurado", "Un evento del sistema", "Ninguno por sí mismo", "Puede ejecutar acciones automáticamente"],
  ["Subagente", "Al delegar una tarea", "El agente principal o tú", "Aislado en su contexto", "Puede recibir demasiado acceso o instrucciones incompletas"],
  ["Plugin", "Componentes disponibles al activarlo", "Tú o la organización", "Varía según sus piezas", "Agrupa componentes de terceros que actúan con tus permisos"],
  ["Permisos", "En cada acción que regula", "Sistema y persona usuaria", "Ninguno", "Una autorización amplia aumenta el impacto de un error"],
];

export function TablaCostos() {
  return (
    <div
      role="region"
      aria-label="Tabla comparativa de piezas del entorno de un agente; desplázate horizontalmente para ver todas las columnas"
      tabIndex={0}
      className="my-5 min-w-0 overflow-x-auto rounded-lg border border-outline-variant bg-surface-container-lowest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <table className="w-full min-w-[760px] border-collapse text-left font-sans text-sm text-on-surface">
        <caption className="p-3 text-left font-medium text-on-surface-variant">
          Cuándo se carga cada pieza, quién la activa, su costo típico de contexto y su riesgo principal.
        </caption>
        <thead className="bg-surface-container-low">
          <tr>
            {["Pieza", "Cuándo se carga", "Quién la activa", "Costo típico", "Riesgo principal"].map((heading) => (
              <th key={heading} scope="col" className="border-y border-outline-variant px-3 py-2 font-semibold">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([piece, load, actor, cost, risk]) => (
            <tr key={piece} className="align-top even:bg-surface-container-low/60">
              {[piece, load, actor, cost, risk].map((value, index) => (
                index === 0
                  ? <th key={index} scope="row" className="border-b border-outline-variant/70 px-3 py-2 font-medium">{value}</th>
                  : <td key={index} className="border-b border-outline-variant/70 px-3 py-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
