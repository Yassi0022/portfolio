export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  description: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    color: 'accent-green',
    description: 'Python, SQL, statistics, and exploratory analysis for data-driven decisions.',
  },
  {
    id: 'hr',
    label: 'HR Analytics',
    color: 'accent-amber',
    description: 'Attrition analysis, feature engineering, explainability, and workforce insights.',
  },
  {
    id: 'viz',
    label: 'Visualization',
    color: 'accent-sage',
    description: 'Charts, dashboards, and clear communication of analytical results.',
  },
];

export const SKILLS: Skill[] = [
  { id: 'python', name: 'Python', category: 'analytics', description: 'Data analysis, pandas, NumPy, scikit-learn' },
  { id: 'sql', name: 'SQL', category: 'analytics', description: 'Query design, data wrangling, relational modeling' },
  { id: 'stats', name: 'Statistics', category: 'analytics', description: 'Hypothesis testing, regression, inferential methods' },
  { id: 'xgboost', name: 'XGBoost', category: 'hr', description: 'Gradient boosting for predictive attrition modeling' },
  { id: 'shap', name: 'SHAP', category: 'hr', description: 'Model explainability for HR decision support' },
  { id: 'optuna', name: 'Optuna', category: 'hr', description: 'Hyperparameter optimization for model tuning' },
  { id: 'matplotlib', name: 'Matplotlib / Seaborn', category: 'viz', description: 'Publication-quality charts and visual reports' },
  { id: 'dashboards', name: 'Dashboards', category: 'viz', description: 'Structured reporting and metric tracking' },
];
