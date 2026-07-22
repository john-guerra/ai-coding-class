// Generative "flow" background texture — ported from the Claude Design
// slide-design-system page. Faint navy streamlines traced through a
// fractal-noise vector field, painted behind each slide's content.
// Dividers (navy) stay clean. See docs/design/DESIGN_GUIDELINES.md.
//
// Resolution strategy: each slide gets a UNIQUE tile rendered at the actual
// on-screen device resolution (reveal's fit-scale × devicePixelRatio), so the
// streamlines stay crisp instead of being upscaled from a small thumbnail.
// A full-res RGBA bitmap is ~10 MB decoded, so we can't keep 48 of them in
// memory — instead we paint only a sliding window around the current slide and
// release the rest. Re-rendering a tile on revisit is a few milliseconds.
(function () {
  // --- value-noise / fBm ---
  function h2(x, y, s) {
    var n = (x * 374761393) ^ (y * 668265263) ^ (s * 1442695040);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }
  function sm(t) { return t * t * (3 - 2 * t); }
  function vnoise(x, y, s) {
    var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    var tl = h2(xi, yi, s), tr = h2(xi + 1, yi, s), bl = h2(xi, yi + 1, s), br = h2(xi + 1, yi + 1, s);
    var u = sm(xf), v = sm(yf), t = tl + (tr - tl) * u, b = bl + (br - bl) * u;
    return t + (b - t) * v;
  }
  function fbm(x, y, s) {
    var a = 0, amp = 0.5, f = 1;
    for (var i = 0; i < 4; i++) { a += amp * vnoise(x * f, y * f, s); f *= 2; amp *= 0.5; }
    return a;
  }

  // Slide design space is 960×700. `q` is how many device pixels we render per
  // slide unit: reveal's fit-scale (slides box width ÷ 960) × devicePixelRatio,
  // capped so 4K/retina doesn't explode memory. The whole streamline pass runs
  // in slide coordinates via ctx.scale(q,q), so the pattern is identical to the
  // spec — only the raster resolution changes.
  function quality() {
    var scale = 1;
    var el = document.querySelector('.reveal .slides');
    if (el) { var w = el.getBoundingClientRect().width; if (w) scale = w / 960; }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    return Math.max(1, Math.min(2.4, scale * dpr));
  }

  // --- flow-field streamlines, rendered at quality q, cached per seed ---
  var cache = {};       // seed -> canvas (only the live window is kept)
  function flowTile(s, q) {
    var key = s + '@' + q;
    if (cache[key]) return cache[key];
    var W = 960, H = 700, c = document.createElement('canvas');
    c.width = Math.round(W * q); c.height = Math.round(H * q);
    var ctx = c.getContext('2d');
    ctx.scale(q, q);                       // draw in slide coords, rasterize at q×
    ctx.lineWidth = 1;                     // 1 slide-px hairline (crisp at any q)
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(22,32,46,.023)';
    var sc = 0.0023, gs = 16, gw = Math.ceil(W / gs), occ = new Uint16Array(gw * Math.ceil(H / gs)), CAP = 7;
    function field(x, y) { var a = fbm(x * sc, y * sc, s) * Math.PI * 4; return [Math.cos(a), Math.sin(a)]; }
    for (var i = 0; i < 760; i++) {
      var x = h2(i, i * 3, s) * W, y = h2(i * 7, i, s + 9) * H, len = 80 + h2(i, 99, s) * 150;
      ctx.beginPath(); ctx.moveTo(x, y);
      var drawn = false, lastGi = -1;
      for (var step = 0; step < len; step++) {
        var v = field(x, y); x += v[0] * 2.4; y += v[1] * 2.4;
        if (x < 0 || x > W || y < 0 || y > H) break;
        var gi = Math.floor(y / gs) * gw + Math.floor(x / gs);
        if (gi !== lastGi) { if (occ[gi] >= CAP) break; occ[gi]++; lastGi = gi; }
        ctx.lineTo(x, y); drawn = true;
      }
      if (drawn) ctx.stroke();
    }
    cache[key] = c;
    return c;
  }

  // Reveal draws each slide's background in a .slide-background element that
  // transitions WITH the slide. We paint the current slide and its immediate
  // neighbours (so sequential nav never shows an unpainted background), and
  // release tiles that fall outside that window to bound memory.
  var WINDOW = 2;
  var seedFor = function (i) { return 7 + i * 13; };   // stable, unique per slide
  var curQ = null;

  function tileUrl(seed, q) {
    var url = flowTile(seed, q).toDataURL('image/png');
    return url;
  }
  function paint(bg, seed, q) {
    bg.style.backgroundImage = 'url(' + tileUrl(seed, q) + ')';
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
    bg.style.backgroundRepeat = 'no-repeat';
    bg.dataset.flowSeed = seed + '@' + q;
  }
  function release(bg) {
    bg.style.backgroundImage = '';
    delete bg.dataset.flowSeed;
  }

  function paintWindow() {
    if (typeof Reveal === 'undefined' || !Reveal.getSlideBackground) return;
    var slides = Reveal.getSlides();
    var cur = slides.indexOf(Reveal.getCurrentSlide());
    if (cur < 0) cur = 0;
    var q = quality();
    // If the fit-scale/dpr changed (window resize, monitor move), drop caches
    // so tiles re-render at the new resolution.
    if (curQ !== null && curQ !== q) cache = {};
    curQ = q;
    slides.forEach(function (sl, i) {
      if (sl.matches('.divider')) return;                 // keep navy dividers clean
      var bg = Reveal.getSlideBackground(sl);
      if (!bg) return;
      var want = Math.abs(i - cur) <= WINDOW;
      var seed = seedFor(i), tag = seed + '@' + q;
      if (want) {
        if (bg.dataset.flowSeed !== tag) paint(bg, seed, q);
      } else if (bg.dataset.flowSeed) {
        release(bg);
        delete cache[seedFor(i) + '@' + q];               // free the bitmap
      }
    });
  }

  Reveal.on('ready', paintWindow);
  Reveal.on('slidechanged', paintWindow);
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { curQ = null; cache = {}; paintWindow(); }, 250);
  });
})();
