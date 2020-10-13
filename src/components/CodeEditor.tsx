import React from "react";
import { BaseEditor } from "@/components/BaseEditor";
import type { Marker } from "@/components/BaseEditor";
import type { FC } from "react";
import type { Linter } from "eslint";

interface Props {
  initial: string;
  onChange?: (text: string) => void;
  messages?: Linter.LintMessage[];
}

function messageToMarker(message: Linter.LintMessage): Marker {
  const from = { line: message.line - 1, ch: message.column - 1 };
  const to = {
    line: (message.endLine || message.line) - 1,
    ch: (message.endColumn || message.column) - 1,
  };
  return [from, to];
}

export const CodeEditor: FC<Props> = (props) => (
  <div className="editor">
    <BaseEditor
      id="code"
      mode="text/typescript"
      initial={props.initial}
      markers={props.messages?.map(messageToMarker)}
    />
  </div>
);
