import os
import pytest
from fastapi.testclient import TestClient
from src.api import app
from src.database import get_db_connection

@pytest.fixture(scope="module")
def test_client():
    os.environ["DATABASE_URL"] = "postgresql://user:password@localhost:5433/test_roadmap"
    with TestClient(app) as client:
        yield client

@pytest.fixture(scope="module", autouse=True)
def setup_test_database():
    os.environ["DATABASE_URL"] = "postgresql://user:password@localhost:5433/test_roadmap"
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DROP TABLE IF EXISTS roadmap_items")
            with open("src/db_schema.sql", "r") as f:
                cur.execute(f.read())
        conn.commit()
    yield
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DROP TABLE roadmap_items")
        conn.commit()
