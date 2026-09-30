"use client";

import * as React from "react";
import { Tabs, TabItem } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { useLocalStorage } from "@/lib/use-local-storage";

export interface CommandProps {
  os: "windows" | "macos" | "linux";
  cmd: string;
  language?: string;
  filename?: string;
  description?: string;
}

export function Command({
  cmd,
  language,
  filename,
  description,
}: CommandProps) {
  return (
    <div className="space-y-2">
      {description && (
        <p className="font-sans text-sm text-on-surface-variant">
          {description}
        </p>
      )}
      <CodeBlock
        code={cmd}
        language={language}
        filename={filename}
      />
    </div>
  );
}

export interface OsTabsProps {
  children?: React.ReactNode;
  windowsCmd?: string;
  macosCmd?: string;
  linuxCmd?: string;
  windowsDesc?: string;
  macosDesc?: string;
  linuxDesc?: string;
}

export interface OsInstructionsProps {
  windows: string;
  macos: string;
  linux: string;
}

export function OsInstructions({ windows, macos, linux }: OsInstructionsProps) {
  const items: TabItem[] = [
    { id: "windows", label: "Windows", icon: <span>🪟</span>, content: <p>{windows}</p> },
    { id: "macos", label: "macOS", icon: <span>🍎</span>, content: <p>{macos}</p> },
    { id: "linux", label: "Linux", icon: <span>🐧</span>, content: <p>{linux}</p> },
  ];

  return <Tabs items={items} defaultTabId="windows" />;
}

export function OsTabs({
  windowsCmd,
  macosCmd,
  linuxCmd,
  windowsDesc,
  macosDesc,
  linuxDesc,
}: OsTabsProps) {
  const [preferredOs, setPreferredOs] = useLocalStorage<"windows" | "macos" | "linux">(
    "primer-agente-preferred-os",
    "windows"
  );

  const items: TabItem[] = [];

  if (windowsCmd) {
    items.push({
      id: "windows",
      label: "Windows (PowerShell)",
      icon: <span>🪟</span>,
      content: (
        <Command
          os="windows"
          cmd={windowsCmd}
          language="powershell"
          filename="powershell.exe"
          description={windowsDesc}
        />
      ),
    });
  }

  if (macosCmd) {
    items.push({
      id: "macos",
      label: "macOS (Terminal/Zsh)",
      icon: <span>🍎</span>,
      content: (
        <Command
          os="macos"
          cmd={macosCmd}
          language="bash"
          filename="zsh"
          description={macosDesc}
        />
      ),
    });
  }

  if (linuxCmd) {
    items.push({
      id: "linux",
      label: "Linux (Bash)",
      icon: <span>🐧</span>,
      content: (
        <Command
          os="linux"
          cmd={linuxCmd}
          language="bash"
          filename="bash"
          description={linuxDesc}
        />
      ),
    });
  }

  return (
    <Tabs
      items={items}
      defaultTabId="windows"
      selectedTabId={preferredOs}
      onTabChange={(os) => {
        if (os === "windows" || os === "macos" || os === "linux") {
          setPreferredOs(os);
        }
      }}
    />
  );
}
