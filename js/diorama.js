/* ═══════════════════════════════════════════════════
   diorama.js — 漁場箱庭互動邏輯
   花蓮港漁業文化網站 Demo
   v2.3 | 2026-05-20

   功能：
   1. 四大橫條折疊排列，點擊標題列展開（一次只開一條）
   2. 展開後：拖曳慣性滑動 + 景深立體效果（同 v2.0）
   3. 插畫熱區點擊 → 展開對應橫條 + 捲到目標卡片置中
   4. 「回到海上」→ 折疊 + 捲回插畫場景

   資料來源：data/diorama.js
     - DIORAMA_DATA  各類別卡片資料
     - DIORAMA_LINKS 延伸閱讀連結
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 影片浮動視窗 ──────────────────────────────── */
  var videoModal = null;
  var videoModalEl = null;

  function createVideoModal() {
    videoModal = document.createElement('div');
    videoModal.className = 'diorama-video-modal';

    var inner = document.createElement('div');
    inner.className = 'diorama-video-modal-inner';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'diorama-video-modal-close';
    closeBtn.setAttribute('aria-label', '關閉影片');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', closeVideoModal);

    videoModalEl = document.createElement('video');
    videoModalEl.controls = true;
    videoModalEl.preload = 'metadata';
    videoModalEl.setAttribute('playsinline', '');

    var errMsg = document.createElement('p');
    errMsg.className = 'diorama-video-modal-error';
    errMsg.textContent = '此影片格式無法在瀏覽器中播放，建議將影片轉換為 .mp4 格式。';
    errMsg.style.display = 'none';

    videoModalEl.addEventListener('error', function () {
      if (videoModalEl.getAttribute('src')) {
        videoModalEl.style.display = 'none';
        errMsg.style.display = 'block';
      }
    });

    inner.appendChild(closeBtn);
    inner.appendChild(videoModalEl);
    inner.appendChild(errMsg);
    videoModal.appendChild(inner);

    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) closeVideoModal();
    });

    document.body.appendChild(videoModal);
  }

  function openVideoModal(src) {
    if (!videoModal) createVideoModal();
    var errMsg = videoModal.querySelector('.diorama-video-modal-error');
    errMsg.style.display = 'none';
    videoModalEl.style.display = 'block';
    videoModalEl.src = src;
    videoModalEl.load();
    videoModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('is-open');
    document.body.style.overflow = '';
    videoModalEl.pause();
    videoModalEl.removeAttribute('src');
    videoModalEl.load();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('is-open')) {
      closeVideoModal();
    }
  });


  /* ── 圖片輪播區塊 ──────────────────────────────── */
  function buildImageBlock(images) {
    var wrap  = document.createElement('div');
    wrap.className = 'diorama-strip-card-media';

    var stage = document.createElement('div');
    stage.className = 'diorama-strip-card-image-stage';

    var img = document.createElement('img');
    img.className = 'diorama-strip-card-img';
    img.alt = '說明圖片';
    stage.appendChild(img);

    var counter = null;
    var idx = 0;

    function updateImg() {
      img.src = images[idx];
      if (counter) counter.textContent = (idx + 1) + ' / ' + images.length;
    }

    if (images.length > 1) {
      var prev = document.createElement('button');
      prev.className = 'diorama-strip-img-arrow diorama-strip-img-prev';
      prev.setAttribute('aria-label', '上一張');
      prev.textContent = '←';
      prev.addEventListener('click', function (e) {
        e.stopPropagation();
        idx = (idx - 1 + images.length) % images.length;
        updateImg();
      });

      var next = document.createElement('button');
      next.className = 'diorama-strip-img-arrow diorama-strip-img-next';
      next.setAttribute('aria-label', '下一張');
      next.textContent = '→';
      next.addEventListener('click', function (e) {
        e.stopPropagation();
        idx = (idx + 1) % images.length;
        updateImg();
      });

      stage.insertBefore(prev, img);
      stage.appendChild(next);

      counter = document.createElement('div');
      counter.className = 'diorama-strip-img-counter';
    }

    wrap.appendChild(stage);
    if (counter) wrap.appendChild(counter);

    updateImg();
    return wrap;
  }

  /* ── 單張卡片元素 ──────────────────────────────── */
  function buildCard(item) {
    var card = document.createElement('div');
    card.className = 'diorama-strip-card';

    if (item.images && item.images.length) {
      card.appendChild(buildImageBlock(item.images));
    }

    var name = document.createElement('h3');
    name.className = 'diorama-strip-card-name';
    name.textContent = item.name;
    card.appendChild(name);

    var sub = document.createElement('p');
    sub.className = 'diorama-strip-card-subtitle';
    sub.textContent = item.subtitle;
    card.appendChild(sub);

    var rule = document.createElement('div');
    rule.className = 'diorama-strip-card-rule';
    card.appendChild(rule);

    var desc = document.createElement('p');
    desc.className = 'diorama-strip-card-desc';
    desc.textContent = item.description;
    card.appendChild(desc);

    if (item.quote) {
      var quote = document.createElement('blockquote');
      quote.className = 'diorama-strip-card-quote';
      quote.textContent = item.quote;
      card.appendChild(quote);

      var cite = document.createElement('cite');
      cite.className = 'diorama-strip-card-cite';
      cite.textContent = item.quoteSource;
      card.appendChild(cite);
    }

    if (item.video) {
      var videoBtn = document.createElement('button');
      videoBtn.className = 'diorama-video-btn';
      videoBtn.textContent = '▶ 播放影片';
      videoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openVideoModal(item.video);
      });
      card.appendChild(videoBtn);
    }

    return card;
  }

  /* ── 景深：中央卡放大浮起，邊緣卡縮小貼平 ──────── */
  function updateDepth(track) {
    var cards       = track.querySelectorAll('.diorama-strip-card');
    var trackCenter = track.scrollLeft + track.offsetWidth / 2;
    var maxDist     = track.offsetWidth * 0.68;

    cards.forEach(function (card) {
      var cardCenter  = card.offsetLeft + card.offsetWidth / 2;
      var dist        = Math.abs(cardCenter - trackCenter);
      var factor      = Math.max(0, 1 - dist / maxDist);

      var opacity     = 0.70 + 0.30 * factor;
      var scale       = 0.95 + 0.05 * factor;
      var translateY  = -6   * factor;
      var shadowY     = 1    + 12  * factor;
      var shadowBlur  = 2    + 24  * factor;
      var shadowAlpha = 0.04 + 0.18 * factor;

      card.style.opacity   = opacity.toFixed(2);
      card.style.transform =
        'scale(' + scale.toFixed(3) + ') translateY(' + translateY.toFixed(1) + 'px)';
      card.style.boxShadow =
        '0 ' + shadowY.toFixed(1) + 'px ' + shadowBlur.toFixed(1) +
        'px rgba(0,0,0,' + shadowAlpha.toFixed(2) + ')';
    });
  }

  /* ── 拖曳慣性滑動 ──────────────────────────────── */
  function makeDraggable(track) {
    var isDown   = false;
    var startX   = 0;
    var scrollL  = 0;
    var velX     = 0;
    var lastX    = 0;
    var lastTime = 0;
    var rafId    = null;

    track.addEventListener('mousedown', function (e) {
      if (e.target.closest('button')) return;
      isDown = true;
      track.classList.add('is-dragging');
      startX  = e.pageX - track.offsetLeft;
      scrollL = track.scrollLeft;
      velX    = 0;
      lastX   = e.pageX;
      lastTime = performance.now();
      cancelAnimationFrame(rafId);
    });

    track.addEventListener('mouseleave', function () {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      startGlide();
    });

    track.addEventListener('mouseup', function () {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
      startGlide();
    });

    track.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x    = e.pageX - track.offsetLeft;
      var walk = x - startX;
      var now  = performance.now();
      var dt   = now - lastTime;
      if (dt > 0) velX = (e.pageX - lastX) / dt * 16;
      lastX    = e.pageX;
      lastTime = now;
      track.scrollLeft = scrollL - walk;
    });

    var rafDepth = null;
    track.addEventListener('scroll', function () {
      if (rafDepth) return;
      rafDepth = requestAnimationFrame(function () {
        updateDepth(track);
        rafDepth = null;
      });
    });

    function startGlide() {
      cancelAnimationFrame(rafId);
      glide();
    }

    function glide() {
      if (Math.abs(velX) < 0.4) return;
      velX *= 0.92;
      track.scrollLeft -= velX;
      updateDepth(track);
      rafId = requestAnimationFrame(glide);
    }

    updateDepth(track);
  }

  /* ── 折疊 / 展開 ───────────────────────────────── */
  var currentOpenStrip = null;

  function openStrip(strip, onOpen) {
    /* 關掉現在開著的（如果不是自己） */
    if (currentOpenStrip && currentOpenStrip !== strip) {
      closeStrip(currentOpenStrip);
    }

    /* 已經開著：直接執行 callback */
    if (strip.classList.contains('is-open')) {
      if (onOpen) onOpen();
      return;
    }

    var body  = strip.querySelector('.diorama-strip-body');
    var track = strip.querySelector('.diorama-strip-track');

    /* scrollHeight 在 height:0 下仍能取得自然高度 */
    body.style.height = body.scrollHeight + 'px';
    strip.classList.add('is-open');
    currentOpenStrip = strip;

    body.addEventListener('transitionend', function onEnd(e) {
      if (e.propertyName !== 'height') return;
      body.removeEventListener('transitionend', onEnd);
      body.style.height = 'auto'; /* 允許內容高度自然變化 */
      updateDepth(track);
      if (onOpen) onOpen();
    });
  }

  function closeStrip(strip) {
    if (!strip.classList.contains('is-open')) return;
    var body = strip.querySelector('.diorama-strip-body');

    /* 若 height 已是 auto，先固定為像素值再啟動過渡 */
    if (body.style.height === 'auto' || body.style.height === '') {
      body.style.height = body.offsetHeight + 'px';
      body.offsetHeight; /* 強制 reflow */
    }
    body.style.height = '0px';
    strip.classList.remove('is-open');
    if (currentOpenStrip === strip) currentOpenStrip = null;
  }

  /* ── 渲染四大橫條 ──────────────────────────────── */
  var stripsContainer = document.getElementById('dioramaStrips');

  Object.keys(DIORAMA_DATA).forEach(function (catKey) {
    var cat = DIORAMA_DATA[catKey];

    var strip = document.createElement('div');
    strip.className = 'diorama-strip';
    strip.id = 'strip-' + catKey;

    /* ── 標題列（可點擊） */
    var header = document.createElement('div');
    header.className = 'diorama-strip-header';
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    var label = document.createElement('span');
    label.className = 'diorama-strip-label';
    label.textContent = cat.categoryLabel;
    header.appendChild(label);

    var backBtn = document.createElement('button');
    backBtn.className = 'diorama-strip-back-btn';
    backBtn.textContent = '↑ 回到海上';
    backBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeStrip(strip);
      document.getElementById('dioramaScene').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    header.appendChild(backBtn);

    /* 點擊標題列切換開/關 */
    header.addEventListener('click', function (e) {
      if (e.target.closest('.diorama-strip-back-btn')) return;
      if (strip.classList.contains('is-open')) {
        closeStrip(strip);
        header.setAttribute('aria-expanded', 'false');
      } else {
        openStrip(strip);
        header.setAttribute('aria-expanded', 'true');
      }
    });
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });

    strip.appendChild(header);

    /* ── 可折疊內容區 */
    var body = document.createElement('div');
    body.className = 'diorama-strip-body';
    body.style.height = '0px';

    var track = document.createElement('div');
    track.className = 'diorama-strip-track';
    track.dataset.category = catKey;

    cat.items.forEach(function (item) {
      track.appendChild(buildCard(item));
    });

    body.appendChild(track);
    strip.appendChild(body);
    stripsContainer.appendChild(strip);

    makeDraggable(track);

    /* ── 供熱區點擊：展開 + 捲動預覽所有卡片 */
    strip._openAndGoTo = function () {
      openStrip(strip, function () {
        var maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) return;

        var duration = 1000;

        function easeInOut(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animateTo(from, to, onDone) {
          var startTime = null;
          function step(ts) {
            if (!startTime) startTime = ts;
            var t = Math.min((ts - startTime) / duration, 1);
            track.scrollLeft = from + (to - from) * easeInOut(t);
            updateDepth(track);
            if (t < 1) requestAnimationFrame(step);
            else if (onDone) onDone();
          }
          requestAnimationFrame(step);
        }

        /* 滑到最後一張，停 300ms，再滑回第一張 */
        track.scrollLeft = 0;
        animateTo(0, maxScroll, function () {
          setTimeout(function () {
            animateTo(maxScroll, 0, null);
          }, 300);
        });
      });
    };
  });

  /* resize 時更新所有已開啟橫條的景深 */
  window.addEventListener('resize', function () {
    document.querySelectorAll('.diorama-strip.is-open .diorama-strip-track')
      .forEach(updateDepth);
  });

  /* ── 熱區點擊 → 展開整條橫條 + 捲到位置 + pulse ── */
  document.querySelectorAll('.diorama-hotspot').forEach(function (hotspot) {
    hotspot.addEventListener('click', function () {
      var catKey = this.dataset.category;
      var strip  = document.getElementById('strip-' + catKey);

      if (strip) {
        if (typeof strip._openAndGoTo === 'function') {
          strip._openAndGoTo();
        }
        setTimeout(function () {
          strip.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }

      document.querySelectorAll('.diorama-hotspot').forEach(function (el) {
        el.classList.remove('is-active');
      });
      this.classList.add('is-active');
    });

    hotspot.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  /* ── 延伸閱讀渲染 ──────────────────────────────── */
  function renderDeepLinks() {
    var el = document.getElementById('dioramaDeepLinks');
    if (!el || !DIORAMA_LINKS || !DIORAMA_LINKS.length) return;

    el.innerHTML = '<div class="deep-links-label">延伸閱讀</div>';
    var row = document.createElement('div');
    row.className = 'deep-links-row';

    DIORAMA_LINKS.forEach(function (link) {
      var a = document.createElement('a');
      a.href   = link.url;
      a.target = '_blank';
      a.rel    = 'noopener noreferrer';
      a.className = 'deep-link-item' + (link.url === '#' ? ' deep-link-item--placeholder' : '');
      a.innerHTML =
        '<span class="deep-link-title">' + link.label + ' →</span>' +
        '<span class="deep-link-note">'  + link.note  + '</span>';
      row.appendChild(a);
    });

    el.appendChild(row);
  }

  renderDeepLinks();

  /* ── seascape 熱區：點擊展開對應橫條並定位到特定卡片 ── */
  function openStripAndGoToCard(catKey, itemIndex) {
    var strip = document.getElementById('strip-' + catKey);
    if (!strip) return;

    openStrip(strip, function () {
      var track = strip.querySelector('.diorama-strip-track');
      var cards = track.querySelectorAll('.diorama-strip-card');
      var card  = cards[itemIndex];
      if (!card) { updateDepth(track); return; }
      var targetLeft = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      setTimeout(function () {
        updateDepth(track);
        track.querySelectorAll('.is-highlighted').forEach(function (c) { c.classList.remove('is-highlighted'); });
        void card.offsetWidth;
        card.classList.add('is-highlighted');
        setTimeout(function () { card.classList.remove('is-highlighted'); }, 1700);
      }, 400);
    });

    setTimeout(function () {
      strip.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  document.querySelectorAll('.seascape-hotspot').forEach(function (btn) {
    var layerId = 'seascape-layer-' + btn.dataset.category + '-' + btn.dataset.index;
    var layer   = document.getElementById(layerId);

    /* hover → 對應圖層亮起 */
    btn.addEventListener('mouseenter', function () {
      if (layer) layer.classList.add('is-lit');
    });
    btn.addEventListener('mouseleave', function () {
      if (layer) layer.classList.remove('is-lit');
    });

    btn.addEventListener('click', function () {
      openStripAndGoToCard(this.dataset.category, parseInt(this.dataset.index, 10));
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
    });
  });

  document.querySelectorAll('.seascape-ground-marker').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openStripAndGoToCard('fishingGrounds', parseInt(this.dataset.index, 10));
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
    });
  });



})();
