import React, { FC, ChangeEvent } from "react";
import {
  ECMA_VERSIONS,
  SOURCE_TYPES,
  BOOLEAN_ECMA_FEATURES,
} from "@/constants";
import * as states from "@/states";
import { useRecoilState } from "recoil";
import type { EcmaVersion } from "@typescript-eslint/types";

export const ParserOptions: FC = () => {
  const [parserOptions, setParserOptions] = useRecoilState(
    states.parserOptionsState
  );
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
  return (
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
  );
};
