/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Welcome } from './pages/Welcome';
import { Discover } from './pages/Discover';
import { SpaceDetail } from './pages/SpaceDetail';
import { MyEcho } from './pages/MyEcho';
import { Activity } from './pages/Activity';
import { Navigation } from './components/Navigation';
import { CreateSpaceModal } from './components/CreateSpaceModal';
import { AddContributionModal } from './components/AddContributionModal';

import { Space, Contribution, ActivityNotification } from './types';
import {
  INITIAL_SPACES,
  INITIAL_CONTRIBUTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER_STATE,
} from './data/mockData';

export default function App() {
  // Navigation / Router State
  const [activeScreen, setActiveScreen] = useState<'welcome' | 'discover' | 'space-detail' | 'my-echo' | 'activity'>('welcome');
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);

  // App Core Data with persistence support
  const [spaces, setSpaces] = useState<Space[]>(() => {
    const saved = localStorage.getItem('echo_spaces');
    return saved ? JSON.parse(saved) : INITIAL_SPACES;
  });

  const [contributions, setContributions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem('echo_contributions');
    return saved ? JSON.parse(saved) : INITIAL_CONTRIBUTIONS;
  });

  const [notifications, setNotifications] = useState<ActivityNotification[]>(() => {
    const saved = localStorage.getItem('echo_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // User Library & Preferences state
  const [savedSpaceIds, setSavedSpaceIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('echo_saved_space_ids');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE.savedSpaceIds;
  });

  const [savedContributionIds, setSavedContributionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('echo_saved_contrib_ids');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE.savedContributionIds;
  });

  const [interests, setInterests] = useState<string[]>(INITIAL_USER_STATE.interests);

  // Modals visibilities
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [isAddContributionOpen, setIsAddContributionOpen] = useState(false);
  const [parentBranchContribution, setParentBranchContribution] = useState<Contribution | null>(null);

  // Save to Local Storage on updates
  useEffect(() => {
    localStorage.setItem('echo_spaces', JSON.stringify(spaces));
  }, [spaces]);

  useEffect(() => {
    localStorage.setItem('echo_contributions', JSON.stringify(contributions));
  }, [contributions]);

  useEffect(() => {
    localStorage.setItem('echo_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('echo_saved_space_ids', JSON.stringify(savedSpaceIds));
  }, [savedSpaceIds]);

  useEffect(() => {
    localStorage.setItem('echo_saved_contrib_ids', JSON.stringify(savedContributionIds));
  }, [savedContributionIds]);

  const activeSpace = spaces.find((s) => s.id === selectedSpaceId) || null;
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  // Navigation handlers
  const handleNavigate = (screen: typeof activeScreen) => {
    setActiveScreen(screen);
    if (screen !== 'space-detail') {
      setSelectedSpaceId(null);
    }
  };

  const handleSelectSpace = (spaceId: string) => {
    setSelectedSpaceId(spaceId);
    setActiveScreen('space-detail');
  };

  // State modification handlers
  const handleJoinSpace = (spaceId: string) => {
    setSavedSpaceIds((prev) => {
      const exists = prev.includes(spaceId);
      const updated = exists ? prev.filter((id) => id !== spaceId) : [...prev, spaceId];

      // Update contributors count locally for demo
      setSpaces((currentSpaces) =>
        currentSpaces.map((s) => {
          if (s.id === spaceId) {
            return {
              ...s,
              contributorsCount: exists ? s.contributorsCount - 1 : s.contributorsCount + 1,
            };
          }
          return s;
        })
      );

      return updated;
    });
  };

  const handleSaveContribution = (contribId: string) => {
    setSavedContributionIds((prev) =>
      prev.includes(contribId) ? prev.filter((id) => id !== contribId) : [...prev, contribId]
    );
  };

  const handleRemoveSavedContributionFromMyEcho = (contribId: string) => {
    setSavedContributionIds((prev) => prev.filter((id) => id !== contribId));
  };

  const handlePublishSpace = (newSpace: Space) => {
    setSpaces((prev) => [newSpace, ...prev]);
    // Navigate immediately to discover to see it appear
    setActiveScreen('discover');
  };

  const handleAddContribution = (newContrib: Contribution) => {
    setContributions((prev) => [newContrib, ...prev]);

    // Update specific Space contribution and contributor metrics
    setSpaces((currentSpaces) =>
      currentSpaces.map((s) => {
        if (s.id === newContrib.spaceId) {
          const contributedBefore = contributions.some(
            (c) => c.spaceId === newContrib.spaceId && c.author.name === 'Vipin T.'
          );
          return {
            ...s,
            contributionsCount: s.contributionsCount + 1,
            contributorsCount: contributedBefore ? s.contributorsCount : s.contributorsCount + 1,
          };
        }
        return s;
      })
    );

    // Dynamic co-evolution scheduling simulation
    // Simulates another participant responding to your voice or reflection node in real-time
    setTimeout(() => {
      const spaceToEvolve = spaces.find((s) => s.id === newContrib.spaceId);
      if (!spaceToEvolve) return;

      const responses = [
        `Yuki Sato joined the prompt on "${spaceToEvolve.title}" and connected a visual abstract rendering branch onto your latest node.`,
        `Amara Okafor built directly on your reflection. "This captures exactly why I am learning code," they remarked.`,
        `Marcus Vane left an acoustic recording stemming from your question on "${spaceToEvolve.title}".`
      ];

      const chosenResponse = responses[Math.floor(Math.random() * responses.length)];

      const newNotification: ActivityNotification = {
        id: `act-sim-${Date.now()}`,
        type: 'contribution_added',
        user: {
          name: Math.random() > 0.5 ? 'Yuki Sato' : 'Amara Okafor',
          avatar: Math.random() > 0.5 
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
            : 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80'
        },
        spaceTitle: spaceToEvolve.title,
        spaceId: spaceToEvolve.id,
        message: chosenResponse,
        createdAt: new Date().toISOString(),
        isRead: false
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Schedule minor state connection additions
      const simulatedNode: Contribution = {
        id: `c-sim-${Date.now()}`,
        spaceId: spaceToEvolve.id,
        author: {
          name: newNotification.user?.name || 'A Resonator',
          avatar: newNotification.user?.avatar || 'https://images.unsplash.com/photo-1527983359383-4758693f760c?auto=format&fit=crop&w=150&q=80',
          role: 'Co-creator'
        },
        type: Math.random() > 0.5 ? 'text' : 'image',
        content: Math.random() > 0.5 
          ? 'Deeply resonates with your perspective. The texture and sound of presence makes perfect sense.' 
          : 'A visual translation matching your exact frequency and mathematical sequence.',
        mediaUrl: Math.random() > 0.5 ? undefined : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        createdAt: new Date().toISOString(),
        connections: [newContrib.id], // Connect directly onto user's node!
        position: {
          x: Math.min(90, Math.max(10, newContrib.position.x + (Math.random() > 0.5 ? 15 : -15))),
          y: Math.min(85, Math.max(10, newContrib.position.y + (Math.random() > 0.5 ? 12 : -12))),
          scale: 1.0
        }
      };

      setContributions((prevContribs) => [simulatedNode, ...prevContribs]);
      setSpaces((prevSpaces) =>
        prevSpaces.map((s) => {
          if (s.id === spaceToEvolve.id) {
            return {
              ...s,
              contributionsCount: s.contributionsCount + 1,
              contributorsCount: s.contributorsCount + 1
            };
          }
          return s;
        })
      );
    }, 4500);
  };

  const handleMarkNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleBuildOnContributionClick = (parentContrib: Contribution) => {
    setParentBranchContribution(parentContrib);
    setIsAddContributionOpen(true);
  };

  return (
    <div className="bg-[#060608] min-h-screen text-zinc-100 selection:bg-rose-500/20 selection:text-rose-200">
      {/* Persistent Navigation (Hidden on welcome page) */}
      {activeScreen !== 'welcome' && (
        <Navigation
          activeScreen={activeScreen}
          onNavigate={handleNavigate}
          onCreateSpaceClick={() => setIsCreateSpaceOpen(true)}
          unreadCount={unreadNotificationCount}
        />
      )}

      {/* Screen Router Container with layout motion triggers */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeScreen === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Welcome onEnter={() => handleNavigate('discover')} />
            </motion.div>
          )}

          {activeScreen === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Discover
                spaces={spaces}
                onSelectSpace={handleSelectSpace}
                onCreateSpaceClick={() => setIsCreateSpaceOpen(true)}
              />
            </motion.div>
          )}

          {activeScreen === 'space-detail' && activeSpace && (
            <motion.div
              key="space-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <SpaceDetail
                space={activeSpace}
                contributions={contributions}
                savedSpaceIds={savedSpaceIds}
                savedContributionIds={savedContributionIds}
                onBack={() => handleNavigate('discover')}
                onJoinSpace={handleJoinSpace}
                onSaveContribution={handleSaveContribution}
                onAddContributionClick={() => {
                  setParentBranchContribution(null);
                  setIsAddContributionOpen(true);
                }}
                onBuildOnContribution={handleBuildOnContributionClick}
              />
            </motion.div>
          )}

          {activeScreen === 'my-echo' && (
            <motion.div
              key="my-echo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <MyEcho
                spaces={spaces}
                contributions={contributions}
                savedSpaceIds={savedSpaceIds}
                savedContributionIds={savedContributionIds}
                interests={interests}
                onSelectSpace={handleSelectSpace}
                onRemoveSavedContribution={handleRemoveSavedContributionFromMyEcho}
              />
            </motion.div>
          )}

          {activeScreen === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Activity
                notifications={notifications}
                onSelectSpace={handleSelectSpace}
                onMarkAsRead={handleMarkNotificationRead}
                onMarkAllAsRead={handleMarkAllNotificationsRead}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent App Modals */}
      <CreateSpaceModal
        isOpen={isCreateSpaceOpen}
        onClose={() => setIsCreateSpaceOpen(false)}
        onPublish={handlePublishSpace}
      />

      <AddContributionModal
        isOpen={isAddContributionOpen}
        onClose={() => {
          setIsAddContributionOpen(false);
          setParentBranchContribution(null);
        }}
        space={activeSpace}
        onAdd={handleAddContribution}
      />
    </div>
  );
}
