@echo off
REM AI Teaching Assistant - Development Start Script (Windows)
REM This script starts both backend and frontend servers

cls
echo.
echo ========== AI Teaching Assistant - Development Start ==========
echo.

REM Check if backend exists
if not exist "backend" (
    echo ERROR: Backend directory not found!
    pause
    exit /b 1
)

REM Check if frontend exists
if not exist "frontend" (
    echo ERROR: Frontend directory not found!
    pause
    exit /b 1
)

REM Start backend
echo.
echo Starting Backend...
echo ==================
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -q -r requirements.txt 2>nul || pip install -r requirements.txt

REM Start backend in a new window
echo Starting Backend on http://localhost:8000
start cmd /k "python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

REM Wait a bit for backend to start
timeout /t 2 /nobreak

cd ..

REM Start frontend
echo.
echo Starting Frontend...
echo ===================
cd frontend

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Display info and start frontend
echo.
echo ===============================================================
echo        Both servers are starting!
echo ===============================================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo.
echo A terminal window should open for the backend.
echo Close both terminal windows to stop the servers.
echo.
pause

call npm run dev

pause
