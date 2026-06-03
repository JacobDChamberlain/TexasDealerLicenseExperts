import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError('');

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/thank-you` },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else {
      navigate('/thank-you', { state: { path: 'consult' } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-accent hover:brightness-95 disabled:opacity-60 text-gray-900 font-black text-lg py-4 rounded-full transition-colors"
      >
        {processing ? t('book.processing') : 'Pay $275'}
      </button>
    </form>
  );
}

export default function Book() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const contact = state?.contact ?? {};
  const [clientSecret, setClientSecret] = useState('');
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setFetchError('Could not initialize payment. Please try again.');
      })
      .catch(() => setFetchError('Could not initialize payment. Please try again.'));
  }, []);

  return (
    <div className="mx-4 my-6">
      <div className="max-w-lg mx-auto border-2 border-gray-900 rounded-2xl p-6 bg-white">
        <h1 className="text-2xl font-black text-gray-900 mb-1 text-center">{t('book.title')}</h1>
        <p className="text-gray-600 mb-6 text-center">{t('book.subtitle')}</p>

        {fetchError && <p className="text-red-600 text-sm text-center mb-4">{fetchError}</p>}

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        ) : !fetchError && (
          <p className="text-center text-gray-400 py-8">{t('common.loading')}</p>
        )}

        {contact.name && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            Booking for: {contact.name} ({contact.email})
          </p>
        )}
      </div>
    </div>
  );
}
