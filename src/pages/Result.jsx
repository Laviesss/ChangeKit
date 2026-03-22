import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { fetchCommits } from '../utils/github';
import { formatModrinth } from '../utils/formatters/modrinth';
import { formatCurseForge } from '../utils/formatters/curseforge';
import { formatGitHubReleases } from '../utils/formatters/github-releases';
import { FREE_COMMIT_LIMIT } from '../utils/config';
import { usePro } from '../hooks/usePro';
import FormatSelector from '../components/FormatSelector';
import ChangelogPreview from '../components/ChangelogPreview';
import CommitList from '../components/CommitList';
import AdPlaceholder from '../components/AdPlaceholder';
import PaywallBanner from '../components/PaywallBanner';
import DonateButton from '../components/DonateButton';
import { ArrowLeft, RefreshCw, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPro = usePro();
  const repoData = location.state;

  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFormat, setActiveFormat] = useState('modrinth');
  const [formattedContent, setFormattedContent] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (!repoData) {
      navigate('/');
      return;
    }

    // Check for pro=activated param which might have come from redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pro') === 'activated') {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }

    loadCommits();
  }, [repoData, isPro]);

  const loadCommits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const limit = isPro ? 1000 : FREE_COMMIT_LIMIT;
      const data = await fetchCommits({ ...repoData, limit });
      setCommits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [repoData, isPro]);

  useEffect(() => {
    if (commits.length === 0) return;

    let content = '';
    switch (activeFormat) {
      case 'modrinth':
        content = formatModrinth(commits);
        break;
      case 'curseforge':
        content = formatCurseForge(commits);
        break;
      case 'github-releases':
        content = formatGitHubReleases(commits, repoData);
        break;
      default:
        content = formatModrinth(commits);
    }
    setFormattedContent(content);
  }, [commits, activeFormat, repoData]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
        <Loader2 className="h-12 w-12 text-[#5B2D8E] animate-spin" />
        <p className="text-xl font-bold text-gray-400">Fetching commits from GitHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6 text-center">
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-full">
          <RefreshCw className="h-12 w-12 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
        </div>
        <Link to="/" className="flex items-center text-purple-400 font-bold hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Try another repository
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-6 py-12 lg:py-20 relative">
      {/* Pro Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-[#5B2D8E] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-purple-400/30">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-bold">Pro unlocked! Enjoy unlimited commits 🎉</span>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <Link to="/" className="flex items-center text-gray-500 hover:text-white transition-colors text-sm font-semibold group mb-2">
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <div className="p-2 bg-[#5B2D8E] rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            {repoData.owner}/{repoData.repo}
          </h1>
        </div>
        {!isPro && <AdPlaceholder type="leaderboard" />}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Commits and Sidebar */}
        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
          <CommitList commits={commits} limitReached={!isPro && commits.length >= FREE_COMMIT_LIMIT} />
          {!isPro && (
            <div className="hidden lg:block sticky top-8">
              <AdPlaceholder type="rectangle" />
            </div>
          )}
        </div>

        {/* Right Column - Preview and Format Selection */}
        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
          <div className="sticky top-8 space-y-4 z-10">
            <FormatSelector activeFormat={activeFormat} onFormatChange={setActiveFormat} />
            <ChangelogPreview content={formattedContent} />

            {!isPro && <PaywallBanner />}

            {!isPro && (
              <div className="lg:hidden py-8">
                <AdPlaceholder type="rectangle" />
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-12 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5B2D8E] rounded-lg flex items-center justify-center font-black text-white italic">C</div>
          <span className="font-bold text-gray-400">ChangeKit © {new Date().getFullYear()}</span>
        </div>
        <DonateButton />
      </footer>
    </div>
  );
}
