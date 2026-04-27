# Texas Dealer License Experts — Website Build Plan

## What We're Building

A 7-page, mobile-first marketing and booking website for a dealer licensing consulting business. The site guides visitors from awareness → CTA → contact capture → payment (consultation path) or webinar registration (free path). No traditional backend — payment and email logic handled via serverless functions deployed alongside the frontend.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Vite + React | Fast dev, small bundle, great ecosystem |
| Styling | Tailwind CSS | Mobile-first, utility-first, easy to maintain |
| Routing | React Router v6 | Client-side SPA routing |
| Payments | Stripe (Payment Element) | Industry standard, handles PCI compliance |
| Emails | Resend | Simple API, great deliverability, free tier |
| Hosting | Netlify | Free tier, serverless functions, easy deploys |
| Serverless | Netlify Functions | Stripe webhook + email sending (2 small functions) |

---

## Pages & User Flows

```
Landing (/) → FAQ (/faq)
            → Success Stories (/success-stories)
            → CTA (/get-started)
                 ├─ Webinar path  → Contact Form (/contact?path=webinar)  → Thank You (/thank-you?path=webinar)
                 └─ Consultation  → Contact Form (/contact?path=consult)  → Book & Pay (/book) → Thank You (/thank-you?path=consult)
```

### Page Summaries

1. **Landing (`/`)** — Hero, value prop, nav to other pages
2. **FAQ (`/faq`)** — Accordion-style Q&A
3. **Success Stories (`/success-stories`)** — Testimonials / case studies
4. **CTA (`/get-started`)** — Two-option card: Free Webinar vs. Paid Consultation
5. **Contact Form (`/contact`)** — Name, email, phone, optional message; both paths land here; path stored in state/query param
6. **Book & Pay (`/book`)** — Consultation path only; Stripe Payment Element embedded; on success → owner email + customer confirmation email
7. **Thank You (`/thank-you`)** — Shown after webinar signup OR successful payment; messaging varies by path

---

## Email Behavior

| Trigger | Email to Owner | Email to Customer |
|---|---|---|
| Webinar signup (form submit) | `[WEBINAR SIGNUP] Name — email` + their details | Confirmation with webinar date info |
| Consultation payment success | `[PAID CONSULTATION] Name — email` + their details | Payment confirmation + next steps |

Subject line prefix (`[WEBINAR SIGNUP]` vs `[PAID CONSULTATION]`) makes owner inbox triage obvious.

Emails sent via **Resend API** called from Netlify serverless functions:
- `netlify/functions/send-webinar-email.js` — triggered on webinar form submit
- `netlify/functions/stripe-webhook.js` — listens for `payment_intent.succeeded`, then sends both emails

---

## Deferred / Future Items

- **Custom domain email** (`info@[domain].com`) — set up once domain is chosen; Resend supports custom sending domains easily
- **Owner's graphics/assets** — drop into `/src/assets/` as they arrive; components already have placeholder slots
- **Webinar dates** — hardcoded or stored in a simple config file (`src/config/webinars.js`) for easy updating

---

## Build Steps

- [ ] **Step 1 — Project scaffold** — `npm create vite`, install Tailwind, React Router, set up folder structure and base layout
- [ ] **Step 2 — Routing & shell** — All 7 routes wired up with placeholder pages, shared nav/footer
- [ ] **Step 3 — Static pages** — Build Landing, FAQ, Success Stories (content + layout, asset placeholders)
- [ ] **Step 4 — CTA & Contact Form** — Two-path CTA card, contact form with path-aware state passing
- [ ] **Step 5 — Stripe integration** — Payment Element on `/book`, test mode first
- [ ] **Step 6 — Serverless functions** — Resend email functions + Stripe webhook, tested locally with Netlify CLI
- [ ] **Step 7 — Thank You page** — Path-aware messaging (webinar vs. consultation)
- [ ] **Step 8 — Polish & mobile QA** — Tailwind responsive pass, cross-browser check, accessibility basics
- [ ] **Step 9 — Deploy** — Netlify deploy, env vars set (Stripe keys, Resend API key), end-to-end test in prod

---

## Current Step

**Step 1 — Project scaffold**
