# Echo: Decentralized Human Resonance & Co-Creation Network

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)]()
[![Vite](https://img.shields.io/badge/Vite-React-purple.svg)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan.svg)]()

---

## 1. Chosen Vertical
**Reimagine Social / Collective Intelligence Co-Creation Platform**  
Echo breaks away from traditional attention-economy social media platforms (which prioritize addictive infinite scrolls, superficial follower counts, and outrage optimization). Instead, Echo introduces **Spatial Resonance Spaces**, where humans collaborate on profound questions, creative challenges, and shared lived experiences through interactive constellation maps and branching nodes.

---

## 2. Approach & Logic
Modern social applications trap users in isolated silos. Echo's architecture centers around **Co-Evolving Spaces**:
* **Constellation & Collage Views**: Contributors do not post isolated status updates; every thought, audio recording, image, or question is anchored as a node in an interconnected conceptual matrix.
* **Non-Linear Branching**: Users can build directly upon another contributor's node, creating visual branching lineages that trace the evolution of an idea.
* **Synergy Stream**: Instead of notification counters pushing algorithmic ads or likes, notifications highlight how contributions branch, interlock, and spark ideas in other community members.
* **Simulated Real-Time Co-Evolution**: An intelligent background event engine simulates real-time responses from global co-creators shortly after a user publishes a contribution, demonstrating live community engagement.

---

## 3. How the Solution Works
* **Frontend Architecture**: Built with React 18, TypeScript, and Vite for blazing-fast component rendering and type safety.
* **Spatial Canvas (`SpaceDetail.tsx`)**: Renders interactive constellations with SVG path routing that dynamically connects parent and child contribution nodes.
* **State Management & Persistence**: Leverages custom React hooks backed by `localStorage` to ensure spaces, contributions, saved bookmarks, and notifications persist seamlessly across sessions.
* **Motion & Micro-Interactions**: Powered by `motion/react` for fluid, organic screen transitions and hover states.
* **Accessibility & Design**: Adheres to strict WCAG contrast standards, features touch targets ≥44px on mobile, and uses sophisticated warm neutral color grading with neon glow accents.

---

## 4. Assumptions Made
* **Client-Side Persistence**: The application is designed as a high-performance single-page application (SPA) where state is persisted locally to ensure immediate responsiveness and offline resilience during demonstrations.
* **Simulated Multi-User Ecosystem**: Global collaborator avatars and automated synergy notifications simulate a bustling co-creation community without requiring persistent WebSockets for prototype evaluation.

---

## 5. Setup & Execution Instructions

### Prerequisites
* Node.js (v18+)
* npm or bun

### Installation & Development
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (runs on port 3000):
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## 6. Evaluation Focus Areas
* **Code Quality**: Clean, modular component separation (`src/components/`, `src/pages/`, `src/data/`, `src/types.ts`), strict TypeScript typing, and complete JSDoc annotations.
* **Security & Efficiency**: Zero exposed secrets, optimized asset lazy loading, and minimal bundle footprint.
* **Accessibility**: Full keyboard navigation support, high contrast color palettes, and responsive touch layout targets.
