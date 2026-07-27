"""
Homework Pydantic schemas — placeholder.
"""

import uuid
from datetime import datetime
from pydantic import BaseModel


class HomeworkCreate(BaseModel):
    assignment_id: uuid.UUID
    file_url: str | None = None
    file_type: str | None = None
    text_answer: str | None = None


class HomeworkResponse(BaseModel):
    id: uuid.UUID
    assignment_id: uuid.UUID
    student_id: uuid.UUID
    file_url: str | None = None
    file_type: str | None = None
    text_answer: str | None = None
    status: str
    score: int | None = None
    teacher_feedback: str | None = None
    ai_feedback: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class HomeworkListResponse(BaseModel):
    items: list[HomeworkResponse]
    total: int
    page: int
    size: int
