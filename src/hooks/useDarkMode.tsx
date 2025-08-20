import { useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = (value?: boolean) => {
    const isDark = value ?? !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('dark-mode', isDark.toString());
  };

  return [darkMode, toggleDarkMode] as const;
}
