# C1: System Context

This document provides a high-level, C1 System Context view of the Roadmap Service, its users, and its interactions with external systems.

[Next: C2 Containers](./c2-containers.md)

```mermaid
C4Context
    title System Context Diagram for Roadmap Service

    Person(developer, "Developer", "A developer working on the roadmap service.")
    Person(product_manager, "Product Manager", "A product manager responsible for the roadmap.")

    System(roadmap_service, "Roadmap Service", "The service that provides roadmap visualization.")

    System_Ext(jira, "Jira", "The source of truth for roadmap items.")

    Rel(developer, roadmap_service, "Uses")
    Rel(product_manager, roadmap_service, "Uses")
    Rel(roadmap_service, jira, "Reads roadmap data from")
```
