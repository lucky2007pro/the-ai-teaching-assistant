"""
Group repository — database queries.
"""

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.modules.groups.models import Group, GroupMember


class GroupRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, group_id: uuid.UUID) -> Group | None:
        result = await self.db.execute(
            select(Group)
            .where(Group.id == group_id)
            .options(selectinload(Group.members))
        )
        return result.scalar_one_or_none()

    async def list_groups(
        self,
        *,
        teacher_id: uuid.UUID | None = None,
        school_id: uuid.UUID | None = None,
        page: int = 1,
        size: int = 20,
    ) -> tuple[list[Group], int]:
        query = select(Group).where(Group.is_deleted == False)  # noqa: E712

        if teacher_id:
            query = query.where(Group.teacher_id == teacher_id)
        if school_id:
            query = query.where(Group.school_id == school_id)

        count_query = select(func.count()).select_from(query.subquery())
        total = (await self.db.execute(count_query)).scalar() or 0

        query = query.offset((page - 1) * size).limit(size).order_by(Group.created_at.desc())
        result = await self.db.execute(query)
        return list(result.scalars().all()), total

    async def create(self, group: Group) -> Group:
        self.db.add(group)
        await self.db.flush()
        return group

    async def update(self, group: Group, data: dict) -> Group:
        for key, value in data.items():
            if value is not None:
                setattr(group, key, value)
        await self.db.flush()
        return group

    async def soft_delete(self, group: Group) -> None:
        group.is_deleted = True
        await self.db.flush()

    async def add_member(self, group_id: uuid.UUID, user_id: uuid.UUID) -> GroupMember:
        member = GroupMember(group_id=group_id, user_id=user_id)
        self.db.add(member)
        await self.db.flush()
        return member

    async def get_member(self, group_id: uuid.UUID, user_id: uuid.UUID) -> GroupMember | None:
        result = await self.db.execute(
            select(GroupMember).where(
                GroupMember.group_id == group_id,
                GroupMember.user_id == user_id,
            )
        )
        return result.scalar_one_or_none()

    async def remove_member(self, member: GroupMember) -> None:
        await self.db.delete(member)
        await self.db.flush()

    async def list_members(self, group_id: uuid.UUID) -> list[GroupMember]:
        result = await self.db.execute(
            select(GroupMember).where(GroupMember.group_id == group_id)
        )
        return list(result.scalars().all())
