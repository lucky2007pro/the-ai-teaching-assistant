import asyncio
import os
import sys

# Ensure backend dir is in sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv(".env")

from app.db.session import engine
from app.db.base import Base
# Import all models so Base knows about them
import app.modules.users.models
import app.modules.schools.models
import app.modules.groups.models

async def reset_db():
    print("Dropping all tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        
    print("Creating all tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    print("Done!")

if __name__ == "__main__":
    asyncio.run(reset_db())
