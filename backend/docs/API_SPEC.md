# API Specification

Barcha endpoint'lar ro'yxati modul bo'yicha guruhlangan.

**Base URL:** `http://localhost:8000`
**Auth:** Bearer JWT token (Header: `Authorization: Bearer <token>`)

---

## 🔐 Auth (`/auth`)

| Method | Path | Auth | Tavsif |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Yangi foydalanuvchi ro'yxatdan o'tkazish |
| `POST` | `/auth/login` | ❌ | Email + parol bilan kirish, JWT olish |
| `POST` | `/auth/refresh` | ❌ | Refresh token bilan yangi access token olish |
| `POST` | `/auth/logout` | ❌ | Refresh tokenni bekor qilish |
| `GET` | `/auth/me` | ✅ | Joriy foydalanuvchi ma'lumotlarini olish |

---

## 👤 Users (`/users`)

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `GET` | `/users/me` | ✅ | Any | O'z profilini ko'rish |
| `PATCH` | `/users/me` | ✅ | Any | O'z profilini tahrirlash |
| `GET` | `/users/` | ✅ | Admin | Barcha foydalanuvchilar ro'yxati (filtrlash) |
| `GET` | `/users/{id}` | ✅ | Admin | Foydalanuvchini ID bo'yicha ko'rish |
| `PATCH` | `/users/{id}` | ✅ | Admin | Foydalanuvchini tahrirlash |

---

## 🏫 Schools (`/schools`)

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/schools/` | ✅ | Admin | Yangi maktab yaratish |
| `GET` | `/schools/` | ❌ | Any | Barcha maktablar ro'yxati |
| `GET` | `/schools/{id}` | ❌ | Any | Maktabni ko'rish |
| `PATCH` | `/schools/{id}` | ✅ | Admin | Maktabni tahrirlash |
| `DELETE` | `/schools/{id}` | ✅ | Admin | Maktabni o'chirish (soft) |

---

## 👥 Groups (`/groups`)

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/groups/` | ✅ | Teacher+ | Yangi guruh yaratish |
| `GET` | `/groups/` | ❌ | Any | Guruhlar ro'yxati (filtrlash) |
| `GET` | `/groups/{id}` | ❌ | Any | Guruh tafsilotlari + a'zolar |
| `PATCH` | `/groups/{id}` | ✅ | Owner/Admin | Guruhni tahrirlash |
| `DELETE` | `/groups/{id}` | ✅ | Owner/Admin | Guruhni o'chirish (soft) |
| `POST` | `/groups/{id}/members` | ✅ | Owner/Admin | O'quvchi qo'shish |
| `DELETE` | `/groups/{id}/members/{uid}` | ✅ | Owner/Admin | O'quvchini olib tashlash |
| `GET` | `/groups/{id}/members` | ❌ | Any | Guruh a'zolari ro'yxati |

---

## 📚 Courses (`/courses`) — *Bosqich 3*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/courses/` | ✅ | Teacher+ | Yangi kurs yaratish |
| `GET` | `/courses/` | ❌ | Any | Kurslar ro'yxati |
| `GET` | `/courses/{id}` | ❌ | Any | Kurs tafsilotlari |
| `PATCH` | `/courses/{id}` | ✅ | Owner/Admin | Kursni tahrirlash |
| `DELETE` | `/courses/{id}` | ✅ | Owner/Admin | Kursni o'chirish |

---

## 📝 Assignments (`/assignments`) — *Bosqich 3*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/assignments/` | ✅ | Teacher+ | Yangi vazifa yaratish |
| `GET` | `/assignments/` | ✅ | Any | Vazifalar ro'yxati |
| `GET` | `/assignments/{id}` | ✅ | Any | Vazifa tafsilotlari |
| `PATCH` | `/assignments/{id}` | ✅ | Owner/Admin | Vazifani tahrirlash |
| `DELETE` | `/assignments/{id}` | ✅ | Owner/Admin | Vazifani o'chirish |

---

## 📄 Homeworks (`/homeworks`) — *Bosqich 4*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/homeworks/` | ✅ | Student | Javob yuborish (fayl/matn) |
| `GET` | `/homeworks/` | ✅ | Any | Javoblar ro'yxati (filtrlash) |
| `GET` | `/homeworks/{id}` | ✅ | Any | Javob tafsilotlari |
| `PATCH` | `/homeworks/{id}/grade` | ✅ | Teacher | Qo'lda baho qo'yish |

---

## 🎬 Videos (`/videos`) — *Bosqich 5*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/videos/` | ✅ | Teacher+ | Video yuklash |
| `GET` | `/videos/` | ❌ | Any | Videolar ro'yxati |
| `GET` | `/videos/{id}` | ❌ | Any | Video tafsilotlari |
| `DELETE` | `/videos/{id}` | ✅ | Owner/Admin | Videoni o'chirish |

---

## 🤖 AI (`/ai`) — *Bosqich 6*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/ai/grade` | ✅ | Teacher+ | Uy vazifasini AI bilan baholash |
| `GET` | `/ai/report/{homework_id}` | ✅ | Any | Baholash natijasi |
| `GET` | `/ai/analytics/{student_id}` | ✅ | Teacher+ | O'quvchi tahlili |
| `GET` | `/ai/mastery/{student_id}/{course_id}` | ✅ | Any | Tushuncha darajasi |

---

## 🔔 Notifications (`/notifications`) — *Bosqich 7*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `GET` | `/notifications/` | ✅ | Any | Xabarnomalar ro'yxati |
| `PATCH` | `/notifications/{id}/read` | ✅ | Owner | O'qildi deb belgilash |

---

## 💰 Payments (`/payments`) — *Bosqich 8*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `POST` | `/payments/subscribe` | ✅ | Any | Obuna qilish |
| `GET` | `/payments/status` | ✅ | Any | To'lov holati |

---

## 📊 CRM (`/crm`) — *Bosqich 8*

| Method | Path | Auth | Role | Tavsif |
|---|---|---|---|---|
| `GET` | `/crm/leads` | ✅ | Admin | Lidlar ro'yxati |
| `POST` | `/crm/leads` | ✅ | Admin | Yangi lid qo'shish |

---

## 🏥 System

| Method | Path | Auth | Tavsif |
|---|---|---|---|
| `GET` | `/health` | ❌ | Health check |
| `GET` | `/docs` | ❌ | Swagger UI |
| `GET` | `/redoc` | ❌ | ReDoc |
