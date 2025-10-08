# Quickstart: Docker & CI for Roadmap Service

## CI Workflow
1. On every push or pull request, GitHub Actions will:
   - Build backend Docker image (`roadmap-backend`)
   - Run backend tests using pytest
   - Build frontend Docker image (`roadmap-frontend`)
   - Run frontend tests using npm
   - Report CI status in the GitHub UI

## Troubleshooting CI
- If a build or test fails, check the Actions tab in GitHub for logs and error details.
- Ensure all required environment variables are set in GitHub Secrets and `.env.example` files.
- For Docker build issues, verify Dockerfile paths and dependencies.
- For test failures, run tests locally using the same commands as in CI.

## Manual QA Instructions

### Backend
1. Build the backend Docker image:
   ```bash
   docker build -t roadmap-backend ./backend
   ```
2. Run the backend container:
   ```bash
   docker run --rm -p 8000:8000 --env-file ./backend/.env.example roadmap-backend
   ```

### Frontend
1. Build the frontend Docker image:
   ```bash
   docker build -t roadmap-frontend ./frontend
   ```
2. Run the frontend container:
   ```bash
   docker run --rm -p 3000:3000 --env-file ./frontend/.env.example roadmap-frontend
   ```

## Environment Variables
- Backend: see `backend/.env.example`
- Frontend: see `frontend/.env.example`
