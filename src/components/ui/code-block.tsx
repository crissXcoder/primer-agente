"use client";

import * as React from "react";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
  className = "",
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code.trim());
      } else {
        // Fallback para entornos donde clipboard API no esté disponible
        const textArea = document.createElement("textarea");
        textArea.value = code.trim();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignorar fallo silencioso
    }
  };

  return (
    <div
      className={`rounded-lg border border-outline/30 bg-inverse-surface text-inverse-on-surface my-4 overflow-hidden shadow-xs ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-outline/20 bg-inverse-surface/80">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-error/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-status-review-border/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container/80" />
          </span>
          <span className="font-mono text-xs text-inverse-on-surface/70 ml-2 font-medium">
            {filename || language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Código copiado" : "Copiar código al portapapeles"}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium text-inverse-on-surface/90 hover:text-white bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container cursor-pointer select-none"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-primary-container"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed selection:bg-primary-container selection:text-on-primary-fixed">
        <pre tabIndex={0}>
          <code>{code.trim()}</code>
        </pre>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? "Código copiado al portapapeles con éxito" : ""}
      </span>
    </div>
  );
}
