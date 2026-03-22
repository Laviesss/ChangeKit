import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RepoInput from '../components/RepoInput';
import DonateButton from '../components/DonateButton';
import { Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = (data) => {
    setLoading(true);
    // Passing data through navigate state for simplicity in this demo
    navigate('/result', { state: data });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-4xl text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-accent/10 border border-purple-accent/30 text-purple-400 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="h-4 w-4 mr-2" />
              Revolutionize your releases
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-br from-white via-white to-purple-400 bg-clip-text text-transparent">
              ChangeKit
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Turn your commits into clean changelogs in seconds. The simplest way to generate release notes for your GitHub projects.
            </p>
          </div>

          {/* Input Section */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <RepoInput onGenerate={handleGenerate} loading={loading} />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl space-y-4 hover:border-purple-accent/50 transition-all group">
              <div className="p-3 bg-purple-accent/10 rounded-xl w-fit group-hover:bg-purple-accent group-hover:text-white transition-all text-purple-400">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Conventional Commits</h3>
              <p className="text-sm text-gray-500">Automatically groups your commits by type like feat, fix, and chore for a professional look.</p>
            </div>
            <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl space-y-4 hover:border-purple-accent/50 transition-all group">
              <div className="p-3 bg-purple-accent/10 rounded-xl w-fit group-hover:bg-purple-accent group-hover:text-white transition-all text-purple-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Multiple Formats</h3>
              <p className="text-sm text-gray-500">Supports popular formats like Modrinth, CurseForge, and GitHub Releases out of the box.</p>
            </div>
            <div className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl space-y-4 hover:border-purple-accent/50 transition-all group">
              <div className="p-3 bg-purple-accent/10 rounded-xl w-fit group-hover:bg-purple-accent group-hover:text-white transition-all text-purple-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Privacy First</h3>
              <p className="text-sm text-gray-500">No backend, no tracking. Your GitHub tokens never leave your browser. 100% client-side.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-900 gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-accent rounded-lg flex items-center justify-center font-black text-white italic">C</div>
          <span className="font-bold text-gray-400">ChangeKit © {new Date().getFullYear()}</span>
        </div>
        <DonateButton />
      </footer>
    </div>
  );
}
