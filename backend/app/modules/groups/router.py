"""
Group API endpoints — CRUD + member management.
"""

import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.permissions.dependencies import require_teacher
from app.modules.groups.schemas import (
    GroupCreate,
    GroupDetailResponse,
    GroupListResponse,
    GroupMemberAdd,
    GroupMemberResponse,
    GroupResponse,
    GroupUpdate,
    StudentCreate,
)
from app.modules.groups.service import GroupService
from app.modules.users.models import User

router = APIRouter(prefix="/groups", tags=["groups"])


@router.post(
    "/",
    response_model=GroupResponse,
    status_code=201,
    dependencies=[Depends(require_teacher)],
)
async def create_group(
    data: GroupCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new group (teacher or admin)."""
    service = GroupService(db)
    return await service.create_group(data, current_user)


@router.get("/", response_model=GroupListResponse)
async def list_groups(
    teacher_id: uuid.UUID | None = Query(None),
    school_id: uuid.UUID | None = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """List groups with optional filters."""
    service = GroupService(db)
    groups, total = await service.list_groups(
        teacher_id=teacher_id, school_id=school_id, page=page, size=size
    )
    return GroupListResponse(items=groups, total=total, page=page, size=size)


@router.get("/{group_id}", response_model=GroupDetailResponse)
async def get_group(group_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Get group details with members."""
    service = GroupService(db)
    return await service.get_group(group_id)


@router.patch("/{group_id}", response_model=GroupResponse)
async def update_group(
    group_id: uuid.UUID,
    data: GroupUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update group (owner or admin)."""
    service = GroupService(db)
    return await service.update_group(group_id, data, current_user)


@router.delete("/{group_id}", status_code=204)
async def delete_group(
    group_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Soft-delete group (owner or admin)."""
    service = GroupService(db)
    await service.delete_group(group_id, current_user)


# ── Members ───────────────────────────────────────────────────────────────────


@router.post("/{group_id}/students", response_model=GroupMemberResponse, status_code=201)
async def add_student(
    group_id: uuid.UUID,
    data: StudentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new student and add them to the group."""
    service = GroupService(db)
    return await service.create_and_add_student(group_id, data, current_user)

@router.post("/{group_id}/members", response_model=GroupMemberResponse, status_code=201)
async def add_member(
    group_id: uuid.UUID,
    data: GroupMemberAdd,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Add an existing student to the group."""
    service = GroupService(db)
    return await service.add_member(group_id, data.user_id, current_user)


@router.delete("/{group_id}/members/{user_id}", status_code=204)
async def remove_member(
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Remove a student from the group."""
    service = GroupService(db)
    await service.remove_member(group_id, user_id, current_user)


@router.get("/{group_id}/members", response_model=list[GroupMemberResponse])
async def list_members(
    group_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """List all members of a group."""
    service = GroupService(db)
    return await service.list_members(group_id)
