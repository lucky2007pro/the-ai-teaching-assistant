"""
Course API endpoints — placeholder (to be implemented in Bosqich 3).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("/")
async def list_courses():
    """List courses — coming soon."""
    return {"message": "Courses moduli tez orada qo'shiladi", "items": []}
