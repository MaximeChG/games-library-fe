import { LucideIcon, Play, Pause, CheckCircle2, XCircle, SlidersHorizontal, Heart, History } from "lucide-react";
import { Interest, PlayState } from "./games";

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