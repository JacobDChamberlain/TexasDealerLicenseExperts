const Stripe = require('stripe');
const { Resend } = require('resend');

const header = `
  <tr>
    <td style="background-color:#111827;padding:30px 40px;text-align:center;">
      <img src="https://dealerlicensepros.com/assets/Car.png" alt="Dealer License Pros" style="width:72px;height:auto;display:block;margin:0 auto 14px;">
      <h1 style="margin:0;color:#F8B21D;font-size:22px;font-weight:bold;font-family:Georgia,serif;letter-spacing:1px;">Dealer License Pros</h1>
      <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">Texas Dealer Licensing Experts</p>
    </td>
  </tr>
  <tr><td style="height:4px;background-color:#F8B21D;"></td></tr>
`;

const footer = `
  <tr>
    <td style="background-color:#111827;padding:24px 40px;text-align:center;">
      <p style="margin:0;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">Dealer License Pros LLC &middot; Texas</p>
      <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">Mail@DealerLicensePros.com</p>
    </td>
  </tr>
`;

const wrap = (content) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">
        ${header}
        <tr><td style="padding:36px 40px;">${content}</td></tr>
        ${footer}
      </table>
    </td></tr>
  </table>
</body></html>`;

const row = (label, value) => value
  ? `<tr>
      <td style="padding:6px 0;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:13px;vertical-align:top;"><strong>${value}</strong></td>
    </tr>`
  : '';

exports.handler = async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type !== 'payment_intent.succeeded') {
    return { statusCode: 200, body: 'Ignored' };
  }

  const { metadata, amount } = stripeEvent.data.object;
  const { name, email, phone, dealerType, currentStep, areas, dmvConcern, additionalDetails } = metadata;

  const dealerLabel = dealerType === 'new' ? 'New Prospective Dealer' : 'Established Dealer';
  const dealerRows = dealerType === 'new'
    ? row('Current Step', currentStep) + row('Areas', areas)
    : row('DMV Concern', dmvConcern);

  const amountFormatted = `$${(amount / 100).toFixed(2)}`;

  const ownerHtml = wrap(`
    <p style="margin:0 0 6px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">New Paid Consultation</p>
    <h2 style="margin:0 0 4px;font-size:20px;color:#111827;font-family:Georgia,serif;">${name}</h2>
    <p style="margin:0 0 24px;font-size:22px;font-weight:bold;color:#F8B21D;font-family:Georgia,serif;">${amountFormatted} paid</p>
    <table cellpadding="0" cellspacing="0" width="100%">
      ${row('Name', name)}
      ${row('Email', email)}
      ${row('Phone', phone)}
      ${row('Dealer Type', dealerLabel)}
      ${dealerRows}
      ${row('Additional Details', additionalDetails)}
    </table>
  `);

  const customerHtml = wrap(`
    <h2 style="margin:0 0 16px;font-size:22px;color:#111827;font-family:Georgia,serif;">Your consultation is confirmed!</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">Hi ${name},</p>
    <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
      Thank you for booking your <strong>in-person consultation</strong> with Dealer License Pros. Your payment of <strong>${amountFormatted}</strong> has been received.
    </p>
    <p style="margin:0 0 32px;font-size:15px;color:#374151;line-height:1.6;">
      We'll be in touch shortly to confirm the date, time, and location. Get ready to take the next step toward your dealer license!
    </p>
    <table cellpadding="0" cellspacing="0"><tr><td style="background-color:#F8B21D;border-radius:50px;padding:14px 32px;">
      <a href="https://dealerlicensepros.com" style="color:#111827;font-size:15px;font-weight:bold;text-decoration:none;font-family:Arial,sans-serif;">Visit Dealer License Pros</a>
    </td></tr></table>
  `);

  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: process.env.OWNER_EMAIL,
        subject: `[PAID CONSULTATION] ${name} — ${email}`,
        html: ownerHtml,
        text: `New paid consultation booking:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAmount: ${amountFormatted}\nDealer Type: ${dealerLabel}${dealerType === 'new' ? `\nCurrent Step: ${currentStep}\nAreas: ${areas}` : `\nDMV Concern: ${dmvConcern}`}${additionalDetails ? `\nAdditional Details: ${additionalDetails}` : ''}`,
      }),
      resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Your Dealer License Pros Consultation is Confirmed!',
        html: customerHtml,
        text: `Hi ${name},\n\nThank you for booking your in-person consultation (${amountFormatted}). We'll be in touch shortly to confirm the details.\n\nDealer License Pros LLC`,
      }),
    ]);
  } catch (err) {
    console.error('Resend error:', err);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
