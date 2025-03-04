import React from 'react';
import { Terminal as TerminalIcon, Power, Copy, Check, ExternalLink, MessageCircle } from 'lucide-react';
import { SocialLinks } from '../SocialLinks';
import { UsernameDisplay } from '../Terminal/components/UsernameDisplay';
import { UsernamePopup } from '../Terminal/components/UsernamePopup';
import { userService } from '../../services/user';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { ADDRESSES } from '../../config/constants';

interface Wallet {
  name: string;
  address: string;
}

const wallets: Wallet[] = [
  { name: 'SymbiEX', address: ADDRESSES.WALLETS.SYMBIEX },
  { name: 's9000', address: ADDRESSES.WALLETS.SYMBAIEX },
  { name: 'NyX', address: ADDRESSES.WALLETS.NYX },
  { name: 'UmbrA', address: ADDRESSES.WALLETS.UMBRA }
];

export const Symx: React.FC = () => {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const contractAddress = ADDRESSES.CONTRACT;
  const [showUsernameInput, setShowUsernameInput] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 min-h-[600px] max-h-[80vh]">
        <div className="flex items-center gap-1.5 xs:gap-2 p-2 xs:p-3 border-b border-pink-500/30 bg-black/40">
          <TerminalIcon className="w-3 h-3 xs:w-4 xs:h-4 text-pink-500" />
          <span className="text-pink-500 font-mono text-xs xs:text-sm sm:text-base">s9000://$SYMX</span>
          <div className="ml-auto flex items-center gap-2">
            <UsernameDisplay onClick={() => setShowUsernameInput(true)} />
            <Power className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400" />
          </div>
        </div>
        <div className="flex-1 p-2 xs:p-3 sm:p-4 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="text-center">
              <h2 className="text-sm xs:text-base font-mono text-cyan-400 mb-1">$SYMX Token</h2>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-black/40 p-1.5 rounded-lg border border-pink-500/30">
                <h3 className="text-pink-500 font-mono text-[10px] xs:text-xs mb-1">Supply</h3>
                <p className="text-cyan-400 font-mono text-[10px] xs:text-xs whitespace-nowrap">1,000,000,000</p>
              </div>
              <div className="bg-black/40 p-1.5 rounded-lg border border-pink-500/30">
                <h3 className="text-pink-500 font-mono text-[10px] xs:text-xs mb-1">Circulating</h3>
                <p className="text-cyan-400 font-mono text-[10px] xs:text-xs whitespace-nowrap">1,000,000,000</p>
              </div>
            </div>
            <div className="bg-black/40 p-1 rounded-lg border border-pink-500/30">
              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] xs:text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-pink-500">Chain:</span>
                    <span className="text-cyan-400">Solana</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-pink-500">Network:</span>
                    <span className="text-cyan-400">Mainnet</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-pink-500 mb-0.5 xs:mb-1">Description</h3>
                  <p className="text-cyan-400/80 leading-relaxed">
                    $SYMX Powers the SYMBaiEX ecosystem. 
                  </p>
                </div>
              </div>
              <div className="font-mono text-[10px] xs:text-xs">
                <span className="text-pink-500 block mb-1">Contract</span>
                  <button
                    onClick={() => copyToClipboard(contractAddress)}
                    className="flex items-center justify-between gap-1 px-1 py-0.5 bg-black/40 rounded border border-pink-500/30 hover:border-cyan-400/50 transition-colors group overflow-hidden"
                  >
                    <span className="text-cyan-400 font-mono text-xs break-all">
                      {contractAddress}
                    </span>
                    {copied ? (
                      <Check className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-green-400 flex-shrink-0" />
                    ) : (
                      <Copy className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-cyan-400 group-hover:text-cyan-300 flex-shrink-0" />
                    )}
                  </button>
                </div>
              </div>
            <div className="bg-black/40 p-1 rounded-lg border border-pink-500/30">
              <h3 className="text-cyan-400 font-mono text-[10px] xs:text-xs mb-1">Wallets</h3>
              <div className="space-y-1 font-mono text-[10px] xs:text-xs">
                {wallets.map((wallet, index) => (
                  <div key={wallet.name} className={`flex flex-col ${index !== 0 ? 'mt-1' : ''}`}>
                    <span className="text-pink-500 font-semibold">{wallet.name}</span>
                    <a
                      href={`https://solscan.io/account/${wallet.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center justify-between gap-1 px-1 py-0.5 bg-black/20 rounded"
                    >
                      <span className="break-all">{wallet.address}</span>
                      <ExternalLink className="w-2.5 h-2.5 xs:w-3 xs:h-3 flex-shrink-0" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5">
              <a
                href="https://t.me/SYMBaiEX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-black/40 rounded-lg border border-pink-500/30 
                         hover:border-cyan-400/50 transition-colors group"
              >
                <MessageCircle className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400 group-hover:text-cyan-300" />
                <span className="text-pink-500 font-mono text-[10px] xs:text-xs group-hover:text-pink-400">Join Telegram</span>
              </a>
              <a
                href="https://dexscreener.com/solana/aw1ay7cbxt7lmcya7tqap1wnfhhsus4v7hpdktdumza6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-black/40 rounded-lg border border-pink-500/30 
                         hover:border-cyan-400/50 transition-colors group"
              >
                <ExternalLink className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400 group-hover:text-cyan-300" />
                <span className="text-pink-500 font-mono text-[10px] xs:text-xs group-hover:text-pink-400">DexScreener</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {showUsernameInput && (
        <UsernamePopup
          value={usernameInput}
          onChange={setUsernameInput}
          onSubmit={() => {
            if (usernameInput.trim()) {
              userService.setUsername(usernameInput.trim());
              setShowUsernameInput(false);
              setUsernameInput('');
            }
          }}
          onClose={() => {
            setShowUsernameInput(false);
            setUsernameInput('');
          }}
        />
      )}
      <SocialLinks />
    </div>
  );
};