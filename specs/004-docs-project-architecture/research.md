# Research: C4 Model and Tooling

## 1. C4 Model for Existing Architecture

### Decision

We will adopt the C4 model to structure the architecture documentation. The documentation will be broken down into four levels of diagrams and corresponding Markdown files: Context (C1), Containers (C2), Components (C3), and Code (C4). This approach provides a clear and hierarchical view of the system, making it accessible to different stakeholders.

### Rationale

- **Clarity and Consistency**: The C4 model provides a standardized way to describe and reason about software architecture.
- **Multiple Perspectives**: It caters to different audiences, from high-level context for non-technical stakeholders to detailed component views for developers.
- **Maintainability**: By breaking down the architecture into separate, focused diagrams, it becomes easier to update the documentation as the system evolves.

### Alternatives Considered

- **Single, monolithic document**: A single `ARCHITECTURE.md` file would be simpler to create initially but would quickly become difficult to navigate and maintain.
- **UML Diagrams**: While powerful, UML can be overly complex for our needs and has a steeper learning curve.

## 2. Tooling for C4 Diagrams

### Decision

We will use **Mermaid.js** for creating the C4 diagrams. Mermaid.js is a text-based tool that allows generating diagrams from Markdown-like syntax. The diagrams will be embedded directly into the architecture Markdown files.

### Rationale

- **Version Control Friendly**: Since the diagrams are defined as text, they can be easily versioned with Git.
- **Low Barrier to Entry**: The syntax is simple and intuitive, making it easy for the entire team to contribute.
- **Integration**: Mermaid.js is well-supported in many Markdown renderers, including GitHub, GitLab, and VS Code extensions, which will provide a good viewing experience.

### Alternatives Considered

- **PlantUML**: Similar to Mermaid.js, but the syntax is more verbose.
- **Structurizr Lite**: A powerful tool specifically for the C4 model, but it requires running a separate web server to render the diagrams, which adds complexity to the workflow.
- **Diagramming tools (e.g., Lucidchart, Draw.io)**: These tools are great for creating diagrams but are not text-based, making them difficult to integrate into a Git workflow.
