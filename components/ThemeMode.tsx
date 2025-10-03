"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <MoonIcon className="w-5 h-5 mr-2 text-gray-900" />
        ) : (
          <SunIcon className="w-5 h-5 mr-2 text-gray-100" />
        )}
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default ThemeMode;
