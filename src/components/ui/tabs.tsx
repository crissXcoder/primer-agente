"use client";

import * as React from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  selectedTabId?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({
  items,
  defaultTabId,
  selectedTabId,
  className = "",
  onTabChange,
}: TabsProps) {
  const [internalTab, setInternalTab] = React.useState<string>(
    defaultTabId || (items.length > 0 ? items[0].id : "")
  );

  const activeTab = selectedTabId !== undefined ? selectedTabId : internalTab;

  const tabListRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    setInternalTab(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = -1;

    if (e.key === "ArrowRight") {
      targetIndex = (currentIndex + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = items.length - 1;
    }

    if (targetIndex !== -1) {
      e.preventDefault();
      const targetTab = items[targetIndex];
      handleSelect(targetTab.id);

      // Enfocar el botón del tab correspondiente
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]'
      );
      if (buttons && buttons[targetIndex]) {
        buttons[targetIndex].focus();
      }
    }
  };

  const activeItem = items.find((item) => item.id === activeTab) || items[0];

  return (
    <div className={`w-full my-4 ${className}`}>
      {/* Tablist */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        className="flex items-center gap-1 border-b border-outline-variant bg-surface-container-low p-1 rounded-t-lg"
      >
        {items.map((tab, idx) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                ${
                  isSelected
                    ? "bg-surface-container-lowest text-primary font-semibold border border-outline-variant/60 shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }
              `}
            >
              {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tabpanel */}
      {activeItem && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          tabIndex={0}
          className="rounded-b-lg border-x border-b border-outline-variant bg-surface-container-lowest p-5 font-sans text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
