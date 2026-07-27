"""
Course Pydantic schemas — placeholder.
"""

import uuid
from datetime import datetime
from pydantic import BaseModel, Field


class CourseCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    description: str | None = None
    subject: str | None = Field(None, max_length=100)
    grade_level: str | None = Field(None, max_length=20)
    group_id: uuid.UUID


class CourseUpdate(BaseModel):
    title: str | None = Field(None, min_length=2, max_length=255)
    description: str | None = None
    subject: str | None = None
    grade_level: str | None = None
    is_active: bool | None = None


class CourseResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    subject: str | None = None
    grade_level: str | None = None
    is_active: bool
    group_id: uuid.UUID
    teacher_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CourseListResponse(BaseModel):
    items: list[CourseResponse]
    total: int
    page: int
    size: int
