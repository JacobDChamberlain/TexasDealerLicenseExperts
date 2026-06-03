# Dealer License Pros — Site Overview

Marketing and booking website for **Dealer License Pros LLC**, a Texas dealer licensing consulting business. The site guides visitors from awareness to either a free webinar signup or a paid in-person consultation booking.

**Live URL:** https://dealerlicensepros.com

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS (accent: `#F8B21D`, dark: `#111827`) |
| Routing | React Router v7 |
| Internationalization | react-i18next (English + Spanish) |
| Payments | Stripe (Payment Element + Webhooks) |
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
| `VITE_STRIPE_PUBLISHABLE_KEY` | Frontend (`Book.jsx`) |
| `STRIPE_SECRET_KEY` | `create-payment-intent.cjs`, `stripe-webhook.cjs` |
| `STRIPE_WEBHOOK_SECRET` | `stripe-webhook.cjs` |
| `RESEND_API_KEY` | `send-webinar-email.cjs`, `stripe-webhook.cjs` |
| `FROM_EMAIL` | Both email functions (set to `Mail@DealerLicensePros.com`) |
| `OWNER_EMAIL` | Both email functions (set to `Mail@DealerLicensePros.com`) |

---

## Pages

| Route | Page |
|---|---|
| `/` | Landing |
| `/about` | About |
| `/faq` | FAQ |
| `/success-stories` | Success Stories |
| `/get-started` | CTA — two-path card (webinar vs. consultation) |
| `/contact` | Contact Form (shared by both paths, `?path=webinar` or `?path=consult`) |
| `/book` | Book & Pay (consultation path only — Stripe Payment Element) |
| `/thank-you` | Thank You (messaging varies by path) |

---

## User Flows

### Webinar Path

1. `/get-started` — user selects **Free Webinar**
2. `/contact?path=webinar` — fills out contact form (name, email, phone, dealer type, details)
3. Submits form → `POST /.netlify/functions/send-webinar-email`
4. Function sends two emails simultaneously:
   - **Owner:** `[WEBINAR SIGNUP] Name — email` with all form data → `Mail@DealerLicensePros.com`
   - **Customer:** Webinar registration confirmation → customer's email
5. User navigated to `/thank-you` (webinar message)

---

### Consultation Path

1. `/get-started` — user selects **In-Person Consultation**
2. `/contact?path=consult` — fills out contact form (name, email, phone, dealer type, conditional fields, additional details)
3. Submits form → Terms & Conditions modal appears
4. User clicks **I Agree** → navigated to `/book` (contact info passed via React Router state)
5. `/book` loads → `POST /.netlify/functions/create-payment-intent` called with contact info
6. Stripe creates a PaymentIntent for **$275.00**, returns `clientSecret`
7. Stripe Payment Element renders using `clientSecret`
8. Customer enters payment info and submits
9. `stripe.confirmPayment()` processes the charge
10. On success → Stripe fires `payment_intent.succeeded` webhook to `https://dealerlicensepros.com/.netlify/functions/stripe-webhook`
11. Webhook function sends two emails simultaneously:
    - **Owner:** `[PAID CONSULTATION] Name — email` with all form data + amount → `Mail@DealerLicensePros.com`
    - **Customer:** Consultation confirmation with amount paid → customer's email
12. User navigated to `/thank-you` (consultation message)

---

## Serverless Functions

| File | Trigger | Purpose |
|---|---|---|
| `netlify/functions/send-webinar-email.cjs` | Form submit (webinar path) | Sends webinar signup emails to owner + customer |
| `netlify/functions/create-payment-intent.cjs` | Page load on `/book` | Creates Stripe PaymentIntent for $275, returns `clientSecret` |
| `netlify/functions/stripe-webhook.cjs` | Stripe `payment_intent.succeeded` webhook | Sends paid consultation emails to owner + customer |

Stripe webhook endpoint registered at:
`https://dealerlicensepros.com/.netlify/functions/stripe-webhook`
Listens for: `payment_intent.succeeded`

---

## Still Pending (awaiting client)

- Webinar confirmation email wording update (`netlify/functions/send-webinar-email.cjs` — customer confirmation email)
