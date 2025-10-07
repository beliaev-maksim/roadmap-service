# Feature Specification: Jira Roadmap Visualization Web App

**Feature Branch**: `001-build-a-web`  
**Created**: 2025-10-07  
**Status**: Draft  
**Input**: User description: "Build a web application that will show the status of the engineering roadmap based on the data provided from Jira. Each roadmap item is an epic in jira. It should account for the status of an epic, field (roadmap item) and labels with ubuntu release cycles, like 24.04, 25.10, etc. We should collect data for many teams. However, in frontend users should have an ability to filter those by department and if required by team. Each product should be a list of features with their color."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View High-Level Roadmap by Department and Team (Priority: P1)

As a department head, I want to see a consolidated view of the engineering roadmap for all teams within my department, so I can quickly assess the status of key initiatives. I also need the ability to drill down and filter the view by a specific team to understand their individual progress and commitments.

**Why this priority**: This provides the primary overview functionality for leadership and is the main entry point for understanding the roadmap.

**Independent Test**: A user can load the application, see a default roadmap view, and then successfully use dropdowns or similar controls to filter the displayed roadmap items first by a department and then by a specific team within that department.

**Acceptance Scenarios**:

1.  **Given** a user is viewing the roadmap, **When** they select a department from the filter, **Then** the view updates to show only the roadmap items belonging to teams within that department.
2.  **Given** a department is selected, **When** the user selects a team, **Then** the view narrows further to show only the roadmap items for that specific team.
3.  **Given** no filters are selected, **When** the user views the roadmap, **Then** a default, comprehensive view of all roadmap items is displayed.

### User Story 2 - Quickly Assess Epic Health with Color-Coded Indicators (Priority: P1)

As a product manager, I need to instantly understand the status and health of each roadmap epic by looking at color-coded indicators, so I can identify risks, track progress, and communicate status to stakeholders without needing to open each item in Jira. The color coding has two parts: a "carry-over" indicator and a "health" indicator.

**Why this priority**: The color-coding is the core mechanism for providing at-a-glance status updates, which is a primary goal of this application.

**Independent Test**: A user can view the roadmap and, based on the color of the cells for a given epic, correctly determine its status according to the detailed color calculation rules.

**Acceptance Scenarios**:

1.  **Given** an Epic has more than one cycle in its Labels field, **When** a user views the roadmap, **Then** the first column is highlighted in purple and displays the count of previous cycles.
2.  **Given** an Epic’s "Roadmap State" is "At Risk", **When** a user views the roadmap, **Then** the second column is colored orange.
3.  **Given** an Epic's status is "Done", **When** a user views the roadmap, **Then** the second column is colored green with the letter 'C'.
4.  **Given** an Epic's "Roadmap State" is "Added", **When** a user views the roadmap, **Then** the second column is colored blue.
5.  **Given** an Epic's "Roadmap State" is empty and its status is "In Progress", **When** a user views the roadmap, **Then** the second column is colored green.
6.  **Given** an Epic's "Roadmap State" is empty and its status is "Rejected", **When** a user views the roadmap, **Then** the second column is colored red.

### User Story 3 - Filter Roadmap by Product and Release Cycle (Priority: P2)

As an engineering manager, I want to filter the roadmap to see all items associated with a specific product, which may be composed of epics from multiple Jira projects. I also need to be able to filter this view by one or more Ubuntu release cycles to plan and track our deliverables for each release.

**Why this priority**: This enables flexible, cross-project views that align with how products are actually managed, and it's essential for release planning.

**Independent Test**: A user can select a product from a filter, and the roadmap will display all epics from the primary Jira project for that product, plus any epics from secondary projects that have the correct component. The user can then further filter this view by selecting a release cycle.

**Acceptance Scenarios**:

1.  **Given** a "Product" is defined with a primary Jira project and a component filter for a secondary project, **When** a user selects that product, **Then** the roadmap displays the correctly aggregated list of epics.
2.  **Given** a product view is active, **When** the user selects a release cycle (e.g., "25.04"), **Then** the view is further filtered to show only the epics with that cycle in their "Labels" field.
3.  **Given** the roadmap is being viewed, **When** a user selects multiple release cycles, **Then** all epics matching any of the selected cycles are displayed.

### Edge Cases

-   **Jira API Unavailability**: If the Jira API is down, the application should display a clear error message to the user and, if possible, serve a cached version of the last known roadmap data with a timestamp indicating when it was last updated.
-   **Missing Required Fields**: Epics from Jira that are missing the "Properties: Roadmap Item" field will be excluded from the roadmap view entirely.
-   **Incorrectly Formatted Labels**: Labels that resemble release cycles but do not match the exact format (e.g., "24.10_candidate", "24.04-dropped") will be ignored when calculating carry-over and filtering by cycle.
-   **Conflicting Color Rules**: The color calculation logic must have a clear order of precedence. The "Roadmap State" field takes the highest precedence.

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The system MUST connect to Jira and fetch epic data based on a predefined set of projects.
-   **FR-002**: The system MUST only import and display epics that have the "Properties" field set to "Roadmap Item".
-   **FR-003**: The application MUST provide filters for users to narrow the roadmap view by Department, Team, Product, and Release Cycle.
-   **FR-004**: The system MUST implement the two-part color-coded health status for each epic according to the following logic:
    *   **Column 1: Carry-Over Status**
        *   If an Epic has more than one cycle in its "Labels" field, this column MUST be highlighted in purple.
        *   If the number of previous cycles is greater than one, the count of those cycles MUST be displayed in the cell.
    *   **Column 2: Health Status** (The rules must be evaluated in this order of precedence)
        1.  If the Epic’s status is 'Done', the cell is **green** with the letter 'C'.
        2.  If the "Roadmap State" Jira field is not empty, the cell color is determined by its value:
            *   "At Risk": **Orange**
            *   "Excluded": **Red**
            *   "Added": **Blue**
            *   "Dropped": **Black**
        3.  If the "Roadmap State" field is empty, the cell color is determined by the epic's status:
            *   Status is "Rejected": **Red**
            *   Status is one of "In Progress", "In Review", "To Be Deployed", "BLOCKED": **Green**
            *   Any other status: **White** (no color).
-   **FR-005**: The system MUST calculate and display the "carry-over" status for epics that span multiple release cycles, showing a purple highlight and a count of previous cycles.
-   **FR-006**: The system MUST allow administrators to configure "Products" as logical groupings of epics, where a product can be sourced from a primary Jira project and optionally include items from other projects based on a component filter.
-   **FR-007**: The system MUST correctly parse the "Labels" field to identify which release cycles an epic belongs to, matching exact cycle names like "24.04" and "25.10".
-   **FR-008**: The system MUST use the "Parent" field of an epic to determine its associated objective.

### Key Entities *(include if feature involves data)*

-   **Roadmap Item (Epic)**: The core data entity, representing a single initiative. It includes attributes fetched from Jira such as Status, Roadmap State, Labels, Parent, and Components.
-   **Product**: A user-defined entity that represents a product line. It is configured with rules for sourcing epics, such as a primary Jira project and optional secondary projects filtered by components.
-   **Department / Team**: Organizational units used for filtering the roadmap view. This data may need to be mapped or configured within the application.
-   **Release Cycle**: A defined release period, identified by labels in Jira (e.g., "24.04").

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: The time required for a department head to get a complete, color-coded status overview of their teams' roadmaps should be under 5 minutes, a 90% reduction from any manual processes.
-   **SC-002**: In user acceptance testing, 95% of product and engineering managers must be able to correctly interpret the health and status of an epic based solely on the color-coded indicators.
-   **SC-003**: The system must be able to load and render a roadmap containing 1,000 epics across 20 teams in under 10 seconds.
-   **SC-004**: After deployment, there should be a 50% reduction in questions to the project management team regarding the current status of roadmap items.
