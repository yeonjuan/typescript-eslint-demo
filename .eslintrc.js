module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  ignorePatterns: ["*.js"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
  },
  overrides: [
    {
      files: ["*.html"],
      plugins: ["@html-eslint"],
      parser: "@html-eslint/parser",
      rules: {
        "@html-eslint/require-lang": "error",
        "@html-eslint/require-title": "error",
        "@html-eslint/no-multiple-h1": "error"
      }
    },
  ],
};
