import {atom, selector} from 'recoil';
import { loadDemoLinter, DemoLinter } from "@/lib/linter";
import {
  DEFAULT_CODE,
  DEFAULT_RULE_CONFIG,
  ECMA_VERSIONS,
  SOURCE_TYPES,
  DEFAULT_PARSER_OPTIONS,
  BOOLEAN_ECMA_FEATURES,
} from "@/constants";
import type { ParserOptions, EcmaVersion } from "@typescript-eslint/types";
import type { Linter } from "eslint";

export const codeState = atom({
  key: 'code',
  default: '',
});

export const rulesState = atom({
  key: 'rules',
  default: {},
});

export const parserOptionsState = atom<ParserOptions>({
  key: 'parserOptions',
  default: DEFAULT_PARSER_OPTIONS
});

let linter: DemoLinter | null = null; 

export const lintResultState = selector<{
  fixed: string;
  messages: Linter.LintMessage[];
}>({
  key: 'lintResult',
  get: async ({get}) => {
    const code = get(codeState);
    const parserOptions = get(parserOptionsState);
    const rules = get(rulesState);
    if (!linter) {
      linter = await loadDemoLinter();
    }
    const {messages, fixReport} = linter.lint(code, parserOptions, rules);
    return {
      fixed: fixReport.output,
      messages,
    }
  }
});
