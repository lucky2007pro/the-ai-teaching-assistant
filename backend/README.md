# Mentor LMS + AI Backend

O'quv jarayonini boshqarish va sun'iy intellekt yordamida uy vazifalarini avtomatik tekshirish platformasi.

## Tech Stack

- **Framework:** FastAPI (Python 3.12)
- **Database:** PostgreSQL 16 (SQLAlchemy async + asyncpg)
- **Auth:** JWT (access + refresh tokens)
- **Migrations:** Alembic
- **Container:** Docker + Docker Compose

## Quick Start

### 1. Muhitni sozlash

```bash
cp .env.example .env
# .env faylini o'z sozlamalaringiz bilan to'ldiring
```

### 2. Virtual environment

```bash
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.venv\Scripts\activate      # Windows
pip install -e ".[dev]"
```

### 3. Docker bilan ishga tushirish

```bash
# PostgreSQL + Redis
docker compose up -d db redis

# Migratsiya
make migrate

# Server
make dev
```

### 4. API docs

Server ishga tushgandan keyin:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Loyiha tuzilmasi

```
app/
├── core/          # Config, security, exceptions
├── db/            # Database session, base, mixins
├── modules/       # Feature modules (auth, users, groups, ai, ...)
├── infra/         # Celery, Redis, background tasks
├── libs/          # Shared utilities
├── tests/         # Unit + integration tests
└── main.py        # FastAPI app entrypoint
```

## Modullar

| Modul | Tavsif |
|---|---|
| auth | Login, register, JWT tokens |
| users | Foydalanuvchi profillari (admin/teacher/student) |
| permissions | Rol asosidagi ruxsatlar (RBAC) |
| schools | Maktab/tashkilot (multi-tenant) |
| groups | Guruh/sinf yaratish va boshqarish |
| courses | Kurs/fan tuzilmasi |
| assignments | Vazifa (topshiriq) yaratish |
| homeworks | O'quvchi javoblari (submission) |
| videos | Video darslar |
| ai | AI baholash, tahlil, tavsiyalar |
| notifications | Push/email xabarnomalar |
| payments | To'lov/obuna |
| crm | Marketing/lidlar |
