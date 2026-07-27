"""
Mentor LMS — Pure REST API Backend Entrypoint
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.exceptions import register_exception_handlers


from app.db.init_db import seed_default_user

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Startup / shutdown events."""
    print(f"🚀 {settings.APP_NAME} is starting (env={settings.ENVIRONMENT}) ...")
    try:
        await seed_default_user()
    except Exception as e:
        print(f"⚠️ Error seeding default user: {e}")
    yield
    print(f"🛑 {settings.APP_NAME} is shutting down ...")


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="Mentor LMS + AI — Pure REST API Backend",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── Exception Handlers ────────────────────────────────────────────────────────
register_exception_handlers(app)

# ── CORS Middleware ───────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── API Routers (v1) ─────────────────────────────────────────────────────────
from app.modules.ai.router import router as ai_router  # noqa: E402
from app.modules.assignments.router import router as assignments_router  # noqa: E402
from app.modules.auth.router import router as auth_router  # noqa: E402
from app.modules.courses.router import router as courses_router  # noqa: E402
from app.modules.crm.router import router as crm_router  # noqa: E402
from app.modules.groups.router import router as groups_router  # noqa: E402
from app.modules.homeworks.router import router as homeworks_router  # noqa: E402
from app.modules.notifications.router import router as notifications_router  # noqa: E402
from app.modules.payments.router import router as payments_router  # noqa: E402
from app.modules.schools.router import router as schools_router  # noqa: E402
from app.modules.users.router import router as users_router  # noqa: E402
from app.modules.videos.router import router as videos_router  # noqa: E402

from fastapi import APIRouter  # noqa: E402

api_v1_router = APIRouter(prefix="/api/v1")
api_v1_router.include_router(auth_router)
api_v1_router.include_router(users_router)
api_v1_router.include_router(schools_router)
api_v1_router.include_router(groups_router)
api_v1_router.include_router(courses_router)
api_v1_router.include_router(assignments_router)
api_v1_router.include_router(homeworks_router)
api_v1_router.include_router(videos_router)
api_v1_router.include_router(ai_router)
api_v1_router.include_router(notifications_router)
api_v1_router.include_router(payments_router)
api_v1_router.include_router(crm_router)

app.include_router(api_v1_router)

# Also mount at root level for legacy/direct access compatibility
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(schools_router)
app.include_router(groups_router)
app.include_router(courses_router)
app.include_router(assignments_router)
app.include_router(homeworks_router)
app.include_router(videos_router)
app.include_router(ai_router)
app.include_router(notifications_router)
app.include_router(payments_router)
app.include_router(crm_router)



# ── System Endpoints ──────────────────────────────────────────────────────────
@app.get("/", tags=["system"])
async def root():
    """Pure API Root info."""
    return {
        "app": settings.APP_NAME,
        "version": "0.1.0",
        "status": "online",
        "docs": "/docs",
        "redoc": "/redoc",
        "health": "/health",
    }


@app.get("/health", tags=["system"])
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "app": settings.APP_NAME}
