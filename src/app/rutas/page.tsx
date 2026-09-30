import Link from "next/link";
import type { Metadata } from "next";
import { LEARNING_ROUTES } from "@/lib/content/routes-data";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rutas de Aprendizaje | primer-agente",
  description:
    "Secuencias guiadas paso a paso para aprender y configurar tu entorno de desarrollo y agentes de IA en orden lógico.",
};

export default function RutasPage() {
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="space-y-2 border-b border-outline-variant/60 pb-6">
        <h1 className="font-heading text-3xl font-bold text-on-surface tracking-tight">
          Rutas Formativas Recomendadas
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-3xl">
          ¿No sabes por dónde empezar? Sigue una ruta paso a paso diseñada para construir tu entorno con bases sólidas y sin contradicciones.
        </p>
      </div>

      {/* Grid de Rutas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEARNING_ROUTES.map((route) => (
          <Card key={route.slug} className="flex flex-col justify-between hover:border-primary-container transition-colors">
            <CardHeader>
              <span className="font-mono text-xs text-primary font-bold">
                RUTA FORMATIVA · {route.guideSlugs.length} GUÍAS
              </span>
              <CardTitle className="text-xl mt-2 text-on-surface">
                {route.title}
              </CardTitle>
              <CardDescription>{route.summary}</CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex items-center justify-between w-full pt-2">
                <span className="font-mono text-xs text-on-surface-variant">
                  Sin cuentas · Avance local
                </span>
                <Link href={`/rutas/${route.slug}`}>
                  <Button variant="primary" size="sm">
                    Explorar Ruta →
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
