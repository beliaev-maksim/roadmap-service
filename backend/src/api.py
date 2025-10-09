from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from .services import filter_roadmap_by_department_team, filter_roadmap_by_product_release, calculate_epic_color
from .database import get_db_connection
from .jira_sync import sync_jira_data, process_raw_jira_data

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
def startup_event():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            with open("src/db_schema.sql", "r") as f:
                cur.execute(f.read())
        conn.commit()

@app.post("/api/sync")
def sync(background_tasks: BackgroundTasks):
    background_tasks.add_task(sync_jira_data)
    background_tasks.add_task(process_raw_jira_data)
    return {"message": "Jira sync and data processing started in the background."}

@app.get("/api/roadmap")
def get_roadmap():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, jira_key, title, description, status, release, tags FROM roadmap_item")
            rows = cur.fetchall()
            return [
                {
                    "id": row[0],
                    "jira_key": row[1],
                    "title": row[2],
                    "description": row[3],
                    "status": row[4],
                    "release": row[5],
                    "tags": row[6],
                }
                for row in rows
            ]
