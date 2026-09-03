export const SITE_CONFIG = {
  name: 'Yassine Hatouf',
  title: 'Data Scientist & Data Analyst',
  description: 'I use Python, SQL, statistics, and visual storytelling to understand people and performance. Focused on HR analytics, workforce insights, and clear communication.',
  url: 'https://yassi0022.github.io/portfolio',
  github: 'https://github.com/Yassi0022',
  linkedin: 'https://www.linkedin.com/in/yassine-hatouf',
  email: 'yassinehatouf@gmail.com',
  ogImage: '/portfolio/images/og-image.svg',
};

export const NAV_ITEMS = [
  { label: 'About', href: '/portfolio/#profile' },
  { label: 'Case Studies', href: '/portfolio/#projects' },
  { label: 'Skills', href: '/portfolio/#skills' },
  { label: 'Contact', href: '/portfolio/#contact' },
];

export const SKILL_CATEGORIES = [
  { id: 'analytics', label: 'Analytics', color: 'accent-green', icon: 'chart' },
  { id: 'hr', label: 'HR Analytics', color: 'accent-amber', icon: 'users' },
  { id: 'viz', label: 'Visualization', color: 'accent-sage', icon: 'bar-chart' },
] as const;
