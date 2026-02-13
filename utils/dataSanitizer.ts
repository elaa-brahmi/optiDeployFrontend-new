import { GitHubRepo } from "@/types/githubRepo";

export function extractRepoFields(raw: any): GitHubRepo {
  return {
    id: raw.id,
    name: raw.name,
    owner: raw.owner?.login || 'unknown',
    ownerAvatar: raw.owner?.avatar_url || '',
    description: raw.description || 'No description provided.',
    language: raw.language || 'Plain Text',
    stars: raw.stargazers_count || 0,
    openIssues: raw.open_issues_count || 0,
    lastUpdated: new Date(raw.updated_at).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    htmlUrl: raw.html_url,
    visibility: raw.private ? 'private' : 'public',
    // Default status until a scan is performed
    status: 'ready', 
  };
}

