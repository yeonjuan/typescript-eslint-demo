import * as converter from "@/lib/parser-options-converter";
import { ParserOptions } from "@typescript-eslint/parser";
import { JsxEmit } from "typescript";

const JSX_PARSER_OPTIONS: ParserOptions = {
  ecmaVersion: 2019,
  ecmaFeatures: {
    jsx: true,
    globalReturn: true,
  },
  sourceType: "module",
};

describe("parser-options-converter", () => {
  it("toTSESTOptions", () => {
    expect(converter.toTSESTOptions(JSX_PARSER_OPTIONS)).toMatchObject({
      jsx: true,
      useJSXTextNode: true,
    });
  });

  it("toCompilerOptions", () => {
    expect(converter.toCompilerOptions(JSX_PARSER_OPTIONS)).toMatchObject({
      jsx: JsxEmit.Preserve,
    });
  });
});
