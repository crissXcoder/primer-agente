"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/guias", label: "Guías" },
    { href: "/rutas", label: "Rutas" },
    { href: "/errores", label: "Errores Comunes" },
    { href: "/taller", label: "Taller UNA" },
  ];

  return (
    <>
      {/* Skip-to-content link para accesibilidad WCAG */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-container focus:text-on-primary-fixed focus:font-heading focus:font-semibold focus:rounded focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md"
      >
        Saltar al contenido principal
      </a>

      <header data-site-header className="sticky top-[env(safe-area-inset-top,0px)] z-40 w-full border-b border-outline-variant/60 bg-surface/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 min-h-16 flex items-center justify-between gap-2">
          {/* Marca / Logo */}
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded p-1"
            >
              <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-heading font-bold text-base shadow-xs group-hover:bg-primary-container group-hover:text-on-primary-fixed transition-colors">
                PA
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="font-heading font-semibold text-base text-on-surface tracking-tight group-hover:text-primary transition-colors">
                  primer-agente
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant leading-none">
                  Semana U · UNA Nicoya
                </span>
              </div>
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-1 font-sans text-sm font-medium"
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-1.5 rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "text-primary font-semibold bg-surface-container-low"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Enlaces de Utilidad & GitHub */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/_diseno"
              className="inline-flex items-center px-2 py-1 rounded text-xs font-mono font-medium text-tertiary bg-surface-container border border-outline-variant hover:border-tertiary transition-colors"
            >
              Tokens & UI
            </Link>

            <a
              href="https://github.com/crissXcoder/primer-agente"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Repositorio de primer-agente en GitHub"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex md:hidden items-center gap-2">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-11 min-w-11 p-2 text-on-surface-variant hover:text-on-surface rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              aria-controls={menuId}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Panel Menú Móvil */}
        {mobileMenuOpen && (
          <div id={menuId} className="md:hidden border-t border-outline-variant bg-surface-container-lowest px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded text-base font-medium ${
                    isActive
                      ? "text-primary font-semibold bg-surface-container-low"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between">
              <Link
                href="/_diseno"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-tertiary"
              >
                🎨 Catálogo de UI /_diseno
              </Link>
              <a
                href="https://github.com/crissXcoder/primer-agente"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-on-surface-variant"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
