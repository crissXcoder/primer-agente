import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-heading font-medium transition-colors duration-150 rounded cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-primary-container text-on-primary-fixed border border-transparent hover:brightness-95 active:brightness-90 font-semibold shadow-xs",
      secondary:
        "bg-surface-container-low text-secondary border border-outline-variant hover:bg-surface-container hover:border-secondary active:bg-surface-container-high",
      outline:
        "bg-surface-container-lowest text-secondary border border-secondary hover:bg-surface-container-low active:bg-surface-container",
      ghost:
        "bg-transparent text-on-surface hover:bg-surface-container-low active:bg-surface-container",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
