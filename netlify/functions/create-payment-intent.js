const CONSULTATION_PRICE_CENTS = 27500; // $275.00

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let contact;
  try {
    contact = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: CONSULTATION_PRICE_CENTS,
      currency: 'usd',
      metadata: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        dealerType: contact.dealerType,
        currentStep: contact.currentStep ?? '',
        areas: contact.areas ?? '',
        dmvConcern: contact.dmvConcern ?? '',
        additionalDetails: contact.additionalDetails ?? '',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    console.error('Stripe error:', err);
    return { statusCode: 500, body: 'Payment intent creation failed' };
  }
};
