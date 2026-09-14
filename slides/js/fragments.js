// Auto-add fragments to top-level block elements
// Excludes: title slide (#title) and section divider slides
//
// A divider is an h1 slide whose body is at most a single subtitle line --
// the `# Title` + `> subtitle` pattern used between course sections.
// This is deliberately NOT "h1 with no h2": plenty of real content slides
// ("What We'll Cover Today", "Resources", "What to Remember") are h1-titled,
// and that older rule silently skipped every one of them.
Reveal.on('ready', function() {
  var FRAGMENTS =
    ':scope > ul > li, :scope > ol > li, :scope > p, ' +
    ':scope > table, :scope > blockquote, :scope > small, ' +
    ':scope > pre:not(.mermaid)';

  // Any block that counts as slide body when deciding "is this a divider?"
  var BLOCKS =
    ':scope > ul, :scope > ol, :scope > p, :scope > table, ' +
    ':scope > blockquote, :scope > small, :scope > pre, ' +
    ':scope > div, :scope > img, :scope > figure';

  document.querySelectorAll('.reveal section').forEach(function(section) {
    // Skip the title slide
    if (section.id === 'title') return;
    // Skip vertical stack wrappers; their child sections are visited on their own
    if (section.querySelector('section')) return;

    if (section.querySelector('h1')) {
      var blocks = section.querySelectorAll(BLOCKS);
      // Title only, or title plus a single subtitle line => section divider
      if (blocks.length === 0) return;
      if (blocks.length === 1 && /^(BLOCKQUOTE|P)$/.test(blocks[0].tagName)) return;
    }

    section.querySelectorAll(FRAGMENTS).forEach(function(el) {
      el.classList.add('fragment');
    });
  });
});
