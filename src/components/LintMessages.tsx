import React from "react";
import { TS_ESLINT_SCOPE } from "@/components/constants";
import { Alert } from "react-bootstrap";
import type { FC } from "react";
import type { Linter } from "eslint";

const DOCS_PATH =
  "https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/";

interface Props {
  messages?: Linter.LintMessage[];
}

export const LintMessages: FC<Props> = (props) => {
  if (!(props.messages?.length)) {
    return <Alert variant="success"> Lint Free :) </Alert>;
  }

  return (
    <>
      {props.messages?.map(
        ({ line, column, message: lintMsg, ruleId, fatal }, index) => {
          const variant = fatal ? "danger" : "primary";
          const key = `lint-msg-${index}`;
          const docUrl = `${DOCS_PATH}${ruleId?.replace(
            `${TS_ESLINT_SCOPE}/`,
            ""
          )}.md`;
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
