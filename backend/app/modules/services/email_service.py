import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

def send_email_sync(to_email: str, subject: str, html_content: str):
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.warning(f"SMTP is not configured. Skipping email to {to_email}")
        return False
        
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.FROM_EMAIL
    msg["To"] = to_email

    part1 = MIMEText(html_content, "html")
    msg.attach(part1)

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.FROM_EMAIL, to_email, msg.as_string())
        logger.info(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return False

async def send_verification_email(to_email: str, code: str):
    subject = "Mentor LMS - Tasdiqlash Kodi"
    html_content = f"""
    <html>
      <body>
        <h2>Assalomu alaykum!</h2>
        <p>Mentor LMS tizimida harakatingizni tasdiqlash uchun quyidagi 6 xonali koddan foydalaning:</p>
        <div style="padding: 15px; margin: 20px 0; background-color: #f4f4f4; border-radius: 8px; text-align: center;">
            <h1 style="color: #2c3e50; letter-spacing: 5px; margin: 0;">{code}</h1>
        </div>
        <p>Kodning amal qilish muddati 10 daqiqa.</p>
        <p>Ushbu kodni hech kimga bermang!</p>
      </body>
    </html>
    """
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, send_email_sync, to_email, subject, html_content)
