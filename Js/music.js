/* ============================================================
   Kimi to Haru — music.js
   Lightweight audio player UI with animated visualizer bars.
   Gracefully handles missing audio source files.
   ============================================================ */

(function () {
  "use strict";

  const player = document.getElementById("music-player");
  if (!player) return;

  const audio = document.getElementById("audio-el");
  const playBtn = document.getElementById("play-btn");
  const bars = document.querySelectorAll(".player-bars span");
  const seek = document.getElementById("player-seek");
  const seekFill = document.getElementById("player-seek-fill");
  const trackTitle = document.getElementById("player-track-title");
  const trackSub = document.getElementById("player-track-sub");
  const trackArt = document.getElementById("player-art-img");
  const rows = document.querySelectorAll(".track-row");
  const notice = document.getElementById("player-notice");

  let barTimer = null;
  let isPlaying = false;

  function animateBars(active) {
    clearInterval(barTimer);
    if (active) {
      barTimer = setInterval(() => {
        bars.forEach((b) => (b.style.height = 15 + Math.random() * 85 + "%"));
      }, 220);
    } else {
      bars.forEach((b) => (b.style.height = "20%"));
    }
  }

  function setTrack(row) {
    rows.forEach((r) => r.classList.remove("active"));
    row.classList.add("active");
    trackTitle.textContent = row.dataset.title;
    trackSub.textContent = row.dataset.sub;
    trackArt.src = row.dataset.art;
    audio.src = row.dataset.src || "";
    playAudio();
  }

  function playAudio() {
    if (!audio.src) return;
    audio
      .play()
      .then(() => {
        isPlaying = true;
        playBtn.textContent = "⏸";
        animateBars(true);
        if (notice) notice.classList.remove("show");
      })
      .catch(() => {
        isPlaying = false;
        playBtn.textContent = "▶";
        animateBars(false);
        if (notice) {
          notice.textContent = "Audio preview coming soon — OST files aren't uploaded yet.";
          notice.classList.add("show");
        }
      });
  }

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = "▶";
        animateBars(false);
      } else {
        playAudio();
      }
    });
  }

  rows.forEach((row) => row.addEventListener("click", () => setTrack(row)));

  if (audio) {
    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      seekFill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    });
    audio.addEventListener("ended", () => {
      isPlaying = false;
      playBtn.textContent = "▶";
      animateBars(false);
    });
  }

  if (seek) {
    seek.addEventListener("click", (e) => {
      if (!audio.duration) return;
      const rect = seek.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    });
  }

  animateBars(false);

  // Initialize with first track loaded (but not autoplaying)
  if (rows.length) {
    const first = rows[0];
    trackTitle.textContent = first.dataset.title;
    trackSub.textContent = first.dataset.sub;
    trackArt.src = first.dataset.art;
    audio.src = first.dataset.src || "";
    first.classList.add("active");
  }
})();
