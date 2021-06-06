import React from "react";
import { TS_ESLINT_SCOPE } from "@/constants";
import { Alert } from "react-bootstrap";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { ErrorMessage } from "@/components/ErrorMessage";
import * as states from "@/states";
import type { FC } from "react";
import type { Linter } from "eslint";

const TS_ESLINT_DOCS_PATH =
  "https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/";

const ESLINT_DOCS_PATH = "https://eslint.org/docs/rules/";

function isTSESLintRule(ruleId: string) {
  return ruleId.startsWith("@typescript-eslint");
}

function getDocLink(ruleId: string | null) {
  if (ruleId) {
    if (isTSESLintRule(ruleId)) {
      return `${TS_ESLINT_DOCS_PATH}${ruleId.replace(
        `${TS_ESLINT_SCOPE}/`,
        ""
      )}.md`;
    } else {
      return `${ESLINT_DOCS_PATH}${ruleId}`;
    }
  }
  return "";
}

export const LintMessages: FC = () => {
  const lintResultLoadable = useRecoilValueLoadable(states.lintResultState);
  const ruleConfig = useRecoilValue(states.rulesConfigState);

  if (ruleConfig.error) {
    return <ErrorMessage origin="rules.json" error={ruleConfig.error} />;
  }

  let messages: Linter.LintMessage[] = [];

  if (lintResultLoadable.state === "hasValue") {
    messages = lintResultLoadable.contents.messages;
  }
  if (lintResultLoadable.state === "loading") {
    return <></>;
  }

  if (!messages.length) {
    return <Alert variant="success"> Lint Free :) </Alert>;
  }

  return (
    <>
      {messages?.map(
        ({ line = 0, column = 0, message: lintMsg, ruleId, fatal }, index) => {
          const variant = fatal ? "danger" : "primary";
          const key = `lint-msg-${index}`;
          const docUrl = getDocLink(ruleId);
          return (
            <Alert variant={variant} key={key}>
              {`${line}:${column} - ${lintMsg}`}(
              <Alert.Link
                target="_blank"
                rel="noopener noreferrer"
                href={docUrl}
              >
                {ruleId}
              </Alert.Link>
              )
            </Alert>
          );
        }
      )}
    </>
  );
};
