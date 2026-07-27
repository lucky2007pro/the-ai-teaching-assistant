/**
 * AI Grading & Vision API Demo Module
 */

function runAIGradingDemo() {
  window.location.hash = "#ai";
  const resultBox = document.getElementById("ai-result-box");
  const uploadZone = document.getElementById("upload-zone");

  if (!uploadZone || !resultBox) return;

  uploadZone.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="font-size:36px;color:#ec4899;"></i><h4>Vision API Tahlil Qilmoqda...</h4><p>Daftar rasmidagi matematik simvollar o'qilmoqda</p>`;

  setTimeout(() => {
    uploadZone.classList.add("hidden");
    resultBox.classList.remove("hidden");
  }, 1200);
}

window.runAIGradingDemo = runAIGradingDemo;
