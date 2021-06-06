import React from "react";
import { useRecoilValueLoadable } from "recoil";
import * as states from "@/states";
import type { FC } from "react";
import "@/css/fixed.css";

export const Fixed: FC = () => {
  const lintResult = useRecoilValueLoadable(states.lintResultState);
  let code = "";
  if (lintResult.state === "hasValue") {
    code = lintResult.contents.fixed;
  }
  return <pre className="fixed-code">{code}</pre>;
};
