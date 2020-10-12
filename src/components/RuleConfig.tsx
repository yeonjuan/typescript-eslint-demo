import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import type { FC } from "react";
import type { Linter } from "eslint";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "@/css/editor.css";

interface Props {
  initial: Linter.RulesRecord;
  onChange?: (text: string) => void;
  ruleConfig: {
    [ruleName: string]: any;
  };
}

const CODE_MIRROR_OPTIONS = {
  mode: "application/ld+json",
  lineNumbers: true,
  showCursorWhenSelecting: true,
  matchBrackets: true,
} as const;

export const RuleConfig: FC<Props> = (props) => {
  const [text, setText] = useState<string>(
    JSON.stringify(props.initial, null, 2)
  );
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      const codeMirror = CodeMirror.fromTextArea(
        ref.current,
        CODE_MIRROR_OPTIONS
      );
      codeMirror.on("change", () => {
        const value = codeMirror.getValue();
        props.onChange?.(value);
        setText(value);
      });
    }
  }, []);

  return (
    <div className="rule-editor">
      <textarea id="code" readOnly autoComplete="off" ref={ref} value={text} />
    </div>
  );
};
