// Auto-add fragments to all list items (top-level only)
// This makes bullets appear one at a time by default
Reveal.on('ready', function() {
  document.querySelectorAll('.reveal section > ul > li, .reveal section > ol > li').forEach(function(li) {
    li.classList.add('fragment');
  });
});
