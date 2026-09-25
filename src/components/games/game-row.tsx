import { CalendarDays, Gamepad2 } from "lucide-react";
import { type Game } from "@/src/types/games";
import { STATE_CONFIG, INTEREST_CONFIG } from "@/src/types/configs";

interface GameRowProps {
    game: Game;
}

export default function GameRow({ game }: GameRowProps) {
    const stateConfig = STATE_CONFIG[game.progress];
    const Icon = stateConfig.icon;

    const interestConfig = game.interest ? INTEREST_CONFIG[game.interest] : null;

    return (
        <div className="group flex flex-col gap-5 p-4 transition-colors hover:bg-zinc-800/30 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex min-w-0 items-center gap-4 sm:w-[38%]">
                <img
                    src={game.image}
                    alt={game.title}
                    className="h-16 w-16 shrink-0 rounded-xl border border-zinc-700/70 bg-zinc-950 object-cover shadow-lg"
                />
                <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-zinc-100 transition-colors group-hover:text-violet-300">
                        {game.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                        <Gamepad2 className="h-3.5 w-3.5" />
                        {game.genre}
                    </p>
                </div>
            </div>

            <div className="sm:w-1/5">
                <span className={`inline-flex items-center gap-2 rounded-lg border border-white/5 px-2.5 py-1.5 text-xs font-medium ${stateConfig.bg} ${stateConfig.text}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {stateConfig.label}
                </span>
            </div>
            {game.interest && (
                <div className="sm:w-1/5">
                    <p className="text-xs font-medium capitalize text-zinc-400">
                        Interest
                        <span className="mt-1 block text-sm text-zinc-200">
                            {interestConfig?.label}
                        </span>
                    </p>
                </div>
            )}
            {game.rating !== null && (
                <div className="sm:w-1/5">
                    <p className="text-xs font-medium capitalize text-zinc-400">
                        Rating
                        <span className="mt-1 block text-sm text-zinc-200">
                            {game.rating}
                        </span>
                    </p>
                </div>
            )}

            <p className="flex items-center gap-1.5 whitespace-nowrap text-xs text-zinc-500 sm:w-1/6 sm:justify-end">
                <CalendarDays className="h-3.5 w-3.5" />
                {game.createdAt.toLocaleDateString()}
            </p>
        </div>
    );
}
