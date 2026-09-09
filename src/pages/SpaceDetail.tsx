import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Bookmark, Share2, HelpCircle, Users, Activity, Play, Pause, ChevronRight, CornerDownRight, Heart, Sparkles, MessageSquare, List, Orbit } from 'lucide-react';
import { Space, Contribution, ContributionType } from '../types';

interface SpaceDetailProps {
  space: Space;
  contributions: Contribution[];
  savedSpaceIds: string[];
  savedContributionIds: string[];
  onBack: () => void;
  onJoinSpace: (spaceId: string) => void;
  onSaveContribution: (id: string) => void;
  onAddContributionClick: () => void;
  onBuildOnContribution: (parentContribution: Contribution) => void;
}

export const SpaceDetail: React.FC<SpaceDetailProps> = ({
  space,
  contributions,
  savedSpaceIds,
  savedContributionIds,
  onBack,
  onJoinSpace,
  onSaveContribution,
  onAddContributionClick,
  onBuildOnContribution,
}) => {
  const [viewMode, setViewMode] = useState<'spatial' | 'collage'>('spatial');
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioPlaybackProgress, setAudioPlaybackProgress] = useState(0);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const isSavedSpace = savedSpaceIds.includes(space.id);
  const Theme = space.visualTheme;

  // Filter contributions belonging to this specific space
  const spaceContributions = useMemo(() => {
    return contributions.filter((c) => c.spaceId === space.id);
  }, [contributions, space.id]);

  // Audio timer simulation
  useEffect(() => {
    let interval: any;
    if (playingAudioId) {
      interval = setInterval(() => {
        setAudioPlaybackProgress((p) => {
          if (p >= 100) {
            setPlayingAudioId(null);
            return 0;
          }
          return p + 2;
        });
      }, 100);
    } else {
      setAudioPlaybackProgress(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playingAudioId]);

  const toggleAudio = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
      setAudioPlaybackProgress(0);
    }
  };

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => {
      setActiveToast(null);
    }, 3000);
  };

  const handleShareSpace = () => {
    showToast('Space link copied to clipboard. Share the collective experience.');
  };

  const handleShareContribution = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Perspective link captured. Core thought branched.');
  };

  const handleSavePerspective = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveContribution(id);
    const isSaved = savedContributionIds.includes(id);
    showToast(isSaved ? 'Perspective removed from your Echo library.' : 'Perspective saved to your Echo library.');
  };

  // Coordinates mapping helper to draw SVG lines between connected cards in Spatial mode
  const svgLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
    spaceContributions.forEach((node) => {
      if (node.connections && node.connections.length > 0) {
        node.connections.forEach((connId) => {
          const targetNode = spaceContributions.find((sc) => sc.id === connId);
          if (targetNode) {
            lines.push({
              x1: node.position.x,
              y1: node.position.y,
              x2: targetNode.position.x,
              y2: targetNode.position.y,
              id: `${node.id}-${targetNode.id}`,
            });
          }
        });
      }
    });
    return lines;
  }, [spaceContributions]);

  return (
    <div className={`min-h-screen bg-[#070709] text-zinc-100 pb-24 md:pl-64 overflow-x-hidden relative`}>
      {/* Dynamic glow overlay matching active Space visual accent */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full ${Theme.particleColor} blur-[120px] opacity-20 pointer-events-none`} />

      {/* Dynamic Success Toast */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 30, x: '-50%' }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#0d0d10] border border-zinc-800 px-6 py-3.5 rounded-2xl shadow-2xl z-50 flex items-center gap-3 text-xs text-zinc-200"
          >
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span className="font-semibold">{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top action bar */}
      <div className="border-b border-[#1f1f23]/40 px-6 sm:px-10 py-5 bg-[#070709]/70 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Discover</span>
        </button>

        <div className="flex items-center gap-2.5">
          {/* View Toggler */}
          <div className="bg-zinc-950/80 p-1 border border-zinc-900 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('spatial')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'spatial'
                  ? 'bg-zinc-900 text-zinc-200 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Spatial Constellation View"
            >
              <Orbit className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px]">Constellation</span>
            </button>
            <button
              onClick={() => setViewMode('collage')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'collage'
                  ? 'bg-zinc-900 text-zinc-200 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Editorial Collage View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px]">Collage</span>
            </button>
          </div>

          <button
            onClick={() => onJoinSpace(space.id)}
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2 cursor-pointer text-xs font-bold ${
              isSavedSpace
                ? 'bg-zinc-900 border-zinc-700 text-zinc-200'
                : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSavedSpace ? 'fill-violet-400 text-violet-400' : ''}`} />
            <span>{isSavedSpace ? 'Joined Space' : 'Join Space'}</span>
          </button>

          <button
            onClick={handleShareSpace}
            className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 cursor-pointer"
            title="Share Space link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main hero space visual banner */}
      <section className={`border-b border-zinc-900 px-6 sm:px-10 py-12 md:py-16 bg-gradient-to-b ${Theme.bgGradient} relative`}>
        {/* Floating background decorative dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f1f23_1.2px,transparent_1.2px)] [bg-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="flex items-center justify-center gap-3">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${Theme.accentColor} px-3 py-1 rounded-full bg-black/40 border ${Theme.borderColor}`}>
              {space.type}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-950/60 px-3 py-1 rounded-full border border-zinc-900">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>{space.contributorsCount} Minds contributing</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {space.title}
          </h1>

          <p className="text-md sm:text-lg text-zinc-300 italic font-light max-w-2xl mx-auto leading-relaxed">
            “ {space.prompt} ”
          </p>

          <p className="text-xs text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {space.description}
          </p>

          {/* CTA add perspective */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={onAddContributionClick}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white font-bold text-xs flex items-center gap-2.5 shadow-2xl shadow-violet-500/25 active:scale-98 transition-all duration-300 cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Add Your Perspective</span>
            </button>
          </div>
        </div>
      </section>

      {/* SPACE WORKSPACE CONTAINER */}
      <section className="px-6 sm:px-10 py-12 max-w-7xl mx-auto relative">
        {viewMode === 'spatial' ? (
          /* SPATIAL CONSTELLATION GRAPH VIEW */
          <div 
            ref={containerRef}
            className="w-full min-h-[580px] bg-zinc-950/40 rounded-3xl border border-zinc-900/60 p-6 sm:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient stars overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#111115_0%,#08080a_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [bg-size:32px_32px] opacity-60 pointer-events-none" />

            {/* Connecting Constellation Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              {svgLines.map((line) => (
                <motion.line
                  key={line.id}
                  x1={`${line.x1}%`}
                  y1={`${line.y1}%`}
                  x2={`${line.x2}%`}
                  y2={`${line.y2}%`}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              ))}
            </svg>

            {/* Spatial interactive cards mapped dynamically */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              {spaceContributions.map((node) => {
                const isSelected = selectedContribution?.id === node.id;
                const isSaved = savedContributionIds.includes(node.id);
                
                return (
                  <motion.div
                    key={node.id}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `${node.position.x}%`,
                      top: `${node.position.y}%`,
                      transform: `translate(-50%, -50%) scale(${node.position.scale || 1})`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
                  >
                    {/* Node Dot representing contribution anchor */}
                    <div
                      onClick={() => setSelectedContribution(node)}
                      className={`w-6 h-6 rounded-full bg-zinc-950 border-2 cursor-pointer flex items-center justify-center transition-all duration-300 relative group/dot ${
                        isSelected 
                          ? 'border-violet-400 scale-125 ring-4 ring-violet-500/10' 
                          : 'border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      {/* Inner colored particle indicating category */}
                      <span className={`w-2 h-2 rounded-full ${
                        node.type === 'text' ? 'bg-rose-400' :
                        node.type === 'image' ? 'bg-cyan-400' :
                        node.type === 'audio' ? 'bg-violet-400' :
                        'bg-amber-400'
                      }`} />

                      {/* Floating tooltip preview */}
                      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-zinc-950 border border-zinc-800/80 px-3 py-1.5 rounded-lg shadow-xl opacity-0 scale-95 group-hover/dot:opacity-100 group-hover/dot:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20">
                        <p className="text-[10px] font-bold text-zinc-200">{node.author.name}</p>
                        <p className="text-[8px] text-zinc-500 uppercase tracking-widest">{node.type}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Instruction Banner at top of spatial graph */}
            <div className="relative z-10 w-full flex justify-between items-center text-xs text-zinc-500 pointer-events-none mb-12 sm:mb-0">
              <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Orbit className="w-3.5 h-3.5 text-violet-400 animate-spin duration-[6000ms]" />
                <span>Interact with node nodes to explore perspectives</span>
              </span>
              <span className="hidden sm:inline">Constellation Coordinates: Math Matrix mapped</span>
            </div>

            {/* Big floating Node Focus Details Panel inside Spatial View */}
            <div className="relative z-20 w-full max-w-lg mt-auto mx-auto sm:mx-0 pointer-events-auto">
              <AnimatePresence mode="wait">
                {selectedContribution ? (
                  <motion.div
                    key={selectedContribution.id}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    className="p-5 sm:p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md shadow-2xl relative"
                  >
                    {/* Header close */}
                    <button
                      onClick={() => setSelectedContribution(null)}
                      className="absolute top-4 right-4 p-1 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedContribution.author.avatar}
                          alt={selectedContribution.author.name}
                          className="w-9 h-9 rounded-full object-cover border border-zinc-800"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-200">{selectedContribution.author.name}</h4>
                          <span className="text-[9px] text-zinc-500">{selectedContribution.author.role || 'Contributor'}</span>
                        </div>
                        <span className="text-[9px] text-zinc-700 font-bold">•</span>
                        <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">
                          {selectedContribution.type}
                        </span>
                      </div>

                      {/* Content branch preview if linked */}
                      {selectedContribution.connections.length > 0 && (
                        <div className="p-2 px-3 rounded-lg bg-zinc-900/60 border border-zinc-800/40 text-[10px] text-zinc-400 flex items-center gap-2">
                          <CornerDownRight className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                          <span className="truncate">Branches onto another contributor\'s blueprint</span>
                        </div>
                      )}

                      {/* Question type format */}
                      {selectedContribution.type === 'question' && (
                        <div className="space-y-1.5 p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5">
                          <h5 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>{selectedContribution.questionTitle || 'Deep Inquiry'}</span>
                          </h5>
                          <p className="text-xs text-zinc-200 leading-relaxed italic font-light">
                            {selectedContribution.content}
                          </p>
                        </div>
                      )}

                      {/* Reflection type format */}
                      {selectedContribution.type === 'text' && (
                        <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                          {selectedContribution.content}
                        </p>
                      )}

                      {/* Visual type format */}
                      {selectedContribution.type === 'image' && (
                        <div className="space-y-2">
                          <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-900">
                            <img
                              src={selectedContribution.mediaUrl}
                              alt="Visual expression"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                            {selectedContribution.content}
                          </p>
                        </div>
                      )}

                      {/* Audio type format */}
                      {selectedContribution.type === 'audio' && (
                        <div className="space-y-3">
                          <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                            {selectedContribution.content}
                          </p>
                          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/60 flex items-center justify-between gap-4">
                            <button
                              onClick={(e) => toggleAudio(selectedContribution.id, e)}
                              className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-white shrink-0 shadow-md cursor-pointer"
                            >
                              {playingAudioId === selectedContribution.id ? (
                                <Pause className="w-4 h-4 fill-white text-white" />
                              ) : (
                                <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
                              )}
                            </button>

                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center justify-between text-[9px] text-zinc-500 font-bold">
                                <span>Voice Reflection</span>
                                <span>{selectedContribution.audioDuration || '0:45'}</span>
                              </div>
                              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden relative">
                                <motion.div
                                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-violet-500 to-rose-500"
                                  style={{
                                    width: playingAudioId === selectedContribution.id ? `${audioPlaybackProgress}%` : '0%'
                                  }}
                                  transition={{ ease: 'linear' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Triggers footer */}
                      <div className="pt-3.5 border-t border-zinc-900 flex items-center justify-between">
                        <button
                          onClick={() => onBuildOnContribution(selectedContribution)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600/10 to-rose-500/10 border border-violet-500/20 text-zinc-200 text-[11px] font-bold hover:from-violet-600/20 hover:to-rose-500/20 flex items-center gap-1.5 cursor-pointer"
                        >
                          <CornerDownRight className="w-3.5 h-3.5 text-rose-400" />
                          <span>Build on this node</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleSavePerspective(selectedContribution.id, e)}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Save perspective"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${savedContributionIds.includes(selectedContribution.id) ? 'fill-rose-400 text-rose-400' : ''}`} />
                          </button>
                          <button
                            onClick={handleShareContribution}
                            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer"
                            title="Branch link"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Initial unselected state overlay inside box */
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <Orbit className="w-10 h-10 text-zinc-800 animate-pulse mb-3" />
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">No Node Focused</h4>
                    <p className="text-[11px] text-zinc-600 max-w-xs mt-1 leading-relaxed">
                      Select any constellation coordinate point floating in the sky above to expand its human perspective.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* EDITORIAL COLLAGE / ASYMMETRIC GRID VIEW (Highly mobile responsive) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaceContributions.map((node, idx) => {
              const isSaved = savedContributionIds.includes(node.id);
              return (
                <motion.div
                  key={node.id}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all duration-300 relative group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <div className="space-y-4">
                    {/* Author header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={node.author.avatar}
                          alt={node.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-zinc-900"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-[11px] font-bold text-zinc-200 leading-none">{node.author.name}</h4>
                          <span className="text-[9px] text-zinc-500">{node.author.role || 'Contributor'}</span>
                        </div>
                      </div>
                      
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-800/40 px-2 py-0.5 rounded-full">
                        {node.type}
                      </span>
                    </div>

                    {/* Question Content layout */}
                    {node.type === 'question' && (
                      <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" />
                          <span>{node.questionTitle || 'Deep Query'}</span>
                        </span>
                        <p className="text-xs text-zinc-200 leading-relaxed font-light italic">
                          {node.content}
                        </p>
                      </div>
                    )}

                    {/* Standard text reflection layout */}
                    {node.type === 'text' && (
                      <p className="text-xs text-zinc-300 leading-relaxed font-light">
                        {node.content}
                      </p>
                    )}

                    {/* Image visual layout */}
                    {node.type === 'image' && (
                      <div className="space-y-2">
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900">
                          <img
                            src={node.mediaUrl}
                            alt="Visual expression"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <p className="text-xs text-zinc-400 italic font-light leading-relaxed">
                          {node.content}
                        </p>
                      </div>
                    )}

                    {/* Audio note layout */}
                    {node.type === 'audio' && (
                      <div className="space-y-3">
                        <p className="text-xs text-zinc-400 italic font-light leading-relaxed">
                          {node.content}
                        </p>
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/40 flex items-center gap-3">
                          <button
                            onClick={(e) => toggleAudio(node.id, e)}
                            className="w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-white shrink-0 cursor-pointer shadow-md"
                          >
                            {playingAudioId === node.id ? (
                              <Pause className="w-3.5 h-3.5 fill-white text-white" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-zinc-300 font-bold block truncate">Voice thought</span>
                            <div className="h-1 bg-zinc-800 rounded-full mt-1.5 overflow-hidden relative">
                              <motion.div
                                className="absolute left-0 top-0 bottom-0 bg-violet-400"
                                style={{
                                  width: playingAudioId === node.id ? `${audioPlaybackProgress}%` : '0%'
                                }}
                                transition={{ ease: 'linear' }}
                              />
                            </div>
                          </div>
                          <span className="text-[9px] text-zinc-500 font-medium whitespace-nowrap">{node.audioDuration || '0:20'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                    <button
                      onClick={() => onBuildOnContribution(node)}
                      className="text-[10px] text-zinc-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
                    >
                      <CornerDownRight className="w-3 h-3 text-violet-400" />
                      <span>Branch onto this</span>
                    </button>

                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleSavePerspective(node.id, e)}
                        className="p-1.5 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Save perspective"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400 text-rose-400' : ''}`} />
                      </button>
                      <button
                        onClick={handleShareContribution}
                        className="p-1.5 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer"
                        title="Branch link"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

// SVG XIcon locally declaration for consistency
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
