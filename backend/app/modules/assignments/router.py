"""
Assignment API endpoints — placeholder (to be implemented in Bosqich 3).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/assignments", tags=["assignments"])


@router.get("/")
async def list_assignments():
    """List assignments — coming soon."""
    return {"message": "Assignments moduli tez orada qo'shiladi", "items": []}
