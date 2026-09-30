import * as React from "react";
import Link from "next/link";
import { Steps, Step } from "./steps";
import { OsTabs, Command } from "./os-tabs";
import { Verify } from "./verify";
import { Screenshot } from "./screenshot";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";

export const mdxComponents = {
  // Componentes de Guía
  Steps,
  Step,
  OsTabs,
  Command,
  Verify,
  Screenshot,
  Callout,
  CodeBlock,
  Badge,

  // Sobrescritura de elementos HTML estándar
  h1: ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={`font-heading text-3xl sm:text-4xl font-semibold text-on-surface tracking-tight mt-8 mb-4 border-b border-outline-variant/60 pb-3 ${className}`}
      {...props}
    />
  ),
  h2: ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={`font-heading text-2xl font-semibold text-on-surface tracking-tight mt-8 mb-3 border-b border-outline-variant/40 pb-2 ${className}`}
      {...props}
    />
  ),
  h3: ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={`font-heading text-lg font-semibold text-on-surface tracking-tight mt-6 mb-2 ${className}`}
      {...props}
    />
  ),
  p: ({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={`font-sans text-base text-on-surface leading-relaxed my-3 ${className}`}
      {...props}
    />
  ),
  a: ({ href = "", className = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className={`text-secondary font-medium underline underline-offset-2 hover:text-primary transition-colors ${className}`}
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-secondary font-medium underline underline-offset-2 hover:text-primary transition-colors ${className}`}
        {...props}
      />
    );
  },
  ul: ({ className = "", ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={`list-disc list-inside space-y-1.5 my-4 font-sans text-sm text-on-surface ${className}`} {...props} />
  ),
  ol: ({ className = "", ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={`list-decimal list-inside space-y-1.5 my-4 font-sans text-sm text-on-surface ${className}`} {...props} />
  ),
  code: ({ className = "", ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={`rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-[0.875em] text-on-surface border border-outline-variant/60 ${className}`}
      {...props}
    />
  ),
};
