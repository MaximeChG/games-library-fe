'use client';

// Manage the repeatable console/ownership/year rows on the game form.
import { useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { OwnedState } from "@/src/types/games";
import { InputField, SelectField } from "@/src/components/common/form-fields";

const OWNED_STATES: OwnedState[] = ["physical", "digital", "emulator", "wishlist"];

interface ConsoleDetailRow {
    id: number;
    consoleId: string;
    ownedState: OwnedState | "";
    releaseYear: string;
}

interface ConsoleDetailsFieldsProps {
    consoles: { id: string; name: string }[];
}

export default function ConsoleDetailsFields({ consoles }: ConsoleDetailsFieldsProps) {
    const nextId = useRef(1);
    const [rows, setRows] = useState<ConsoleDetailRow[]>([
        { id: 0, consoleId: "", ownedState: "", releaseYear: "" },
    ]);

    const addRow = () => {
        setRows((currentRows) => [
            ...currentRows,
            { id: nextId.current++, consoleId: "", ownedState: "", releaseYear: "" },
        ]);
    };

    const removeRow = (id: number) => {
        setRows((currentRows) => currentRows.filter((row) => row.id !== id));
    };

    return (
        <fieldset className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
            <legend className="px-2 text-sm font-semibold text-zinc-100">Console details</legend>

            <div className="space-y-3">
                {rows.map((row, index) => (
                    <div
                        key={row.id}
                        className="grid gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_10rem_auto] md:items-end"
                    >
                        <SelectField
                            id={`console-${row.id}`}
                            label="Console"
                            name={`consoleDetails[${index}][consoleId]`}
                            value={row.consoleId}
                            required
                            onChange={(event) => {
                                const consoleId = event.target.value;
                                setRows((currentRows) =>
                                    currentRows.map((currentRow) =>
                                        currentRow.id === row.id ? { ...currentRow, consoleId } : currentRow,
                                    ),
                                );
                            }}
                        >
                            <option value="" disabled></option>
                            {consoles.map((console) => (
                                <option key={console.id} value={console.id}>
                                    {console.name}
                                </option>
                            ))}
                        </SelectField>

                        <SelectField
                            id={`owned-state-${row.id}`}
                            label="Owned state"
                            name={`consoleDetails[${index}][ownedState]`}
                            value={row.ownedState}
                            required
                            onChange={(event) => {
                                const ownedState =
                                    OWNED_STATES.find((state) => state === event.target.value) ?? "";
                                setRows((currentRows) =>
                                    currentRows.map((currentRow) =>
                                        currentRow.id === row.id ? { ...currentRow, ownedState } : currentRow,
                                    ),
                                );
                            }}
                        >
                            <option value="" disabled></option>
                            {OWNED_STATES.map((ownedState) => (
                                <option key={ownedState} value={ownedState}>
                                    {ownedState.charAt(0).toUpperCase() + ownedState.slice(1)}
                                </option>
                            ))}
                        </SelectField>

                        <InputField
                            id={`release-year-${row.id}`}
                            label="Release year"
                            name={`consoleDetails[${index}][releaseYear]`}
                            type="number"
                            inputMode="numeric"
                            min="1900"
                            max="2100"
                            placeholder="e.g. 2024"
                            value={row.releaseYear}
                            onChange={(event) => {
                                const releaseYear = event.target.value;
                                setRows((currentRows) =>
                                    currentRows.map((currentRow) =>
                                        currentRow.id === row.id ? { ...currentRow, releaseYear } : currentRow,
                                    ),
                                );
                            }}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => removeRow(row.id)}
                            aria-label={`Remove console row ${index + 1}`}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm text-zinc-400 transition-colors hover:bg-red-950/60 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                            <span className="md:sr-only">Remove</span>
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={addRow}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-500 hover:bg-violet-950/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add console row
            </button>
        </fieldset>
    );
}
