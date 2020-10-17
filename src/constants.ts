import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";

export const DEMO_FILE_NAME = "/demo.tsx";

export const EDITING_TIMEOUT = 300;

export const TS_ESLINT_SCOPE = "@typescript-eslint";

export const BOOLEAN_ECMA_FEATURES = ["jsx", "globalReturn"] as const;

export const ECMA_VERSIONS = [2015, 2016, 2017, 2018, 2019, 2020] as const;

export const SOURCE_TYPES = ["module", "script"] as const;

// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
export const DEFAULT_PARSER_OPTIONS: ParserOptions = {
  ecmaFeatures: {
    jsx: false,
    globalReturn: false,
  },
  ecmaVersion: 2018,
  project: ["./tsconfig.json"],
  sourceType: "script", // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
};

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
