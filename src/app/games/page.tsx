'use server';

import { GetGames } from "@/src/api/games";
import { GetStates } from "@/src/api/states";
import Filter from "@/src/components/common/filter";
import Search from "@/src/components/common/search";
import GameRow from "@/src/components/games/game-row";
import { Game } from "@/src/types/games";
import { SlidersHorizontal } from "lucide-react";

export default async function Games() {
    const games: Game[] = await GetGames();
    const playState: {
        id: string,
        displayName: string
    }[] = await GetStates();

    return (
        <main className="min-h-screen w-full bg-zinc-950 px-4 py-6 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-7">
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Library</p>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">Your games</h2>
                        <p className="text-sm text-zinc-500">{games.length} titles in your collection</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3 shadow-2xl shadow-black/10 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Input */}
                <Search placeholder="Search games in your library..." />


                {/* Filtering Tabs */}
                <Filter FilterArray={playState} />
                </div>
            {games.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-800 py-20 text-center">
                    <SlidersHorizontal className="mx-auto mb-3 h-7 w-7 text-zinc-600" />
                    <p className="text-sm text-zinc-400">No games matched your active view criteria.</p>
                </div>
            )}

            {games.length > 0 && (
                <div className="divide-y divide-zinc-800/80 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30">
                    {games.map((game) => (
                        <GameRow key={game.id} game={game} />
                    ))}
                </div>
            )}
            </div>
        </main>
    );
}