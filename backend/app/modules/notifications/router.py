"""
Notifications API endpoints — placeholder (Bosqich 7).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("/")
async def list_notifications():
    """List notifications — coming soon."""
    return {"message": "Notifications moduli tez orada qo'shiladi", "items": []}
