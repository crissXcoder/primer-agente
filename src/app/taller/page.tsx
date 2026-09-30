import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Callout } from "@/components/ui/callout";
import { WorkshopChecklist } from "@/components/workshop/workshop-checklist";

export const metadata: Metadata = {
  title: "Taller Presencial Semana U | primer-agente",
  description:
    "Material, checklist de preparación y enlaces del Taller de Agentes de IA en la Universidad Nacional de Costa Rica (Campus Nicoya).",
};

export default function TallerPage() {
  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="space-y-3 border-b border-outline-variant/60 pb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge status="verified" label="Semana U 2026" />
          <Badge status="neutral" label="UNA · Campus Nicoya" />
          <span className="font-mono text-xs text-on-surface-variant font-medium">
            Taller Presencial de Agentes de IA
          </span>
        </div>
        <h1 className="fluid-heading font-heading text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
          Taller: Instalación y Configuración de tu Primer Agente de IA
        </h1>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          ¡Pura vida y bienvenidos al taller! Este espacio está diseñado para que dejes tu computadora lista antes de la sesión presencial en el campus, evitando atascos con descargas o permisos y aprovechando al máximo la práctica.
        </p>
      </div>

      {/* Callout amigable */}
      <Callout type="tip" title="¿Por qué preparar la máquina con anticipación?">
        En los talleres de tecnología, el internet y las descargas simultáneas suelen saturar la red. Si completas el checklist antes de llegar al aula, entrarás directo a la configuración de agentes y servidores MCP sin perder minutos valiosos.
      </Callout>

      {/* Checklist de Preparación */}
      <section aria-labelledby="checklist-heading">
        <WorkshopChecklist />
      </section>

      {/* Espacio para Materiales del Taller */}
      <section className="space-y-4 pt-4 border-t border-outline-variant/60">
        <h2 className="font-heading text-2xl font-bold text-on-surface">
          Materiales y Recursos de la Sesión
        </h2>
        <p className="font-sans text-sm text-on-surface-variant">
          Aquí encontrarás las presentaciones, repositorios de práctica y enlaces compartidos durante el taller:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:border-primary-container transition-colors">
            <CardHeader>
              <span className="font-mono text-xs text-tertiary font-bold">REPOSITORIO DE PRÁCTICA</span>
              <CardTitle className="text-base mt-1">Plantilla Base de Agente</CardTitle>
              <CardDescription>
                Repositorio con código inicial para clonar y practicar durante la clase de la Semana U.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="https://github.com/crissXcoder/primer-agente"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-secondary hover:underline"
              >
                github.com/crissXcoder/primer-agente ↗
              </a>
            </CardContent>
          </Card>

          <Card className="hover:border-primary-container transition-colors">
            <CardHeader>
              <span className="font-mono text-xs text-tertiary font-bold">DOCUMENTACIÓN COMPLEMENTARIA</span>
              <CardTitle className="text-base mt-1">Guías Paso a Paso</CardTitle>
              <CardDescription>
                Acceso completo al catálogo de guías de este sitio para repasar cada comando después del taller.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/guias" className="font-mono text-xs text-secondary hover:underline">
                Explorar catálogo de guías →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
