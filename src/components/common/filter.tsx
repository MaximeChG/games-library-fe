import { PLAY_STATES, PlayState, STATE_CONFIG } from "@/src/types/games";

interface FilterProps {
  FilterArray: PlayState[];
}

export default function Filter({ FilterArray }: FilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-900/40 p-1.5 border border-zinc-800/80 rounded-xl overflow-x-auto">
            <button 
            key="all"
            className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
            >
              All Games
        </button>
          {FilterArray.map((tab) => (
            <button
              key={tab}
              className="px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
            >
              {STATE_CONFIG[tab].label}
            </button>
          ))}
        </div>
    );
}