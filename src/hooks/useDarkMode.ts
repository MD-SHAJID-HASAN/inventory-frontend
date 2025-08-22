import { useState, useEffect, useCallback } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkModeState] = useState(false); // Default to false for SSR

  // initialize
  useEffect(() => {
    const stored = localStorage.getItem("dark-mode");
    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDarkMode = stored ? stored === "true" : systemIsDark;

    setDarkModeState(initialDarkMode);
    document.documentElement.classList.toggle("dark", initialDarkMode);

    // listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("dark-mode")) {
        setDarkModeState(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    // listen for storage changes (other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "dark-mode") {
        const newValue = e.newValue === "true";
        setDarkModeState(newValue);
        document.documentElement.classList.toggle("dark", newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // make setter act like React's setState
  const setDarkMode = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      setDarkModeState(prev => {
        const isDark = typeof value === "function" ? value(prev) : value;
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("dark-mode", isDark.toString());
        return isDark;
      });
    },
    []
  );

  return [darkMode, setDarkMode] as const;
}
