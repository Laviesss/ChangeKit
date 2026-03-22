import { GitCommit, User, Calendar } from 'lucide-react';

export default function CommitList({ commits, limitReached }) {
  if (!commits || commits.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center">
        <GitCommit className="h-5 w-5 mr-2 text-[#5B2D8E]" />
        Commits
      </h2>
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
        {commits.map((commit) => (
          <div key={commit.sha} className="p-4 hover:bg-[#252525] transition-colors group">
            <div className="flex items-start justify-between">
              <div className="space-y-1 pr-4">
                <p className="font-medium text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
                  {commit.message.split('\n')[0]}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {commit.author.login}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(commit.author.date).toLocaleDateString()}
                  </span>
                  <span className="font-mono bg-gray-800 px-1 rounded">
                    {commit.sha.substring(0, 7)}
                  </span>
                </div>
              </div>
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors shrink-0"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
      {limitReached && (
        <div className="p-3 bg-[#5B2D8E] bg-opacity-10 border border-[#5B2D8E] border-opacity-30 rounded-lg text-sm text-purple-300 text-center">
          Free tier limit reached. Only showing the last 10 commits.
        </div>
      )}
    </div>
  );
}
