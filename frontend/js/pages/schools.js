/**
 * Schools Page Module
 */

async function loadSchools() {
  const container = document.getElementById("schools-list");
  if (!container) return;

  try {
    const data = await window.apiFetch("/schools/");
    if (data && data.items && data.items.length > 0) {
      container.innerHTML = data.items.map((s) => `
        <div class="card school-card">
          <div class="school-header">
            <div class="school-logo"><i class="fa-solid fa-building-columns"></i></div>
            <div>
              <h3>${s.name}</h3>
              <span class="slug-tag">slug: ${s.slug}</span>
            </div>
          </div>
          <p class="school-address"><i class="fa-solid fa-location-dot"></i> ${s.address || "Manzil ko'rsatilmagan"}</p>
          <div class="school-meta">
            <span><i class="fa-solid fa-phone"></i> ${s.phone || "Tel ko'rsatilmagan"}</span>
            <span><i class="fa-solid fa-circle-check"></i> ${s.is_active ? "Faol" : "Nofaol"}</span>
          </div>
        </div>
      `).join("");
    }
  } catch (err) {
    console.log("Using default demo schools UI.");
  }
}

window.loadSchools = loadSchools;
