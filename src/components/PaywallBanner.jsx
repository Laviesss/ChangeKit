import { useState } from 'react';
import { Lock, Crown, ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { PAYHIP_PRODUCT_URL, PRO_PRICE } from '../utils/config';
import { usePro } from '../hooks/usePro';

export default function PaywallBanner() {
  const { unlockPro } = usePro();
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;

    setLoading(true);
    const success = await unlockPro(licenseKey.trim());
    setLoading(false);

    if (success) {
      showToast('Pro unlocked! 🎉', 'success');
    } else {
      showToast('Invalid or already used license key', 'error');
    }
  };

  return (
    <div className="mt-8 relative group">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className={`px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border ${
            toast.type === 'success'
              ? 'bg-[#5B2D8E] text-white border-purple-400/30'
              : 'bg-red-500 text-white border-red-400/30'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            <span className="font-bold">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[#1a1a1a] ring-1 ring-gray-800 rounded-2xl p-8 flex flex-col items-center justify-between gap-8 overflow-hidden shadow-2xl">
        <div className="w-full text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-purple-400 font-bold tracking-wider uppercase text-xs">
            <Crown className="h-4 w-4" />
            Go Pro
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Unlock Unlimited Commits
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            The free version is limited to the last 10 commits. Get full access to your entire repository history with a one-time {PRO_PRICE} on Payhip. No subscription, ever.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start gap-4 shrink-0">
            <div className="text-3xl font-extrabold text-white">
              {PRO_PRICE}
              <span className="text-sm font-normal text-gray-500 ml-1">one-time</span>
            </div>
            <a
              href={PAYHIP_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-8 py-3 bg-[#5B2D8E] hover:bg-opacity-90 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transform active:scale-95 transition-all w-full md:w-auto"
            >
              Buy on Payhip
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </div>

          <div className="w-full space-y-3 p-6 bg-[#252525] rounded-xl border border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Already purchased? Enter your license key here</p>
            <form onSubmit={handleActivate} className="flex gap-2">
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5B2D8E]"
              />
              <button
                type="submit"
                disabled={loading || !licenseKey.trim()}
                className="px-4 py-2 bg-[#5B2D8E] hover:bg-opacity-90 disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-all"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Activate'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-[10px] text-gray-600 flex items-center gap-1 uppercase tracking-widest font-bold">
          <Lock className="h-3 w-3" />
          Secure checkout by Payhip
        </p>
      </div>
    </div>
  );
}
