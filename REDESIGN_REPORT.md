# Portfolio Redesign — Summary Report

## Files Changed
- tailwind.config.mjs
- src/styles/global.css
- src/components/layout/Layout.astro
- src/components/navigation/Navbar.astro
- src/components/layout/Footer.astro
- src/components/layout/SEOMeta.astro
- src/components/hero/Hero.astro
- src/components/hero/GenerativeHero.tsx (no longer used in main flow)
- src/components/skills/SkillsSection.astro
- src/components/skills/SkillsVisualization.tsx (no longer used in main flow)
- src/components/projects/ProjectsSection.astro
- src/components/contact/ContactSection.astro
- src/pages/index.astro
- src/pages/404.astro
- src/pages/projects/index.astro
- src/pages/projects/[slug].astro
- src/data/constants.ts
- src/data/skills.ts
- src/data/projects.ts

## New Information Architecture
- Header/Nav: Home, Case Studies, Skills, Contact
- Hero: Clean editorial headline "Making people data understandable" with verified metrics
- Featured case study: HR Attrition Analysis (leading position)
- Secondary projects: California Housing, HobbyBuddy
- Skills: Static accessible groupings (Analytics, HR Analytics, Visualization)
- How I Work: Three-step editorial section (Clarify, Build, Communicate)
- Contact: Direct email CTA with clear guidance on what to include
- Footer: Simplified with navigation links

## Design System Changes
- Background: #F7F8F5 (warm off-white)
- Primary text: #17211B (deep ink)
- Secondary text: #536158 (muted green-gray)
- Accent green: #1F6B50
- Accent amber: #D99A3D
- Font system: IBM Plex Sans (body), Space Grotesk (display), JetBrains Mono (metadata)
- Removed: dark mode, particle systems, code rain, glassmorphism, glow effects, noise overlays, interactive skill visualization canvas

## Unchanged Content (Verified)
- Case study MDX files preserved in full (california-housing-mlops, hr-attrition-analysis, hobbybuddy)
- Verified metrics for HR Attrition (IBM dataset, 1,470 records, 35 features, 16% attrition, 47 features, ROC-AUC 0.91, Precision@Top 10% 0.78, Recall@Top 10% 0.45, estimated savings $2.3M labeled as estimate)
- California Housing metrics preserved (R² 0.87, 42ms, 3.2min, 94%, 487MB)
- HobbyBuddy metrics preserved (87ms, 99.9%, 10,000 users, 2,000 WebSocket)
- Placeholder URLs not presented as live production systems
- Caveats preserved in HR Attrition case study (temporal validation, no causal inference, fairness audit needed, dataset limitations)
- Email: yassinehatouf@gmail.com
- Social links preserved

## Build Result
- npm run build: SUCCESS (6 pages, sitemap generated)
- All routes functional: /, /projects, /projects/[slug], /404
- Font warnings are harmless (public/fonts/ available at runtime under /portfolio/ base)

## Caveats
- Placeholder demo URLs for California Housing (california-housing-mlops.example.com) and HobbyBuddy (hobbybuddy.example.com) remain unavailable; case study links work correctly
- Interactive skill visualization (canvas) removed in favor of accessible static grouping; this improves performance and accessibility
- Design is now light-mode editorial rather than dark cyberpunk
- Mobile menu uses basic JS toggle; keyboard navigation works

## Direct Link (Post-Deployment)
- Repository: https://github.com/Yassi0022/portfolio
- Production site (after deploy): https://yassi0022.github.io/portfolio/
