/**
 * Mentor LMS + AI — Lightweight SPA Router Entrypoint
 */

// Route Configuration
const routes = {
  dashboard: { title: "Dashboard", subtitle: "Mentor LMS va AI tizimining umumiy statistikasi" },
  schools: { title: "Maktablar", subtitle: "Multi-tenant arxitekturasidagi maktablar ro'yxati (GET /api/v1/schools/)" },
  groups: { title: "Guruhlar", subtitle: "O'qituvchilar tomonidan yaratilgan sinflar (GET /api/v1/groups/)" },
  users: { title: "Foydalanuvchilar", subtitle: "Tizim foydalanuvchilarini boshqarish (GET /api/v1/users/)" },
  courses: { title: "Kurslar va Fanlar", subtitle: "Guruhlarga biriktirilgan o'quv rejalari (GET /api/v1/courses/)" },
  assignments: { title: "Vazifalar", subtitle: "O'qituvchilar yaratgan vazifalar shabloni (GET /api/v1/assignments/)" },
  homeworks: { title: "Uy Vazifalari", subtitle: "O'quvchilar tomonidan topshirilgan javoblar (GET /api/v1/homeworks/)" },
  videos: { title: "Video Darslar", subtitle: "Mavzular bo'yicha video darslar manbai (GET /api/v1/videos/)" },
  ai: { title: "AI Baholash & Tahlil", subtitle: "Vision API avtomatik baholash va Concept Mastery (POST /api/v1/ai/grade)" },
  notifications: { title: "Xabarnomalar", subtitle: "Push va Email bildirishnomalar servisi (GET /api/v1/notifications/)" },
  payments: { title: "To'lovlar & Obuna", subtitle: "Platformadan foydalanish tariflari va obunalar (GET /api/v1/payments/)" },
  crm: { title: "CRM & Lidlar", subtitle: "Marketing va yangi lidlar oqimi (GET /api/v1/crm/)" },
  auth: { title: "Avtorizatsiya (JWT)", subtitle: "Login va Register operatsiyalari (POST /api/v1/auth/login)" },
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initRouting();
  if (typeof window.checkApiHealth === "function") window.checkApiHealth();
  if (typeof window.updateUserUI === "function") window.updateUserUI();
  if (typeof window.setupAuthForms === "function") window.setupAuthForms();
});

// ── Routing Engine ────────────────────────────────────────────────────────────

function initRouting() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace("#", "") || "dashboard";
  const route = routes[hash] ? hash : "dashboard";

  // Update Page Header
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");
  if (titleEl) titleEl.innerText = routes[route].title;
  if (subtitleEl) subtitleEl.innerText = routes[route].subtitle;

  // Activate Sidebar Nav
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.remove("active"));
  const activeNav = document.getElementById(`nav-${route}`);
  if (activeNav) activeNav.classList.add("active");

  // Activate View Panel
  document.querySelectorAll(".view-panel").forEach((el) => el.classList.remove("active"));
  const activePanel = document.getElementById(`view-${route}`);
  if (activePanel) activePanel.classList.add("active");

  // Delegate View Data Loading to Modular JS
  loadViewData(route);
}

function loadViewData(route) {
  switch (route) {
    case "schools":
      if (typeof window.loadSchools === "function") window.loadSchools();
      break;
    case "groups":
      if (typeof window.loadGroups === "function") window.loadGroups();
      break;
    case "users":
      if (typeof window.loadUsers === "function") window.loadUsers();
      break;
  }
}
