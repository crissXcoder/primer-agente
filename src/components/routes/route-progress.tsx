"use client";

import * as React from "react";
import Link from "next/link";
import { GuideFrontmatter } from "@/lib/content/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/use-local-storage";

export interface RouteProgressProps {
  routeSlug: string;
  routeTitle: string;
  guides: GuideFrontmatter[];
}

export function RouteProgress({
  routeSlug,
  guides,
}: RouteProgressProps) {
  const storageKey = `primer-agente-route-progress-${routeSlug}`;
  const [completedSlugs, setCompletedSlugs] = useLocalStorage<string[]>(storageKey, []);

  const toggleGuide = (slug: string) => {
    setCompletedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleReset = () => {
    setCompletedSlugs([]);
  };

  const percent =
    guides.length > 0
      ? Math.round((completedSlugs.length / guides.length) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Barra de Progreso Local */}
      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-semibold text-on-surface">
            Progreso en tu navegador (sin cuentas ni registros):
          </span>
          <span className="text-primary font-bold">{percent}% completado</span>
        </div>

        {/* Barra de progreso visual */}
        <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/40">
          <div
            className="h-full bg-primary-container transition-all duration-300 rounded-full"
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-label="Progreso de la ruta"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono pt-1">
          <span>
            {completedSlugs.length} de {guides.length} guías marcadas como hechas
          </span>
          {completedSlugs.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-error hover:underline cursor-pointer"
            >
              Reiniciar progreso
            </button>
          )}
        </div>
      </div>

      {/* Secuencia Ordenada de Guías */}
      <div className="space-y-4">
        {guides.map((guide, idx) => {
          const isDone = completedSlugs.includes(guide.slug);

          return (
            <Card
              key={guide.slug}
              className={`transition-colors ${
                isDone
                  ? "border-status-verified-border/80 bg-status-verified-bg/10"
                  : "bg-surface-container-lowest"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2">
                <div className="flex items-start gap-4">
                  {/* Checkbox accesible */}
                  <label className="flex items-center gap-2 cursor-pointer mt-1 md:mt-0 select-none">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleGuide(guide.slug)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                    />
                    <span className="sr-only">Marcar {guide.title} como completada</span>
                  </label>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-tertiary font-bold">
                        Paso {idx + 1}
                      </span>
                      {isDone && (
                        <Badge status="verified" label="Completada" />
                      )}
                      <span className="font-mono text-xs text-on-surface-variant">
                        ⏱ {guide.timeMinutes} min
                      </span>
                    </div>

                    <h3 className={`font-heading text-lg font-semibold ${isDone ? "text-on-surface-variant line-through" : "text-on-surface"}`}>
                      {guide.title}
                    </h3>

                    <p className="font-sans text-xs text-on-surface-variant max-w-2xl">
                      {guide.summary}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end md:pl-4">
                  <Link href={`/guias/${guide.slug}`}>
                    <Button variant={isDone ? "outline" : "primary"} size="sm">
                      {isDone ? "Repasar Guía →" : "Iniciar Guía →"}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
