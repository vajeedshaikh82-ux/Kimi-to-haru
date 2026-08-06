/* ============================================================
   Kimi to Haru — episodes.js
   Renders the full episode grid
   ============================================================ */

(function () {
  "use strict";

  const grid = document.getElementById("episodes-grid");
  if (!grid || typeof KTH_EPISODES === "undefined") return;

  grid.innerHTML = KTH_EPISODES.map(
    (e) => `
    <a href="episode.html?ep=${e.num}" class="ep-card reveal" style="display:flex;">
      <div class="ep-thumb">
        <img src="${e.img}" alt="${e.title}" loading="lazy">
        <span class="ep-status ${e.status === "upcoming" ? "upcoming" : ""}">${e.status === "upcoming" ? "Upcoming" : "Released"}</span>
      </div>
      <div class="ep-body">
        <div class="ep-num">EP.${String(e.num).padStart(2, "0")}</div>
        <h3>${e.title}</h3>
        <p class="ep-tagline">${e.tagline}</p>
        <p class="ep-summary">${e.summary}</p>
        <span class="ep-link">View Episode Page →</span>
      </div>
    </a>`
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
