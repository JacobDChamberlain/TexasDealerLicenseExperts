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

// Form answers are free text — escape before embedding in the email HTML.
const esc = (v) => String(v ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const row = (label, value) => `
  <tr>
    <td style="padding:10px 0;color:#6b7280;font-size:13px;width:180px;vertical-align:top;border-bottom:1px solid #f3f4f6;">${label}</td>
    <td style="padding:10px 0;color:#111827;font-size:13px;vertical-align:top;border-bottom:1px solid #f3f4f6;"><strong>${esc(value).replace(/\n/g, '<br>')}</strong></td>
  </tr>`;

const CONTACT_FIELDS = [
  ['name', 'Full Name'],
  ['email', 'Email'],
  ['phone', 'Phone #'],
];

const NEW_DEALER_FIELDS = [
  ['currentStep', 'Current Step in Process'],
  ['cities', 'Cities Wanting to Deal In'],
  ['partners', 'LLC Partners / Ownership'],
  ['priorDealer', 'Prior Dealer Experience / Failed Attempts'],
];

const ESTABLISHED_FIELDS = [
  ['dmvConcern', 'Main Concern with the DMV'],
];

const DETAILS_FIELD = [['additionalDetails', 'Additional Details']];

// Mirrors the branching in src/pages/Contact.jsx.
const fieldsFor = (dealerType) => [
  ...CONTACT_FIELDS,
  ...(dealerType === 'new' ? NEW_DEALER_FIELDS : ESTABLISHED_FIELDS),
  ...DETAILS_FIELD,
];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name, email, dealerType } = data;

  if (dealerType !== 'new' && dealerType !== 'established') {
    return { statusCode: 400, body: 'Missing or invalid dealerType' };
  }

  // All fields for the chosen branch are mandatory — mirror the client-side check.
  const fields = fieldsFor(dealerType);
  const missing = fields.filter(([key]) => !String(data[key] ?? '').trim()).map(([, label]) => label);
  if (missing.length) {
    return { statusCode: 400, body: `Missing required fields: ${missing.join(', ')}` };
  }

  const dealerLabel = dealerType === 'new'
    ? 'New Prospective Dealer'
    : 'Already a Used Car Dealer in Texas';

  const ownerHtml = wrap(`
    <p style="margin:0 0 6px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">New Consultation Request</p>
    <h2 style="margin:0 0 4px;font-size:20px;color:#111827;font-family:Georgia,serif;">${esc(name)}</h2>
    <p style="margin:0 0 24px;font-size:14px;font-weight:bold;color:#F8B21D;font-family:Arial,sans-serif;">${dealerLabel}</p>
    <table cellpadding="0" cellspacing="0" width="100%">
      ${row('Dealer Type', dealerLabel)}
      ${fields.map(([key, label]) => row(label, data[key])).join('')}
    </table>
  `);

  const ownerText = `New consultation request:\n\nDealer Type: ${dealerLabel}\n${fields.map(([key, label]) => `${label}: ${data[key]}`).join('\n')}`;

  const customerHtml = wrap(`
    <h2 style="margin:0 0 16px;font-size:22px;color:#111827;font-family:Georgia,serif;">We got your request!</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">Hi ${esc(name)},</p>
    <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
      Thank you for requesting your <strong>free in-person 2-hour consultation</strong> with Dealer License Pros. We've received your information and our team is reviewing it now.
    </p>
    <p style="margin:0 0 32px;font-size:15px;color:#374151;line-height:1.6;">
      We'll reach out shortly to schedule the date, time, and location. Keep an eye on your inbox and phone — and get ready to take the next step toward your dealer license!
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
        replyTo: email,
        subject: `[CONSULT REQUEST] ${dealerType === 'new' ? 'NEW' : 'EXISTING'} — ${name} — ${email}`,
        html: ownerHtml,
        text: ownerText,
      }),
      resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'We received your Dealer License Pros consultation request!',
        html: customerHtml,
        text: `Hi ${name},\n\nThank you for requesting your free in-person 2-hour consultation. We've received your information and will reach out shortly to schedule the details.\n\nDealer License Pros LLC`,
      }),
    ]);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Resend error:', err);
    return { statusCode: 500, body: 'Email send failed' };
  }
};
