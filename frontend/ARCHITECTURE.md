# Frontend Architecture - AI Teaching Assistant

## Overview

The frontend is built with **Next.js 16** using the App Router and follows a component-based architecture with clear separation of concerns.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 | React framework with App Router |
| Language | TypeScript | Type safety and developer experience |
| Styling | Tailwind CSS | Utility-first CSS framework |
| State | Zustand | Client-side state management |
| HTTP | Axios | API communication |
| Data | SWR | Data fetching and caching |
| Icons | Lucide React | SVG icon library |

## Directory Structure

```
frontend/
├── app/                          # Next.js App Router pages
│   ├── auth/                    # Authentication routes
│   │   ├── login/
│   │   │   └── page.tsx        # Login page component
│   │   └── register/
│   │       └── page.tsx        # Register page component
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard page
│   ├── courses/
│   │   ├── page.tsx            # Courses list
│   │   └── create/
│   │       └── page.tsx        # Create course
│   ├── students/
│   │   └── page.tsx            # Students list
│   ├── assignments/
│   │   ├── page.tsx            # Assignments list
│   │   └── create/
│   │       └── page.tsx        # Create assignment
│   ├── layout.tsx              # Root layout wrapper
│   ├── page.tsx                # Home page (redirect logic)
│   └── globals.css             # Global styles
│
├── components/                  # Reusable components
│   ├── Navbar.tsx              # Navigation bar with role-based menu
│   └── ProtectedRoute.tsx       # Route protection wrapper
│
├── store/                       # Zustand state stores
│   └── authStore.ts            # Authentication state
│
├── lib/                         # Utilities and helpers
│   └── api.ts                  # Axios API client
│
├── public/                      # Static assets
│   ├── favicon.ico
│   └── ... (other assets)
│
├── .env.local                   # Environment variables
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

## Authentication Flow

```
User Access
    ↓
Home Page (page.tsx)
    ↓
Check isAuthenticated?
    ├─→ Yes → Redirect to /dashboard
    └─→ No → Redirect to /auth/login
        ↓
    Login Page
        ↓
    Submit Email & Password
        ↓
    API: POST /auth/login
        ↓
    Backend validates
        ├─→ Success → Receive User + JWT Token
        │   ↓
        │   Store in Zustand authStore
        │   ↓
        │   Redirect to /dashboard
        └─→ Fail → Show error message
```

## State Management (Zustand)

### Auth Store (`store/authStore.ts`)

```typescript
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user, token) => void
  logout: () => void
  updateUser: (user) => void
}
```

**Features:**
- Persists to localStorage automatically (middleware)
- Available globally via `useAuthStore()` hook
- Automatically clears on logout
- Restores on page reload

**Usage:**
```typescript
const { user, logout } = useAuthStore();
const token = useAuthStore((state) => state.token);
```

## API Client (`lib/api.ts`)

The `apiClient` is a singleton Axios instance with:

### Features
- **Base URL**: `http://localhost:8000`
- **Timeout**: 30 seconds
- **Auto Token Injection**: Adds JWT to every request
- **Error Handling**: Catches 401 errors and logs out user
- **Type Safety**: All methods typed with TypeScript

### Request Interceptor
```typescript
// Automatically adds Authorization header
headers.Authorization = `Bearer ${token}`
```

### Response Interceptor
```typescript
// On 401 Unauthorized: Auto logout
if (error.response?.status === 401) {
  useAuthStore.getState().logout()
}
```

### Available Methods

```typescript
// Auth
apiClient.login(email, password)
apiClient.register(email, password, name, role)

// Dashboard
apiClient.getDashboardStats()

// Courses
apiClient.getCourses()
apiClient.getCourseById(id)
apiClient.createCourse(data)
apiClient.updateCourse(id, data)
apiClient.deleteCourse(id)
apiClient.getLessons(courseId)
apiClient.createLesson(courseId, data)

// Students
apiClient.getStudents()
apiClient.getStudentById(id)

// Assignments
apiClient.getAssignments(courseId?)
apiClient.submitAssignment(assignmentId, data)

// AI
apiClient.getAIFeedback(content)
apiClient.generateLessonPlan(topic)
```

## Component Architecture

### Page Components
Located in `app/`, these are Server Components by default in Next.js 16:

- Use "use client" directive for client-side functionality
- Handle routing and page-specific logic
- Often wrap children with `<ProtectedRoute>`
- Use `<Navbar>` for consistent navigation

### Reusable Components

#### ProtectedRoute (`components/ProtectedRoute.tsx`)
```typescript
<ProtectedRoute allowedRoles={['teacher', 'admin']}>
  <YourComponent />
</ProtectedRoute>
```

**Features:**
- Checks authentication status
- Redirects to login if not authenticated
- Validates user role
- Prevents unauthorized access

#### Navbar (`components/Navbar.tsx`)
- Displays user info and role badge
- Shows role-specific menu items
- Logout button with redirect
- Mobile-responsive menu
- Uses `useAuthStore` for user data

## Data Fetching Pattern

Using **SWR** for automatic caching and revalidation:

```typescript
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await apiClient.getCourses()
  return response.data
}

function MyComponent() {
  const { data, isLoading, error, mutate } = useSWR('/courses', fetcher)
  
  // Revalidate data
  const handleRefresh = () => mutate()
}
```

**Benefits:**
- Automatic caching
- Background revalidation
- Retry on error
- Loading states
- Error handling
- Manual mutation triggers

## Styling Strategy

### Tailwind CSS
- Utility-first approach
- No custom CSS needed for most components
- Responsive classes: `md:`, `lg:`, `sm:`
- Dark mode support (ready to add)

### Example
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Click me
  </button>
</div>
```

### Color Palette
- Primary: Blue (`blue-600`, `blue-700`)
- Secondary: Slate (`slate-100`, `slate-600`, `slate-900`)
- Success: Green (`green-600`)
- Warning: Yellow (`yellow-600`)
- Danger: Red (`red-600`)

## Routing

### App Router Structure
```
/                      → Home (redirect)
/auth/login           → Login page
/auth/register        → Registration page
/dashboard            → Main dashboard (protected)
/courses              → List courses
/courses/create       → Create course (protected)
/courses/[id]         → Course details
/students             → List students (protected)
/assignments          → List assignments
/assignments/[id]     → Assignment details
```

### Dynamic Routes
```typescript
// In app/courses/[id]/page.tsx
function CoursePage({ params }: { params: { id: string } }) {
  const courseId = params.id
  // ...
}
```

## Environment Configuration

### `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000
```

**NEXT_PUBLIC_** variables:
- Exposed to browser (visible in client-side code)
- Available as `process.env.NEXT_PUBLIC_*`
- Only use for non-sensitive data

## Error Handling

### API Errors
```typescript
try {
  await apiClient.login(email, password)
} catch (error: any) {
  const message = error.response?.data?.message || 'Error'
  setError(message)
}
```

### 401 Unauthorized
- Automatically caught by response interceptor
- User logged out
- Redirected to login

### Network Errors
- User sees friendly error message
- Can retry operation
- Logged to console for debugging

## Performance Optimizations

### Built-in (Next.js)
- Code splitting per page
- Automatic image optimization
- Font optimization
- CSS purging

### Component Level
- Use SWR for smart caching
- Debounce search inputs
- Lazy load components if needed
- Memoize expensive computations

### Development
- Fast Refresh (HMR) for instant feedback
- Source maps for debugging
- Turbopack for faster builds

## Type Safety

### TypeScript Benefits
```typescript
// User type
interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'teacher' | 'student'
  avatar?: string
}

// Type-safe API calls
const response = await apiClient.login(email, password)
const user: User = response.data.user
```

## Security Considerations

### Frontend
- JWT stored in localStorage (consider HttpOnly cookies for production)
- Protected routes prevent unauthorized access
- Input validation before submission
- XSS prevention through React's built-in escaping

### Backend Integration
- CORS configured on backend
- Every API call includes Authorization header
- 401 responses trigger logout
- Sensitive operations require authentication

### Best Practices
- Never log sensitive data
- Validate all user input
- Use HTTPS in production
- Implement rate limiting on backend
- Regular security audits

## Development Workflow

### Adding a New Page
1. Create directory under `app/`
2. Add `page.tsx` component
3. Wrap with `<ProtectedRoute>` if needed
4. Import and use `<Navbar>`
5. Add navigation link to `<Navbar>`

### Adding a New Component
1. Create file in `components/`
2. Export as default
3. Use "use client" if needed
4. Import in pages that need it

### Adding API Endpoint
1. Add method to `lib/api.ts`
2. Type the request/response
3. Use in components via `apiClient` or `SWR`

### Adding State
1. Create store in `store/`
2. Export custom hook
3. Use in components via hook
4. Persist if needed (Zustand middleware)

## Testing Strategy

### Unit Tests
```typescript
// components/__tests__/Navbar.test.tsx
import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/Navbar'
```

### Integration Tests
- Test page flows (login → dashboard → courses)
- Mock API responses
- Test protected routes

### E2E Tests
- Use Playwright or Cypress
- Test full user journeys
- Test on multiple browsers

## Building for Production

```bash
# Build
npm run build

# Start production server
npm start

# Environment variables in production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

## Monitoring & Debugging

### Browser DevTools
- **Console**: JavaScript errors and logs
- **Network**: API requests and responses
- **Application**: localStorage inspection
- **Sources**: Breakpoint debugging

### Server Logs
- Terminal output during `npm run dev`
- API responses in Network tab
- Zustand DevTools for state

### Common Issues
1. CORS errors → Check backend CORS config
2. 404 API errors → Verify backend is running
3. Auth errors → Check localStorage and token
4. Blank page → Check console for errors

## Future Enhancements

- [ ] Real-time features (WebSocket)
- [ ] File uploads for assignments
- [ ] Video lesson integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Dark mode
- [ ] Internationalization (i18n)
- [ ] Progressive Web App (PWA)
- [ ] Offline support

---

**Happy Coding! 🚀**
