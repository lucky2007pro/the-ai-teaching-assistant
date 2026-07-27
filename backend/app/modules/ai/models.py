"""
AI-related database models — grading reports, concept mastery.
"""

import uuid

from sqlalchemy import Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.db.mixins import TimestampMixin


class AIGradingReport(Base, TimestampMixin):
    """Stores AI grading results for a homework submission."""

    __tablename__ = "ai_grading_reports"

    homework_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("homeworks.id", ondelete="CASCADE"),
        nullable=False,
    )
    student_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    # AI results
    score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    max_score: Mapped[int] = mapped_column(Integer, default=100, nullable=False)
    feedback: Mapped[str | None] = mapped_column(Text, nullable=True)
    errors_json: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON string of errors
    strengths_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    recommendations_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    model_used: Mapped[str | None] = mapped_column(String(50), nullable=True)
    confidence: Mapped[float | None] = mapped_column(Float, nullable=True)

    def __repr__(self) -> str:
        return f"<AIGradingReport homework={self.homework_id} score={self.score}>"


class ConceptMastery(Base, TimestampMixin):
    """Tracks a student's mastery level for specific concepts/topics."""

    __tablename__ = "concept_mastery"

    student_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
    )
    concept_name: Mapped[str] = mapped_column(String(255), nullable=False)
    mastery_level: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)  # 0.0 to 1.0
    attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    def __repr__(self) -> str:
        return f"<ConceptMastery {self.concept_name} level={self.mastery_level}>"
