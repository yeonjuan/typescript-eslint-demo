import fs from "fs";
import * as ts from "typescript";
import path from "path";
import { createMinifier } from "dts-minify";

(function generateLibFiles() {
  const ROOT = path.resolve(__dirname, "../");
  const TS_LIB_PATH = path.resolve(ROOT, "node_modules/typescript/lib");
  const OUTPUT_PATH = path.resolve(ROOT, "src/ts-libs");
  const minifiler = createMinifier(ts);

  function isLibFile(fileName: string): boolean {
    return /^lib[\w\.]*\.(ts)$/.test(fileName);
  }

  function reolveToLibs(relPath: string): string {
    return path.resolve(TS_LIB_PATH, relPath);
  }

  function resolveToOutput(relPath: string): string {
    return path.resolve(OUTPUT_PATH, relPath);
  }

  function toProperty(fileName: string, text: string) {
    return `["${fileName}"]: \`${minifiler
      .minify(text)
      .replace(/\r?\n/g, "\n")}\`,\n`;
  }

  const libFiles = fs.readdirSync(TS_LIB_PATH).filter(isLibFile);
  const outPath = resolveToOutput("index.ts");
  let propertiesCode = "";

  libFiles.forEach((fileName) => {
    const srcPath = reolveToLibs(fileName);

    if (fs.existsSync(outPath)) {
      fs.unlinkSync(outPath);
    }
    propertiesCode += toProperty(
      `/${fileName}`,
      fs.readFileSync(srcPath).toString()
    );
  });

  const code = `
// Below code in module is copyright Microsoft and under the Apache License 2.0 (http://www.apache.org/licenses/LICENSE-2.0).
export default {
  ${propertiesCode}
} as {[name: string]: string};
  `;
  fs.writeFileSync(outPath, code);
})();
