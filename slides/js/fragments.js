// Auto-add fragments to top-level block elements
// Excludes: title slide (#title) and section divider slides (h1-only)
Reveal.on('ready', function() {
  document.querySelectorAll('.reveal section').forEach(function(section) {
    // Skip the title slide
    if (section.id === 'title') return;
    // Skip section divider slides (have h1 but no h2-h6)
    if (section.querySelector('h1') && !section.querySelector('h2, h3, h4, h5, h6')) return;

    section.querySelectorAll(
      ':scope > ul > li, :scope > ol > li, :scope > p, ' +
      ':scope > table, :scope > blockquote, :scope > small, ' +
      ':scope > pre:not(.mermaid)'
    ).forEach(function(el) {
      el.classList.add('fragment');
    });
  });
});
