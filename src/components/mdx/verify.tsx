import * as React from "react";
import { CodeBlock } from "@/components/ui/code-block";

export interface VerifyProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string;
  expectedOutput?: string;
  description?: string;
}

export function Verify({
  command,
  expectedOutput = "",
  description = "Ejecuta el siguiente comando en tu terminal para confirmar que la herramienta quedó instalada correctamente:",
  children,
  className = "",
  ...props
}: VerifyProps) {
  const safeOutput = (expectedOutput || "").trim();
  return (
    <div
      className={`rounded-lg border-2 border-primary-container/60 bg-surface-container-low/50 p-5 my-6 space-y-4 ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-status-verified-bg text-status-verified-text border border-status-verified-border flex items-center justify-center shrink-0">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-base font-semibold text-on-surface">
          ¿Cómo sé que funcionó?
        </h3>
      </div>

      <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
        {description}
      </p>

      {command && (
        <div className="space-y-1">
          <span className="font-mono text-xs text-on-surface-variant font-medium">
            Comando de comprobación:
          </span>
          <CodeBlock code={command} language="bash" filename="terminal" />
        </div>
      )}

      <div className="space-y-1">
        <span className="font-mono text-xs text-on-surface-variant font-medium">
          Salida esperada (o similar):
        </span>
        <div
          className="scroll-region rounded border border-outline-variant bg-surface-container-lowest p-3 font-mono text-xs text-on-surface leading-relaxed"
          tabIndex={0}
          role="region"
          aria-label="Salida esperada de verificación"
        >
          <pre>{safeOutput}</pre>
        </div>
      </div>

      {children && (
        <div className="pt-2 border-t border-outline-variant/40 font-sans text-xs text-on-surface-variant">
          {children}
        </div>
      )}
    </div>
  );
}
