document.addEventListener('DOMContentLoaded', function () {
  var pet = document.getElementById('pet-cat');
  var bubble = document.getElementById('pet-bubble');
  if (!pet || !bubble) return;

  var LINES = [
    "hi, I'm Neko 🐾",
    "0 bugs found in this cat",
    "meow-factor authentication: on",
    "I sniff out vulnerabilities. And tuna.",
    "patch your dependencies, human"
  ];

  var hideTimer = null;
  var lastIndex = -1;

  pet.addEventListener('click', function () {
    var idx = Math.floor(Math.random() * LINES.length);
    if (idx === lastIndex) idx = (idx + 1) % LINES.length;
    lastIndex = idx;

    bubble.textContent = LINES[idx];
    bubble.classList.add('is-visible');
    pet.classList.remove('pet--bounce');
    // restart the bounce animation
    void pet.offsetWidth;
    pet.classList.add('pet--bounce');

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      bubble.classList.remove('is-visible');
    }, 2600);
  });
});
