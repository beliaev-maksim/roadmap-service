from fastapi.testclient import TestClient
from src.api import app
from src.database import get_db_connection


def test_get_roadmap(test_client):
    resp = test_client.get("/api/roadmap")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


def test_sync(test_client):
    resp = test_client.post("/api/sync")
    assert resp.status_code == 200
    assert resp.json() == {"message": "Jira sync and data processing started in the background."}


def test_get_roadmap_with_data(test_client):
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO roadmap_item (jira_key, title, description, status, release, tags)
                VALUES ('TEST-1', 'Test Title', 'Test Description', 'To Do', '25.10', ARRAY['test'])
                """
            )
        conn.commit()

    resp = test_client.get("/api/roadmap")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 1
    assert data[0]["jira_key"] == "TEST-1"
    assert data[0]["title"] == "Test Title"
