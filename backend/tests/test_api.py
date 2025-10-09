from fastapi.testclient import TestClient
from src.api import app
from src.database import get_db_connection
import json


def test_get_roadmap_empty(test_client):
    """Test that the roadmap endpoint returns an empty list when the DB is empty."""
    resp = test_client.get("/api/roadmap")
    assert resp.status_code == 200
    assert resp.json() == []


def test_sync_endpoint(test_client):
    """Test that the sync endpoint returns a success message."""
    resp = test_client.post("/api/sync")
    assert resp.status_code == 200
    assert resp.json() == {"message": "Jira sync and data processing started in the background."}


def test_get_roadmap_with_data(test_client):
    """Test that the roadmap endpoint returns data after it has been inserted."""
    color_status = {"health": {"color": "green"}, "carry_over": None}
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO roadmap_item (jira_key, title, description, status, release, tags, product, color_status, url)
                VALUES ('TEST-1', 'Test Title', 'Test Desc', 'To Do', '25.10', ARRAY['test'], 'Uncategorized', %s, 'http://jira/TEST-1')
                """,
                (json.dumps(color_status),)
            )
        conn.commit()

    resp = test_client.get("/api/roadmap")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 1
    item = data[0]
    assert item["jira_key"] == "TEST-1"
    assert item["title"] == "Test Title"
    assert item["url"] == "http://jira/TEST-1"
    assert item["color_status"]["health"]["color"] == "green"


def test_get_status_endpoint(test_client):
    """Test that the status endpoint returns a valid status object."""
    resp = test_client.get("/api/status")
    assert resp.status_code == 200
    status = resp.json()
    assert "status" in status
    assert "last_sync_start_time" in status
