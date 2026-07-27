"""
Alembic async env.py — reads DATABASE_URL from app settings.
"""

import asyncio
import os
import sys
from logging.config import fileConfig

# Ensure app package is in python path
sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), "..")))

from alembic import context
from sqlalchemy.ext.asyncio import create_async_engine

from app.core.config import settings
from app.db.base import Base

# Import all models so Alembic can detect them
from app.modules.users.models import User, RefreshToken  # noqa: F401
from app.modules.schools.models import School  # noqa: F401
from app.modules.groups.models import Group, GroupMember  # noqa: F401
from app.modules.courses.models import Course  # noqa: F401
from app.modules.assignments.models import Assignment  # noqa: F401
from app.modules.homeworks.models import Homework  # noqa: F401
from app.modules.videos.models import Video  # noqa: F401
from app.modules.notifications.models import Notification  # noqa: F401
# from app.modules.payments.models import Payment  # noqa: F401
# from app.modules.crm.models import Lead  # noqa: F401


config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = settings.DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run migrations in 'online' mode (async)."""
    connectable = create_async_engine(settings.DATABASE_URL)

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
