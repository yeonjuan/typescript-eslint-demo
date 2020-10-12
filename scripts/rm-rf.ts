import fs from "fs";
import path from "path";

(function rmrf([dirPath]: string[]) {
  try {
    fs.rmdirSync(path.resolve(process.cwd(), dirPath), { recursive: true });
  } catch {}
})(process.argv.slice(2));
