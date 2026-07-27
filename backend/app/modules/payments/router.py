"""
Payments API endpoints — placeholder (Bosqich 8).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/payments", tags=["payments"])


@router.get("/")
async def payments_status():
    """Payments module status — coming soon."""
    return {"message": "Payments moduli tez orada qo'shiladi (Bosqich 8)"}
