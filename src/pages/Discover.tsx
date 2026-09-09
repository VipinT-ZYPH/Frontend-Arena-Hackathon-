import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Shield, Users, Layers, MessageSquare, Plus, Zap, Fingerprint } from 'lucide-react';
import { Space, SpaceType } from '../types';

interface DiscoverProps {
  spaces: Space[];
  onSelectSpace: (spaceId: string) => void;
  onCreateSpaceClick: () => void;
}

export const Discover: React.FC<DiscoverProps> = ({
  spaces,
  onSelectSpace,
  onCreateSpaceClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | SpaceType>('all');

  const categories: { id: 'all' | SpaceType; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Spaces', count: spaces.length },
      { id: 'experience', label: 'Experiences', count: spaces.filter(s => s.type === 'experience').length },
      { id: 'challenge', label: 'Challenges', count: spaces.filter(s => s.type === 'challenge').length },
      { id: 'question', label: 'Questions', count: spaces.filter(s => s.type === 'question').length },
      { id: 'collaboration', label: 'Collaborations', count: spaces.filter(s => s.type === 'collaboration').length },
    ];
  }, [spaces]);

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const matchesSearch = space.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            space.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || space.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [spaces, searchQuery, activeFilter]);

  // Design distinct grid column layouts for each card to simulate an editorial, asymmetric look
  const getCardSpan = (idx: number) => {
    if (idx === 0) return 'md:col-span-2 lg:col-span-2 row-span-1';
    if (idx === 3) return 'md:col-span-2 lg:col-span-1 row-span-2';
    if (idx === 4) return 'md:col-span-2 lg:col-span-2 row-span-1';
    return 'col-span-1';
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pb-24 md:pl-64">
      {/* Top Header Grid */}
      <header className="border-b border-[#1f1f23]/40 px-6 sm:px-10 py-8 bg-[#070709]/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Explore Evolving Spaces</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Select a container prompt, immerse yourself in perspectives, and contribute your node.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
            <div className="bg-zinc-900 border border-zinc-800/80 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>{spaces.length} Spaces active</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800/80 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>{spaces.reduce((sum, s) => sum + s.contributorsCount, 0)} contributors</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-8 space-y-8">
        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm font-bold'
                    : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800/60 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search collective prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>
        </div>

        {/* Asymmetric Editorial Spaces Grid */}
        {filteredSpaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {filteredSpaces.map((space, idx) => {
              const spanClass = getCardSpan(idx);
              const Theme = space.visualTheme;
              
              return (
                <motion.div
                  key={space.id}
                  onClick={() => onSelectSpace(space.id)}
                  className={`group rounded-3xl border ${Theme.borderColor} bg-gradient-to-br ${Theme.bgGradient} p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-zinc-700 cursor-pointer ${Theme.glowColor} ${spanClass}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  {/* Glowing background highlights inside card */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${Theme.particleColor} blur-3xl opacity-40 pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                  {/* Top: Space Header & Status */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest ${Theme.accentColor} px-2.5 py-1 rounded-full bg-black/40 border ${Theme.borderColor}`}>
                        {space.type}
                      </span>
                      {space.isActive && (
                        <span className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Evolving</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors leading-snug">
                        {space.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-lg italic font-light">
                        {space.prompt}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Stats and Trigger */}
                  <div className="mt-8 pt-6 border-t border-zinc-800/30 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-300 font-bold">{space.contributionsCount}</span>
                        <span>nodes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-300 font-bold">{space.contributorsCount}</span>
                        <span>minds</span>
                      </div>
                    </div>

                    <span className={`text-xs font-bold flex items-center gap-1.5 transition-all duration-300 ${Theme.accentColor} group-hover:translate-x-1`}>
                      <span>Explore</span>
                      <span className="text-sm">→</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="py-24 rounded-3xl bg-zinc-900/20 border border-zinc-800/60 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <Layers className="w-12 h-12 text-zinc-700" />
            <div>
              <h3 className="text-md font-bold text-zinc-300">No active Space matching search</h3>
              <p className="text-xs text-zinc-500 max-w-sm mt-1 leading-relaxed">
                Be the pioneer of this thought thread. Create a new Space container to prompt collective thoughts.
              </p>
            </div>
            <button
              onClick={onCreateSpaceClick}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-bold flex items-center gap-2 hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Initiate New Space</span>
            </button>
          </div>
        )}

        {/* Suggestion Card Banner at bottom */}
        <div className="rounded-3xl border border-[#1f1f23] p-8 bg-gradient-to-r from-zinc-950 via-[#0d0a15] to-[#120a10] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-md font-bold text-zinc-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-violet-400" />
              <span>Have a different prompt idea?</span>
            </h3>
            <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
              Echo lives through curiosity. Start a question node or share a fresh aesthetic blueprint to co-evolve.
            </p>
          </div>
          <button
            onClick={onCreateSpaceClick}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white text-xs font-bold shadow-lg shadow-violet-500/10 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Create Space Node
          </button>
        </div>
      </main>
    </div>
  );
};
