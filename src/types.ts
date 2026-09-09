export type SpaceType = 'question' | 'experience' | 'challenge' | 'collaboration';

export interface Space {
  id: string;
  title: string;
  prompt: string;
  description: string;
  type: SpaceType;
  contributionsCount: number;
  contributorsCount: number;
  visualTheme: {
    bgGradient: string; // Tailwind gradient classes
    accentColor: string; // Tailwind text/border/bg classes (e.g., 'text-violet-400')
    glowColor: string; // Hex or tailwind shadow/glow classes
    borderColor: string;
    particleColor: string;
  };
  isActive: boolean;
  createdAt: string;
}

export type ContributionType = 'text' | 'image' | 'audio' | 'video' | 'question';

export interface Contribution {
  id: string;
  spaceId: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  type: ContributionType;
  content: string; // Text thought or prompt response
  mediaUrl?: string; // For images or video previews
  audioDuration?: string; // e.g., '0:45'
  questionTitle?: string; // For question-type contributions
  createdAt: string;
  likesSimulated?: number; // Representing resonance but we avoid standard like icons. We can call it 'Resonances' or 'Echoes'.
  connections: string[]; // IDs of other contributions this builds on
  // Spatial coordinates for the editorial layout
  position: {
    x: number; // percentage width (e.g. 15 to 85)
    y: number; // percentage height (e.g. 10 to 80)
    scale?: number; // depth sizing
  };
}

export interface ActivityNotification {
  id: string;
  type: 'contribution_added' | 'inspired_question' | 'space_evolving' | 'invitation';
  user?: {
    name: string;
    avatar: string;
  };
  spaceTitle: string;
  spaceId: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface UserState {
  savedSpaceIds: string[];
  savedContributionIds: string[];
  contributedSpaceIds: string[];
  interests: string[];
}
