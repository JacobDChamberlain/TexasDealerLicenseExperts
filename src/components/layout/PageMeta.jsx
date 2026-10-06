import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// pathname -> key under `meta` in the locale files
const PAGES = {
  '/': 'home',
  '/about': 'about',
  '/faq': 'faq',
  '/success-stories': 'successStories',
  '/get-started': 'getStarted',
  '/contact': 'contact',
  '/thank-you': 'thankYou',
};

// pages search engines should not index (also disallowed in robots.txt)
const NOINDEX = ['/thank-you'];

function setMeta(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!content) {
    tag?.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

// Sets the document title, meta description, and <html lang> for the current route.
// Renders nothing.
export default function PageMeta() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const page = PAGES[pathname] ?? 'home';

  useEffect(() => {
    document.title = t(`meta.${page}.title`);
    setMeta('description', t(`meta.${page}.description`));
    setMeta('robots', NOINDEX.includes(pathname) ? 'noindex' : null);
    document.documentElement.lang = i18n.resolvedLanguage;
  }, [page, pathname, t, i18n.resolvedLanguage]);

  return null;
}
