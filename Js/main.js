/* ============================================================
   Kimi to Haru — main.js
   Global site behaviour: loader, nav, theme, petals, reveal, cursor
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      setTimeout(() => loader.classList.add("hidden"), 500);
    }
  });

  /* ---------- Theme toggle ---------- */
  const THEME_KEY = "kth-theme";
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* storage unavailable */ }
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  })();
  document.addEventListener("click", (e) => {
    if (e.target.closest("#theme-toggle")) {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* ignore */ }
    }
  });

  /* ---------- Nav scroll + mobile toggle ---------- */
  const nav = document.getElementById("site-nav");
  const navLinks = document.getElementById("nav-links");
  const navToggle = document.getElementById("nav-toggle");

  function onScrollNav() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  document.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open") ? "true" : "false"
      );
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  // Highlight current page in nav
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = document.getElementById("cursor-glow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", (e) => { gx = e.clientX; gy = e.clientY; });
    function loop() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.left = cx + "px";
      glow.style.top = cy + "px";
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-scale");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    document.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 700) backToTop.classList.add("show");
        else backToTop.classList.remove("show");
      },
      { passive: true }
    );
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  /* ---------- Typing effect (hero tagline) ---------- */
  document.querySelectorAll("[data-typing]").forEach((el) => {
    const text = el.getAttribute("data-typing") || el.textContent.trim();
    el.textContent = "";
    el.classList.add("typing");
    let i = 0;
    function type() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 38);
      } else {
        el.classList.remove("typing");
      }
    }
    setTimeout(type, 600);
  });

  /* ---------- Falling cherry blossom petals ---------- */
  const canvas = document.getElementById("petals-canvas");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let w, h, petals;
    const density = window.innerWidth < 700 ? 22 : 42;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function makePetal() {
      return {
        x: Math.random() * w,
        y: Math.random() * -h,
        size: 6 + Math.random() * 10,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: Math.sin(Math.random() * Math.PI),
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        sway: Math.random() * 2 * Math.PI,
        hue: Math.random() > 0.5 ? "#F6C6D6" : "#F4D9E4",
        opacity: 0.55 + Math.random() * 0.4,
      };
    }
    function init() {
      resize();
      petals = Array.from({ length: density }, makePetal);
    }
    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.hue;
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size / 2, p.size / 2, 0, p.size / 2);
      ctx.bezierCurveTo(-p.size / 2, p.size / 2, -p.size / 2, -p.size / 2, 0, -p.size / 2);
      ctx.fill();
      ctx.restore();
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p) => {
        p.sway += 0.01;
        p.y += p.speedY;
        p.x += Math.sin(p.sway) * 0.6;
        p.rotation += p.rotSpeed;
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
        drawPetal(p);
      });
      requestAnimationFrame(tick);
    }
    init();
    tick();
    window.addEventListener("resize", () => {
      resize();
    });
  }

  /* ---------- Contact form (progressive, no backend) ---------- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("form-msg");
      if (msg) {
        msg.textContent = "Thank you — your message has drifted safely to Hoshikawa City. We'll reply soon. 🌸";
        msg.classList.add("show");
      }
      contactForm.reset();
    });
  }
})();
