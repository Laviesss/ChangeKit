import { Layout, Hammer, Github } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function FormatSelector({ activeFormat, onFormatChange }) {
  const formats = [
    { id: 'modrinth', name: 'Modrinth', icon: <Layout className="h-4 w-4 mr-2" /> },
    { id: 'curseforge', name: 'CurseForge', icon: <Hammer className="h-4 w-4 mr-2" /> },
    { id: 'github-releases', name: 'GitHub Releases', icon: <Github className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 bg-[#1a1a1a] p-1 rounded-xl w-fit border border-gray-800">
      {formats.map((format) => (
        <button
          key={format.id}
          onClick={() => onFormatChange(format.id)}
          className={cn(
            "flex items-center px-5 py-2 text-sm font-semibold rounded-lg transition-all",
            activeFormat === format.id
              ? "bg-purple-accent text-white shadow-lg scale-105"
              : "text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5"
          )}
        >
          {format.icon}
          {format.name}
        </button>
      ))}
    </div>
  );
}
