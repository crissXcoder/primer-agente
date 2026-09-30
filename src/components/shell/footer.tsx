import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/60 bg-surface-container-low text-on-surface-variant font-sans text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Identidad del proyecto */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base text-on-surface">
                primer-agente
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-surface-container text-tertiary border border-outline-variant">
                Hobby / Open Source
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
              Base de conocimiento estática, verificable y gratuita para instalar y configurar agentes de IA y su entorno de desarrollo. Iniciativa educativa para el taller de agentes de IA de la Semana U (Universidad Nacional de Costa Rica - UNA, Campus Nicoya).
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href="/guias"
                  className="inline-block py-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Catálogo de Guías
                </Link>
              </li>
              <li>
                <Link
                  href="/rutas"
                  className="inline-block py-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Rutas de Aprendizaje
                </Link>
              </li>
              <li>
                <Link
                  href="/errores"
                  className="inline-block py-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Solución de Errores
                </Link>
              </li>
              <li>
                <Link
                  href="/taller"
                  className="inline-block py-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Material del Taller UNA
                </Link>
              </li>
              <li>
                <Link
                  href="/_diseno"
                  className="inline-block py-1.5 text-tertiary hover:underline transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Catálogo de Diseño (/_diseno)
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Licencias y Créditos */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">
              Gobernanza
            </h4>
            <div className="space-y-1.5 text-xs">
              <p>
                Código bajo licencia{" "}
                <a
                  href="https://opensource.org/licenses/MIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-medium hover:underline"
                >
                  MIT
                </a>.
              </p>
              <p>
                Contenido bajo{" "}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-medium hover:underline"
                >
                  CC BY 4.0
                </a>.
              </p>
              <p className="pt-2 text-on-surface-variant/80">
                Desplegado en Vercel (Plan Hobby, uso no comercial).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-outline-variant/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-on-surface-variant">
          <p>© 2026 Cristian Araya · Universidad Nacional de Costa Rica (UNA)</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/crissXcoder/primer-agente"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub Repo ↗
            </a>
            <span>•</span>
            <span>Español (Costa Rica 🇨🇷)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
