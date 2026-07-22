// Initialize Mermaid diagrams in reveal.js slides
// Deferred rendering: only renders diagrams when their slide becomes visible,
// preventing sizing issues on hidden slides with collapsed dimensions.
Reveal.on('ready', function() {
  if (document.querySelectorAll('.mermaid').length === 0) return;

  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
  script.onload = initMermaid;
  script.onerror = function() {
    var fallback = document.createElement('script');
    fallback.src = 'js/mermaid.min.js';
    fallback.onload = initMermaid;
    document.head.appendChild(fallback);
  };
  document.head.appendChild(script);

  function initMermaid() {
    // "Ink & Ochre" mermaid theme — matches the slide design system
    // (paper ground, navy structure, Lato labels). See css/style.css tokens.
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      // Top-level fontFamily drives node-size MEASUREMENT. It must match the
      // font the labels RENDER in (Lato via themeVariables) or the boxes are
      // sized for a narrower font and the text is clipped.
      fontFamily: "'Lato','Helvetica Neue',Arial,sans-serif",
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,   // HTML labels are sized by the browser at the real
        curve: 'basis'      // font, so node boxes fit the text (no clipping)
      },
      securityLevel: 'loose', // required for htmlLabels foreignObject rendering
      themeVariables: {
        fontFamily: "'Lato','Helvetica Neue',Arial,sans-serif",
        fontSize: '18px',
        primaryColor: '#f2f1ec',        // node fill (panel)
        primaryTextColor: '#1d2733',    // node text (ink)
        primaryBorderColor: '#16202e',  // node border (navy)
        secondaryColor: '#eef0f3',
        secondaryTextColor: '#1d2733',
        secondaryBorderColor: '#16202e',
        tertiaryColor: '#ffffff',
        tertiaryTextColor: '#1d2733',
        tertiaryBorderColor: '#e7e5de',
        lineColor: '#3a4655',           // edges / arrows (navy-grey)
        mainBkg: '#f2f1ec',
        nodeBorder: '#16202e',
        clusterBkg: '#f7f6f2',
        clusterBorder: '#e7e5de',
        edgeLabelBackground: '#f7f6f2',
        titleColor: '#1d2733'
      }
    });

    // Store original mermaid source and mark as pending
    document.querySelectorAll('.mermaid').forEach(function(el) {
      el.setAttribute('data-mermaid-source', el.textContent);
      el.setAttribute('data-mermaid-pending', 'true');
    });

    // Render ALL diagrams once, after the web fonts load, with every slide
    // temporarily visible & untransformed. A mermaid diagram measures its text
    // against the live DOM, so rendering it on a hidden slide (0-size) or
    // mid-transition (the section carries a transform) lays the boxes out
    // wrong — which is why direct-load and navigated-to renders differed.
    // Doing it all up-front, in a stable state, makes every render identical
    // and means navigation never triggers a (mis-sized) re-render.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(renderAllStable);
    } else {
      renderAllStable();
    }
  }

  function renderAllStable() {
    var pending = Array.prototype.slice.call(
      document.querySelectorAll('.mermaid[data-mermaid-pending]'));
    if (pending.length === 0) return;

    var sections = document.querySelectorAll('.reveal .slides section');
    var origDisplay = [];
    sections.forEach(function (s) { origDisplay.push(s.style.display); s.style.display = 'block'; });

    // Neutralize reveal's fit-to-window scale during rendering. Mermaid measures
    // its HTML labels with getBoundingClientRect, which returns SCALED sizes —
    // so under a <1 scale it makes the boxes too small and the real text is
    // cropped. Measuring at scale 1 gives boxes that fit the text.
    var slidesEl = document.querySelector('.reveal .slides');
    var origTransform = slidesEl ? slidesEl.style.transform : '';
    if (slidesEl) slidesEl.style.transform = 'none';

    pending.forEach(function (el) {
      var source = el.getAttribute('data-mermaid-source');
      if (source) el.textContent = source;
      el.removeAttribute('data-mermaid-pending');
    });

    var restore = function () {
      sections.forEach(function (s, i) { s.style.display = origDisplay[i]; });
      if (slidesEl) slidesEl.style.transform = origTransform;
      if (Reveal.layout) Reveal.layout();
    };
    try {
      var p = mermaid.run({ nodes: pending });
      if (p && typeof p.then === 'function') p.then(restore, restore);
      else restore();
    } catch (e) { restore(); }
  }
});
