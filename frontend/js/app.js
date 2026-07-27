/**
 * Mentor LMS + AI — Frontend SPA Router & API Integration
 */

const API_BASE = "http://localhost:8000";

// App State
const state = {
  token: localStorage.getItem("mentor_token") || null,
  user: JSON.parse(localStorage.getItem("mentor_user") || "null"),
  currentRoute: "dashboard",
};

// Route Configuration
const routes = {
  dashboard: { title: "Dashboard", subtitle: "Mentor LMS va AI tizimining umumiy statistikasi" },
  schools: { title: "Maktablar", subtitle: "Multi-tenant arxitekturasidagi maktablar ro'yxati (GET /schools/)" },
  groups: { title: "Guruhlar", subtitle: "O'qituvchilar tomonidan yaratilgan sinflar (GET /groups/)" },
  users: { title: "Foydalanuvchilar", subtitle: "Tizim foydalanuvchilarini boshqarish (GET /users/)" },
  courses: { title: "Kurslar va Fanlar", subtitle: "Guruhlarga biriktirilgan o'quv rejalari (GET /courses/)" },
  assignments: { title: "Vazifalar", subtitle: "O'qituvchilar yaratgan vazifalar shabloni (GET /assignments/)" },
  homeworks: { title: "Uy Vazifalari", subtitle: "O'quvchilar tomonidan topshirilgan javoblar (GET /homeworks/)" },
  videos: { title: "Video Darslar", subtitle: "Mavzular bo'yicha video darslar manbai (GET /videos/)" },
  ai: { title: "AI Baholash & Tahlil", subtitle: "Vision API avtomatik baholash va Concept Mastery (POST /ai/grade)" },
  notifications: { title: "Xabarnomalar", subtitle: "Push va Email bildirishnomalar servisi (GET /notifications/)" },
  payments: { title: "To'lovlar & Obuna", subtitle: "Platformadan foydalanish tariflari va obunalar (GET /payments/)" },
  crm: { title: "CRM & Lidlar", subtitle: "Marketing va yangi lidlar oqimi (GET /crm/)" },
  auth: { title: "Avtorizatsiya (JWT)", subtitle: "Login va Register operatsiyalari (POST /auth/login)" },
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initRouting();
  checkApiHealth();
  updateUserUI();
  setupAuthForms();
});

// ── Routing Engine ────────────────────────────────────────────────────────────

function initRouting() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace("#", "") || "dashboard";
  const route = routes[hash] ? hash : "dashboard";
  state.currentRoute = route;

  // Update Page Header
  document.getElementById("page-title").innerText = routes[route].title;
  document.getElementById("page-subtitle").innerText = routes[route].subtitle;

  // Activate Sidebar Nav
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.remove("active"));
  const activeNav = document.getElementById(`nav-${route}`);
  if (activeNav) activeNav.classList.add("active");

  // Activate View Panel
  document.querySelectorAll(".view-panel").forEach((el) => el.classList.remove("active"));
  const activePanel = document.getElementById(`view-${route}`);
  if (activePanel) activePanel.classList.add("active");

  // Load Data for Specific View
  loadViewData(route);
}

// ── API Communication ────────────────────────────────────────────────────────

async function checkApiHealth() {
  const badge = document.getElementById("backend-status");
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) {
      badge.className = "server-status-badge success";
      badge.innerHTML = `<span class="status-dot"></span><span>API Online: <code>:8000</code></span>`;
    } else {
      throw new Error();
    }
  } catch (err) {
    badge.className = "server-status-badge error";
    badge.innerHTML = `<span class="status-dot" style="background:#ef4444;"></span><span>API Offline (Mock Rejim)</span>`;
  }
}

async function apiFetch(endpoint, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (state.token) {
    headers["Authorization"] = `Bearer ${state.token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Xatolik yuz berdi");
    return data;
  } catch (err) {
    console.warn(`API [${endpoint}] xatosi:`, err.message);
    throw err;
  }
}

// ── View Data Loading ───────────────────────────────────────────────────────

async function loadViewData(route) {
  switch (route) {
    case "schools":
      loadSchools();
      break;
    case "groups":
      loadGroups();
      break;
    case "users":
      loadUsers();
      break;
  }
}

async function loadSchools() {
  const container = document.getElementById("schools-list");
  try {
    const data = await apiFetch("/schools/");
    if (data.items && data.items.length > 0) {
      container.innerHTML = data.items.map(s => `
        <div class="card school-card">
          <div class="school-header">
            <div class="school-logo"><i class="fa-solid fa-building-columns"></i></div>
            <div>
              <h3>${s.name}</h3>
              <span class="slug-tag">slug: ${s.slug}</span>
            </div>
          </div>
          <p class="school-address"><i class="fa-solid fa-location-dot"></i> ${s.address || 'Manzil ko\'rsatilmagan'}</p>
          <div class="school-meta">
            <span><i class="fa-solid fa-phone"></i> ${s.phone || 'Tel ko\'rsatilmagan'}</span>
            <span><i class="fa-solid fa-circle-check"></i> ${s.is_active ? 'Faol' : 'Nofaol'}</span>
          </div>
        </div>
      `).join("");
    }
  } catch (err) {
    // Keep default demo HTML cards if API is empty or offline
  }
}

async function loadGroups() {
  const container = document.getElementById("groups-list");
  try {
    const data = await apiFetch("/groups/");
    if (data.items && data.items.length > 0) {
      container.innerHTML = data.items.map(g => `
        <div class="card group-card">
          <div class="group-badge">${g.academic_year || '2026'}</div>
          <h3>${g.name}</h3>
          <p class="group-desc">${g.description || 'Guruh tavsifi'}</p>
          <div class="group-info">
            <span><i class="fa-solid fa-user-tie"></i> Teacher ID: ${g.teacher_id.substring(0,8)}...</span>
          </div>
          <div class="group-footer">
            <button class="btn-secondary btn-sm" onclick="location.hash='#groups'"><i class="fa-solid fa-user-group"></i> A'zolar</button>
          </div>
        </div>
      `).join("");
    }
  } catch (err) {
    // Keep demo HTML
  }
}

async function loadUsers() {
  const tbody = document.getElementById("users-table-body");
  try {
    const data = await apiFetch("/users/");
    if (data.items && data.items.length > 0) {
      tbody.innerHTML = data.items.map(u => `
        <tr>
          <td>
            <div class="table-user">
              <div class="avatar ${u.role}">${u.full_name[0]}</div>
              <div>
                <strong>${u.full_name}</strong>
                <small>ID: ${u.id.substring(0,8)}...</small>
              </div>
            </div>
          </td>
          <td>${u.email}</td>
          <td><span class="role-badge ${u.role}">${u.role.toUpperCase()}</span></td>
          <td><span class="status-tag ${u.is_active ? 'active' : 'pending'}">${u.is_active ? 'FAOL' : 'NOFAOL'}</span></td>
          <td>${new Date(u.created_at).toLocaleDateString()}</td>
          <td><button class="btn-icon"><i class="fa-solid fa-pen"></i></button></td>
        </tr>
      `).join("");
    }
  } catch (err) {
    // Keep default demo rows
  }
}

// ── Auth Handling ───────────────────────────────────────────────────────────

function setupAuthForms() {
  // Login
  document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      state.token = data.access_token;
      localStorage.setItem("mentor_token", data.access_token);
      
      // Fetch User Info
      const user = await apiFetch("/auth/me");
      state.user = user;
      localStorage.setItem("mentor_user", JSON.stringify(user));

      updateUserUI();
      alert("Tizimga muvaffaqiyatli kirdingiz! JWT token saqlandi.");
    } catch (err) {
      alert(`Login xatosi: ${err.message}`);
    }
  });

  // Register
  document.getElementById("form-register").addEventListener("submit", async (e) => {
    e.preventDefault();
    const full_name = document.getElementById("reg-fullname").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const role = document.getElementById("reg-role").value;

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, full_name, role }),
      });
      
      alert("Ro'yxatdan o'tish muvaffaqiyatli! Endi login qiling.");
      switchAuthTab("login");
    } catch (err) {
      alert(`Ro'yxatdan o'tish xatosi: ${err.message}`);
    }
  });

  // Quick Auth Button
  document.getElementById("btn-quick-auth").addEventListener("click", () => {
    window.location.hash = "#auth";
  });

  document.getElementById("btn-auth-action").addEventListener("click", () => {
    if (state.token) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("mentor_token");
      localStorage.removeItem("mentor_user");
      updateUserUI();
      alert("Tizimdan chiqdingiz.");
    } else {
      window.location.hash = "#auth";
    }
  });
}

function switchAuthTab(tab) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active-form"));

  if (tab === "login") {
    document.querySelectorAll(".tab-btn")[0].classList.add("active");
    document.getElementById("form-login").classList.add("active-form");
  } else {
    document.querySelectorAll(".tab-btn")[1].classList.add("active");
    document.getElementById("form-register").classList.add("active-form");
  }
}

function updateUserUI() {
  const tokenBox = document.getElementById("token-box");
  const nameEl = document.getElementById("sidebar-user-name");
  const roleEl = document.getElementById("sidebar-user-role");
  const avatarEl = document.getElementById("sidebar-user-avatar");

  if (state.token && state.user) {
    tokenBox.innerText = `Bearer ${state.token}`;
    nameEl.innerText = state.user.full_name;
    roleEl.innerText = `${state.user.role.toUpperCase()} (Online)`;
    avatarEl.innerText = state.user.full_name[0];
  } else {
    tokenBox.innerText = "Token olinmagan (Mehmon rejimi)";
    nameEl.innerText = "Mehmon Foydalanuvchi";
    roleEl.innerText = "Not Authenticated";
    avatarEl.innerText = "M";
  }
}

// ── AI Grading Demo Simulation ───────────────────────────────────────────────

function runAIGradingDemo() {
  window.location.hash = "#ai";
  const resultBox = document.getElementById("ai-result-box");
  const uploadZone = document.getElementById("upload-zone");

  uploadZone.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="font-size:36px;color:#ec4899;"></i><h4>Vision API Tahlil Qilmoqda...</h4><p>Daftar rasmidagi matematik simvollar o'qilmoqda</p>`;

  setTimeout(() => {
    uploadZone.classList.add("hidden");
    resultBox.classList.remove("hidden");
  }, 1200);
}
