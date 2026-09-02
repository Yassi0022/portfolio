import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projects.json'), 'utf-8'));

const SITE_URL = 'https://yassi0022.github.io';
const BASE_PATH = '/portfolio';

const staticRoutes = [
  '',
  'projects',
];

const projectRoutes = PROJECTS.map(p => `projects/${p.slug}`);

const allRoutes = [...staticRoutes, ...projectRoutes];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const urls = allRoutes.map(route => {
    const fullRoute = route ? `${BASE_PATH}/${route}` : BASE_PATH;
    const url = `${SITE_URL}${fullRoute}`.replace(/\/+$/, '') || `${SITE_URL}${BASE_PATH}`;
    const changefreq = route === '' ? 'weekly' : 'monthly';
    const priority = route === '' ? '1.0' : route.startsWith('projects/') ? '0.8' : '0.6';

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const distDir = path.join(__dirname, '../../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated at dist/sitemap.xml');
}

function generateRobotsTxt() {
  const robotsTxt = `# Robots.txt for Yassi Portfolio
User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}${BASE_PATH}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 10
`;

  const distDir = path.join(__dirname, '../../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);
  console.log('✅ robots.txt generated at dist/robots.txt');
}

generateSitemap();
generateRobotsTxt();