(function () {
  var audio  = document.getElementById('bgAudio');
  var btn    = document.getElementById('audioToggle');
  var icon   = document.getElementById('audioIcon');
  var muted  = false;
  var started = false;

  function setMuted(val) {
    muted = val;
    audio.muted = val;
    icon.textContent = val ? '🔇' : '🔊';
    btn.classList.toggle('is-muted', val);
    btn.setAttribute('aria-label', val ? '取消靜音' : '靜音');
  }

  function start() {
    if (started) return;
    started = true;
    audio.volume = 0.35;
    audio.play().catch(function () {});
  }

  /* 嘗試自動播放 */
  audio.volume = 0.35;
  audio.play().then(function () {
    started = true;
  }).catch(function () {
    /* 被瀏覽器擋住：等第一次使用者互動再播 */
    var events = ['click', 'scroll', 'keydown', 'touchstart'];
    function onInteraction() {
      start();
      events.forEach(function (e) {
        document.removeEventListener(e, onInteraction);
      });
    }
    events.forEach(function (e) {
      document.addEventListener(e, onInteraction, { once: true, passive: true });
    });
  });

  /* 開關按鈕 */
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!started) start();
    setMuted(!muted);
  });
})();
