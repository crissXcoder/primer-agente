import Link from "next/link";

const questions = [
  "¿Qué problema exacto resuelve?",
  "¿Lo intenté sin esto?",
  "¿Qué es realmente (skill, paquete, plugin, servidor)?",
  "¿Qué trae adentro?",
  "¿Cuánto contexto cuesta?",
  "¿Cómo lo quito?",
];

export interface AntesDeInstalarProps {
  que: string;
}

export function AntesDeInstalar({ que }: AntesDeInstalarProps) {
  return (
    <aside
      role="note"
      className="my-5 rounded-lg border border-status-review-border bg-status-review-bg/40 p-4 text-on-surface"
    >
      <h3 className="font-heading text-base font-semibold">
        Antes de instalar: {que}
      </h3>
      <ul className="my-3 list-disc space-y-1 pl-5 font-sans text-sm leading-relaxed">
        {questions.map((question) => <li key={question}>{question}</li>)}
      </ul>
      <p className="m-0 font-sans text-sm leading-relaxed">
        <Link
          href="/guias/antes-de-instalar-evaluar-con-criterio"
          className="font-medium text-secondary underline underline-offset-2"
        >
          Revisá la guía para evaluar una instalación con criterio
        </Link>
        . Si todavía no está publicada, el enlace queda pendiente.
      </p>
    </aside>
  );
}
