// Slide overflow detection dev tool
// Activate with: Shift+O on any slide deck, or ?overflow before the hash
// Usage: press Shift+O to toggle red outlines on overflowing slides
var _overflowCheck = /[?&]overflow/.test(window.location.search);
var _overflowActive = false;

function checkOverflow() {
  var configHeight = Reveal.getConfig().height;
  var slides = Reveal.getSlides();

  // Temporarily make all slides visible for measurement
  // (Reveal.js hides non-active slides with display:none)
  var allSections = document.querySelectorAll('.reveal .slides section');
  var origDisplay = [];
  allSections.forEach(function (s) {
    origDisplay.push(s.style.display);
    s.style.display = 'block';
  });

  var results = [];
  slides.forEach(function (slide) {
    var overflow = slide.scrollHeight - configHeight;
    if (overflow > 0) {
      slide.style.outline = '3px solid red';
      slide.style.outlineOffset = '-3px';
      slide.style.background = 'rgba(255, 0, 0, 0.05)';

      var indices = Reveal.getIndices(slide);
      var heading = slide.querySelector('h1, h2, h3, h4, h5, h6');
      results.push({
        h: indices.h,
        v: indices.v,
        overflow_px: overflow,
        heading: heading ? heading.textContent.trim() : '(no heading)',
      });
    }
  });

  // Restore original display values
  allSections.forEach(function (s, i) {
    s.style.display = origDisplay[i];
  });

  if (results.length > 0) {
    console.warn(
      'Overflow detected on ' +
        results.length +
        '/' +
        slides.length +
        ' slides:'
    );
    console.table(results);
  } else {
    console.log('No overflow detected on any of ' + slides.length + ' slides.');
  }
  _overflowActive = true;
}

// Detect markdown tables that failed to parse and leaked into the slide as
// raw "| ... |" text. The usual cause is column-aligned tables: reveal-md
// collapses the long internal space runs into newlines, which splits a table
// row across lines and invalidates the whole table. Fix = compact rows
// ("| a | b |", single spaces). A left-over delimiter row (| --- |) in a slide
// with no <table> is the reliable signature.
function checkBrokenTables(mark) {
  var broken = [];
  Reveal.getSlides().forEach(function (slide) {
    if (slide.querySelector('table')) return;
    if (/\|\s*:?-{2,}:?\s*\|/.test(slide.textContent || '')) {
      var indices = Reveal.getIndices(slide);
      var heading = slide.querySelector('h1, h2, h3, h4');
      broken.push({
        h: indices.h,
        v: indices.v,
        heading: heading ? heading.textContent.trim() : '(no heading)',
      });
      if (mark) {
        slide.style.outline = '3px dashed #f5811f';
        slide.style.outlineOffset = '-3px';
      }
    }
  });
  if (broken.length > 0) {
    console.warn(
      'BROKEN TABLE(S): markdown table rendered as raw text on ' +
        broken.length +
        ' slide(s). Cause: column-aligned padding breaks reveal-md table ' +
        'parsing — use compact "| a | b |" rows (see CLAUDE.md).'
    );
    console.table(broken);
  }
  return broken;
}

function clearOverflow() {
  Reveal.getSlides().forEach(function (slide) {
    slide.style.outline = '';
    slide.style.outlineOffset = '';
    slide.style.background = '';
  });
  console.log('Overflow markers cleared.');
  _overflowActive = false;
}

Reveal.on('ready', function () {
  // Always scan for broken (unparsed) markdown tables — cheap and high-signal.
  checkBrokenTables(_overflowCheck);

  // Auto-run if ?overflow is in the query string
  if (_overflowCheck) checkOverflow();

  // Toggle with Shift+O
  document.addEventListener('keydown', function (e) {
    if (e.shiftKey && e.key === 'O') {
      if (_overflowActive) {
        clearOverflow();
      } else {
        checkOverflow();
      }
    }
  });
});
