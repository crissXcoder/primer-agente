import * as React from "react";
import Image from "next/image";

export interface ScreenshotProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Screenshot({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
  className = "",
}: ScreenshotProps) {
  if (!alt || !alt.trim()) {
    throw new Error(
      `El componente <Screenshot> requiere obligatoriamente un atributo 'alt' descriptivo para accesibilidad WCAG. Fuente: ${src}`
    );
  }

  return (
    <figure className={`my-6 space-y-2 ${className}`}>
      <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center font-mono text-xs text-on-surface-variant">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
