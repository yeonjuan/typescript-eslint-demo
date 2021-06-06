import React from "react";
import ReactDom from "react-dom";
import { App } from "./components/App";
import { RecoilRoot } from "recoil";

ReactDom.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("app")
);
