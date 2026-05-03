import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WEBINAR_EMAIL_URL = '/.netlify/functions/send-webinar-email';

export default function Contact() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const path = state?.path ?? 'consult';

  const [form, setForm] = useState({
    name: '', email: '', phone: '', dealerType: '', currentStep: '', areas: '', dmvConcern: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (path === 'webinar') {
      try {
        const res = await fetch(WEBINAR_EMAIL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, path }),
        });
        if (!res.ok) throw new Error('Email send failed');
        navigate('/thank-you', { state: { path: 'webinar' } });
      } catch {
        setError('Something went wrong. Please try again.');
        setSubmitting(false);
      }
    } else {
      navigate('/book', { state: { contact: form } });
    }
  };

  const inputClass = 'w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent';
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

  return (
    <div className="mx-4 my-6">
      <section className="mx-4 mb-8">
        <div className="max-w-lg mx-auto border-2 border-gray-900 rounded-2xl p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>{t('contact.name')}</label>
              <input required className={inputClass} value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label className={labelClass}>{t('contact.email')}</label>
              <input required type="email" className={inputClass} value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label className={labelClass}>{t('contact.phone')}</label>
              <input required type="tel" className={inputClass} value={form.phone} onChange={set('phone')} />
            </div>

            {/* Dealer type radio */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">{t('contact.dealerQuestion')}</p>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'new', label: t('contact.newDealer') },
                  { value: 'established', label: t('contact.establishedDealer') },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="dealerType"
                      value={value}
                      checked={form.dealerType === value}
                      onChange={set('dealerType')}
                      required
                      className="accent-accent w-4 h-4"
                    />
                    <span className="text-gray-800">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional — new dealer */}
            {form.dealerType === 'new' && (
              <>
                <div>
                  <label className={labelClass}>{t('contact.currentStep')}</label>
                  <textarea required rows={3} className={inputClass} value={form.currentStep} onChange={set('currentStep')} />
                </div>
                <div>
                  <label className={labelClass}>{t('contact.areas')}</label>
                  <textarea required rows={3} className={inputClass} value={form.areas} onChange={set('areas')} />
                </div>
              </>
            )}

            {/* Conditional — established dealer */}
            {form.dealerType === 'established' && (
              <div>
                <label className={labelClass}>{t('contact.dmvConcern')}</label>
                <textarea required rows={3} className={inputClass} value={form.dmvConcern} onChange={set('dmvConcern')} />
              </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent hover:brightness-95 disabled:opacity-60 text-gray-900 font-black text-lg py-4 rounded-full transition-colors"
            >
              {submitting ? t('contact.submitting') : t('contact.submit')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
