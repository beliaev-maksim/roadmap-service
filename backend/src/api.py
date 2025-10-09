
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .services import filter_roadmap_by_department_team, filter_roadmap_by_product_release, calculate_epic_color

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/roadmap")
def get_roadmap(department: str = None, team: str = None, product: str = None, release: str = None):
    # TODO: Replace with DB fetch
    items = [
        {'id': '1', 'name': 'Epic 1', 'department': 'Engineering', 'team': 'Team A', 'product': 'Ubuntu', 'status': 'Done', 'roadmap_state': '', 'labels': ['24.04', '25.10']},
        {'id': '2', 'name': 'Epic 2', 'department': 'Product', 'team': 'Team B', 'product': 'Snap', 'status': 'In Progress', 'roadmap_state': 'At Risk', 'labels': ['25.10']},
        {'id': '3', 'name': 'Epic 3', 'department': 'Product', 'team': 'Team B', 'product': 'Snap', 'status': 'In Progress', 'roadmap_state': '', 'labels': ['25.10']},
        {'id': '4', 'name': 'Epic 4', 'department': 'Product', 'team': 'Team B', 'product': 'Snap', 'status': 'Done', 'roadmap_state': 'At Risk', 'labels': ['25.10']},
    ]
    filtered = filter_roadmap_by_department_team(items, department, team)
    filtered = filter_roadmap_by_product_release(filtered, product, release)
    for item in filtered:
        item['color_status'] = calculate_epic_color(item)
    return {"items": filtered}
