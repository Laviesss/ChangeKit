import { groupCommits } from '../github';

export function formatGitHubReleases(commits, { owner, repo } = {}) {
  const grouped = groupCommits(commits);
  let output = "## What's Changed\n";

  for (const [group, items] of Object.entries(grouped)) {
    if (items.length === 0) continue;
    items.forEach(item => {
      output += `- ${item.cleanMessage} by @${item.author.login} in #${item.sha.substring(0, 7)}\n`;
    });
  }

  if (owner && repo) {
    output += `\n**Full Changelog:** https://github.com/{{owner}}/{{repo}}/compare/v1.0...v2.0`.replace('{{owner}}', owner).replace('{{repo}}', repo);
  }

  return output.trim();
}
