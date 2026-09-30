"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/lib/use-local-storage";

interface ChecklistItem {
  id: string;
  title: string;
  desc: string;
  guideLink?: string;
  guideText?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "terminal-admin",
    title: "Terminal con permisos de administrador",
    desc: "Asegúrate de saber cómo abrir PowerShell como Administrador en Windows o la Terminal en macOS/Linux.",
  },
  {
    id: "git-setup",
    title: "Git instalado y configurado",
    desc: "Tener Git instalado y tu nombre y correo configurados globalmente.",
    guideLink: "/guias/instalar-git",
    guideText: "Ver guía de Git →",
  },
  {
    id: "node-setup",
    title: "Node.js (versión LTS) y pnpm listos",
    desc: "Node.js 20+ o 22+ instalado con pnpm habilitado vía corepack.",
    guideLink: "/guias/instalar-nodejs",
    guideText: "Ver guía de Node.js →",
  },
  {
    id: "code-editor",
    title: "Editor de código o IDE listo",
    desc: "Tener instalado VS Code, Cursor u otro editor con el que te sientas cómodo trabajando.",
  },
  {
    id: "github-account",
    title: "Cuenta de GitHub activa",
    desc: "Acceso a tu cuenta en github.com para clonar y sincronizar repositorios del taller.",
  },
];

export function WorkshopChecklist() {
  const [checkedIds, setCheckedIds] = useLocalStorage<string[]>(
    "primer-agente-workshop-checklist",
    []
  );

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const allDone = checkedIds.length === CHECKLIST_ITEMS.length;

  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-on-surface">
            Checklist: Preparación Técnica de tu Máquina
          </h2>
          <p className="font-sans text-xs text-on-surface-variant">
            Marcá cada ítem conforme vayas dejando listo tu equipo. Se guarda automáticamente en tu navegador.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {allDone ? (
            <Badge status="verified" label="¡Máquina 100% Lista!" />
          ) : (
            <span className="font-mono text-xs font-semibold text-tertiary">
              {checkedIds.length} de {CHECKLIST_ITEMS.length} listos
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-3.5 rounded-lg border transition-colors cursor-pointer select-none ${
                isChecked
                  ? "border-status-verified-border bg-status-verified-bg/20"
                  : "border-outline-variant/60 bg-surface hover:bg-surface-container-low"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <span className={`font-heading text-sm font-semibold block ${isChecked ? "text-on-surface-variant line-through" : "text-on-surface"}`}>
                  {item.title}
                </span>
                <p className="font-sans text-xs text-on-surface-variant">
                  {item.desc}
                </p>
                {item.guideLink && (
                  <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={item.guideLink}
                      className="font-mono text-xs text-secondary hover:text-primary font-medium underline"
                    >
                      {item.guideText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {checkedIds.length > 0 && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-mono text-error hover:underline cursor-pointer"
          >
            Limpiar checklist
          </button>
        </div>
      )}
    </div>
  );
}
