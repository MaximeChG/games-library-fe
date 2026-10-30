// Play-state buttons report the selected state to their parent component.
interface FilterProps {
  FilterArray: {
        id: string,
        displayName: string
    }[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function Filter({ FilterArray, selectedId, onSelect }: FilterProps) {
    return (
        <div
            role="group"
            aria-label="Filter games by play state"
            className="flex flex-wrap items-center gap-1 rounded-xl bg-zinc-950/70 p-1"
        >
            <button
                type="button"
                aria-pressed={selectedId === "all"}
                onClick={() => onSelect("all")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    selectedId === "all"
                        ? "bg-zinc-800 text-zinc-50"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
                }`}
            >
                All Games
            </button>
          {FilterArray.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={selectedId === tab.id}
              onClick={() => onSelect(tab.id)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                  selectedId === tab.id
                      ? "bg-zinc-800 text-zinc-50"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
              }`}
            >
              {tab.displayName}
            </button>
          ))}
        </div>
    );
}