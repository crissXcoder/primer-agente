import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/ui/code-block";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";

export default function StressPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const longTitle = "Diseño responsivo adversarial ".repeat(4).slice(0, 120);
  const longWord = "x".repeat(200);
  const longUrl = `https://example.invalid/${"segmento-muy-largo/".repeat(12)}`;
  const longCommand = `pnpm exec herramienta --opcion ${"argumento-largo ".repeat(20)}`.slice(0, 300);
  const tabs = ["Windows", "macOS", "Linux", "ChromeOS", "FreeBSD", "Ubuntu", "Fedora", "Debian", "Arch", "WSL", "iOS", "Android"].map((label, index) => ({
    id: `so-${index}`,
    label,
    content: <p>Contenido de prueba para {label}.</p>,
  }));

  return (
    <main className="min-w-0 space-y-6" data-testid="stress-page">
      <h1 className="fluid-heading font-heading text-3xl font-semibold">{longTitle}</h1>
      <p>{longWord}</p>
      <p><a href={longUrl}>{longUrl}</a></p>
      <CodeBlock code={longCommand} language="bash" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 30 }, (_, index) => <span className="rounded border px-2 py-1" key={index}>Chip {index + 1}</span>)}
      </div>
      <Tabs items={tabs} />
      <div className="scroll-region" role="region" aria-label="Tabla extensa de prueba" tabIndex={0}>
        <table className="min-w-[900px] border-collapse">
          <thead><tr>{Array.from({ length: 12 }, (_, index) => <th className="border p-2 text-left" key={index}>Columna {index + 1}</th>)}</tr></thead>
          <tbody><tr>{Array.from({ length: 12 }, (_, index) => <td className="border p-2" key={index}>Dato {index + 1}</td>)}</tr></tbody>
        </table>
      </div>
      <Card>
        <div className="aspect-video w-full bg-surface-container-high" role="img" aria-label="Imagen de prueba para evaluar la proporción responsiva" />
        <p>{"Descripción larga de la tarjeta. ".repeat(25)}</p>
      </Card>
      <section aria-labelledby="stress-search-heading">
        <h2 id="stress-search-heading">200 resultados simulados de búsqueda</h2>
        <div className="responsive-grid gap-3">
          {Array.from({ length: 200 }, (_, index) => <Card key={index}><h3>Resultado {index + 1}</h3><p>Texto de resultado completo para verificar la cuadrícula.</p></Card>)}
        </div>
      </section>
    </main>
  );
}
