# Tasks: Build Docker Image & GitHub CI for Automated and Manual QA

## Phase 1: Setup Tasks
- [X] T001: Create initial Dockerfile for backend [backend/Dockerfile]
- [X] T002: Create initial Dockerfile for frontend [frontend/Dockerfile]
- [X] T003: Set up basic GitHub Actions workflow file [/.github/workflows/ci.yml]
- [X] T004: Document environment variable usage for CI and local runs [specs/002-build-a-docker/quickstart.md]

## Phase 2: Foundational Tasks
- [X] T005: Ensure backend and frontend test suites are runnable in CI [backend/tests/, frontend/tests/]
- [X] T006: Add .env.example files for backend and frontend [backend/.env.example, frontend/.env.example]

## Phase 3: User Story 1 - Automated CI Build and Test (Priority: P1)
- [X] T007: Implement backend Docker build and test steps in CI workflow [/.github/workflows/ci.yml]
- [X] T008: Implement frontend Docker build and test steps in CI workflow [/.github/workflows/ci.yml]
- [X] T009: Add CI status and test result reporting to GitHub UI [/.github/workflows/ci.yml]
- [X] T010: Validate CI workflow by pushing a test commit [P]
- [X] T011: Document CI workflow and troubleshooting steps [specs/002-build-a-docker/quickstart.md]

## Phase 4: User Story 2 - Manual QA via Local Docker Run (Priority: P2)
- [X] T012: Write step-by-step instructions for running backend Docker image locally [specs/002-build-a-docker/quickstart.md]
- [X] T013: Write step-by-step instructions for running frontend Docker image locally [specs/002-build-a-docker/quickstart.md]
- [X] T014: Validate manual QA instructions by running both images locally [P]

## Phase 5: User Story 3 - Clear Documentation for QA and Developers (Priority: P3)
- [X] T015: Consolidate all Docker/CI/QA documentation for onboarding [specs/002-build-a-docker/quickstart.md]
- [X] T016: Review documentation with a new team member for usability [P]

## Final Phase: Polish & Cross-Cutting Concerns
- [X] T017: Ensure no sensitive data is present in Docker images or CI logs [backend/Dockerfile, frontend/Dockerfile, /.github/workflows/ci.yml]
- [X] T018: Optimize Docker images for size and build speed [backend/Dockerfile, frontend/Dockerfile]
- [X] T019: Final review and update of environment variable documentation [specs/002-build-a-docker/quickstart.md]

## Dependencies
- User Story 1 (P1) must be completed before User Story 2 (P2) and User Story 3 (P3)
- Setup and Foundational tasks must be completed before any user story tasks

## Parallel Execution Examples
- T010 and T014 (validation tasks) can be executed in parallel with documentation review (T011, T015, T016)
- Backend and frontend Dockerfile creation (T001, T002) can be done in parallel

## Implementation Strategy
- MVP: Complete all tasks for User Story 1 (Automated CI Build and Test)
- Incremental delivery: Complete setup, foundational, and P1 tasks first, then proceed to P2 and P3 phases

---
**Total tasks:** 19
**Tasks per user story:**
- User Story 1 (P1): 5
- User Story 2 (P2): 3
- User Story 3 (P3): 2
- Setup/Foundational/Polish: 9
**Parallel opportunities identified:** 5
**Independent test criteria for each story:**
- US1: CI workflow builds images and runs tests, results visible in GitHub UI
- US2: Team member can run both images locally and access the app
- US3: New team member can follow documentation to build, run, and test images
**Suggested MVP scope:** Complete all tasks for User Story 1 (P1)
