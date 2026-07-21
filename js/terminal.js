document.addEventListener('DOMContentLoaded', function () {
  var terminal = document.getElementById('hero-terminal');
  var output = document.getElementById('hero-terminal-output');
  if (!terminal || !output) return;

  var SEQUENCE = [
    { cmd: 'whoami', result: 'jessica shrestha' },
    { cmd: 'cat roles.txt', result: 'Security Researcher' },
    { cmd: 'status --check', result: '[OK] all systems secure', isStatus: true }
  ];

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var running = false;

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function typeLine(text) {
    return new Promise(function (resolve) {
      var line = document.createElement('div');
      var prompt = document.createElement('span');
      prompt.className = 'dim';
      prompt.textContent = '$ ';
      var typed = document.createElement('span');
      line.appendChild(prompt);
      line.appendChild(typed);
      output.appendChild(line);

      if (reduceMotion) {
        typed.textContent = text;
        resolve();
        return;
      }

      var i = 0;
      var iv = setInterval(function () {
        typed.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) {
          clearInterval(iv);
          resolve();
        }
      }, 38);
    });
  }

  function showResult(text, isStatus) {
    return new Promise(function (resolve) {
      var line = document.createElement('div');
      line.className = 'scan-line';
      if (isStatus) {
        var ok = document.createElement('span');
        ok.className = 'accent';
        ok.textContent = '[OK]';
        line.appendChild(document.createTextNode(''));
        line.appendChild(ok);
        line.appendChild(document.createTextNode(text.replace('[OK]', '')));
      } else {
        line.textContent = text;
      }
      var caret = document.createElement('span');
      caret.className = 'caret';
      line.appendChild(caret);
      output.appendChild(line);
      setTimeout(function () {
        caret.remove();
        resolve();
      }, 550);
    });
  }

  function runSequence() {
    if (running) return;
    running = true;
    output.innerHTML = '';

    var chain = Promise.resolve();
    SEQUENCE.forEach(function (step, idx) {
      chain = chain
        .then(function () { return wait(idx === 0 ? 300 : 260); })
        .then(function () { return typeLine(step.cmd); })
        .then(function () { return wait(160); })
        .then(function () { return showResult(step.result, step.isStatus); });
    });
    chain.then(function () { running = false; });
  }

  terminal.addEventListener('click', runSequence);
  terminal.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); runSequence(); }
  });

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runSequence();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(terminal);
  } else {
    runSequence();
  }
});
