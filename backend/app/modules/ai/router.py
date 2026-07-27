"""
AI API endpoints — grading and analytics (placeholder for Bosqich 6).
"""

from fastapi import APIRouter

router = APIRouter(prefix="/ai", tags=["ai"])


@router.get("/")
async def ai_status():
    """AI module status."""
    return {
        "module": "ai",
        "status": "placeholder",
        "message": "AI baholash moduli tez orada qo'shiladi (Bosqich 6)",
        "planned_endpoints": [
            "POST /ai/grade — Uy vazifasini AI bilan baholash",
            "GET /ai/report/{homework_id} — Baholash natijasi",
            "GET /ai/analytics/{student_id} — O'quvchi tahlili",
            "GET /ai/mastery/{student_id}/{course_id} — Tushuncha darajasi",
        ],
    }
