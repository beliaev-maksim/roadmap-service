import pytest
from src.jira_sync import calculate_epic_color

def test_calculate_epic_color_done():
    """Test that 'Done' status returns the correct completed state."""
    issue_fields = {'status': {'name': 'Done'}}
    result = calculate_epic_color(issue_fields)
    assert result['health']['color'] == 'green'
    assert result['health']['label'] == 'C'

def test_calculate_epic_color_at_risk():
    """Test that 'At Risk' state returns the correct color."""
    # Assuming 'roadmap_state' is a custom field. Using a placeholder ID.
    issue_fields = {
        'customfield_10968': {'value': 'At Risk'},
        'status': {'name': 'In Progress'} # Provide a status to make the test more realistic
    }
    result = calculate_epic_color(issue_fields)
    assert result['health']['color'] == 'orange'

def test_calculate_epic_color_in_progress():
    """Test that 'In Progress' status returns the correct color."""
    issue_fields = {'status': {'name': 'In Progress'}}
    result = calculate_epic_color(issue_fields)
    assert result['health']['color'] == 'green'

def test_calculate_epic_color_carry_over():
    """Test that multiple labels correctly trigger the carry-over status."""
    issue_fields = {'labels': ['release-1', 'release-2']}
    result = calculate_epic_color(issue_fields)
    assert result['carry_over'] is not None
    assert result['carry_over']['color'] == 'purple'
    assert result['carry_over']['count'] == 1

def test_calculate_epic_color_no_carry_over():
    """Test that a single label does not trigger carry-over."""
    issue_fields = {'labels': ['release-1']}
    result = calculate_epic_color(issue_fields)
    assert result['carry_over'] is None
