import * as React from "react";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { getOsFilePaths } from "@/lib/content/os-file-paths";

export interface RutaArchivosProps {
  relativePath: string;
  userName?: string;
}

export function RutaArchivos({ relativePath, userName = "TuUsuario" }: RutaArchivosProps) {
  const paths = getOsFilePaths(relativePath, userName);
  const items: TabItem[] = [
    { id: "windows", label: "Windows", content: <code className="font-mono break-all">{paths.windows}</code> },
    { id: "macos", label: "macOS", content: <code className="font-mono break-all">{paths.macos}</code> },
    { id: "linux", label: "Linux", content: <code className="font-mono break-all">{paths.linux}</code> },
  ];

  return (
    <div>
      <Tabs items={items} defaultTabId="windows" />
      <p className="font-sans text-sm text-on-surface-variant">
        Copiá y pegá la ruta en el campo indicado. Si contiene espacios, escribila entre comillas.
      </p>
    </div>
  );
}
