import React from "react";
import { TS_ESLINT_SCOPE } from "@/components/constants";
import { Alert } from "react-bootstrap";
import type { FC } from "react";
import type { Linter } from "eslint";

const TS_ESLINT_DOCS_PATH =
  "https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/";

const ESLINT_DOCS_PATH = "https://eslint.org/docs/rules/";

function isTSESLintRule (ruleId: string) {
  return ruleId.startsWith('@typescript-eslint');
}

function getDocLink (ruleId: string | null) {
  if (ruleId) {
    if (isTSESLintRule(ruleId)) {
      return `${TS_ESLINT_DOCS_PATH}${ruleId.replace(`${TS_ESLINT_SCOPE}/`, '')}.md`;
    } else {
      return `${ESLINT_DOCS_PATH}${ruleId}`;
    }
  }
  return '';
}

interface Props {
  messages?: Linter.LintMessage[];
}

export const LintMessages: FC<Props> = (props) => {
  if (!props.messages?.length) {
    return <Alert variant="success"> Lint Free :) </Alert>;
  }

  return (
    <>
      {props.messages?.map(
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
