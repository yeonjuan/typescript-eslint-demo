import React from "react";
import { Alert } from "react-bootstrap";
import { TS_ESLINT_SCOPE } from "@/components/constants";
import type { FC } from "react";
import type { Linter } from "eslint";

const DOCS_PATH =
  "https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/";

interface Props {
  message: Linter.LintMessage;
}

export const LintMessage: FC<Props> = (props) => {
  const { line, column, message: lintMsg, ruleId, fatal } = props.message;

  return (
    <Alert variant={fatal ? "danger" : "primary"}>
      {`${line}:${column} - ${lintMsg}`}(
      <Alert.Link
        target="_blank"
        rel="noopener noreferrer"
        href={`${DOCS_PATH}${ruleId?.replace(`${TS_ESLINT_SCOPE}/`, "")}.md`}
      >
        {ruleId}
      </Alert.Link>
      )
    </Alert>
  );
};
