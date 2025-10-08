from fastapi.testclient import TestClient

from src.api import app

client = TestClient(app)


def test_get_roadmap():
    resp = client.get("/roadmap")
    assert resp.status_code == 200
    assert "items" in resp.json()


def test_filter_by_product():
    resp = client.get('/roadmap?product=Ubuntu')
    assert resp.status_code == 200
    items = resp.json()['items']
    assert all(i['product'] == 'Ubuntu' for i in items)


def test_filter_by_release():
    resp = client.get('/roadmap?release=25.10')
    assert resp.status_code == 200
    items = resp.json()['items']
    assert all('25.10' in i['labels'] for i in items)
