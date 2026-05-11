import { useTranslation } from 'react-i18next';
import AccordionItem from '../components/ui/AccordionItem';

export default function FAQ() {
  const { t } = useTranslation();

  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    question: t(`faq.q${n}`),
    answer: t(`faq.a${n}`),
  }));

  return (
    <div className="border-8 border-accent mx-4 my-6 rounded-sm">
      <div className="p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-2">
          {t('faq.title')}
        </h1>
        <div className="w-24 h-1 bg-gray-900 mx-auto mb-10" />

        <div className="max-w-2xl mx-auto divide-y divide-gray-200">
          {items.map(({ question, answer }) => (
            <AccordionItem key={question} question={question} answer={answer} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-bold text-gray-900 mb-2">{t('faq.cta')}</p>
          <div className="text-accent text-4xl">⬇</div>
        </div>
      </div>
    </div>
  );
}
