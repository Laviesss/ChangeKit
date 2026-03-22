import { Heart } from 'lucide-react';
import { DONATE_URL } from '../utils/config';

export default function DonateButton() {
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white bg-[#1a1a1a] border border-gray-800 hover:border-[#5B2D8E]/50 rounded-lg transition-all active:scale-95"
    >
      <Heart className="h-4 w-4 mr-2 text-pink-500" />
      Support ChangeKit on Ko-fi
    </a>
  );
}
