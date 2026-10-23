/* Açaí Verão — animações (sem dependências).
   1) Entrada do hero ao abrir a página.
   2) Revelação ao rolar: [data-reveal="fade|words|stagger|img"]. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Hero ---------- */
  var hero = document.querySelector('.av-hero-frame');
  if (hero) {
    if (reduce) {
      hero.removeAttribute('data-anim');
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { hero.setAttribute('data-anim', 'in'); });
      });
      // parallax sutil da arte com o mouse
      var art = hero.querySelector('.av-hero-parallax');
      if (art && window.matchMedia('(hover: hover)').matches) {
        hero.addEventListener('mousemove', function (e) {
          var b = hero.getBoundingClientRect();
          var x = (e.clientX - b.left) / b.width - 0.5;
          var y = (e.clientY - b.top) / b.height - 0.5;
          art.style.transform = 'translate(' + (x * -14).toFixed(1) + 'px,' + (y * -10).toFixed(1) + 'px)';
        });
        hero.addEventListener('mouseleave', function () { art.style.transform = ''; });
      }
    }
  }

  /* ---------- 2. Revelar ao rolar ---------- */
  var els = document.querySelectorAll('[data-reveal]');
  Array.prototype.forEach.call(els, function (el) {
    var mode = el.getAttribute('data-reveal') || 'fade';
    el.classList.add('av-reveal');
    if (mode !== 'fade') el.classList.add('av-reveal-' + mode);
    if (el.dataset.delay) el.style.setProperty('--av-delay', el.dataset.delay + 'ms');
    el.style.setProperty('--stagger', (el.dataset.stagger || 90) + 'ms');

    if (mode === 'words') {
      var words = el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label', el.textContent.trim());
      el.innerHTML = '';
      words.forEach(function (w, i) {
        var s = document.createElement('span');
        s.className = 'av-w';
        s.setAttribute('aria-hidden', 'true');
        s.style.setProperty('--i', i);
        s.textContent = w;
        el.appendChild(s);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
    }
    if (mode === 'stagger') {
      Array.prototype.forEach.call(el.children, function (c, i) { c.style.setProperty('--i', i); });
    }
    el.setAttribute('data-state', reduce ? 'in' : 'wait');
  });

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(els, function (el) { el.setAttribute('data-state', 'in'); });
    return;
  }

  function onSee(entries, obs) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.setAttribute('data-state', 'in');
        obs.unobserve(e.target);
      }
    });
  }
  // blocos pequenos: aparecem com 18% visível; grades altas (stagger): assim que a borda entra
  var ioSmall = new IntersectionObserver(onSee, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  var ioTall = new IntersectionObserver(onSee, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

  Array.prototype.forEach.call(els, function (el) {
    (el.getAttribute('data-reveal') === 'stagger' ? ioTall : ioSmall).observe(el);
  });
})();
