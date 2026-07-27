"""
Custom exception classes and FastAPI exception handlers.
"""

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse


# ── Custom Exceptions ─────────────────────────────────────────────────────────


class AppException(Exception):
    """Base application exception."""

    def __init__(self, detail: str, status_code: int = 400):
        self.detail = detail
        self.status_code = status_code
        super().__init__(detail)


class NotFoundException(AppException):
    """Resource not found (404)."""

    def __init__(self, detail: str = "Resurs topilmadi"):
        super().__init__(detail=detail, status_code=status.HTTP_404_NOT_FOUND)


class ForbiddenException(AppException):
    """Access denied (403)."""

    def __init__(self, detail: str = "Ruxsat yo'q"):
        super().__init__(detail=detail, status_code=status.HTTP_403_FORBIDDEN)


class UnauthorizedException(AppException):
    """Authentication required (401)."""

    def __init__(self, detail: str = "Avtorizatsiya talab etiladi"):
        super().__init__(detail=detail, status_code=status.HTTP_401_UNAUTHORIZED)


class ConflictException(AppException):
    """Conflict — duplicate resource (409)."""

    def __init__(self, detail: str = "Bu ma'lumot allaqachon mavjud"):
        super().__init__(detail=detail, status_code=status.HTTP_409_CONFLICT)


class BadRequestException(AppException):
    """Bad request (400)."""

    def __init__(self, detail: str = "Noto'g'ri so'rov"):
        super().__init__(detail=detail, status_code=status.HTTP_400_BAD_REQUEST)


# ── Exception Handlers ───────────────────────────────────────────────────────


def register_exception_handlers(app: FastAPI) -> None:
    """Register custom exception handlers on the FastAPI app."""

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )
