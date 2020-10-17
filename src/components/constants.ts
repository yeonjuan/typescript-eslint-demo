import type { Linter } from "eslint";

export const EDITING_TIMEOUT = 300;
export const TS_ESLINT_SCOPE = "@typescript-eslint";
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

export const ECMA_FEATURES = ["jsx", "globalReturn"] as const;

export const ECMA_VERSIONS = [2015, 2016, 2017, 2018, 2019, 2020] as const;

export const SOURCE_TYPES = ["module", "script"] as const;
