"""
Mentor LMS + AI — Database Connection & Async Session Entrypoint
Exposes SQLAlchemy Base, Engine, async_session_factory, and get_db dependency.
"""

import sys
from pathlib import Path

# Ensure backend directory is in sys.path
backend_path = Path(__file__).resolve().parent
if str(backend_path) not in sys.path:
    sys.path.insert(0, str(backend_path))

from app.db.base import Base
from app.db.mixins import SoftDeleteMixin, TimestampMixin
from app.db.session import async_session_factory, engine, get_db

__all__ = [
    "Base",
    "engine",
    "async_session_factory",
    "get_db",
    "TimestampMixin",
    "SoftDeleteMixin",
]
