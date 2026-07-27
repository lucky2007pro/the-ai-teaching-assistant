"""
Video API endpoints — placeholder (to be implemented in Bosqich 5).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/videos", tags=["videos"])


@router.get("/")
async def list_videos():
    """List video lessons — coming soon."""
    return {"message": "Videos moduli tez orada qo'shiladi", "items": []}
