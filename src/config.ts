// Site configuration
// Valentina Rastrilla Heindl - Marketing & Communications Portfolio

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  language: "es",
  title: "Valentina Rastrilla Heindl | Estratega de Marketing y Comunicación",
  description: "Portafolio profesional de Valentina Rastrilla Heindl. Especialista en marketing digital, estrategia de comunicación y gestión de marca. Proyectos para Fundación Visión Cero, EcoCraft y más.",
};

// Navigation configuration
export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  links: NavLink[];
  contactLabel: string;
  contactHref: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "Valentina Rastrilla Heindl",
  links: [
    { label: "Inicio", href: "#hero" },
    { label: "Sobre Mí", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Proyectos", href: "#portfolio" },
    { label: "Videos", href: "#videos" },
  ],
  contactLabel: "Contactar",
  contactHref: "#contact-form",
};

// Hero section configuration
export interface HeroConfig {
  name: string;
  roles: string[];
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  name: "Valentina Rastrilla Heindl",
  roles: [
    "Estratega de Marketing",
    "Comunicación Digital",
    "Gestión de Marca",
    "Social Media",
    "Publicidad Digital",
    "Content Creator",
  ],
  backgroundImage: "/images/hero-bg.jpg",
};

// About section configuration
export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutConfig {
  label: string;
  description: string;
  experienceValue: string;
  experienceLabel: string;
  stats: AboutStat[];
  images: AboutImage[];
}

export const aboutConfig: AboutConfig = {
  label: "Sobre Mí",
  description: "Soy Valentina Rastrilla Heindl, estratega de marketing y comunicación con pasión por crear campañas digitales que conectan marcas con sus audiencias. Mi enfoque combina creatividad, análisis de datos y comprensión profunda del comportamiento del consumidor para desarrollar estrategias que generan resultados medibles. He trabajado en proyectos diversos, desde ONGs como Fundación Visión Cero hasta emprendimientos sostenibles como EcoCraft, siempre adaptando mi approach a las necesidades únicas de cada cliente.",
  experienceValue: "2+",
  experienceLabel: "Años de\nExperiencia",
  stats: [
    { value: "5+", label: "Proyectos\nCompletados" },
    { value: "5+", label: "Clientes\nSatisfechos" },
  ],
  images: [
    { src: "/images/about-1.jpg", alt: "Valentina trabajando en estrategia de marketing" },
    { src: "/images/about-2.jpg", alt: "Análisis de contenido digital" },
  ],
};

// Services section configuration
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  label: string;
  heading: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  label: "Servicios",
  heading: "Soluciones de Marketing que Impulsan tu Marca",
  services: [
    {
      iconName: "Compass",
      title: "Estrategia de Marketing Digital",
      description: "Desarrollo de planes integrales de marketing digital alineados con objetivos de negocio. Incluye análisis de mercado, definición de KPIs, planificación de contenidos y estrategias de crecimiento.",
      image: "/images/service-1.jpg",
    },
    {
      iconName: "Palette",
      title: "Desarrollo de Marca",
      description: "Creación y fortalecimiento de identidad de marca. Definición de voz, valores visuales, guías de estilo y estrategias de posicionamiento para diferenciarte en el mercado.",
      image: "/images/service-2.jpg",
    },
    {
      iconName: "Camera",
      title: "Gestión de Redes Sociales",
      description: "Administración completa de presencia en redes sociales. Creación de contenido, programación, community management, análisis de métricas y optimización continua.",
      image: "/images/service-3.jpg",
    },
    {
      iconName: "TrendingUp",
      title: "Publicidad Digital",
      description: "Campañas publicitarias en Meta Ads, Instagram Ads y otras plataformas. Segmentación estratégica, optimización de presupuesto y maximización de ROI.",
      image: "/images/service-4.jpg",
    },
  ],
};

// Portfolio section configuration
export interface ProjectItem {
  title: string;
  category: string;
  year: string;
  image: string;
  featured?: boolean;
  description?: string;
  objectives?: string[];
  strategies?: string[];
  results?: string;
  pdf?: string;
}

export interface PortfolioCTA {
  label: string;
  heading: string;
  linkText: string;
  linkHref: string;
}

export interface PortfolioConfig {
  label: string;
  heading: string;
  description: string;
  projects: ProjectItem[];
  cta: PortfolioCTA;
  viewAllLabel: string;
}

export const portfolioConfig: PortfolioConfig = {
  label: "Proyectos",
  heading: "Trabajos Destacados",
  description: "Una selección de proyectos que representan mi experiencia en estrategia de marketing, comunicación digital y gestión de marca. Cada proyecto es una historia única de transformación y crecimiento.",
  projects: [
    {
      title: "Fundación Visión Cero",
      category: "Marketing de Contenidos & Publicidad Digital",
      year: "2026",
      image: "",
      featured: true,
      pdf: "/media/vision-cero-analisis.pdf",
      description: "Desarrollo de estrategia integral de marketing digital para ONG de seguridad vial en Córdoba. El proyecto incluyó planificación de contenidos, publicidad digital segmentada y campañas de concientización dirigidas a jóvenes de 18-29 años.",
      objectives: [
        "Aumentar visibilidad en redes sociales un 40% en jóvenes de 18-29 años",
        "Incrementar alcance a 8.000 seguidores en redes sociales",
        "Lograr 40% de interacción con el contenido",
        "Incorporar 200 nuevos donantes recurrentes"
      ],
      strategies: [
        "Marketing de Contenidos en Instagram (Reels, carruseles, historias)",
        "Publicidad Digital con Instagram Ads segmentada",
        "Voz de marca: Educativa, Empática y Comunitaria",
        "Ejes temáticos: Riesgos cotidianos al conducir y Seguridad en números",
        "Presupuesto publicitario: $270.000 ARS en campañas segmentadas"
      ],
      results: "Proyección de crecimiento desde 2.278 seguidores hasta 8.000, con aumento progresivo del engagement mensual y captación de donantes mediante formularios digitales y campañas con llamados a la acción."
    },
    {
      title: "EcoCraft - Artesanías Sostenibles",
      category: "Estrategia Digital & Social Media",
      year: "2025",
      image: "",
      pdf: "/media/ecocraft-analisis.pdf",
      description: "Plan de intervención digital completo para emprendimiento de artesanías con compromiso de economía circular. El proyecto incluyó análisis FODA, definición de buyer personas, ecosistema digital y 6 campañas digitales.",
      objectives: [
        "Optimizar presencia digital con 30% aumento en alcance orgánico",
        "Incrementar ventas directas y reconocimiento de marca en 25%",
        "Definir KPIs medibles: tasa de interacción, alcance, crecimiento de seguidores"
      ],
      strategies: [
        "Gestión activa en Instagram y Facebook",
        "6 campañas digitales: EcoCraft en tu hogar, Aprende en EcoCraft, Renová tu espacio",
        "Embudo de conversión con contenido educativo y promocional",
        "Calendario de contenidos y presupuesto mensual estimado",
        "Segmentación: personas 25-45 años interesadas en consumo responsable"
      ],
      results: "Estrategia diseñada para consolidar presencia digital y potenciar crecimiento sostenible, alineada con identidad de marca sustentable."
    },
    {
      title: "Golden Groove Sunset",
      category: "Promoción de Eventos & Content Creation",
      year: "2026",
      image: "/images/portfolio-3.jpg",
      description: "Desarrollo de contenido audiovisual para evento de música electrónica en Antares del Faro. Producción de video promocional capturando la esencia del evento y su atmósfera única.",
      objectives: [
        "Crear contenido visual atractivo para promoción del evento",
        "Capturar la atmósfera y energía del Golden Groove Sunset",
        "Generar engagement en redes sociales del evento"
      ],
      strategies: [
        "Producción de video promocional con tomas dinámicas",
        "Captura de ambiente, música y experiencia del evento",
        "Edición orientada a generar expectativa y asistencia"
      ],
      results: "Video promocional que transmite la experiencia única del evento, utilizado en campañas de difusión en redes sociales."
    },
  ],
  cta: {
    label: "",
    heading: "",
    linkText: "",
    linkHref: "",
  },
  viewAllLabel: "",
};

// Videos section configuration
export interface VideoItem {
  title: string;
  description: string;
  src: string;
  thumbnail?: string;
}

export interface VideosConfig {
  label: string;
  heading: string;
  description: string;
  videos: VideoItem[];
}

export const videosConfig: VideosConfig = {
  label: "Videos",
  heading: "Producción Audiovisual",
  description: "Muestra de mi trabajo en producción de contenido audiovisual para diferentes proyectos y clientes.",
  videos: [
    {
      title: "Agencia de Marketing Digital",
      description: "Video promocional desarrollado para presentación de servicios de agencia de marketing digital. Muestra la propuesta de valor, servicios ofrecidos y enfoque estratégico.",
      src: "/media/video-marketing.mp4",
    },
    {
      title: "Golden Groove Sunset - Evento",
      description: "Video del evento Golden Groove Sunset en Antares del Faro. Captura la atmósfera, la música y la experiencia única de este evento de música electrónica.",
      src: "/media/video-evento.mp4",
    },
  ],
};

// CTA section configuration
export interface CTAConfig {
  tags: string[];
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  email: string;
  backgroundImage: string;
}

export const ctaConfig: CTAConfig = {
  tags: ["Estratega de Marketing", "Social Media Manager", "Content Creator"],
  heading: "¿Listo para Impulsar tu Marca?",
  description: "Estoy aquí para ayudarte a desarrollar estrategias de marketing que generen resultados reales. Desde la planificación hasta la ejecución, trabajemos juntos para llevar tu marca al siguiente nivel.",
  buttonText: "Iniciar Proyecto",
  buttonHref: "mailto:valchurastrilla@gmail.com",
  email: "valchurastrilla@gmail.com",
  backgroundImage: "/images/cta-bg.jpg",
};

// Footer section configuration
export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterConfig {
  logo: string;
  description: string;
  columns: FooterLinkColumn[];
  socialLinks: SocialLink[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  newsletterPlaceholder: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  logo: "Valentina Rastrilla Heindl",
  description: "Estratega de Marketing y Comunicación especializada en crear conexiones significativas entre marcas y sus audiencias.",
  columns: [
    {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "#hero" },
        { label: "Sobre Mí", href: "#about" },
        { label: "Servicios", href: "#services" },
        { label: "Proyectos", href: "#portfolio" },
        { label: "Videos", href: "#videos" },
      ],
    },
    {
      title: "Servicios",
      links: [
        { label: "Marketing Digital", href: "#services" },
        { label: "Social Media", href: "#services" },
        { label: "Desarrollo de Marca", href: "#services" },
        { label: "Publicidad Digital", href: "#services" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: "valchurastrilla@gmail.com", href: "mailto:valchurastrilla@gmail.com" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/valentina-rastrilla-heindl?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
      ],
    },
  ],
  socialLinks: [
    { iconName: "Linkedin", href: "https://www.linkedin.com/in/valentina-rastrilla-heindl?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
  ],
  newsletterHeading: "",
  newsletterDescription: "",
  newsletterButtonText: "",
  newsletterPlaceholder: "",
  copyright: "© 2026 Valentina Rastrilla Heindl. Todos los derechos reservados.",
  credit: "Diseñado y desarrollado con pasión",
};
