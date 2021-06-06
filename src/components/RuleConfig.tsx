import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import { EDITING_TIMEOUT } from "@/constants";
import { debounce } from "@/shared/debounce";
import JSON5 from "json5";
import * as states from "@/states";
import { useRecoilState } from "recoil";
import type { FC } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "@/css/editor.css";

const CODE_MIRROR_OPTIONS = {
  mode: "application/ld+json",
  lineNumbers: true,
  showCursorWhenSelecting: true,
  matchBrackets: true,
} as const;

export const RuleConfig: FC = () => {
  const [rulesConfig, setRulesConfig] = useRecoilState(states.rulesConfigState);
  const [text, setText] = useState<string>(
    JSON5.stringify(rulesConfig.rules, null, 2)
  );
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      const codeMirror = CodeMirror.fromTextArea(
        ref.current,
        CODE_MIRROR_OPTIONS
      );
      codeMirror.on(
        "change",
        debounce(() => {
          const value = codeMirror.getValue();
          try {
            const rules = JSON5.parse(value);
            setRulesConfig({
              rules,
              error: null,
            });
          } catch (error) {
            setRulesConfig({
              ...rulesConfig,
              error,
            });
          }

          setText(value);
        }, EDITING_TIMEOUT)
      );
    }
  }, []);

  return (
    <div className="rule-editor">
      <textarea id="code" readOnly autoComplete="off" ref={ref} value={text} />
    </div>
  );
};
