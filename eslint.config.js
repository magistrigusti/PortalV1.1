// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config(
  { ignores: ["dist"] }, // Игнорировать билд-папку
  {
    extends: [
      ...tseslint.configs.recommendedTypeChecked,     // Рекомендуемые правила TS c проверкой типов
      ...tseslint.configs.strictTypeChecked,          // Более строгие правила
      ...tseslint.configs.stylisticTypeChecked,       // Стилистические правила (по желанию)
    ],
    files: ["**/*.{ts,tsx}"],                        // Проверять только TS/TSX файлы
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,                      // Глобальные переменные для браузера
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'], // Пути к tsconfig для type-aware lint
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,                     // React hooks linting
      "react-refresh": reactRefresh,                 // React Fast Refresh (vite)
      "react-x": reactX,                             // Дополнительные правила React
      "react-dom": reactDom,                         // Дополнительные правила для react-dom
    },
    rules: {
      ...reactX.configs["recommended-typescript"].rules, // Правила для TS/React
      ...reactDom.configs.recommended.rules,             // Рекомендуемые для react-dom
      ...reactHooks.configs.recommended.rules,           // Рекомендуемые для хуков
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
