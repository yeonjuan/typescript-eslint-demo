import JSON5 from "json5";
import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/parser";

interface QueryParamsState {
  code?: string;
  rules?: Linter.RulesRecord;
  parserOptions?: ParserOptions;
}

export const queryParamsState = {
  get(): QueryParamsState {
    try {
      const decoded = decodeURIComponent(
        escape(atob(location.hash.replace("#", "")))
      );
      return JSON5.parse(decoded);
    } catch {}
    return {};
  },
  set(state: QueryParamsState): void {
    const encoded = btoa(unescape(encodeURIComponent(JSON5.stringify(state))));
    location.hash = encoded;
  },
};
