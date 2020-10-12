import type { Linter } from "eslint";

export const EDITING_TIMEOUT = 300;

export const DEFAULT_CODE = `
async function invalidInTryCatch1() {
  try {
    return Promise.resolve('try');
  } catch (e) {}
}
`;

export const DEFAULT_RULE_CONFIG: Linter.RulesRecord = {
  "@typescript-eslint/return-await": "error",
};

export const ECMA_VERSIONS = [
  "es2015",
  "es2016",
  "es2017",
  "es2018",
  "es2019",
  "es2020",
] as const;

export const ECMA_FEATURES = ["jsx", "globalReturn"] as const;
