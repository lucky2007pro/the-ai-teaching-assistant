"""
Group service — business logic.
"""

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ConflictException, ForbiddenException, NotFoundException
from app.modules.groups.models import Group, GroupMember
from app.modules.groups.repository import GroupRepository
from app.modules.groups.schemas import GroupCreate, GroupUpdate
from app.modules.users.models import User


class GroupService:
    def __init__(self, db: AsyncSession):
        self.repo = GroupRepository(db)

    async def create_group(self, data: GroupCreate, teacher: User) -> Group:
        """Create a group — the teacher becomes the group owner."""
        group = Group(
            name=data.name,
            description=data.description,
            academic_year=data.academic_year,
            school_id=data.school_id or teacher.school_id,
            teacher_id=teacher.id,
        )
        return await self.repo.create(group)

    async def get_group(self, group_id: uuid.UUID) -> Group:
        group = await self.repo.get_by_id(group_id)
        if not group:
            raise NotFoundException("Guruh topilmadi")
        return group

    async def update_group(
        self, group_id: uuid.UUID, data: GroupUpdate, current_user: User
    ) -> Group:
        group = await self.get_group(group_id)
        if group.teacher_id != current_user.id and current_user.role != "admin":
            raise ForbiddenException("Faqat guruh egasi yoki admin o'zgartira oladi")
        return await self.repo.update(group, data.model_dump(exclude_unset=True))

    async def delete_group(self, group_id: uuid.UUID, current_user: User) -> None:
        group = await self.get_group(group_id)
        if group.teacher_id != current_user.id and current_user.role != "admin":
            raise ForbiddenException("Faqat guruh egasi yoki admin o'chira oladi")
        await self.repo.soft_delete(group)

    async def list_groups(
        self,
        teacher_id: uuid.UUID | None = None,
        school_id: uuid.UUID | None = None,
        page: int = 1,
        size: int = 20,
    ) -> tuple[list[Group], int]:
        return await self.repo.list_groups(
            teacher_id=teacher_id, school_id=school_id, page=page, size=size
        )

    # ── Members ───────────────────────────────────────────────────────────────

    async def add_member(
        self, group_id: uuid.UUID, user_id: uuid.UUID, current_user: User
    ) -> GroupMember:
        group = await self.get_group(group_id)
        if group.teacher_id != current_user.id and current_user.role != "admin":
            raise ForbiddenException("Faqat guruh egasi yoki admin a'zo qo'sha oladi")

        existing = await self.repo.get_member(group_id, user_id)
        if existing:
            raise ConflictException("Bu foydalanuvchi allaqachon guruhda")

        return await self.repo.add_member(group_id, user_id)

    async def create_and_add_student(
        self, group_id: uuid.UUID, data: "StudentCreate", current_user: User
    ) -> GroupMember:
        group = await self.get_group(group_id)
        if group.teacher_id != current_user.id and current_user.role != "admin":
            raise ForbiddenException("Faqat guruh egasi yoki admin o'quvchi qo'sha oladi")
            
        from sqlalchemy import select
        from app.core.security import hash_password
        
        # Check uniqueness of username
        existing_username = await self.repo.db.execute(select(User.id).where(User.username == data.username))
        if existing_username.scalar_one_or_none():
            raise ConflictException("Bu username allaqachon band")
            
        # Create user
        new_student = User(
            username=data.username,
            full_name=data.full_name,
            hashed_password=hash_password(data.password),
            role="student",
            phone=data.phone,
            is_active=True,
            school_id=group.school_id
        )
        self.repo.db.add(new_student)
        await self.repo.db.flush()
        
        # Add member to group
        return await self.repo.add_member(group_id, new_student.id)

    async def remove_member(
        self, group_id: uuid.UUID, user_id: uuid.UUID, current_user: User
    ) -> None:
        group = await self.get_group(group_id)
        if group.teacher_id != current_user.id and current_user.role != "admin":
            raise ForbiddenException("Faqat guruh egasi yoki admin a'zoni olib tashlashi mumkin")

        member = await self.repo.get_member(group_id, user_id)
        if not member:
            raise NotFoundException("Bu foydalanuvchi guruhda emas")

        await self.repo.remove_member(member)

    async def list_members(self, group_id: uuid.UUID) -> list[GroupMember]:
        await self.get_group(group_id)  # validate group exists
        return await self.repo.list_members(group_id)
