"""
Auth Pydantic schemas — register, login, token requests/responses.
"""

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    """New user registration."""

    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)
    full_name: str = Field(..., min_length=2, max_length=255)
    role: str = Field("student", pattern=r"^(admin|teacher|student)$")
    phone: str | None = Field(None, max_length=20)


class LoginRequest(BaseModel):
    """Email + password login."""

    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """JWT access + refresh token pair."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    """Refresh token to get new access token."""

    refresh_token: str


class MessageResponse(BaseModel):
    """Simple message response."""

    message: str
