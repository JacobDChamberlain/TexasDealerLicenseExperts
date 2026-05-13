import { useTranslation } from 'react-i18next';
import AnimateIn from '../components/ui/AnimateIn';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="border-8 border-accent mx-4 my-6 rounded-sm">
      <div className="p-6 sm:p-10 max-w-2xl mx-auto">
        <AnimateIn direction="fade">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-2">
            {t('about.title')}
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-10" />


        </AnimateIn>

        <AnimateIn direction="fade" delay={100}>
          <div className="space-y-4 text-gray-800 leading-relaxed">
            {['p1', 'p2', 'p3'].map((key) =>
              t(`about.${key}`).split('\n\n').map((para, i) => (
                <p key={`${key}-${i}`}>{para}</p>
              ))
            )}
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
