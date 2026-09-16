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
    | 'na';

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

// Map colors and icons structurally to State of Play categories
export const STATE_CONFIG: Record<PlayState, { label: string; bg: string; text: string; dot: string; icon: React.ReactNode }> = {
    playing: {
        label: 'Currently Playing',
        bg: 'bg-violet-500/10',
        text: 'text-violet-400',
        dot: 'bg-violet-400',
        icon: '<Play className="w-3.5 h-3.5" />'
    },
    backlog: {
        label: 'Backlog',
        bg: 'bg-zinc-500/10',
        text: 'text-zinc-400',
        dot: 'bg-zinc-500',
        icon: '<History className="w-3.5 h-3.5" />'
    },
    paused: {
        label: 'On Hold',
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        dot: 'bg-amber-400',
        icon: '<Pause className="w-3.5 h-3.5" />'
    },
    completed: {
        label: 'Completed',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        dot: 'bg-emerald-400',
        icon: '<CheckCircle2 className="w-3.5 h-3.5" />'
    },
    dropped: {
        label: 'Dropped',
        bg: 'bg-rose-500/10',
        text: 'text-rose-400',
        dot: 'bg-rose-400',
        icon: '<XCircle className="w-3.5 h-3.5" />'
    },
    finished: {
        label: 'Finished',
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        dot: 'bg-emerald-400',
        icon: '<CheckCircle1 className="w-3.5 h-3.5" />'
    },
    na: {
        label: 'N/A',
        bg: 'bg-zinc-500/10',
        text: 'text-zinc-400',
        dot: 'bg-zinc-500',
        icon: '<SlidersHorizontal className="w-3.5 h-3.5" />'
    },
    wishlist: {
        label: 'Wishlist',
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        dot: 'bg-blue-400',
        icon: '<Heart className="w-3.5 h-3.5" />'
    }
};