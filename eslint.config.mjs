import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginTanstackQuery from "@tanstack/eslint-plugin-query";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: latest,
      sourceType: "module",
    },
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    plugins: {
      react: pluginReact,
      "@tanstack/query": pluginTanstackQuery,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginTanstackQuery.configs.recommended.rules,
    },
  },
];
