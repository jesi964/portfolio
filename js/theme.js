/* Theme handling — runs before paint via inline snippet in <head>,
   this file wires up the toggle button on each page. */
(function () {
  function getStoredTheme() {
    try { return localStorage.getItem('jsr-theme'); } catch (e) { return null; }
  }
  function storeTheme(value) {
    try { localStorage.setItem('jsr-theme', value); } catch (e) { /* storage unavailable, ignore */ }
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var switchEl = document.querySelector('.theme-switch');
    if (switchEl) switchEl.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    var label = document.querySelector('.theme-switch__label');
    if (label) label.textContent = theme === 'dark' ? 'DARK' : 'LIGHT';
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Dark is the default. Only override it if the visitor previously
    // chose a theme themselves (stored from a click on the toggle).
    var stored = getStoredTheme();
    var current = stored || document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current);

    var toggle = document.querySelector('.theme-switch');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        storeTheme(next);
      });
      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle.click();
        }
      });
    }
  });
})();
