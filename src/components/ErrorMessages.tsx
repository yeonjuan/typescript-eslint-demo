import React from "react";
import { Alert } from "react-bootstrap";
import type { FC } from "react";

interface Props {
  origin?: string;
  errors?: Error[];
}

export const ErrorMessages: FC<Props> = (props) => {
  if (!props.errors) {
    return null;
  }

  return (
    <>
      {props.errors?.map((error, index) => {
        return (
          <Alert variant="danger" key={`error-msg-${index}`}>
            {`${props.origin ?? ""}`}
            {`${error.message}`}
          </Alert>
        );
      })}
    </>
  );
};
