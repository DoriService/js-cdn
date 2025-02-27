export default [
  {
    ignores: ["node_modules/"],
  },
  {
    files: ["**/src/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-undef": "error", // Detects undeclared variables
      "no-unused-vars": "warn", // Warns about unused variables
      "eqeqeq": "warn", // Encourages strict equality (===)
    },
  },
];
