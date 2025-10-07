# Backend Documentation

## Setup
- See `specs/001-build-a-web/quickstart.md` for environment and install instructions.

## API
- Roadmap endpoint: `/roadmap` (supports department, team, product, release filters)
- Color logic: See `src/services.py` for health color rules

## Error Handling
- Jira API downtime: falls back to cached data

## Filtering
- Department, team, product, release cycle supported

## Testing
- Run `pytest` in `backend/tests/`
