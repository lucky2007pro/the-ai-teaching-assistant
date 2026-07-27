"""
User API endpoints.
"""

import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.permissions.dependencies import require_admin
from app.modules.users.models import User
from app.modules.users.schemas import UserResponse, UserListResponse, UserUpdate, UserAdminUpdate
from app.modules.users.service import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/suggest-username")
async def suggest_username(full_name: str, db: AsyncSession = Depends(get_db)):
    """Generate a unique username proposal based on full name."""
    service = UserService(db)
    return await service.suggest_username(full_name)


@router.get("/me", response_model=UserResponse)
async def get_my_profile(current_user: User = Depends(get_current_user)):
    """Get current authenticated user's profile."""
    return current_user


@router.patch("/me", response_model=UserResponse)
async def update_my_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update current user's profile."""
    if current_user.role == "student":
        from app.core.exceptions import ForbiddenException
        raise ForbiddenException("O'quvchilar o'z profilini tahrirlay olmaydi")
        
    service = UserService(db)
    return await service.update_profile(current_user.id, data)


@router.get(
    "/",
    response_model=UserListResponse,
    dependencies=[Depends(require_admin)],
)
async def list_users(
    role: str | None = Query(None, description="Filter by role"),
    school_id: uuid.UUID | None = Query(None, description="Filter by school"),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """List all users (admin only)."""
    service = UserService(db)
    users, total = await service.list_users(role=role, school_id=school_id, page=page, size=size)
    return UserListResponse(items=users, total=total, page=page, size=size)


@router.get(
    "/{user_id}",
    response_model=UserResponse,
    dependencies=[Depends(require_admin)],
)
async def get_user(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a user by ID (admin only)."""
    service = UserService(db)
    return await service.get_user(user_id)


@router.patch(
    "/{user_id}",
    response_model=UserResponse,
    dependencies=[Depends(require_admin)],
)
async def admin_update_user(
    user_id: uuid.UUID,
    data: UserAdminUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update any user (admin only)."""
    service = UserService(db)
    return await service.admin_update_user(user_id, data)
