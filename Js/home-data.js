/* ============================================================
   Kimi to Haru — home-data.js
   Renders teaser cards on the homepage from shared data.js
   ============================================================ */

(function () {
  "use strict";

  const charGrid = document.getElementById("home-char-grid");
  if (charGrid && typeof KTH_CHARACTERS !== "undefined") {
    charGrid.innerHTML = KTH_CHARACTERS.slice(0, 4)
      .map(
        (c) => `
      <div class="char-card reveal">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
        <div class="overlay">
          <div class="role">${c.role}</div>
          <h3>${c.name}</h3>
          <p class="quote">${c.quote}</p>
        </div>
      </div>`
      )
      .join("");
  }

  const epGrid = document.getElementById("home-ep-grid");
  if (epGrid && typeof KTH_EPISODES !== "undefined") {
    epGrid.innerHTML = KTH_EPISODES.slice(0, 3)
      .map(
        (e) => `
      <div class="ep-card reveal">
        <div class="ep-thumb">
          <img src="${e.img}" alt="${e.title}" loading="lazy">
          <span class="ep-status ${e.status === "upcoming" ? "upcoming" : ""}">${e.status === "upcoming" ? "Upcoming" : "Released"}</span>
        </div>
        <div class="ep-body">
          <div class="ep-num">EP.${String(e.num).padStart(2, "0")}</div>
          <h3>${e.title}</h3>
          <p class="ep-tagline">${e.tagline}</p>
        </div>
      </div>`
      )
      .join("");
  }

  const newsList = document.getElementById("home-news-list");
  if (newsList && typeof KTH_NEWS !== "undefined") {
    newsList.innerHTML = KTH_NEWS.slice(0, 3)
      .map(
        (n) => `
      <div class="news-item reveal">
        <div class="news-date">${n.date}</div>
        <div>
          <span class="news-tag">${n.tag}</span>
          <h4 style="margin:4px 0 6px;">${n.title}</h4>
          <p style="margin:0;">${n.body}</p>
        </div>
      </div>`
      )
      .join("");
  }

  // Re-trigger reveal observer for dynamically injected nodes
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }
})();
