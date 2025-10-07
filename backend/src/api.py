from fastapi import FastAPI

app = FastAPI()

@app.get("/roadmap")
def get_roadmap():
    return {"items": []}
