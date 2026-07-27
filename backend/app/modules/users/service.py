"""
User service — business logic layer.
"""

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundException
from app.modules.users.models import User
from app.modules.users.repository import UserRepository
from app.modules.users.schemas import UserUpdate, UserAdminUpdate


class UserService:
    """Business logic for user management."""

    def __init__(self, db: AsyncSession):
        self.repo = UserRepository(db)

    async def get_user(self, user_id: uuid.UUID) -> User:
        user = await self.repo.get_by_id(user_id)
        if not user:
            raise NotFoundException("Foydalanuvchi topilmadi")
        return user

    async def update_profile(self, user_id: uuid.UUID, data: UserUpdate) -> User:
        user = await self.get_user(user_id)
        return await self.repo.update(user, data.model_dump(exclude_unset=True))

    async def admin_update_user(self, user_id: uuid.UUID, data: UserAdminUpdate) -> User:
        user = await self.get_user(user_id)
        return await self.repo.update(user, data.model_dump(exclude_unset=True))

    async def list_users(
        self,
        role: str | None = None,
        school_id: uuid.UUID | None = None,
        page: int = 1,
        size: int = 20,
    ) -> tuple[list[User], int]:
        return await self.repo.list_users(role=role, school_id=school_id, page=page, size=size)

    async def suggest_username(self, full_name: str) -> dict:
        import re
        from sqlalchemy import select
        
        base_username = re.sub(r'[^a-z0-9_]', '', full_name.lower().replace(' ', '_'))
        if not base_username:
            base_username = "user"
            
        username = base_username
        counter = 1
        
        while True:
            # Check if exists
            result = await self.repo.session.execute(select(User.id).where(User.username == username))
            if not result.scalar_one_or_none():
                break
            username = f"{base_username}{counter}"
            counter += 1
            
        return {"username": username}
