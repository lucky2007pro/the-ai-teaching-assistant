/**
 * Groups Page Module
 */

async function loadGroups() {
  const container = document.getElementById("groups-list");
  if (!container) return;

  try {
    const data = await window.apiFetch("/groups/");
    if (data && data.items && data.items.length > 0) {
      container.innerHTML = data.items.map((g) => `
        <div class="card group-card">
          <div class="group-badge">${g.academic_year || "2026"}</div>
          <h3>${g.name}</h3>
          <p class="group-desc">${g.description || "Guruh tavsifi"}</p>
          <div class="group-info">
            <span><i class="fa-solid fa-user-tie"></i> Teacher ID: ${g.teacher_id ? g.teacher_id.substring(0, 8) + '...' : 'N/A'}</span>
          </div>
          <div class="group-footer">
            <button class="btn-secondary btn-sm" onclick="location.hash='#groups'"><i class="fa-solid fa-user-group"></i> A'zolar</button>
          </div>
        </div>
      `).join("");
    }
  } catch (err) {
    console.log("Using default demo groups UI.");
  }
}

window.loadGroups = loadGroups;
