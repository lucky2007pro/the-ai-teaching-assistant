"""
Homework (submission) database model — placeholder.
"""

import uuid

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import TimestampMixin


class Homework(Base, TimestampMixin):
    """A student's submission for an assignment."""

    __tablename__ = "homeworks"

    # Foreign keys
    assignment_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("assignments.id", ondelete="CASCADE"),
        nullable=False,
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    # Submission content
    file_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    file_type: Mapped[str | None] = mapped_column(String(20), nullable=True)  # image, pdf
    text_answer: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Grading
    status: Mapped[str] = mapped_column(
        String(20), default="pending", nullable=False
    )  # pending, grading, graded
    score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    teacher_feedback: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_feedback: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"<Homework student={self.student_id} assignment={self.assignment_id}>"
