'use client';

import React, { useState, useMemo } from 'react';
import { LayoutGrid, List, Search, Play, Pause, CheckCircle2, History, XCircle, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import type { PlayState } from '../../types/games.ts';

// Define strict types for the Game status mapping


interface Game {
  id: string;
  title: string;
  coverUrl: string;
  platform: string;
  playState: PlayState;
  completionProgress: number; // Percentage 0-100
  hoursPlayed: number;
  lastPlayed: string;
}

// Mock Data representing an owner's gaming inventory
const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077: Phantom Liberty',
    coverUrl: 'https://unsplash.com', // Replace with real asset/API links
    platform: 'PC / Steam',
    playState: 'playing',
    completionProgress: 68,
    hoursPlayed: 84,
    lastPlayed: '2 hours ago',
  },
  {
    id: '2',
    title: 'Elden Ring: Shadow of the Erdtree',
    coverUrl: 'https://unsplash.com',
    platform: 'PS5',
    playState: 'playing',
    completionProgress: 42,
    hoursPlayed: 112,
    lastPlayed: 'Yesterday',
  },
  {
    id: '3',
    title: 'Hades II',
    coverUrl: 'https://unsplash.com',
    platform: 'PC / Epic',
    playState: 'finished',
    completionProgress: 25,
    hoursPlayed: 14,
    lastPlayed: '2 weeks ago',
  },
  {
    id: '4',
    title: 'The Witcher 3: Wild Hunt',
    coverUrl: 'https://unsplash.com',
    platform: 'PC / GOG',
    playState: 'dropped',
    completionProgress: 100,
    hoursPlayed: 210,
    lastPlayed: '3 months ago',
  },
  {
    id: '5',
    title: 'Baldur\'s Gate 3',
    coverUrl: 'https://unsplash.com',
    platform: 'PS5',
    playState: 'na',
    completionProgress: 0,
    hoursPlayed: 0,
    lastPlayed: 'Never',
  },
];

// Map colors and icons structurally to State of Play categories
const STATE_CONFIG: Record<PlayState, { label: string; bg: string; text: string; dot: string; icon: React.ReactNode }> = {
  playing: { label: 'Currently Playing', bg: 'bg-violet-500/10', text: 'text-violet-400', dot: 'bg-violet-400', icon: <Play className="w-3.5 h-3.5" /> },
  backlog: { label: 'Backlog', bg: 'bg-zinc-500/10', text: 'text-zinc-400', dot: 'bg-zinc-500', icon: <History className="w-3.5 h-3.5" /> },
  paused: { label: 'On Hold', bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400', icon: <Pause className="w-3.5 h-3.5" /> },
  completed: { label: 'Completed', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  dropped: { label: 'Dropped', bg: 'bg-rose-500/10', text: 'text-rose-400', dot: 'bg-rose-400', icon: <XCircle className="w-3.5 h-3.5" /> },
  finished: { label: 'Finished', bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  na: { label: 'N/A', bg: 'bg-zinc-500/10', text: 'text-zinc-400', dot: 'bg-zinc-500', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
};

export default function AllGamesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<PlayState | 'all'>('all');

  const filteredGames = useMemo(() => {
    return MOCK_GAMES.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || game.playState === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="w-full space-y-6 text-zinc-100 p-6 bg-zinc-950 min-h-screen">
      
      {/* 2. Search & Filter Bar Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search games in your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm placeholder-zinc-500 text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
        </div>

        {/* Filtering Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/40 p-1.5 border border-zinc-800/80 rounded-xl overflow-x-auto">
          {(['all', 'playing', 'backlog', 'paused', 'completed', 'dropped', 'na', 'finished'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              {tab === 'all' ? 'All Games' : STATE_CONFIG[tab].label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Empty State Notification */}
      {filteredGames.length === 0 && (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
          <SlidersHorizontal className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
          <p className="text-zinc-400 text-xs">No games matched your active view criteria.</p>
        </div>
      )}

      {/* 4. Streamlined Stacked Rows Container */}
      {filteredGames.length > 0 && (
        <div className="border border-zinc-800 bg-zinc-900/10 rounded-xl overflow-hidden divide-y divide-zinc-800/80">
          {filteredGames.map((game) => {
            const config = STATE_CONFIG[game.playState];
            return (
              <div 
                key={game.id} 
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 hover:bg-zinc-900/40 transition-all duration-150"
              >
                {/* Left Side: Cover Art + Meta Details */}
                <div className="flex items-center gap-4 min-w-0 md:w-1/3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={game.coverUrl} 
                    alt="" 
                    className="w-11 h-14 object-cover rounded-lg bg-zinc-950 flex-shrink-0 border border-zinc-800/50" 
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-zinc-100 truncate text-sm group-hover:text-violet-400 transition">
                      {game.title}
                    </h4>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mt-0.5">{game.platform}</p>
                  </div>
                </div>

                {/* Center Left: Dynamic State Pill */}
                <div className="flex items-center md:w-1/6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-white/5 ${config.bg} ${config.text}`}>
                    {config.icon}
                    <span>{config.label}</span>
                  </span>
                </div>

                {/* Center Right: Core Progress Gauge */}
                <div className="w-full md:w-1/4 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-zinc-400 font-medium">
                    <span>Story Completion</span>
                    <span className="text-zinc-200">{game.completionProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        game.playState === 'playing' ? 'bg-violet-500' : game.playState === 'completed' ? 'bg-emerald-500' : 'bg-zinc-600'
                      }`}
                      style={{ width: `${game.completionProgress}%` }} 
                    />
                  </div>
                </div>

                {/* Right Side: Hours & Context Menu Action */}
                <div className="flex items-center justify-between md:justify-end gap-6 text-xs text-zinc-400 md:w-1/5">
                  <div className="text-left md:text-right">
                    <p><span className="text-zinc-200 font-bold">{game.hoursPlayed}</span> hrs tracked</p>
                    <p className="text-[10px] text-zinc-500">Played {game.lastPlayed}</p>
                  </div>
                  
                  <button className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-800 hover:text-zinc-100 text-zinc-400 transition shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
