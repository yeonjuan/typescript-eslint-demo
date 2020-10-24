import { createProgram, ScriptKind } from "typescript";
import type { SourceFile, Program } from "typescript";
import { createCompilerHost } from "./compiler-host";
import { createFilesIncludeLibs } from "./files";
import { createSourceFilesIncludeLibs } from "./source-files";
import { toCompilerOptions } from "@/lib/parser-options-converter";
import { DEMO_FILE_NAME } from "@/constants";
import type { ParserOptions } from "@typescript-eslint/types";

interface ASTandProgram {
  ast?: SourceFile;
  program: Program;
}

export function createAstAndProgram(
  code: string,
  parserOptions: ParserOptions
): ASTandProgram {
  const files = createFilesIncludeLibs(DEMO_FILE_NAME, code);
  const sourceFiles = createSourceFilesIncludeLibs(
    DEMO_FILE_NAME,
    code,
    parserOptions?.ecmaFeatures?.jsx ? ScriptKind.TSX : ScriptKind.TS
  );

  const compilierHost = createCompilerHost(files, sourceFiles);
  const compilerOptions = toCompilerOptions(parserOptions);
  compilerOptions.jsx;
  const program = createProgram(
    Object.keys(files),
    compilerOptions,
    compilierHost
  );
  const ast = program.getSourceFile(DEMO_FILE_NAME);
  return { ast, program };
}
