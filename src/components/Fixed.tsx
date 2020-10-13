import React from "react";
import type { FC } from "react";
import "@/css/fixed.css";

interface Props {
  code: string;
}

export const Fixed: FC<Props> = ({ code }) => (
  <pre className="fixed-code">{code}</pre>
);
