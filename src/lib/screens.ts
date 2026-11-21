/**
 * Real Encore app screenshots (920×2000), one set per page language.
 * The English page shows the app in English, the Spanish page in Spanish.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '@/i18n';
import enExplore from '@/assets/app/en/explore.webp';
import enMyConcerts from '@/assets/app/en/my-concerts.webp';
import enAlerts from '@/assets/app/en/alerts.webp';
import esExplore from '@/assets/app/es/explore.webp';
import esMyConcerts from '@/assets/app/es/my-concerts.webp';
import esAlerts from '@/assets/app/es/alerts.webp';

type Screen = 'explore' | 'myConcerts' | 'alerts';

const screens: Record<Lang, Record<Screen, ImageMetadata>> = {
  en: { explore: enExplore, myConcerts: enMyConcerts, alerts: enAlerts },
  es: { explore: esExplore, myConcerts: esMyConcerts, alerts: esAlerts },
};

export function screen(lang: Lang, name: Screen): ImageMetadata {
  return screens[lang][name];
}
