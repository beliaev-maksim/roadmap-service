import os
import pytest
from fastapi.testclient import TestClient
from src.api import app
from src.database import get_db_connection

@pytest.fixture(scope="function")
def test_client():
    # This fixture now relies on setup_test_database to set the env vars.
    with TestClient(app) as client:
        yield client

@pytest.fixture(scope="function", autouse=True)
def setup_test_database():
    # Set default mock environment variables for Jira to prevent import errors in CI.
    # These can be overridden in the CI environment if needed.
    os.environ.setdefault("JIRA_URL", "http://mock.jira.com")
    os.environ.setdefault("JIRA_USERNAME", "mockuser")
    os.environ.setdefault("JIRA_PAT", "mocktoken")
    os.environ.setdefault("JQL_QUERY", "project=MOCK")

    # Allow the DB host to be overridden by an environment variable for CI.
    # Defaults to 'db', which is the service name in docker-compose.
    db_host = os.environ.get("DB_HOST", "db")
    
    # Use the correct port (5432) for container-to-container communication.
    os.environ["DATABASE_URL"] = f"postgresql://user:password@{db_host}:5432/test_roadmap"
    
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # Drop all tables to ensure a clean state for each test.
            cur.execute("DROP TABLE IF EXISTS jira_issue_raw, roadmap_item, product, team, department, release_cycle, objective CASCADE;")
            with open("src/db_schema.sql", "r") as f:
                cur.execute(f.read())
        conn.commit()
    yield
    # Teardown: clean up the database after the test.
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DROP TABLE IF EXISTS jira_issue_raw, roadmap_item, product, team, department, release_cycle, objective CASCADE;")
        conn.commit()
