export interface GitHubRepo {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  languages: { name: string; size: number }[];
  updatedAt: string;
  url: string;
  homepageUrl: string | null;
  topics: string[];
}

export interface GitHubLanguage {
  name: string;
  color: string;
  percentage: number;
}

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const REPO_QUERY = `
  query GetRepos($username: String!, $names: [String!]!) {
    user(login: $username) {
      repositories(first: 10, names: $names, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          name
          description
          stargazerCount
          forkCount
          primaryLanguage { name color }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges { size node { name color } }
          }
          updatedAt
          url
          homepageUrl
          repositoryTopics(first: 10) {
            edges { node { topic { name } } }
          }
        }
      }
    }
  }
`;

async function fetchGraphQL(query: string, variables: Record<string, unknown>): Promise<unknown> {
  const token = import.meta.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data;
}

export async function fetchRepos(username: string, repoNames: string[]): Promise<GitHubRepo[]> {
  try {
    const data = await fetchGraphQL(REPO_QUERY, { username, names: repoNames }) as {
      user: {
        repositories: {
          nodes: GitHubRepo[];
        };
      };
    };

    return data.user.repositories.nodes.map(repo => ({
      ...repo,
      languages: repo.languages.edges.map(edge => ({
        name: edge.node.name,
        size: edge.size,
      })),
      topics: repo.repositoryTopics.edges.map(edge => edge.node.topic.name),
    }));
  } catch (error) {
    console.warn('Failed to fetch GitHub data:', error);
    return [];
  }
}

export function processLanguages(languages: GitHubRepo['languages']): GitHubLanguage[] {
  const totalSize = languages.reduce((sum, lang) => sum + lang.size, 0);
  if (totalSize === 0) return [];

  return languages
    .map(lang => ({
      name: lang.name,
      color: getLanguageColor(lang.name),
      percentage: Math.round((lang.size / totalSize) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

function getLanguageColor(name: string): string {
  const colors: Record<string, string> = {
    Python: '#3776AB',
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Java: '#ED8B00',
    Go: '#00ADD8',
    Rust: '#DEA584',
    'C++': '#00599C',
    C: '#A8B9CC',
    'C#': '#239120',
    PHP: '#777BB4',
    Ruby: '#CC342D',
    Swift: '#FA7343',
    Kotlin: '#7F52FF',
    Dart: '#0175C2',
    HTML: '#E34F26',
    CSS: '#1572B6',
    SQL: '#E38C00',
    Shell: '#89E051',
    Dockerfile: '#2496ED',
    YAML: '#CB171E',
    Markdown: '#083FA1',
  };
  return colors[name] || '#569cd6';
}

export async function generateGitHubCache(
  username: string,
  repoNames: string[]
): Promise<Record<string, GitHubRepo>> {
  const repos = await fetchRepos(username, repoNames);
  const cache: Record<string, GitHubRepo> = {};

  for (const repo of repos) {
    cache[repo.name] = repo;
  }

  return cache;
}

export function getLanguageBadgeColor(language: string): string {
  return getLanguageColor(language);
}

export const FALLBACK_REPO_DATA: Record<string, GitHubRepo> = {
  'California-Housing-Mlops': {
    name: 'California-Housing-Mlops',
    description: 'End-to-end MLOps pipeline for housing price prediction with XGBoost and FastAPI',
    stargazerCount: 42,
    forkCount: 8,
    primaryLanguage: { name: 'Python', color: '#3776AB' },
    languages: [
      { name: 'Python', size: 85000 },
      { name: 'Dockerfile', size: 2500 },
      { name: 'YAML', size: 1800 },
    ],
    updatedAt: '2024-12-15T10:30:00Z',
    url: 'https://github.com/Yassi0022/California-Housing-Mlops',
    homepageUrl: null,
    topics: ['mlops', 'xgboost', 'fastapi', 'mlflow', 'docker', 'ci-cd'],
  },
  'HR-Attrition-Analysis': {
    name: 'HR-Attrition-Analysis',
    description: 'Predictive analytics project analyzing employee attrition patterns using Python and ML',
    stargazerCount: 28,
    forkCount: 5,
    primaryLanguage: { name: 'Python', color: '#3776AB' },
    languages: [
      { name: 'Python', size: 65000 },
      { name: 'Jupyter Notebook', size: 12000 },
    ],
    updatedAt: '2024-11-20T14:45:00Z',
    url: 'https://github.com/Yassi0022/HR-Attrition-Analysis',
    homepageUrl: null,
    topics: ['data-science', 'predictive-analytics', 'xgboost', 'shap', 'feature-engineering'],
  },
  'hobbybuddy': {
    name: 'hobbybuddy',
    description: 'Full-stack social matching platform with Spring Boot backend and React frontend',
    stargazerCount: 67,
    forkCount: 12,
    primaryLanguage: { name: 'Java', color: '#ED8B00' },
    languages: [
      { name: 'Java', size: 120000 },
      { name: 'TypeScript', size: 85000 },
      { name: 'HTML', size: 15000 },
      { name: 'CSS', size: 12000 },
      { name: 'SQL', size: 8000 },
    ],
    updatedAt: '2024-12-01T09:15:00Z',
    url: 'https://github.com/Yassi0022/hobbybuddy',
    homepageUrl: 'https://hobbybuddy.example.com',
    topics: ['spring-boot', 'react', 'mysql', 'redis', 'websocket', 'matching-algorithm'],
  },
};