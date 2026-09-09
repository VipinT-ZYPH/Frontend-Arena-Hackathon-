import React from 'react';
import { Compass, Zap, Fingerprint, Plus, Sparkles, LogOut } from 'lucide-react';

interface NavigationProps {
  activeScreen: 'welcome' | 'discover' | 'space-detail' | 'my-echo' | 'activity';
  onNavigate: (screen: 'welcome' | 'discover' | 'space-detail' | 'my-echo' | 'activity') => void;
  onCreateSpaceClick: () => void;
  unreadCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeScreen,
  onNavigate,
  onCreateSpaceClick,
  unreadCount,
}) => {
  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col justify-between w-64 h-screen fixed left-0 top-0 bg-[#09090b] border-r border-[#1f1f23]/60 px-6 py-8 z-40">
        <div>
          {/* Logo */}
          <div 
            onClick={() => onNavigate('welcome')} 
            className="flex items-center gap-3 cursor-pointer group mb-12"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-violet-500/10 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg tracking-wider">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">Echo</h1>
              <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-medium">Reimagine Social</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-2">
            <button
              onClick={() => onNavigate('welcome')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeScreen === 'welcome'
                  ? 'bg-gradient-to-r from-zinc-800/80 to-zinc-900/50 text-zinc-100 border border-zinc-700/30 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm">Welcome</span>
            </button>

            <button
              onClick={() => onNavigate('discover')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeScreen === 'discover' || activeScreen === 'space-detail'
                  ? 'bg-gradient-to-r from-zinc-800/80 to-zinc-900/50 text-zinc-100 border border-zinc-700/30 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">Discover Spaces</span>
            </button>

            <button
              onClick={() => onNavigate('activity')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                activeScreen === 'activity'
                  ? 'bg-gradient-to-r from-zinc-800/80 to-zinc-900/50 text-zinc-100 border border-zinc-700/30 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Activity</span>
              </div>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-rose-500 text-white font-semibold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('my-echo')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeScreen === 'my-echo'
                  ? 'bg-gradient-to-r from-zinc-800/80 to-zinc-900/50 text-zinc-100 border border-zinc-700/30 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <Fingerprint className="w-4 h-4 text-rose-400" />
              <span className="text-sm">My Echo</span>
            </button>
          </nav>

          {/* Action Button */}
          <div className="mt-8 px-2">
            <button
              onClick={onCreateSpaceClick}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Space</span>
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="border-t border-[#1f1f23]/60 pt-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full border-2 border-zinc-700/50 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Your avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-200 truncate">Vipin T.</p>
              <p className="text-[11px] text-zinc-500 truncate">Senior Designer</p>
            </div>
            <button 
              onClick={() => onNavigate('welcome')} 
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg hover:bg-zinc-900"
              title="Return to Welcome"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#09090b]/90 backdrop-blur-md border-t border-[#1f1f23]/80 flex items-center justify-around px-4 z-40 pb-safe">
        <button
          onClick={() => onNavigate('welcome')}
          className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${
            activeScreen === 'welcome' ? 'text-violet-400' : 'text-zinc-500'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">Home</span>
        </button>

        <button
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${
            activeScreen === 'discover' || activeScreen === 'space-detail' ? 'text-cyan-400' : 'text-zinc-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">Discover</span>
        </button>

        {/* Center Floating Create CTA on Mobile */}
        <button
          onClick={onCreateSpaceClick}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-md -translate-y-2 active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate('activity')}
          className={`relative flex flex-col items-center justify-center w-12 h-12 transition-colors ${
            activeScreen === 'activity' ? 'text-amber-400' : 'text-zinc-500'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">Activity</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => onNavigate('my-echo')}
          className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${
            activeScreen === 'my-echo' ? 'text-rose-400' : 'text-zinc-500'
          }`}
        >
          <Fingerprint className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium whitespace-nowrap">My Echo</span>
        </button>
      </div>
    </>
  );
};
