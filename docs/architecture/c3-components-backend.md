# C3: Backend Components

This document provides a C3 Component view of the Backend container, detailing its internal modules and their responsibilities.

[Previous: C2 Containers](./c2-containers.md)

```mermaid
C4Component
    title Component Diagram for Backend

    Container(backend, "Backend", "FastAPI REST API")

    Component(api, "API Controller", "FastAPI", "Receives requests from the frontend and routes them to the appropriate service")
    Component(services, "Service Layer", "Python", "Contains the business logic for the application. See [Color Logic](./c4-code-color-logic.md) for details")
    Component(data_access, "Data Access Layer", "Python", "Handles all communication with the database")
    Component(jira_sync, "Jira Sync", "Python", "Periodically fetches data from Jira and updates the database")

    Rel(api, services, "Uses")
    Rel(services, data_access, "Uses")
    Rel(jira_sync, data_access, "Uses")
```
