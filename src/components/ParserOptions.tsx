import React from "react";
import type { FC } from "react";
import { Row, Col } from "react-bootstrap";
import { ECMA_VERSIONS, ECMA_FEATURES } from "@/components/constants";

interface Props {
  ecmaVersion: typeof ECMA_VERSIONS[number];
  ecmaFeatures: typeof ECMA_FEATURES[number];
}

export const ParserOptions: FC<Props> = (props) => {
  return (
    <>
      <Row>
        <Col md={4}>
          <label htmlFor="ecmaVersion"> ECMA Version </label>
        </Col>
        <Col md={8}>
          <select id="ecmaVersion">
            {ECMA_VERSIONS.map((version) => (
              <option value={version} key={version}>
                {version}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <label htmlFor="ecmaVersion"> ECMA Features </label>
        </Col>
        <Col md={8}>
          {ECMA_FEATURES.map((ecmaFeature) => (
            <div className="checkbox" key={ecmaFeature}>
              <label htmlFor={ecmaFeature}>
                <input
                  type="checkbox"
                  className="option-checkbox"
                  id={ecmaFeature}
                />
                {ecmaFeature}
              </label>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};
