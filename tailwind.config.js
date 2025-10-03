/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Must be 'class' for dark mode to work
  theme: {
    extend: {
        colors: {
            primary: {
            100: "#3900DC",
            500: "#741b1b",
            900: "#5a0e0e",
            },
            secondary: "#7630a1"
        },
        fontFamily: {
            redhat: ["var(--font-red-hat-display)", "sans-serif"],
        },
    },
  },
  plugins: [],
};