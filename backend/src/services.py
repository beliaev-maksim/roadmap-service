# Service layer for roadmap, products, departments
# TODO: Implement filtering, color logic, and business rules

def calculate_epic_color(epic):
    """Calculate color status for an epic based on health and carry-over rules."""
    labels = epic.get('labels', []) or []
    status = epic.get('status', '') or ''
    state = epic.get('roadmap_state', '') or ''
    carry_over = None
    if isinstance(labels, list) and len(labels) > 1:
        carry_over = {'color': 'purple', 'count': len(labels) - 1}
    color_map = {
        'At Risk': 'orange',
        'Excluded': 'red',
        'Added': 'blue',
        'Dropped': 'black',
    }
    if status == 'Done':
        return {'carry_over': carry_over, 'health': {'color': 'green', 'label': 'C'}}
    if state:
        return {'carry_over': carry_over, 'health': {'color': color_map.get(state, 'white')}}
    if status == 'Rejected':
        return {'carry_over': carry_over, 'health': {'color': 'red'}}
    if status in ('In Progress', 'In Review', 'To Be Deployed', 'BLOCKED'):
        return {'carry_over': carry_over, 'health': {'color': 'green'}}
    return {'carry_over': carry_over, 'health': {'color': 'white'}}


def filter_roadmap_by_department_team(items, department=None, team=None):
    """Filter roadmap items by department and team."""
    if not department and not team:
        return items
    filtered = (i for i in items if (not department or i.get('department') == department) and (not team or i.get('team') == team))
    return list(filtered)


def filter_roadmap_by_product_release(items, product=None, release=None):
    """Filter roadmap items by product and release cycle."""
    if not product and not release:
        return items
    filtered = (i for i in items if (not product or i.get('product') == product) and (not release or release in i.get('labels', [])))
    return list(filtered)
