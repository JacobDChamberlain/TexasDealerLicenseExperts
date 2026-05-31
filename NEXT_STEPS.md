# Next Steps — Dealer License Pros

## 1. Secure the Domain
- Register **DealerLicensePros.com** through Namecheap, GoDaddy, or Squarespace
- Cost: ~$10–20/year (recurring — set to auto-renew)
- After purchasing, point the domain to Netlify:
  - In Netlify dashboard → Site → Domain Management → Add custom domain
  - Add the DNS records Netlify provides to your domain registrar

---

## 2. Set Up Email — Mail@DealerLicensePros.com
- **Free option:** Zoho Mail (free for 1 user) — good enough for receiving form submissions
- **Paid option:** Google Workspace (~$6/month) — better if Ricky wants full Gmail experience
- After setting up, update the `OWNER_EMAIL` env var in Netlify to `Mail@DealerLicensePros.com`
- Also configure Resend to send FROM the domain email (takes ~10 min of DNS setup)

---

## 3. Set Up Stripe (Required to activate the Book/Pay flow)
- Ricky creates a free account at stripe.com
- He provides you:
  - `VITE_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET` (after registering the webhook endpoint)
- Add these to Netlify environment variables (Site → Environment Variables)
- Wire up the Stripe Payment Element in `src/pages/Book.jsx` (marked TODO)
- Register webhook endpoint in Stripe dashboard: `https://dealerlicensepros.com/.netlify/functions/stripe-webhook`
- Cost: no monthly fee — Stripe takes 2.9% + $0.30 per transaction (~$8.28 per $275 booking)

---

## 4. Set Up Resend (Required for confirmation emails)
- Create free account at resend.com
- Get API key → add as `RESEND_API_KEY` in Netlify env vars
- Set `FROM_EMAIL` to `Mail@DealerLicensePros.com` once domain email is configured
- Verify the domain in Resend (DNS records, ~10 min)
- Free tier covers up to 3,000 emails/month — more than enough

---

## 5. Add All Env Vars to Netlify
Once you have all keys, add them in Netlify → Site → Environment Variables:
```
VITE_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
OWNER_EMAIL=Mail@DealerLicensePros.com
FROM_EMAIL=Mail@DealerLicensePros.com
```

---

## Ongoing Costs Summary
| Item | Cost | Frequency |
|---|---|---|
| Domain | ~$10–20 | Yearly |
| Email (Zoho free) | $0 | — |
| Email (Google Workspace) | ~$6 | Monthly |
| Netlify hosting | $0 | — |
| Resend emails | $0 (under 3k/mo) | — |
| Stripe processing | ~$8.28 per booking | Per transaction |

---

## What's Already Done
- Full site built and deployed at https://glittering-hamster-5fd5c4.netlify.app
- All pages: Home, FAQ, Success Stories, About, CTA, Contact, Book, Thank You
- Bilingual EN/ES
- Netlify serverless functions written (email + Stripe) — just need env vars to activate
- Terms & Conditions modal on consultation booking flow
- Stripe Book page placeholder ready for wiring up
