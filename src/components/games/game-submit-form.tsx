'use client';

// Gather browser form values into the JSON shape expected by the game API.
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CreateGame } from "@/src/api/games";
import type { OwnedState } from "@/src/types/games";

interface GameSubmitFormProps {
    children: ReactNode;
}

interface ConsoleDetailFormRow {
    consoleId?: string;
    ownedState?: string;
    releaseYear?: string;
}

const OWNED_STATES: OwnedState[] = ["physical", "digital", "emulator", "wishlist"];

export default function GameSubmitForm({ children }: GameSubmitFormProps) {
    const router = useRouter();
    const isSubmitting = useRef(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting.current) return;

        isSubmitting.current = true;
        setIsPending(true);
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);
        const consoleRows = new Map<number, ConsoleDetailFormRow>();
        const consoleFieldPattern = /^consoleDetails\[(\d+)\]\[(consoleId|ownedState|releaseYear)\]$/;

        // The form uses indexed field names so multiple console rows can be rebuilt as objects.
        for (const [fieldName, value] of formData.entries()) {
            const match = consoleFieldPattern.exec(fieldName);
            if (!match || typeof value !== "string") continue;

            const rowIndex = Number(match[1]);
            const field = match[2] as keyof ConsoleDetailFormRow;
            const row = consoleRows.get(rowIndex) ?? {};
            row[field] = value;
            consoleRows.set(rowIndex, row);
        }

        const consoles = [...consoleRows.values()]
            .flatMap((row) => {
                if (!row.consoleId || !row.ownedState || !row.releaseYear) return [];

                const releaseYear = Number(row.releaseYear);
                const ownedState = OWNED_STATES.find((state) => state === row.ownedState);
                if (!Number.isFinite(releaseYear) || !ownedState) return [];

                return [{
                    consoleId: row.consoleId,
                    ownedState,
                    releaseYear,
                }];
            });

        try {
            await CreateGame({
                title: String(formData.get("title") ?? ""),
                sortTitle: String(formData.get("sortTitle") ?? ""),
                series: String(formData.get("series") ?? ""),
                imageUrl: String(formData.get("imageURL") ?? ""),
                genres: formData.getAll("genres").filter((genre): genre is string => typeof genre === "string"),
                interest: String(formData.get("interest") ?? ""),
                rating: String(formData.get("rating") ?? ""),
                progress: String(formData.get("progress") ?? ""),
                progressDescription: String(formData.get("progressDescription") ?? ""),
                onList: formData.has("onList"),
                consoles,
            });
            router.push("/games");
            router.refresh();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Failed to add game. Please try again.");
            isSubmitting.current = false;
            setIsPending(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 shadow-2xl shadow-black/10 sm:p-6"
        >
            {children}
            {errorMessage && (
                <p role="alert" className="rounded-lg border border-red-900/80 bg-red-950/40 px-4 py-3 text-sm text-red-300">
                    {errorMessage}
                </p>
            )}
            {isPending && (
                <p role="status" className="text-right text-sm text-zinc-400">
                    Adding game…
                </p>
            )}
        </form>
    );
}
