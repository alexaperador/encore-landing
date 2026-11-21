// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The public URL is used for canonical links, hreflang and Open Graph images.
// Set SITE_URL in your hosting provider once the production domain is known.
const site = process.env.SITE_URL ?? 'https://encore.example';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },

  // Pages are prerendered as static HTML. Only /api/waitlist runs on the server.
  output: 'static',
  adapter: vercel(),

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  env: {
    schema: {
      // Neon connection string. Server-only and secret: never bundled into client code.
      DATABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
      filter: (page) => !page.includes('/api/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
