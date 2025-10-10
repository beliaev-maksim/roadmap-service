# C3: Frontend Components

This document provides a C3 Component view of the Frontend container, detailing its internal modules and their responsibilities.

[Previous: C2 Containers](./c2-containers.md)

```mermaid
C4Component
    title Component Diagram for Frontend

    Container(frontend, "Frontend", "React SPA")

    Component(pages, "Pages", "React Components", "Top-level components that represent the different pages of the application")
    Component(components, "UI Components", "React Components", "Reusable UI components used throughout the application")
    Component(api_service, "API Service", "JavaScript", "Handles all communication with the backend API")

    Rel(pages, components, "Uses")
    Rel(pages, api_service, "Fetches data from")
    Rel(api_service, components, "Sends data to")
```

## Components

The Frontend container is composed of the following key components:

- **RoadmapView**: The main page that displays the roadmap. It is responsible for fetching data from the API and rendering the `RoadmapTable`. It also polls the `/api/status` endpoint to provide feedback to the user during the data synchronization process.
- **RoadmapTable**: A component that renders the roadmap data in a table format.
- **Filter Components**: A set of components that allow the user to filter the roadmap data.
