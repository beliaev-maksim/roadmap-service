# Tasks: Jira Roadmap Visualization Web App

**Input**: Design documents from `/specs/001-build-a-web/`
**Prerequisites**: plan.md (required), spec.md (user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create backend project structure: `backend/src/`, `backend/tests/`
- [x] T002 Create frontend project structure: `frontend/src/`, `frontend/tests/`
- [x] T003 Initialize FastAPI backend with minimal dependencies
- [x] T004 Initialize React frontend with Material UI
- [x] T005 Set up PostgreSQL database and configure connection
- [x] T006 [P] Configure linting and formatting tools for backend and frontend
- [x] T007 [P] Add environment variable management for secrets/config

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T008 Design and apply database schema for roadmap items, products, departments, teams, objectives, release cycles
- [x] T009 [P] Implement periodic Jira sync job to populate database
- [x] T010 [P] Implement base API endpoints for roadmap, products, departments
- [x] T011 [P] Implement base React routing and role-based access (user/admin views)
- [x] T012 Configure Prometheus metrics endpoint in backend
- [x] T013 Set up structured logging in backend (JSON format)

---

## Phase 3: User Story 1 - View High-Level Roadmap by Department and Team (Priority: P1)

**Goal**: Department head can view and filter roadmap by department/team
**Independent Test**: User can filter roadmap by department/team and see correct items

- [ ] T014 [P] Implement Department and Team models in backend/src/models/
- [ ] T015 [P] Implement Department/Team filtering logic in backend/src/services/
- [ ] T016 [P] Add department/team filter UI components in frontend/src/components/
- [ ] T017 [P] Add department/team filter API integration in frontend/src/services/
- [ ] T018 [P] Add department/team filter to roadmap view in frontend/src/pages/
- [ ] T019 [P] Add test for department/team filtering in backend/tests/integration/
- [ ] T020 [P] Add test for department/team filtering in frontend/tests/

**Checkpoint**: Roadmap can be filtered by department/team and is independently testable

---

## Phase 4: User Story 2 - Epic Health Color-Coding (Priority: P1)

**Goal**: Product manager can see color-coded health for each epic
**Independent Test**: User can verify color logic matches spec for all epics

- [x] T021: Backend: Implement color logic for epic health status
- [x] T022: Backend: Add color status fields to roadmap API response
- [x] T023: Frontend: Render color-coded cells in roadmap view
- [x] T024: Frontend: Add color legend to roadmap view
- [x] T025: Tests: Add backend tests for color logic

**Checkpoint**: Color-coded health is visible and testable for all roadmap items

---

## Phase 5: User Story 3 - Filter by Product and Release Cycle (Priority: P2)

**Goal**: Engineering manager can filter roadmap by product and release cycle
**Independent Test**: User can select product/release cycle and see correct items

- [ ] T027 [P] Implement Product and ReleaseCycle models in backend/src/models/
- [ ] T028 [P] Implement product/release cycle filtering logic in backend/src/services/
- [ ] T029 [P] Add product/release cycle filter UI components in frontend/src/components/
- [ ] T030 [P] Add product/release cycle filter API integration in frontend/src/services/
- [ ] T031 [P] Add product/release cycle filter to roadmap view in frontend/src/pages/
- [ ] T032 [P] Add test for product/release cycle filtering in backend/tests/integration/
- [ ] T033 [P] Add test for product/release cycle filtering in frontend/tests/

**Checkpoint**: Roadmap can be filtered by product/release cycle and is independently testable

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T034 [P] Add error handling for Jira API downtime (show cached data)
- [ ] T035 [P] Add admin view for roadmap management in frontend/src/pages/admin/
- [ ] T036 [P] Add role-based access control for admin/user views
- [ ] T037 [P] Add edge case handling for missing fields, label format, color rule precedence
- [ ] T038 [P] Add documentation for setup, filtering, color logic, and API
- [ ] T039 [P] Performance optimization for roadmap queries and frontend rendering
- [ ] T040 [P] Final code cleanup and refactoring

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phases 3-5)**: Each depends on Foundational phase completion; can be implemented in parallel if staffed
- **Polish (Phase 6)**: Depends on all user stories being complete

## Parallel Example: User Story 1

- T014, T015, T016, T017, T018, T019, T020 can be implemented in parallel (different files)

## Implementation Strategy

- MVP: Complete Setup, Foundational, and User Story 1 phases
- Incremental: Add User Story 2 (color-coding), then User Story 3 (product/release cycle filtering)
- Polish: Finalize admin view, error handling, documentation, and performance
