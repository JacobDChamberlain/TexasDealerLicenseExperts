export const handler = async (event) => {
  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { Resend } = await import('resend');
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
  const { name, email, phone, dealerType, currentStep, areas, dmvConcern } = metadata;

  const dealerSection = dealerType === 'new'
    ? `Dealer Type: New Prospective Dealer\nCurrent Step: ${currentStep}\nAreas: ${areas}`
    : `Dealer Type: Established Dealer\nMain DMV Concern: ${dmvConcern}`;

  const amountFormatted = `$${(amount / 100).toFixed(2)}`;

  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: process.env.OWNER_EMAIL,
        subject: `[PAID CONSULTATION] ${name} — ${email}`,
        text: `New paid consultation booking:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAmount: ${amountFormatted}\n${dealerSection}`,
      }),
      resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Your TX Dealer License Experts Consultation is Confirmed!',
        text: `Hi ${name},\n\nThank you for booking your in-person consultation (${amountFormatted}). We'll be in touch shortly to confirm the details.\n\nTX Dealer License Experts`,
      }),
    ]);
  } catch (err) {
    console.error('Resend error:', err);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
