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

function toMarkerPos(pos: number): number {
  return pos - 1;
}

function messageToMarker(message: Linter.LintMessage): Marker {
  const from = {
    line: toMarkerPos(message.line),
    ch: toMarkerPos(message.column),
  };
  const to = {
    line: toMarkerPos(message.endLine || message.line),
    ch: toMarkerPos(message.endColumn || message.column),
  };
  return [from, to];
}

export const CodeEditor: FC<Props> = (props) => (
  <div className="editor">
    <BaseEditor
      id="code"
      mode="text/typescript"
      initial={props.initial}
      onChange={props.onChange}
      markers={props.messages?.map(messageToMarker)}
    />
  </div>
);
