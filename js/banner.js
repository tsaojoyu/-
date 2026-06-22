/* ═══════════════════════════════════════════════════
   banner.js — Banner 手繪地圖輪播
   花蓮港漁業文化網站
   v1.0 | 2026-06-22

   效果：5 張手繪地圖 crossfade 輪播
   圖片路徑：images/map-1.jpg 至 map-5.jpg
   每張停留 5 秒，淡出淡入各 1.5 秒
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const slides = document.querySelectorAll('.banner-slide');
  if (!slides.length) return;

  let current = 0;

  function next() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  setInterval(next, 5000);
})();
