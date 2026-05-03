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

- [x] **Step 1 — Project scaffold** — `npm create vite`, install Tailwind, React Router, set up folder structure and base layout
- [x] **Step 2 — Routing & shell** — All 8 routes wired up (added About), shared nav/footer, secondary nav, floating Book Now button
- [x] **Step 3 — Static pages** — Landing, FAQ, Success Stories, About built; EN/ES bilingual via react-i18next; scroll animations via AnimateIn; yellow accent + Montserrat/Courgette fonts
- [x] **Step 4 — CTA & Contact Form** — Two-path CTA card with tap animation, contact form with conditional fields, path-aware state passing
- [ ] **Step 5 — Stripe integration** — Payment Element on `/book`, test mode first (client needs to create Stripe account and provide keys)
- [ ] **Step 6 — Serverless functions** — Wire Resend email functions + Stripe webhook; install stripe + resend npm packages; test locally with Netlify CLI + Stripe CLI
- [x] **Step 7 — Thank You page** — Path-aware messaging (webinar vs. consultation)
- [ ] **Step 8 — Polish & mobile QA** — Tailwind responsive pass, cross-browser check, accessibility basics
- [x] **Step 9 — Deploy** — Live at https://glittering-hamster-5fd5c4.netlify.app

---

## Current Step

**Step 5 — Stripe integration** (blocked until client provides Stripe publishable + secret keys)

## Pending / Deferred

- Client to provide real About page content
- Client to provide logo / photo assets (placeholders in place)
- Additional FAQ items from client
- Custom domain + domain email (FROM_EMAIL) via Resend once domain is chosen
