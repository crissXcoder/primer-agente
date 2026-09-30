import * as React from "react";

export type CalloutType = "tip" | "aviso" | "peligro";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType;
  title?: string;
}

export function Callout({
  type = "tip",
  title,
  className = "",
  children,
  ...props
}: CalloutProps) {
  const config = {
    tip: {
      defaultTitle: "Consejo Práctico",
      role: "note",
      containerClasses:
        "bg-surface-container-low border-primary-container/60 text-on-surface",
      iconClasses: "text-primary",
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    aviso: {
      defaultTitle: "Aviso Importante",
      role: "note",
      containerClasses:
        "bg-status-review-bg/40 border-status-review-border text-on-surface",
      iconClasses: "text-status-review-text",
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    peligro: {
      defaultTitle: "Peligro / Atención",
      role: "alert",
      containerClasses:
        "bg-error-container/40 border-error/50 text-on-surface",
      iconClasses: "text-error",
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  const current = config[type];
  const displayTitle = title || current.defaultTitle;

  return (
    <div
      role={current.role}
      className={`rounded-lg border p-4 my-4 flex gap-3 ${current.containerClasses} ${className}`}
      {...props}
    >
      <div className={`mt-0.5 ${current.iconClasses}`}>{current.icon}</div>
      <div className="flex-1 space-y-1">
        <h4 className="font-heading text-sm font-semibold text-on-surface leading-tight">
          {displayTitle}
        </h4>
        <div className="font-sans text-sm text-on-surface-variant leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
