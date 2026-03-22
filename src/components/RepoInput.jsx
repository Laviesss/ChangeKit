import { useState } from 'react';
import { ChevronDown, ChevronUp, Github, Loader2 } from 'lucide-react';
import { parseRepoUrl } from '../utils/github';

export default function RepoInput({ onGenerate, loading }) {
  const [repoUrl, setRepoUrl] = useState('');
  const [token, setToken] = useState(localStorage.getItem('github_token') || '');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const parsed = parseRepoUrl(repoUrl);
    if (!parsed) {
      setError('Invalid GitHub URL or owner/repo format');
      return;
    }

    if (token) {
      localStorage.setItem('github_token', token);
    } else {
      localStorage.removeItem('github_token');
    }

    onGenerate({ ...parsed, token });
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-400 mb-1">
            GitHub Repository
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Github className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="repoUrl"
              placeholder="https://github.com/owner/repo or owner/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5B2D8E] focus:border-transparent transition-all"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          {showAdvanced ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
          Advanced (Token)
        </button>

        {showAdvanced && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <label htmlFor="token" className="block text-sm font-medium text-gray-400">
              Personal Access Token (optional)
            </label>
            <input
              type="password"
              id="token"
              placeholder="ghp_xxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="block w-full px-3 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5B2D8E]"
            />
            <p className="text-xs text-gray-500">
              Tokens are stored only in your browser's localStorage.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !repoUrl.trim()}
          className="w-full flex items-center justify-center px-6 py-3 bg-[#5B2D8E] hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg transform active:scale-95 transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Generating...
            </>
          ) : (
            'Generate Changelog'
          )}
        </button>
      </form>
    </div>
  );
}
