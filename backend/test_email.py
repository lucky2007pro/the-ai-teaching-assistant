import os
import sys

# Ensure backend dir is in sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv(".env")

from app.modules.services.email_service import send_email_sync

def test():
    print("Testing SMTP email sending...")
    success = send_email_sync("azizillonabiyev52@gmail.com", "Test Code: 123456", "<h1>Your code is 123456</h1>")
    print("Email send success:", success)

if __name__ == "__main__":
    test()
