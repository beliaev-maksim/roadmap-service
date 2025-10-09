# Task Plan: Jira Integration for Roadmap Data

## Phase 1: Setup

- **T001**: [Setup] Add `jira` and `psycopg2-binary` to `backend/pyproject.toml`.
- **T002**: [Setup] Add a PostgreSQL service to the `docker-compose.yml` file.
- **T003**: [Setup] Create a `.env.example` file in the `backend` directory with placeholders for the Jira and database connection settings.

## Phase 2: Foundational Tasks

- **T004**: [Foundation] Create the database schema in `backend/src/db_schema.sql` based on `data-model.md`.
- **T005**: [Foundation] Create a new module `backend/src/database.py` to handle database connections.
- **T006**: [Foundation] Update the FastAPI application in `backend/src/api.py` to connect to the database on startup.

## Phase 3: User Story 1 - View Up-to-Date Roadmap (P1)

**Goal**: Display roadmap data from Jira in the web application.
**Independent Test**: Trigger a sync and verify that roadmap items from Jira appear in the UI.

- **T007**: [US1] Create a new module `backend/src/jira_sync.py` to handle the Jira API integration.
- **T008**: [US1] Implement the Jira sync logic in `backend/src/jira_sync.py` to fetch data from Jira and store it in the PostgreSQL database.
- **T009**: [US1] Create a new endpoint `/api/sync` in `backend/src/api.py` to trigger the Jira sync manually.
- **T010**: [US1] Update the `/api/roadmap` endpoint in `backend/src/api.py` to serve roadmap data from the PostgreSQL database.

---
**CHECKPOINT**: User Story 1 is complete. The application can now sync data from Jira and display it in the UI.
---

## Phase 4: User Story 2 - Ensure Data Integrity with Realistic Tests (P2)

**Goal**: Run automated tests against a real PostgreSQL database instance.
**Independent Test**: The API test suite runs against a test database.

- **T011**: [US2] Update the test suite in `backend/tests/test_api.py` to use a test database.
- **T012**: [US2] Add a new test case to `backend/tests/test_api.py` to test the `/api/sync` endpoint.
- **T013**: [US2] Add a new test case to `backend/tests/test_api.py` to test the `/api/roadmap` endpoint with data from the test database.

---
**CHECKPOINT**: User Story 2 is complete. The application's automated tests now run against a real database instance.
---

## Phase 5: User Story 3 - Enable Effective Quality Assurance (P3)

**Goal**: Provide clear instructions for manual QA and end-to-end testing.
**Independent Test**: A QA engineer can follow the documentation to run tests and verify the feature.

- **T014**: [US3] Create a new document `docs/manual-qa.md` with instructions on how to run end-to-end tests and perform manual verification.
- **T015**: [US3] Update the main `README.md` to link to the `docs/manual-qa.md` document.

---
**CHECKPOINT**: User Story 3 is complete. The project now has clear documentation for manual QA and end-to-end testing.
---

## Dependencies

- User Story 1 is a prerequisite for User Story 2.
- User Story 3 is independent of the other user stories.

## Parallel Execution

- **Within User Story 1**:
    - T007 and T008 can be worked on in parallel with T009 and T010.
- **Across User Stories**:
    - User Story 3 can be worked on in parallel with User Story 1 and User Story 2.

## Implementation Strategy

The implementation will follow an incremental delivery approach, with each user story being a self-contained, testable increment. The MVP will be the completion of User Story 1, which delivers the core functionality of the feature.
