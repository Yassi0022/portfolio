export interface Skill {
  id: string;
  name: string;
  category: 'backend' | 'data' | 'ml' | 'devops';
  proficiency: number; // 1-100
  description: string;
  relatedSkills: string[]; // Other skill IDs this connects to
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  description: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend Engineering',
    color: 'accent-primary',
    description: 'API design, system architecture, database design, performance optimization',
  },
  {
    id: 'data',
    label: 'Data Engineering',
    color: 'accent-secondary',
    description: 'ETL pipelines, data modeling, warehousing, streaming, quality & governance',
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    color: 'accent-tertiary',
    description: 'Model development, MLOps, feature engineering, experimentation, deployment',
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    color: 'accent-warn',
    description: 'Containerization, orchestration, CI/CD, observability, infrastructure as code',
  },
];

export const SKILLS: Skill[] = [
  // Backend
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    proficiency: 95,
    description: 'Advanced: async, typing, packaging, performance profiling, C extensions',
    relatedSkills: ['fastapi', 'pandas', 'sqlalchemy', 'pytest'],
  },
  {
    id: 'java',
    name: 'Java / Spring Boot',
    category: 'backend',
    proficiency: 90,
    description: 'Enterprise-grade: Spring ecosystem, JPA/Hibernate, reactive streams, testing',
    relatedSkills: ['spring-boot', 'mysql', 'redis', 'kafka'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    proficiency: 92,
    description: 'High-performance APIs: dependency injection, OpenAPI, WebSockets, background tasks',
    relatedSkills: ['python', 'pydantic', 'uvicorn', 'sqlalchemy'],
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    category: 'backend',
    proficiency: 88,
    description: 'Microservices: Spring Cloud, Security, Data, Batch, Actuator, GraalVM native',
    relatedSkills: ['java', 'mysql', 'redis', 'kafka'],
  },
  {
    id: 'sql',
    name: 'SQL & Database Design',
    category: 'backend',
    proficiency: 90,
    description: 'Advanced: query optimization, indexing, partitioning, replication, migrations',
    relatedSkills: ['mysql', 'postgresql', 'redis', 'sqlalchemy'],
  },
  {
    id: 'mysql',
    name: 'MySQL / PostgreSQL',
    category: 'backend',
    proficiency: 88,
    description: 'Production tuning: EXPLAIN ANALYZE, connection pooling, read replicas, backups',
    relatedSkills: ['sql', 'sqlalchemy', 'hibernate', 'flyway'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'backend',
    proficiency: 85,
    description: 'Caching, sessions, pub/sub, streams, Lua scripting, clustering',
    relatedSkills: ['spring-boot', 'fastapi', 'celery'],
  },
  {
    id: 'api-design',
    name: 'API Design (REST/gRPC)',
    category: 'backend',
    proficiency: 90,
    description: 'OpenAPI/Swagger, versioning, rate limiting, idempotency, contract testing',
    relatedSkills: ['fastapi', 'spring-boot', 'postman'],
  },

  // Data Engineering
  {
    id: 'pandas',
    name: 'Pandas / NumPy',
    category: 'data',
    proficiency: 95,
    description: 'Large-scale data manipulation, optimization, memory management, vectorization',
    relatedSkills: ['python', 'polars', 'pyspark', 'feature-engineering'],
  },
  {
    id: 'polars',
    name: 'Polars',
    category: 'data',
    proficiency: 80,
    description: 'Fast DataFrames: lazy evaluation, query optimization, streaming, Rust backend',
    relatedSkills: ['pandas', 'pyspark', 'delta-lake'],
  },
  {
    id: 'pyspark',
    name: 'PySpark / Spark',
    category: 'data',
    proficiency: 75,
    description: 'Distributed processing: DataFrames, SQL, streaming, tuning, Delta Lake',
    relatedSkills: ['polars', 'delta-lake', 'airflow', 'databricks'],
  },
  {
    id: 'airflow',
    name: 'Apache Airflow',
    category: 'data',
    proficiency: 82,
    description: 'DAG design, operators, sensors, XComs, task groups, dynamic mapping, Kubernetes executor',
    relatedSkills: ['python', 'pyspark', 'dbt', 'kubernetes'],
  },
  {
    id: 'dbt',
    name: 'dbt (Data Build Tool)',
    category: 'data',
    proficiency: 78,
    description: 'Analytics engineering: models, tests, docs, macros, packages, CI/CD integration',
    relatedSkills: ['sql', 'airflow', 'snowflake', 'bigquery'],
  },
  {
    id: 'kafka',
    name: 'Apache Kafka',
    category: 'data',
    proficiency: 75,
    description: 'Event streaming: producers/consumers, streams, ksqlDB, schema registry, exactly-once',
    relatedSkills: ['spring-boot', 'python', 'kubernetes', 'redis'],
  },
  {
    id: 'feature-engineering',
    name: 'Feature Engineering',
    category: 'data',
    proficiency: 90,
    description: 'Feature stores, transformations, embeddings, time-series, text, automated feature discovery',
    relatedSkills: ['pandas', 'sklearn', 'feast', 'mlflow'],
  },
  {
    id: 'data-quality',
    name: 'Data Quality & Governance',
    category: 'data',
    proficiency: 82,
    description: 'Great Expectations, data contracts, lineage, observability, anomaly detection',
    relatedSkills: ['airflow', 'dbt', 'pandas', 'evidently'],
  },

  // Machine Learning
  {
    id: 'sklearn',
    name: 'Scikit-learn',
    category: 'ml',
    proficiency: 92,
    description: 'Pipelines, model selection, preprocessing, metrics, custom estimators, calibration',
    relatedSkills: ['pandas', 'xgboost', 'optuna', 'mlflow'],
  },
  {
    id: 'xgboost',
    name: 'XGBoost / LightGBM / CatBoost',
    category: 'ml',
    proficiency: 90,
    description: 'Gradient boosting: tuning, early stopping, SHAP, categorical features, distributed',
    relatedSkills: ['sklearn', 'optuna', 'shap', 'mlflow'],
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ml',
    proficiency: 78,
    description: 'Deep learning: custom modules, distributed training, ONNX export, TorchScript',
    relatedSkills: ['mlflow', 'onnx', 'kubeflow'],
  },
  {
    id: 'mlflow',
    name: 'MLflow',
    category: 'ml',
    proficiency: 88,
    description: 'Experiment tracking, model registry, projects, models, deployment, autologging',
    relatedSkills: ['xgboost', 'pytorch', 'docker', 'kubernetes'],
  },
  {
    id: 'optuna',
    name: 'Optuna',
    category: 'ml',
    proficiency: 85,
    description: 'Hyperparameter optimization: TPE, CMA-ES, pruning, distributed, visualization',
    relatedSkills: ['xgboost', 'sklearn', 'pytorch', 'mlflow'],
  },
  {
    id: 'shap',
    name: 'SHAP / Interpretability',
    category: 'ml',
    proficiency: 85,
    description: 'Explainable AI: TreeSHAP, KernelSHAP, dependence plots, interaction values, monitoring',
    relatedSkills: ['xgboost', 'sklearn', 'pytorch', 'evidently'],
  },
  {
    id: 'mlops',
    name: 'MLOps & Model Deployment',
    category: 'ml',
    proficiency: 88,
    description: 'CI/CD for ML, model serving, drift detection, A/B testing, feature stores, monitoring',
    relatedSkills: ['mlflow', 'docker', 'kubernetes', 'evidently', 'fastapi'],
  },
  {
    id: 'evidently',
    name: 'Evidently AI',
    category: 'ml',
    proficiency: 80,
    description: 'ML monitoring: data drift, target drift, data quality, test suites, dashboards',
    relatedSkills: ['mlflow', 'mlops', 'prometheus', 'grafana'],
  },

  // DevOps & Cloud
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    proficiency: 90,
    description: 'Multi-stage builds, BuildKit, security scanning, compose, buildx, multi-arch',
    relatedSkills: ['kubernetes', 'github-actions', 'mlflow', 'fastapi'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'devops',
    proficiency: 82,
    description: 'Helm, Kustomize, operators, CRDs, ingress, service mesh, autoscaling, GitOps',
    relatedSkills: ['docker', 'helm', 'argocd', 'prometheus'],
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'devops',
    proficiency: 88,
    description: 'Workflows, reusable workflows, matrix, environments, OIDC, self-hosted runners',
    relatedSkills: ['docker', 'kubernetes', 'terraform', 'pytest'],
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'devops',
    proficiency: 75,
    description: 'IaC: modules, state, workspaces, providers, testing, drift detection',
    relatedSkills: ['kubernetes', 'aws', 'github-actions'],
  },
  {
    id: 'aws',
    name: 'AWS / Cloud',
    category: 'devops',
    proficiency: 78,
    description: 'ECS/EKS, RDS, S3, Lambda, EventBridge, CloudWatch, IAM, Cost optimization',
    relatedSkills: ['terraform', 'kubernetes', 'docker', 'github-actions'],
  },
  {
    id: 'prometheus',
    name: 'Prometheus / Grafana',
    category: 'devops',
    proficiency: 82,
    description: 'Metrics, alerting, recording rules, service discovery, Loki, Tempo, dashboards',
    relatedSkills: ['kubernetes', 'fastapi', 'spring-boot', 'evidently'],
  },
  {
    id: 'testing',
    name: 'Testing Strategies',
    category: 'devops',
    proficiency: 88,
    description: 'Unit, integration, contract, E2E, property-based, mutation, chaos engineering',
    relatedSkills: ['pytest', 'junit', 'testcontainers', 'github-actions'],
  },
  {
    id: 'ci-cd',
    name: 'CI/CD Pipelines',
    category: 'devops',
    proficiency: 85,
    description: 'Multi-stage, progressive delivery, canary, blue-green, feature flags, rollback',
    relatedSkills: ['github-actions', 'argocd', 'helm', 'terraform'],
  },
];

export function getSkillsByCategory(category: Skill['category']): Skill[] {
  return SKILLS.filter(s => s.category === category);
}

export function getSkillById(id: string): Skill | undefined {
  return SKILLS.find(s => s.id === id);
}

export function getRelatedSkills(skillId: string): Skill[] {
  const skill = getSkillById(skillId);
  if (!skill) return [];
  return skill.relatedSkills.map(id => getSkillById(id)).filter(Boolean) as Skill[];
}

export function getCategorySkills(categoryId: string): { category: SkillCategory; skills: Skill[] } | undefined {
  const category = SKILL_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return undefined;
  return {
    category,
    skills: getSkillsByCategory(categoryId),
  };
}