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
    name: '', email: '', phone: '', dealerType: '', currentStep: '', areas: '', dmvConcern: '', additionalDetails: '',
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

            <div>
              <label className={labelClass}>{t('contact.additionalDetails')}</label>
              <textarea rows={3} className={inputClass} value={form.additionalDetails} onChange={set('additionalDetails')} />
            </div>

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
            <div className="overflow-y-auto text-sm text-gray-700 space-y-4 flex-1 pr-1">
              <p className="font-bold text-gray-900">Consultation Services Agreement</p>
              <p>By booking and paying for a consultation with Dealer License Pros LLC, you ("Client") agree to the following Terms & Conditions.</p>

              <p><strong>1. Nature of Services</strong><br />Dealer License Pros LLC provides dealer licensing consulting, guidance, document assistance, business consulting, and educational support related to dealer license applications and compliance processes. We are not a government agency and are not affiliated with any state licensing authority, DMV, or regulatory agency. Our services are designed to assist Clients in understanding and navigating the dealer licensing process; however, all final decisions regarding approvals, denials, inspections, renewals, or compliance determinations are made solely by the applicable licensing agency.</p>

              <p><strong>2. No Guarantee of Approval</strong><br />By using our services, the Client acknowledges and agrees that: Dealer License Pros LLC does not guarantee approval of any dealer license application. We do not guarantee timelines, processing speeds, inspections, or outcomes. Approval decisions are made exclusively by the applicable state or licensing authority. Client eligibility, background history, business location compliance, financial standing, submitted documentation, and regulatory changes may affect approval outcomes. Any statements made by Dealer License Pros LLC regarding past approvals, experience, or success rates are informational only and do not constitute a promise or guarantee of future results.</p>

              <p><strong>3. Paid Consultations</strong><br />All in person or private consultations are paid services. Payment secures the Consultant's time, expertise, scheduling availability, and business advisory services provided during the consultation session. The Client understands that payment is for professional guidance and consultation services—not for the purchase of a dealer license or guaranteed licensing outcome.</p>

              <p><strong>4. No Refund Policy</strong><br />All consultation fees are non-refundable once a booking is confirmed. Refunds will not be issued for: failure to obtain a dealer license; delays caused by licensing agencies; failure to submit required documents; missed inspections; application denials; client ineligibility; scheduling conflicts caused by the Client; or failure to follow recommendations or instructions. If the Client misses a scheduled consultation without notice, the session may be considered forfeited.</p>

              <p><strong>5. Client Responsibilities</strong><br />The Client agrees to: provide accurate and truthful information; submit requested documents in a timely manner; follow all applicable laws and regulations; and independently verify licensing requirements with the appropriate state agency when necessary. The Client understands that incomplete, inaccurate, or misleading information may negatively impact licensing outcomes.</p>

              <p><strong>6. Limitation of Liability</strong><br />To the fullest extent permitted by law, Dealer License Pros LLC shall not be held liable for: license denials; delayed approvals; lost profits or business opportunities; regulatory penalties; inspection failures; business interruptions; or errors caused by third parties or government agencies. The Client agrees that any decisions made based on consultation services are done at the Client's own discretion and risk.</p>

              <p><strong>7. No Legal or Financial Advice</strong><br />Dealer License Pros LLC does not provide legal, tax, accounting, or financial advice. Clients are encouraged to consult licensed attorneys, accountants, or other professionals regarding legal, financial, or regulatory matters.</p>

              <p><strong>8. Communication & Response Times</strong><br />While we strive to respond promptly to all inquiries, response times may vary depending on workload, business hours, holidays, and agency processing times. We do not guarantee immediate responses or same-day service.</p>

              <p><strong>9. Rescheduling Policy</strong><br />Clients may request to reschedule consultations with at least 48 hours notice. Rescheduling requests made with insufficient notice may be denied or subject to additional fees.</p>

              <p><strong>10. Intellectual Property</strong><br />All materials, documents, checklists, templates, guides, and consultation content provided by Dealer License Pros LLC remain the intellectual property of the business and may not be copied, reproduced, distributed, or resold without written permission.</p>

              <p><strong>11. Right to Refuse Service</strong><br />Dealer License Pros LLC reserves the right to refuse or terminate services at any time for: abusive behavior; fraudulent activity; harassment; non-cooperation; misrepresentation of information; or requests that violate laws or regulations.</p>

              <p><strong>12. Governing Law</strong><br />These Terms & Conditions shall be governed and interpreted in accordance with the laws of the State of Texas.</p>

              <p><strong>13. Acceptance of Terms</strong><br />By booking, scheduling, or paying for any consultation or service with Dealer License Pros LLC, the Client acknowledges that they have read, understood, and agreed to these Terms & Conditions in full.</p>
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
