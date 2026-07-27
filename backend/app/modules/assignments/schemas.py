"""
Assignment Pydantic schemas — placeholder.
"""

import uuid
from datetime import datetime
from pydantic import BaseModel, Field


class AssignmentCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    description: str | None = None
    instructions: str | None = None
    max_score: int = Field(100, ge=1)
    due_date: datetime | None = None
    course_id: uuid.UUID


class AssignmentUpdate(BaseModel):
    title: str | None = Field(None, min_length=2, max_length=255)
    description: str | None = None
    instructions: str | None = None
    max_score: int | None = Field(None, ge=1)
    due_date: datetime | None = None
    is_active: bool | None = None


class AssignmentResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    instructions: str | None = None
    max_score: int
    due_date: datetime | None = None
    is_active: bool
    course_id: uuid.UUID
    teacher_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class AssignmentListResponse(BaseModel):
    items: list[AssignmentResponse]
    total: int
    page: int
    size: int
