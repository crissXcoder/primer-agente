import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto py-12 sm:py-16 text-center space-y-8">
      {/* Indicador de Estado */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/40 border border-error/40 font-mono text-xs font-semibold text-error">
        <span>ERROR 404</span>
        <span>•</span>
        <span>RUTA NO ENCONTRADA</span>
      </div>

      <div className="space-y-3">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-on-surface tracking-tight">
          ¡Upe! No encontramos esta página
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-lg mx-auto leading-relaxed">
          Tranqui, no te preocupés. Puede que el enlace esté desactualizado, el comando haya cambiado de nombre o la página se haya movido.
        </p>
      </div>

      {/* Tarjeta con Opciones de Navegación Útiles */}
      <Card className="text-left bg-surface-container-lowest">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            ¿Hacia dónde querés ir?
          </CardTitle>
          <CardDescription>
            Probá con una de estas opciones para encontrar la guía o herramienta que necesitás:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/"
              className="p-3.5 rounded border border-outline-variant/60 bg-surface hover:bg-surface-container-low transition-colors block group"
            >
              <span className="font-heading font-semibold text-sm text-secondary group-hover:text-primary block">
                🏠 Página de Inicio →
              </span>
              <span className="font-sans text-xs text-on-surface-variant">
                Volver a la portada y resumen del proyecto.
              </span>
            </Link>

            <Link
              href="/guias"
              className="p-3.5 rounded border border-outline-variant/60 bg-surface hover:bg-surface-container-low transition-colors block group"
            >
              <span className="font-heading font-semibold text-sm text-secondary group-hover:text-primary block">
                📚 Catálogo de Guías →
              </span>
              <span className="font-sans text-xs text-on-surface-variant">
                Explorar todas las guías con filtros por SO y pista.
              </span>
            </Link>

            <Link
              href="/errores"
              className="p-3.5 rounded border border-outline-variant/60 bg-surface hover:bg-surface-container-low transition-colors block group"
            >
              <span className="font-heading font-semibold text-sm text-secondary group-hover:text-primary block">
                🛠️ Buscador de Errores →
              </span>
              <span className="font-sans text-xs text-on-surface-variant">
                Buscar un síntoma de terminal y su solución exacta.
              </span>
            </Link>

            <Link
              href="/taller"
              className="p-3.5 rounded border border-outline-variant/60 bg-surface hover:bg-surface-container-low transition-colors block group"
            >
              <span className="font-heading font-semibold text-sm text-secondary group-hover:text-primary block">
                🎓 Checklist del Taller UNA →
              </span>
              <span className="font-sans text-xs text-on-surface-variant">
                Preparar tu máquina para el taller presencial de Semana U.
              </span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
