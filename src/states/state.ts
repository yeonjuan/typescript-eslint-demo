import { atom, selector } from "recoil";
import { loadDemoLinter, DemoLinter } from "@/lib/linter";
import {
  DEFAULT_CODE,
  DEFAULT_RULE_CONFIG,
  DEFAULT_PARSER_OPTIONS,
} from "@/constants";
import { queryParamsState } from "@/shared/query-params-state";
import type { ParserOptions } from "@typescript-eslint/types";
import type { Linter } from "eslint";

export const codeState = atom<string>({
  key: "code",
  default: queryParamsState.get().code || DEFAULT_CODE,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((code) => {
        const { code: oldCode, ...rest } = queryParamsState.get();
        if (typeof code === "string") {
          queryParamsState.set({ ...rest, code: code });
        }
      });
    },
  ],
});

export const rulesConfigState = atom<{
  rules: Linter.RulesRecord;
  error: Error | null;
}>({
  key: "rulesConfig",
  default: {
    rules: DEFAULT_RULE_CONFIG,
    error: null,
  },
});

export const parserOptionsState = atom<ParserOptions>({
  key: "parserOptions",
  default: DEFAULT_PARSER_OPTIONS,
});

let linter: DemoLinter | null = null;

export const lintResultState = selector<{
  fixed: string;
  messages: Linter.LintMessage[];
}>({
  key: "lintResult",
  get: async ({ get }) => {
    const code = get(codeState);
    const parserOptions = get(parserOptionsState);
    const ruleConfig = get(rulesConfigState);
    if (!linter) {
      linter = await loadDemoLinter();
    }
    const { messages, fixReport } = linter.lint(
      code,
      parserOptions,
      ruleConfig.rules
    );
    return {
      fixed: fixReport.output,
      messages,
    };
  },
});
