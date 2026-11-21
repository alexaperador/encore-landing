import { en, type Dictionary } from './en';
import { es } from './es';

export const languages = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_GB' },
  es: { label: 'Español', short: 'ES', htmlLang: 'es', ogLocale: 'es_ES' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];

const dictionaries: Record<Lang, Dictionary> = { en, es };

/** Localised paths for every page, so the language switch lands on the same page. */
export const routes = {
  home: { en: '/', es: '/es/' },
  privacy: { en: '/privacy/', es: '/es/privacidad/' },
  terms: { en: '/terms/', es: '/es/terminos/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

export function t(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function path(route: RouteKey, lang: Lang): string {
  return routes[route][lang];
}

/**
 * Link to a section of the landing page. On the landing page itself a bare
 * fragment keeps the jump on the same document; elsewhere it points home first.
 */
export function sectionHref(lang: Lang, id: string, onHome: boolean): string {
  if (onHome) return `#${id}`;
  const home = routes.home[lang];
  return `${home}#${id}`;
}

/** Replace `{name}` tokens in a translated string. */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}
