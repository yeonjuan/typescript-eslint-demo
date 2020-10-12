import React from "react";
import type { FC } from "react";

interface Props {
  code: string;
}

export const Fixed: FC<Props> = ({ code }) => <pre>{code}</pre>;
