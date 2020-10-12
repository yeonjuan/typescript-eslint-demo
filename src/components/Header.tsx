import React from "react";
import type { FC } from "react";
import "@/css/header.css";
import pkgJson from "../../package.json";

export const Header: FC = () => (
  <header>
    <h2 style={{ color: "#666" }}>TypeScript ESlint Demo</h2>
    <ul className="versions">
      <li>
        TypeScript-ESLint v
        {pkgJson.dependencies["@typescript-eslint/eslint-plugin"]}
      </li>
      <li>TypeScript v{pkgJson.dependencies["typescript"]}</li>
    </ul>
  </header>
);
