/* ============================================================
   Kimi to Haru — characters.js
   Renders the character grid and detail modal
   ============================================================ */

(function () {
  "use strict";

  const grid = document.getElementById("char-grid");
  if (!grid || typeof KTH_CHARACTERS === "undefined") return;

  grid.innerHTML = KTH_CHARACTERS.map(
    (c) => `
    <div class="char-card reveal" data-id="${c.id}" tabindex="0" role="button" aria-label="View ${c.name}'s profile">
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <div class="overlay">
        <div class="role">${c.role}</div>
        <h3>${c.name}</h3>
        <p class="quote">"${c.quote}"</p>
      </div>
    </div>`
  ).join("");

  const backdrop = document.getElementById("char-modal-backdrop");
  const closeBtn = document.getElementById("char-modal-close");

  function openModal(c) {
    document.getElementById("char-modal-img").src = c.img;
    document.getElementById("char-modal-img").alt = c.name;
    document.getElementById("char-modal-role").textContent = c.role;
    document.getElementById("char-modal-name").textContent = c.name;
    document.getElementById("char-modal-age").textContent = c.age + " years old";
    document.getElementById("char-modal-place").textContent = c.place;
    document.getElementById("char-modal-personality").textContent = c.personality;
    document.getElementById("char-modal-dream").textContent = c.dream;
    document.getElementById("char-modal-quote").textContent = `"${c.quote}"`;
    document.getElementById("char-modal-gallery").innerHTML = c.gallery
      .map((src) => `<img src="${src}" alt="${c.name} gallery image" loading="lazy">`)
      .join("");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".char-card");
    if (!card) return;
    const c = KTH_CHARACTERS.find((ch) => ch.id === card.dataset.id);
    if (c) openModal(c);
  });
  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".char-card");
      if (!card) return;
      e.preventDefault();
      const c = KTH_CHARACTERS.find((ch) => ch.id === card.dataset.id);
      if (c) openModal(c);
    }
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Reveal newly injected cards
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
