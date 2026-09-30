export interface MideTuMismoProps {
  comando: string;
  queMirar: string;
}

export function MideTuMismo({ comando, queMirar }: MideTuMismoProps) {
  return (
    <section
      aria-label="Actividad: mide tu contexto"
      className="my-5 min-w-0 rounded-lg border border-outline-variant bg-surface-container-low p-4 text-on-surface"
    >
      <h3 className="m-0 font-heading text-base font-semibold">Mide tú mismo</h3>
      <div className="my-3 min-w-0 overflow-x-auto rounded-md border border-outline-variant bg-inverse-surface p-3">
        <code className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-inverse-on-surface">
          {comando}
        </code>
      </div>
      <p className="font-sans text-sm leading-relaxed"><strong>Qué mirar:</strong> {queMirar}</p>
      <div
        role="group"
        aria-label="Plantilla para anotar resultados en papel"
        className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2"
      >
        <div className="min-h-24 rounded-md border border-dashed border-outline-variant bg-surface-container-lowest p-3">
          <p className="m-0 font-mono text-xs font-medium text-on-surface-variant">Sesión nueva: medida base</p>
          <div aria-hidden="true" className="mt-3 border-b border-dashed border-outline-variant" />
          <div aria-hidden="true" className="mt-4 border-b border-dashed border-outline-variant" />
        </div>
        <div className="min-h-24 rounded-md border border-dashed border-outline-variant bg-surface-container-lowest p-3">
          <p className="m-0 font-mono text-xs font-medium text-on-surface-variant">Con una pieza más</p>
          <div aria-hidden="true" className="mt-3 border-b border-dashed border-outline-variant" />
          <div aria-hidden="true" className="mt-4 border-b border-dashed border-outline-variant" />
        </div>
      </div>
      <p className="mb-0 mt-3 font-sans text-xs leading-relaxed text-on-surface-variant">
        Plantilla estática para anotar en papel; no envía ni guarda tus resultados.
      </p>
    </section>
  );
}
