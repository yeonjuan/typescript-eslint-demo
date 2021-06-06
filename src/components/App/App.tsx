import React from "react";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import { CodeEditor } from "@/components/CodeEditor";
import { RuleConfig } from "@/components/RuleConfig";
import { Header } from "@/components/Header";
import { SplitPanel } from "@/components/SplitPanel";
import { ParserOptions } from "@/components/ParserOptions";
import { LintMessages } from "@/components/LintMessages";
import { Fixed } from "@/components/Fixed";
import * as states from "@/states";
import { useRecoilValueLoadable } from "recoil";
import type { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const App: FC = () => {
  const lintResult = useRecoilValueLoadable(states.lintResultState);
  return (
    <div className="app">
      <Header />
      <SplitPanel>
        <div style={{ width: "100%", display: "flex" }}>
          <SplitPanel vertical={true}>
            <div className="top">
              <CodeEditor />
            </div>
            <div className="bottom">
              <Tabs>
                <Tab eventKey="rules" title="Rules (json5)">
                  <RuleConfig />
                </Tab>
                <Tab eventKey="parserOptions" title="ParserOptions">
                  <ParserOptions />
                </Tab>
              </Tabs>
            </div>
          </SplitPanel>
        </div>
        <div style={{ width: "100%" }}>
          {lintResult.state === "loading" ? (
            <div>
              <Spinner animation="border" role="status" variant="primary">
                <span className="sr-only">Loading...</span>
              </Spinner>
              Loading... please wait
            </div>
          ) : (
            <Tabs>
              <Tab eventKey="messages" title="Messages">
                <LintMessages />
              </Tab>
              <Tab eventKey="fixed" title="Fixed">
                <Fixed />
              </Tab>
            </Tabs>
          )}
        </div>
      </SplitPanel>
    </div>
  );
};
