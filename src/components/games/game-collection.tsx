'use client';

// This client component makes the library search and play-state filters interactive.
import { useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import type { Game } from "@/src/types/games";
import FilterToolbar from "@/src/components/common/filter-toolbar";
import Filter from "@/src/components/common/filter";
import PageHeader from "@/src/components/common/page-header";
import PageLayout from "@/src/components/common/page-layout";
import Search from "@/src/components/common/search";
import GameRow from "@/src/components/games/game-row";

interface GameCollectionProps {
    games: Game[];
    playStates: { id: string; displayName: string }[];
}

export default function GameCollection({ games, playStates }: GameCollectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeState, setActiveState] = useState("all");

    const visibleGames = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return games.filter((game) => {
            const matchesState = activeState === "all" || game.progress === activeState;
            const searchableText = [
                game.title,
                game.sortTitle,
                game.series ?? "",
                ...game.genres,
                ...game.consoles.map(({ console }) => console),
            ].join(" ").toLowerCase();

            return matchesState && (!query || searchableText.includes(query));
        });
    }, [activeState, games, searchQuery]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <PageLayout>
            <PageHeader
                eyebrow="Library"
                title="Your games"
                metadata={`${games.length} titles in your collection`}
                actions={
                    <Link
                        href="/games/new"
                        className="inline-flex w-fit items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500"
                    >
                        Add a new game
                    </Link>
                }
            />
            <FilterToolbar>
                <Search
                    placeholder="Search games in your library..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Filter
                    FilterArray={playStates}
                    selectedId={activeState}
                    onSelect={setActiveState}
                />
            </FilterToolbar>
            {visibleGames.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-800 py-20 text-center">
                    <SlidersHorizontal className="mx-auto mb-3 h-7 w-7 text-zinc-600" />
                    <p className="text-sm text-zinc-400">
                        {games.length === 0
                            ? "Your library is empty. Add a game to get started."
                            : "No games matched your active search or filter."}
                    </p>
                </div>
            )}
            {visibleGames.length > 0 && (
                <div className="divide-y divide-zinc-800/80 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30">
                    {visibleGames.map((game) => (
                        <GameRow key={game.id} game={game} />
                    ))}
                </div>
            )}
        </PageLayout>
    );
}
