export const SITE_CONFIG = {
  name: 'Yassine Hatouf',
  title: 'Software Developer · Backend & Data Science',
  description: 'Computer engineering student and freelance software developer / data analyst building practical data products, backend systems, APIs, machine learning pipelines, and reliable software with Python, Java, and SQL.',
  url: 'https://yassi0022.github.io/portfolio',
  github: 'https://github.com/Yassi0022',
  linkedin: 'https://www.linkedin.com/in/yassine-hatouf',
  email: 'yassinehatouf@gmail.com',
  ogImage: '/portfolio/images/og-image.svg',
};

export const NAV_ITEMS = [
  { label: 'About', href: '/portfolio/#profile' },
  { label: 'Case Studies', href: '/portfolio/#projects' },
  { label: 'Repositories', href: '/portfolio/#verified-projects' },
  { label: 'Skills', href: '/portfolio/#skills' },
  { label: 'Contact', href: '/portfolio/#contact' },
];

export const SKILL_CATEGORIES = [
  { id: 'engineering', label: 'Software Engineering', color: 'accent-green', icon: 'code' },
  { id: 'ml', label: 'Machine Learning', color: 'accent-amber', icon: 'brain' },
  { id: 'data', label: 'Data & Visualization', color: 'accent-sage', icon: 'chart' },
] as const;
