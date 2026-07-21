document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('scan-btn');
  var output = document.getElementById('scan-output');
  if (!btn || !output) return;

  var STEPS = [
    { text: 'scan --target=this-page --checks=owasp-top-10', prompt: true },
    { text: 'Checking for injection flaws...', result: 'clear' },
    { text: 'Checking access control...', result: 'clear' },
    { text: 'Checking for exposed secrets...', result: 'clear' },
    { text: 'Verifying Content-Security-Policy...', result: 'present' },
    { text: 'Checking for a friendly visitor...', result: 'found — hi! 👋' }
  ];

  function addLine(html, delay) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var line = document.createElement('div');
        line.className = 'scan-line';
        line.innerHTML = html;
        output.appendChild(line);
        resolve();
      }, delay);
    });
  }

  btn.addEventListener('click', function () {
    btn.disabled = true;
    btn.textContent = 'Scanning…';
    output.innerHTML = '';

    var chain = Promise.resolve();
    STEPS.forEach(function (step) {
      chain = chain.then(function () {
        if (step.prompt) {
          return addLine('<span class="dim">$</span> ' + escapeHTML(step.text), 250);
        }
        return addLine(escapeHTML(step.text) + ' <span class="ok">[' + escapeHTML(step.result) + ']</span>', 420);
      });
    });

    chain.then(function () {
      return addLine('✔ Scan complete — 0 real vulnerabilities found. Thanks for stopping by.', 500);
    }).then(function () {
      var last = output.lastElementChild;
      if (last) last.classList.add('scan-line--final');
      btn.disabled = false;
      btn.textContent = 'Run again';
    });
  });
});
