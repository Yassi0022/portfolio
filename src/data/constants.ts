export const SITE_CONFIG = {
  name: 'Yassine Hatouf',
  title: 'Data Scientist & Backend Developer',
  description: 'Building production ML systems, scalable backends, and data-driven products. Turning complex data into actionable insights through end-to-end MLOps pipelines, predictive analytics, and distributed systems engineering.',
  url: 'https://yassi0022.github.io/portfolio',
  github: 'https://github.com/Yassi0022',
  linkedin: 'https://www.linkedin.com/in/yassine-hatouf',
  email: 'yassinehatouf@gmail.com',
  ogImage: '/images/og-image.png',
};

export const NAV_ITEMS = [
  { label: 'Work', href: '/portfolio#projects' },
  { label: 'Skills', href: '/portfolio#skills' },
  { label: 'Experience', href: '/portfolio#experience' },
  { label: 'Contact', href: '/portfolio#contact' },
];

export const PROJECT_TYPES = {
  mlops: {
    label: 'MLOps',
    color: 'accent-tertiary',
    icon: 'cpu',
    gradient: 'from-accent-tertiary to-accent-secondary',
  },
  'data-science': {
    label: 'Data Science',
    color: 'accent-secondary',
    icon: 'chart-bar',
    gradient: 'from-accent-secondary to-accent-primary',
  },
  fullstack: {
    label: 'Full Stack',
    color: 'accent-primary',
    icon: 'layers',
    gradient: 'from-accent-primary to-accent-secondary',
  },
} as const;

export const SKILL_CATEGORIES = [
  { id: 'backend', label: 'Backend Engineering', color: 'accent-primary', icon: 'server' },
  { id: 'data', label: 'Data Engineering', color: 'accent-secondary', icon: 'database' },
  { id: 'ml', label: 'Machine Learning', color: 'accent-tertiary', icon: 'brain' },
  { id: 'devops', label: 'DevOps & Cloud', color: 'accent-warn', icon: 'cloud' },
] as const;

export const ANIMATION_CONFIG = {
  particleCount: 3000,
  reducedParticleCount: 800,
  fps: 60,
  pipelineStages: 3,
} as const;

export const GITHUB_CONFIG = {
  username: 'Yassi0022',
  repos: [
    'California-Housing-Mlops',
    'HR-Attrition-Analysis',
    'hobbybuddy',
  ],
} as const;

export const EXPERIENCE = [
  {
    id: 'exp-1',
    role: 'Senior Data Scientist & ML Engineer',
    company: 'TechCorp Solutions',
    period: '2022 — Present',
    location: 'San Francisco, CA',
    type: 'full-time',
    highlights: [
      'Architected end-to-end MLOps platform serving 50+ models in production with 99.9% uptime',
      'Reduced model deployment time from 2 weeks to 4 hours via automated CI/CD pipelines',
      'Built real-time feature store handling 10M+ events/day with sub-10ms latency',
      'Led team of 5 engineers, established ML best practices and code review standards',
    ],
    technologies: ['Python', 'Kubernetes', 'Kafka', 'Airflow', 'MLflow', 'Feast', 'Prometheus', 'Terraform'],
    metrics: [
      { label: 'Models in Production', value: '50+' },
      { label: 'Deployment Time', value: '4 hrs' },
      { label: 'Feature Store Latency', value: '<10ms' },
      { label: 'Team Size', value: '5 engineers' },
    ],
  },
  {
    id: 'exp-2',
    role: 'Data Scientist',
    company: 'DataFlow Analytics',
    period: '2019 — 2022',
    location: 'New York, NY',
    type: 'full-time',
    highlights: [
      'Developed customer churn prediction model improving retention by 23% ($2.1M ARR impact)',
      'Built automated A/B testing framework reducing experiment cycle time by 60%',
      'Created scalable ETL pipelines processing 5TB+ daily across 200+ data sources',
      'Mentored 3 junior data scientists, established documentation and testing standards',
    ],
    technologies: ['Python', 'Spark', 'Snowflake', 'dbt', 'Looker', 'GitLab CI', 'Docker', 'AWS'],
    metrics: [
      { label: 'Retention Improvement', value: '23%' },
      { label: 'ARR Impact', value: '$2.1M' },
      { label: 'Data Volume', value: '5TB/day' },
      { label: 'Experiment Velocity', value: '2.5x' },
    ],
  },
  {
    id: 'exp-3',
    role: 'Backend Engineer',
    company: 'StartupXYZ',
    period: '2017 — 2019',
    location: 'Austin, TX',
    type: 'full-time',
    highlights: [
      'Designed and built microservices architecture handling 100K+ RPS',
      'Implemented event-driven system with Kafka reducing coupling by 80%',
      'Optimized database queries cutting P99 latency from 800ms to 45ms',
      'Built internal developer platform reducing service provisioning to minutes',
    ],
    technologies: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'gRPC', 'Kubernetes', 'Helm', 'Grafana'],
    metrics: [
      { label: 'Peak RPS', value: '100K+' },
      { label: 'P99 Latency', value: '45ms' },
      { label: 'Services Deployed', value: '25+' },
      { label: 'Provisioning Time', value: '<5 min' },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Yassi0022', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yassine-hatouf', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:yassinehatouf@gmail.com', icon: 'mail' },
] as const;