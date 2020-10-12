import React from "react";
import { Navbar, Badge } from "react-bootstrap";
import type { FC } from "react";
import "@/css/header.css";
import pkgJson from "../../package.json";

export const Header: FC = () => (
  <Navbar bg="light">
    <Navbar.Brand>
      TypeScript ESLint Demo
      <Badge variant="secondary">v{pkgJson.version}</Badge>
    </Navbar.Brand>

    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        <a
          className="github-button"
          href="https://github.com/yeonjuan/typescript-eslint-demo"
          data-icon="octicon-star"
          aria-label="Star yeonjuan/typescript-eslint-demo on GitHub"
        >
          Star
        </a>
      </Navbar.Text>
      <Navbar.Text>
        <a
          className="github-button"
          href="https://github.com/yeonjuan/typescript-eslint-demo/issues"
          data-icon="octicon-issue-opened"
          aria-label="Issue yeonjuan/typescript-eslint-demo on GitHub"
        >
          Issue
        </a>
      </Navbar.Text>
      <ul className="version-list">
        <li>
          <Navbar.Text className="version">
            TypeScript-ESLint v
            {pkgJson.dependencies["@typescript-eslint/eslint-plugin"]}
          </Navbar.Text>
        </li>
        <li>
          <Navbar.Text className="version">
            TypeScript v{pkgJson.dependencies["typescript"]}
          </Navbar.Text>
        </li>
      </ul>
    </Navbar.Collapse>
  </Navbar>
);
