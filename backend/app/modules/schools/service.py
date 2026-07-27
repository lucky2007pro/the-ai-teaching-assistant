"""
School service — business logic.
"""

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ConflictException, NotFoundException
from app.modules.schools.models import School
from app.modules.schools.repository import SchoolRepository
from app.modules.schools.schemas import SchoolCreate, SchoolUpdate


class SchoolService:
    def __init__(self, db: AsyncSession):
        self.repo = SchoolRepository(db)

    async def create_school(self, data: SchoolCreate) -> School:
        existing = await self.repo.get_by_slug(data.slug)
        if existing:
            raise ConflictException("Bu slug allaqachon band")
        school = School(**data.model_dump())
        return await self.repo.create(school)

    async def get_school(self, school_id: uuid.UUID) -> School:
        school = await self.repo.get_by_id(school_id)
        if not school:
            raise NotFoundException("Maktab topilmadi")
        return school

    async def update_school(self, school_id: uuid.UUID, data: SchoolUpdate) -> School:
        school = await self.get_school(school_id)
        return await self.repo.update(school, data.model_dump(exclude_unset=True))

    async def delete_school(self, school_id: uuid.UUID) -> None:
        school = await self.get_school(school_id)
        await self.repo.soft_delete(school)

    async def list_schools(self, page: int = 1, size: int = 20) -> tuple[list[School], int]:
        return await self.repo.list_schools(page=page, size=size)
