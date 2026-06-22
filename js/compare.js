/* ═══════════════════════════════════════════════════
   compare.js — 漁場地圖今昔比對滑桿
   花蓮港漁業文化網站
   v1.0 | 2026-06-22
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  var container = document.getElementById('compareContainer');
  var handle    = document.getElementById('compareHandle');
  if (!container || !handle) return;

  var newImg = container.querySelector('.compare-img--new');
  var dragging = false;

  function getPct(clientX) {
    var rect = container.getBoundingClientRect();
    var pct  = (clientX - rect.left) / rect.width * 100;
    return Math.min(100, Math.max(0, pct));
  }

  function setPosition(pct) {
    newImg.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    handle.style.left     = pct + '%';
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }

  /* ── 滑鼠事件 ── */
  handle.addEventListener('mousedown', function (e) {
    dragging = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    setPosition(getPct(e.clientX));
  });

  document.addEventListener('mouseup', function () {
    dragging = false;
  });

  /* ── 觸控事件 ── */
  handle.addEventListener('touchstart', function (e) {
    dragging = true;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    setPosition(getPct(e.touches[0].clientX));
  }, { passive: true });

  document.addEventListener('touchend', function () {
    dragging = false;
  });

  /* ── 鍵盤操作（無障礙）── */
  handle.addEventListener('keydown', function (e) {
    var pct = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft')  setPosition(Math.max(0,   pct - 2));
    if (e.key === 'ArrowRight') setPosition(Math.min(100, pct + 2));
  });

  /* ── 點擊容器任意處也可移動 ── */
  container.addEventListener('click', function (e) {
    if (e.target === handle || handle.contains(e.target)) return;
    setPosition(getPct(e.clientX));
  });

})();
