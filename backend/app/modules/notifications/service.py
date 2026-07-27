from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.notifications.models import Notification

class NotificationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_group_notification(self, group_name: str, assignment_title: str, user_id: int):
        """
        Guruh uchun bitta umumiy bildirishnoma yaratadi (Masalan, vazifalar tekshirilgach).
        """
        title = "Guruh vazifalari tekshirildi"
        message = f"{group_name} guruhining '{assignment_title}' vazifasi to'liq tekshirib bo'lindi. Natijalarni ko'rishingiz mumkin."
        
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type="info"
        )
        self.db.add(notification)
        await self.db.flush()
        return notification

    async def create_personal_notification(self, user_id: int, title: str, message: str, notif_type: str = "info"):
        """
        Shaxsiy bildirishnoma yaratish.
        """
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=notif_type
        )
        self.db.add(notification)
        await self.db.flush()
        return notification
