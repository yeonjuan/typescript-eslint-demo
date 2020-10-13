import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab, Spinner } from "react-bootstrap";
import { CodeEditor } from "@/components/CodeEditor";
import { RuleConfig } from "@/components/RuleConfig";
import { Messages } from "@/components/Messages";
import { Header } from "@/components/Header";
import { Fixed } from "@/components/Fixed";
import { loadDemoLinter, DemoLinter } from "@/lib/linter";
import { DEFAULT_CODE, DEFAULT_RULE_CONFIG } from "@/components/constants";
import { queryParamsState } from "@/shared/query-params-state";
import type { FC } from "react";
import type { Linter } from "eslint";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/css/app.css";

const parserOptions = {
  sourceType: "module",
  ecmaVersion: 10,
  project: ["./tsconfig.json"],
} as const;

export const App: FC = () => {
  const paramsState = queryParamsState.get();
  const [messages, setMessages] = useState<Linter.LintMessage[]>([]);
  const [code, setCode] = useState<string>(paramsState?.code || DEFAULT_CODE);
  const [rules, setRules] = useState(paramsState?.rules || DEFAULT_RULE_CONFIG);
  const [fixed, setFixed] = useState<string>("");
  const [linter, setLinter] = useState<DemoLinter | null>(null);

  useEffect(() => {
    if (linter) {
      const { messages, fixReport } = linter.lint(code, parserOptions, rules);
      setFixed(fixReport.output);
      setMessages(messages);
    }
  }, [rules, code, linter]);

  useEffect(() => {
    (async () => setLinter(await loadDemoLinter()))();
  }, []);
  console.log(queryParamsState.get().code || DEFAULT_CODE);
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={12}>
            <Tabs>
              <Tab eventKey="code" title="Code">
                <CodeEditor
                  initial={queryParamsState.get().code || DEFAULT_CODE}
                  onChange={(code) => {
                    queryParamsState.set({ code, rules });
                    setCode(code);
                  }}
                  messages={messages}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col className="bottom-col">
            <Tabs>
              <Tab eventKey="rules" title="Rules">
                <RuleConfig
                  initial={rules}
                  ruleConfig={rules}
                  onChange={(rulesString) => {
                    try {
                      const rules = JSON.parse(rulesString);
                      setRules(rules);
                      queryParamsState.set({ code, rules });
                    } catch {}
                  }}
                />
              </Tab>
            </Tabs>
          </Col>
          <Col className="bottom-col">
            {linter === null ? (
              <div>
                <Spinner animation="border" role="status" variant="primary">
                  <span className="sr-only">Loading...</span>
                </Spinner>
                Loading... please wait
              </div>
            ) : (
              <Tabs>
                <Tab eventKey="messages" title="Messages">
                  <Messages messages={messages} />
                </Tab>
                <Tab eventKey="fixed" title="Fixed">
                  <Fixed code={fixed} />
                </Tab>
              </Tabs>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
