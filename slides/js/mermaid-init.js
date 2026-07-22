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
      flowchart: {
        useMaxWidth: false,
        htmlLabels: false,
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

    // Render mermaid blocks on the current slide
    renderCurrentSlide();

    // Re-render on slide change
    Reveal.on('slidechanged', renderCurrentSlide);
  }

  function renderCurrentSlide() {
    var currentSlide = Reveal.getCurrentSlide();
    if (!currentSlide) return;

    var pending = currentSlide.querySelectorAll('.mermaid[data-mermaid-pending]');
    if (pending.length === 0) return;

    // Restore source text for pending diagrams (mermaid may have cleared it)
    pending.forEach(function(el) {
      var source = el.getAttribute('data-mermaid-source');
      if (source) el.textContent = source;
      el.removeAttribute('data-mermaid-pending');
    });

    mermaid.run({ nodes: Array.from(pending) });
  }
});
