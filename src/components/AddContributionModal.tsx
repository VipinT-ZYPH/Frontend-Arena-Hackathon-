import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Image, Mic, Play, Square, HelpCircle, Sparkles, Check, Paperclip } from 'lucide-react';
import { Space, Contribution, ContributionType } from '../types';

interface AddContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  space: Space | null;
  onAdd: (contribution: Contribution) => void;
}

// Crated beautiful options for demo images matching the prompt
const VISUAL_THEMES = [
  { label: 'Warm Light', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rainy Night', url: 'https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Geometric', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fungi Grow', url: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cosmic Sky', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' }
];

export const AddContributionModal: React.FC<AddContributionModalProps> = ({
  isOpen,
  onClose,
  space,
  onAdd,
}) => {
  const [type, setType] = useState<ContributionType>('text');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  
  // Audio state simulation
  const [isRecording, setIsRecording] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [recordingSuccess, setRecordingSuccess] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordedDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!space) return null;

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedDuration(0);
    setRecordingSuccess(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingSuccess(true);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'text' && !content.trim()) return;
    if (type === 'image' && !selectedImage) return;
    if (type === 'question' && (!questionTitle.trim() || !content.trim())) return;
    if (type === 'audio' && !recordingSuccess && !content.trim()) return;

    // Generate random coordinate to map inside the Space Detail Screen
    const xCoord = Math.floor(Math.random() * 55) + 20; // 20% to 75%
    const yCoord = Math.floor(Math.random() * 50) + 15; // 15% to 65%

    let finalContent = content;
    let finalMediaUrl = '';

    if (type === 'image') {
      finalMediaUrl = selectedImage;
      if (!finalContent) {
        finalContent = 'A visual perspective added to the shared space.';
      }
    } else if (type === 'audio') {
      finalContent = content || 'Audio reflection. Play the sequence below.';
    } else if (type === 'video') {
      finalMediaUrl = 'https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&w=800&q=80';
      if (!finalContent) {
        finalContent = 'Cinematic memory loop capturing spatial presence.';
      }
    }

    const newContribution: Contribution = {
      id: `c-${Date.now()}`,
      spaceId: space.id,
      author: {
        name: 'Vipin T.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'Designer (You)'
      },
      type,
      content: finalContent,
      mediaUrl: finalMediaUrl || undefined,
      audioDuration: type === 'audio' ? formatDuration(recordedDuration || 45) : undefined,
      questionTitle: type === 'question' ? questionTitle : undefined,
      createdAt: new Date().toISOString(),
      likesSimulated: 0,
      connections: [],
      position: {
        x: xCoord,
        y: yCoord,
        scale: 1.1
      }
    };

    onAdd(newContribution);
    
    // Reset state
    setType('text');
    setContent('');
    setSelectedImage('');
    setQuestionTitle('');
    setIsRecording(false);
    setRecordedDuration(0);
    setRecordingSuccess(false);
    onClose();
  };

  const types = [
    { id: 'text', label: 'Reflection', icon: MessageSquare, color: 'text-rose-400' },
    { id: 'image', label: 'Visual Capture', icon: Image, color: 'text-cyan-400' },
    { id: 'audio', label: 'Voice-Note', icon: Mic, color: 'text-violet-400' },
    { id: 'question', label: 'Deep Query', icon: HelpCircle, color: 'text-amber-400' }
  ];

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
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative w-full max-w-lg bg-[#0d0d10] border border-[#1f1f23] rounded-3xl overflow-hidden shadow-2xl z-10"
          >
            {/* Gradient edge glow corresponding to space theme */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-rose-500 to-amber-400`} />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#1f1f23] px-6 py-5">
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">CONTRIBUTING PERSPECTIVE</span>
                <h3 className="text-md font-bold text-zinc-200 mt-1 truncate max-w-[280px] sm:max-w-md">
                  {space.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interaction mode selectors */}
            <div className="flex border-b border-[#1f1f23]/40 bg-zinc-950/40 p-2 gap-1 justify-around">
              {types.map((t) => {
                const Icon = t.icon;
                const isSelected = type === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id as ContributionType)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isSelected 
                        ? 'bg-zinc-900 border border-[#1f1f23] ' + t.color
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Context inputs depending on type */}
              {type === 'question' && (
                <div>
                  <label htmlFor="modal-q-title" className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                    Query Focal Point
                  </label>
                  <input
                    id="modal-q-title"
                    type="text"
                    required
                    placeholder="e.g., A Question of Belonging"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-[#1f1f23] rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                </div>
              )}

              {type !== 'image' && (
                <div>
                  <label htmlFor="modal-content" className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                    {type === 'question' ? 'The Inquiry' : 'Your reflection'}
                  </label>
                  <textarea
                    id="modal-content"
                    required={type === 'text' || type === 'question'}
                    placeholder={
                      type === 'question'
                        ? 'Formulate the exact line of thought that needs other perspectives to build on...'
                        : type === 'audio'
                        ? 'Add optional written summary or notes for your voice reflection...'
                        : 'Capture a feeling, sensory texture, or raw memory in high-fidelity thoughts...'
                    }
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-950 border border-[#1f1f23] rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-zinc-700 transition-colors resize-none leading-relaxed"
                  />
                </div>
              )}

              {/* IMAGE TYPE SPECIFIC OPTION */}
              {type === 'image' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Select Aesthetic Atmosphere
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {VISUAL_THEMES.map((theme) => {
                        const isChosen = selectedImage === theme.url;
                        return (
                          <div
                            key={theme.label}
                            onClick={() => setSelectedImage(theme.url)}
                            className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border transition-all duration-200 ${
                              isChosen ? 'border-cyan-400 scale-[0.98]' : 'border-[#1f1f23] opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={theme.url}
                              alt={theme.label}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {isChosen && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Check className="w-4 h-4 text-cyan-400" />
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 px-1">
                              <p className="text-[8px] text-center text-zinc-300 truncate font-semibold">{theme.label}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-caption" className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                      Caption or Poetic Subtext
                    </label>
                    <input
                      id="modal-caption"
                      type="text"
                      placeholder="Add a few atmospheric words about this image..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-[#1f1f23] rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-zinc-700 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* AUDIO TYPE SPECIFIC OPTION (Equalizer and record simulate) */}
              {type === 'audio' && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-[#1f1f23] flex flex-col items-center justify-center text-center space-y-4">
                  {isRecording ? (
                    <div className="space-y-3 w-full">
                      <div className="flex items-center justify-center gap-1.5 h-12">
                        {/* Animated waveform bars */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((bar) => {
                          const randDuration = Math.random() * 0.5 + 0.4;
                          return (
                            <motion.div
                              key={bar}
                              animate={{ height: [8, 38, 8] }}
                              transition={{ repeat: Infinity, duration: randDuration, ease: 'easeInOut' }}
                              className="w-1 bg-violet-400 rounded-full"
                            />
                          );
                        })}
                      </div>
                      <p className="text-xs text-rose-400 font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>Recording: {formatDuration(recordedDuration)}</span>
                      </p>
                      <button
                        type="button"
                        onClick={handleStopRecording}
                        className="mx-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-[#1f1f23] text-zinc-100 text-xs font-semibold cursor-pointer"
                      >
                        <Square className="w-3.5 h-3.5 text-zinc-100" />
                        <span>Capture Reflection</span>
                      </button>
                    </div>
                  ) : recordingSuccess ? (
                    <div className="space-y-2 w-full">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                          <Check className="w-5 h-5 text-violet-400" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-zinc-200">Voice Capture Complete</h4>
                          <p className="text-[11px] text-zinc-500">Duration recorded: {formatDuration(recordedDuration || 45)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        className="text-[10px] text-violet-400 font-semibold hover:underline"
                      >
                        Re-record voice reflection
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 py-2">
                      <p className="text-xs text-zinc-400">Speak your thoughts. Let voice timber carry the emotion.</p>
                      <button
                        type="button"
                        onClick={handleStartRecording}
                        className="mx-auto px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-2.5 shadow-lg shadow-violet-500/10 cursor-pointer transition-transform hover:scale-102"
                      >
                        <Mic className="w-4 h-4" />
                        <span>Initiate Voice Recorder</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-3 border-t border-[#1f1f23]/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Sparkles className="w-4 h-4 text-amber-500/80" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Adds to Shared Space</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs text-zinc-400 hover:text-zinc-200 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      (type === 'text' && !content.trim()) ||
                      (type === 'image' && !selectedImage) ||
                      (type === 'question' && (!questionTitle.trim() || !content.trim())) ||
                      (type === 'audio' && !recordingSuccess && !content.trim())
                    }
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-violet-500/10 cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Add to Space
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
