"""
Auth API endpoints — register, login, refresh, logout, me.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.auth.dependencies import get_current_user
from app.modules.auth.schemas import (
    LoginRequest,
    MessageResponse,
    RefreshRequest,
    RegisterRequest,
    TokenResponse,
    VerifyEmailRequest,
)
from app.modules.auth.service import AuthService
from app.modules.users.models import User
from app.modules.users.schemas import UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=201)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user."""
    service = AuthService(db)
    user = await service.register(data)
    return user


@router.post("/verify-email", response_model=MessageResponse)
async def verify_email(data: VerifyEmailRequest, db: AsyncSession = Depends(get_db)):
    """Verify 6-digit email code."""
    service = AuthService(db)
    return await service.verify_email(data.email, data.code)


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login and receive JWT tokens."""
    service = AuthService(db)
    return await service.login(data.login, data.password)


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: RefreshRequest, db: AsyncSession = Depends(get_db)):
    """Refresh access token using a valid refresh token."""
    service = AuthService(db)
    return await service.refresh(data.refresh_token)


@router.post("/logout", response_model=MessageResponse)
async def logout(data: RefreshRequest, db: AsyncSession = Depends(get_db)):
    """Revoke refresh token (logout)."""
    service = AuthService(db)
    await service.logout(data.refresh_token)
    return MessageResponse(message="Tizimdan muvaffaqiyatli chiqdingiz")


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current authenticated user."""
    return current_user
