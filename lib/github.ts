import { Octokit } from "@octokit/rest";

export const getGitHubClient = (accessToken: string) => {
  return new Octokit({ auth: accessToken });
};

export async function getUserRepos(accessToken: string) {
  const octokit = getGitHubClient(accessToken);
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 20,
  });
  return data;
}