# Quickstart: Jira Roadmap Visualization Web App

## Backend (FastAPI)

1. Install dependencies:
   ```bash
   pip install fastapi uvicorn pydantic httpx asyncpg
   ```
2. Set up PostgreSQL and configure connection string in environment variables.
3. Run the FastAPI server:
   ```bash
   uvicorn backend.src.api:app --reload
   ```

## Frontend (React)

1. Install dependencies:
   ```bash
   npm install react react-dom @mui/material @emotion/react @emotion/styled
   ```
2. Start the frontend development server:
   ```bash
   npm start
   ```

## Data Sync
- Configure periodic sync from Jira to PostgreSQL (recommended: scheduled job or webhook)
- Ensure roadmap items are updated in the database before serving to frontend

## Admin/User Views
- Access admin view at `/admin` (role-based access)
- Access user view at `/` (default)

## Filtering
- Use filters for department, team, product, and release cycle in the UI

## Observability
- Backend logs to stdout in JSON format
- Add Prometheus metrics endpoint at `/metrics`
