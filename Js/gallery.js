/* ============================================================
   Kimi to Haru — gallery.js
   Category filtering + lightbox viewer
   ============================================================ */

(function () {
  "use strict";

  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const tabs = document.querySelectorAll(".gallery-tab");
  const items = grid.querySelectorAll(".gallery-item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.dataset.category;
      items.forEach((item) => {
        const show = cat === "all" || item.dataset.category === cat;
        item.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  if (lightbox && lightboxImg) {
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
      });
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.closest(".close-lb")) {
        lightbox.classList.remove("open");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }
})();
