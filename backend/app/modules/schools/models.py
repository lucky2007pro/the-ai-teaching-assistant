"""
School database model — multi-tenant organization.
"""

from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.db.mixins import TimestampMixin, SoftDeleteMixin


class School(Base, TimestampMixin, SoftDeleteMixin):
    """School / organization — the top-level tenant entity."""

    __tablename__ = "schools"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    logo_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    users = relationship("User", back_populates="school", lazy="selectin")
    groups = relationship("Group", back_populates="school", lazy="selectin")

    def __repr__(self) -> str:
        return f"<School {self.name}>"
