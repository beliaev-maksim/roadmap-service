from src.services import calculate_epic_color

def test_done():
    epic = {'status': 'Done', 'roadmap_state': '', 'labels': ['24.04', '25.10']}
    result = calculate_epic_color(epic)
    assert result['health']['color'] == 'green'
    assert result['health']['label'] == 'C'
    assert result['carry_over']['color'] == 'purple'
    assert result['carry_over']['count'] == 1

def test_at_risk():
    epic = {'status': 'In Progress', 'roadmap_state': 'At Risk', 'labels': ['25.10']}
    result = calculate_epic_color(epic)
    assert result['health']['color'] == 'orange'

def test_rejected():
    epic = {'status': 'Rejected', 'roadmap_state': '', 'labels': ['25.10']}
    result = calculate_epic_color(epic)
    assert result['health']['color'] == 'red'
