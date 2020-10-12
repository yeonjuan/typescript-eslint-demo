import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Editor } from "@/components/Editor";
import { RuleConfig } from "@/components/RuleConfig";
import { Messages } from "@/components/Messages";
import { Header } from "@/components/Header";
import { Fixed } from "@/components/Fixed";
import { loadDemoLinter, DemoLinter } from "@/lib/linter";
import { DEFAULT_CODE, DEFAULT_RULE_CONFIG } from "@/components/constants";
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
  const [messages, setMessages] = useState<Linter.LintMessage[]>([]);
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [rules, setRules] = useState(DEFAULT_RULE_CONFIG);
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

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={12}>
            <h5> Code</h5>
            <Tabs>
              <Tab eventKey="code" title="Code">
                <Editor
                  initial={DEFAULT_CODE}
                  onChange={setCode}
                  messages={messages}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs>
              <Tab eventKey="rules" title="Rules">
                <RuleConfig
                  initial={rules}
                  ruleConfig={rules}
                  onChange={(rulesString) => {
                    try {
                      const rules = JSON.parse(rulesString);
                      setRules(rules);
                    } catch {}
                  }}
                />
              </Tab>
            </Tabs>
          </Col>
          <Col>
            <Tabs>
              <Tab eventKey="messages" title="Messages">
                <Messages messages={messages} />
              </Tab>
              <Tab eventKey="fixed" title="Fixed">
                <Fixed code={fixed} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};
