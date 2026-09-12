# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx netlify-cli dev     # dev server — use this, not `npm run dev`
npm run build           # vite build -> dist/
npm run lint            # eslint (must pass clean; the repo currently has zero warnings)
npm run preview         # serve the production build locally
```

**`npm run dev` (plain Vite) will not serve `/.netlify/functions/*`.** The contact
form's submit will fail silently against it. Any work touching the form or the
email function must be tested under `npx netlify-cli dev`, which also loads `.env`.
The Netlify CLI is not installed globally here — `npx` fetches it.

Local `.env` needs `RESEND_API_KEY`, `FROM_EMAIL`, `OWNER_EMAIL` (see `.env.example`).

There is no test suite — no test runner is installed and no test files exist.
Verification is `npm run lint`, `npm run build`, and clicking through the flow
under `netlify dev`.

## Deployment

`main` auto-deploys to production at https://dealerlicensepros.com via Netlify.
**There is no staging environment.** A push to `main` is a live release on a
paying client's site. Only push when explicitly asked.

To confirm a deploy actually landed, compare the local bundle filename in
`dist/assets/` against the one the live `index.html` references:

```bash
curl -s https://dealerlicensepros.com/ | grep -o 'assets/index-[A-Za-z0-9_-]*\.js'
```

Note that `netlify.toml` redirects `/*` to `/index.html` with status 200 (SPA
routing), so **any unknown path returns 200 with the HTML shell** — including
`/.netlify/functions/<name>` for a function that does not exist. A 200 there
means "not found"; a deployed function returns its own status (e.g. 405 to a GET).

## Architecture

A React 19 + Vite SPA whose entire purpose is a single lead-capture funnel:

```
/ (Landing) → /get-started (single free-consult card)
            → /contact (branching form)
            → POST /.netlify/functions/send-consult-request
                 ├─ owner notification (all answers, replyTo = visitor)
                 └─ visitor confirmation
            → /thank-you
```

There is no database and no backend beyond one Netlify Function. A submitted
lead exists only as the two emails that function sends — nothing is persisted.
That makes `send-consult-request.cjs` the single point of failure for the site's
one business purpose; treat changes to it accordingly.

### All user-facing copy lives in `src/locales/{en,es}.json`

Components contain no hardcoded display strings — everything renders through
`t('some.key')`. When adding UI, add the key to **both** locale files. The two
files must stay key-for-key identical; a key present in one and missing from the
other ships a raw key string to users in that language. To check parity:

```bash
node -e "
const fs=require('fs');
const flat=(o,p='')=>Object.entries(o).flatMap(([k,v])=>
  v&&typeof v==='object'&&!Array.isArray(v)?flat(v,p+k+'.'):[p+k]);
const en=flat(JSON.parse(fs.readFileSync('src/locales/en.json')));
const es=flat(JSON.parse(fs.readFileSync('src/locales/es.json')));
console.log('missing in es:', en.filter(k=>!es.includes(k)).join()||'none');
console.log('missing in en:', es.filter(k=>!en.includes(k)).join()||'none');
"
```

Deleting a feature means deleting its keys from both files too — orphaned keys
have accumulated here before.

### Spanish keeps the English word "dealer"

Standing client requirement: never translate "dealer" to "concesionario" /
"concesionaria" / "distribuidor" in `es.json`, including inflected and plural
forms ("dealers", "dueños de dealers"). This has been reverted by the client
twice. Guard with `grep -i "concesionari\|distribuidor" src/locales/es.json`.

### The contact form's branching is duplicated client- and server-side

`src/pages/Contact.jsx` picks required fields from `dealerType` (`'new'` vs
`'established'`) and submits **only that branch's fields**. `send-consult-request.cjs`
independently re-derives the same branch to validate and to build the email rows.

**These two lists must be changed together.** Adding a question to one branch in
the UI without adding it to the function means the answer is silently dropped
from the owner's email — the submit still succeeds, so nothing surfaces the bug.
Client-side `required` attributes are not trusted; the function re-validates.

### Layout offsets are hand-tuned, not computed

`Navbar` (fixed, `h-14`) and `SecondaryNav` (fixed, `top-14 h-10`) are both
fixed-position, so `<main>` carries a matching `pt-24` in `App.jsx`. Changing
either nav's height means updating that padding by hand.

`FloatingBookNow` renders twice — a fixed overlay and an in-flow copy — and
`App.jsx` swaps between them on scroll so the button appears to dock at the page
bottom. Both copies must stay rendered for the space reservation to work.

## Repository notes

- `PLAN.md` is a historical build plan from April 2026. It describes the old
  two-path model (free webinar + paid $275 Stripe consultation) and the former
  brand name, none of which exist any more. Do not treat it as current.
- `README.md` **is** maintained and is the source of truth for stack, routes,
  flow, env vars, and known gaps.
- The Stripe integration and webinar flow were removed in September 2026 when
  consultations became free. Recoverable from git history if ever needed.
- `gdn.*` keys exist in both locale files but nothing renders them — placeholder
  content awaiting client copy, not dead code to clean up.
