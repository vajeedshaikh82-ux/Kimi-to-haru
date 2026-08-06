/* ============================================================
   Kimi to Haru — gallery-data.js
   Populates the gallery grid with categorized visual items
   ============================================================ */

(function () {
  "use strict";

  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const ITEMS = [
    { category: "artwork", src: "assets/images/gallery/artwork01.svg", alt: "Ren and Hina under the cherry trees" },
    { category: "artwork", src: "assets/images/gallery/artwork02.svg", alt: "Sunset over Hoshikawa Station" },
    { category: "artwork", src: "assets/images/gallery/artwork03.svg", alt: "The music room after school" },
    { category: "artwork", src: "assets/images/gallery/artwork04.svg", alt: "Cherry Blossom Park in full bloom" },
    { category: "artwork", src: "assets/images/gallery/artwork05.svg", alt: "Rooftop view of Hoshikawa City" },
    { category: "artwork", src: "assets/images/gallery/artwork06.svg", alt: "Hina's camera and a spring breeze" },
    { category: "manga", src: "assets/images/gallery/artwork01.svg", alt: "Manga panel — Episode 1, Part 1" },
    { category: "manga", src: "assets/images/gallery/artwork03.svg", alt: "Manga panel — Episode 1, Part 2" },
    { category: "wallpaper", src: "assets/images/gallery/wallpaper01.svg", alt: "Wallpaper — Spring in Hoshikawa" },
    { category: "wallpaper", src: "assets/images/gallery/wallpaper02.svg", alt: "Wallpaper — Rooftop at Dusk" },
    { category: "wallpaper", src: "assets/images/gallery/wallpaper03.svg", alt: "Wallpaper — Rainy Music Room" },
    { category: "wallpaper", src: "assets/images/gallery/wallpaper04.svg", alt: "Wallpaper — Full Cast" },
  ];

  grid.innerHTML = ITEMS.map(
    (item) => `
    <div class="gallery-item" data-category="${item.category}">
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
    </div>`
  ).join("");
})();
