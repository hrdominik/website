const PROFILE = {
  nickname: "Dominik",
  name: "Dominik Höhr",
  title: "Cloud & DevOps @ CGI",
  tagline: "Souverän • Automatisiert • Skalierbar",
  location: "Paderborn / Remote",
  // availability: "Developing",
  email: { user: "mail", domain: "hoehr", tld: "net" },

  intro:
    "Lead Consultant für Cloud- und DevOps-Engineering mit über fünf Jahren Erfahrung in Architektur, Aufbau und souveränem Betrieb sicherer Plattformen.",

  heroBullets: [
    "End-to-End-Verantwortung für Cloud- und Systemarchitekturen für belastbare Plattform-Standards",
    "Souveräner Betrieb von Cloud- und On-Prem-Umgebungen mit Containerisierung, Automatisierung und klaren Betriebsmodellen",
    "Pragmatischer KI-Einsatz: als Werkzeug für Qualität und Effizienz statt Hype"
  ],

  aboutTitle: "Build. Automate. Operate.",
  aboutText:
    "Ich verbinde technische Tiefe, strategisches Verständnis und operative Umsetzungsstärke für komplexe Cloud- und Transformationsvorhaben. Mein Fokus liegt auf dem Entwurf, Aufbau und dem souveränen Betrieb sicherer, skalierbarer Plattformen in regulierten Kontexten: von Landing Zones über Hub-Spoke-Netzwerke bis zu Managed Services und belastbaren Betriebsmodellen. Durch meinen Full-Stack- und Infrastrukturhintergrund denke ich Plattform, Anwendung und Betrieb ganzheitlich. KI nutze ich bewusst als Werkzeug in der Entwicklung und Automatisierung, verantwortungsvoll, nachvollziehbar und mit klarem Mehrwert für Team und Delivery.",

  heroSkillsBanner: [
    "Souveräne Cloud",
    "Platform Operations",
    "Cloud Architektur",
    "Software Engineering"
  ],

  services: [
    {
      kicker: "Architecture",
      title: "Souveräne Cloud-Architekturen",
      text: "Konzeption von Landing Zones, Hub-Spoke-Topologien und Plattform-Blueprints mit Fokus auf Security, Governance und Nachvollziehbarkeit.",
      emphasis: "primary"
    },
    {
      kicker: "Operations",
      title: "Betrieb & Managed Services",
      text: "Stabiler Betrieb hybrider Landschaften mit Azure, StackIT und On-Prem mit klarer Verantwortung, Automatisierung und Observability.",
      emphasis: "default"
    },
    {
      kicker: "Engineering",
      title: "Automatisierung & Entwicklung",
      text: "IaC, CI/CD und moderne Softwareentwicklung für belastbare Delivery-Prozesse. KI-Tools wie Copilot und Claude werden praxisnah und kontrolliert eingesetzt.",
      emphasis: "default"
    }
  ],

  social: {
    github: "https://github.com/hrdominik",
    linkedin: "https://www.linkedin.com/in/dominik-hoehr",
    meetup: "https://www.meetup.com/de-DE/members/288437394/",
    blog: "/blog",
    links: "/links",
    tools: "/tools"
  },

  // Linktree
  linktree: {
    business: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/dominik-hoehr", desc: "Beruflicher Werdegang", icon: "linkedin" },
      { label: "GitHub", url: "https://github.com/hrdominik", desc: "Repos & Projekte", icon: "code" },
      { label: "Meetup", url: "https://www.meetup.com/de-DE/members/288437394/", desc: "Events & Networking", icon: "meetup" },
      { label: "Kontakt", url: "/assets/data/DHR.vcf", desc: "vCard", icon: "phone" },
    ],
    private: [
      { label: "Instagram", url: "https://www.instagram.com/hr.dominik", desc: "", icon: "instagram" },
      { label: "Snapchat", url: "https://www.snapchat.com/add/hrdominik", desc: "", icon: "snapchat" },
      { label: "Discord", url: "https://discord.com/users/thecrackd", desc: "", icon: "discord" },
      { label: "Steam", url: "https://steamcommunity.com/id/thecrackd", desc: "", icon: "steam" },
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
        readTime: "14 min",
        tags: ["Docker", "DevOps", "Tips"],
        excerpt:
          "Ever had an Problem with docker compose and connection your app with the database?",
      },
      {
        slug: "ai-workflow-pack-orchestrating-copilot",
        title: "Orchestrating Copilot: a repo-ready .github Workflow Pack for Enterprise AI Delivery",
        date: "2026-01-26",
        readTime: "17 min",
        tags: ["AI", "GitHub Copilot", "VS Code", "Enterprise", "Governance", "Delivery"],
        excerpt: "AI creates real value long before autonomy: through intentional orchestration under human control. This post introduces a repo-ready .github workflow pack that makes Copilot usage predictable, traceable, and enterprise-friendly—without pretending there’s one universal right way."
      },
      {
        slug: "corporate-karriere-ohne-starbucks-ai-app",
        title: "Not everyone is building the next AI app from a Starbucks table",
        date: "2026-04-30",
        readTime: "5 min",
        tags: ["Career", "Consulting", "Corporate", "Delivery"],
        excerpt: "Most meaningful work is less cinematic than startup folklore suggests. Sometimes impact looks like better platforms, clearer delivery, and fewer 2 a.m. incidents."
      },
      {
        slug: "homesetup-zwischen-spielerei-und-souveraenitaet",
        title: "Home lab or just expensive self-hosted optimism?",
        date: "2026-04-30",
        readTime: "6 min",
        tags: ["Home Lab", "Sovereignty", "Privacy", "Operations"],
        excerpt: "Between Raspberry Pi minimalism and full self-hosting ambition lies the real question: not what can be hosted at home, but what should be."
      },
      {
        slug: "consulting-netzwerk-zwischen-billability-und-afterwork",
        title: "Networking in consulting: somewhere between billability and after-work beer",
        date: "2026-04-30",
        readTime: "5 min",
        tags: ["Consulting", "Career", "Networking", "Community"],
        excerpt: "Networking gets useful when it stops being performance art and becomes honest exchange about trends, careers, client reality, and good work."
      }
    ]
  },

  skills: {
    technical: [
      {
        group: "Cloud Plattform & Infrastruktur",
        icon: "cloud",
        items: [
          { name: "Microsoft Azure", icon: "cloud", accent: true },
          { name: "StackIT", icon: "cloud", accent: true },
          { name: "Azure Arc", icon: "cloud" },
          { name: "Amazon Web Services", icon: "cloud" }
        ]
      },
      {
        group: "Netzwerk, Plattformbetrieb & Security",
        icon: "gear",
        items: [
          { name: "Landing Zones & Hub-Spoke", icon: "api", accent: true },
          { name: "Kubernetes & Docker", icon: "k8s" },
          { name: "Linux (RHEL, Debian)", icon: "server" },
          { name: "Windows Server & Active Directory", icon: "shield" }
        ]
      },
      {
        group: "Automation & Delivery",
        icon: "shield",
        items: [
          { name: "Terraform / Infrastructure as Code", icon: "terraform", accent: true },
          { name: "GitLab CI & Azure DevOps", icon: "pipeline", accent: true },
          { name: "Monitoring, Logging, Observability", icon: "pulse" },
          { name: "Berechtigungskonzepte & IAM", icon: "lock" }
        ]
      },
      {
        group: "Software Engineering",
        icon: "api",
        items: [
          { name: "Python (FastAPI)", icon: "python", accent: true },
          { name: "TypeScript / React", icon: "react" },
          { name: "Java / JakartaEE", icon: "java" },
          { name: "SQL & API Design", icon: "db" }
        ]
      }
    ],

    professional: [
      {
        group: "Architektur & Konzeption",
        icon: "cloud",
        items: [
          { name: "Souveränität in Cloud-Architekturen", icon: "shield", accent: true },
          { name: "Cloud & Plattform Architektur", icon: "cloud", accent: true },
          { name: "System Design", icon: "api" },
          { name: "Betriebsmodelle & Service Design", icon: "user" },
          { name: "Security by Design", icon: "lock" }
        ]
      },
      {
        group: "Transformation & Delivery",
        icon: "code",
        items: [
          { name: "Agile Delivery (SCRUM)", icon: "pipeline", accent: true },
          { name: "Projekt- und Risikomanagement", icon: "log" },
          { name: "Stakeholder- & Schnittstellenmanagement", icon: "user" }
        ]
      },
      {
        group: "Governance & Verantwortung",
        icon: "shield",
        items: [
          { name: "Regulierte Umgebungen", icon: "shield", accent: true },
          { name: "Kostenkontrolle & Transparenz", icon: "log" },
          { name: "Dokumentation & Entscheidungsnachvollziehbarkeit", icon: "code" }
        ]
      },
      {
        group: "KI in der Praxis",
        icon: "gear",
        items: [
          { name: "Copilot & Claude im Entwicklungsalltag", icon: "pulse", accent: true },
          { name: "Verantwortungsvoller KI-Einsatz", icon: "shield" },
          { name: "Technologische Neugier mit Pragmatismus", icon: "log" },
        ]
      },
    ]
  },

  cv: [
    {
      type: "work",
      role: "Lead Consultant | Cloud- und DevOps-Engineer",
      org: "CGI",
      start: "2024-12",
      end: null,
      summary: "Verantwortung für Architektur, Aufbau und Betrieb souveräner Cloud- und Plattformlösungen in regulierten Umgebungen mit Fokus auf Sicherheit, Skalierbarkeit und operativer Belastbarkeit.",
      highlights: [
        "Konzeption und Umsetzung von Landing-Zone- und Hub-Spoke-Architekturen inklusive Governance-, Netzwerk- und Security-Standards.",
        "Aufbau und Stabilisierung von Betriebsmodellen für Managed Services über Cloud- und On-Prem-Landschaften hinweg.",
        "Technische Beratung und Umsetzung in Themenfeldern wie Azure, StackIT, Azure Arc, IAM/Berechtigungskonzepte sowie CI/CD- und IaC-Automatisierung."
      ]
    },
    {
      type: "volunteer",
      role: "Vorstandmitglied",
      org: "Verein der BuFaK WiWi e.V.",
      start: "2023-05",
      end: "2026-05",
      summary: "Mitglied im Vereinsvorstand zur Unterstützung der Kontinuität und Durchführung der Bundesfachschaften Konferenzen."
    },
    {
      type: "education",
      role: "M.Sc. Wirtschaftsinformatik",
      org: "Universität Paderborn",
      start: "2018-10",
      end: "2025-11",
      summary: "Bachelor und Master Wirtschaftsinformatik an der Universität Paderborn.",
      highlights: [
        "Bachelor of Science Wirtschaftsinformatik (2018–2022)",
        "Master of Science Wirtschaftsinformatik (2022-2025)"
      ]
    },
    {
      type: "volunteer",
      role: "Vereins- & Vorstandsmitglied",
      org: "Hochschulgruppe Wirtschaftsinformatik Paderborn e.V.",
      start: "2019-10",
      end: "2025-11",
      summary: "Langjähriges Engagement in der Fachschaft und Hochschulgruppe Wirtschaftsinformatik.",
      highlights: [
        "Hochschulgruppe Wirtschaftsinformatik Paderborn e.V. (seit 2019)",
        "Mitglied im Vereinsvorstand der Hochschulgruppe (2023–2025)",
        "Aktives Mitglied im Fachschaftsrat Wirtschaftsinformatik (2019-2025)"
      ]
    },
    {
      type: "volunteer",
      role: "Gewähltes Mitglied in universitären Gremien",
      org: "Universität Paderborn",
      start: "2021-10",
      end: "2025-10",
      summary: "Kontinuierliche ehrenamtliche Mitwirkung in universitären Gremien und Vertretungen.",
      highlights: [
        "Kommission für Angelegenheiten des IMT und Studierendenparlament (2024–2025)",
        "Kommission für Angelegenheiten des IMT, Fakultätsrat der Fakultät Wirtschaftswissenschaften, Fachschaftsvertretung Wirtschaftswissenschaften, Prüfungsausschuss Wirtschaftsinformatik (2022–2024)",
        "Haushaltsausschuss des Studierendenparlaments (Stellv. Vorsitz), Kommission für Angelegenheiten des IMT, Prüfungsausschuss Wirtschaftsinformatik (2021–2022)"
      ]
    },
    {
      type: "work",
      role: "Geschäftsführung, IT & Events",
      org: "LOOK IN! GbR",
      start: "2022-01",
      end: "2025-08",
      summary: "Verantwortung für Events, Geschäftsführung und IT-Infrastruktur der Firmenkontaktmesse LOOK IN!",
      highlights: [
        "Ressortleitung IT, zuständig für die Sicherstellung der IT-Infrastruktur und Support (2024-2025)",
        "Geschäftsführung, verantwortlich für die Durchführung der Firmenkontaktmesse (2023-2024)",
        "Ressortleitung Events, zuständig für die Organisation von Events rund um die Firmenkontaktmesse (2022-2023)"
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
      type: "work",
      role: "Referent für Kultur & IT",
      org: "Allgemeiner Studierendenausschuss der Universität Paderborn",
      start: "2022-10",
      end: "2024-10",
      summary: "Zwei aufeinanderfolgende Referate für Kultur sowie IT beim AStA der Universität Paderborn.",
      highlights: [
        "Referent für IT, Konzeptionierung und Koordination der IT-Infrastruktur des AStA und der Aktivenschaft; Wartung, Entwicklung und Prozessoptimierung; Verantwortung von 3 Mitarbeitern (2023-2024)",
        "Referent für Kultur, Gestaltung der Kultur an und um den Campus für die Studierenden der Universität Paderborn; Unterstützung der Aktivenschaft (2022-2023)",
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
