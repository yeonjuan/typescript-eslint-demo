import React from "react";
import { Message } from "@/components/Message";
import { Alert } from "react-bootstrap";
import type { FC } from "react";
import type {Linter} from "eslint";

interface Props {
  messages?: Linter.LintMessage[];
}

export const Messages: FC<Props> = ({ messages }) => {
  if (messages?.length === 0) {
    return <Alert variant="success"> Lint Free :) </Alert>;
  }

  return (
    <>
      {messages?.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </>
  );
};
