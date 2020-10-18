import { analyze } from "@typescript-eslint/scope-manager";
import { visitorKeys } from "@typescript-eslint/typescript-estree";
import { astConverter } from "../../node_modules/@typescript-eslint/typescript-estree/dist/ast-converter";
import { createAstAndProgram } from "@/lib/create-ast-program";
import {
  toAnalyzeOptions,
  toTSESTOptions,
} from "@/lib/parser-options-converter";
import type { ParserOptions, TSESTree } from "@typescript-eslint/types";
import type {
  ParserServices,
  TSESTreeOptions,
} from "@typescript-eslint/typescript-estree";
import type { AST } from "@typescript-eslint/typescript-estree";

interface ParseForESLintResult {
  ast: TSESTree.Program & {
    range?: [number, number];
    tokens?: TSESTree.Token[];
    comments?: TSESTree.Comment[];
  };
  services: ParserServices;
  visitorKeys: typeof visitorKeys;
  scopeManager: any;
}

const extra: any = {
  code: "",
  comment: true,
  comments: [],
  createDefaultProgram: false,
  debugLevel: new Set(),
  errorOnTypeScriptSyntacticAndSemanticIssues: false,
  errorOnUnknownASTType: false,
  extraFileExtensions: [],
  filePath: "",
  jsx: false,
  loc: true,
  log: console.log, // eslint-disable-line no-console
  preserveNodeMaps: true,
  projects: [],
  range: true,
  strict: false,
  tokens: [],
  tsconfigRootDir: "/",
  useJSXTextNode: true,
};

interface ParseAndGenerateServicesResult<T extends TSESTreeOptions> {
  ast: AST<T>;
  services: ParserServices;
}

function parseAndGenerateServices<T extends TSESTreeOptions = TSESTreeOptions>(
  code: string,
  options: T
): ParseAndGenerateServicesResult<T> {
  extra.code = code;
  extra.jsx = options.jsx;

  const { ast, program } = createAstAndProgram(code, options);
  const { estree, astMaps } = astConverter(ast!, extra, true);
  return {
    ast: estree as AST<T>,
    services: {
      hasFullTypeInformation: true,
      program,
      esTreeNodeToTSNodeMap: astMaps.esTreeNodeToTSNodeMap,
      tsNodeToESTreeNodeMap: astMaps.tsNodeToESTreeNodeMap,
    },
  };
}

export function parseForESLint(
  code: string,
  parserOptions: ParserOptions
): ParseForESLintResult {
  const tsesOptions = toTSESTOptions(parserOptions);
  const { ast, services } = parseAndGenerateServices(code, tsesOptions);
  const analyzeOptions = toAnalyzeOptions(parserOptions);
  const scopeManager = analyze(ast, analyzeOptions);
  return { ast, services, scopeManager, visitorKeys };
}

export function parse(
  code: string,
  options: ParserOptions
): ParseForESLintResult["ast"] {
  return parseForESLint(code, options).ast;
}
