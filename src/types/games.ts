// These types describe game data shared between the form, API, and library.
export const PLAY_STATES = [
    "playing",
    "backlog",
    "paused",
    "completed",
    "dropped",
    "finished",
    "na",
    "wishlist",
] as const;

export type PlayState = typeof PLAY_STATES[number];

export type Interest =
    | "must-play"
    | "very-interested"
    | "interested"
    | "little-interested"
    | "not-interested"
    | "do-not-play";

export type OwnedState = "physical" | "digital" | "emulator" | "wishlist";

export interface GameConsoleDetails {
    console: string;
    ownedState: OwnedState;
    releaseYear: number | null;
}

export interface Game {
    id: number;
    title: string;
    sortTitle: string;
    series: string | null;
    imageUrl: string | null;
    genres: string[];
    interest: Interest | null;
    rating: string | null;
    progress: PlayState;
    progressDescription: string | null;
    onList: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    consoles: GameConsoleDetails[];
}

export type ReturnedGamePayload = Omit<Game, "createdAt" | "updatedAt"> & {
    createdAt: string | null;
    updatedAt: string | null;
};

export interface CreateGamePayload {
    title: string;
    sortTitle: string;
    series: string;
    imageUrl: string;
    genres: string[];
    interest: string;
    rating: string;
    progress: string;
    progressDescription: string;
    onList: boolean;
    consoles: {
        consoleId: string;
        ownedState: OwnedState;
        releaseYear: number | null;
    }[];
}
