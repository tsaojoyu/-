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

      var opacity     = 0.45 + 0.55 * factor;
      var scale       = 0.91 + 0.12 * factor;
      var translateY  = -10  * factor;
      var shadowY     = 1    + 20  * factor;
      var shadowBlur  = 2    + 38  * factor;
      var shadowAlpha = 0.04 + 0.30 * factor;

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

    /* ── 供熱區點擊：展開 + 等動畫 + 卡片置中 + 高亮 */
    strip._openAndGoTo = function (cardIdx) {
      openStrip(strip, function () {
        var cards = track.querySelectorAll('.diorama-strip-card');
        var card  = cards[cardIdx];
        if (!card) return;
        track.scrollLeft =
          card.offsetLeft - (track.offsetWidth / 2) + (card.offsetWidth / 2);
        updateDepth(track);
        card.classList.remove('is-highlighted');
        void card.offsetWidth;
        card.classList.add('is-highlighted');
        setTimeout(function () { card.classList.remove('is-highlighted'); }, 1400);
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
          strip._openAndGoTo(0);
        }
        setTimeout(function () {
          strip.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        setTimeout(function () {
          var header = strip.querySelector('.diorama-strip-header');
          if (header) {
            header.classList.remove('is-pulsing');
            void header.offsetWidth;
            header.classList.add('is-pulsing');
            header.addEventListener('animationend', function () {
              header.classList.remove('is-pulsing');
            }, { once: true });
          }
        }, 500);
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

})();
