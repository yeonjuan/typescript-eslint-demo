import { getDefaultLibFileName } from "typescript";
import type {
  CompilerHost as ICompilerHost,
  CompilerOptions,
} from "typescript";
import type { Files } from "@/lib/files";
import type { SourceFiles } from "@/lib/source-files";

class CompilerHost implements ICompilerHost {
  constructor(private files: Files, private sourceFiles: SourceFiles) {}

  fileExists(name: string) {
    return !!this.files[name];
  }
  getCanonicalFileName(name: string) {
    return name;
  }
  getCurrentDirectory() {
    return "/";
  }
  getDirectories() {
    return [];
  }
  getDefaultLibFileName(options: CompilerOptions) {
    return "/" + getDefaultLibFileName(options);
  }
  getNewLine() {
    return "\n";
  }
  useCaseSensitiveFileNames() {
    return true;
  }
  writeFile() {
    return null;
  }
  readFile(name: string) {
    return this.files[name];
  }
  getSourceFile(name: string) {
    return this.sourceFiles[name];
  }
}

export function createCompilerHost(
  files: Files,
  sourceFiles: SourceFiles
): CompilerHost {
  return new CompilerHost(files, sourceFiles);
}
