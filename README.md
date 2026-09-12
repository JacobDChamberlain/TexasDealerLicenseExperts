# Dealer License Pros — Site Overview

Marketing and lead-capture website for **Dealer License Pros LLC**, a Texas dealer licensing consulting business. The site guides visitors from awareness to a request for a **free in-person 2-hour consultation**, capturing their details and emailing them to the owner.

**Live URL:** https://dealerlicensepros.com

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS (accent: `#F8B21D`, dark: `#111827`) |
| Routing | React Router v7 |
| Internationalization | react-i18next (English + Spanish) |
| Payments | _None — consultations are free._ |
| Transactional Email | Resend |
| Hosting | Netlify (free tier) |
| Serverless Functions | Netlify Functions (CommonJS `.cjs`) |

---

## Domain & Deployment

- **Registrar:** Namecheap (`dealerlicensepros.com`)
- **DNS:** Managed via Netlify DNS — nameservers updated at Namecheap to point to Netlify
- **Primary domain:** `dealerlicensepros.com` — `www` redirects automatically to primary
- **SSL:** Let's Encrypt, provisioned and auto-renewed by Netlify
- **Deploys:** Auto-deploy from `main` branch on GitHub via Netlify

---

## Email

- **Inbox:** Zoho Mail — `Mail@DealerLicensePros.com` (owner receives notifications here)
- **Sending:** Resend — domain verified for `dealerlicensepros.com`, handles all transactional emails

---

## Environment Variables (set in Netlify)

| Variable | Used In |
|---|---|
| `RESEND_API_KEY` | `send-consult-request.cjs` |
| `FROM_EMAIL` | `send-consult-request.cjs` (set to `Mail@DealerLicensePros.com`) |
| `OWNER_EMAIL` | `send-consult-request.cjs` (set to `Mail@DealerLicensePros.com`) |

The old Stripe variables (`VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`) are no longer used and can be deleted from the Netlify
dashboard.

---

## Pages

| Route | Page |
|---|---|
| `/` | Landing |
| `/about` | About |
| `/faq` | FAQ |
| `/success-stories` | Success Stories |
| `/get-started` | CTA — single card: free in-person consultation |
| `/contact` | Consultation request form (branches on dealer type) |
| `/thank-you` | Thank You / confirmation |

---

## User Flow

1. `/get-started` — user clicks the single **In-Person 2-Hour Consultation (100% Free)** card
2. `/contact` — fills out the form. **Every visible field is mandatory.**

   Always asked:
   1. Full Name
   2. Email
   3. Phone #
   4. Are you a new prospective dealer, or already a used car dealer in Texas?

   If **new prospective dealer**:
   5. Current Step in Process?
   6. What cities are you trying to be a dealer in?
   7. One partner LLC, or more than one person registered?
   8. Ever been a dealer before? Any failed application attempts?

   If **already a used car dealer**:
   5. What is your main concern with the DMV?

   Then, always asked:
   - Please add any details you want our team to know

3. Submit → `POST /.netlify/functions/send-consult-request`
4. Function re-validates the branch server-side, then sends two emails simultaneously:
   - **Owner:** `[CONSULT REQUEST] NEW|EXISTING — Name — email` with every answer,
     `replyTo` set to the visitor's address → `Mail@DealerLicensePros.com`
   - **Visitor:** Request-received confirmation → visitor's email
5. User navigated to `/thank-you`

Only the chosen branch's fields are submitted, so the owner email never shows
empty rows for the branch that wasn't taken. Answers are HTML-escaped before
being embedded in the email bodies.

---

## Serverless Functions

| File | Trigger | Purpose |
|---|---|---|
| `netlify/functions/send-consult-request.cjs` | Form submit on `/contact` | Sends consultation-request emails to owner + visitor |

Only files inside `netlify/functions/` are deployed (set in `netlify.toml`).

---

## History

Until September 2026 the site ran a two-path model: a free webinar signup and a
paid ($275) in-person consultation booked through Stripe. The client moved to a
single **free** consultation, turning the site into pure lead capture. The
webinar pages, the Stripe integration (`Book.jsx`, `create-payment-intent.cjs`,
`stripe-webhook.cjs`), and the `@stripe/*` dependencies were removed outright —
recoverable from git history if ever needed.

---

## Local Development

```bash
npx netlify-cli dev     # required — plain `npm run dev` will not serve /.netlify/functions/*
```

Needs `RESEND_API_KEY`, `FROM_EMAIL`, and `OWNER_EMAIL` in a local `.env`.

---

## Known Gaps

- Spanish copy deliberately keeps the English word **"dealer"** rather than
  translating it to "concesionario"/"concesionaria" — this is a client requirement.
- `gdn.steps` in both locale files are still `[ Placeholder ]` pending client copy.
