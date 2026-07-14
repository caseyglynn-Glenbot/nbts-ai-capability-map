# NBTS Internal Portal

Serves internal HTML pages behind HTTP Basic Auth.

**Live pages**
- `/capability-map` — NBTS AI Platform capability map

---

## Why a web service and not a static site

The install-base landing page could be a static site because its *data* lives
behind the n8n API — the page itself is just a shell, and the login gate
protects the endpoint.

These pages are the opposite: **the content is the file**. Colleague names,
volume estimates, roadmap. A JavaScript login gate on a static host would be
theater — the HTML ships to the browser regardless, and anyone can read it with
`curl` or View Source.

This app enforces auth **server-side**. An unauthenticated request gets a 401
and zero bytes of content.

```
unauthenticated  ->  401, 74 bytes (error string only)
wrong password   ->  401
correct creds    ->  200, full page
```

---

## Adding a page

1. Drop an `.html` file into `pages/`
2. Commit and push

That's it. Render redeploys, and the page:
- appears on the portal index automatically (title read from its `<title>` tag)
- is protected by the same credentials
- is reachable at `/<filename-without-extension>`

No code changes, no config, no new deploy target.

---

## Deploy to Render

**This is a Web Service, not a Static Site** (it needs to run code to check auth).

1. Push this folder to a GitHub repo (e.g. `caseyglynn-Glenbot/nbts-portal`)
2. Render → **New** → **Web Service** → connect the repo
3. Settings:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Environment** → add two variables:

   | Key | Value |
   |---|---|
   | `PORTAL_USER` | `NBTS` |
   | `PORTAL_PASS` | `Glenbot` |

5. Create Web Service.

The app **refuses to start** if those env vars are missing — it will not
accidentally come up unprotected.

### Plan choice

`render.yaml` specifies `plan: starter` (~$7/mo, always on).

The **free** plan works but spins down after ~15 min of inactivity, so the first
visitor waits ~50 seconds for a cold start. For a link you're sending to Patrick
or Eddie, that's a bad first impression. Change `plan: free` in `render.yaml` if
you'd rather not pay.

---

## Changing the password

Render dashboard → service → **Environment** → edit `PORTAL_PASS` → save.
The service restarts automatically. No code change, no redeploy from git.

Credentials are **never** stored in this repo.

---

## Security notes

- Auth is HTTP Basic over HTTPS (Render terminates TLS). The browser shows its
  native sign-in prompt and remembers it for the session.
- Pages are sent with `no-store` and `noindex, nofollow` — they won't be cached
  by proxies or indexed by search engines.
- Path traversal is blocked (slug must match `^[a-zA-Z0-9_-]+$`, and the
  resolved path is verified to stay inside `pages/`).
- Basic Auth is a **shared** credential — it identifies the group, not the
  individual. There's no per-user audit trail. If you ever need to know *who*
  viewed what, that's the point to move to Entra ID / Azure SSO.
