export interface GitHubRepo {
  _id?: string;          // MongoDB internal ID
  userId: string;        // The user's GitHub ID
  repoId: number;        // GitHub's internal repository ID
  name: string;
  owner: string;
  description: string;
  language: string;
  stars: number;
  htmlUrl: string;
  
  // Scoring and Scanning
  productionScore: number; 
  lastScan: string | Date;
  addedAt: string | Date;

  // UI-specific or Optional fields
  ownerAvatar?: string;
  openIssues?: number;
  visibility?: 'public' | 'private';
}