/* ============================================================
   Kimi to Haru — manga.js
   Vertical webtoon reader. Loads panels from assets/images/manga/
   If an image file is missing, shows a "Panel Coming Soon" card.
   ============================================================ */

(function () {
  "use strict";

  const READER = document.getElementById("manga-reader");
  if (!READER) return;

  const IMG_PATH = "assets/images/manga/";

  // Structure: episode -> parts -> panel count
  // Filenames follow: epXX_partYY_panelZZ.png
  const STRUCTURE = [
    { ep: 1, parts: [{ part: 1, panels: 6 }, { part: 2, panels: 5 }] },
  ];

  function pad(n) { return String(n).padStart(2, "0"); }

  function panelFilename(ep, part, panel) {
    return `ep${pad(ep)}_part${pad(part)}_panel${pad(panel)}.png`;
  }

  function buildPlaceholder(filename) {
    const wrap = document.createElement("div");
    wrap.className = "panel-placeholder";
    wrap.innerHTML = `
      <div class="icon">🌸</div>
      <div class="fname">${filename}</div>
      <div class="msg">Panel Coming Soon</div>
    `;
    return wrap;
  }

  function loadPanel(filename) {
    const container = document.createElement("div");
    container.className = "manga-panel";
    container.dataset.filename = filename;

    const img = new Image();
    img.alt = filename;
    img.loading = "lazy";
    img.addEventListener("load", () => {
      container.innerHTML = "";
      container.appendChild(img);
    });
    img.addEventListener("error", () => {
      container.innerHTML = "";
      container.appendChild(buildPlaceholder(filename));
    });
    img.src = IMG_PATH + filename;

    // Show placeholder immediately while attempting to load
    container.appendChild(buildPlaceholder(filename));
    return container;
  }

  function render() {
    READER.innerHTML = "";
    STRUCTURE.forEach(({ ep, parts }) => {
      parts.forEach(({ part, panels }) => {
        const partEl = document.createElement("section");
        partEl.className = "manga-part";
        partEl.id = `ep${pad(ep)}-part${pad(part)}`;

        const title = document.createElement("div");
        title.className = "manga-part-title";
        title.innerHTML = `<span class="eyebrow">Episode ${pad(ep)} · Part ${pad(part)}</span>`;
        partEl.appendChild(title);

        for (let p = 1; p <= panels; p++) {
          partEl.appendChild(loadPanel(panelFilename(ep, part, p)));
        }
        READER.appendChild(partEl);
      });
    });
  }

  render();

  /* ---------- Progress bar ---------- */
  const progressBar = document.getElementById("manga-progress-bar");
  function updateProgress() {
    if (!progressBar) return;
    const rect = READER.getBoundingClientRect();
    const total = READER.scrollHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(window.scrollY - (READER.offsetTop - window.innerHeight), 0), total);
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    progressBar.style.width = Math.min(Math.max(pct, 0), 100) + "%";
  }
  document.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- Zoom ---------- */
  const zoomBtn = document.getElementById("manga-zoom");
  let zoomed = false;
  if (zoomBtn) {
    zoomBtn.addEventListener("click", () => {
      zoomed = !zoomed;
      READER.style.maxWidth = zoomed ? "1000px" : "640px";
      READER.style.margin = "0 auto";
      zoomBtn.textContent = zoomed ? "🔍 Zoom Out" : "🔍 Zoom In";
    });
  }
  READER.style.maxWidth = "640px";
  READER.style.margin = "0 auto";

  /* ---------- Fullscreen ---------- */
  const fsBtn = document.getElementById("manga-fullscreen");
  if (fsBtn) {
    fsBtn.addEventListener("click", () => {
      document.body.classList.toggle("manga-fullscreen");
      fsBtn.textContent = document.body.classList.contains("manga-fullscreen")
        ? "✕ Exit Fullscreen"
        : "⛶ Fullscreen";
    });
  }

  /* ---------- Bookmark ---------- */
  const bookmarkBtn = document.getElementById("manga-bookmark");
  const BOOKMARK_KEY = "kth-manga-bookmark";
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", () => {
      try {
        localStorage.setItem(BOOKMARK_KEY, String(window.scrollY));
        bookmarkBtn.textContent = "✅ Bookmarked";
        setTimeout(() => (bookmarkBtn.textContent = "🔖 Bookmark"), 1800);
      } catch (e) { /* storage unavailable */ }
    });
  }
  const resumeBtn = document.getElementById("manga-resume");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      try {
        const pos = localStorage.getItem(BOOKMARK_KEY);
        if (pos) window.scrollTo({ top: parseInt(pos, 10), behavior: "smooth" });
      } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Prev / Next (episode navigation placeholder) ---------- */
  const prevBtn = document.getElementById("manga-prev");
  const nextBtn = document.getElementById("manga-next");
  if (prevBtn) prevBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  if (nextBtn) nextBtn.addEventListener("click", () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  );
})();
