const { Resend } = require('resend');

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

  const { name, email, phone, dealerType, currentStep, areas, dmvConcern, additionalDetails } = data;

  const dealerSection = dealerType === 'new'
    ? `Dealer Type: New Prospective Dealer\nCurrent Step: ${currentStep}\nAreas: ${areas}`
    : `Dealer Type: Established Dealer\nMain DMV Concern: ${dmvConcern}`;

  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: process.env.OWNER_EMAIL,
        subject: `[WEBINAR SIGNUP] ${name} — ${email}`,
        text: `New webinar signup:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n${dealerSection}${additionalDetails ? `\nAdditional Details: ${additionalDetails}` : ''}`,
      }),
      resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "You're registered for the Dealer License Pros Webinar!",
        text: `Hi ${name},\n\nYou're registered for our free live webinar. We'll send details closer to the date.\n\nThank you!\nDealer License Pros LLC`,
      }),
    ]);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Resend error:', err);
    return { statusCode: 500, body: 'Email send failed' };
  }
};
