import React from "react";
import { Alert } from "react-bootstrap";
import type { FC } from "react";

interface Props {
  origin: string;
  error: Error;
}

export const ErrorMessage: FC<Props> = (props) => (
  <Alert variant="danger">
    <Alert.Heading>{props.origin}</Alert.Heading>
    {`${props.error}`}
  </Alert>
);
