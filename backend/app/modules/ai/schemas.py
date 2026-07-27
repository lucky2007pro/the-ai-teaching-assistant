"""
AI Pydantic schemas — grading requests/responses.
"""

import uuid
from datetime import datetime
from pydantic import BaseModel


class GradeHomeworkRequest(BaseModel):
    """Request to grade a homework submission with AI."""
    homework_id: uuid.UUID


class GradingReportResponse(BaseModel):
    id: uuid.UUID
    homework_id: uuid.UUID
    student_id: uuid.UUID
    score: int | None = None
    max_score: int
    feedback: str | None = None
    errors_json: str | None = None
    strengths_json: str | None = None
    recommendations_json: str | None = None
    model_used: str | None = None
    confidence: float | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class ConceptMasteryResponse(BaseModel):
    id: uuid.UUID
    student_id: uuid.UUID
    course_id: uuid.UUID
    concept_name: str
    mastery_level: float
    attempts: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class StudentAnalyticsResponse(BaseModel):
    """Aggregated analytics for a student."""
    student_id: uuid.UUID
    total_submissions: int
    average_score: float | None = None
    concept_mastery: list[ConceptMasteryResponse] = []
    recent_reports: list[GradingReportResponse] = []
