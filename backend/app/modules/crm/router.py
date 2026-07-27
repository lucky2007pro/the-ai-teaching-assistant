"""
CRM API endpoints — placeholder (Bosqich 8).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/crm", tags=["crm"])


@router.get("/")
async def crm_status():
    """CRM module status — coming soon."""
    return {"message": "CRM moduli tez orada qo'shiladi (Bosqich 8)"}
