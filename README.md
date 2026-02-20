# dominik.hoehr.net — Personal Portfolio Website

A minimal, data-driven personal portfolio and blog — built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, just static files served via Apache.

**Live:** [https://dominik.hoehr.net](https://dominik.hoehr.net)

## Table of Contents

- [dominik.hoehr.net — Personal Portfolio Website](#dominikhoehrnet--personal-portfolio-website)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Architecture](#architecture)
    - [Script Loading Strategy](#script-loading-strategy)
  - [Pages](#pages)
  - [Key Features](#key-features)
    - [Data-Driven Rendering via `profile.js`](#data-driven-rendering-via-profilejs)
    - [Email Obfuscation](#email-obfuscation)
    - [Blog with Client-Side Markdown Renderer](#blog-with-client-side-markdown-renderer)
    - [Links](#links)
    - [Tools (Hosted somewhere else)](#tools-hosted-somewhere-else)
    - [Inline SVG Icon System](#inline-svg-icon-system)
  - [Server Configuration](#server-configuration)
    - [`.htaccess`](#htaccess)
    - [`robots.txt`](#robotstxt)
  - [Design System](#design-system)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [License](#license)

## Overview

This repository contains the source code for a personal portfolio website. The entire site is static — no server-side rendering, no bundler, no Node.js required. Content is managed through a single JavaScript data file (`profile.js`), making updates as simple as editing one object and deploying.

## Architecture

| Layer | Technology |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (CDN) + custom CSS (`styles.css`) |
| **Logic** | Vanilla ES6+ JavaScript (defer-loaded, no transpilation) |
| **Font** | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (self-hosted variable font) |
| **Hosting** | Apache (static file serving via `.htaccess`) |

There is **no build step**. All files are served as-is. Tailwind is loaded from CDN with an inline configuration block, so the design utilities are available without any local tooling.

### Script Loading Strategy

Every page loads three core scripts in order (using `defer` to preserve execution sequence):

1. **`base.js`** — Shared utilities: data binding engine, email hydration, icon renderer, helpers
2. **`profile.js`** (data) — The `PROFILE` constant containing all site content
3. **Page-specific renderer** — e.g. `profile.js` (portfolio), `blogs.js`, `links.js`, or `tools.js`

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `index.html` | Main portfolio — hero, about, skills, CV timeline, contact |
| `/links/` | `links/index.html` | Self-hosted linktree with business & private link sections |
| `/blog/` | `blog/index.html` | Blog index — card grid of all posts |
| `/blog/blog-post.html?slug=…` | `blog/blog-post.html` | Individual blog post (markdown rendered client-side) |
| `/tools/` | `tools/index.html` | Showcase of small utilities (hosted on `tools.hoehr.net`) |
| `/impressum/` | `impressum/index.html` | Legal notice (Impressum) |
| `/datenschutz/` | `datenschutz/index.html` | Privacy policy (Datenschutzerklärung) |

## Key Features

### Data-Driven Rendering via `profile.js`

All personal content lives in a single `PROFILE` object inside `assets/data/profile.js`. This includes:

- Name, title, tagline, location
- Hero section bullet points
- About text
- Social links (GitHub, LinkedIn, blog, linktree, tools)
- Linktree entries (business & private categories)
- Tools metadata (name, description, URL, tag)
- Blog post metadata (slug, title, date, read time, tags, excerpt)
- Skills (technical & professional, grouped with icons and accent flags)
- Full CV / experience timeline (work, education, volunteering)

The HTML templates use **declarative data binding** via custom attributes:

```html
<!-- Text binding -->
<span data-bind="nickname">Dominik</span>

<!-- Attribute binding -->
<a data-bind-attr="href:social.linkedin" href="#">LinkedIn</a>
```

The `bindText()` function in `base.js` resolves dot-notation paths against the `PROFILE` object and injects values into the DOM at load time. This means **updating any content requires editing only `profile.js`** — no HTML changes needed.

### Email Obfuscation

The email address is **never written as plain text** in the source code. Instead, it is stored as a decomposed object:

```javascript
email: { user: "dominik", domain: "hoehr", tld: "net" }
```

At runtime, `hydrateEmailEverywhere()` assembles the address from its parts and injects `mailto:` links into multiple CTA elements across all pages. This prevents automated scrapers and spam bots from harvesting the email from the raw HTML or JavaScript source, since no single string contains the full address.

### Blog with Client-Side Markdown Renderer

Blog posts are authored as standard Markdown files stored in `/blog/<slug>.md`. The rendering pipeline works as follows:

1. **Post metadata** is defined in `PROFILE.blog.posts` (title, date, tags, excerpt, slug)
2. The **blog index** (`blog/index.html`) renders clickable cards from the metadata
3. When a post is opened, `blogs.js` reads the `?slug=` query parameter, fetches the corresponding `.md` file via `fetch()`, and renders it client-side
4. A **custom `markdownToHtml()` parser** converts Markdown to HTML — supporting:
   - Headings (`#` through `######`)
   - Fenced code blocks (with language class for syntax highlighting)
   - Unordered lists, blockquotes
   - Inline formatting: bold, italic, inline code
   - Links (with a **safe-URL allowlist** that blocks `javascript:` and `data:` URIs)
5. All user-provided content is **HTML-escaped** before rendering to prevent XSS

No external Markdown library is used — the renderer is fully self-contained in `blogs.js`.

### Links

The `/links/` page serves as a self-hosted alternative to services like Linktree. Links are defined in `PROFILE.linktree` with two categories:

- **Business** — LinkedIn, GitHub, downloadable vCard contact file
- **Private** — Instagram, Snapchat, Discord, Steam, PayPal

Each link entry supports a label, URL, description, icon, and optional styling (e.g. `ink` for inverted cards). A downloadable **vCard file** (`assets/data/DHR.vcf`) is also available directly from the linktree.

### Tools (Hosted somewhere else)

The `/tools/` page showcases small web utilities. The tools themselves are **hosted on a separate subdomain** (`tools.hoehr.net`), not in this repository. This page only provides metadata-driven cards that link out to the hosted tools:

- **Turnierplan** — Configurable tournament bracket planner
- **Endnotenrechner** — Final grade calculator for Paderborn University

Tool entries are defined in `PROFILE.tools` and rendered dynamically by `tools.js`.

### Inline SVG Icon System

All icons across the site are rendered as **inline SVGs** via the `iconSvg()` function in `base.js`. This eliminates external icon library dependencies and keeps the page self-contained. Over 25 icon variants are available (cloud, shield, pipeline, code, database, etc.), selectable by key name.

## Server Configuration

### `.htaccess`

The Apache `.htaccess` file provides two main features:

**Vanity redirects** — Short URLs that 301-redirect to external services:

```
/asap   → PayPal
/geld   → PayPal
```

**Custom error pages** — Fully styled error pages matching the portfolio design for HTTP status codes 400, 401, 403, 404, 405, 415, 500, and 503 (maintenance). Each error page uses the same Tailwind + custom CSS design system as the main site.

### `robots.txt`

The `robots.txt` restricts crawlers from indexing:

| Rule | Reason |
|---|---|
| `/links/` | Linktree is personal, not intended for search indexing |
| `/*?` | Prevents indexing of query-parameterized URLs (e.g. blog post slugs) |
| `/*.vcf$` | Blocks indexing of the downloadable contact vCard |
| `/*.md$` | Prevents raw Markdown files from appearing in search results |

## Design System

The site follows a minimal **"ink on paper"** aesthetic:

- **Color palette:** Near-black (`#0B0B0C` / "ink") on off-white (`#F6F6F7` / "paper")
- **Typography:** Space Grotesk (display headings) + system font stack (body)
- **Components:** Cards with `24px` border radius, pill-shaped buttons and tags, crisp box shadows
- **Effects:** Frosted-glass sticky header (backdrop-filter blur), gradient blob accents, subtle dot-grid noise overlay
- **Responsive:** Mobile-first layout using Tailwind's responsive breakpoints, with CSS custom property adjustments for portrait positioning

## Project Structure

```
website/
├── index.html                    # Main portfolio page
├── .htaccess                     # Apache redirects & error pages
├── robots.txt                    # Crawler directives
├── assets/
│   ├── css/
│   │   └── styles.css            # Custom styles & component library
│   ├── data/
│   │   ├── profile.js            # Central data source (PROFILE object)
│   │   └── DHR.vcf               # Downloadable vCard contact
│   ├── error-pages/              # Styled error pages (400–503)
│   ├── fonts/                    # Space Grotesk variable font
│   ├── icons/                    # Favicon (PNG + ICO)
│   ├── img/                      # Portrait and other images
│   └── js/
│       ├── base.js               # Core utilities, data binding, icons
│       ├── profile.js            # Portfolio page renderer (skills, CV)
│       ├── blogs.js              # Blog index + markdown post renderer
│       ├── links.js              # Linktree renderer
│       └── tools.js              # Tools page renderer
├── blog/
│   ├── index.html                # Blog index page
│   ├── blog-post.html            # Blog post viewer (loads .md via slug)
│   └── *.md                      # Blog post markdown files
├── links/
│   └── index.html                # Linktree page
├── tools/
│   └── index.html                # Tools showcase page
├── impressum/
│   └── index.html                # Legal notice
└── datenschutz/
    └── index.html                # Privacy policy
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd website
   ```

2. **Edit content** — Open `assets/data/profile.js` and modify the `PROFILE` object. All pages will reflect the changes on reload.

3. **Add a blog post**:
   - Write a Markdown file in `blog/` (e.g. `blog/my-new-post.md`)
   - Add a metadata entry to `PROFILE.blog.posts` in `profile.js`
   - The post will appear on the blog index and be renderable via its slug

4. **Deploy** — Upload the `website/` directory to any Apache-compatible web host. No build step required.

## License

This project is licensed under the [MIT License](LICENSE).


*glhf - Dominik*