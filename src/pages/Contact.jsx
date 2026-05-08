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
  const [showTerms, setShowTerms] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (path === 'webinar') {
      setSubmitting(true);
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
      setShowTerms(true);
    }
  };

  const handleAgree = () => {
    setShowTerms(false);
    navigate('/book', { state: { contact: form } });
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
      {/* Terms & Conditions modal — consult path only */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col max-h-[80vh]">
            <h2 className="text-xl font-black text-gray-900 mb-4">Terms &amp; Conditions</h2>
            <div className="overflow-y-auto text-sm text-gray-700 space-y-3 flex-1 pr-1">
              <p><strong>[ Placeholder — client to provide full terms ]</strong></p>
              <p>By clicking "I Agree," you acknowledge that you have read, understood, and agree to the terms and conditions governing the in-person consultation service provided by Dealer License Pros.</p>
              <p>The consultation fee of $275 is non-refundable once the appointment has been confirmed. Dealer License Pros does not guarantee approval of any license application, as final decisions rest with the Texas Department of Motor Vehicles.</p>
              <p>All information shared during the consultation is confidential and will not be disclosed to third parties without your consent.</p>
              <p>[ Additional terms to be provided by client ]</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTerms(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:border-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAgree}
                className="flex-1 bg-accent text-gray-900 font-black py-3 rounded-full hover:brightness-95 transition-colors"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
