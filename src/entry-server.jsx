import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';
import { SITE, resolveMeta, concretePaths } from './data/site.js';
import { getArticle } from './data/articles.js';
import { getProgramme } from './data/programmes.js';
import { FAQS } from './data/faqs.js';

function schemaOrg() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: `${SITE.url}/`,
      description: SITE.tagline,
      inLanguage: 'en',
    },
  ];
}

function breadcrumbs(pathname, currentName) {
  const route = pathname.startsWith('/explore/') ? { name: 'Explore', url: `${SITE.url}/explore` } : { name: 'Programmes', url: `${SITE.url}/programmes` };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: route.name, item: route.url },
      { '@type': 'ListItem', position: 3, name: currentName, item: `${SITE.url}${pathname}` },
    ],
  };
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

function jsonLdFor(pathname) {
  const schemas = schemaOrg();
  const articleMatch = pathname.match(/^\/explore\/articles\/(.+)$/);
  if (articleMatch) {
    const article = getArticle(articleMatch[1]);
    if (article) schemas.push(breadcrumbs(pathname, article.title));
  }
  const programmeMatch = pathname.match(/^\/programmes\/(.+)$/);
  if (programmeMatch) {
    const programme = getProgramme(programmeMatch[1]);
    if (programme) schemas.push(breadcrumbs(pathname, programme.title));
  }
  if (pathname === '/learn-more') schemas.push(faqSchema());
  return schemas;
}

export { SITE } from './data/site.js';

export function renderRoute(path) {
  const meta = resolveMeta(path);
  const body = renderToString(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
  return { body, meta, jsonLd: jsonLdFor(path) };
}

export function sitemapEntries() {
  return concretePaths().map((path) => ({ path, meta: resolveMeta(path) }));
}