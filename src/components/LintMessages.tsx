import React from "react";
import { LintMessage } from "@/components/LintMessage";
import { Alert } from "react-bootstrap";
import type { FC } from "react";
import type { Linter } from "eslint";

interface Props {
  messages?: Linter.LintMessage[];
}

export const LintMessages: FC<Props> = (props) => {
  if (props.messages?.length === 0) {
    return <Alert variant="success"> Lint Free :) </Alert>;
  }

  return (
    <>
      {props.messages?.map((message, index) => (
        <LintMessage key={index} message={message} />
      ))}
    </>
  );
};
