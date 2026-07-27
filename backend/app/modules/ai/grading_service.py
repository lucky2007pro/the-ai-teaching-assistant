"""
AI Grading Service — orchestrates homework grading via OpenAI Vision API.

This service will be fully implemented in Bosqich 6. Current structure:
1. Receive homework submission (image/PDF)
2. Send to Vision API with grading prompt
3. Parse response → score, errors, strengths, recommendations
4. Store results in ai_grading_reports table
5. Update concept_mastery for the student
"""

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings


class GradingService:
    """Handles AI-powered homework grading."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.model = settings.OPENAI_MODEL

    async def grade_homework(self, homework_id):
        """
        Grade a homework submission using AI.

        Steps:
        1. Fetch homework + assignment from DB
        2. Download submission file
        3. Send to OpenAI Vision API with grading prompt
        4. Parse structured response
        5. Create AIGradingReport
        6. Update ConceptMastery

        TODO: Implement in Bosqich 6
        """
        raise NotImplementedError("AI grading tez orada qo'shiladi (Bosqich 6)")

    async def get_student_analytics(self, student_id, course_id=None):
        """
        Get aggregated analytics for a student.

        TODO: Implement in Bosqich 6
        """
        raise NotImplementedError("Student analytics tez orada qo'shiladi (Bosqich 6)")
