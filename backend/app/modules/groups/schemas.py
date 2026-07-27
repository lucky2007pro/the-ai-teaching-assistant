"""
Group Pydantic schemas.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class GroupCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    description: str | None = Field(None, max_length=500)
    academic_year: str | None = Field(None, max_length=20)
    school_id: uuid.UUID | None = None


class GroupUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=255)
    description: str | None = Field(None, max_length=500)
    academic_year: str | None = Field(None, max_length=20)
    is_active: bool | None = None


class StudentCreate(BaseModel):
    """Create a new student directly into a group."""
    full_name: str = Field(..., min_length=2, max_length=255)
    username: str = Field(..., min_length=3, max_length=150)
    password: str = Field(..., min_length=6, max_length=128)
    birth_year: int | None = None
    phone: str | None = None


class GroupMemberAdd(BaseModel):
    """Add a student to a group."""
    user_id: uuid.UUID


class GroupMemberResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    group_id: uuid.UUID
    joined_at: datetime

    model_config = {"from_attributes": True}


class GroupResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str | None = None
    academic_year: str | None = None
    is_active: bool
    school_id: uuid.UUID | None = None
    teacher_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class GroupDetailResponse(GroupResponse):
    """Group with members list."""
    members: list[GroupMemberResponse] = []


class GroupListResponse(BaseModel):
    items: list[GroupResponse]
    total: int
    page: int
    size: int
