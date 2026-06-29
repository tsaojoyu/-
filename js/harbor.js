/* ═══════════════════════════════════════════════════
   harbor.js — 漁港互動邏輯
   花蓮港漁業文化網站 Demo
   v1.1 | 2026-05-19

   功能：
   1. 熱區點擊 → 開啟 Lightbox，填入對應船隻資料
   2. ✕ 按鈕 / 點擊遮罩 / ESC → 關閉 Lightbox
   3. 媒體區：影片播放 + 多張圖片左右輪播
   4. 鍵盤支援（Tab 選取、Enter/Space 開啟）

   資料來源：data/vessels.js（VESSELS_DATA 全域變數）
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM 節點 ──────────────────────────────────── */
  const overlay       = document.getElementById('lightboxOverlay');
  const closeBtn      = document.getElementById('lightboxClose');
  const badgeEl       = document.getElementById('lightboxBadge');
  const titleEl       = document.getElementById('lightboxTitle');
  const subtitleEl    = document.getElementById('lightboxSubtitle');
  const descriptionLabelEl = document.getElementById('lightboxDescriptionLabel');
  const descriptionEl      = document.getElementById('lightboxDescription');
  const quoteEl       = document.getElementById('lightboxQuote');
  const citeEl        = document.getElementById('lightboxCite');

  const mediaSection  = document.getElementById('lightboxMedia');
  const videoWrap     = document.getElementById('lightboxVideoWrap');
  const videoEl       = document.getElementById('lightboxVideo');
  const videoErrMsg   = document.getElementById('videoErrorMsg');
  const galleryEl     = document.getElementById('lightboxGallery');
  const galleryImg    = document.getElementById('galleryImg');
  const galleryCounter= document.getElementById('galleryCounter');
  const prevBtn       = document.getElementById('galleryPrev');
  const nextBtn       = document.getElementById('galleryNext');

  /* ── 狀態 ──────────────────────────────────────── */
  let previousFocus     = null;
  let currentImages     = [];
  let currentImageIndex = 0;

  /* ── 圖片輪播 ──────────────────────────────────── */
  function showImage(index) {
    if (!currentImages.length) return;
    currentImageIndex = (index + currentImages.length) % currentImages.length;
    galleryImg.src = currentImages[currentImageIndex];
    galleryCounter.textContent = (currentImageIndex + 1) + ' / ' + currentImages.length;
    prevBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
    nextBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
  }

  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentImageIndex - 1);
  });

  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentImageIndex + 1);
  });

  /* ── 媒體區渲染 ────────────────────────────────── */
  function renderMedia(data) {
    const hasVideo  = !!data.video;
    const hasImages = !!(data.images && data.images.length);

    if (hasVideo) {
      videoErrMsg.style.display = 'none';
      videoEl.style.display     = 'block';
      videoEl.muted = !!data.videoMuted;
      videoEl.src = data.video;
      videoEl.load();
      videoWrap.style.display = 'block';
    } else {
      videoWrap.style.display = 'none';
      videoEl.removeAttribute('src');
    }

    if (hasImages) {
      currentImages = data.images;
      showImage(0);
      galleryEl.style.display = 'block';
    } else {
      galleryEl.style.display = 'none';
      currentImages = [];
    }

    mediaSection.style.display = (hasVideo || hasImages) ? 'block' : 'none';
  }

  /* 影片格式不支援時顯示提示 */
  videoEl.addEventListener('error', function () {
    if (videoEl.getAttribute('src')) {
      videoEl.style.display = 'none';
      videoErrMsg.style.display = 'block';
    }
  });

  /* ── 開啟 Lightbox ─────────────────────────────── */
  function openLightbox(vesselKey) {
    const data = VESSELS_DATA[vesselKey];
    if (!data) return;

    badgeEl.textContent              = data.badge;
    titleEl.textContent              = data.name;
    subtitleEl.textContent           = data.subtitle;
    descriptionLabelEl.textContent   = data.descriptionLabel || '內容介紹';
    descriptionEl.textContent        = data.description;

    const quoteSection = quoteEl.closest('.lightbox-section');
    if (data.quote) {
      quoteEl.textContent        = data.quote;
      citeEl.textContent         = data.quoteSource;
      quoteSection.style.display = '';
    } else {
      quoteSection.style.display = 'none';
    }

    renderMedia(data);

    document.getElementById('lightboxContent').scrollTop = 0;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    previousFocus = document.activeElement;
    closeBtn.focus();
  }

  /* ── 關閉 Lightbox ─────────────────────────────── */
  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';

    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();

    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  /* ── 事件綁定 ──────────────────────────────────── */

  document.querySelectorAll('.vessel-hotspot').forEach(function (hotspot) {
    hotspot.addEventListener('click', function () {
      openLightbox(this.dataset.vessel);
    });
    hotspot.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(this.dataset.vessel);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeLightbox();
    }
  });

})();
