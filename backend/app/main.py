"""
Mentor LMS — FastAPI Application Entrypoint
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.exceptions import register_exception_handlers

# ── Exception Handlers ────────────────────────────────────────────────────────



@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Startup / shutdown events."""
    # --- startup ---
    print(f"🚀 {settings.APP_NAME} is starting (env={settings.ENVIRONMENT}) ...")
    yield
    # --- shutdown ---
    print(f"🛑 {settings.APP_NAME} is shutting down ...")


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="Mentor LMS + AI — O'quv platformasi backend API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

register_exception_handlers(app)


# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
from app.modules.auth.router import router as auth_router  # noqa: E402
from app.modules.users.router import router as users_router  # noqa: E402
from app.modules.schools.router import router as schools_router  # noqa: E402
from app.modules.groups.router import router as groups_router  # noqa: E402
from app.modules.courses.router import router as courses_router  # noqa: E402
from app.modules.assignments.router import router as assignments_router  # noqa: E402
from app.modules.homeworks.router import router as homeworks_router  # noqa: E402
from app.modules.videos.router import router as videos_router  # noqa: E402
from app.modules.ai.router import router as ai_router  # noqa: E402
from app.modules.notifications.router import router as notifications_router  # noqa: E402
from app.modules.payments.router import router as payments_router  # noqa: E402
from app.modules.crm.router import router as crm_router  # noqa: E402

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


# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/health", tags=["system"])
async def health_check():
    return {"status": "ok", "app": settings.APP_NAME}


# ── Clean URL Frontend Page Handlers ──────────────────────────────────────────
import os
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

frontend_dir = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend"))

if os.path.exists(frontend_dir):
    page_routes = [
        ("/", "index.html"),
        ("/auth", "auth.html"),
        ("/schools", "schools.html"),
        ("/groups", "groups.html"),
        ("/users", "users.html"),
        ("/courses", "courses.html"),
        ("/assignments", "assignments.html"),
        ("/homeworks", "homeworks.html"),
        ("/videos", "videos.html"),
        ("/ai", "ai.html"),
        ("/notifications", "notifications.html"),
        ("/payments", "payments.html"),
        ("/crm", "crm.html"),
    ]

    def create_page_handler(filename: str):
        async def page_handler():
            return FileResponse(os.path.join(frontend_dir, filename))
        return page_handler

    for path, filename in page_routes:
        app.add_api_route(path, create_page_handler(filename), methods=["GET"], include_in_schema=False)

    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")




