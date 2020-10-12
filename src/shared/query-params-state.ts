import queryString from "query-string";
import type { Linter } from "eslint";

interface QueryParamsState {
  code?: string;
  rules?: Linter.RulesRecord;
}

export const queryParamsState = {
  get(): QueryParamsState {
    try {
      const decoded = decodeURIComponent(
        escape(atob(location.hash.replace("#", "")))
      );
      return JSON.parse(decoded);
    } catch {}
    return {};
  },
  set(state: QueryParamsState): void {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    location.hash = encoded;
  },
};
