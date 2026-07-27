"""
Permission dependencies — role-based access control for routes.
"""

from typing import Callable

from fastapi import Depends, HTTPException, status

from app.modules.auth.dependencies import get_current_user
from app.modules.permissions.models import Role
from app.modules.users.models import User


def require_role(allowed_roles: list[Role]) -> Callable:
    """
    Dependency factory — restricts endpoint to specific roles.

    Usage:
        @router.get("/admin-only", dependencies=[Depends(require_role([Role.ADMIN]))])
    """

    async def _role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:
        if current_user.role not in [r.value for r in allowed_roles]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bu amalni bajarish uchun ruxsatingiz yo'q",
            )
        return current_user

    return _role_checker


# ── Shortcut Dependencies ────────────────────────────────────────────────────

require_admin = require_role([Role.ADMIN])
require_teacher = require_role([Role.ADMIN, Role.TEACHER])
require_student = require_role([Role.ADMIN, Role.TEACHER, Role.STUDENT])
