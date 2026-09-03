export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  proficiency?: number;
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  description: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'engineering',
    label: 'Software Engineering',
    color: 'accent-green',
    description: 'Python APIs, SQL design, data pipelines, Docker, version control, reproducible workflows.',
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    color: 'accent-amber',
    description: 'Predictive modeling, XGBoost, SHAP explainability, feature engineering, MLOps practices.',
  },
  {
    id: 'data',
    label: 'Data & Visualization',
    color: 'accent-sage',
    description: 'Exploratory analysis, statistics, charts, dashboards, clear communication of results.',
  },
];

export const SKILLS: Skill[] = [
  { id: 'python', name: 'Python', category: 'engineering', description: 'Data analysis, APIs (FastAPI), backend systems, data pipelines' },
  { id: 'sql', name: 'SQL', category: 'engineering', description: 'Query design, relational modeling, data wrangling, database architecture' },
  { id: 'stats', name: 'Statistics', category: 'data', description: 'Hypothesis testing, regression, inferential methods, experimental design' },
  { id: 'xgboost', name: 'XGBoost', category: 'ml', description: 'Gradient boosting, predictive modeling, model evaluation' },
  { id: 'shap', name: 'SHAP', category: 'ml', description: 'Model explainability, feature importance, interpretability' },
  { id: 'optuna', name: 'Optuna', category: 'ml', description: 'Hyperparameter optimization, tuning workflows' },
  { id: 'matplotlib', name: 'Matplotlib / Seaborn', category: 'data', description: 'Publication-quality charts, visual reports, data communication' },
  { id: 'dashboards', name: 'Dashboards', category: 'data', description: 'Structured reporting, metric tracking, analytical storytelling' },
];
