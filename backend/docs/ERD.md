# ERD — Entity Relationship Diagram

Ma'lumotlar bazasi jadvallari va ular orasidagi bog'lanishlar.

## Diagramma

```mermaid
erDiagram
    schools {
        uuid id PK
        string name
        string slug UK
        text address
        string phone
        text logo_url
        bool is_active
        bool is_deleted
        datetime created_at
        datetime updated_at
    }

    users {
        uuid id PK
        string email UK
        text hashed_password
        string full_name
        string phone
        text avatar_url
        string role
        bool is_active
        bool is_deleted
        uuid school_id FK
        datetime created_at
        datetime updated_at
    }

    refresh_tokens {
        uuid id PK
        text token UK
        uuid user_id FK
        datetime expires_at
        datetime created_at
    }

    groups {
        uuid id PK
        string name
        string description
        string academic_year
        bool is_active
        bool is_deleted
        uuid school_id FK
        uuid teacher_id FK
        datetime created_at
        datetime updated_at
    }

    group_members {
        uuid id PK
        uuid group_id FK
        uuid user_id FK
        datetime joined_at
    }

    courses {
        uuid id PK
        string title
        text description
        string subject
        string grade_level
        bool is_active
        bool is_deleted
        uuid group_id FK
        uuid teacher_id FK
        datetime created_at
        datetime updated_at
    }

    assignments {
        uuid id PK
        string title
        text description
        text instructions
        int max_score
        datetime due_date
        bool is_active
        bool is_deleted
        uuid course_id FK
        uuid teacher_id FK
        datetime created_at
        datetime updated_at
    }

    homeworks {
        uuid id PK
        uuid assignment_id FK
        uuid student_id FK
        text file_url
        string file_type
        text text_answer
        string status
        int score
        text teacher_feedback
        text ai_feedback
        datetime created_at
        datetime updated_at
    }

    videos {
        uuid id PK
        string title
        text description
        text video_url
        text thumbnail_url
        int duration_seconds
        int order
        bool is_deleted
        uuid course_id FK
        uuid uploaded_by FK
        datetime created_at
        datetime updated_at
    }

    ai_grading_reports {
        uuid id PK
        uuid homework_id FK
        uuid student_id FK
        int score
        int max_score
        text feedback
        text errors_json
        text strengths_json
        text recommendations_json
        string model_used
        float confidence
        datetime created_at
        datetime updated_at
    }

    concept_mastery {
        uuid id PK
        uuid student_id FK
        uuid course_id FK
        string concept_name
        float mastery_level
        int attempts
        datetime created_at
        datetime updated_at
    }

    notifications {
        uuid id PK
        uuid user_id FK
        string title
        text message
        string type
        bool is_read
        datetime created_at
        datetime updated_at
    }

    schools ||--o{ users : "has"
    schools ||--o{ groups : "contains"
    users ||--o{ refresh_tokens : "owns"
    users ||--o{ groups : "teaches"
    users ||--o{ group_members : "belongs to"
    groups ||--o{ group_members : "has"
    groups ||--o{ courses : "contains"
    users ||--o{ courses : "teaches"
    courses ||--o{ assignments : "has"
    users ||--o{ assignments : "creates"
    assignments ||--o{ homeworks : "receives"
    users ||--o{ homeworks : "submits"
    homeworks ||--o{ ai_grading_reports : "graded by"
    users ||--o{ ai_grading_reports : "about"
    users ||--o{ concept_mastery : "tracked"
    courses ||--o{ concept_mastery : "for"
    courses ||--o{ videos : "contains"
    users ||--o{ videos : "uploads"
    users ||--o{ notifications : "receives"
```

## Jadvallar haqida qisqacha

| Jadval | Tavsif | Asosiy bog'lanish |
|---|---|---|
| `schools` | Maktab/tashkilot (multi-tenant) | → users, groups |
| `users` | Foydalanuvchilar (admin/teacher/student) | → school, groups, homeworks |
| `refresh_tokens` | JWT refresh tokenlar | → users |
| `groups` | Guruhlar/sinflar | → school, teacher, members |
| `group_members` | Guruh a'zolari (M:N) | → group, user |
| `courses` | Kurslar/fanlar | → group, teacher |
| `assignments` | Vazifalar/topshiriqlar | → course, teacher |
| `homeworks` | O'quvchi javoblari | → assignment, student |
| `videos` | Video darslar | → course, uploader |
| `ai_grading_reports` | AI baholash natijalari | → homework, student |
| `concept_mastery` | Tushuncha darajasi | → student, course |
| `notifications` | Xabarnomalar | → user |
