import React from "react";
import { BaseEditor } from "@/components/BaseEditor";
import * as states from "@/states";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import type { Marker } from "@/components/BaseEditor";
import type { FC } from "react";
import type { Linter } from "eslint";

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

export const CodeEditor: FC = () => {
  const [code, setCode] = useRecoilState(states.codeState);
  const lintResultLoadable = useRecoilValueLoadable(states.lintResultState);

  let markers: Marker[] = [];
  if (lintResultLoadable.state === "hasValue") {
    markers = lintResultLoadable.contents.messages.map((message) =>
      messageToMarker(message)
    );
  }

  return (
    <div className="editor">
      <BaseEditor
        id="code"
        mode="text/typescript"
        initial={code}
        onChange={setCode}
        markers={markers}
      />
    </div>
  );
};
