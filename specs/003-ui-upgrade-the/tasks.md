# Actionable Tasks: Modernize Roadmap View

**Feature**: Modernize Roadmap View
**User Stories**: 2
**Total Tasks**: 8
**Parallelizable Tasks**: 3

## Phase 1: Foundational Setup

### Foundational Tasks (Blocking)

*   **[X] T001**: [US1, US2] **[P]** Create new component files:
    *   `frontend/src/components/RoadmapTable.jsx`
    *   `frontend/src/components/ProductSection.jsx`
    *   `frontend/src/components/RoadmapItem.jsx`
*   **[X] T002**: [US1, US2] Install Material-UI (`@mui/material`) and its dependencies (`@emotion/react`, `@emotion/styled`) in the `frontend` directory.

---
**CHECKPOINT**: Foundational components and libraries are in place.

## Phase 2: User Story 1 - View Modernized Roadmap (P1)

**Goal**: As a user, I want to see the roadmap in a modern table format so I can easily understand the status of different products.
**Independent Test**: The modernized table view can be tested independently by loading the roadmap page with mock data and verifying the new layout and data presentation without any filtering functionality.

### Implementation Tasks

*   **[X] T003**: [US1] Implement the `RoadmapItem` component to render a single row with "Carry-over status", "Roadmap status", and a hyperlinked "Item name".
*   **[X] T004**: [US1] Implement the `ProductSection` component to render a table of `RoadmapItem` components for a single product.
*   **[X] T005**: [US1] Implement the `RoadmapTable` component to render a `ProductSection` for each product.
*   **[X] T006**: [US1] Update `frontend/src/pages/RoadmapView.jsx` to use the `RoadmapTable` component and connect it to the roadmap API service.
*   **T007**: [US1] **[P]** Write unit tests for `RoadmapItem`, `ProductSection`, and `RoadmapTable` components to verify they render correctly with mock data.

---
**CHECKPOINT**: The roadmap page now displays the new table view with live data. This is the MVP.

## Phase 3: User Story 2 - Filter Roadmap View (P2)

**Goal**: As a user, I want to filter the roadmap view so I can focus on the information that is relevant to me.
**Independent Test**: Filtering can be tested by applying various filter combinations and verifying that the table view updates correctly, including the hiding of empty columns.

### Implementation Tasks

*   **[X] T008**: [US2] Implement filtering logic in `RoadmapView.jsx` to filter the data passed to `RoadmapTable` based on user selections.
*   **[X] T009**: [US2] Implement logic to hide columns that are empty across all visible rows after filtering.
*   **[X] T010**: [US2] **[P]** Write integration tests for the `RoadmapView` page to verify that filtering and column hiding works as expected.

---
**CHECKPOINT**: The roadmap view is fully interactive with filtering capabilities.

## Dependencies

*   **User Story 1** is the foundational MVP and must be completed first.
*   **User Story 2** depends on the completion of User Story 1.

## Parallel Execution Examples

### User Story 1

*   **T001** (component creation) and **T002** (dependency installation) can be done in parallel.
*   **T007** (unit tests) can be written in parallel with the component implementation tasks (**T003-T005**).

### User Story 2

*   **T010** (integration tests) can be written in parallel with the implementation tasks (**T008-T009**).

## Implementation Strategy

The implementation will follow a phased approach, prioritizing the core functionality (MVP) first.

1.  **MVP (User Story 1)**: The initial focus will be on displaying the roadmap in the new table format with live data. This will deliver immediate value to users.
2.  **Enhancements (User Story 2)**: Once the MVP is stable, the filtering functionality will be added to enhance the user experience.
