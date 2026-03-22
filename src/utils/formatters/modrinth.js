import { groupCommits } from '../github';

export function formatModrinth(commits) {
  const grouped = groupCommits(commits);
  let output = '## Changelog\n\n';

  for (const [group, items] of Object.entries(grouped)) {
    if (items.length === 0) continue;
    output += `### ${group}\n`;
    items.forEach(item => {
      output += `- ${item.cleanMessage} (#${item.sha.substring(0, 7)})\n`;
    });
    output += '\n';
  }

  return output.trim();
}
