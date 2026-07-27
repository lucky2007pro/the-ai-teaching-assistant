/**
 * Users Page Module
 */

async function loadUsers() {
  const tbody = document.getElementById("users-table-body");
  if (!tbody) return;

  try {
    const data = await window.apiFetch("/users/");
    if (data && data.items && data.items.length > 0) {
      tbody.innerHTML = data.items.map((u) => `
        <tr>
          <td>
            <div class="table-user">
              <div class="avatar ${u.role}">${u.full_name ? u.full_name[0] : 'U'}</div>
              <div>
                <strong>${u.full_name}</strong>
                <small>ID: ${u.id ? u.id.substring(0, 8) + '...' : 'N/A'}</small>
              </div>
            </div>
          </td>
          <td>${u.email}</td>
          <td><span class="role-badge ${u.role}">${u.role.toUpperCase()}</span></td>
          <td><span class="status-tag ${u.is_active ? "active" : "pending"}">${u.is_active ? "FAOL" : "NOFAOL"}</span></td>
          <td>${new Date(u.created_at).toLocaleDateString()}</td>
          <td><button class="btn-icon"><i class="fa-solid fa-pen"></i></button></td>
        </tr>
      `).join("");
    }
  } catch (err) {
    console.log("Using default demo users UI.");
  }
}

window.loadUsers = loadUsers;
