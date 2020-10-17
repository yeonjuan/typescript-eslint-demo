import {
  createProgram,
  ScriptTarget,
  ModuleKind,
  JsxEmit,
  ScriptKind,
} from "typescript";
import type { SourceFile, Program } from "typescript";
import { createCompilerHost } from "./compiler-host";
import { createFilesIncludeLibs } from "./files";
import { createSourceFilesIncludeLibs } from "./source-files";
import { DEMO_FILE_NAME } from "@/constants";

interface ASTandProgram {
  ast?: SourceFile;
  program: Program;
}

export function createAstAndProgram(code: string, extra: any): ASTandProgram {
  const files = createFilesIncludeLibs(DEMO_FILE_NAME, code);
  const sourceFiles = createSourceFilesIncludeLibs(
    DEMO_FILE_NAME,
    code,
    extra.jsx ? ScriptKind.TSX : ScriptKind.TS
  );

  const compilierHost = createCompilerHost(files, sourceFiles);

  const program = createProgram(
    Object.keys(files),
    {
      noResolve: true,
      strict: true,
      target: ScriptTarget.Latest,
      jsx: extra.jsx ? JsxEmit.Preserve : undefined,
      module: ModuleKind.ES2015,
    },
    compilierHost
  );
  const ast = program.getSourceFile(DEMO_FILE_NAME);
  return { ast, program };
}
