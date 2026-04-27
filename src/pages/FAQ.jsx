import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AccordionItem from '../components/ui/AccordionItem';

export default function FAQ() {
  const { t } = useTranslation();

  const items = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    // Add more FAQ items here as client provides them
  ];

  return (
    <main className="flex-1">
      <section className="border-4 border-red-600 mx-4 my-6 rounded-sm">
        <div className="p-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-2">
            {t('faq.title')}
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-8" />

          <div className="max-w-2xl mx-auto divide-y divide-gray-200">
            {items.map(({ question, answer }) => (
              <AccordionItem key={question} question={question} answer={answer} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-bold text-gray-900 mb-2">{t('faq.cta')}</p>
            <div className="text-red-600 text-4xl">⬇</div>
          </div>
        </div>
      </section>

      <div className="flex justify-center pb-8">
        <Link
          to="/get-started"
          className="bg-red-600 hover:bg-red-700 text-white font-black text-xl px-12 py-4 rounded-full transition-colors shadow-lg"
        >
          {t('common.bookNow').toUpperCase()}
        </Link>
      </div>
    </main>
  );
}
