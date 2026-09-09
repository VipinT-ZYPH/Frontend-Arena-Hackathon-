import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, Flame, Users, Leaf, ArrowRight, Check } from 'lucide-react';
import { Space, SpaceType } from '../types';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (space: Space) => void;
}

const PRESET_THEMES = [
  {
    id: 'rose',
    name: 'Cosmic Rose',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-500/20',
    particleColor: 'bg-rose-400/30',
    bgGradient: 'from-[#1a1215] via-[#120f12] to-[#0a090b]',
    glowColor: 'shadow-[0_0_40px_-5px_rgba(251,113,133,0.15)]',
    previewGradient: 'from-rose-500/30 via-neutral-900 to-neutral-950'
  },
  {
    id: 'cyan',
    name: 'Glacial Cyan',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    particleColor: 'bg-cyan-400/30',
    bgGradient: 'from-[#0d1c24] via-[#091218] to-[#05090d]',
    glowColor: 'shadow-[0_0_40px_-5px_rgba(34,211,238,0.15)]',
    previewGradient: 'from-cyan-500/30 via-neutral-900 to-neutral-950'
  },
  {
    id: 'violet',
    name: 'Deep Violet',
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    particleColor: 'bg-violet-400/30',
    bgGradient: 'from-[#1c142c] via-[#100b1a] to-[#07050d]',
    glowColor: 'shadow-[0_0_40px_-5px_rgba(167,139,250,0.15)]',
    previewGradient: 'from-violet-500/30 via-neutral-900 to-neutral-950'
  },
  {
    id: 'emerald',
    name: 'Moss Emerald',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    particleColor: 'bg-emerald-400/30',
    bgGradient: 'from-[#112219] via-[#091410] to-[#050a08]',
    glowColor: 'shadow-[0_0_40px_-5px_rgba(52,211,153,0.15)]',
    previewGradient: 'from-emerald-500/30 via-neutral-900 to-neutral-950'
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    particleColor: 'bg-amber-400/30',
    bgGradient: 'from-[#1d1b15] via-[#11100c] to-[#0a0907]',
    glowColor: 'shadow-[0_0_40px_-5px_rgba(251,191,36,0.15)]',
    previewGradient: 'from-amber-500/30 via-neutral-900 to-neutral-950'
  }
];

export const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<SpaceType>('experience');
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [selectedThemeIdx, setSelectedThemeIdx] = useState(0);

  const resetForm = () => {
    setStep(1);
    setType('experience');
    setTitle('');
    setPrompt('');
    setDescription('');
    setSelectedThemeIdx(0);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !prompt || !description) return;

    const theme = PRESET_THEMES[selectedThemeIdx];

    const newSpace: Space = {
      id: `space-${Date.now()}`,
      title,
      prompt,
      description,
      type,
      contributionsCount: 0,
      contributorsCount: 0,
      visualTheme: {
        bgGradient: theme.bgGradient,
        accentColor: theme.accentColor,
        glowColor: theme.glowColor,
        borderColor: theme.borderColor,
        particleColor: theme.particleColor,
      },
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    onPublish(newSpace);
    resetForm();
    onClose();
  };

  const typeConfig: { [key in SpaceType]: { label: string; desc: string; icon: any; color: string } } = {
    question: {
      label: 'Ask a Question',
      desc: 'Introduce a single deep query that calls for individual contemplation.',
      icon: HelpCircle,
      color: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
    },
    experience: {
      label: 'Share an Experience',
      desc: 'Create an archive centered on a specific moment, memory, or sensory texture.',
      icon: Leaf,
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
    },
    challenge: {
      label: 'Creative Challenge',
      desc: 'Prompt contributors to submit obsessions, raw sketches, or micro-projects.',
      icon: Flame,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
    },
    collaboration: {
      label: 'Build Together',
      desc: 'Unveil a cooperative sandbox where separate contributions branch and interlock.',
      icon: Users,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl bg-[#0f0f12] border border-[#1f1f23] rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1f1f23] px-8 py-5">
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Initiate a New Space</h3>
                <p className="text-xs text-zinc-500">Form a shared vessel for collaborative human perspectives</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps indicator */}
            <div className="flex items-center gap-1.5 px-8 pt-6">
              <span className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-gradient-to-r from-violet-600 to-rose-500' : 'bg-zinc-800'}`} />
              <span className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-violet-600 to-rose-500' : 'bg-zinc-800'}`} />
            </div>

            <form onSubmit={handlePublish} className="p-8">
              {step === 1 ? (
                /* STEP 1: Space Type selection */
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                      1. Choose Space Blueprint
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(Object.keys(typeConfig) as SpaceType[]).map((key) => {
                        const config = typeConfig[key];
                        const Icon = config.icon;
                        const isSelected = type === key;

                        return (
                          <div
                            key={key}
                            onClick={() => setType(key)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-3 hover:bg-zinc-900/60 ${
                              isSelected
                                ? 'bg-zinc-900/40 border-violet-500/40 shadow-lg shadow-violet-500/5'
                                : 'bg-transparent border-[#1f1f23]'
                            }`}
                          >
                            <div className={`p-2 rounded-xl border ${config.color} shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-zinc-200">{config.label}</h4>
                              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{config.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Title & Description preview */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="space-title" className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                        2. Space Title
                      </label>
                      <input
                        id="space-title"
                        type="text"
                        placeholder="e.g., Show us your current obsession"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-zinc-950 border border-[#1f1f23] rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-zinc-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (title.trim()) {
                          setStep(2);
                        }
                      }}
                      disabled={!title.trim()}
                      className="px-5 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-sm hover:bg-white active:scale-98 transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>Continue to details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2: Prompts, Description, Theme Selection */
                <div className="space-y-5">
                  <div>
                    <label htmlFor="space-prompt" className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                      3. Central Prompt Question / Statement
                    </label>
                    <input
                      id="space-prompt"
                      type="text"
                      placeholder="e.g., The rabbit holes you are down at 3:00 AM. No justification."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-950 border border-[#1f1f23] rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-zinc-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="space-desc" className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                      4. Description & Visual Guide
                    </label>
                    <textarea
                      id="space-desc"
                      placeholder="e.g., A chaotic, brilliant intersection of hyper-fixations. Share your current research, hobby setups, or files..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-950 border border-[#1f1f23] rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-zinc-700 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                      5. Choose Atmosphere Theme
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {PRESET_THEMES.map((theme, idx) => (
                        <div
                          key={theme.id}
                          onClick={() => setSelectedThemeIdx(idx)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                            selectedThemeIdx === idx
                              ? 'border-white bg-zinc-900/60 shadow-md'
                              : 'border-[#1f1f23] bg-zinc-950 hover:border-zinc-800'
                          }`}
                        >
                          {/* Circle gradient */}
                          <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${theme.previewGradient} flex items-center justify-center`}>
                            {selectedThemeIdx === idx && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <p className="text-[10px] text-center text-zinc-300 font-semibold mt-1.5 truncate">
                            {theme.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1f1f23]">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-zinc-400 hover:text-zinc-200 text-sm font-medium cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!prompt.trim() || !description.trim()}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/10 active:scale-98 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Publish Space
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
