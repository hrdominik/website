const PROFILE = {
  nickname: "Dominik",
  name: "Dominik Höhr",
  title: "Cloud & DevOps @ CGI",
  tagline: "Full-Stack • DevOps • Cloud",
  location: "Paderborn / Remote",
  // availability: "Developing",
  email: { user: "dominik", domain: "hoehr", tld: "net" },

  intro:
    "Cloud- & DevOps-Engineer (Lead Consultant) mit Full-Stack Background – Fokus auf Automatisierung, zuverlässigen Betrieb und souveräne Architekturen.",

  heroBullets: [
    "End-to-End-Verantwortung für Cloud- und Systemarchitekturen von der Konzeption bis zum Betrieb",
    "Cloud-native Entwicklung mit Containern, Kubernetes, Microservices und CI/CD-Automatisierung",
    "Erfahrung in regulierten Umgebungen mit hohem Anspruch an Sicherheit, Governance und Kostenkontrolle"
  ],

  aboutTitle: "Build. Ship. Automate.",
  aboutText:
    "Ich bringe über fünf Jahre Erfahrung in der Software-, Cloud- und Plattformentwicklung mit und habe in unterschiedlichen Rollen als Full-Stack-Entwickler, DevOps Engineer und Solution Architect gearbeitet. Mein Schwerpunkt liegt auf der Konzeption und Umsetzung skalierbarer, sicherer Cloud-Plattformen sowie der Entwicklung verteilter Backend-Systeme. Dabei verbinde ich technisches Tiefenverständnis mit strukturiertem Vorgehen, arbeite gerne in agilen Teams und übernehme Verantwortung für Architekturentscheidungen und deren Umsetzung. Besonders motiviert mich die Aufgabe, komplexe Anforderungen in robuste, nachhaltige technische Lösungen zu überführen und mich dabei kontinuierlich fachlich weiterzuentwickeln.",

  social: {
    github: "https://github.com/hrdominik",
    linkedin: "https://www.linkedin.com/in/dominik-hoehr",
    blog: "/blog",
    links: "/links",
    tools: "/tools"
  },

  // Linktree
  linktree: {
    business: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dominik-hoehr", desc: "Beruflicher Werdegang", icon: "linkedin" },
      { label: "GitHub", url: "https://github.com/hrdominik", desc: "Repos & Projekte", icon: "code" },
      { label: "Kontakt", url: "/assets/data/DHR.vcf", desc: "", icon: "phone" },
    ],
    private: [
      { label: "Instagram", url: "#", desc: "", icon: "pulse" },
      { label: "Snapchat", url: "#", desc: "", icon: "pulse" },
      { label: "Discord", url: "#", desc: "", icon: "gaming" },
      { label: "Steam", url: "#", desc: "", icon: "gaming" },
      { label: "PayPal", url: "https://www.paypal.me/dhoehr", desc: "", icon: "money" },
    ]
  },
  
  // Tools
  tools: [
    { name: "Turnierplan", desc: "Einfacher, Konfigurierbarer Turnierplan für Turniere mit mehreren Spielplätzen", url: "https://tools.hoehr.net/turnierplan/", tag: "Freizeit", icon: "log" },
    { name: "Endnotenrechner", desc: "Berechne deine Endnote des Studiums an der Universität Paderborn", url: "https://tools.hoehr.net/endnotenrechner/", tag: "Studium", icon: "pulse" },
  ],

  // Blog posts
  blog: {
    posts: [
      {
        slug: "docker-fights-database",
        title: "Docker compose and database connections",
        date: "2025-07-10",
        readTime: "17 min",
        tags: ["Docker", "DevOps", "Tips"],
        excerpt:
          "Ever had an Problem with docker compose and connection your app with the database?",
        // markdown: 
      }
    ]
  },

  skills: {
    technical: [
      {
        group: "Entwicklungs- und Buildprozess",
        icon: "gear",
        items: [
          { name: "GitLab, Azure DevOps", icon: "pipeline", accent: true },
          { name: "Kubernetes", icon: "k8s", accent: true },
          { name: "Docker", icon: "box" },
          { name: "Nginx", icon: "server" }
        ]
      },
      {
        group: "Cloud und Infrastruktur",
        icon: "cloud",
        items: [
          { name: "Amazon Web Services", icon: "cloud" },
          { name: "Microsoft Azure", icon: "cloud", accent: true },
          { name: "Infrastructure as Code", icon: "terraform" },
          { name: "Monitoring/Logging", icon: "pulse" }
        ]
      },
      {
        group: "Backend",
        icon: "backend",
        items: [
          { name: "Python, insb. FastAPI- und Flask Server", icon: "python", accent: true },
          { name: "Java/JakartaEE", icon: "java", accent: true },
          { name: "C#, C", icon: "code" },
          { name: "SQL", icon: "db" }
        ]
      },
      {
        group: "Frontend",
        icon: "frontend",
        items: [
          { name: "HTML5, CSS", icon: "web" },
          { name: "Typescript", icon: "react", accent: true },
          { name: "Flutter", icon: "code" },
          { name: "PHP, Wordpress-Plugins", icon: "web" }
        ]
      }
    ],

    professional: [
      {
        group: "Projektmanagement",
        icon: "code",
        items: [
          { name: "Agile Delivery (SCRUM)", icon: "pipeline" },
          { name: "Projekt- und Risikomanagement", icon: "log" },
          { name: "Stakeholder Management", icon: "shield" }
        ]
      },
      {
        group: "Modellierung",
        icon: "db",
        items: [
          { name: "Business Process Model and Notation 2.0 / Erweiterte Ereignisgesteuerte Prozesskette", icon: "db" },
          { name: "Datenbank Modellierung und Normalisierung", icon: "db" }
        ]
      },
      {
        group: "Tools",
        icon: "gear",
        items: [
          { name: "SAP", icon: "code" },
          { name: "Data Science, CRISP-DM, R", icon: "log" },
          { name: "Jupyter, Machine Learning, LLM", icon: "pulse" },
          { name: "Microsoft Powerautomate (ehem. Flow)", icon: "cloud" },
        ]
      },
      {
        group: "Architektur & Konzeption",
        icon: "cloud",
        items: [
          { name: "Private and Sovereign Cloud", icon: "shield" },
          { name: "Cloud Architecture", icon: "cloud", accent: true },
          { name: "System Design", icon: "api" },
          { name: "Security Basics", icon: "shield" }
        ]
      }
    ]
  },

  cv: [
    {
      type: "work",
      role: "Lead Consultant | Cloud- und DevOps-Engineer",
      org: "CGI",
      start: "2024-12",
      end: null,
      summary: "Entwicklung von leistungsfähigen Cloud-Architekturen mit Fokus auf Sicherheit und automatisierter Bereitstellung"
    },
    {
      type: "work",
      role: "Geschäftsführung, IT & Events",
      org: "LOOK IN! GbR",
      start: "2022-01",
      end: "2025-08",
      summary: "Verantwortung für Events, Geschäftsführung und IT-Infrastruktur der Firmenkontaktmesse LOOK IN!",
      highlights: [
        "Ressortleitung Events (01/2022–07/2023): Organisation von Events rund um die Firmenkontaktmesse",
        "Geschäftsführung (07/2023–07/2024): Geschäftsführung und Durchführung der Firmenkontaktmesse",
        "Ressortleitung IT (07/2024–08/2025): Sicherstellung der IT-Infrastruktur und Support"
      ]
    },
    {
      type: "work",
      role: "Referent für Kultur & IT",
      org: "Allgemeiner Studierendenausschuss der Universität Paderborn",
      start: "2022-10",
      end: "2024-10",
      summary: "Zwei aufeinanderfolgende Referate für Kultur sowie IT beim AStA der Universität Paderborn.",
      highlights: [
        "Referent für Kultur (10/2022–10/2023): Gestaltung der Kultur an und um den Campus für die Studierenden der Universität Paderborn; Unterstützung der Aktivenschaft",
        "Referent für IT (10/2023–10/2024): Konzeptionierung und Koordination der IT-Infrastruktur des AStA und der Aktivenschaft; Wartung, Entwicklung und Prozessoptimierung; Verantwortung von 3 Mitarbeitern"
      ]
    },
    {
      type: "work",
      role: "IT-Consultant & Full-Stack-Entwickler",
      org: "Beckmann & Partner Consult",
      start: "2020-08",
      end: "2024-11",
      summary: "Full-Stack-Entwickler & IT-Projektmanager",
      highlights: [
        "Konzeptionierung und Realisierung interner Projekte.",
        "Full-Stack-Entwickler und DevOps-Engineer für RESTful Webservices und deren Architektur."
      ]
    },
    {
      type: "education",
      role: "Wirtschaftsinformatik (B.Sc. & M.Sc.)",
      org: "Universität Paderborn",
      start: "2018-10",
      end: "2025-11",
      summary: "Bachelor (10/2018–04/2022) und Master (04/2022–11/2025) Wirtschaftsinformatik an der Universität Paderborn.",
      highlights: [
        "Bachelor of Science Wirtschaftsinformatik (2018–2022)",
        "Master of Science Wirtschaftsinformatik (seit 2022)"
      ]
    },
    {
      type: "volunteer",
      role: "Gewählte Gremienarbeit",
      org: "Universität Paderborn Gremien",
      start: "2021-10",
      end: "2025-10",
      summary: "Kontinuierliche ehrenamtliche Mitwirkung in universitären Gremien und Vertretungen.",
      highlights: [
        "2021–2022: Haushaltsausschuss des Studierendenparlaments (Stellv. Vorsitz), Kommission für Angelegenheiten des IMT, Prüfungsausschuss Wirtschaftsinformatik",
        "2022–2024: Kommission für Angelegenheiten des IMT, Fakultätsrat der Fakultät Wirtschaftswissenschaften, Fachschaftsvertretung Wirtschaftswissenschaften, Prüfungsausschuss Wirtschaftsinformatik",
        "2024–2025: Kommission für Angelegenheiten des IMT und Studierendenparlament"
      ]
    },
    {
      type: "volunteer",
      role: "Vereinsmitgliedschaft & Vorstandsmitglied",
      org: "Hochschulgruppe Wirtschaftsinformatik Paderborn e.V.",
      start: "2019-10",
      end: "2025-11",
      summary: "Langjähriges Engagement in der Fachschaft und Hochschulgruppe Wirtschaftsinformatik.",
      highlights: [
        "Aktives Mitglied seit 2019 im Fachschaftsrat Wirtschaftsinformatik sowie der Hochschulgruppe Wirtschaftsinformatik Paderborn e.V.",
        "Mitglied im Vereinsvorstand der Hochschulgruppe (07/2023–07/2025)"
      ]
    },
    {
      type: "volunteer",
      role: "Vorstandmitglied",
      org: "Verein der BuFaK WiWi e.V.",
      start: "2023-05",
      end: null,
      summary: "Mitglied im Vereinsvorstand zur Unterstützung der Kontinuität und Durchführung der Bundesfachschaften Konferenzen.",
      highlights: [
        "Unterstützung der Kontinuität und Durchführung der Bundesfachschaften Konferenzen"
      ]
    },
    {
      type: "volunteer",
      role: "Teilnahme an Python Sprints & Community Events",
      org: "Python Sprints, Düsseldorf (PyDDF)",
      summary: "Teilnahme an Python Sprints in Düsseldorf (PyDDF) sowie weiteren Community-Events und MeetUps"
    }
  ]
};
