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
    '@typescript-eslint/ban-ts-comment': 'off'
  }
};
