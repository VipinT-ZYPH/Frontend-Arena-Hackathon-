import { Space, Contribution, ActivityNotification } from '../types';

export const INITIAL_SPACES: Space[] = [
  {
    id: 'space-home',
    title: 'What does home feel like to you?',
    prompt: 'Home is not always a grid coordinate. Define the texture, the sound, or the absence of it.',
    description: 'A collective canvas exploring the feeling of belonging. Contributions are mapped spatially based on their emotional temperature—from cozy and internal to vast and memories-at-a-distance.',
    type: 'experience',
    contributionsCount: 128,
    contributorsCount: 23,
    visualTheme: {
      bgGradient: 'from-[#1a1215] via-[#120f12] to-[#0a090b]',
      accentColor: 'text-rose-400',
      glowColor: 'shadow-[0_0_40px_-5px_rgba(251,113,133,0.15)]',
      borderColor: 'border-rose-500/20',
      particleColor: 'bg-rose-400/30'
    },
    isActive: true,
    createdAt: '2026-08-15T12:00:00Z'
  },
  {
    id: 'space-obsession',
    title: 'Show us your current obsession',
    prompt: 'The rabbit holes you are down at 3:00 AM. No justification, just pure fascination.',
    description: 'A chaotic, brilliant intersection of hyper-fixations. Share your current research docs, hobby setups, obscure genre folders, or collections of physical relics.',
    type: 'challenge',
    contributionsCount: 64,
    contributorsCount: 12,
    visualTheme: {
      bgGradient: 'from-[#0d1c24] via-[#091218] to-[#05090d]',
      accentColor: 'text-cyan-400',
      glowColor: 'shadow-[0_0_40px_-5px_rgba(34,211,238,0.15)]',
      borderColor: 'border-cyan-500/20',
      particleColor: 'bg-cyan-400/30'
    },
    isActive: true,
    createdAt: '2026-08-20T14:30:00Z'
  },
  {
    id: 'space-learning',
    title: 'What are you learning right now?',
    prompt: 'Not for a certificate. For the joy of breaking things and putting them back together.',
    description: 'A growing graph of failures, breakthroughs, and cognitive struggles. Build confidence by showing your clumsy first drafts and early code spikes.',
    type: 'question',
    contributionsCount: 91,
    contributorsCount: 18,
    visualTheme: {
      bgGradient: 'from-[#1c142c] via-[#100b1a] to-[#07050d]',
      accentColor: 'text-violet-400',
      glowColor: 'shadow-[0_0_40px_-5px_rgba(167,139,250,0.15)]',
      borderColor: 'border-violet-500/20',
      particleColor: 'bg-violet-400/30'
    },
    isActive: true,
    createdAt: '2026-08-25T09:15:00Z'
  },
  {
    id: 'space-memory',
    title: 'A memory that still feels real',
    prompt: 'A specific moment frozen in high fidelity. The lighting, the smell of rain, the words unsaid.',
    description: 'A quiet archive of critical turning points, sensory flashbacks, and ephemeral dialogues. Contributors share moments where time stood entirely still.',
    type: 'experience',
    contributionsCount: 47,
    contributorsCount: 15,
    visualTheme: {
      bgGradient: 'from-[#1d1b15] via-[#11100c] to-[#0a0907]',
      accentColor: 'text-amber-400',
      glowColor: 'shadow-[0_0_40px_-5px_rgba(251,191,36,0.15)]',
      borderColor: 'border-amber-500/20',
      particleColor: 'bg-amber-400/30'
    },
    isActive: false,
    createdAt: '2026-08-29T18:45:00Z'
  },
  {
    id: 'space-build',
    title: 'Build something together',
    prompt: 'One sentence of code, a sketch, or a musical stem. Layer your creative DNA onto mine.',
    description: 'A cooperative sandbox where creative artifacts form a composite sculpture. Each contributor adds or modifies an aspect of the collaborative sequence.',
    type: 'collaboration',
    contributionsCount: 76,
    contributorsCount: 21,
    visualTheme: {
      bgGradient: 'from-[#112219] via-[#091410] to-[#050a08]',
      accentColor: 'text-emerald-400',
      glowColor: 'shadow-[0_0_40px_-5px_rgba(52,211,153,0.15)]',
      borderColor: 'border-emerald-500/20',
      particleColor: 'bg-emerald-400/30'
    },
    isActive: true,
    createdAt: '2026-09-01T11:00:00Z'
  }
];

export const INITIAL_CONTRIBUTIONS: Contribution[] = [
  // --- SPACE: HOME ---
  {
    id: 'c-home-1',
    spaceId: 'space-home',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Scent Architect'
    },
    type: 'text',
    content: 'Home is the exact sound of pressure cookers whistling in the evening, echoing down the apartment shaft while the smell of roasting cumin drifts through the ventilation grill.',
    createdAt: '2026-09-02T10:15:00Z',
    likesSimulated: 18,
    connections: [],
    position: { x: 22, y: 18, scale: 1.1 }
  },
  {
    id: 'c-home-2',
    spaceId: 'space-home',
    author: {
      name: 'Devon Carter',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Writer'
    },
    type: 'text',
    content: 'For me, home is the sacred place where I don’t have to explain my silence. I can walk into a room and just exist as an unpolished fragment.',
    createdAt: '2026-09-03T14:20:00Z',
    likesSimulated: 34,
    connections: ['c-home-1'],
    position: { x: 50, y: 25, scale: 1.0 }
  },
  {
    id: 'c-home-3',
    spaceId: 'space-home',
    author: {
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Architect'
    },
    type: 'image',
    content: 'The afternoon light hitting the peeling teal wallpaper of my grandmother’s kitchen. It’s imperfect, fading, yet completely immovable in my mind.',
    mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-04T08:12:00Z',
    likesSimulated: 29,
    connections: ['c-home-2'],
    position: { x: 78, y: 15, scale: 1.2 }
  },
  {
    id: 'c-home-4',
    spaceId: 'space-home',
    author: {
      name: 'Kofi Ansah',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'Sound Artist'
    },
    type: 'audio',
    content: 'A 20-second loop of dry eucalyptus leaves scratching against a metal roof during the Santa Ana winds.',
    audioDuration: '0:20',
    createdAt: '2026-09-05T19:30:00Z',
    likesSimulated: 12,
    connections: [],
    position: { x: 15, y: 55, scale: 0.95 }
  },
  {
    id: 'c-home-5',
    spaceId: 'space-home',
    author: {
      name: 'Aron Finch',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      role: 'Therapist'
    },
    type: 'question',
    content: 'Is home a memory we look back at, or is it a space we are actively building for a future self we haven’t met yet?',
    questionTitle: 'A Question of Time',
    createdAt: '2026-09-06T11:45:00Z',
    likesSimulated: 42,
    connections: ['c-home-2'],
    position: { x: 45, y: 65, scale: 1.15 }
  },
  {
    id: 'c-home-6',
    spaceId: 'space-home',
    author: {
      name: 'Chloe Dubois',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      role: 'Videographer'
    },
    type: 'video',
    content: 'A short loop capturing steam rising from rain hitting hot summer asphalt. The physical sensation of an urban sanctuary.',
    mediaUrl: 'https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-06T15:00:00Z',
    likesSimulated: 25,
    connections: ['c-home-4'],
    position: { x: 74, y: 52, scale: 1.0 }
  },

  // --- SPACE: OBSESSION ---
  {
    id: 'c-obs-1',
    spaceId: 'space-obsession',
    author: {
      name: 'Siddharth Mehta',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      role: 'Analog Enthusiast'
    },
    type: 'image',
    content: 'My collection of completely mechanical pocket watches from the early 1900s. No batteries, just tiny brass hearts ticking away at 18,000 beats per hour.',
    mediaUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-03T16:00:00Z',
    likesSimulated: 38,
    connections: [],
    position: { x: 20, y: 20, scale: 1.15 }
  },
  {
    id: 'c-obs-2',
    spaceId: 'space-obsession',
    author: {
      name: 'Lola Reinhardt',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      role: 'Fungi Forager'
    },
    type: 'text',
    content: 'I have been studying the bioluminescent properties of Panellus stipticus. They grow on decaying hardwood and glow with an eerie, steady green light. I am currently trying to cultivate them in a terrarium on my bookshelf.',
    createdAt: '2026-09-04T22:15:00Z',
    likesSimulated: 51,
    connections: [],
    position: { x: 55, y: 15, scale: 1.05 }
  },
  {
    id: 'c-obs-3',
    spaceId: 'space-obsession',
    author: {
      name: 'Kai Chen',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80',
      role: 'Synthesizer Maker'
    },
    type: 'audio',
    content: 'Capturing the electromagnetic hum of an old CRT television using a hand-wound induction coil microphone, fed through an analog chorus pedal.',
    audioDuration: '1:10',
    createdAt: '2026-09-05T02:40:00Z',
    likesSimulated: 22,
    connections: ['c-obs-1'],
    position: { x: 78, y: 45, scale: 0.9 }
  },
  {
    id: 'c-obs-4',
    spaceId: 'space-obsession',
    author: {
      name: 'Siddharth Mehta',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      role: 'Analog Enthusiast'
    },
    type: 'question',
    content: 'Why does analog machinery feel more human? Is it because we can visualize its failure point, unlike a silent chip?',
    questionTitle: 'Visible Failure vs Silent Defect',
    createdAt: '2026-09-05T18:00:00Z',
    likesSimulated: 19,
    connections: ['c-obs-1', 'c-obs-3'],
    position: { x: 38, y: 60, scale: 1.1 }
  },

  // --- SPACE: LEARNING ---
  {
    id: 'c-learn-1',
    spaceId: 'space-learning',
    author: {
      name: 'Amara Okafor',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80',
      role: 'Frontend Novice'
    },
    type: 'text',
    content: 'I’m learning Flutter, and I finally built my first working app. It is a simple tool to record sound, but getting the state to update without redrawing the entire screen felt like magic.',
    createdAt: '2026-09-04T11:00:00Z',
    likesSimulated: 45,
    connections: [],
    position: { x: 25, y: 25, scale: 1.1 }
  },
  {
    id: 'c-learn-2',
    spaceId: 'space-learning',
    author: {
      name: 'Marcus Vane',
      avatar: 'https://images.unsplash.com/photo-1527983359383-4758693f760c?auto=format&fit=crop&w=150&q=80',
      role: 'Tinkerer'
    },
    type: 'text',
    content: 'I’m learning to carve spoons from fresh birch. I cut myself three times this week, but there’s a quiet meditation in understanding the grain of wood and letting the fiber dictate the curvature.',
    createdAt: '2026-09-05T10:00:00Z',
    likesSimulated: 32,
    connections: [],
    position: { x: 60, y: 35, scale: 1.0 }
  },
  {
    id: 'c-learn-3',
    spaceId: 'space-learning',
    author: {
      name: 'Naomi West',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=150&q=80',
      role: 'Hobby Botanist'
    },
    type: 'image',
    content: 'Propagating jade leaves. Look at these microscopic pink roots sprouting out of a completely dry leaf. It defies common logic—growth from a place of isolation.',
    mediaUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-06T09:30:00Z',
    likesSimulated: 27,
    connections: ['c-learn-2'],
    position: { x: 45, y: 68, scale: 1.15 }
  },

  // --- SPACE: MEMORY ---
  {
    id: 'c-mem-1',
    spaceId: 'space-memory',
    author: {
      name: 'Liam Neeson Jr.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      role: 'Nostalgic'
    },
    type: 'text',
    content: 'August 2018. A sudden downpour in Kyoto. We ran under the low overhang of a closed paper-lantern shop. We didn’t speak for forty minutes, just watching the water splash off the moss on the cobblestones.',
    createdAt: '2026-09-02T18:00:00Z',
    likesSimulated: 41,
    connections: [],
    position: { x: 30, y: 30, scale: 1.1 }
  },
  {
    id: 'c-mem-2',
    spaceId: 'space-memory',
    author: {
      name: 'Clara Oswald',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      role: 'Time Traveler'
    },
    type: 'image',
    content: 'An old train ticket I found in a winter coat pocket. Venice to Vienna, dated November 2021. The ink is mostly gone, but I can still taste the cold, bitter espresso from the platform vending machine.',
    mediaUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-04T12:00:00Z',
    likesSimulated: 49,
    connections: ['c-mem-1'],
    position: { x: 65, y: 45, scale: 1.05 }
  },

  // --- SPACE: BUILD ---
  {
    id: 'c-build-1',
    spaceId: 'space-build',
    author: {
      name: 'Yuki Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Creative Coder'
    },
    type: 'text',
    content: 'Starting a digital sculpture with simple pure math: `x = sin(y) * noise(time)`. Let us shape a virtual ribbon that fluctuates with human interaction.',
    createdAt: '2026-09-05T14:00:00Z',
    likesSimulated: 15,
    connections: [],
    position: { x: 25, y: 25, scale: 1.05 }
  },
  {
    id: 'c-build-2',
    spaceId: 'space-build',
    author: {
      name: 'Carlos Santana',
      avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=150&q=80',
      role: 'Sound Architect'
    },
    type: 'audio',
    content: 'Layering a deep sub-bass drone matching Yuki’s formula cycle. The frequency moves from 40Hz to 65Hz as the noise variable peaks.',
    audioDuration: '0:30',
    createdAt: '2026-09-05T20:15:00Z',
    likesSimulated: 28,
    connections: ['c-build-1'],
    position: { x: 60, y: 35, scale: 1.1 }
  },
  {
    id: 'c-build-3',
    spaceId: 'space-build',
    author: {
      name: 'Zephyr Bloom',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      role: 'Visualizer'
    },
    type: 'image',
    content: 'Rendered Yuki\'s ribbon with Carlos\'s bass frequencies as displacement maps. The geometry feels organic now, like a floating silver jellyfish.',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-09-06T11:00:00Z',
    likesSimulated: 35,
    connections: ['c-build-1', 'c-build-2'],
    position: { x: 45, y: 65, scale: 1.15 }
  }
];

export const INITIAL_NOTIFICATIONS: ActivityNotification[] = [
  {
    id: 'act-1',
    type: 'inspired_question',
    user: {
      name: 'Clara Oswald',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
    },
    spaceTitle: 'What does home feel like to you?',
    spaceId: 'space-home',
    message: 'Your perspective on sensory flashbacks inspired Clara to ask: "Is home a physical constant or a mental anchor?"',
    createdAt: '2026-09-06T16:45:00Z',
    isRead: false
  },
  {
    id: 'act-2',
    type: 'contribution_added',
    user: {
      name: 'Yuki Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    spaceTitle: 'Build something together',
    spaceId: 'space-build',
    message: 'Yuki Sato connected a new mathematical ribbon model directly onto your audio synthesis blueprint.',
    createdAt: '2026-09-06T14:20:00Z',
    isRead: false
  },
  {
    id: 'act-3',
    type: 'space_evolving',
    spaceTitle: 'What are you learning right now?',
    spaceId: 'space-learning',
    message: 'The Learning Space has reached a new synergy with 18 contributors establishing three core clusters of creative craft.',
    createdAt: '2026-09-05T11:00:00Z',
    isRead: true
  },
  {
    id: 'act-4',
    type: 'invitation',
    user: {
      name: 'Siddharth Mehta',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
    },
    spaceTitle: 'Show us your current obsession',
    spaceId: 'space-obsession',
    message: 'Siddharth invited you to explore their mechanical pocket watches collection and add your mechanical curiosity.',
    createdAt: '2026-09-04T09:30:00Z',
    isRead: true
  }
];

export const INITIAL_USER_STATE = {
  savedSpaceIds: ['space-home', 'space-learning'],
  savedContributionIds: ['c-home-3', 'c-obs-2'],
  contributedSpaceIds: ['space-home', 'space-build'],
  interests: ['Generative Art', 'Acoustic Ecologies', 'Folk Woodwork', 'Cognitive Overlaps']
};
