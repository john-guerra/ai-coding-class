// Generative "flow" background texture — ported from the Claude Design
// slide-design-system page. Faint navy streamlines traced through a
// fractal-noise vector field, painted behind each slide's content.
// Dividers (navy) stay clean. See docs/design/DESIGN_GUIDELINES.md.
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

  // --- flow-field streamlines, cached per seed ---
  var cache = {};
  function flowTile(s) {
    if (cache[s]) return cache[s];
    var W = 960, H = 700, c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(22,32,46,.008)';
    var sc = 0.0016, gs = 16, gw = Math.ceil(W / gs), occ = new Uint16Array(gw * Math.ceil(H / gs)), CAP = 8;
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
    cache[s] = c;
    return c;
  }

  // Reveal draws each slide's background in a .slide-background element that
  // transitions WITH the slide. Painting the flow there (as a CSS
  // background-image data URL — one decode per tile, browser-cached) makes the
  // texture move with the convex transition, and keeps it light. A few cycled
  // tiles so adjacent slides differ. Navy dividers keep their clean background.
  // A UNIQUE generative flow per slide (no repeat), painted on the slide's own
  // background so it transitions with the slide. Each tile is downscaled to a
  // small data URL so 48 unique textures stay memory-cheap — the texture is
  // faint enough that the lower resolution is invisible.
  function slideTileUrl(seed) {
    var big = flowTile(seed);
    var small = document.createElement('canvas');
    small.width = 480; small.height = 350;
    small.getContext('2d').drawImage(big, 0, 0, 480, 350);
    delete cache[seed];               // free the full-res canvas; seeds are unique
    return small.toDataURL('image/png');
  }
  function paintSlides() {
    if (typeof Reveal === 'undefined' || !Reveal.getSlideBackground) return;
    Reveal.getSlides().forEach(function (sl, i) {
      if (sl.matches('.divider')) return;                 // keep navy dividers clean
      var bg = Reveal.getSlideBackground(sl);
      if (!bg || bg.dataset.flowSet) return;
      bg.style.backgroundImage = 'url(' + slideTileUrl(7 + i * 13) + ')';
      bg.style.backgroundSize = 'cover';
      bg.style.backgroundPosition = 'center';
      bg.style.backgroundRepeat = 'no-repeat';
      bg.dataset.flowSet = '1';
    });
  }

  Reveal.on('ready', paintSlides);
  Reveal.on('slidechanged', paintSlides); // backgrounds reveal builds lazily
})();
