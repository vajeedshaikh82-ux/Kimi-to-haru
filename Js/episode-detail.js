/* ============================================================
   Kimi to Haru — episode-detail.js
   Populates the single-episode page based on the ?ep= query param
   ============================================================ */

(function () {
  "use strict";

  if (typeof KTH_EPISODES === "undefined") return;

  const params = new URLSearchParams(location.search);
  let epNum = parseInt(params.get("ep"), 10);
  if (!epNum || !KTH_EPISODES.some((e) => e.num === epNum)) epNum = 1;

  const ep = KTH_EPISODES.find((e) => e.num === epNum);
  if (!ep) return;

  document.title = `${ep.title} · Kimi to Haru`;
  document.getElementById("ep-num-label").textContent = `Episode ${String(ep.num).padStart(2, "0")}`;
  document.getElementById("ep-title-label").textContent = ep.title;
  document.getElementById("ep-tagline-label").textContent = ep.tagline;
  document.getElementById("ep-image").src = ep.img;
  document.getElementById("ep-image").alt = ep.title;
  document.getElementById("ep-summary-label").textContent = ep.summary;
  document.getElementById("ep-status-label").textContent =
    ep.status === "upcoming" ? "Upcoming — not yet released" : "Released";

  const prev = KTH_EPISODES.find((e) => e.num === epNum - 1);
  const next = KTH_EPISODES.find((e) => e.num === epNum + 1);
  const prevBtn = document.getElementById("ep-prev");
  const nextBtn = document.getElementById("ep-next");

  if (prev) prevBtn.href = `episode.html?ep=${prev.num}`;
  else { prevBtn.style.opacity = ".4"; prevBtn.style.pointerEvents = "none"; }

  if (next) nextBtn.href = `episode.html?ep=${next.num}`;
  else { nextBtn.style.opacity = ".4"; nextBtn.style.pointerEvents = "none"; }
})();
