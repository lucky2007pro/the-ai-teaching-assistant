"""
Auth service — register, login, refresh, logout business logic.
"""

import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import (
    BadRequestException,
    ConflictException,
    UnauthorizedException,
)
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.modules.auth.schemas import RegisterRequest, TokenResponse
from app.modules.users.models import RefreshToken, User


class AuthService:
    """Handles authentication: register, login, token refresh, logout."""

    def __init__(self, db: AsyncSession):
        self.db = db

    # ── Register ──────────────────────────────────────────────────────────────

    async def register(self, data: RegisterRequest) -> User:
        """Create a new user account."""
        # Check duplicate email
        existing = await self.db.execute(select(User).where(User.email == data.email))
        if existing.scalar_one_or_none():
            raise ConflictException("Bu email allaqachon ro'yxatdan o'tgan")

        user = User(
            email=data.email,
            hashed_password=hash_password(data.password),
            full_name=data.full_name,
            role=data.role,
            phone=data.phone,
        )
        self.db.add(user)
        await self.db.flush()
        return user

    # ── Login ─────────────────────────────────────────────────────────────────

    async def login(self, email: str, password: str) -> TokenResponse:
        """Authenticate user and return token pair."""
        result = await self.db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.hashed_password):
            raise UnauthorizedException("Email yoki parol noto'g'ri")

        if not user.is_active:
            raise BadRequestException("Hisob faol emas")

        return await self._create_tokens(user)

    # ── Refresh ───────────────────────────────────────────────────────────────

    async def refresh(self, refresh_token_str: str) -> TokenResponse:
        """Verify refresh token and issue new token pair."""
        payload = decode_token(refresh_token_str)
        if not payload or payload.get("type") != "refresh":
            raise UnauthorizedException("Yaroqsiz refresh token")

        # Check token exists in DB
        result = await self.db.execute(
            select(RefreshToken).where(RefreshToken.token == refresh_token_str)
        )
        stored_token = result.scalar_one_or_none()
        if not stored_token:
            raise UnauthorizedException("Refresh token topilmadi")

        if stored_token.expires_at < datetime.now(timezone.utc):
            raise UnauthorizedException("Refresh token muddati tugagan")

        # Delete old token
        await self.db.delete(stored_token)

        # Get user
        user = await self.db.get(User, stored_token.user_id)
        if not user or not user.is_active:
            raise UnauthorizedException("Foydalanuvchi topilmadi yoki faol emas")

        return await self._create_tokens(user)

    # ── Logout ────────────────────────────────────────────────────────────────

    async def logout(self, refresh_token_str: str) -> None:
        """Revoke a refresh token."""
        await self.db.execute(
            delete(RefreshToken).where(RefreshToken.token == refresh_token_str)
        )

    # ── Internal ──────────────────────────────────────────────────────────────

    async def _create_tokens(self, user: User) -> TokenResponse:
        """Generate access + refresh tokens and store refresh token."""
        token_data = {"sub": str(user.id), "role": user.role}

        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)

        # Store refresh token
        db_token = RefreshToken(
            token=refresh_token,
            user_id=user.id,
            expires_at=datetime.now(timezone.utc)
            + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        )
        self.db.add(db_token)
        await self.db.flush()

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
        )
