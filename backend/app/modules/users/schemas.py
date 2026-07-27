"""
User Pydantic schemas — request/response validation.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


# ── Response Schemas ──────────────────────────────────────────────────────────


class UserResponse(BaseModel):
    """Public user profile response."""

    id: uuid.UUID
    email: str
    full_name: str
    phone: str | None = None
    avatar_url: str | None = None
    role: str
    is_active: bool
    school_id: uuid.UUID | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class UserListResponse(BaseModel):
    """Paginated list of users."""

    items: list[UserResponse]
    total: int
    page: int
    size: int


# ── Request Schemas ───────────────────────────────────────────────────────────


class UserUpdate(BaseModel):
    """Update user profile fields."""

    full_name: str | None = Field(None, min_length=2, max_length=255)
    phone: str | None = Field(None, max_length=20)
    avatar_url: str | None = None


class UserAdminUpdate(UserUpdate):
    """Admin can also change role and status."""

    role: str | None = None
    is_active: bool | None = None
    school_id: uuid.UUID | None = None
