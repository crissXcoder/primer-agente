import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      id,
      label,
      helperText,
      error,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="font-mono text-xs font-medium text-on-surface-variant flex items-center justify-between"
          >
            <span>
              {label}
              {required && (
                <span className="text-error ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </span>
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className={`w-full rounded h-10 px-3 bg-surface-container-lowest text-on-surface font-sans text-sm border transition-colors duration-150 outline-none
              ${
                error
                  ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                  : "border-secondary/70 focus:border-primary-container focus:ring-2 focus:ring-primary-container/30"
              }
              disabled:opacity-50 disabled:bg-surface-container-low disabled:cursor-not-allowed placeholder:text-outline
              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <p
            id={errorId}
            className="font-sans text-xs text-error font-medium flex items-center gap-1 mt-1"
            role="alert"
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="font-sans text-xs text-on-surface-variant">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
