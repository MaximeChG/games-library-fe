'use client';

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { GameConsoleDetails } from "@/src/types/games";

interface ConsoleDetailsRowProps {
	consoles: GameConsoleDetails[];
	children: ReactNode;
}

export default function ConsoleDetailsRow({ consoles, children }: ConsoleDetailsRowProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const detailsId = useId();

	return (
		<div className="group flex flex-col gap-4 p-4 transition-colors hover:bg-zinc-800/30 sm:p-5">
			<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
				{children}
				{consoles.length > 0 && (
					<button
						type="button"
						aria-label={isExpanded ? "Hide console details" : "Show console details"}
						aria-expanded={isExpanded}
						aria-controls={detailsId}
						onClick={() => setIsExpanded((expanded) => !expanded)}
						className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:self-auto"
					>
						<ChevronDown
							className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
						/>
					</button>
				)}
			</div>
			{isExpanded && (
				<div id={detailsId} className="grid gap-2 border-t border-zinc-800 pt-4 sm:grid-cols-3">
					{consoles.map((detail, index) => (
						<div
							key={detail._id ?? `${detail.console}-${index}`}
							className="grid grid-cols-2 gap-3 rounded-lg bg-zinc-950/60 px-3 py-2.5 text-sm sm:grid-cols-3"
						>
							<span className="font-medium text-zinc-200">
								<span className="mb-1 block text-[10px] font-medium uppercase text-zinc-500">Console</span>
								{detail.console}
							</span>
							<span className="text-zinc-400">
								<span className="mb-1 block text-[10px] font-medium uppercase text-zinc-500">Owned</span>
								<span className="capitalize">{detail.ownedState.replaceAll("-", " ")}</span>
							</span>
							<span className="text-zinc-500 sm:text-right">
								<span className="mb-1 block text-[10px] font-medium uppercase text-zinc-500">Release year</span>
								{detail.releaseYear}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
