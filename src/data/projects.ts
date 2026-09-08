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

export interface ArchitectureStep {
  step: string;
  title: string;
  description: string;
  badge?: string;
}

export interface ProjectChart {
  title: string;
  image: string;
  caption: string;
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
  architectureSteps?: ArchitectureStep[];
  keyMetrics: Metric[];
  pipelines?: PipelineStage[];
  limitations: string[];
  charts?: ProjectChart[];
  caseStudyPath: string;
  featured: boolean;
  thumbnail?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'california-housing-mlops',
    title: 'California Housing ML Pipeline',
    shortDescription: 'End-to-end ML pipeline for housing price prediction: XGBoost training, MLflow experiment tracking, FastAPI serving, Docker containerisation, and GitHub Actions CI. R² = 0.87.',
    longDescription: `A complete ML engineering pipeline demonstrating reproducible machine learning from data ingestion through model training, validation, versioning, and REST API serving. Built with MLflow for experiment tracking and model registry, FastAPI for serving, Docker for reproducible environments, and GitHub Actions for CI/CD automation.`,
    type: 'mlops',
    stack: ['Python', 'XGBoost', 'FastAPI', 'MLflow', 'Docker', 'GitHub Actions', 'Pytest', 'Pandas', 'Scikit-learn'],
    githubUrl: 'https://github.com/Yassi0022/California-Housing-Mlops',
    demoUrl: undefined,
    architectureSteps: [
      {
        step: '01',
        title: 'Data Ingestion & Quality Gates',
        description: 'Automated data download with schema validation and data drift verification using Great Expectations.',
        badge: 'Pandas · Great Expectations',
      },
      {
        step: '02',
        title: 'Feature Engineering Pipeline',
        description: 'Versioned transformations, missing value imputation, spatial coordinate encoding, and robust scaling.',
        badge: 'Scikit-learn · Pipelines',
      },
      {
        step: '03',
        title: 'Model Training & Hyperparameter Tuning',
        description: 'Gradient boosted trees trained with XGBoost; Bayesian hyperparameter optimization orchestrated via Optuna.',
        badge: 'XGBoost · Optuna',
      },
      {
        step: '04',
        title: 'Experiment Tracking & Model Registry',
        description: 'Parameters, metrics, and serialized model artifacts logged to MLflow with automated threshold quality checks.',
        badge: 'MLflow Registry',
      },
      {
        step: '05',
        title: 'REST API Serving & Containerization',
        description: 'FastAPI service with Pydantic request/response validation, health probes, Docker container, and CI/CD.',
        badge: 'FastAPI · Docker · GitHub Actions',
      },
    ],
    keyMetrics: [
      { label: 'Model Accuracy (R²)', value: '0.87', description: 'XGBoost on California Housing test split' },
      { label: 'Local API Latency (p95)', value: '42ms', description: 'FastAPI benchmark with Uvicorn workers' },
      { label: 'Pipeline Run Time', value: '3.2 min', description: 'Full automated pipeline execution' },
      { label: 'Test Suite Coverage', value: '94%', description: 'Pytest unit and integration coverage' },
    ],
    pipelines: [
      {
        name: 'Data Ingestion & Validation',
        description: 'Automated data download, schema validation, and drift detection using Great Expectations.',
        technologies: ['Pandas', 'Great Expectations', 'GitHub Actions'],
        order: 1,
      },
      {
        name: 'Feature Engineering',
        description: 'Feature store with versioned transformations, handling missing values, encoding, and scaling.',
        technologies: ['Scikit-learn', 'Featuretools', 'Joblib'],
        order: 2,
      },
      {
        name: 'Model Training & Tuning',
        description: 'Hyperparameter optimization with Optuna, experiment tracking with MLflow.',
        technologies: ['XGBoost', 'Optuna', 'MLflow', 'DVC'],
        order: 3,
      },
      {
        name: 'Model Validation & Registry',
        description: 'Automated validation against performance thresholds, model versioning, and promotion to staging.',
        technologies: ['MLflow', 'Custom Validators', 'Docker'],
        order: 4,
      },
      {
        name: 'Serving & Monitoring',
        description: 'FastAPI REST API with health checks, request logging, and structured inference endpoints.',
        technologies: ['FastAPI', 'Uvicorn', 'Prometheus', 'Evidently AI'],
        order: 5,
      },
    ],
    limitations: [
      'Model benchmarks reflect the public California Housing census dataset; real-world property valuation requires richer macroeconomic and parcel-level features.',
      'Latency benchmarks reflect local containerized FastAPI/Uvicorn execution; multi-region production deployments would require autoscaling infrastructure.',
      'Pipeline demonstrations use synthetic drift scenarios to validate data quality and alerting rules.',
    ],
    caseStudyPath: '/content/case-studies/california-housing-mlops-case-study.mdx',
    featured: true,
    thumbnail: '/images/projects/california-housing-mlops.svg',
  },
  {
    slug: 'hr-attrition-analysis',
    title: 'HR Attrition Analysis',
    shortDescription: 'Predictive analytics project analyzing employee attrition patterns using advanced feature engineering and ML. Demonstrates business impact through data-driven insights.',
    longDescription: `A comprehensive predictive analytics project that uncovers the key drivers of employee attrition and builds a deployable risk scoring model. This project demonstrates the full data science lifecycle: exploratory analysis, hypothesis-driven feature engineering, model interpretability with SHAP, and translating technical results into actionable organizational recommendations.`,
    type: 'data-science',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'SHAP', 'Optuna', 'Matplotlib', 'Seaborn', 'Jupyter'],
    githubUrl: 'https://github.com/Yassi0022/HR-Attrition-Analysis',
    demoUrl: undefined,
    architectureSteps: [
      {
        step: '01',
        title: 'Data Ingestion & Integrity Audit',
        description: 'Ingestion of the 1,470 IBM HR record benchmark across 35 demographic, compensation, and satisfaction variables.',
        badge: 'Pandas · NumPy',
      },
      {
        step: '02',
        title: 'Exploratory & Statistical Profiling',
        description: 'Univariate distributions, hypothesis testing, correlation heatmaps, and attrition rate segmentations.',
        badge: 'Seaborn · Matplotlib · SciPy',
      },
      {
        step: '03',
        title: 'Domain-Driven Feature Engineering',
        description: 'Creation of 47 derived features: compensation-to-tenure ratios, promotion velocity, and overtime risk flags.',
        badge: 'Featuretools · Domain Logic',
      },
      {
        step: '04',
        title: 'Model Comparison & Optimization',
        description: 'Benchmarking Logistic Regression, Random Forest, and XGBoost with stratified k-fold and Optuna tuning.',
        badge: 'Scikit-learn · XGBoost · Optuna',
      },
      {
        step: '05',
        title: 'SHAP Interpretability & Risk Scoring',
        description: 'Global TreeSHAP attribution and local individual waterfall plots identifying OverTime, MonthlyIncome, and Age as top signals.',
        badge: 'SHAP · Model Explainability',
      },
    ],
    keyMetrics: [
      { label: 'ROC-AUC', value: '0.91', description: 'XGBoost with Optuna hyperparameter tuning' },
      { label: 'Precision@Top 10%', value: '0.78', description: 'Identifies 78% of actual leavers in top risk decile' },
      { label: 'Features Engineered', value: '47', description: 'Derived from 35 raw attributes via domain engineering' },
      { label: 'Dataset Sample', value: '1,470', description: 'IBM HR Employee benchmark records analyzed' },
    ],
    pipelines: [
      {
        name: 'Exploratory Data Analysis',
        description: 'Statistical analysis, distribution analysis, correlation studies, and attrition pattern discovery.',
        technologies: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scipy'],
        order: 1,
      },
      {
        name: 'Feature Engineering',
        description: 'Domain-driven features: tenure bands, compensation ratios, promotion velocity, satisfaction trends, overtime indicators.',
        technologies: ['Pandas', 'Featuretools', 'Domain Knowledge'],
        order: 2,
      },
      {
        name: 'Model Development',
        description: 'Multiple algorithms compared: Logistic Regression, Random Forest, XGBoost, LightGBM with cross-validation.',
        technologies: ['Scikit-learn', 'XGBoost', 'LightGBM', 'Optuna'],
        order: 3,
      },
      {
        name: 'Interpretability & Insights',
        description: 'SHAP values for global and local interpretability, identifying key drivers: compensation, tenure, overtime, satisfaction.',
        technologies: ['SHAP', 'ELI5', 'Custom Visualizations'],
        order: 4,
      },
    ],
    limitations: [
      'Results reflect the IBM public HR Analytics dataset (1,470 records); generalization to real corporate environments requires organization-specific calibration.',
      'SHAP values provide statistical attribution and feature importance, not direct causal relationships; organizational interventions require empirical validation.',
      'Model predictions should undergo algorithmic fairness auditing prior to any deployment in employee evaluation or retention workflows.',
      'The cross-sectional benchmark lacks temporal tracking; longitudinal validation is necessary to capture evolving workplace trends.',
    ],
    charts: [
      {
        title: 'Attrition Rate by Overtime Status',
        image: '/images/projects/charts/attrition_by_overtime.png',
        caption: 'Generated directly from the IBM HR dataset via 2_visuals.py. Demonstrates significantly higher voluntary attrition rates among employees with frequent overtime.',
      },
      {
        title: 'Feature Importance (Random Forest)',
        image: '/images/projects/charts/feature_importance.png',
        caption: 'Extracted from models/random_forest.joblib using 4b_feature_importance.py. Highlights MonthlyIncome, OverTime, Age, and TotalWorkingYears as dominant decision factors.',
      },
      {
        title: 'Model Evaluation ROC Curve',
        image: '/images/projects/charts/roc_curve_random_forest.png',
        caption: 'Receiver Operating Characteristic evaluation chart generated by 4_model.py, demonstrating benchmark discrimination performance on the test split.',
      },
      {
        title: 'Age Distribution by Attrition',
        image: '/images/projects/charts/age_distribution.png',
        caption: 'Bivariate distribution showing attrition concentration among early-career age brackets, supporting retention strategies targeted at junior personnel.',
      },
      {
        title: 'Attrition Distribution by Department',
        image: '/images/projects/charts/attrition_by_department.png',
        caption: 'Breakdown across Sales, R&D, and HR departments showing variance in turnover dynamics across functional units.',
      },
    ],
    caseStudyPath: '/content/case-studies/hr-attrition-analysis-case-study.mdx',
    featured: true,
    thumbnail: '/images/projects/hr-attrition-analysis.svg',
  },
  {
    slug: 'hobbybuddy',
    title: 'HobbyBuddy',
    shortDescription: 'Full-stack social matching platform with Spring Boot backend and React frontend. Features personality-based matching algorithm, REST API design, and MySQL database architecture.',
    longDescription: `A full-stack social platform connecting people through shared interests and compatible personalities. The core innovation is a matching algorithm combining personality psychology (Big Five traits), interest graphs, and behavioral signals to suggest meaningful connections. Built with a clean architecture separating domain logic from infrastructure, demonstrating solid backend engineering practices.`,
    type: 'fullstack',
    stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'MySQL', 'Redis', 'Docker', 'JWT', 'WebSocket'],
    githubUrl: 'https://github.com/Yassi0022/hobbybuddy',
    demoUrl: undefined,
    architectureSteps: [
      {
        step: '01',
        title: 'React & TypeScript Frontend',
        description: 'Single-page interface with responsive layout, user profile management, matching questionnaire, and WebSocket chat client.',
        badge: 'React · TypeScript · Tailwind',
      },
      {
        step: '02',
        title: 'API Gateway & Security Filter Chain',
        description: 'Stateless JWT authentication filter, refresh token rotation, CORS policies, and role-based endpoint authorization.',
        badge: 'Spring Security · JWT',
      },
      {
        step: '03',
        title: 'Core Business & Matching Engine',
        description: 'Multi-criteria ranking service calculating Big Five personality similarity, Jaccard interest overlap, and geographical distance.',
        badge: 'Java 17 · Spring Boot',
      },
      {
        step: '04',
        title: 'Data & Caching Layer',
        description: 'Relational data persistence with Spring Data JPA / Hibernate on MySQL, paired with Redis for session and matching cache.',
        badge: 'MySQL · Redis · Hibernate',
      },
      {
        step: '05',
        title: 'Real-Time WebSocket Messaging',
        description: 'Bidirectional messaging broker supporting live chat, typing indicators, user presence, and notification broadcasting.',
        badge: 'STOMP · WebSocket',
      },
    ],
    keyMetrics: [
      { label: 'Backend Architecture', value: 'Spring Boot', description: 'Layered clean architecture with Java 17' },
      { label: 'Data Persistence', value: 'MySQL + Redis', description: 'Normalized relational schema with memory cache' },
      { label: 'Matching Complexity', value: 'O(n log n)', description: 'Multi-factor personality and interest scoring' },
      { label: 'Test Suite', value: 'JUnit 5', description: 'Unit, integration, and security filter tests' },
    ],
    pipelines: [
      {
        name: 'Authentication & Authorization',
        description: 'JWT-based auth with refresh tokens, role-based access control, OAuth2 integration.',
        technologies: ['Spring Security', 'JWT', 'Redis', 'OAuth2'],
        order: 1,
      },
      {
        name: 'User Profile & Interest Graph',
        description: 'Dynamic profile system with tagged interests, skill levels, availability, and preference weights.',
        technologies: ['Spring Data JPA', 'MySQL', 'Hibernate'],
        order: 2,
      },
      {
        name: 'Matching Algorithm',
        description: 'Multi-factor scoring: personality compatibility (Big Five), interest overlap (Jaccard), activity patterns, geographic proximity.',
        technologies: ['Java', 'Custom Algorithm', 'Redis', 'Spring Cache'],
        order: 3,
      },
      {
        name: 'Real-time Chat',
        description: 'WebSocket-based messaging with presence, typing indicators, message history, and notifications.',
        technologies: ['Spring WebSocket', 'STOMP', 'Redis Pub/Sub', 'React'],
        order: 4,
      },
    ],
    limitations: [
      'Demonstration platform developed for architectural exploration and portfolio verification; not hosted as a commercial production service.',
      'Matching algorithm benchmarks were executed in local isolated test suites; distributed scaling would require partitioned caching and horizontal clustering.',
      'WebSocket messaging was validated under local development concurrency; enterprise rollout would require dedicated STOMP message brokers.',
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