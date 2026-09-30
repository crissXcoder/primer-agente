"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AUDIENCE_LABELS, type AudienceType, type GuideFrontmatter, TRACK_LABELS } from "@/lib/content/schema";
import { normalizeText } from "@/lib/content/search-index";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface GuidesCatalogProps {
  initialGuides: GuideFrontmatter[];
}

export function GuidesCatalog({ initialGuides }: GuidesCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Obtener filtros desde los parámetros de la URL
  const queryParam = searchParams.get("q") || "";
  const osParam = searchParams.get("os") || "";
  const trackParam = searchParams.get("track") || "";
  const audienceParam = searchParams.get("audience") || "";
  const levelParam = searchParams.get("level") || "";
  const toolParam = searchParams.get("tool") || "";

  // Estado local para búsqueda instantánea
  const [prevQueryParam, setPrevQueryParam] = React.useState(queryParam);
  const [searchQuery, setSearchQuery] = React.useState(queryParam);

  if (queryParam !== prevQueryParam) {
    setPrevQueryParam(queryParam);
    setSearchQuery(queryParam);
  }

  // 2. Extraer listas de opciones disponibles en los datos
  const availableTracks = Array.from(new Set(initialGuides.map((g) => g.track)));
  const availableTools = Array.from(new Set(initialGuides.flatMap((g) => g.tools)));
  const availableOs = ["windows", "macos", "linux"] as const;

  // 3. Función para actualizar la URL manteniendo sincronizados los filtros
  const updateFilters = (newParams: Record<string, string>) => {
    // Tomar los parámetros actuales de la barra de direcciones real para evitar desfases de concurrencia
    const current =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(Array.from(searchParams.entries()));

    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    const newUrl = `${pathname}${query}`;

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", newUrl);
    }
    router.replace(newUrl, { scroll: false });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", pathname);
    }
    router.replace(pathname, { scroll: false });
  };

  // 4. Filtrar guías en memoria usando normalización lingüística (sin tildes ni mayúsculas)
  const filteredGuides = React.useMemo(() => {
    const effectiveQuery = searchQuery;
    const normalizedQuery = normalizeText(effectiveQuery);

    return initialGuides.filter((guide) => {
      // Filtro de texto libre
      if (normalizedQuery) {
        const titleMatch = normalizeText(guide.title).includes(normalizedQuery);
        const summaryMatch = normalizeText(guide.summary).includes(normalizedQuery);
        const tagsMatch = guide.tags.some((t) => normalizeText(t).includes(normalizedQuery));
        const toolsMatch = guide.tools.some((t) => normalizeText(t).includes(normalizedQuery));
        if (!titleMatch && !summaryMatch && !tagsMatch && !toolsMatch) {
          return false;
        }
      }

      // Filtro de Sistema Operativo
      if (osParam && !guide.os.includes(osParam as "windows" | "macos" | "linux")) {
        return false;
      }

      // Filtro de Pista / Track
      if (trackParam && guide.track !== trackParam) {
        return false;
      }

      if (audienceParam && guide.audience !== audienceParam) {
        return false;
      }

      // Filtro de Nivel
      if (levelParam && guide.level !== levelParam) {
        return false;
      }

      // Filtro de Herramienta
      if (toolParam && !guide.tools.includes(toolParam)) {
        return false;
      }

      return true;
    });
  }, [initialGuides, searchQuery, osParam, trackParam, audienceParam, levelParam, toolParam]);

  const hasActiveFilters = Boolean(searchQuery || osParam || trackParam || audienceParam || levelParam || toolParam);
  const activeFilterCount = [searchQuery, osParam, trackParam, audienceParam, levelParam, toolParam].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Barra de Búsqueda y Filtros */}
      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 space-y-4">
        {/* Campo de búsqueda principal */}
        <div className="relative">
          <Input
            id="search-guides-input"
            label="Buscar por título, herramienta o etiqueta (ignora tildes)"
            placeholder="Ej: instalacion, node, git, powershell..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateFilters({ q: e.target.value });
            }}
            className="w-full text-base"
          />
        </div>

        {/* Filtros desplegables y chips */}
        <details className="group pt-2" open>
          <summary className="min-h-11 flex cursor-pointer list-none items-center justify-between rounded border border-outline-variant px-3 font-mono text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden">
            <span>Filtros {activeFilterCount ? `(${activeFilterCount} activos)` : ""}</span>
            <span aria-hidden="true">⌄</span>
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-3">
          {/* Filtro Sistema Operativo */}
          <div>
            <label htmlFor="filter-os" className="font-mono text-xs text-on-surface-variant font-medium block mb-1">
              Sistema Operativo
            </label>
            <select
              id="filter-os"
              value={osParam}
              onChange={(e) => updateFilters({ os: e.target.value })}
              className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-on-surface font-sans text-xs focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Todos los sistemas</option>
              {availableOs.map((os) => (
                <option key={os} value={os}>
                  {os === "windows" ? "Windows" : os === "macos" ? "macOS" : "Linux"}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Pista / Track */}
          <div>
            <label htmlFor="filter-track" className="font-mono text-xs text-on-surface-variant font-medium block mb-1">
              Pista / Tema
            </label>
            <select
              id="filter-track"
              value={trackParam}
              onChange={(e) => updateFilters({ track: e.target.value })}
              className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-on-surface font-sans text-xs focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Todas las pistas</option>
              {availableTracks.map((t) => (
                <option key={t} value={t}>
                  {TRACK_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-audience" className="font-mono text-xs text-on-surface-variant font-medium block mb-1">
              Audiencia
            </label>
            <select
              id="filter-audience"
              value={audienceParam}
              onChange={(e) => updateFilters({ audience: e.target.value })}
              className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-on-surface font-sans text-xs focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Todas las audiencias</option>
              {(Object.keys(AUDIENCE_LABELS) as AudienceType[]).map((audience) => (
                <option key={audience} value={audience}>{AUDIENCE_LABELS[audience]}</option>
              ))}
            </select>
          </div>

          {/* Filtro Nivel */}
          <div>
            <label htmlFor="filter-level" className="font-mono text-xs text-on-surface-variant font-medium block mb-1">
              Nivel
            </label>
            <select
              id="filter-level"
              value={levelParam}
              onChange={(e) => updateFilters({ level: e.target.value })}
              className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-on-surface font-sans text-xs focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Todos los niveles</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
            </select>
          </div>

          {/* Filtro Herramienta */}
          <div>
            <label htmlFor="filter-tool" className="font-mono text-xs text-on-surface-variant font-medium block mb-1">
              Herramienta
            </label>
            <select
              id="filter-tool"
              value={toolParam}
              onChange={(e) => updateFilters({ tool: e.target.value })}
              className="w-full h-10 px-3 rounded border border-outline-variant bg-surface text-on-surface font-sans text-xs focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Todas las herramientas</option>
              {availableTools.map((tool) => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </select>
          </div>
          </div>
        </details>

        {/* Resumen de filtros y botón limpiar */}
        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/40">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-on-surface-variant font-semibold">
              Mostrando {filteredGuides.length} de {initialGuides.length} guías
            </span>
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              ✕ Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Región de anuncio para lectores de pantalla */}
      <div aria-live="polite" className="sr-only">
        {filteredGuides.length === 1
          ? "Se encontró 1 guía disponible"
          : `Se encontraron ${filteredGuides.length} guías disponibles`}
      </div>

      {/* Grid de Guías */}
      {filteredGuides.length > 0 ? (
        <div className="responsive-grid gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.slug} className="flex flex-col justify-between hover:border-primary-container transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge status="verified" label="Verificada" />
                    <Badge status="neutral" label={TRACK_LABELS[guide.track]} />
                    <Badge status="neutral" label={AUDIENCE_LABELS[guide.audience]} />
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant">
                    ⏱ {guide.timeMinutes} min
                  </span>
                </div>
                <CardTitle className="mt-2 text-xl hover:text-primary transition-colors">
                  <Link href={`/guias/${guide.slug}`} className="focus-visible:outline-none focus-visible:underline">
                    {guide.title}
                  </Link>
                </CardTitle>
                <CardDescription>{guide.summary}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {guide.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-mono text-[11px] border border-outline-variant/60"
                    >
                      {t}
                    </span>
                  ))}
                  {guide.os.map((so) => (
                    <span
                      key={so}
                      className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono text-[11px]"
                    >
                      {so}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <div className="card-actions flex items-center justify-between gap-2 w-full pt-2">
                  <span className="font-mono text-xs capitalize text-on-surface-variant">
                    Nivel: {guide.level}
                  </span>
                  <Link href={`/guias/${guide.slug}`}>
                    <Button variant="secondary" size="sm">
                      Leer Guía →
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Estado vacío en español de Costa Rica */
        <div className="rounded-lg border-2 border-dashed border-outline-variant p-10 text-center space-y-4 bg-surface-container-lowest">
          <div className="w-12 h-12 rounded-full bg-status-review-bg text-status-review-text flex items-center justify-center mx-auto text-xl font-bold">
            🔍
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-heading text-lg font-semibold text-on-surface">
              ¡Pucha! No encontramos ninguna guía con esos filtros
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Probá limpiando los términos de búsqueda, cambiando la pista o seleccionando otro sistema operativo.
            </p>
          </div>
          <div>
            <Button variant="primary" onClick={handleClearFilters}>
              Restablecer todos los filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
