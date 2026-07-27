"""
User repository — database queries for the users table.
"""

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.users.models import User


class UserRepository:
    """Encapsulates all DB operations for users."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: uuid.UUID) -> User | None:
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> User | None:
        result = await self.db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def list_users(
        self,
        *,
        role: str | None = None,
        school_id: uuid.UUID | None = None,
        page: int = 1,
        size: int = 20,
    ) -> tuple[list[User], int]:
        """Return paginated user list with total count."""
        query = select(User).where(User.is_deleted == False)  # noqa: E712

        if role:
            query = query.where(User.role == role)
        if school_id:
            query = query.where(User.school_id == school_id)

        # Count
        count_query = select(func.count()).select_from(query.subquery())
        total = (await self.db.execute(count_query)).scalar() or 0

        # Paginate
        query = query.offset((page - 1) * size).limit(size).order_by(User.created_at.desc())
        result = await self.db.execute(query)
        users = list(result.scalars().all())

        return users, total

    async def create(self, user: User) -> User:
        self.db.add(user)
        await self.db.flush()
        return user

    async def update(self, user: User, data: dict) -> User:
        for key, value in data.items():
            if value is not None:
                setattr(user, key, value)
        await self.db.flush()
        return user

    async def soft_delete(self, user: User) -> None:
        user.is_deleted = True
        await self.db.flush()
