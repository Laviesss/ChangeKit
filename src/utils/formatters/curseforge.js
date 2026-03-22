import { groupCommits } from '../github';

export function formatCurseForge(commits) {
  const grouped = groupCommits(commits);
  let output = '**Changelog**\n\n';

  const typeMapping = {
    '✨ New Features': '[New]',
    '🐛 Bug Fixes': '[Fix]',
    '🔧 Changes': '[Change]',
    '📚 Documentation': '[Docs]',
    '♻️ Code Refactoring': '[Refactor]',
    '⚡ Performance Improvements': '[Perf]',
    '💄 Style Changes': '[Style]',
    '✅ Tests': '[Test]',
    'Changes': '[Change]'
  };

  for (const [group, items] of Object.entries(grouped)) {
    if (items.length === 0) continue;
    const prefix = typeMapping[group] || '[Change]';
    items.forEach(item => {
      output += `${prefix} ${item.cleanMessage}\n`;
    });
  }

  return output.trim();
}
