import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: tseslint.parser, // Explicitly set TypeScript parser
    parserOptions: {
      ecmaFeatures: { jsx: true },
      sourceType: "module",
    },
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "@typescript-eslint": tseslint.plugin, // Add TypeScript plugin
    import: importPlugin, // Add import plugin
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "error", // Catch 'any' usage
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "import/no-unresolved": "error", // Catch invalid imports
    "import/no-default-export": "off", // Allow default exports if preferred
    "react/prop-types": "off", // Disable since TypeScript handles this
  },
  settings: {
    react: { version: "detect" }, // Auto-detect React version
    "import/resolver": { typescript: {} }, // Support TypeScript imports
  },
});
