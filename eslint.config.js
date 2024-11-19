import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
   {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      languageOptions: {
         globals: globals.browser,
      },
      settings: {
         react: {
            version: "detect", // React 버전을 자동으로 감지
         },
      },
      rules: {
         "react/react-in-jsx-scope": "off",
         "react/jsx-uses-react": "off",
      },
      plugins: [eslint()],
      ...pluginJs.configs.recommended,
      ...pluginReact.configs.flat.recommended,
   },
];
