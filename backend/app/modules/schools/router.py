"""
School API endpoints — CRUD (admin only).
"""

import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.permissions.dependencies import require_admin
from app.modules.schools.schemas import (
    SchoolCreate,
    SchoolListResponse,
    SchoolResponse,
    SchoolUpdate,
)
from app.modules.schools.service import SchoolService

router = APIRouter(prefix="/schools", tags=["schools"])


@router.post(
    "/",
    response_model=SchoolResponse,
    status_code=201,
    dependencies=[Depends(require_admin)],
)
async def create_school(data: SchoolCreate, db: AsyncSession = Depends(get_db)):
    """Create a new school (admin only)."""
    service = SchoolService(db)
    return await service.create_school(data)


@router.get("/", response_model=SchoolListResponse)
async def list_schools(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """List all schools."""
    service = SchoolService(db)
    schools, total = await service.list_schools(page=page, size=size)
    return SchoolListResponse(items=schools, total=total, page=page, size=size)


@router.get("/{school_id}", response_model=SchoolResponse)
async def get_school(school_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Get a school by ID."""
    service = SchoolService(db)
    return await service.get_school(school_id)


@router.patch(
    "/{school_id}",
    response_model=SchoolResponse,
    dependencies=[Depends(require_admin)],
)
async def update_school(
    school_id: uuid.UUID,
    data: SchoolUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update a school (admin only)."""
    service = SchoolService(db)
    return await service.update_school(school_id, data)


@router.delete(
    "/{school_id}",
    status_code=204,
    dependencies=[Depends(require_admin)],
)
async def delete_school(school_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Soft-delete a school (admin only)."""
    service = SchoolService(db)
    await service.delete_school(school_id)
