/* ============================================================
   Kimi to Haru — world.js
   Renders interactive location cards for the World page
   ============================================================ */

(function () {
  "use strict";

  const grid = document.getElementById("world-grid");
  if (!grid || typeof KTH_WORLD === "undefined") return;

  grid.innerHTML = KTH_WORLD.map(
    (loc) => `
    <div class="world-card reveal">
      <img src="${loc.img}" alt="${loc.name}" loading="lazy">
      <div class="tag">
        <h4>${loc.name}</h4>
        <p>${loc.desc}</p>
      </div>
    </div>`
  ).join("");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }
})();
