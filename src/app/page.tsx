import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Callout } from "@/components/ui/callout";

export default function Home() {
  return (
    <div className="space-y-12 py-4">
      {/* Sección Hero */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <Badge status="verified" label="Taller Semana U 2026" />
          <Badge status="neutral" label="UNA Campus Nicoya" />
          <span className="font-mono text-xs text-on-surface-variant">
            v0.1.0 · Base del Sistema Lista
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-on-surface tracking-tight leading-tight">
          Instala y configura tus primeros agentes de IA sin enredos
        </h1>

        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Base de conocimiento práctica y verificable para principiantes absolutos. Aprende a dominar la terminal, Git, Node.js, Python, uv, y a integrar herramientas con el protocolo MCP y skills de agentes.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/_diseno">
            <Button variant="primary" size="lg">
              🎨 Ver Catálogo del Sistema de Diseño (/_diseno)
            </Button>
          </Link>
          <a
            href="https://github.com/crissXcoder/primer-agente"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              Código en GitHub ↗
            </Button>
          </a>
        </div>
      </section>

      {/* Tarjetas de Pilares Técnicos */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default">
          <CardHeader>
            <div className="w-8 h-8 rounded bg-primary-container/20 text-primary flex items-center justify-center font-mono font-bold text-sm mb-2">
              01
            </div>
            <CardTitle>Comprobación Observable</CardTitle>
            <CardDescription>
              Cero comandos a ciegas. Cada guía concluye con la sección indispensable de <em>&ldquo;¿Cómo sé que funcionó?&rdquo;</em> y su salida esperada.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-mono text-xs text-tertiary">
              ✓ Telemetría verificable
            </span>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <div className="w-8 h-8 rounded bg-primary-container/20 text-primary flex items-center justify-center font-mono font-bold text-sm mb-2">
              02
            </div>
            <CardTitle>Multiplataforma Real</CardTitle>
            <CardDescription>
              Pestañas independientes y comandos adaptados para Windows (PowerShell/CMD), macOS (Zsh) y Linux (Bash).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-mono text-xs text-tertiary">
              ✓ Windows · macOS · Linux
            </span>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <div className="w-8 h-8 rounded bg-primary-container/20 text-primary flex items-center justify-center font-mono font-bold text-sm mb-2">
              03
            </div>
            <CardTitle>Ecosistema Moderno</CardTitle>
            <CardDescription>
              Desde CLI básica y entornos virtuales con <code>uv</code>, hasta configuración de servidores MCP y skills operativas de IA.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-mono text-xs text-tertiary">
              ✓ MCP · uv · Python · Node
            </span>
          </CardContent>
        </Card>
      </section>

      {/* Callout de bienvenida */}
      <Callout
        type="tip"
        title="Fase 1 completada: Sistema de diseño y Shell del sitio"
      >
        Los tokens cromáticos de <code>DESIGN.md</code>, la tipografía tripartita (IBM Plex Sans, Inter, JetBrains Mono) y las primitivas accesibles ya están activos. Visita la página <Link href="/_diseno" className="text-secondary font-medium underline">/_diseno</Link> para explorar todos los componentes interactivos.
      </Callout>
    </div>
  );
}
