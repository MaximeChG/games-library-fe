export type PlayState =
    | 'playing'
    | 'backlog'
    | 'paused'
    | 'completed'
    | 'dropped'
    | 'finished'
    | 'na'
    | 'wishlist';

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
    id?: string
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
    createdAt: Date,
    updatedAt: Date,
};

export type GameConsoleDetails = {
    _id?: string,
    console: string,
    ownedState: OwnedState,
    releaseYear: number,
    gameId: string, // Id of the game in the Game collection    
};

