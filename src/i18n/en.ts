/**
 * English copy — the source of truth for every string on the site.
 * The Spanish dictionary is typed against this shape, so a missing
 * translation is a build error rather than a blank on the page.
 *
 * Product claims follow the brief and what the app screenshots show.
 */
export const en = {
  meta: {
    title: 'Encore — The concert app for live music fans',
    description:
      'Discover concerts near you, filter by genre, save the shows you’re going to and choose when Encore reminds you. Join the Encore early-access waitlist.',
    ogAlt: 'Encore, the concert app for live music fans',
    privacyTitle: 'Privacy Policy — Encore',
    privacyDescription: 'How Encore collects, uses and protects the email address you give us when you join the waitlist.',
    termsTitle: 'Terms and Conditions — Encore',
    termsDescription: 'The terms that apply when you use the Encore website and join the early-access waitlist.',
    notFoundTitle: 'Page not found — Encore',
  },

  a11y: {
    skip: 'Skip to content',
    home: 'Encore home',
    mainNav: 'Main',
    footerNav: 'Footer',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    // Alt text for the real app screenshots
    shotMyConcerts:
      'Encore’s My concerts screen: three saved concerts in Barcelona sorted by date, each with a countdown in days, and tabs for upcoming, past and all concerts.',
    shotExplore:
      'Encore’s Explore screen: a concert search bar, genre filters for All, Pop, Rock, R&B and Latin, and a list of upcoming concerts in Barcelona.',
    shotAlerts:
      'Encore’s My Alerts screen: a saved concert 104 days away and reminder switches for 30 days, 7 days and 1 day before, and the same day.',
  },

  nav: {
    discover: 'Explore',
    plan: 'My concerts',
    reminders: 'Alerts',
    history: 'History',
    cta: 'Join the waitlist',
  },

  hero: {
    badge: 'Early access list now open',
    titleLines: ['The concert app', 'for live music fans.'],
    lead: 'Discover concerts near you, save the ones you’re going to and choose when Encore reminds you. Every show in one list, with a countdown to each.',
    primary: 'Join the waitlist',
    secondary: 'See how it works',
    note: 'Free to join. We’ll email you when early access opens.',
  },

  discover: {
    eyebrow: 'Explore',
    title: 'Find concerts near you, your way.',
    lead: 'Search for an artist, a city or a date, narrow the list by genre and see what’s on in the country you choose.',
    genresLabel: 'Filter by genre',
    genres: ['All', 'Pop', 'Rock', 'R&B', 'Latin'],
    features: [
      { title: 'Search by artist, city or date', body: 'Type what you’re after and Encore lists the upcoming concerts that match.' },
      { title: 'Filter by genre', body: 'One tap narrows the list to the music you actually listen to.' },
      { title: 'Concerts in your country', body: 'Pick your preferred country in Settings and Encore shows what’s on there.' },
      { title: 'Follow your favourite artists', body: 'Keep the artists you love close, so their next dates are easy to spot.' },
    ],
  },

  plan: {
    eyebrow: 'My concerts',
    title: 'Every concert you’re going to, in one list.',
    lead: 'Tap the heart on a concert and it moves into My concerts, sorted by date, with the venue, the time and a link to buy tickets.',
    tabs: ['Upcoming', 'Past', 'All'],
    countdown: {
      days: 'In {n} days',
      day: 'In 1 day',
      today: 'Today',
      past: 'Already played',
      units: ['days', 'hours', 'min', 'sec'],
      timeLeft: 'Time left until the concert',
    },
    cards: {
      save: { title: 'Save it with a heart', body: 'One tap on any concert adds it to your list.' },
      tabs: { title: 'Upcoming, past or all', body: 'Switch between the shows ahead, the ones you’ve been to and everything you’ve saved.' },
      countdown: { title: 'A countdown on every card', body: 'Each saved concert shows how many days are left.' },
      share: { title: 'Share it with your friends', body: 'Send a concert to whoever’s coming with you, straight from the card.' },
    },
  },

  reminders: {
    eyebrow: 'Alerts',
    title: 'Reminders on your schedule.',
    lead: 'Choose when Encore reminds you about the concerts you’ve saved: a month ahead, a week ahead, the day before or on the day.',
    options: ['30 days before', '7 days before', '1 day before', 'On the day'],
    concert: 'Concert',
    on: 'On',
    off: 'Off',
    scheduleLabel: 'Reminder schedule',
  },

  history: {
    eyebrow: 'History',
    title: 'Your gigs, even the ones nobody listed.',
    lead: 'Add the concerts Encore doesn’t list and look back at every show you’ve been to.',
    add: {
      title: 'Add a concert by hand',
      body: 'A friend’s band or a small venue nobody announced? Tap + and add it yourself.',
    },
    past: {
      title: 'Look back at past concerts',
      body: 'The Past tab keeps the shows you’ve already been to, all in one place.',
    },
  },

  waitlist: {
    eyebrow: 'Early access',
    title: 'Be there for the first Encore.',
    lead: 'Join the waitlist and we’ll email you when early access opens. We only use your address to tell you about Encore.',
    label: 'Email address',
    placeholder: 'you@example.com',
    submit: 'Join the waitlist',
    loading: 'Adding you…',
    consentBefore: 'By joining, you agree to our',
    consentLink: 'Privacy Policy',
    consentAfter: '.',
    success: {
      title: 'You’re on the list.',
      body: 'We’ll write to {email} when early access opens.',
    },
    duplicate: 'That email is already on the waitlist. We’ll be in touch when early access opens.',
    errors: {
      required: 'Enter your email address to join.',
      invalid: 'Enter a valid email address, like name@example.com.',
      tooLong: 'That email is too long. Use one under 255 characters.',
      server: 'We couldn’t add you right now. Please try again in a moment.',
      network: 'We couldn’t reach Encore. Check your connection and try again.',
      rateLimited: 'Too many attempts. Wait a minute and try again.',
    },
    noscript: 'Joining the waitlist needs JavaScript. Turn it on in your browser and reload the page.',
  },

  footer: {
    tagline: 'The concert app for live music fans.',
    product: 'Product',
    company: 'Encore',
    legal: 'Legal',
    contact: 'Contact us',
    contactNote: 'Questions about Encore or your data',
    waitlist: 'Join the waitlist',
    privacy: 'Privacy Policy',
    terms: 'Terms and Conditions',
    rights: 'All rights reserved.',
    screens: 'App screens show real events; artist names and artwork belong to their owners.',
  },

  legal: {
    updated: 'Last updated',
    back: 'Back to Encore',
  },

  notFound: {
    title: 'This page isn’t on the setlist.',
    body: 'The link may be old or mistyped. The rest of Encore is right where you left it.',
    cta: 'Go to the home page',
  },
};

export type Dictionary = typeof en;
