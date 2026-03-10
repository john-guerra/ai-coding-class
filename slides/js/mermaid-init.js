// Initialize Mermaid diagrams in reveal.js slides
// Renders all <pre class="mermaid"> blocks after Reveal is ready
Reveal.on('ready', function() {
  if (document.querySelectorAll('.mermaid').length === 0) return;

  var script = document.createElement('script');
  // Try local first (dev server), fall back to CDN (static build)
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
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis'
      },
      themeVariables: {
        fontSize: '18px'
      }
    });
    mermaid.run({ querySelector: '.mermaid' });
  }
});
