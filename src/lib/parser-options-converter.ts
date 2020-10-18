import type { ParserOptions } from "@typescript-eslint/types";
import type { AnalyzeOptions } from "@typescript-eslint/scope-manager";
import type { TSESTreeOptions } from "@typescript-eslint/typescript-estree";
import { CompilerOptions, ScriptTarget, JsxEmit, ModuleKind } from "typescript";

export function toAnalyzeOptions(parserOptions: ParserOptions): AnalyzeOptions {
  return {
    ecmaVersion: parserOptions.ecmaVersion,
    globalReturn: parserOptions.ecmaFeatures?.globalReturn ?? false,
    sourceType: parserOptions.sourceType ?? "script",
  };
}

export function toTSESTOptions(parserOptions: ParserOptions): TSESTreeOptions {
  return Object.assign({}, parserOptions, {
    jsx: parserOptions.ecmaFeatures?.jsx ?? false,
    useJSXTextNode: true,
    projectFolderIgnoreList: [],
  });
}

export function toCompilerOptions(
  parserOptions: ParserOptions
): CompilerOptions {
  return {
    noResolve: true,
    strict: true,
    target: ScriptTarget.Latest,
    jsx: parserOptions.ecmaFeatures?.jsx ? JsxEmit.Preserve : undefined,
    module: ModuleKind.ES2015,
  };
}
