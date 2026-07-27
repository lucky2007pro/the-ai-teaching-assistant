"""
Database initialization and seeding.
"""
import logging
from sqlalchemy import select
from app.db.session import async_session_factory
from app.modules.users.models import User
from app.modules.schools.models import School  # noqa
from app.modules.groups.models import Group  # noqa
from app.core.security import hash_password


logger = logging.getLogger(__name__)

async def seed_default_user():
    """Seed default teacher user if it doesn't exist."""
    async with async_session_factory() as db:
        result = await db.execute(select(User).where(User.email == "teacher@mentor.uz"))
        user = result.scalar_one_or_none()
        
        if not user:
            logger.info("Creating default teacher user: teacher@mentor.uz")
            new_user = User(
                email="teacher@mentor.uz",
                hashed_password=hash_password("secret123"),
                full_name="O'qituvchi Jasur",
                role="teacher"
            )
            db.add(new_user)
            await db.commit()
        else:
            logger.info("Default teacher user already exists.")
