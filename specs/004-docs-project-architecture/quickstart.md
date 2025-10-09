# Quickstart: Contributing to Architecture Documentation

This guide explains how to update and maintain the project's architecture documentation.

## 1. Overview

The architecture documentation follows the C4 model and uses Mermaid.js to generate diagrams from text. This approach allows the documentation to be version-controlled alongside the source code.

## 2. How to Update Diagrams

The diagrams are defined using Mermaid.js syntax within the Markdown files located in `docs/architecture`. To update a diagram:

1.  **Locate the relevant file**: Navigate to the Markdown file containing the diagram you want to change (e.g., `docs/architecture/c2-containers.md`).
2.  **Edit the Mermaid.js block**: Find the ` ```mermaid ` code block and modify the diagram definition.
3.  **Preview your changes**: Use a Markdown previewer with Mermaid.js support (like the one in VS Code or on GitHub) to ensure your changes are rendered correctly.

## 3. Reflecting Architectural Changes

Whenever you implement a feature that changes the architecture (e.g., adding a new service, changing a data flow), you must update the documentation to reflect this.

### Pre-merge Pipeline Check

A pre-merge pipeline check is in place to ensure the documentation stays current. Before your branch can be merged, you will be required to confirm that you have made the necessary updates to the architecture documents.

If your changes do not affect the architecture, you can simply confirm that no updates were needed.
