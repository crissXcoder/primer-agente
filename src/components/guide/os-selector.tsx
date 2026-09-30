"use client";

import * as React from "react";
import { useLocalStorage } from "@/lib/use-local-storage";

export interface OsSelectorProps {
  supportedOs: Array<"windows" | "macos" | "linux">;
}

export function OsSelector({ supportedOs }: OsSelectorProps) {
  const [preferredOs, setPreferredOs] = useLocalStorage<"windows" | "macos" | "linux">(
    "primer-agente-preferred-os",
    "windows"
  );

  const activeOs = supportedOs.includes(preferredOs)
    ? preferredOs
    : supportedOs[0] || "windows";

  const osLabels = {
    windows: { label: "Windows", icon: "🪟" },
    macos: { label: "macOS", icon: "🍎" },
    linux: { label: "Linux", icon: "🐧" },
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low p-2">
      <span className="font-mono text-xs text-on-surface-variant font-medium px-2">
        Tu sistema preferido:
      </span>
      <div className="flex items-center gap-1">
        {supportedOs.map((os) => {
          const isSelected = activeOs === os;
          const { label, icon } = osLabels[os];
          return (
            <button
              key={os}
              type="button"
              onClick={() => setPreferredOs(os)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "bg-primary-container text-on-primary-fixed font-bold border border-primary/40 shadow-xs"
                  : "bg-surface text-on-surface hover:bg-surface-container-high border border-outline-variant/60"
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
