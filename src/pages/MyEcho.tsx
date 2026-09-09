import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Fingerprint, Landmark, Bookmark, FileText, Compass, Sparkles, Orbit, Clock, ChevronRight, HelpCircle, Layers } from 'lucide-react';
import { Space, Contribution } from '../types';

interface MyEchoProps {
  spaces: Space[];
  contributions: Contribution[];
  savedSpaceIds: string[];
  savedContributionIds: string[];
  interests: string[];
  onSelectSpace: (spaceId: string) => void;
  onRemoveSavedContribution: (id: string) => void;
}

export const MyEcho: React.FC<MyEchoProps> = ({
  spaces,
  contributions,
  savedSpaceIds,
  savedContributionIds,
  interests,
  onSelectSpace,
  onRemoveSavedContribution,
}) => {
  const [activeTab, setActiveTab] = useState<'contributions' | 'saved' | 'spaces'>('contributions');

  // Filter contributions submitted by the current user (e.g., "Vipin T.")
  const userContributions = useMemo(() => {
    return contributions.filter(c => c.author.name === 'Vipin T.');
  }, [contributions]);

  // Filter saved contributions
  const savedContributions = useMemo(() => {
    return contributions.filter(c => savedContributionIds.includes(c.id));
  }, [contributions, savedContributionIds]);

  // Filter spaces co-created or contributed to
  const userCreatedSpaces = useMemo(() => {
    // Created spaces include any spaces where user contributed or custom-made (let's show matching ones)
    return spaces.filter(s => s.contributorsCount === 0 || s.id.startsWith('space-'));
  }, [spaces]);

  const stats = useMemo(() => {
    return {
      nodesAdded: userContributions.length,
      savedNodes: savedContributions.length,
      spacesJoined: savedSpaceIds.length,
    };
  }, [userContributions, savedContributions, savedSpaceIds]);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pb-24 md:pl-64">
      {/* Page Header */}
      <header className="border-b border-[#1f1f23]/40 px-6 sm:px-10 py-8 bg-[#070709]/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Fingerprint className="w-5.5 h-5.5 text-rose-400" />
              <span>My Echo Blueprint</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Your contribution history isn't a timeline of static posts. It is an evolving story of shared connections.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-8 space-y-8">
        {/* Story Fingerprint Header Block */}
        <section className="p-6 sm:p-8 rounded-3xl border border-zinc-900 bg-gradient-to-tr from-[#14121a] via-zinc-950 to-zinc-950 relative overflow-hidden">
          {/* Decorative radial orbs */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full border-2 border-rose-500/30 p-1 flex items-center justify-center bg-zinc-950">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-violet-600 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
                  VT
                </div>
              </div>
              <div className="text-center md:text-left space-y-1.5">
                <span className="text-[9px] uppercase tracking-widest text-rose-400 font-bold bg-rose-500/5 border border-rose-500/10 px-2.5 py-0.5 rounded-full">
                  CO-RESONATOR
                </span>
                <h3 className="text-lg font-bold text-zinc-100">Vipin Thingalaya</h3>
                <p className="text-xs text-zinc-500 font-light">
                  Active since August 2026 • Curating Acoustic Ecologies & Human Interfaces
                </p>
              </div>
            </div>

            {/* Metrics display - anti-slop version: integrated list cards */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="bg-zinc-900/60 border border-zinc-800/60 p-3 rounded-2xl text-center">
                <span className="block text-lg font-bold text-white">{stats.nodesAdded}</span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Nodes Added</span>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/60 p-3 rounded-2xl text-center">
                <span className="block text-lg font-bold text-white">{stats.savedNodes}</span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Saved Nodes</span>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/60 p-3 rounded-2xl text-center">
                <span className="block text-lg font-bold text-white">{stats.spacesJoined}</span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Spaces Joined</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interests constellation tag display */}
        <section className="space-y-3">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <Orbit className="w-4 h-4 text-violet-400" />
            <span>Interactive Interest Nodes</span>
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            {interests.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800/80 hover:border-violet-500/30 transition-colors"
              >
                # {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Dynamic sub navigation tabs */}
        <div className="flex border-b border-zinc-900">
          <button
            onClick={() => setActiveTab('contributions')}
            className={`px-5 py-3 text-xs font-bold transition-all relative cursor-pointer ${
              activeTab === 'contributions' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>My Contributions ({userContributions.length})</span>
            {activeTab === 'contributions' && (
              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-3 text-xs font-bold transition-all relative cursor-pointer ${
              activeTab === 'saved' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>Saved Perspectives ({savedContributions.length})</span>
            {activeTab === 'saved' && (
              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('spaces')}
            className={`px-5 py-3 text-xs font-bold transition-all relative cursor-pointer ${
              activeTab === 'spaces' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>Spaces Started ({userCreatedSpaces.length})</span>
            {activeTab === 'spaces' && (
              <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />
            )}
          </button>
        </div>

        {/* TIMELINE LIST LAYOUTS */}
        <div className="space-y-4">
          {activeTab === 'contributions' && (
            userContributions.length > 0 ? (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-900">
                {userContributions.map((contrib) => {
                  const matchingSpace = spaces.find(s => s.id === contrib.spaceId);
                  return (
                    <motion.div
                      key={contrib.id}
                      className="relative space-y-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {/* Timeline node circle */}
                      <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-rose-500 border border-zinc-950" />

                      {/* Timeline card */}
                      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 hover:border-zinc-800 transition-colors">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <span
                            onClick={() => matchingSpace && onSelectSpace(matchingSpace.id)}
                            className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors"
                          >
                            Space: {matchingSpace?.title || 'Unknown Space'}
                          </span>
                          <span className="text-[9px] text-zinc-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Just now</span>
                          </span>
                        </div>

                        {/* Node payload */}
                        {contrib.type === 'question' ? (
                          <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                              Inquiry: {contrib.questionTitle}
                            </span>
                            <p className="text-xs text-zinc-200 font-light italic">{contrib.content}</p>
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-300 leading-relaxed font-light">{contrib.content}</p>
                        )}

                        {contrib.mediaUrl && (
                          <div className="aspect-video max-w-sm rounded-xl overflow-hidden mt-3 border border-zinc-900">
                            <img
                              src={contrib.mediaUrl}
                              alt="Your contribution media"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-zinc-600 border border-zinc-900/60 rounded-3xl p-6 bg-zinc-950/20">
                <FileText className="w-10 h-10 text-zinc-800 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">No Node History</h4>
                <p className="text-[10px] text-zinc-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  You haven't added reflections or visual captures yet. Navigate to Discover to join evolving themes.
                </p>
              </div>
            )
          )}

          {activeTab === 'saved' && (
            savedContributions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedContributions.map((contrib) => {
                  const matchingSpace = spaces.find(s => s.id === contrib.spaceId);
                  return (
                    <motion.div
                      key={contrib.id}
                      className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-zinc-800 transition-colors group"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={contrib.author.avatar}
                              alt={contrib.author.name}
                              className="w-6 h-6 rounded-full object-cover border border-zinc-900"
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-[10px] text-zinc-300 font-bold">{contrib.author.name}</span>
                          </div>
                          <span className="text-[8px] font-extrabold uppercase tracking-widest text-zinc-500">
                            {contrib.type}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed font-light line-clamp-4">
                          {contrib.content}
                        </p>
                      </div>

                      <div className="pt-3.5 border-t border-zinc-900/60 flex items-center justify-between">
                        <button
                          onClick={() => matchingSpace && onSelectSpace(matchingSpace.id)}
                          className="text-[10px] text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1"
                        >
                          <span>Explore Space</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onRemoveSavedContribution(contrib.id)}
                          className="text-[10px] text-zinc-500 hover:text-rose-400 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-zinc-600 border border-zinc-900/60 rounded-3xl p-6 bg-zinc-950/20">
                <Bookmark className="w-10 h-10 text-zinc-800 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">No Saved Perspectives</h4>
                <p className="text-[10px] text-zinc-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  Bookmarked perspectives from other spaces will compile here to build your creative source of truth.
                </p>
              </div>
            )
          )}

          {activeTab === 'spaces' && (
            userCreatedSpaces.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userCreatedSpaces.map((space) => (
                  <div
                    key={space.id}
                    onClick={() => onSelectSpace(space.id)}
                    className={`p-5 rounded-2xl border ${space.visualTheme.borderColor} bg-gradient-to-br ${space.visualTheme.bgGradient} flex flex-col justify-between hover:border-zinc-800 transition-colors cursor-pointer`}
                  >
                    <div className="space-y-2">
                      <span className={`text-[8px] font-extrabold uppercase tracking-widest ${space.visualTheme.accentColor}`}>
                        {space.type}
                      </span>
                      <h4 className="text-md font-bold text-white line-clamp-1">{space.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed italic line-clamp-2">{space.prompt}</p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-zinc-900/30 flex items-center justify-between text-[10px] text-zinc-500">
                      <span>{space.contributionsCount} nodes · {space.contributorsCount} contributors</span>
                      <span className={`font-bold uppercase tracking-wider ${space.visualTheme.accentColor}`}>Open</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-zinc-600 border border-zinc-900/60 rounded-3xl p-6 bg-zinc-950/20">
                <Layers className="w-10 h-10 text-zinc-800 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">No Created Spaces</h4>
                <p className="text-[10px] text-zinc-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  Start an evolving container Space from the Discover tab to create collective digital blueprints.
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};
