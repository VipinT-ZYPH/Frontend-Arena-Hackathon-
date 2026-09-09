import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Compass, ShieldAlert } from 'lucide-react';

interface WelcomeProps {
  onEnter: () => void;
}

const FLOATING_PERSPECTIVES = [
  {
    text: "“Home is the sound of pressure cookers in the evening, echoing down the courtyard.”",
    author: "Elena R.",
    role: "Scent Architect",
    theme: "from-rose-500/10 via-rose-950/20 to-neutral-900/30",
    border: "border-rose-500/20 text-rose-300",
    delay: 0,
    x: "left-6 sm:left-12",
    y: "top-20 sm:top-28"
  },
  {
    text: "“Propagating jade leaves. Roots sprouting out of a dry stem. Growth from isolation.”",
    author: "Naomi W.",
    role: "Botanist",
    theme: "from-cyan-500/10 via-cyan-950/20 to-neutral-900/30",
    border: "border-cyan-500/20 text-cyan-300",
    delay: 1.5,
    x: "right-4 sm:right-16",
    y: "top-32 sm:top-40"
  },
  {
    text: "“ Kyoto downpour. We stood under lantern eaves for 40 minutes in perfect silence. ”",
    author: "Liam N.",
    role: "Traveler",
    theme: "from-violet-500/10 via-violet-950/20 to-neutral-900/30",
    border: "border-violet-500/20 text-violet-300",
    delay: 3,
    x: "left-10 sm:left-32",
    y: "bottom-16 sm:bottom-24"
  }
];

export const Welcome: React.FC<WelcomeProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 flex flex-col items-center justify-center relative overflow-hidden px-6 py-12 md:pl-2">
      {/* Immersive Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-violet-600/10 blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-rose-500/10 blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-cyan-500/5 blur-[90px] sm:blur-[150px] pointer-events-none" />

      {/* Grid Pattern overlay with low opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2330_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating interactive elements */}
      {FLOATING_PERSPECTIVES.map((card, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${card.x} ${card.y} max-w-[240px] sm:max-w-xs p-5 rounded-2xl border ${card.border} bg-gradient-to-br ${card.theme} backdrop-blur-sm shadow-xl hidden md:block select-none`}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: [0.7, 0.9, 0.7],
            y: [-12, 12, -12],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 7 + idx * 2,
              ease: "easeInOut",
            },
            opacity: {
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            },
            duration: 1,
            delay: card.delay,
          }}
        >
          <p className="text-xs italic leading-relaxed text-zinc-300 font-medium">
            {card.text}
          </p>
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/40">
            <div className="text-[10px] text-zinc-400 font-semibold">{card.author}</div>
            <span className="text-[9px] text-zinc-600 font-bold">•</span>
            <div className="text-[9px] text-zinc-500 font-medium">{card.role}</div>
          </div>
        </motion.div>
      ))}

      {/* Center content */}
      <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center">
        {/* Hackathon Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md mb-8 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin duration-[5000ms]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
            REIMAGINE SOCIAL — HACKATHON PROTO
          </span>
        </motion.div>

        {/* Big Premium Logo & Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-400 flex items-center justify-center shadow-2xl shadow-violet-500/25 mb-4">
            <span className="text-white font-bold text-3xl tracking-widest">E</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-display">
            Echo
          </h2>
          <span className="text-xs uppercase tracking-[0.35em] text-zinc-500 font-semibold mt-2 block">
            The Shared Experience Fabric
          </span>
        </motion.div>

        {/* Tagline & Pitch */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl sm:text-2xl font-bold text-zinc-300 mb-4 max-w-lg leading-snug"
        >
          Every perspective adds something.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-10 text-zinc-400/90 font-light"
        >
          Traditional social networks trade in feeds, likes, and followers. Echo is different. It is a shared ecosystem of joint experiences. Explore interactive Spaces, add your voice node, and watch collective concepts evolve.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm sm:max-w-none justify-center"
        >
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-violet-500/20 transition-all duration-300 active:scale-98 cursor-pointer group"
          >
            <span>Enter Echo Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 text-zinc-300 hover:text-zinc-100 border border-zinc-800/80 font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore as Guest</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative prompt ticker at the bottom */}
      <div className="absolute bottom-6 left-0 right-0 overflow-hidden opacity-30 select-none pointer-events-none hidden sm:block">
        <div className="flex gap-12 text-[10px] tracking-widest uppercase font-bold text-zinc-600 whitespace-nowrap animate-marquee">
          <span>WHAT DOES HOME FEEL LIKE?</span>
          <span>•</span>
          <span>SHOW US YOUR CURRENT OBSESSION</span>
          <span>•</span>
          <span>WHAT ARE YOU LEARNING RIGHT NOW?</span>
          <span>•</span>
          <span>A MEMORY THAT STILL FEELS REAL</span>
          <span>•</span>
          <span>BUILD SOMETHING TOGETHER</span>
          <span>•</span>
          <span>WHAT DOES HOME FEEL LIKE?</span>
        </div>
      </div>
    </div>
  );
};
