/* ═══════════════════════════════════════════════════
   compare.js — 漁場地圖今昔比對滑桿
   花蓮港漁業文化網站
   v1.1 | 2026-06-22

   左側：舊手繪地圖（compare-img--old）
   右側：現代照片（compare-img--new，待補則顯示佔位）
   拖曳把手：左拉露出右側現代照片，右推顯示舊地圖
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 5 組比對資料
     newSrc: null = 尚未有現代照片，顯示佔位
  ── */
  var pairs = [
    { oldSrc: 'images/compare-old-1.jpg', newSrc: null },
    { oldSrc: 'images/compare-old-2.jpg', newSrc: null },
    { oldSrc: 'images/compare-old-3.jpg', newSrc: null },
    { oldSrc: 'images/compare-old-4.jpg', newSrc: null },
    { oldSrc: 'images/compare-old-5.jpg', newSrc: null },
  ];

  var container  = document.getElementById('compareContainer');
  var handle     = document.getElementById('compareHandle');
  var oldImg     = document.getElementById('compareOldImg');
  var newEl      = document.getElementById('compareNewEl');
  var prevBtn    = document.getElementById('comparePrev');
  var nextBtn    = document.getElementById('compareNext');
  var counterEl  = document.getElementById('compareCounter');
  if (!container || !handle || !oldImg) return;

  var current  = 0;
  var dragging = false;

  /* ── 計算滑桿位置（% 從左） ── */
  function getPct(clientX) {
    var rect = container.getBoundingClientRect();
    return Math.min(100, Math.max(0, (clientX - rect.left) / rect.width * 100));
  }

  /* ── 更新滑桿與 clip-path ── */
  function setPosition(pct) {
    /* 舊地圖從右側裁切：pct=50 → 顯示左半；pct=0 → 完全隱藏（全露右側現代照片） */
    oldImg.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    handle.style.left     = pct + '%';
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }

  /* ── 切換組別 ── */
  function loadPair(index) {
    var pair = pairs[index];
    oldImg.src = pair.oldSrc;
    if (pair.newSrc) {
      newEl.style.backgroundImage = 'url(' + pair.newSrc + ')';
      newEl.style.backgroundSize  = 'cover';
      newEl.style.backgroundPosition = 'top center';
      newEl.classList.remove('compare-img--placeholder');
    } else {
      newEl.style.backgroundImage = '';
      newEl.classList.add('compare-img--placeholder');
    }
    setPosition(50);
    if (counterEl) counterEl.textContent = (index + 1) + ' / ' + pairs.length;
    if (prevBtn)   prevBtn.disabled = (index === 0);
    if (nextBtn)   nextBtn.disabled = (index === pairs.length - 1);
  }

  /* ── 導航 ── */
  if (prevBtn) prevBtn.addEventListener('click', function () {
    if (current > 0) loadPair(--current);
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    if (current < pairs.length - 1) loadPair(++current);
  });

  /* ── 滑鼠事件 ── */
  handle.addEventListener('mousedown', function (e) {
    dragging = true;
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    setPosition(getPct(e.clientX));
  });
  document.addEventListener('mouseup', function () { dragging = false; });

  /* ── 觸控事件 ── */
  handle.addEventListener('touchstart', function (e) {
    dragging = true;
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    setPosition(getPct(e.touches[0].clientX));
  }, { passive: true });
  document.addEventListener('touchend', function () { dragging = false; });

  /* ── 鍵盤（無障礙）── */
  handle.addEventListener('keydown', function (e) {
    var pct = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft')  setPosition(Math.max(0,   pct - 2));
    if (e.key === 'ArrowRight') setPosition(Math.min(100, pct + 2));
  });

  /* ── 點擊容器移動滑桿 ── */
  container.addEventListener('click', function (e) {
    if (handle.contains(e.target)) return;
    setPosition(getPct(e.clientX));
  });

  /* ── 初始化 ── */
  loadPair(0);

})();
