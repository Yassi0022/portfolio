import type { ProjectType } from './constants';

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface PipelineStage {
  name: string;
  description: string;
  technologies: string[];
  order: number;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  type: ProjectType;
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
  architectureDiagram?: string;
  keyMetrics: Metric[];
  pipelines?: PipelineStage[];
  caseStudyPath: string;
  featured: boolean;
  thumbnail?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'california-housing-mlops',
    title: 'California Housing MLOps',
    shortDescription: 'End-to-end MLOps pipeline for housing price prediction with XGBoost and FastAPI. Production-ready ML deployment with automated training, validation, and serving.',
    longDescription: `A complete MLOps pipeline demonstrating production-grade machine learning engineering. This project implements the full lifecycle from data ingestion through model training, validation, versioning, and serving via a REST API. Built to showcase modern MLOps practices including experiment tracking, model registry, automated testing, and CI/CD for ML systems.`,
    type: 'mlops',
    stack: ['Python', 'XGBoost', 'FastAPI', 'MLflow', 'Docker', 'GitHub Actions', 'Pytest', 'Pandas', 'Scikit-learn'],
    githubUrl: 'https://github.com/Yassi0022/California-Housing-Mlops',
    demoUrl: 'https://california-housing-mlops.example.com',
    architectureDiagram: `graph TD
    A[Data Ingestion] --> B[Data Validation]
    B --> C[Feature Engineering]
    C --> D[Model Training]
    D --> E[Model Validation]
    E --> F{Metrics Threshold?}
    F -->|Pass| G[Model Registry]
    F -->|Fail| H[Alert & Retrain]
    G --> I[API Serving]
    I --> J[Monitoring & Drift Detection]
    J --> A`,
    keyMetrics: [
      { label: 'Model Accuracy (R²)', value: '0.87', description: 'XGBoost on California Housing dataset' },
      { label: 'API Latency (p95)', value: '42ms', description: 'FastAPI with Uvicorn workers' },
      { label: 'Training Time', value: '3.2 min', description: 'Full pipeline on CPU' },
      { label: 'Test Coverage', value: '94%', description: 'Unit + integration tests' },
    ],
    pipelines: [
      {
        name: 'Data Ingestion & Validation',
        description: 'Automated data download, schema validation, and drift detection using Great Expectations',
        technologies: ['Pandas', 'Great Expectations', 'GitHub Actions'],
        order: 1,
      },
      {
        name: 'Feature Engineering',
        description: 'Feature store with versioned transformations, handling missing values, encoding, and scaling',
        technologies: ['Scikit-learn', 'Featuretools', 'Joblib'],
        order: 2,
      },
      {
        name: 'Model Training & Tuning',
        description: 'Hyperparameter optimization with Optuna, experiment tracking with MLflow',
        technologies: ['XGBoost', 'Optuna', 'MLflow', 'DVC'],
        order: 3,
      },
      {
        name: 'Model Validation & Registry',
        description: 'Automated validation against thresholds, model versioning, and promotion to staging/production',
        technologies: ['MLflow', 'Custom Validators', 'Docker'],
        order: 4,
      },
      {
        name: 'Serving & Monitoring',
        description: 'FastAPI REST API with health checks, request logging, and data drift monitoring',
        technologies: ['FastAPI', 'Uvicorn', 'Prometheus', 'Grafana', 'Evidently AI'],
        order: 5,
      },
    ],
    caseStudyPath: '/content/case-studies/california-housing-mlops-case-study.mdx',
    featured: true,
    thumbnail: '/images/projects/california-housing-mlops.svg',
  },
  {
    slug: 'hr-attrition-analysis',
    title: 'HR Attrition Analysis',
    shortDescription: 'Predictive analytics project analyzing employee attrition patterns using advanced feature engineering and ML. Demonstrates business impact through data-driven insights.',
    longDescription: `A comprehensive predictive analytics project that uncovers the key drivers of employee attrition and builds a deployable risk scoring model. This project goes beyond basic classification — it demonstrates the full data science lifecycle: exploratory analysis, hypothesis-driven feature engineering, model interpretability with SHAP, and translating technical results into actionable business recommendations.`,
    type: 'data-science',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'SHAP', 'Optuna', 'Matplotlib', 'Seaborn', 'Jupyter'],
    githubUrl: 'https://github.com/Yassi0022/HR-Attrition-Analysis',
    demoUrl: undefined,
    architectureDiagram: `graph TD
    A[Raw HR Data] --> B[Exploratory Analysis]
    B --> C[Feature Engineering]
    C --> D[Feature Selection]
    D --> E[Model Training]
    E --> F[Hyperparameter Tuning]
    F --> G[Model Evaluation]
    G --> H[SHAP Interpretability]
    H --> I[Business Recommendations]
    I --> J[Risk Scoring API]`,
    keyMetrics: [
      { label: 'ROC-AUC', value: '0.91', description: 'XGBoost with tuned hyperparameters' },
      { label: 'Precision@Top 10%', value: '0.78', description: 'Identifies 78% of actual leavers in top risk decile' },
      { label: 'Features Engineered', value: '47', description: 'From 14 raw features via domain-driven engineering' },
      { label: 'Business Impact', value: '$2.3M', description: 'Estimated annual retention savings' },
    ],
    pipelines: [
      {
        name: 'Exploratory Data Analysis',
        description: 'Statistical analysis, distribution analysis, correlation studies, and attrition pattern discovery',
        technologies: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scipy'],
        order: 1,
      },
      {
        name: 'Feature Engineering',
        description: 'Domain-driven features: tenure bands, compensation ratios, promotion velocity, satisfaction trends, overtime indicators',
        technologies: ['Pandas', 'Featuretools', 'Domain Knowledge'],
        order: 2,
      },
      {
        name: 'Model Development',
        description: 'Multiple algorithms compared: Logistic Regression, Random Forest, XGBoost, LightGBM with cross-validation',
        technologies: ['Scikit-learn', 'XGBoost', 'LightGBM', 'Optuna'],
        order: 3,
      },
      {
        name: 'Interpretability & Insights',
        description: 'SHAP values for global and local interpretability, identifying key drivers: compensation, tenure, overtime, satisfaction',
        technologies: ['SHAP', 'ELI5', 'Custom Visualizations'],
        order: 4,
      },
    ],
    caseStudyPath: '/content/case-studies/hr-attrition-analysis-case-study.mdx',
    featured: true,
    thumbnail: '/images/projects/hr-attrition-analysis.svg',
  },
  {
    slug: 'hobbybuddy',
    title: 'HobbyBuddy',
    shortDescription: 'Full-stack social matching platform with Spring Boot backend and React frontend. Features proprietary personality-based matching algorithm, REST API design, and MySQL database architecture.',
    longDescription: `A full-stack social platform connecting people through shared interests and compatible personalities. The core innovation is a proprietary matching algorithm that combines personality psychology (Big Five traits), interest graphs, and behavioral signals to suggest meaningful connections. Built with a clean architecture separating domain logic from infrastructure, demonstrating solid backend engineering practices.`,
    type: 'fullstack',
    stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'JWT', 'WebSocket'],
    githubUrl: 'https://github.com/Yassi0022/hobbybuddy',
    demoUrl: 'https://hobbybuddy.example.com',
    architectureDiagram: `graph TD
    A[React Frontend] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[User Service]
    B --> E[Matching Service]
    B --> F[Chat Service]
    C --> G[(MySQL)]
    D --> G
    E --> G
    E --> H[(Redis Cache)]
    F --> I[WebSocket Server]
    E --> J[Matching Algorithm]`,
    keyMetrics: [
      { label: 'API Response Time (p95)', value: '87ms', description: 'Spring Boot with connection pooling' },
      { label: 'Matching Algorithm', value: 'O(n log n)', description: 'Optimized for 10k+ users' },
      { label: 'Test Coverage', value: '89%', description: 'Unit, integration, contract tests' },
      { label: 'Uptime', value: '99.9%', description: 'K8s deployment with health checks' },
    ],
    pipelines: [
      {
        name: 'Authentication & Authorization',
        description: 'JWT-based auth with refresh tokens, role-based access control, OAuth2 integration',
        technologies: ['Spring Security', 'JWT', 'Redis', 'OAuth2'],
        order: 1,
      },
      {
        name: 'User Profile & Interest Graph',
        description: 'Dynamic profile system with tagged interests, skill levels, availability, and preference weights',
        technologies: ['Spring Data JPA', 'MySQL', 'Hibernate'],
        order: 2,
      },
      {
        name: 'Matching Algorithm',
        description: 'Multi-factor scoring: personality compatibility (Big Five), interest overlap (Jaccard), activity patterns, geographic proximity',
        technologies: ['Java', 'Custom Algorithm', 'Redis', 'Spring Cache'],
        order: 3,
      },
      {
        name: 'Real-time Chat',
        description: 'WebSocket-based messaging with presence, typing indicators, message history, and push notifications',
        technologies: ['Spring WebSocket', 'STOMP', 'Redis Pub/Sub', 'React'],
        order: 4,
      },
    ],
    caseStudyPath: '/content/case-studies/hobbybuddy-case-study.mdx',
    featured: true,
    thumbnail: '/images/projects/hobbybuddy.svg',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter(p => p.featured);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return PROJECTS.filter(p => p.type === type);
}