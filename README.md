# Jessica Shrestha — Portfolio

A static, dependency-light portfolio site: About, Projects, Certifications,
Achievements, Blog, and Contact, with a light/dark theme toggle.

## Before you publish

Search and replace these placeholders throughout the HTML/JS files:
- `your-username` → your real GitHub and LinkedIn handles
- `yourdomain.com` → your real domain (in `robots.txt` and `sitemap.xml`)
- All "Replace with..." copy in each page and in `js/blog-data.js`

## Running it locally

Any static file server works, for example:
```
cd portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000`. Opening `index.html` directly via
`file://` also works, but a local server is closer to production.

## Homepage interactive touches

- **Terminal (`js/terminal.js`)** — plays a scripted, typed-out sequence
  (`whoami` → `cat roles.txt` → `cat focus.txt` → `status --check`) when it
  scrolls into view, and replays on click or Enter/Space. Edit the
  `SEQUENCE` array in that file to change the commands or answers.
- **Pet mascot (`js/pet.js`)** — "Byte" the cat, sitting next to the
  terminal. Click it for a random one-liner; edit the `LINES` array to
  write your own.

## Adding a blog post

Open `js/blog-data.js` and add an object to the `BLOG_POSTS` array — no
backend, database, or build step needed. Posts render as plain text (never
raw HTML), which is a deliberate XSS-prevention choice: even if this file
were ever generated from an external source, malicious markup in a post
couldn't execute as code.

## Deploying

Recommended: **Netlify** or **Cloudflare Pages** (drag-and-drop the
`portfolio` folder, or connect a GitHub repo). Both read the `_headers`
file automatically and give you free HTTPS.

**GitHub Pages** works too, but cannot set custom HTTP headers, so the
protections in `_headers` (clickjacking protection, MIME-sniffing
protection, HSTS) won't apply — only the CSP `<meta>` tag in each page
will. If you use GitHub Pages, treat this as a known trade-off, not a bug.

If you'd rather use a contact form again in the future, you'd need to
reintroduce a `<form>` and connect it to a backend like **Formspree** or
**Getform** (this static site has no server of its own to receive
submissions), and add that service's domain to `connect-src`/`form-action`
in the CSP meta tag on `contact.html`.

## Security measures built in (mapped to OWASP Top 10 relevance)

- **Injection / XSS** — All dynamic content (blog posts, nav state) is
  rendered with `textContent`/DOM APIs, never `innerHTML` with untrusted
  strings. `escapeHTML()` in `main.js` is available for anywhere that
  changes later.
- **Security misconfiguration** — A restrictive Content-Security-Policy is
  set on every page (`default-src 'self'`, no inline scripts, no unknown
  origins). `_headers` adds `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Strict-Transport-Security`, and a locked-down
  `Permissions-Policy` — set these at your host, since a `<meta>` tag can't
  cover all of them.
- **Clickjacking** — `frame-ancestors 'none'` in the CSP plus
  `X-Frame-Options: DENY` in `_headers`.
- **Tabnabbing** — every external link (GitHub, LinkedIn) uses
  `rel="noopener noreferrer"`.
- **Contact page** — no form, so no submission data is ever collected or
  stored; it's just two outbound links (GitHub, LinkedIn), both using
  `rel="noopener noreferrer"`.
- **Sensitive data exposure** — no API keys, secrets, or personal contact
  details are hardcoded anywhere in this site.
- **Scraping / aggressive crawling** — `robots.txt` allows real search
  engines (so people can still find the portfolio) but disallows known
  high-volume SEO/scraper bots. True bot-blocking (rate limiting by IP,
  JS challenges) needs a layer static hosting doesn't provide — Cloudflare
  in front of the site is the usual way to add that if it becomes a
  problem.
- **Dependencies** — zero third-party JS libraries or CDNs are loaded, only
  Google Fonts CSS (fonts only, no executable code), which minimizes
  supply-chain risk from compromised packages.

## What this site *can't* protect against on its own

This is a static site with no server-side code, which is actually a
security advantage — there's no database to inject into and no server
process to exploit. Contact happens through the GitHub/LinkedIn links on
the Contact page rather than a form, so there's no submission data to
secure or store in the first place.
