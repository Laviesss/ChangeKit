export default function AdPlaceholder({ type = 'leaderboard' }) {
  const dimensions = type === 'leaderboard' ? 'w-full h-[90px] max-w-[728px]' : 'w-[300px] h-[250px]';
  const label = type === 'leaderboard' ? '728x90 Leaderboard' : '300x250 Rectangle';

  return (
    <div className={`mx-auto bg-[#1a1a1a] border border-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-500 font-mono ${dimensions} overflow-hidden shadow-sm hover:border-[#5B2D8E]/30 transition-colors animate-pulse`}>
      {/* Replace with AdSense unit once approved */}
      <div className="text-center px-4">
        <p className="font-bold text-gray-400 mb-1">Ad Unit Placeholder</p>
        <p className="text-[10px] opacity-60 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}
