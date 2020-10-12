import React from "react";
import { Alert } from "react-bootstrap";
import type { FC } from "react";
import type { Linter } from "eslint";

interface Props {
  message: Linter.LintMessage;
}

export const Message: FC<Props> = ({ message }) => {
  const { line, column, message: lintMsg, ruleId, fatal } = message;

  return (
    <Alert variant={fatal ? "danger" : "primary"}>
      {`${line}:${column} - ${lintMsg} (${ruleId})`}
    </Alert>
  );
};
