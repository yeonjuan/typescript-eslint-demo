import React, { useState, useEffect, useRef } from "react";
import CodeMirror, { TextMarker } from "codemirror";
import { EDITING_TIMEOUT } from "@/components/constants";
import { debounce } from "@/shared/debounce";
import type { FC } from "react";
import type { Editor } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "@/css/editor.css";

export type Marker = [CodeMirror.Position, CodeMirror.Position];

interface Props {
  id: string;
  mode: "text/typescript" | "application/ld+json";
  markers?: Marker[];
  initial?: string;
  onChange?: (text: string) => void;
}

const CODE_MIRROR_OPTIONS = {
  lineNumbers: true,
  showCursorWhenSelecting: true,
  matchBrackets: true,
} as const;

export const BaseEditor: FC<Props> = (props) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [text, setText] = useState<string>(props.initial ?? "");
  const [errorMarkers, setErrorMarkers] = useState<TextMarker[]>([]);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      const codeMirror = CodeMirror.fromTextArea(ref.current, {
        mode: props.mode,
        ...CODE_MIRROR_OPTIONS,
      });
      setEditor(codeMirror);

      codeMirror.on(
        "change",
        debounce(() => {
          const value = codeMirror.getValue();
          props.onChange?.(value);
          setText(value);
        }, EDITING_TIMEOUT)
      );
    }
  }, []);

  useEffect(() => {
    errorMarkers.forEach((marker) => marker.clear());
    if (props.markers && editor) {
      setErrorMarkers(
        props.markers.map(([start, end]) =>
          editor.markText(start, end, {
            className: "editor-error",
          })
        )
      );
    }
  }, [props.markers, editor]);

  return (
    <textarea
      id={props.id}
      readOnly
      autoComplete="off"
      ref={ref}
      value={text}
    />
  );
};
