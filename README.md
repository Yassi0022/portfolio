# Yassi Portfolio

A sophisticated portfolio website for a Data Scientist & Backend Developer, built with **Astro**, **React**, and **Tailwind CSS**. Features generative/algorithmic visualizations, deep technical case studies, and GitHub integration.

## 🚀 Tech Stack

- **Framework**: Astro 4.x (Static Site Generation)
- **Interactivity**: React 18 Islands (for canvas animations, modals, visualizations)
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Strict mode throughout
- **Deployment**: GitHub Pages via GitHub Actions
- **Syntax Highlighting**: Prism.js (VS Code Dark+ theme)

## ✨ Features

### Generative Hero Animation
- **Data-driven particle system** visualizing ML pipeline: Ingestion → Transformation → Inference
- Canvas 2D rendering with Web Worker support (60fps target)
- Code rain background with syntax-highlighted tokens from actual projects
- Respects `prefers-reduced-motion` with static SVG fallback
- Interactive: mouse influences particle flow, click creates burst

### Projects Showcase
- 3 featured projects with detailed case studies:
  1. **California Housing MLOps** — End-to-end ML pipeline (XGBoost + FastAPI + MLflow)
  2. **HR Attrition Analysis** — Predictive analytics with SHAP interpretability
  3. **HobbyBuddy** — Full-stack social matching (Spring Boot + React + proprietary algorithm)
- Micro-interactions: tilt on hover, border glow, staggered entrance
- Live GitHub stats (stars, forks, languages) fetched at build time

### Interactive Skills Visualization
- Force-directed graph of 32+ skills across 4 categories
- Node size = proficiency, edges = skill relationships
- Click to filter by category, hover for details
- Categories: Backend, Data Engineering, Machine Learning, DevOps

### Deep Case Studies
Each project includes:
- Problem & business context
- System architecture (Mermaid diagrams)
- Key technical decisions with trade-offs
- Annotated code highlights
- Metrics & results with business impact
- "What I'd do differently" — senior engineer reflections

### Performance & Accessibility
- Lighthouse targets: Performance ≥ 95, Accessibility ≥ 95
- Zero-JS by default (Astro islands only hydrate interactive components)
- Semantic HTML, proper heading hierarchy
- Keyboard navigation, focus management, ARIA labels
- `prefers-reduced-motion` and `prefers-contrast` support

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── fonts/           # Self-hosted fonts (JetBrains Mono, IBM Plex Sans, Space Grotesk)
│   ├── images/          # Project thumbnails, OG image
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── hero/           # GenerativeHero, ParticleSystem, CodeRainEffect
│   │   ├── projects/       # ProjectCard, ProjectGrid, CaseStudyModal
│   │   ├── skills/         # SkillsVisualization, SkillsSection
│   │   ├── navigation/     # Navbar, ThemeToggle
│   │   ├── layout/         # Layout, Footer, SEOMeta
│   │   └── ui/             # CodeBlock, Button
│   ├── content/
│   │   ├── case-studies/   # MDX case studies
│   │   └── projects/       # Project metadata
│   ├── data/
│   │   ├── projects.ts     # Project data + types
│   │   ├── skills.ts       # Skills taxonomy + relationships
│   │   └── constants.ts    # Site config, colors, animation config
│   ├── styles/
│   │   └── global.css      # Tailwind + design tokens + animations
│   ├── utils/
│   │   ├── animation.ts    # Easing, stagger, reduced-motion hooks
│   │   ├── github.ts       # GitHub GraphQL API + fallback data
│   │   └── scroll.ts       # IntersectionObserver, parallax, scroll spy
│   ├── pages/
│   │   ├── index.astro
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── scripts/
│       └── generate-sitemap.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── .github/workflows/deploy.yml
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors (CSS Custom Properties)
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: #141414;
  --accent-code: #569cd6;   /* Blue — backend, code */
  --accent-data: #4ec9b0;   /* Teal — data, analytics */
  --accent-ai: #c586c0;     /* Purple — ML, AI */
  --accent-warn: #dcdcaa;   /* Yellow — metrics */
}
```

### Typography
- **Display**: Space Grotesk
- **UI**: IBM Plex Sans
- **Mono**: JetBrains Mono

### Spacing Scale
4px base unit: `--space-1` through `--space-8` (4px → 96px)

## 📦 Deployment

### GitHub Pages Setup
1. Create repository named `portfolio`
2. Enable GitHub Pages in Settings → Pages → Source: GitHub Actions
3. Push to `main` branch — workflow auto-deploys

### Custom Domain (Optional)
1. Add `CNAME` file to `public/` with your domain
2. Configure DNS: CNAME → `yassi0022.github.io`
3. Enable "Enforce HTTPS" in GitHub Pages settings

## 🔧 Configuration

### Environment Variables
Create `.env` for local development:
```env
GITHUB_TOKEN=ghp_xxx  # For live GitHub stats (optional)
```

### Adding Projects
1. Add project data to `src/data/projects.ts`
2. Create case study at `src/content/case-studies/<slug>-case-study.mdx`
3. Add thumbnail to `public/images/projects/<slug>.webp`

## 📄 License

MIT License — feel free to use as inspiration for your own portfolio.

---

Built with 🤖 by Yassi — Data Scientist & Backend Developer