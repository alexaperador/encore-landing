import type { Dictionary } from './en';

/**
 * Spanish copy. Typed against the English dictionary, so every key must exist.
 * Labels reuse the app's own Spanish wording (Explorar, Mis conciertos, Alertas, Ajustes…).
 */
export const es: Dictionary = {
  meta: {
    title: 'Encore — La app de conciertos para fans de la música en directo',
    description:
      'Descubre conciertos cerca de ti, filtra por género, guarda los que no te quieres perder y elige cuándo te avisa Encore. Apúntate a la lista de acceso anticipado.',
    ogAlt: 'Encore, la app de conciertos para fans de la música en directo',
    privacyTitle: 'Política de privacidad — Encore',
    privacyDescription: 'Cómo recoge, usa y protege Encore el correo electrónico que nos das al apuntarte a la lista de espera.',
    termsTitle: 'Términos y condiciones — Encore',
    termsDescription: 'Las condiciones que se aplican cuando usas la web de Encore y te apuntas a la lista de acceso anticipado.',
    notFoundTitle: 'Página no encontrada — Encore',
  },

  a11y: {
    skip: 'Saltar al contenido',
    home: 'Inicio de Encore',
    mainNav: 'Principal',
    footerNav: 'Pie de página',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    shotMyConcerts:
      'Pantalla Mis conciertos de Encore: tres conciertos guardados en Barcelona ordenados por fecha, cada uno con los días que faltan, y pestañas de próximos, pasados y todos.',
    shotExplore:
      'Pantalla Explorar de Encore: un buscador de conciertos, filtros por género (Todos, Pop, Rock, R&B y Latin) y una lista de próximos conciertos en Barcelona.',
    shotAlerts:
      'Pantalla Mis Alertas de Encore: un concierto guardado dentro de 104 días e interruptores de aviso para 30 días, 7 días y 1 día antes, y el mismo día.',
  },

  nav: {
    discover: 'Explorar',
    plan: 'Mis conciertos',
    reminders: 'Alertas',
    history: 'Historial',
    cta: 'Únete a la lista',
  },

  hero: {
    badge: 'Lista de acceso anticipado abierta',
    titleLines: ['La app de conciertos', 'para fans del directo.'],
    lead: 'Descubre conciertos cerca de ti, guarda los que no te quieres perder y elige cuándo te avisa Encore. Todos tus conciertos en una lista, con los días que faltan para cada uno.',
    primary: 'Únete a la lista',
    secondary: 'Mira cómo funciona',
    note: 'Es gratis. Te escribiremos cuando abra el acceso anticipado.',
  },

  discover: {
    eyebrow: 'Explorar',
    title: 'Encuentra conciertos cerca de ti, a tu manera.',
    lead: 'Busca un artista, una ciudad o una fecha, filtra por género y mira qué hay en el país que elijas.',
    genresLabel: 'Filtrar por género',
    genres: ['Todos', 'Pop', 'Rock', 'R&B', 'Latin'],
    features: [
      { title: 'Busca por artista, ciudad o fecha', body: 'Escribe lo que buscas y Encore te muestra los próximos conciertos que encajan.' },
      { title: 'Filtra por género', body: 'Un toque y la lista se queda con la música que de verdad escuchas.' },
      { title: 'Conciertos en tu país', body: 'Elige tu país preferido en Ajustes y Encore te enseña lo que hay allí.' },
      { title: 'Sigue a tus artistas favoritos', body: 'Ten cerca a los artistas que te gustan para no perderte sus próximas fechas.' },
    ],
  },

  plan: {
    eyebrow: 'Mis conciertos',
    title: 'Todos los conciertos a los que vas, en una lista.',
    lead: 'Toca el corazón de un concierto y pasa a Mis conciertos, ordenado por fecha, con la sala, la hora y un enlace para comprar entradas.',
    tabs: ['Próximos', 'Pasados', 'Todos'],
    countdown: {
      days: 'En {n} días',
      day: 'En 1 día',
      today: 'Hoy',
      past: 'Ya celebrado',
      units: ['días', 'horas', 'min', 'seg'],
      timeLeft: 'Tiempo que falta para el concierto',
    },
    cards: {
      save: { title: 'Guárdalo con un corazón', body: 'Un toque en cualquier concierto y se añade a tu lista.' },
      tabs: { title: 'Próximos, pasados o todos', body: 'Cambia entre los conciertos que vienen, los que ya viviste y todo lo que has guardado.' },
      countdown: { title: 'Cuenta atrás en cada tarjeta', body: 'Cada concierto guardado te dice cuántos días faltan.' },
      share: { title: 'Compártelo con tus amigos', body: 'Envía el concierto a quien vaya contigo directamente desde la tarjeta.' },
    },
  },

  reminders: {
    eyebrow: 'Alertas',
    title: 'Avisos cuando tú quieras.',
    lead: 'Elige cuándo te avisa Encore de los conciertos que has guardado: un mes antes, una semana antes, el día anterior o el mismo día.',
    options: ['30 días antes', '7 días antes', '1 día antes', 'El mismo día'],
    concert: 'Concierto',
    on: 'Activado',
    off: 'Desactivado',
    scheduleLabel: 'Calendario de avisos',
  },

  history: {
    eyebrow: 'Historial',
    title: 'Tus conciertos, también los que nadie anunció.',
    lead: 'Añade los conciertos que Encore no tiene y repasa todos a los que has ido.',
    add: {
      title: 'Añade un concierto a mano',
      body: '¿El grupo de un amigo o una sala pequeña que nadie anunció? Toca + y añádelo tú.',
    },
    past: {
      title: 'Repasa tus conciertos pasados',
      body: 'La pestaña Pasados guarda los conciertos a los que ya fuiste, todos juntos.',
    },
  },

  waitlist: {
    eyebrow: 'Acceso anticipado',
    title: 'Sé de los primeros en Encore.',
    lead: 'Apúntate a la lista de espera y te escribiremos cuando abra el acceso anticipado. Solo usaremos tu correo para hablarte de Encore.',
    label: 'Correo electrónico',
    placeholder: 'tu@ejemplo.com',
    submit: 'Únete a la lista',
    loading: 'Apuntándote…',
    consentBefore: 'Al apuntarte, aceptas nuestra',
    consentLink: 'Política de privacidad',
    consentAfter: '.',
    success: {
      title: 'Ya estás en la lista.',
      body: 'Escribiremos a {email} cuando abra el acceso anticipado.',
    },
    duplicate: 'Ese correo ya está en la lista de espera. Te escribiremos cuando abra el acceso anticipado.',
    errors: {
      required: 'Escribe tu correo electrónico para apuntarte.',
      invalid: 'Escribe un correo válido, como nombre@ejemplo.com.',
      tooLong: 'Ese correo es demasiado largo. Usa uno de menos de 255 caracteres.',
      server: 'No hemos podido apuntarte ahora mismo. Inténtalo de nuevo en un momento.',
      network: 'No hemos podido conectar con Encore. Revisa tu conexión e inténtalo de nuevo.',
      rateLimited: 'Demasiados intentos. Espera un minuto y vuelve a intentarlo.',
    },
    noscript: 'Para apuntarte a la lista necesitas JavaScript. Actívalo en tu navegador y recarga la página.',
  },

  footer: {
    tagline: 'La app de conciertos para fans del directo.',
    product: 'Producto',
    company: 'Encore',
    legal: 'Legal',
    contact: 'Escríbenos',
    contactNote: 'Dudas sobre Encore o sobre tus datos',
    waitlist: 'Únete a la lista',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    rights: 'Todos los derechos reservados.',
    screens: 'Las pantallas de la app muestran eventos reales; los nombres y las imágenes de los artistas pertenecen a sus titulares.',
  },

  legal: {
    updated: 'Última actualización',
    back: 'Volver a Encore',
  },

  notFound: {
    title: 'Esta página no está en el setlist.',
    body: 'Puede que el enlace sea antiguo o tenga una errata. El resto de Encore sigue donde lo dejaste.',
    cta: 'Ir a la página de inicio',
  },
};
