// Provide shared responsive styling for search and filter controls.
import type { ReactNode } from "react";

interface FilterToolbarProps {
    children: ReactNode;
}

export default function FilterToolbar({ children }: FilterToolbarProps) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3 shadow-2xl shadow-black/10 lg:flex-row lg:items-center lg:justify-between">
            {children}
        </div>
    );
}
