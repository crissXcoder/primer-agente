import * as React from "react";

export function Steps({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`space-y-8 my-8 border-l-2 border-primary-container/40 pl-6 ml-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number | string;
  title: string;
}

export function Step({
  number,
  title,
  children,
  className = "",
  ...props
}: StepProps) {
  return (
    <div className={`relative space-y-3 ${className}`} {...props}>
      {/* Indicador numérico alineado sobre el borde izquierdo */}
      <div className="absolute -left-[37px] top-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-container text-on-primary-fixed font-mono text-xs font-bold border-2 border-surface shadow-xs">
        {number}
      </div>

      <h3 className="font-heading text-lg font-semibold text-on-surface tracking-tight pt-0.5">
        {title}
      </h3>

      <div className="font-sans text-sm text-on-surface-variant leading-relaxed">
        {children}
      </div>
    </div>
  );
}
