"""
Shared utility functions and constants.
"""

from math import ceil
from typing import TypeVar

from pydantic import BaseModel


# ── Pagination Helper ─────────────────────────────────────────────────────────


class PaginationParams(BaseModel):
    """Standard pagination parameters."""
    page: int = 1
    size: int = 20

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.size

    def total_pages(self, total: int) -> int:
        return ceil(total / self.size) if self.size > 0 else 0


# ── Constants ─────────────────────────────────────────────────────────────────

MAX_PAGE_SIZE = 100
DEFAULT_PAGE_SIZE = 20

# File upload limits
MAX_IMAGE_SIZE_MB = 10
MAX_PDF_SIZE_MB = 25
MAX_VIDEO_SIZE_MB = 500
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
ALLOWED_DOCUMENT_TYPES = {"application/pdf"}
