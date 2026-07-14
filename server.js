/**
 * NBTS Internal Portal
 * --------------------
 * Serves internal HTML pages behind HTTP Basic Auth.
 *
 * The important property: auth is enforced SERVER-SIDE. An unauthenticated
 * request gets a 401 and zero bytes of page content — unlike a static site
 * with a JS login gate, where the content ships in the source regardless.
 *
 * To add a page: drop an .html file in ./pages/ and push. That's it.
 * It appears on the index and is protected automatically.
 *
 * Credentials come from env vars (PORTAL_USER / PORTAL_PASS), never from
 * this file. Set them in the Render dashboard.
 */

const express = require("express");
const basicAuth = require("express-basic-auth");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const PAGES_DIR = path.join(__dirname, "pages");

const USER = process.env.PORTAL_USER;
const PASS = process.env.PORTAL_PASS;

if (!USER || !PASS) {
  console.error("FATAL: PORTAL_USER and PORTAL_PASS must be set. Refusing to start unprotected.");
  process.exit(1);
}

app.disable("x-powered-by");

// Never let internal pages be cached by a shared proxy or indexed.
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, private");
  res.set("X-Robots-Tag", "noindex, nofollow");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("X-Frame-Options", "SAMEORIGIN");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// --- Auth gate. Everything below this line requires credentials. ---
app.use(
  basicAuth({
    users: { [USER]: PASS },
    challenge: true, // makes the browser show its native sign-in prompt
    realm: "NBTS Internal Portal",
    unauthorizedResponse: () =>
      "401 Unauthorized — NBTS Internal Portal. Contact Casey Glynn for access.",
  })
);

/** Turn "capability-map.html" into "Capability Map". */
function prettify(file) {
  return file
    .replace(/\.html$/i, "")
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function listPages() {
  if (!fs.existsSync(PAGES_DIR)) return [];
  return fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.toLowerCase().endsWith(".html"))
    .sort()
    .map((f) => {
      const full = path.join(PAGES_DIR, f);
      let title = prettify(f);
      try {
        const head = fs.readFileSync(full, "utf8").slice(0, 4000);
        const m = head.match(/<title>([^<]+)<\/title>/i);
        if (m) title = m[1].trim();
      } catch (_) {}
      return {
        slug: f.replace(/\.html$/i, ""),
        title,
        updated: fs.statSync(full).mtime,
      };
    });
}

// --- Index ---
app.get("/", (req, res) => {
  const pages = listPages();
  const items = pages.length
    ? pages
        .map(
          (p) => `
      <a class="card" href="/${encodeURIComponent(p.slug)}">
        <span class="t">${escapeHtml(p.title)}</span>
        <span class="m">Updated ${p.updated.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}</span>
      </a>`
        )
        .join("")
    : `<p class="empty">No pages yet. Drop an .html file into <code>pages/</code> and push.</p>`;

  res.type("html").send(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>NBTS Internal Portal</title>
<style>
  :root{--navy:#1B3A5C;--teal:#1B6E8C;--orange:#E0922F;--ink:#213547;--muted:#5A6B78;--line:#E2E8ED;--bg:#F4F6F8}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;line-height:1.5}
  header{background:var(--navy);color:#fff;border-bottom:4px solid var(--orange)}
  .in{max-width:860px;margin:0 auto;padding:0 20px}
  header .in{padding-top:32px;padding-bottom:28px}
  .eyebrow{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#8FB8CC;margin:0 0 10px}
  h1{margin:0 0 8px;font-size:34px;font-weight:800;letter-spacing:-.01em}
  header p{margin:0;color:#C7D6E0;font-size:15px}
  main{padding:34px 0 70px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .card{display:flex;flex-direction:column;gap:5px;background:#fff;border-radius:8px;
    padding:18px 20px;border-left:4px solid var(--teal);text-decoration:none;color:inherit;
    box-shadow:0 1px 2px rgba(21,47,74,.06),0 8px 24px rgba(21,47,74,.06);transition:transform .12s,border-color .12s}
  .card:hover{transform:translateY(-2px);border-left-color:var(--orange)}
  .card .t{font-weight:700;font-size:16px;color:var(--navy)}
  .card .m{font-size:13px;color:var(--muted)}
  .empty{color:var(--muted)}
  code{background:#EAEFF3;padding:2px 6px;border-radius:4px;font-size:13px}
  footer{border-top:1px solid var(--line);padding:18px 0;color:var(--muted);font-size:13px}
  @media(max-width:640px){.grid{grid-template-columns:1fr}h1{font-size:27px}}
</style></head>
<body>
<header><div class="in">
  <p class="eyebrow">NBTS AI Platform</p>
  <h1>Internal Portal</h1>
  <p>Internal documentation and platform maps. Xylem D&amp;A — Neptune Benson Technical Support.</p>
</div></header>
<main><div class="in"><div class="grid">${items}</div></div></main>
<footer><div class="in">Signed in as <b>${escapeHtml(req.auth.user)}</b> · Internal use only — do not share outside Xylem.</div></footer>
</body></html>`);
});

// --- Serve a page by slug ---
app.get("/:slug", (req, res, next) => {
  const slug = req.params.slug;

  // Reject anything that isn't a plain slug (blocks ../ traversal).
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) return next();

  const file = path.join(PAGES_DIR, slug + ".html");
  const resolved = path.resolve(file);
  if (!resolved.startsWith(path.resolve(PAGES_DIR))) return next();
  if (!fs.existsSync(resolved)) return next();

  res.type("html").sendFile(resolved);
});

app.use((req, res) => {
  res.status(404).type("html").send(
    `<div style="font-family:system-ui;max-width:520px;margin:80px auto;padding:0 20px;color:#213547">
       <h1 style="color:#1B3A5C">Page not found</h1>
       <p style="color:#5A6B78">That page isn't in the portal. <a href="/" style="color:#1B6E8C">Back to the index</a>.</p>
     </div>`
  );
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

app.listen(PORT, () => console.log(`NBTS Internal Portal listening on ${PORT}`));
