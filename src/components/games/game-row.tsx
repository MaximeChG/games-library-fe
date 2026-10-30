// Render one game's summary and the console details included in the API response.
import { Gamepad2 } from "lucide-react";
import type { Game } from "@/src/types/games";
import { STATE_CONFIG, INTEREST_CONFIG } from "@/src/types/configs";
import { formatDate } from "@/src/util/util";
import ConsoleDetailsRow from "./console-details-row";

interface GameRowProps {
    game: Game;
}

export default function GameRow({ game }: GameRowProps) {
    const stateConfig = STATE_CONFIG[game.progress] ?? STATE_CONFIG.na;
    const Icon = stateConfig.icon;

    const interestConfig = game.interest ? INTEREST_CONFIG[game.interest] : null;

    return (
        <ConsoleDetailsRow consoles={game.consoles}>
            <div className="min-w-0 flex-1 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4 sm:w-[38%]">
                    {game.imageUrl ? (
                        <img
                            src={game.imageUrl}
                            alt={game.title}
                            className="h-16 w-16 shrink-0 rounded-xl border border-zinc-700/70 bg-zinc-950 object-cover shadow-lg"
                        />
                    ) : (
                        <div
                            aria-hidden="true"
                            className="h-16 w-16 shrink-0 rounded-xl border border-zinc-700/70 bg-zinc-950 shadow-lg"
                        />
                    )}
                    <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-zinc-100 transition-colors group-hover:text-violet-300">
                            {game.title}
                        </h3>
                        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                            <Gamepad2 className="h-3.5 w-3.5 shrink-0" />
                            {game.genres.length > 0 ? game.genres.map((genre) => (
                                <span key={genre} className="max-w-full break-words rounded-full bg-violet-500/20 px-2 py-1 text-xs text-violet-300">
                                    {genre}
                                </span>
                            )) : (
                                <span className="text-zinc-500">No genres</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sm:w-1/5">
                    <span className={`inline-flex items-center gap-2 rounded-lg border border-white/5 px-2.5 py-1.5 text-xs font-medium ${stateConfig.bg} ${stateConfig.text}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {stateConfig.label}
                    </span>
                </div>
                
                {game.rating !== null ? (
                    <div className="sm:w-1/5">
                        <p className="text-xs font-medium capitalize text-zinc-400">
                            Rating
                            <span className="mt-1 block text-sm text-zinc-200">
                                {game.rating}
                            </span>
                        </p>
                    </div>
                ) : (<div className="sm:w-1/5">
                    <p className="text-xs font-medium capitalize text-zinc-400">
                        Interest
                        <span className="mt-1 block text-sm text-zinc-200">
                            {interestConfig?.label}
                        </span>
                    </p>
                </div>
            )}

                <div className="sm:w-1/5">
                    <p className="text-xs font-medium capitalize text-zinc-400">
                        Created At:
                        <span className="mt-1 block text-sm text-zinc-200">
                            {formatDate(game.createdAt)}
                        </span>
                    </p>
                </div>
            </div>
        </ConsoleDetailsRow>
    );
}
