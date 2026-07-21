/* ---------------------------------------------------------
   BLOG POSTS
   To publish a new post: add an object to this array.
   No backend needed — this is a static site, so posts are
   plain data, never raw HTML, which is what keeps the blog
   XSS-safe (see js/blog.js — everything renders via
   textContent, never innerHTML with this content).

   fields:
     id       - unique slug, used for #anchors
     title    - post title
     date     - "YYYY-MM-DD"
     tags     - array of short strings
     excerpt  - 1-2 sentence summary for the card
     body     - array of paragraph strings (plain text, no HTML)
--------------------------------------------------------- */
const BLOG_POSTS = [
  {
    id: "owasp-top-10-for-beginners",
    title: "Kerberos authentication: A beginner's guide",
    date: "2025-07-16",
    tags: ["kerberos", "authentication", "security"],
    excerpt: "A beginner-friendly overview of Kerberos authentication, how it works, and why it's important for secure systems.",
    link: "https://medium.com/@jessistha2/kerberos-authentication-a878e333491d"
  },
 
  {
    id: "setting-up-a-home-lab",
    title: "Basic Active Directory Domain Service Virtual Lab",
    date: "2025-08-20",
    tags: ["homelab", "learning"],
    excerpt: "Notes on setting up a basic Active Directory Domain Service virtual lab for learning and testing purposes.",
    link: "https://medium.com/@jessistha2/basic-active-directory-domain-service-virtual-lab-bc0e4aa8a8ca"
    },
  {
    id: "first-ctf-writeup",
    title: "Python project: Rental management system",
    date: "2025-09-01",
    tags: ["project", "python"],
    excerpt: "A writeup of my first Python project: a rental management system.",
    link: "https://medium.com/@jessistha2/python-project-rental-management-system-1a8ad67e1f4a"
  }
];
