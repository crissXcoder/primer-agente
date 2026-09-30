"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs } from "@/components/ui/tabs";

export default function DisenoPage() {
  const [inputValue, setInputValue] = React.useState("uv venv mi-entorno");
  const [errorInput, setErrorInput] = React.useState("rm -rf /");

  const sampleWindowsCode = `# Crear y activar entorno virtual con uv en Windows
uv venv .venv
.venv\\Scripts\\activate

# Verificar versión instalada
python --version`;

  const sampleMacCode = `# Crear y activar entorno virtual con uv en macOS
uv venv .venv
source .venv/bin/activate

# Verificar versión instalada
python --version`;

  const sampleLinuxCode = `# Crear y activar entorno virtual con uv en Linux
uv venv .venv
source .venv/bin/activate

# Verificar versión instalada
python3 --version`;

  return (
    <div className="space-y-16 py-6">
      {/* Encabezado de la página */}
      <div className="border-b border-outline-variant pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Badge status="neutral" label="Página Temporal de Auditoría" />
          <span className="font-mono text-xs text-tertiary font-semibold">
            Industrial Electromechanical B2B UI
          </span>
        </div>
        <h1 className="fluid-heading font-heading text-3xl md:text-4xl font-semibold text-on-surface">
          Catálogo del Sistema de Diseño (/_diseno)
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-3xl">
          Esta vista reúne todos los componentes, variantes, tokens de diseño y validaciones de accesibilidad (WCAG AA) implementados para <strong>primer-agente</strong>.
        </p>
      </div>

      {/* 1. MUESTRAS DE PALETA CROMÁTICA */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface flex items-center gap-2">
          <span>01. Tokens Cromáticos y Superficies</span>
          <span className="font-mono text-xs text-on-surface-variant font-normal">
            (Tailwind v4 @theme)
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded border border-outline-variant bg-surface space-y-1">
            <div className="h-10 rounded bg-primary-container border border-primary flex items-center justify-center font-mono text-xs text-on-primary-fixed font-bold">
              #00B4D8
            </div>
            <p className="font-heading font-medium text-xs text-on-surface">primary-container</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Acciones / Botones</p>
          </div>

          <div className="p-3 rounded border border-outline-variant bg-surface space-y-1">
            <div className="h-10 rounded bg-secondary flex items-center justify-center font-mono text-xs text-white font-bold">
              #006399
            </div>
            <p className="font-heading font-medium text-xs text-on-surface">secondary</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Estructura / Enlaces</p>
          </div>

          <div className="p-3 rounded border border-outline-variant bg-surface space-y-1">
            <div className="h-10 rounded bg-tertiary flex items-center justify-center font-mono text-xs text-white font-bold">
              #006875
            </div>
            <p className="font-heading font-medium text-xs text-on-surface">tertiary</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Acentos / Estados</p>
          </div>

          <div className="p-3 rounded border border-outline-variant bg-surface space-y-1">
            <div className="h-10 rounded bg-surface-container-lowest border border-outline-variant flex items-center justify-center font-mono text-xs text-on-surface font-bold">
              #FFFFFF
            </div>
            <p className="font-heading font-medium text-xs text-on-surface">container-lowest</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Fondo Tarjetas</p>
          </div>

          <div className="p-3 rounded border border-outline-variant bg-surface space-y-1">
            <div className="h-10 rounded bg-inverse-surface flex items-center justify-center font-mono text-xs text-inverse-on-surface font-bold">
              #2B3134
            </div>
            <p className="font-heading font-medium text-xs text-on-surface">inverse-surface</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Terminal / Código</p>
          </div>

          <div className="p-3 rounded border border-outline-variant bg-surface space-y-1">
            <div className="h-10 rounded bg-error flex items-center justify-center font-mono text-xs text-white font-bold">
              #BA1A1A
            </div>
            <p className="font-heading font-medium text-xs text-on-surface">error</p>
            <p className="font-mono text-[10px] text-on-surface-variant">Alertas Técnicas</p>
          </div>
        </div>
      </section>

      {/* 2. ESCALAS TIPOGRÁFICAS */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          02. Jerarquía Tipográfica Tripartita
        </h2>
        <Card>
          <div className="space-y-4">
            <div className="border-b border-outline-variant/60 pb-3">
              <span className="font-mono text-xs text-tertiary">IBM Plex Sans (font-heading / semibold)</span>
              <p className="font-heading text-2xl md:text-3xl font-semibold text-on-surface mt-1">
                Encabezado Industrial de Instrumentación (32px / 24px)
              </p>
            </div>
            <div className="border-b border-outline-variant/60 pb-3">
              <span className="font-mono text-xs text-tertiary">Inter (font-sans / regular)</span>
              <p className="font-sans text-base text-on-surface mt-1 leading-relaxed">
                Texto de cuerpo diseñado para máxima legibilidad en párrafos largos de instrucciones técnicas, con un espaciado equilibrado y alta definición en pantallas estándar y retina.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-tertiary">JetBrains Mono (font-mono / medium)</span>
              <p className="font-mono text-sm text-secondary mt-1">
                git clone https://github.com/crissXcoder/primer-agente.git --depth=1
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* 3. BOTONES */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          03. Botones y Estados Interactivos
        </h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-lg border border-outline-variant bg-surface-container-lowest">
          <Button variant="primary">
            Botón Primario (#00B4D8)
          </Button>
          <Button variant="secondary">
            Botón Secundario
          </Button>
          <Button variant="outline">
            Botón Delineado
          </Button>
          <Button variant="ghost">
            Botón Fantasma
          </Button>
          <Button variant="primary" disabled>
            Primario Deshabilitado
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-on-surface-variant">Tamaños:</span>
          <Button variant="secondary" size="sm">Pequeño (sm)</Button>
          <Button variant="secondary" size="md">Mediano (md)</Button>
          <Button variant="secondary" size="lg">Grande (lg)</Button>
        </div>
      </section>

      {/* 4. CHIPS / BADGES */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          04. Chips y Badges de Estado (JetBrains Mono)
        </h2>
        <div className="flex flex-wrap items-center gap-3 p-6 rounded-lg border border-outline-variant bg-surface-container-lowest">
          <Badge status="verified" label="Guía Verificada" />
          <Badge status="review" label="Por revisar" />
          <Badge status="outdated" label="Desactualizada" />
          <Badge status="neutral" label="CLI: Git v2.53" />
          <Badge status="neutral" label="OS: Linux" />
        </div>
      </section>

      {/* 5. FORMULARIOS E INPUTS */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          05. Campos de Entrada (Input con Accesibilidad)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg border border-outline-variant bg-surface-container-lowest">
          <Input
            id="input-valido"
            label="Comando de Inicialización"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            helperText="Escribe el comando que deseas validar en la terminal."
          />

          <Input
            id="input-invalido"
            label="Comando Peligroso (Demostración de Error)"
            value={errorInput}
            onChange={(e) => setErrorInput(e.target.value)}
            error="¡Pucha! Este comando no parece seguro para ejecutar en tu sistema."
          />
        </div>
      </section>

      {/* 6. CALLOUTS */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          06. Callouts de Notificación Técnica
        </h2>
        <div className="space-y-2">
          <Callout type="tip" title="Consejo para Windows">
            Si estás usando PowerShell, asegúrate de haber ejecutado <code>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</code> antes de activar el entorno virtual.
          </Callout>

          <Callout type="aviso" title="Aviso de Versión de Python">
            Las versiones de Python 3.14+ pueden presentar advertencias en algunas librerías de agentes que aún compilan extensiones en C. Se recomienda Python 3.12 o 3.13.
          </Callout>

          <Callout type="peligro" title="Atención: Secretos y Tokens API">
            Nunca hagas commit de archivos <code>.env</code> que contengan llaves de API (como OpenAI o Gemini). Añádelos siempre a tu archivo <code>.gitignore</code>.
          </Callout>
        </div>
      </section>

      {/* 7. BLOQUES DE CÓDIGO */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          07. Bloque de Código en Terminal (Fondo Inverse Surface)
        </h2>
        <CodeBlock
          filename="instalar-uv.ps1"
          language="powershell"
          code={`# Instalación oficial de uv en Windows vía PowerShell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verificación de salida
uv --version`}
        />
      </section>

      {/* 8. PESTAÑAS (TABS) */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          08. Selector de Sistema Operativo Accesible (Tabs con Flechas del Teclado)
        </h2>
        <Tabs
          defaultTabId="win"
          items={[
            {
              id: "win",
              label: "Windows (PowerShell)",
              icon: <span>🪟</span>,
              content: (
                <div className="space-y-3">
                  <p className="text-on-surface-variant">
                    Comandos verificados en Windows 11 con PowerShell 7+:
                  </p>
                  <CodeBlock
                    filename="windows-setup.ps1"
                    language="powershell"
                    code={sampleWindowsCode}
                  />
                </div>
              ),
            },
            {
              id: "mac",
              label: "macOS (Zsh)",
              icon: <span>🍎</span>,
              content: (
                <div className="space-y-3">
                  <p className="text-on-surface-variant">
                    Comandos verificados en macOS Sequoia con Zsh:
                  </p>
                  <CodeBlock
                    filename="macos-setup.sh"
                    language="bash"
                    code={sampleMacCode}
                  />
                </div>
              ),
            },
            {
              id: "linux",
              label: "Linux (Bash)",
              icon: <span>🐧</span>,
              content: (
                <div className="space-y-3">
                  <p className="text-on-surface-variant">
                    Comandos verificados en Ubuntu 24.04 LTS:
                  </p>
                  <CodeBlock
                    filename="linux-setup.sh"
                    language="bash"
                    code={sampleLinuxCode}
                  />
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* 9. TARJETAS (CARDS) */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          09. Tarjetas de Telemetría y Contenedores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge status="verified" label="Verificada" />
                <span className="font-mono text-xs text-on-surface-variant">15 min</span>
              </div>
              <CardTitle className="mt-2">Instalación de uv y Python</CardTitle>
              <CardDescription>
                Aprende a gestionar entornos virtuales ultrarrápidos sin tocar la instalación global del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-mono text-xs text-on-surface-variant">Herramientas: uv, python, pip</p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <span>Dificultad: Principiante</span>
                <Button variant="secondary" size="sm">Ver Guía →</Button>
              </div>
            </CardFooter>
          </Card>

          <Card variant="accent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge status="review" label="Por revisar" />
                <span className="font-mono text-xs text-on-surface-variant">25 min</span>
              </div>
              <CardTitle className="mt-2">Servidor MCP para Archivos Locales</CardTitle>
              <CardDescription>
                Configuración del protocolo Model Context Protocol (MCP) para conectar asistentes a tu workspace local.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-mono text-xs text-on-surface-variant">Herramientas: node, mcp, npx</p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <span>Dificultad: Intermedio</span>
                <Button variant="secondary" size="sm">Ver Guía →</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
