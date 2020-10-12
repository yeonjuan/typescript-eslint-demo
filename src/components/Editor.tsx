import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import type { FC } from "react";
import type { Linter } from "eslint";
import type { TextMarker, Editor as CodeEditor } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "@/css/editor.css";

interface Props {
  initial: string;
  onChange?: (text: string) => void;
  messages?: Linter.LintMessage[];
}

const CODE_MIRROR_OPTIONS = {
  mode: "text/typescript",
  lineNumbers: true,
  showCursorWhenSelecting: true,
  matchBrackets: true,
} as const;

let editor: CodeEditor | null = null;

export const Editor: FC<Props> = (props) => {
  const [text, setText] = useState<string>(props.initial);
  const [errorMarkers, setErrorMarkers] = useState<TextMarker[]>([]);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      editor = CodeMirror.fromTextArea(ref.current, CODE_MIRROR_OPTIONS);
      editor.on("change", () => {
        const value = editor?.getValue() ?? "";
        props.onChange?.(value);
        setText(value);
      });
    }
  }, []);

  useEffect(() => {
    errorMarkers.forEach((marker) => marker.clear());
    if (props.messages && editor) {
      setErrorMarkers(
        props.messages?.map((message) => {
          const from = { line: message.line - 1, ch: message.column - 1 };
          const to = {
            line: (message.endLine || message.line) - 1,
            ch: (message.endColumn || message.column) - 1,
          };
          return (editor as CodeEditor).markText(from, to, {
            className: "editor-error",
          });
        })
      );
    }
  }, [props.messages]);

  return (
    <div className="editor">
      <textarea id="code" readOnly autoComplete="off" ref={ref} value={text} />
    </div>
  );
};
