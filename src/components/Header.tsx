import React from "react";
import { Navbar, Badge, Container } from "react-bootstrap";
import pkgJson from "../../package.json";
import type { FC } from "react";
import "@/css/header.css";

export const Header: FC = () => (
  <Navbar bg="light">
    <Container>
      <Navbar.Brand>
        TypeScript ESLint Demo
        <Badge variant="secondary" className="version-badge">
          v{pkgJson.version}
        </Badge>
      </Navbar.Brand>

      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="gh-btn">
          <a
            className="github-button"
            href="https://github.com/yeonjuan/typescript-eslint-demo"
            data-icon="octicon-star"
            aria-label="Star yeonjuan/typescript-eslint-demo on GitHub"
          >
            Star
          </a>
        </Navbar.Text>
        <Navbar.Text className="gh-btn">
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
    </Container>
  </Navbar>
);
