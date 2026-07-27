"""
School Pydantic schemas.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class SchoolCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    slug: str = Field(..., min_length=2, max_length=255, pattern=r"^[a-z0-9-]+$")
    address: str | None = None
    phone: str | None = Field(None, max_length=20)
    logo_url: str | None = None


class SchoolUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=255)
    address: str | None = None
    phone: str | None = Field(None, max_length=20)
    logo_url: str | None = None
    is_active: bool | None = None


class SchoolResponse(BaseModel):
    id: uuid.UUID
    name: str
    slug: str
    address: str | None = None
    phone: str | None = None
    logo_url: str | None = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class SchoolListResponse(BaseModel):
    items: list[SchoolResponse]
    total: int
    page: int
    size: int
