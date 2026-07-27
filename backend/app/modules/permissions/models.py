"""
Role definitions for RBAC (Role-Based Access Control).
"""

import enum


class Role(str, enum.Enum):
    """User roles in the system."""
    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"
