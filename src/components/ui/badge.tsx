import * as React from "react";

export type BadgeStatus = "verified" | "review" | "outdated" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus;
  label?: string;
  showIcon?: boolean;
}

export function Badge({
  status = "neutral",
  label,
  showIcon = true,
  className = "",
  children,
  ...props
}: BadgeProps) {
  const statusConfig = {
    verified: {
      defaultLabel: "Verificada",
      classes:
        "bg-status-verified-bg text-status-verified-text border-status-verified-border",
      icon: (
        <svg
          className="w-3 h-3 text-status-verified-text shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    review: {
      defaultLabel: "Por revisar",
      classes:
        "bg-status-review-bg text-status-review-text border-status-review-border",
      icon: (
        <svg
          className="w-3 h-3 text-status-review-text shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
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
    outdated: {
      defaultLabel: "Desactualizada",
      classes:
        "bg-status-outdated-bg text-status-outdated-text border-status-outdated-border",
      icon: (
        <svg
          className="w-3 h-3 text-status-outdated-text shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
    neutral: {
      defaultLabel: "General",
      classes:
        "bg-surface-container text-on-surface-variant border-outline-variant",
      icon: (
        <span
          className="w-1.5 h-1.5 rounded-full bg-outline shrink-0"
          aria-hidden="true"
        />
      ),
    },
  };

  const current = statusConfig[status];
  const displayContent = children || label || current.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium border ${current.classes} ${className}`}
      {...props}
    >
      {showIcon && current.icon}
      <span>{displayContent}</span>
    </span>
  );
}
