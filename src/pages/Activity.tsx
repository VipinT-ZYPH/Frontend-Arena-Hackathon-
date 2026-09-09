import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, HelpCircle, Layers, Sparkles, UserPlus, Check, Clock, ChevronRight, Inbox } from 'lucide-react';
import { ActivityNotification } from '../types';

interface ActivityProps {
  notifications: ActivityNotification[];
  onSelectSpace: (spaceId: string) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export const Activity: React.FC<ActivityProps> = ({
  notifications,
  onSelectSpace,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.isRead;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'inspired_question':
        return <HelpCircle className="w-4 h-4 text-amber-400" />;
      case 'contribution_added':
        return <Layers className="w-4 h-4 text-rose-400" />;
      case 'space_evolving':
        return <Sparkles className="w-4 h-4 text-violet-400" />;
      default:
        return <UserPlus className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'inspired_question':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'contribution_added':
        return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
      case 'space_evolving':
        return 'bg-violet-500/10 border-violet-500/20 text-violet-400';
      default:
        return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';
    }
  };

  const handleNotificationClick = (notif: ActivityNotification) => {
    onMarkAsRead(notif.id);
    onSelectSpace(notif.spaceId);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 pb-24 md:pl-64">
      {/* Header */}
      <header className="border-b border-[#1f1f23]/40 px-6 sm:px-10 py-8 bg-[#070709]/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Synergy Stream</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1 font-light">
              Witness how your contributions branch, interlock, and spark ideas in other contributors.
            </p>
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white font-bold bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
          >
            Mark all read
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-8 space-y-6">
        {/* Toggle Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-zinc-900 text-white border border-zinc-800'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all relative cursor-pointer ${
              filter === 'unread'
                ? 'bg-zinc-900 text-white border border-zinc-800'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span>Unread</span>
            {notifications.some(n => !n.isRead) && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
            )}
          </button>
        </div>

        {/* Notifications list */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notif, idx) => (
              <motion.div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative group ${
                  notif.isRead
                    ? 'bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-950/80'
                    : 'bg-zinc-900/40 border-violet-500/15 text-zinc-100 hover:bg-zinc-900/60 shadow-[0_0_15px_-3px_rgba(139,92,246,0.03)]'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                {/* Active unread neon dot */}
                {!notif.isRead && (
                  <span className="absolute top-6 left-2 w-1.5 h-1.5 bg-violet-400 rounded-full" />
                )}

                {/* Avatar or custom type visual box */}
                {notif.user ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-850 shrink-0 relative">
                    <img
                      src={notif.user.avatar}
                      alt={notif.user.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border border-zinc-950 bg-zinc-900`}>
                      {getIcon(notif.type)}
                    </div>
                  </div>
                ) : (
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${getBadgeStyle(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>
                )}

                {/* Main message content */}
                <div className="flex-1 space-y-1.5 min-w-0 pr-4">
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-2.5 text-[10px] text-zinc-500">
                    <span className="font-bold text-zinc-400 uppercase tracking-widest">{notif.spaceTitle}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{idx === 0 ? 'Recently' : idx === 1 ? '3 hours ago' : 'Yesterday'}</span>
                    </span>
                  </div>
                </div>

                {/* Navigate trigger arrow */}
                <div className="self-center text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="py-20 rounded-3xl bg-zinc-900/10 border border-zinc-900/60 flex flex-col items-center justify-center text-center p-8 space-y-3">
            <Inbox className="w-10 h-10 text-zinc-800" />
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Synergy Stream is quiet</h3>
              <p className="text-[10px] text-zinc-500 max-w-xs mt-1 leading-relaxed">
                As other minds discover your Spaces and contribute visual or sonic threads, updates will ripple here.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
