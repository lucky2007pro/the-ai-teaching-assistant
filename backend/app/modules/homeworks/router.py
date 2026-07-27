"""
Homework API endpoints — placeholder (to be implemented in Bosqich 4).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/homeworks", tags=["homeworks"])


@router.get("/")
async def list_homeworks():
    """List homeworks — coming soon."""
    return {"message": "Homeworks moduli tez orada qo'shiladi", "items": []}
