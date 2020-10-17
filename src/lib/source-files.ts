import { LIB_FILES } from "@/lib/files";
import { ScriptTarget, createSourceFile, ScriptKind } from "typescript";
import type { SourceFile } from "typescript";

export interface SourceFiles {
  [name: string]: SourceFile;
}

function createTSSourceFile(
  name: string,
  code: string,
  scriptKind: ScriptKind
) {
  return createSourceFile(name, code, ScriptTarget.Latest, true, scriptKind);
}

const LIB_SOURCE_FILES = Object.entries(LIB_FILES).reduce(
  (sourceFiles, [name, code]) => ({
    ...sourceFiles,
    [name]: createTSSourceFile(name, code, ScriptKind.TS),
  })
);

export function createSourceFilesIncludeLibs(
  name: string,
  code: string,
  scriptKind: ScriptKind
): SourceFiles {
  return Object.assign(LIB_SOURCE_FILES, {
    [name]: createTSSourceFile(name, code, scriptKind),
  });
}
