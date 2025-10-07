def test_filter_roadmap_by_department_team():
    items = [
        {'id': '1', 'department': 'Engineering', 'team': 'Team A'},
        {'id': '2', 'department': 'Product', 'team': 'Team B'},
    ]
    from src.services import filter_roadmap_by_department_team
    assert len(filter_roadmap_by_department_team(items, 'Engineering', None)) == 1
    assert len(filter_roadmap_by_department_team(items, None, 'Team B')) == 1
    assert len(filter_roadmap_by_department_team(items, 'Engineering', 'Team A')) == 1
