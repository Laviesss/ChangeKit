const CONVENTIONAL_COMMIT_TYPES = {
  feat: '✨ New Features',
  fix: '🐛 Bug Fixes',
  chore: '🔧 Changes',
  docs: '📚 Documentation',
  refactor: '♻️ Code Refactoring',
  perf: '⚡ Performance Improvements',
  style: '💄 Style Changes',
  test: '✅ Tests',
};

export function parseRepoUrl(input) {
  const cleanInput = input.trim();
  if (!cleanInput) return null;

  // Handle full URL
  const urlRegex = /github\.com\/([^/]+)\/([^/]+)/;
  const match = cleanInput.match(urlRegex);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
  }

  // Handle owner/repo
  const parts = cleanInput.split('/');
  if (parts.length === 2 && parts[0] && parts[1]) {
    return { owner: parts[0], repo: parts[1] };
  }

  return null;
}

export async function fetchCommits({ owner, repo, token, limit = 100 }) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  let allCommits = [];
  let page = 1;
  const perPage = 100;

  try {
    while (allCommits.length < limit) {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`,
        { headers }
      );

      if (!response.ok) {
        if (response.status === 404) throw new Error('Repository not found');
        if (response.status === 403) throw new Error('Rate limit exceeded');
        if (response.status === 401) throw new Error('Invalid token');
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const commits = await response.json();
      if (commits.length === 0) break;

      allCommits = [...allCommits, ...commits];
      if (commits.length < perPage) break;
      page++;
    }

    return allCommits.slice(0, limit).map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: {
        login: commit.author ? commit.author.login : commit.commit.author.name,
        date: commit.commit.author.date,
      },
      html_url: commit.html_url,
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export function groupCommits(commits) {
  const groups = {};
  let hasConventional = false;

  commits.forEach(commit => {
    const match = commit.message.match(/^(\w+)(?:\(.+\))?:\s*(.+)$/);
    if (match) {
      const type = match[1].toLowerCase();
      const groupName = CONVENTIONAL_COMMIT_TYPES[type] || '🔧 Changes';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push({ ...commit, cleanMessage: match[2] });
      hasConventional = true;
    } else {
      if (!groups['🔧 Changes']) groups['🔧 Changes'] = [];
      groups['🔧 Changes'].push({ ...commit, cleanMessage: commit.message.split('\n')[0] });
    }
  });

  if (!hasConventional) {
    return { 'Changes': commits.map(c => ({ ...c, cleanMessage: c.message.split('\n')[0] })) };
  }

  return groups;
}
