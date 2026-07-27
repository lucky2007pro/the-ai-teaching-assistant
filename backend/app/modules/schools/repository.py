"""
School repository — database queries.
"""

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.schools.models import School


class SchoolRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, school_id: uuid.UUID) -> School | None:
        result = await self.db.execute(select(School).where(School.id == school_id))
        return result.scalar_one_or_none()

    async def get_by_slug(self, slug: str) -> School | None:
        result = await self.db.execute(select(School).where(School.slug == slug))
        return result.scalar_one_or_none()

    async def list_schools(self, page: int = 1, size: int = 20) -> tuple[list[School], int]:
        query = select(School).where(School.is_deleted == False)  # noqa: E712
        count_query = select(func.count()).select_from(query.subquery())
        total = (await self.db.execute(count_query)).scalar() or 0

        query = query.offset((page - 1) * size).limit(size).order_by(School.created_at.desc())
        result = await self.db.execute(query)
        return list(result.scalars().all()), total

    async def create(self, school: School) -> School:
        self.db.add(school)
        await self.db.flush()
        return school

    async def update(self, school: School, data: dict) -> School:
        for key, value in data.items():
            if value is not None:
                setattr(school, key, value)
        await self.db.flush()
        return school

    async def soft_delete(self, school: School) -> None:
        school.is_deleted = True
        await self.db.flush()
