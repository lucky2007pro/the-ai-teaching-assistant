@echo off
echo ==============================================
echo Mentor LMS + AI (Local Run Without Docker)
echo ==============================================
echo.
echo Make sure PostgreSQL is running locally and credentials match .env
echo and Redis is running on localhost:6379 (if used).
echo.

cd backend
echo [1] Activating Virtual Environment...
if not exist ".venv" (
    echo Error: .venv not found. Run 'python -m venv .venv' and 'pip install -e ".[dev]"' first.
    pause
    exit /b
)
call .venv\Scripts\activate.bat

echo.
echo [2] Running Alembic Migrations...
alembic upgrade head

echo.
echo [3] Starting FastAPI Backend on Port 8000...
start cmd /k "uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo ==============================================
echo SUCCESS!
echo - API: http://127.0.0.1:8000/docs
echo ==============================================
pause
