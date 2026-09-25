interface FilterProps {
  FilterArray: {
        id: string,
        displayName: string
    }[];
}

export default function Filter({ FilterArray }: FilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-zinc-950/70 p-1">
            <button 
            key="all"
          className="rounded-lg px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              All Games
        </button>
          {FilterArray.map((tab) => (
            <button
              key={tab.id}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {tab.displayName}
            </button>
          ))}
        </div>
    );
}