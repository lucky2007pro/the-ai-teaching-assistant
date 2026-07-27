# Frontend Setup Guide - AI Teaching Assistant

## Overview

The frontend is a **Next.js 16** application that communicates with your backend server running on a separate port. Follow these steps to set up and run both.

## File Structure

```
the-ai-teaching-assistant/
├── backend/                    # Python FastAPI backend
├── frontend/                   # Next.js frontend (new)
│   ├── app/                   # Next.js app directory
│   │   ├── auth/              # Login & Register pages
│   │   ├── dashboard/         # Main dashboard
│   │   ├── courses/           # Course management
│   │   ├── students/          # Student management
│   │   ├── assignments/       # Assignment pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home (redirects to login/dashboard)
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx         # Navigation
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── store/                 # Zustand state management
│   │   └── authStore.ts       # Auth store
│   ├── lib/                   # Utilities
│   │   └── api.ts             # API client
│   ├── .env.local             # Environment config
│   ├── package.json           # Dependencies
│   └── README.md              # Frontend docs
└── FRONTEND_SETUP.md          # This file
```

## Prerequisites

- **Node.js 18+** - Install from [nodejs.org](https://nodejs.org)
- **Python 3.8+** - For backend
- **npm or yarn** - Package manager

## Step 1: Backend Setup

### 1.1 Navigate to Backend
```bash
cd backend
```

### 1.2 Create Virtual Environment
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

### 1.3 Install Dependencies
```bash
pip install -r requirements.txt
```

### 1.4 Start Backend Server
```bash
# Option 1: Using run_local.bat (Windows)
python run_local.bat

# Option 2: Manual start
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will run at **http://localhost:8000**

> **Note**: Keep this terminal open. The backend must be running for the frontend to work.

## Step 2: Frontend Setup

### 2.1 Navigate to Frontend
Open a **new terminal** and navigate to:
```bash
cd frontend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Configure API URL (if needed)
Edit `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000
```

If your backend runs on a different port, change `8000` to your port number.

### 2.4 Start Frontend Development Server
```bash
npm run dev
```

The frontend will run at **http://localhost:3000**

## Step 3: Access the Application

1. Open your browser
2. Go to **http://localhost:3000**
3. You'll be redirected to the login page
4. Create an account or login with your credentials

## Available User Roles

When registering, you can choose one of three roles:

- **Student**: Access courses and submit assignments
- **Teacher**: Create courses, manage students, and grade assignments
- **Admin**: Full system access and administration

## Project Organization

### Frontend Directory Breakdown

**`app/` - Next.js Pages**
- `auth/login/` - Login page
- `auth/register/` - Registration page
- `dashboard/` - Main dashboard
- `courses/` - Course listing and management
- `courses/create/` - Create new course
- `students/` - Student management
- `assignments/` - Assignment listing and management

**`components/` - Reusable Components**
- `Navbar.tsx` - Navigation bar with role-based menu
- `ProtectedRoute.tsx` - Wrapper for protected pages

**`store/` - State Management**
- `authStore.ts` - Zustand store for authentication

**`lib/` - Utilities**
- `api.ts` - Axios API client with auth interceptors

## API Endpoints

The frontend connects to these backend endpoints:

**Authentication**
- `POST /auth/login` - Login
- `POST /auth/register` - Register new user

**Dashboard**
- `GET /dashboard/stats` - Get dashboard statistics

**Courses**
- `GET /courses` - List all courses
- `POST /courses` - Create course
- `GET /courses/{id}` - Get course details
- `PUT /courses/{id}` - Update course
- `DELETE /courses/{id}` - Delete course
- `GET /courses/{id}/lessons` - Get course lessons

**Students**
- `GET /students` - List all students
- `GET /students/{id}` - Get student details

**Assignments**
- `GET /assignments` - List assignments
- `POST /assignments/{id}/submit` - Submit assignment

**AI Features**
- `POST /ai/feedback` - Get AI feedback
- `POST /ai/generate-lesson` - Generate lesson plan

## Running Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run linting
npm run lint
```

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

The built app will be optimized and ready for deployment.

## Environment Variables Explained

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API base URL (visible in browser) |
| `NEXT_PUBLIC_API_TIMEOUT` | `30000` | Request timeout in milliseconds |

> **NEXT_PUBLIC_** prefix means these variables are exposed to the browser. Only public information should use this prefix.

## Troubleshooting

### Backend Connection Error
**Error**: `Failed to connect to backend` or `404 Not Found`

**Solution**:
1. Verify backend is running at `http://localhost:8000`
2. Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Ensure no firewall blocking the connection
4. Check backend terminal for error messages

### Login/Registration Fails
**Error**: `Registration failed` or `Login failed`

**Solution**:
1. Check browser console (F12 → Console tab)
2. Verify backend is accepting requests (check backend terminal)
3. Ensure credentials are correct
4. Clear localStorage: `localStorage.clear()` in console

### Port Already in Use
**Error**: `Port 3000 already in use` or `Port 8000 already in use`

**Solution**:
```bash
# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows (find PID then: taskkill /PID {PID} /F)

# Kill process on port 8000 (Backend)
lsof -ti:8000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :8000   # Windows
```

Or use different ports:
```bash
# Frontend on different port
npm run dev -- -p 3001

# Backend on different port (update NEXT_PUBLIC_API_URL accordingly)
python -m uvicorn main:app --reload --port 8001
```

### Blank Screen or 404
**Error**: Page shows nothing or 404 error

**Solution**:
1. Check browser console for errors
2. Ensure you're accessing `http://localhost:3000`
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Restart dev server: Stop with `Ctrl+C` and run `npm run dev` again

### CORS Errors
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Verify backend CORS settings allow `http://localhost:3000`
2. Check backend is running at correct URL
3. Restart backend with CORS enabled

## Development Workflow

### 1. Start Backend
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python -m uvicorn main:app --reload --port 8000
```

### 2. Start Frontend (new terminal)
```bash
cd frontend
npm run dev
```

### 3. Open Application
```
http://localhost:3000
```

### 4. Make Changes
- Edit frontend files in `frontend/app/` or `frontend/components/`
- Changes hot-reload automatically (Next.js Fast Refresh)
- Backend changes require restart

### 5. Debug Issues
- Frontend: Open DevTools (F12) → Console tab
- Backend: Check terminal output for error messages
- Network tab: Inspect API requests and responses

## Deployment

### Deploy Frontend to Vercel

```bash
# Login to Vercel
npm install -g vercel
vercel login

# Deploy
cd frontend
vercel
```

### Deploy Backend

Deploy your Python backend to:
- Heroku
- Railway
- Render
- AWS EC2
- Your own server

Update `NEXT_PUBLIC_API_URL` in production deployment to point to your backend URL.

## Features by Role

### Student
- View dashboard with courses
- Browse available courses
- Submit assignments
- View grades and feedback
- Access course materials

### Teacher
- Create and edit courses
- Manage course lessons
- View and grade student assignments
- Provide AI-powered feedback
- Monitor student progress
- Generate AI lesson plans

### Admin
- All teacher features
- Manage all users
- System statistics
- Manage all courses
- Generate reports

## Security Considerations

- JWT tokens stored in browser localStorage (production: use HttpOnly cookies)
- CORS configured on backend for frontend URL
- Protected routes prevent unauthorized access
- API client includes auth header for all requests
- Input validation on frontend (backend validates too)

## Next Steps

1. Create user accounts for testing
2. Create sample courses as a teacher
3. Enroll students in courses
4. Create and submit assignments
5. Test AI feedback features
6. Explore dashboard analytics

## Support & Documentation

- **Frontend README**: `frontend/README.md`
- **Backend README**: `backend/README.md`
- **Next.js Docs**: [nextjs.org](https://nextjs.org)
- **API Documentation**: Check `backend/README.md` for API details

## Quick Command Reference

```bash
# Frontend
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run linter
npm test           # Run tests

# Backend
python -m uvicorn main:app --reload  # Start development server
python -m pytest                      # Run tests
```

---

**All set!** Your AI Teaching Assistant is ready to use. 🎓✨
