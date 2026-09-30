export interface MitoRealidadProps {
  mito: string;
  realidad: string;
  fuente: string;
}

export function MitoRealidad({ mito, realidad, fuente }: MitoRealidadProps) {
  return (
    <section className="my-4 grid gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-4 md:grid-cols-2">
      <div>
        <h3 className="m-0 font-heading text-sm font-semibold text-on-surface">Mito</h3>
        <p className="my-1 text-sm leading-relaxed text-on-surface">{mito}</p>
      </div>
      <div>
        <h3 className="m-0 font-heading text-sm font-semibold text-on-surface">Realidad</h3>
        <p className="my-1 text-sm leading-relaxed text-on-surface">{realidad}</p>
        <p className="m-0 text-xs text-on-surface-variant">Fuente: {fuente}</p>
      </div>
    </section>
  );
}
