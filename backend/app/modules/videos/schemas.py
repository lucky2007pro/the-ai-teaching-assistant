"""
Video Pydantic schemas — placeholder.
"""

import uuid
from datetime import datetime
from pydantic import BaseModel, Field


class VideoCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    description: str | None = None
    video_url: str
    thumbnail_url: str | None = None
    duration_seconds: int | None = None
    order: int = 0
    course_id: uuid.UUID


class VideoResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    video_url: str
    thumbnail_url: str | None = None
    duration_seconds: int | None = None
    order: int
    course_id: uuid.UUID
    uploaded_by: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class VideoListResponse(BaseModel):
    items: list[VideoResponse]
    total: int
    page: int
    size: int
