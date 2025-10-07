def test_get_roadmap():
    assert True  # Placeholder for API test


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
