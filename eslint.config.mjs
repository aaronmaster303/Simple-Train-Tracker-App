

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    rules: "react/prop-types": "offA"
  },
  pluginReact.configs.flat.recommended,
];
