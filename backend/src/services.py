# Service layer for roadmap, products, departments
# TODO: Implement filtering, color logic, and business rules

def calculate_epic_color(epic):
    # Column 1: Carry-Over
    carry_over = None
    if len(epic.get('labels', [])) > 1:
        carry_over = {'color': 'purple', 'count': len(epic['labels']) - 1}
    # Column 2: Health
    if epic.get('status') == 'Done':
        return {'carry_over': carry_over, 'health': {'color': 'green', 'label': 'C'}}
    state = epic.get('roadmap_state', '')
    if state:
        color_map = {
            'At Risk': 'orange',
            'Excluded': 'red',
            'Added': 'blue',
            'Dropped': 'black',
        }
        return {'carry_over': carry_over, 'health': {'color': color_map.get(state, 'white')}}
    status = epic.get('status', '')
    if status == 'Rejected':
        return {'carry_over': carry_over, 'health': {'color': 'red'}}
    if status in ('In Progress', 'In Review', 'To Be Deployed', 'BLOCKED'):
        return {'carry_over': carry_over, 'health': {'color': 'green'}}
    return {'carry_over': carry_over, 'health': {'color': 'white'}}

def filter_roadmap_by_product_release(items, product=None, release=None):
    filtered = items
    if product:
        filtered = [i for i in filtered if i.get('product') == product]
    if release:
        filtered = [i for i in filtered if release in i.get('labels', [])]
    return filtered
