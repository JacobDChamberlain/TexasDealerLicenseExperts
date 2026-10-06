# Prerendering Plan (SEO step #3) — not started

Written 2026-10-06. Nothing in this plan has been implemented yet.

## Background

The client asked about SEO in October 2026. The work was split into three steps:

1. **Done:** `robots.txt`, `sitemap.xml`, and a meta description (commit `6af5df1`).
   The sitemap is submitted in Google Search Console, which was verified via a DNS TXT record in Netlify DNS.
2. **Done:** per-page titles and descriptions in English and Spanish, set by
   `src/components/layout/PageMeta.jsx` from the `meta.*` keys in the locale files (commit `0897d91`).
3. **This plan:** prerender each page to static HTML at build time.

Step 2 sets titles and descriptions with JavaScript after the page loads. Google
runs JavaScript and picks them up. Link previews (iMessage, Facebook, Slack) and
most other search engines don't, so they see the empty `index.html` shell and
homepage metadata for every page. Prerendering fixes that.

## What it does

At build time, each page is rendered to a real HTML file (`about.html`,
`faq.html`, …) with its own title, description, and full text already in it.
When a visitor loads the page, React takes over that existing HTML (hydration)
instead of building the page from an empty `<div>`. Visitors shouldn't notice any
difference. Crawlers and link previews get a complete page.

## How

The plan uses React's own server rendering, which is already installed. There are
**no new dependencies, no framework change, and no headless browser.**
`react-dom/server` and `StaticRouter` (exported by the installed
`react-router-dom` 7.14.2) are both already available.

1. **Split the entry point.** `src/main.jsx` becomes:
   - a browser entry that hydrates or renders (see the risks below), and
   - a build-time entry that exports `render(url)` using `StaticRouter`.

   `BrowserRouter` moves out of `App.jsx` into the browser entry.
2. **Add a prerender script** (`scripts/prerender.js`). `npm run build` becomes
   roughly `vite build && vite build --ssr <server entry> && node scripts/prerender.js`.
   For each of the 6 public pages plus `/thank-you`, the script renders the page into
   the built `dist/index.html` template and writes the result to `dist/`. Each
   page's `<head>` gets the following, taken from `meta.*` in `en.json`:
   - `<title>` and the meta description
   - a canonical URL
   - `og:title`, `og:description`, and `og:url`
   - `noindex`, on `/thank-you` only
3. **Keep a blank fallback page.** `netlify.toml` currently sends `/*` to
   `/index.html` with a 200 status. Once `index.html` is the prerendered homepage,
   unknown URLs would get homepage content. Instead, write an empty app shell
   (`dist/app-shell.html`) and point the catch-all redirect at it. Real pages are
   still served directly, because Netlify serves an existing file before applying
   redirect rules (as long as the redirect isn't `force`d).
4. **Update docs.** Update `CLAUDE.md` and `README.md` with the new build flow,
   the two entry points, and the `netlify.toml` change.

## Risks and how to handle them

| Risk | Handling |
|---|---|
| **Spanish visitors.** Pages are prerendered in English, but language is detected in the browser (`i18next-browser-languagedetector`). Hydrating English HTML with Spanish content causes a hydration mismatch. | The browser entry hydrates only when the detected language is `en` **and** `#root` has prerendered content. Otherwise it clears the root and uses `createRoot`, which is exactly what happens today. `SplashScreen` is part of the prerendered HTML and covers roughly the first 2.5 seconds, so a Spanish visitor won't see an English flash. |
| **Unknown URLs and the fallback shell** | Same rule. The root is empty, so the browser entry renders fresh instead of hydrating. |
| **Code that needs the browser** | Checked 2026-10-06. Every `window` / `document` / `IntersectionObserver` use (dock-on-scroll in `App.jsx`, `AnimateIn`, `PageMeta`) is inside `useEffect`, which doesn't run during server rendering. Nothing touches browser APIs at import time. Re-check this before starting, since new code may have been added. |
| **`AnimateIn` fade-ins.** Content starts at `opacity: 0` until it scrolls into view. | No change for visitors. The text is in the HTML, so crawlers read it. |
| **Trailing slashes on Netlify.** With `about/index.html`, `/about` can 301 to `/about/`, which wouldn't match the sitemap. | Write `about.html` (flat files) instead. This should serve `/about` with no redirect. **Confirm on a deploy preview before merging.** |
| **The contact form** | The form code doesn't change, but test a real submit end to end anyway. It's the site's one business function (see `CLAUDE.md`). |

## Testing before anything goes live

There's no staging environment, and pushing to `main` deploys to the live site.

1. Run `npm run lint` and `npm run build`. Inspect the generated HTML for every page:
   the content, title, description, canonical URL, and OG tags should all be there.
2. Run `npx netlify-cli serve`, which builds for production and serves it with Netlify's
   real redirects and functions. Then:
   - view source on each page to confirm the content and title are in the raw HTML
   - check the browser console for hydration warnings in English
   - toggle Spanish, and do a fresh load with the browser language set to Spanish
   - check the splash screen, the `FloatingBookNow` docking, and the FAQ accordions
   - load an unknown URL, which should show the app shell and render normally
   - submit the contact form. **This sends real emails to whatever `OWNER_EMAIL`
     is set to in the local `.env`.** Check which inbox that is first.
3. **Deploy preview:** push the work to a branch (not `main`) and open a PR. Netlify
   should build a preview URL. That depends on deploy previews being enabled, under
   Site configuration → Build & deploy. This is the only safe way to test
   the trailing-slash behavior on real Netlify. Re-run the checks above against it,
   and paste a page URL into a link-preview tester to confirm the OG tags.
4. Merge to `main` only after review and explicit sign-off.

**Rollback:** keep it to a single commit. If anything goes wrong live,
Netlify → Deploys → (previous deploy) → **Publish deploy** restores the old site
in seconds. Then `git revert` the commit.

## Open questions to answer before starting

1. Is it OK to push a branch (not `main`) to get a Netlify deploy preview?
2. Does the local `.env` `OWNER_EMAIL` point at Jacob's inbox or the client's?

## Out of scope (possible future work)

- **Separate Spanish URLs** (for example `/es/about`), so Google indexes the Spanish
  pages on their own. Today Spanish is just a toggle on the same URL. This is a
  bigger change, and only worth it if the client cares about Spanish search traffic.
- **A real 404 page.** Unknown URLs will still return the app shell with a 200
  status, same as today.
- **An OG share image** (`og:image`) for nicer link previews. This needs an image
  from the client.
