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
        htmlLabels: false,  // pure SVG text scales cleanly with the viewBox
        curve: 'basis'
      },
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

  // Render each diagram with the low-level mermaid.render(): it lays out the
  // SVG in mermaid's OWN off-DOM sandbox (on <body>, never inside reveal's
  // transform-scaled .slides), so text is always measured at scale 1. We then
  // inject the finished SVG, which — being pure SVG text — scales cleanly with
  // reveal's zoom without re-measuring or cropping. Scale-independent and
  // identical whether the slide was direct-loaded or navigated to.
  var seq = 0;
  function renderAllStable() {
    var pending = Array.prototype.slice.call(
      document.querySelectorAll('.mermaid[data-mermaid-pending]'));
    pending.forEach(function (el) {
      el.removeAttribute('data-mermaid-pending');
      var source = el.getAttribute('data-mermaid-source') || el.textContent;
      var id = 'mmd-' + (seq++);
      try {
        Promise.resolve(mermaid.render(id, source)).then(function (res) {
          el.innerHTML = res.svg;
          if (res.bindFunctions) res.bindFunctions(el);
        }).catch(function () {});
      } catch (e) { /* leave source text as fallback */ }
    });
  }
});
