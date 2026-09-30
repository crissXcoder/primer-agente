"use client";

import { useSyncExternalStore, useCallback } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("primer-agente-storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("primer-agente-storage", callback);
  };
}

/**
 * Hook universal para sincronizar estado con localStorage usando useSyncExternalStore (React 19)
 * Evita cascading renders, respeta SSR y sincroniza entre componentes sin useEffect.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const getSnapshot = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : JSON.stringify(initialValue);
    } catch {
      return JSON.stringify(initialValue);
    }
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => {
    return JSON.stringify(initialValue);
  }, [initialValue]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let parsed: T;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = initialValue;
  }

  const setValue = useCallback(
    (newVal: T | ((prev: T) => T)) => {
      try {
        let valueToStore: T;
        if (typeof newVal === "function") {
          const currentRaw = localStorage.getItem(key);
          const currentVal = currentRaw ? JSON.parse(currentRaw) : initialValue;
          valueToStore = (newVal as (prev: T) => T)(currentVal);
        } else {
          valueToStore = newVal;
        }
        localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event("primer-agente-storage"));
      } catch {
        // Fallback
      }
    },
    [key, initialValue]
  );

  return [parsed, setValue];
}
