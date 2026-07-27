/**
 * Mentor LMS + AI — Central API Client
 */

const API_BASE = "http://localhost:8000";
const API_V1_BASE = "http://localhost:8000/api/v1";

/**
 * Health check endpoint for Backend API
 */
async function checkApiHealth() {
  const badge = document.getElementById("backend-status");
  if (!badge) return;
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) {
      badge.className = "server-status-badge success";
      badge.innerHTML = `<span class="status-dot"></span><span>API Online: <code>:8000/api/v1</code></span>`;
    } else {
      throw new Error();
    }
  } catch (err) {
    badge.className = "server-status-badge error";
    badge.innerHTML = `<span class="status-dot" style="background:#ef4444;"></span><span>API Offline (Mock Rejim)</span>`;
  }
}

/**
 * Universal JSON API Fetch Wrapper
 * @param {string} endpoint - e.g. "/auth/login" or "/schools/"
 * @param {object} options - Fetch options (method, body, headers)
 */
async function apiFetch(endpoint, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  
  // Attach token if available in auth state or localStorage
  const token = (window.authState && window.authState.token) || localStorage.getItem("mentor_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Support both /api/v1 prefix and root endpoint calls
  const url = endpoint.startsWith("/api/v1") ? `${API_BASE}${endpoint}` : `${API_V1_BASE}${endpoint}`;

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "API xatolik yuz berdi");
    return data;
  } catch (err) {
    console.warn(`API [${endpoint}] xatosi:`, err.message);
    throw err;
  }
}

window.apiFetch = apiFetch;
window.checkApiHealth = checkApiHealth;
