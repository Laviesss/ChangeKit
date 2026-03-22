import { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Download, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ChangelogPreview({ content, onDownload }) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5B2D8E', '#ffffff', '#a855f7'],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "CHANGELOG.md";
    document.body.appendChild(element);
    element.click();
    onDownload?.();
  };

  return (
    <div className="relative group bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
      <div className="flex items-center justify-between px-6 py-4 bg-[#252525] border-b border-gray-800">
        <div className="flex items-center text-sm font-semibold text-gray-300">
          <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
          Generated Changelog
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white bg-[#1a1a1a] border border-gray-700 rounded-lg transition-all active:scale-95"
          >
            {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white bg-[#1a1a1a] border border-gray-700 rounded-lg transition-all active:scale-95"
          >
            <Download className="h-4 w-4 mr-2" />
            Download .md
          </button>
        </div>
      </div>
      <div className="p-2" ref={containerRef}>
        <SyntaxHighlighter
          language="markdown"
          style={vscDarkPlus}
          customStyle={{
            background: 'transparent',
            padding: '1.5rem',
            margin: 0,
            fontSize: '0.9rem',
            lineHeight: '1.6',
            maxHeight: '600px',
            overflowY: 'auto',
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
