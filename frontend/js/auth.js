/**
 * Mentor LMS + AI — Authentication & Token Management Module
 */

window.authState = {
  token: localStorage.getItem("mentor_token") || null,
  user: JSON.parse(localStorage.getItem("mentor_user") || "null"),
};

function setupAuthForms() {
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");
  const btnQuickAuth = document.getElementById("btn-quick-auth");
  const btnAuthAction = document.getElementById("btn-auth-action");

  // Login Handler
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        const data = await window.apiFetch("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        window.authState.token = data.access_token;
        localStorage.setItem("mentor_token", data.access_token);

        // Fetch user profile
        const user = await window.apiFetch("/auth/me");
        window.authState.user = user;
        localStorage.setItem("mentor_user", JSON.stringify(user));

        updateUserUI();
        alert("Tizimga muvaffaqiyatli kirdingiz! JWT token saqlandi.");
      } catch (err) {
        alert(`Login xatosi: ${err.message}`);
      }
    });
  }

  // Register Handler
  if (formRegister) {
    formRegister.addEventListener("submit", async (e) => {
      e.preventDefault();
      const full_name = document.getElementById("reg-fullname").value;
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;
      const role = document.getElementById("reg-role").value;

      try {
        await window.apiFetch("/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, password, full_name, role }),
        });

        alert("Ro'yxatdan o'tish muvaffaqiyatli! Endi login qiling.");
        switchAuthTab("login");
      } catch (err) {
        alert(`Ro'yxatdan o'tish xatosi: ${err.message}`);
      }
    });
  }

  if (btnQuickAuth) {
    btnQuickAuth.addEventListener("click", () => {
      window.location.hash = "#auth";
    });
  }

  if (btnAuthAction) {
    btnAuthAction.addEventListener("click", () => {
      if (window.authState.token) {
        window.authState.token = null;
        window.authState.user = null;
        localStorage.removeItem("mentor_token");
        localStorage.removeItem("mentor_user");
        updateUserUI();
        alert("Tizimdan chiqdingiz.");
      } else {
        window.location.hash = "#auth";
      }
    });
  }
}

function switchAuthTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  document.querySelectorAll(".auth-form").forEach((f) => f.classList.remove("active-form"));

  if (tab === "login") {
    const loginTabBtn = document.querySelectorAll(".tab-btn")[0];
    const loginForm = document.getElementById("form-login");
    if (loginTabBtn) loginTabBtn.classList.add("active");
    if (loginForm) loginForm.classList.add("active-form");
  } else {
    const regTabBtn = document.querySelectorAll(".tab-btn")[1];
    const regForm = document.getElementById("form-register");
    if (regTabBtn) regTabBtn.classList.add("active");
    if (regForm) regForm.classList.add("active-form");
  }
}

function updateUserUI() {
  const tokenBox = document.getElementById("token-box");
  const nameEl = document.getElementById("sidebar-user-name");
  const roleEl = document.getElementById("sidebar-user-role");
  const avatarEl = document.getElementById("sidebar-user-avatar");

  const { token, user } = window.authState;

  if (token && user) {
    if (tokenBox) tokenBox.innerText = `Bearer ${token}`;
    if (nameEl) nameEl.innerText = user.full_name;
    if (roleEl) roleEl.innerText = `${user.role.toUpperCase()} (Online)`;
    if (avatarEl) avatarEl.innerText = user.full_name[0];
  } else {
    if (tokenBox) tokenBox.innerText = "Token olinmagan (Mehmon rejimi)";
    if (nameEl) nameEl.innerText = "Mehmon Foydalanuvchi";
    if (roleEl) roleEl.innerText = "Not Authenticated";
    if (avatarEl) avatarEl.innerText = "M";
  }
}

window.setupAuthForms = setupAuthForms;
window.switchAuthTab = switchAuthTab;
window.updateUserUI = updateUserUI;
