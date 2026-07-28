export type ReleaseArea = 'frontend' | 'api' | 'security' | 'operations';

export type ReleaseCheck = {
  id: string;
  title: string;
  description: string;
  area: ReleaseArea;
  owner: string;
};

export type ReleaseSnapshot = {
  id: string;
  productName: string;
  version: string;
  environment: string;
  checks: ReleaseCheck[];
};

export type ReviewStatus = 'pending' | 'passed' | 'blocked';
export type ReviewFilter = 'all' | ReviewStatus;

export const releaseAreaLabels: Record<ReleaseArea, string> = {
  frontend: 'Frontend',
  api: 'API e dati',
  security: 'Sicurezza',
  operations: 'Operations',
};

export const reviewStatusLabels: Record<ReviewStatus, string> = {
  pending: 'Da verificare',
  passed: 'Superato',
  blocked: 'Bloccato',
};
