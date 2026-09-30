"use client";

import * as React from "react";
import Link from "next/link";
import { normalizeText } from "@/lib/content/search-index";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ErrorItem {
  guideSlug: string;
  guideTitle: string;
  track: string;
  tools: string[];
  symptom: string;
  cause: string;
  fix: string;
}

export interface ErrorsCatalogProps {
  errors: ErrorItem[];
}

export function ErrorsCatalog({ errors }: ErrorsCatalogProps) {
  const [query, setQuery] = React.useState("");
  const [selectedTool, setSelectedTool] = React.useState("");

  const availableTools = Array.from(new Set(errors.flatMap((e) => e.tools)));

  const filteredErrors = React.useMemo(() => {
    const normQ = normalizeText(query);

    return errors.filter((err) => {
      if (normQ) {
        const symptomMatch = normalizeText(err.symptom).includes(normQ);
        const causeMatch = normalizeText(err.cause).includes(normQ);
        const fixMatch = normalizeText(err.fix).includes(normQ);
        const guideMatch = normalizeText(err.guideTitle).includes(normQ);
        if (!symptomMatch && !causeMatch && !fixMatch && !guideMatch) {
          return false;
        }
      }

      if (selectedTool && !err.tools.includes(selectedTool)) {
        return false;
      }

      return true;
    });
  }, [errors, query, selectedTool]);

  return (
    <div className="space-y-8">
      {/* Controles de Búsqueda */}
      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              id="search-error-input"
              label="Buscar por síntoma o mensaje de error recibido en la terminal"
              placeholder="Ej: no se reconoce como un comando interno, permission denied..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="filter-tool-errors" className="font-mono text-xs text-on-surface-variant font-medium block mb-1">
              Filtrar por Herramienta
            </label>
            <select
              id="filter-tool-errors"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-on-surface font-sans text-xs focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Todas las herramientas</option>
              {availableTools.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40 text-xs font-mono text-on-surface-variant">
          <span>Mostrando {filteredErrors.length} de {errors.length} errores documentados</span>
          {(query || selectedTool) && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedTool("");
              }}
              className="text-secondary hover:underline cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Región accesible aria-live */}
      <div aria-live="polite" className="sr-only">
        {`Se muestran ${filteredErrors.length} soluciones de errores`}
      </div>

      {/* Listado de Errores */}
      {filteredErrors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredErrors.map((err, idx) => (
            <Card key={idx} className="border-error/40 hover:border-error transition-colors bg-surface-container-lowest">
              <CardHeader>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-mono text-xs text-error font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-error" aria-hidden="true" />
                    SÍNTOMA DE ERROR
                  </span>
                  <div className="flex items-center gap-1">
                    {err.tools.map((t) => (
                      <Badge key={t} status="neutral" label={t} />
                    ))}
                  </div>
                </div>

                <CardTitle className="text-lg font-mono text-on-surface mt-2">
                  {err.symptom}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 font-sans text-sm">
                <div>
                  <strong className="text-on-surface text-xs font-mono uppercase tracking-wider block mb-1">
                    Causa probable:
                  </strong>
                  <p className="text-on-surface-variant leading-relaxed">
                    {err.cause}
                  </p>
                </div>

                <div className="rounded-lg bg-surface-container-low p-4 border border-outline-variant/60 space-y-1">
                  <strong className="text-tertiary text-xs font-mono uppercase tracking-wider block">
                    Solución recomendada:
                  </strong>
                  <p className="text-on-surface font-mono text-xs leading-relaxed">
                    {err.fix}
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex items-center justify-between w-full pt-2">
                  <span className="text-on-surface-variant text-xs">
                    Guía de origen: <strong>{err.guideTitle}</strong>
                  </span>
                  <Link
                    href={`/guias/${err.guideSlug}`}
                    className="text-secondary font-medium hover:underline text-xs"
                  >
                    Ver guía completa →
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-outline-variant p-8 text-center space-y-2 bg-surface-container-lowest">
          <h3 className="font-heading text-lg font-semibold text-on-surface">
            ¡Pura vida! No se encontraron errores con ese término
          </h3>
          <p className="font-sans text-sm text-on-surface-variant">
            Intenta buscar con palabras clave más generales como el nombre del comando o el sistema operativo.
          </p>
        </div>
      )}
    </div>
  );
}
