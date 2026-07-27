"""
Application settings — loaded from .env via pydantic-settings.
"""

from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ── App ───────────────────────────────────────────────────────────────────
    APP_NAME: str = "MentorLMS"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"  # development | staging | production

    # ── Database ──────────────────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://mentor:mentor_secret@localhost:5432/mentor_lms"

    # ── Auth / JWT ────────────────────────────────────────────────────────────
    SECRET_KEY: str = "change-me-to-a-random-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── Redis ─────────────────────────────────────────────────────────────────
    REDIS_URL: str = "redis://localhost:6379/0"

    # ── CORS ──────────────────────────────────────────────────────────────────
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    # ── AI (Gemini) ───────────────────────────────────────────────────────────
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-pro"

    # ── S3 / File Storage ─────────────────────────────────────────────────────
    S3_BUCKET_NAME: str = ""
    S3_ACCESS_KEY: str = ""
    S3_SECRET_KEY: str = ""
    S3_ENDPOINT_URL: str = ""

    # ── SMTP / Email ──────────────────────────────────────────────────────────
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    FROM_EMAIL: str = "no-reply@mentor.uz"


settings = Settings()
