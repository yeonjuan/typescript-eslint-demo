import React from "react";
import { Row, Col } from "react-bootstrap";
import type { FC } from "react";

export const TSConfig: FC = () => {
  return (
    <>
      <Row>
        <Col md={4}>
          <label htmlFor="ecmaVersion"> ECMA Version </label>
        </Col>
        <Col md={8}>
          <select id="ecmaVersion">
            {["es2015", "es2016", "es2017", "es2018", "es2019", "es2020"].map(
              (version) => (
                <option value={version} key={version}>
                  {version}
                </option>
              )
            )}
          </select>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <label htmlFor="ecmaVersion"> ECMA Features </label>
        </Col>
        <Col md={8}>
          {["jsx", "globalReturn"].map((ecmaFeature) => (
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
