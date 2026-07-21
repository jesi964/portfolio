document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('blog-list');
  if (!list || typeof BLOG_POSTS === 'undefined') return;

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Render cards — each one is a real <a> pointing at the external post
  // (Medium, or wherever the full write-up lives). Using a native link
  // rather than a JS click handler means ctrl/cmd-click, middle-click,
  // "open in new tab", and screen readers all behave the way people
  // expect, for free.
  var sorted = BLOG_POSTS.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });

  sorted.forEach(function (post) {
    var hasLink = typeof post.link === 'string' && post.link.trim() !== '';

    var card = document.createElement('a');
    card.className = 'card blog-card';
    card.href = hasLink ? post.link : '#';
    if (hasLink) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    } else {
      // No link set yet for this post — keep the card inert instead of
      // pointing nowhere, so it's obvious in the data file needs finishing.
      card.setAttribute('aria-disabled', 'true');
      card.addEventListener('click', function (e) { e.preventDefault(); });
    }
    card.setAttribute('aria-label', 'Read "' + post.title + '" on ' + (hasLink ? 'its full post' : 'link not set yet'));

    var meta = document.createElement('div');
    meta.className = 'blog-card__meta';
    meta.textContent = formatDate(post.date);
    card.appendChild(meta);

    var h3 = document.createElement('h3');
    h3.textContent = post.title;
    card.appendChild(h3);

    var excerpt = document.createElement('p');
    excerpt.className = 'blog-card__excerpt';
    excerpt.textContent = post.excerpt;
    card.appendChild(excerpt);

    var tagRow = document.createElement('div');
    tagRow.className = 'tag-row';
    post.tags.forEach(function (t) {
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = t;
      tagRow.appendChild(tag);
    });
    card.appendChild(tagRow);

    var read = document.createElement('span');
    read.className = 'blog-card__read';
    read.textContent = hasLink ? 'Read more ↗' : 'Link coming soon';
    card.appendChild(read);

    list.appendChild(card);
  });
});