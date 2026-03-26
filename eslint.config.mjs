

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // Global linter settings
    linterOptions: {
      reportUnusedDisableDirectives: "off",   // ← This removes the "Unused eslint-disable directive" warnings
    },
  },

  {
    // Your custom rules
    rules: {
      // Allow unused variables if they start with underscore (_email, _setPassword, etc.)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // Downgrade exhaustive-deps to warning (very common in React/Next apps)
      "react-hooks/exhaustive-deps": "warn",

      // Turn off annoying Next.js rule if you use <img> tags
      "@next/next/no-img-element": "off",

      // Turn off 'any' type warnings (you can tighten this later)
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    // Ignore patterns
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.config.js",     // optional: ignore config files if needed
    ],
  },
];

export default eslintConfig;