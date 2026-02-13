export interface GitHubRepo {
  id: number;
  name: string;
  owner: string;
  ownerAvatar: string;
  description: string;
  language: string;
  stars: number;
  openIssues: number;
  lastUpdated: string;
  htmlUrl: string;
  status: 'ready' | 'warning' | 'critical';
  visibility: 'public' | 'private';
  coverage?: number; // Optional, will be added after scanning
  issues?: number; // Optional, will be added after scanning
}