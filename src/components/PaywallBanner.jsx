import { Lock, Crown, ArrowRight } from 'lucide-react';
import { LEMON_SQUEEZY_URL } from '../utils/config';

export default function PaywallBanner() {
  return (
    <div className="mt-8 relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[#1a1a1a] ring-1 ring-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-2xl">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold tracking-wider uppercase text-xs">
            <Crown className="h-4 w-4" />
            Go Pro
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Unlock Unlimited Commits
          </h3>
          <p className="text-gray-400 max-w-md">
            The free version is limited to the last 10 commits. Get full access to your entire repository history with a one-time payment.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
          <div className="text-3xl font-extrabold text-white">
            $4.99
            <span className="text-sm font-normal text-gray-500 ml-1">one-time</span>
          </div>
          <a
            href={LEMON_SQUEEZY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-8 py-3 bg-purple-accent hover:bg-opacity-90 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transform active:scale-95 transition-all w-full md:w-auto"
          >
            Unlock Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </a>
          <p className="text-[10px] text-gray-600 flex items-center gap-1 uppercase tracking-widest font-bold">
            <Lock className="h-3 w-3" />
            Secure checkout by Lemon Squeezy
          </p>
        </div>
      </div>
    </div>
  );
}
