# AI Teaching Assistant - Frontend

A modern Next.js frontend for the AI Teaching Assistant LMS (Learning Management System).

## Features

- **Multi-Role Support**: Admin, Teacher, and Student roles with different dashboards
- **Course Management**: Create, edit, and manage courses (Teachers/Admins)
- **Student Management**: View and track student progress (Teachers/Admins)
- **Assignment Management**: Create, submit, and grade assignments
- **AI Integration Ready**: Backend hooks for AI feedback and lesson generation
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **State Management**: Zustand for authentication and app state
- **API Integration**: Axios with interceptors for seamless backend communication

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Data Fetching**: SWR
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and npm/yarn installed
- Backend server running at `http://localhost:8000`

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   The `.env.local` file is already configured with:
   - `NEXT_PUBLIC_API_URL=http://localhost:8000`
   - `NEXT_PUBLIC_API_TIMEOUT=30000`

   If your backend runs on a different port, update `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:YOUR_PORT
   ```

## Running the Frontend

### Development Mode

```bash
npm run dev
```

The frontend will start at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages (login, register)
│   ├── dashboard/         # Dashboard pages
│   ├── courses/           # Course management
│   ├── students/          # Student management
│   ├── assignments/       # Assignment management
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (redirects to login/dashboard)
│
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation bar
│   └── ProtectedRoute.tsx # Route protection wrapper
│
├── store/                 # Zustand stores
│   └── authStore.ts       # Authentication state management
│
├── lib/                   # Utilities
│   └── api.ts            # API client with interceptors
│
├── .env.local            # Environment variables
└── package.json          # Dependencies
```

## Key Components & Pages

### Authentication
- **Login** (`/auth/login`): User login with email and password
- **Register** (`/auth/register`): New user registration with role selection

### Dashboard
- **Dashboard** (`/dashboard`): Main dashboard with role-specific content
- Stats cards, quick actions, and recent activity

### Courses
- **Courses List** (`/courses`): View all courses
- **Create Course** (`/courses/create`): Create new course (Teachers/Admins only)
- **Course Detail** (`/courses/[id]`): View course details and lessons

### Students
- **Students** (`/students`): View and search all students (Teachers/Admins only)
- Student profiles with stats and progress

### Assignments
- **Assignments** (`/assignments`): View assignments with filtering
- **Create Assignment** (`/assignments/create`): Create new assignment (Teachers/Admins)
- **Assignment Detail** (`/assignments/[id]`): Submit or grade assignment

## API Integration

The frontend communicates with the backend through the `apiClient` in `/lib/api.ts`. Key endpoints include:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /dashboard/stats` - Dashboard statistics
- `GET /courses` - List all courses
- `POST /courses` - Create new course
- `GET /students` - List all students
- `GET /assignments` - List assignments
- `POST /ai/feedback` - Get AI feedback
- `POST /ai/generate-lesson` - Generate lesson plan

## Authentication Flow

1. User accesses the app
2. If not authenticated, redirected to login page
3. User enters credentials
4. Backend validates and returns user data + JWT token
5. Token stored in Zustand auth store (persisted to localStorage)
6. Subsequent API calls include token in Authorization header
7. Protected routes check authentication status and user role

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API URL |
| `NEXT_PUBLIC_API_TIMEOUT` | `30000` | API request timeout (ms) |

## Running Backend and Frontend Together

### Terminal 1 (Backend):
```bash
cd backend
# Follow backend setup instructions from backend/README.md
python run_local.bat  # or python -m uvicorn main:app --reload
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Common Issues

### Backend Connection Error
- Ensure backend is running at `http://localhost:8000`
- Check CORS configuration on backend
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### Authentication Issues
- Clear browser localStorage: `localStorage.clear()`
- Check browser console for detailed error messages
- Verify token is properly stored in auth store

### Development Server Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## Development Tips

1. **Debugging**: Check browser DevTools console and Network tab
2. **State Debugging**: Install Redux DevTools for Zustand
3. **API Testing**: Use the Network tab to inspect API calls
4. **Component Reloading**: Next.js Fast Refresh handles component updates

## Security Considerations

- JWT tokens stored in localStorage (consider moving to HttpOnly cookies for production)
- CORS configuration required on backend
- Input validation on frontend (backend should validate too)
- Protected routes prevent unauthorized access
- Role-based access control for sensitive features

## License

MIT
