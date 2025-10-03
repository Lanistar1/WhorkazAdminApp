// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// type Theme = 'light' | 'dark';

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType>({
//   theme: 'light',
//   toggleTheme: () => {},
// });

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [theme, setTheme] = useState<Theme>('light');
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     // Get stored theme or default to 'light'
//     const storedTheme = localStorage.getItem('theme') as Theme | null;
//     const initialTheme = storedTheme || 'light';
//     console.log('Applying initial theme:', initialTheme); // Debug log
//     document.documentElement.classList.remove('light', 'dark');
//     document.documentElement.classList.add(initialTheme);
//     setTheme(initialTheme);
//     setIsMounted(true);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     console.log('Toggling theme to:', newTheme); // Debug log
//     document.documentElement.classList.remove('light', 'dark');
//     document.documentElement.classList.add(newTheme);
//     localStorage.setItem('theme', newTheme);
//     setTheme(newTheme);
//   };

//   // Prevent rendering until theme is applied
//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);




"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}