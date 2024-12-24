import React from 'react';
import { Terminal as TerminalIcon, Power, Download, ExternalLink } from 'lucide-react';
import { SocialLinks } from '../SocialLinks';
import { documents } from '../../assets';

export const Whitepaper: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 border-b border-pink-500/30 bg-black/40">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-pink-500" />
            <span className="text-pink-500 font-mono text-base">SYMBaiEX://whitepaper</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:ml-auto gap-2 sm:gap-3">
            <button
              onClick={() => window.open(documents.whitepaper, '_blank')}
              className="flex items-center justify-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg 
                       border border-pink-500/30 hover:border-cyan-400/50 transition-colors"
            >
              <span className="text-pink-500 font-mono text-sm">Open in New Tab</span>
              <ExternalLink className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              href={documents.whitepaper}
              download="SYMBaiEX_Whitepaper.pdf"
              className="flex items-center justify-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg 
                       border border-pink-500/30 hover:border-cyan-400/50 transition-colors"
            >
              <span className="text-pink-500 font-mono text-sm">Download PDF</span>
              <Download className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
          <Power className="hidden sm:block w-5 h-5 text-cyan-400" />
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 p-4 overflow-hidden relative pdf-container">
          {/* Overlay gradient effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent" />
          </div>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJzY2FubGluZXMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjIiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIwIiBzdHJva2U9IiNlYzQ4OTkiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzY2FubGluZXMpIi8+PC9zdmc+')] opacity-50" />
          
          <iframe
            src={`${documents.whitepaper}#view=FitH`}
            className="relative w-full h-full rounded-lg border border-pink-500/30 
                    bg-black/80 backdrop-blur-md shadow-lg shadow-pink-500/20 
                    transition-all duration-300 hover:border-cyan-400/50
                    touch-manipulation"
            title="SYMBaiEX Whitepaper"
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              WebkitTransform: 'translateZ(0)',  // Enable hardware acceleration
              touchAction: 'pan-x pan-y pinch-zoom',  // Enable pinch zoom
              transform: 'translateZ(0)'  // Fallback for non-webkit browsers
            }}
            allow="fullscreen"
          />
        </div>
      </div>
      <SocialLinks />
    </div>
  );
};