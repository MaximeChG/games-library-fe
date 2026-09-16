import Filter from "@/src/components/common/filter";
import Search from "@/src/components/common/search";
import { PLAY_STATES, STATE_CONFIG } from "@/src/types/games";
import { MOCK_GAMES } from "@/src/util/data";
import { CalendarDays, Gamepad2, SlidersHorizontal } from "lucide-react";

export default function Games() {


    return (
        <main className="min-h-screen w-full bg-zinc-950 px-4 py-6 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-7">
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Library</p>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">Your games</h2>
                        <p className="text-sm text-zinc-500">{MOCK_GAMES.length} titles in your collection</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3 shadow-2xl shadow-black/10 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Input */}
                <Search placeholder="Search games in your library..." />


                {/* Filtering Tabs */}
                <Filter FilterArray={PLAY_STATES} />
                </div>
            {MOCK_GAMES.length === 0 && (
                <div className="rounded-2xl border border-dashed border-zinc-800 py-20 text-center">
                    <SlidersHorizontal className="mx-auto mb-3 h-7 w-7 text-zinc-600" />
                    <p className="text-sm text-zinc-400">No games matched your active view criteria.</p>
                </div>
            )}

            {MOCK_GAMES.length > 0 && (
                <div className="divide-y divide-zinc-800/80 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30">
                    {MOCK_GAMES.map((game) => (
                        <div key={game._id} className="group flex flex-col gap-5 p-4 transition-colors hover:bg-zinc-800/30 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                            <div className="flex min-w-0 items-center gap-4 sm:w-[38%]">
                                <img src={game.image} alt={game.title} className="h-16 w-16 shrink-0 rounded-xl border border-zinc-700/70 bg-zinc-950 object-cover shadow-lg" />
                                <div className="min-w-0">
                                    <h3 className="truncate text-base font-semibold text-zinc-100 transition-colors group-hover:text-violet-300">{game.title}</h3>
                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500"><Gamepad2 className="h-3.5 w-3.5" />{game.genre}</p>
                                </div>
                            </div>
                            <div className="sm:w-1/5">
                                {(() => {
                                    const config = STATE_CONFIG[game.progress];
                                    const Icon = config.icon;
                                    return (
                                        <span className={`inline-flex items-center gap-2 rounded-lg border border-white/5 px-2.5 py-1.5 text-xs font-medium ${config.bg} ${config.text}`}>
                                            <Icon className="h-3.5 w-3.5" />
                                            {config.label}
                                        </span>
                                    );
                                })()}
                            </div>
                            <div className="sm:w-1/5">
                                {game.interest ? (
                                    <p className="text-xs font-medium capitalize text-zinc-400">Interest <span className="mt-1 block text-sm text-zinc-200">{game.interest.replaceAll('-', ' ')}</span></p>
                                ) : (
                                    <p className="text-xs text-zinc-600">No interest rating</p>
                                )}
                                </div>
                            <p className="flex items-center gap-1.5 whitespace-nowrap text-xs text-zinc-500 sm:w-1/6 sm:justify-end"><CalendarDays className="h-3.5 w-3.5" />{game.addedDate.toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </main>
    );
}