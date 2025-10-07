from fastapi import APIRouter
router = APIRouter()
@router.get('/metrics')
def metrics():
    return {'metrics': 'TODO: Prometheus format'}
