from fastapi import FastAPI
from .services import filter_roadmap_by_department_team, calculate_epic_color

app = FastAPI()

@app.get("/roadmap")
def get_roadmap(department: str = None, team: str = None):
    # TODO: Replace with DB fetch
    items = [
        {'id': '1', 'name': 'Epic 1', 'department': 'Engineering', 'team': 'Team A', 'status': 'Done', 'roadmap_state': '', 'labels': ['24.04', '25.10']},
        {'id': '2', 'name': 'Epic 2', 'department': 'Product', 'team': 'Team B', 'status': 'In Progress', 'roadmap_state': 'At Risk', 'labels': ['25.10']},
    ]
    filtered = filter_roadmap_by_department_team(items, department, team)
    for item in filtered:
        item['color_status'] = calculate_epic_color(item)
    return {"items": filtered}
