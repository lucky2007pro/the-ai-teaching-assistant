# AI Teaching Assistant - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- Python 3.8+ ([download](https://www.python.org))

---

## Option 1: Automatic Start (Recommended)

### Windows
```bash
start-dev.bat
```

### Mac/Linux
```bash
bash start-dev.sh
```

This will automatically:
- ✓ Create virtual environment (if needed)
- ✓ Install dependencies
- ✓ Start backend on `http://localhost:8000`
- ✓ Start frontend on `http://localhost:3000`

Then open **http://localhost:3000** in your browser!

---

## Option 2: Manual Start

### Terminal 1 - Backend
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:3000**

---

## First Time Setup

### Step 1: Register an Account
- Go to http://localhost:3000
- Click "Sign up"
- Choose a role: **Student**, **Teacher**, or **Admin**
- Create account

### Step 2: Login
- Use your credentials to login
- You'll see your dashboard

### Step 3: Try Features
- **As Teacher**: Create a course → Add lessons → Add assignments
- **As Student**: Browse courses → Submit assignments → View grades
- **As Admin**: Manage everything

---

## Project Structure

```
the-ai-teaching-assistant/
├── backend/              # Python FastAPI Backend
│   ├── venv/            # Virtual environment (created automatically)
│   ├── main.py          # Entry point
│   ├── requirements.txt  # Python dependencies
│   └── README.md        # Backend documentation
│
├── frontend/            # Next.js Frontend (NEW)
│   ├── app/             # Pages and routes
│   │   ├── auth/        # Login & Register
│   │   ├── dashboard/   # Main dashboard
│   │   ├── courses/     # Courses
│   │   ├── students/    # Students
│   │   └── assignments/ # Assignments
│   ├── components/      # UI Components
│   ├── store/          # State Management
│   ├── lib/            # Utilities & API
│   ├── package.json    # Dependencies
│   └── README.md       # Frontend docs
│
├── FRONTEND_SETUP.md    # Detailed setup guide
├── QUICK_START.md       # This file
├── start-dev.sh        # Unix start script
└── start-dev.bat       # Windows start script
```

---

## Common Commands

### Frontend
```bash
cd frontend

npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check for errors
npm test         # Run tests
```

### Backend
```bash
cd backend
source venv/bin/activate  # Mac/Linux (or venv\Scripts\activate on Windows)

python -m uvicorn main:app --reload                          # Start server
python -m uvicorn main:app --reload --port 8001             # Different port
python -m pytest                                             # Run tests
```

---

## Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Web application |
| Backend API | http://localhost:8000 | API endpoints |
| API Docs | http://localhost:8000/docs | Swagger documentation |

---

## User Roles

### 👨‍🎓 Student
- View available courses
- Enroll in courses
- Submit assignments
- View grades and feedback
- Access learning materials

### 👨‍🏫 Teacher
- Create and manage courses
- Add lessons and materials
- Create assignments
- Grade student submissions
- Provide AI-powered feedback
- Generate lesson plans

### 👨‍💼 Admin
- Everything teachers can do
- Manage all users
- System administration
- Access analytics
- Manage all courses

---

## Troubleshooting

### Frontend won't load
```bash
# 1. Make sure backend is running at http://localhost:8000
# 2. Check .env.local has correct API URL
# 3. Clear cache and reinstall:
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

### Backend connection error
```bash
# Verify backend is running
curl http://localhost:8000/docs

# If not running, start it:
cd backend
python -m uvicorn main:app --reload --port 8000
```

### Port already in use
```bash
# Mac/Linux - Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows - Find and kill process
netstat -ano | findstr :3000
taskkill /PID {PID} /F
```

---

## Environment Variables

Located in `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000
```

Change the URL if your backend runs on a different port!

---

## API Endpoints

### Authentication
```
POST   /auth/login              # Login
POST   /auth/register           # Register
```

### Dashboard
```
GET    /dashboard/stats         # Dashboard statistics
```

### Courses
```
GET    /courses                 # List courses
POST   /courses                 # Create course
GET    /courses/{id}            # Get course
PUT    /courses/{id}            # Update course
DELETE /courses/{id}            # Delete course
```

### Students
```
GET    /students                # List students
GET    /students/{id}           # Get student
```

### Assignments
```
GET    /assignments             # List assignments
POST   /assignments/{id}/submit # Submit assignment
```

### AI Features
```
POST   /ai/feedback             # Get AI feedback
POST   /ai/generate-lesson      # Generate lesson
```

See `backend/README.md` for full API documentation.

---

## Features Checklist

### Dashboard
- [x] Role-based dashboard
- [x] Statistics cards
- [x] Quick actions
- [x] Recent activity

### Courses
- [x] List courses
- [x] Create courses
- [x] Edit courses
- [x] Delete courses
- [x] Course details
- [ ] Course enrollment

### Assignments
- [x] List assignments
- [x] Filter by status
- [x] Create assignments
- [x] Submit assignments
- [ ] Grade assignments

### Students
- [x] View all students
- [x] Student profiles
- [x] Search students
- [ ] Student analytics

### AI Features
- [ ] AI feedback generation
- [ ] Lesson plan generation
- [ ] Smart recommendations

---

## Debugging Tips

### Check Frontend Errors
1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for error messages
4. Check "Network" tab for API calls

### Check Backend Errors
1. Look at backend terminal window
2. Check for Python exceptions
3. Verify all dependencies installed

### Test API Manually
```bash
# Get dashboard stats
curl http://localhost:8000/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# List courses
curl http://localhost:8000/courses

# View API docs (browser)
http://localhost:8000/docs
```

---

## Next Steps

1. **Create test users**: Make a student, teacher, and admin account
2. **Create sample data**: Teacher creates a course with lessons
3. **Test workflows**: Student enrolls → submits assignment → teacher grades
4. **Explore AI features**: Generate lesson plans and feedback
5. **Check analytics**: View dashboard statistics

---

## Need Help?

- **Frontend Issues**: Check `frontend/README.md`
- **Backend Issues**: Check `backend/README.md`
- **Setup Issues**: See `FRONTEND_SETUP.md`
- **API Docs**: Visit `http://localhost:8000/docs`

---

## Production Deployment

### Deploy Frontend
```bash
# Option 1: Vercel (easiest)
cd frontend
npm install -g vercel
vercel

# Option 2: Build for self-hosting
npm run build
npm start
```

### Deploy Backend
Deploy to:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean
- Your own server

Update `NEXT_PUBLIC_API_URL` to point to production backend!

---

## Performance Tips

- Frontend rebuilds on file changes (Hot Module Replacement)
- Backend reloads on file changes (uvicorn `--reload`)
- Use browser DevTools to profile performance
- Check Network tab for slow API calls

---

## Support

- Read documentation in README.md files
- Check browser console for errors (F12)
- Review API documentation at http://localhost:8000/docs
- Check backend terminal for server errors

---

**Happy Teaching! 🎓✨**

Questions or issues? Check the detailed guides:
- `frontend/README.md` - Frontend documentation
- `backend/README.md` - Backend documentation  
- `FRONTEND_SETUP.md` - Detailed setup guide
