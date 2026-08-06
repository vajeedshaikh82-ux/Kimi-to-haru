/* ============================================================
   Kimi to Haru — news.js
   Renders the full news/announcements list
   ============================================================ */

(function () {
  "use strict";

  const list = document.getElementById("news-list");
  if (!list || typeof KTH_NEWS === "undefined") return;

  list.innerHTML = KTH_NEWS.map(
    (n) => `
    <div class="news-item reveal">
      <div class="news-date">${n.date}</div>
      <div>
        <span class="news-tag">${n.tag}</span>
        <h3 style="margin:6px 0 8px;font-size:1.15rem;">${n.title}</h3>
        <p style="margin:0;">${n.body}</p>
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
