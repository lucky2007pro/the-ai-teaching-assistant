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


# In-memory store for verification codes (For testing purposes)
verification_codes = {}

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
            role="teacher",
            phone=data.phone,
            is_active=False  # Require verification
        )
        self.db.add(user)
        await self.db.flush()
        
        # Generate 6-digit code
        import random
        from app.modules.services.email_service import send_verification_email
        
        verification_code = str(random.randint(100000, 999999))
        
        # Store code in memory for testing
        global verification_codes
        verification_codes[user.email] = verification_code
        
        # Await the email sending to ensure it's sent
        await send_verification_email(user.email, verification_code)
        
        return user

    async def verify_email(self, email: str, code: str):
        global verification_codes
        if verification_codes.get(email) != code:
            raise BadRequestException("Kod noto'g'ri yoki eskirgan")
            
        result = await self.db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if not user:
            raise BadRequestException("Foydalanuvchi topilmadi")
            
        user.is_active = True
        await self.db.flush()
        
        # Remove used code
        del verification_codes[email]
        
        return {"message": "Email muvaffaqiyatli tasdiqlandi"}

    # ── Login ─────────────────────────────────────────────────────────────────

    async def login(self, login_identifier: str, password: str) -> TokenResponse:
        """Authenticate user and return token pair."""
        from sqlalchemy import or_
        result = await self.db.execute(
            select(User).where(or_(User.email == login_identifier, User.username == login_identifier))
        )
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.hashed_password):
            raise UnauthorizedException("Login yoki parol noto'g'ri")

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

        # Check token expiration
        expires_at = stored_token.expires_at
        now = datetime.now(timezone.utc) if expires_at.tzinfo else datetime.now(timezone.utc).replace(tzinfo=None)
        if expires_at < now:
            raise UnauthorizedException("Refresh token muddati tugagan")

        # Delete old token
        await self.db.delete(stored_token)

        # Get user
        user = await self.db.get(User, stored_token.user_id)
        if not user or not user.is_active:
            raise UnauthorizedException("Foydalanuvchi topilmadi yoki faol emas")

        return await self._createTokens(user) if hasattr(self, '_createTokens') else await self._create_tokens(user)

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

        # Store refresh token with naive UTC datetime for DB compatibility
        naive_now = datetime.now(timezone.utc).replace(tzinfo=None)
        db_token = RefreshToken(
            token=refresh_token,
            user_id=user.id,
            expires_at=naive_now + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        )


        self.db.add(db_token)
        await self.db.flush()

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
        )
