import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Row, Col, Tabs, Tab, Spinner } from "react-bootstrap";
import JSON5 from "json5";
import { CodeEditor } from "@/components/CodeEditor";
import { RuleConfig } from "@/components/RuleConfig";
import { LintMessages } from "@/components/LintMessages";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Header } from "@/components/Header";
import { Fixed } from "@/components/Fixed";
import { loadDemoLinter, DemoLinter } from "@/lib/linter";
import {
  DEFAULT_CODE,
  DEFAULT_RULE_CONFIG,
  ECMA_VERSIONS,
  SOURCE_TYPES,
  DEFAULT_PARSER_OPTIONS,
  BOOLEAN_ECMA_FEATURES,
} from "@/constants";
import { queryParamsState } from "@/shared/query-params-state";
import type { FC } from "react";
import type { Linter } from "eslint";
import type { ParserOptions, EcmaVersion } from "@typescript-eslint/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/css/app.css";

export const App: FC = () => {
  const paramsState = queryParamsState.get();
  const [messages, setMessages] = useState<Linter.LintMessage[]>([]);
  const [code, setCode] = useState<string>(paramsState?.code || DEFAULT_CODE);
  const [rules, setRules] = useState(paramsState?.rules || DEFAULT_RULE_CONFIG);
  const [fixed, setFixed] = useState<string>("");
  const [linter, setLinter] = useState<DemoLinter | null>(null);
  const [ruleConfigError, setRuleConfigError] = useState<Error | null>(null);
  const [parserOptions, setParserOptions] = useState<ParserOptions>(
    paramsState?.parserOptions || DEFAULT_PARSER_OPTIONS
  );

  useEffect(() => {
    if (linter) {
      const { messages, fixReport } = linter.lint(code, parserOptions, rules);
      setFixed(fixReport.output);
      setMessages(messages);
    }
  }, [rules, code, linter, parserOptions]);

  useEffect(() => {
    (async () => setLinter(await loadDemoLinter()))();
  }, []);

  const handleRuleEditing = (ruleStr: string) => {
    try {
      const rules = JSON5.parse(ruleStr);
      setRules(rules);
      setRuleConfigError(null);
    } catch (error) {
      setRuleConfigError(error);
    }
  };

  const handleParserOptionsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const id = event.target.id;
    const value = event.target.value;
    if (BOOLEAN_ECMA_FEATURES.some((prop) => prop === id)) {
      setParserOptions({
        ...parserOptions,
        ecmaFeatures: {
          ...parserOptions.ecmaFeatures,
          [id]: (event.target as HTMLInputElement).checked,
        },
      });
    } else if ("ecmaVersion" === id) {
      setParserOptions({
        ...parserOptions,
        ecmaVersion: parseInt(value, 10) as EcmaVersion,
      });
    } else {
      setParserOptions({
        ...parserOptions,
        [id]: value,
      });
    }
  };

  useEffect(() => {
    queryParamsState.set({ code, rules, parserOptions });
  }, [code, rules, parserOptions]);
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <Tabs>
              <Tab eventKey="code" title="Code">
                <CodeEditor
                  initial={queryParamsState.get().code || DEFAULT_CODE}
                  onChange={setCode}
                  messages={messages}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col className="bottom-col">
            <Tabs>
              <Tab eventKey="rules" title="Rules (json5)">
                <RuleConfig
                  initial={rules}
                  ruleConfig={rules}
                  onChange={handleRuleEditing}
                />
              </Tab>
              <Tab eventKey="parserOptions" title="ParserOptions">
                <div className="parser-options">
                  <h5>ECMA Features</h5>
                  {BOOLEAN_ECMA_FEATURES.map((feature) => (
                    <div className="checkbox" key={feature}>
                      <input
                        type="checkbox"
                        name={feature}
                        id={feature}
                        checked={parserOptions.ecmaFeatures?.[feature]}
                        onChange={handleParserOptionsChange}
                      />
                      <label htmlFor={feature}>{feature}</label>
                    </div>
                  ))}
                  <h5>ECMA Version</h5>
                  <div className="select">
                    <select
                      id="ecmaVersion"
                      value={parserOptions.ecmaVersion}
                      onChange={handleParserOptionsChange}
                    >
                      {ECMA_VERSIONS.map((version) => (
                        <option key={version} value={version}>
                          {version}
                        </option>
                      ))}
                    </select>
                  </div>
                  <h5>Source Type</h5>
                  <div className="select">
                    <select
                      id="sourceType"
                      value={parserOptions.sourceType}
                      onChange={handleParserOptionsChange}
                    >
                      {SOURCE_TYPES.map((sourceType) => (
                        <option key={sourceType} value={sourceType}>
                          {sourceType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
                  {ruleConfigError ? (
                    <ErrorMessage origin="rules.json" error={ruleConfigError} />
                  ) : (
                    <LintMessages messages={messages} />
                  )}
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
