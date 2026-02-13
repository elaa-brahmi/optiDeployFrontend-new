import { GitHubRepo } from "@/types/githubRepo";

export function extractRepoFields(raw: any): GitHubRepo {
  // If it's coming from your MongoDB
  if (raw.repoId) {
    return {
      userId: raw.userId,
      repoId: raw.repoId,
      name: raw.name,
      owner: raw.owner,
      description: raw.description || '',
      language: raw.language || 'Unknown',
      stars: raw.stars || 0,
      htmlUrl: raw.htmlUrl,
      productionScore: raw.productionScore || 0,
      lastScan: raw.lastScan,
      addedAt: raw.addedAt,
    };
  }

  // If it's coming directly from GitHub API (for the Search/Import phase)
  return {
    userId: raw.owner?.id?.toString() || '',
    repoId: raw.id,
    name: raw.name,
    owner: raw.owner?.login || '',
    ownerAvatar: raw.owner?.avatar_url,
    description: raw.description || '',
    language: raw.language || 'Unknown',
    stars: raw.stargazers_count || 0,
    htmlUrl: raw.html_url,
    productionScore: 0,
    lastScan: new Date().toISOString(),
    addedAt: new Date().toISOString(),
  };
}