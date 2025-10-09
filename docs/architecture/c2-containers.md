# C2: Containers

This document provides a C2 Container view of the Roadmap Service, illustrating the high-level technical containers that make up the system.

[Previous: C1 System Context](./c1-context.md) | [Next: C3 Components (Backend)](./c3-components-backend.md) | [Next: C3 Components (Frontend)](./c3-components-frontend.md)

```mermaid
C4Container
    title Container Diagram for Roadmap Service

    System_Boundary(c1, "Roadmap Service") {
        Container(frontend, "Frontend", "React SPA", "The user interface for the roadmap service.")
        Container(backend, "Backend", "FastAPI REST API", "Provides roadmap data to the frontend.")
        ContainerDb(database, "Database", "PostgreSQL", "Stores roadmap data.")
    }

    System_Ext(jira, "Jira", "The source of truth for roadmap items.")

    Rel(frontend, backend, "Makes API calls to", "HTTPS")
    Rel(backend, database, "Reads from and writes to", "SQL")
    Rel(backend, jira, "Reads roadmap data from", "HTTPS")
```
