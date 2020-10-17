import { TS_ESLINT_SCOPE } from "@/constants";
import type { Linter } from "eslint";
import type { ParserOptions } from "@typescript-eslint/types";

const PARSER_NAME = "@typescript-eslint/parser";

interface ESLintPlugin {
  rules: Linter.RulesRecord;
  config: Linter.Config;
}

export interface DemoLintResult {
  messages: Linter.LintMessage[];
  fixReport: Linter.FixReport;
}

export interface DemoLinter {
  lint(
    code: string,
    parserOptions: ParserOptions,
    rules: Linter.RulesRecord
  ): DemoLintResult;
}

function loadPlugin(): Promise<ESLintPlugin> {
  return import("@typescript-eslint/eslint-plugin");
}

function loadParser() {
  return import(`@/lib/parser`);
}

async function loadESLinter() {
  return import("eslint/lib/linter/linter");
}

export async function loadDemoLinter(): Promise<DemoLinter> {
  const plugins = loadPlugin();
  const parser = loadParser();
  const ESLinter = loadESLinter();

  const linter = new (await ESLinter).Linter();

  const rules = Object.entries((await plugins).rules).reduce(
    (rules, [name, rule]) => ({
      ...rules,
      [`${TS_ESLINT_SCOPE}/${name}`]: rule,
    })
  );

  linter.defineParser(PARSER_NAME, await parser);
  linter.defineRules(rules);

  return {
    lint(
      code: string,
      parserOptions: ParserOptions,
      rules: Linter.RulesRecord
    ): DemoLintResult {
      const messages: Linter.LintMessage[] = linter.verify(code, {
        parser: PARSER_NAME,
        parserOptions,
        rules,
      });
      const fixReport: Linter.FixReport = linter.verifyAndFix(code, {
        parser: PARSER_NAME,
        parserOptions,
        rules,
      });
      return { messages, fixReport };
    },
  };
}
