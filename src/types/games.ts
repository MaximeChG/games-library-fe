import { CheckCircle2, Heart, History, Pause, Play, SlidersHorizontal, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PlayState =
    | 'playing'
    | 'backlog'
    | 'paused'
    | 'completed'
    | 'dropped'
    | 'finished'
    | 'na'
    | 'wishlist';

export const PLAY_STATES: PlayState[] = [
    'playing',
    'backlog',
    'paused',
    'completed',
    'dropped',
    'finished',
    'na',
    'wishlist',
];

export const playStateCompletionWeight: Record<PlayState, number> = {
    playing: 5,
    backlog: 1,
    paused: 3,
    completed: 7,
    dropped: 4,
    finished: 6,
    na: 2,
    wishlist: 0,
};

export type Interest =
    | 'must-play'
    | 'very-interested'
    | 'interested'
    | 'little-interested'
    | 'not-interested'

export type OwnedState = 'physical' | 'digital' | 'emulator' |'wishlist';

export type GameConsoles = [
    { key: 'steam', value: "Steam" },
    { key: 'epicGames', value: "Epic Games" },
    { key: 'pc', value: "PC" },

    { key: 'nes', value: "NES" },
    { key: 'nesMini', value: "NES Mini" },
    { key: 'snesMini', value: "SNES Mini" },
    { key: 'n64', value: "Nintendo 64" },
    { key: 'gcn', value: "GameCube" },
    { key: 'wii', value: "Wii" },
    { key: 'wiiU', value: "Wii U" },
    { key: 'switch', value: "Switch" },
    { key: 'switch2', value: "Switch 2" },
    { key: 'switchO', value: "Switch Online" },
    { key: 'gb', value: "GameBoy" },
    { key: 'gbc', value: "GameBoy Color" },
    { key: 'gba', value: "GameBoy Advance" },
    { key: 'nds', value: "Nintendo DS" },
    { key: 'n3ds', value: "Nintendo 3DS" },

    { key: 'ps1', value: "Playstation 1" },
    { key: 'psMini', value: "Playstation Mini" },
    { key: 'ps2', value: "Playstation 2" },
    { key: 'ps3', value: "Playstation 3" },
    { key: 'ps4', value: "Playstation 4" },
    { key: 'ps5', value: "Playstation 5" },
    { key: 'psn', value: "Playstation Network" },
    { key: 'psp', value: "Playstion Portable" },
    { key: 'pstv', value: "Playstation TV" },

    { key: 'xbox', value: "Xbox" },
    { key: 'xbox360', value: "Xbox 360" },
];

export type Game = {
    _id?: string
    title: string,
    sortTitle: string,
    series: string,
    genre: string,
    image: string,
    interest: Interest | null,
    rating: string | null,
    progress: PlayState,
    progressDescription: string | null,
    onList: boolean,
    addedDate: Date,
    modifiedDate: Date,
};

export type GameConsoleDetails = {
    _id?: string,
    console: string,
    ownedState: OwnedState,
    releaseYear: number,
    gameId: string, // Id of the game in the Game collection    
};

// Lets Map the interest levels to a numeric value and a color for display purposes
export const INTEREST_CONFIG: Record<Interest, { label: string; color: string; weight: number }> = {
    'must-play': { label: 'Must Play', color: 'text-red-500', weight: 5 },
    'very-interested': { label: 'Very Interested', color: 'text-yellow-500', weight: 4 },
    'interested': { label: 'Interested', color: 'text-green-500', weight: 3 },
    'not-interested': { label: 'Not Interested', color: 'text-gray-500', weight: 2 },
    'little-interested': {
        label: 'Little Interested',
        color: 'text-blue-500',
        weight: 0
    }
};

// Map colors and icons structurally to State of Play categories
export const STATE_CONFIG: Record<PlayState, { label: string; bg: string; text: string; dot: string; icon: LucideIcon }> = {
    playing: {
        label: 'Currently Playing',
        bg: 'bg-violet-500/10',
        text: 'text-violet-400',
        dot: 'bg-violet-400',
        icon: Play
    },
    backlog: {
        label: 'Backlog',
        bg: 'bg-zinc-500/10',
        text: 'text-zinc-400',
        dot: 'bg-zinc-500',
        icon: History
    },
    paused: {
        label: 'On Hold',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        dot: 'bg-amber-400',
        icon: Pause
    },
    completed: {
        label: 'Completed',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        dot: 'bg-emerald-400',
        icon: CheckCircle2
    },
    dropped: {
        label: 'Dropped',
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        dot: 'bg-rose-400',
        icon: XCircle
    },
    finished: {
        label: 'Finished',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        dot: 'bg-emerald-400',
        icon: CheckCircle2
    },
    na: {
        label: 'N/A',
        bg: 'bg-zinc-500/10',
        text: 'text-zinc-400',
        dot: 'bg-zinc-500',
        icon: SlidersHorizontal
    },
    wishlist: {
        label: 'Wishlist',
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        dot: 'bg-blue-400',
        icon: Heart
    }
};