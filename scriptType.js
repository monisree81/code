function setupHighlight() {
  const btn = document.getElementById("highlightBtn");
  if (!btn) return;

  if (!btn.dataset.listener) { // prevent multiple bindings
    btn.addEventListener("click", () => {
      const para = document.getElementById("textPara");
      if (para) {
        para.classList.toggle("highlight");
      }
    });
    btn.dataset.listener = "true";
  }
}

// Run immediately if DOM is already parsed
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupHighlight);
} else {
  setupHighlight();
}
