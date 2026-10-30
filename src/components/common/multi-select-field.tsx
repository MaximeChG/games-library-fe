'use client';

// A reusable checkbox dropdown keeps selected values in the parent form.
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MultiSelectFieldProps {
    id: string;
    label: string;
    name: string;
    options: { id: string; displayName: string }[];
    placeholder?: string;
    containerClassName?: string;
}

export default function MultiSelectField({
    id,
    label,
    name,
    options,
    placeholder = "Select options",
    containerClassName = "",
}: MultiSelectFieldProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const selectedOptions = options.filter((option) => selectedValues.includes(option.id));

    const toggleOption = (value: string) => {
        setSelectedValues((currentValues) =>
            currentValues.includes(value)
                ? currentValues.filter((currentValue) => currentValue !== value)
                : [...currentValues, value],
        );
    };

    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            <span id={`${id}-label`} className="text-sm font-medium text-zinc-300">{label}</span>
            {/* Hidden fields keep selected values in FormData while the dropdown is closed. */}
            {selectedValues.map((value) => (
                <input key={value} type="hidden" name={name} value={value} />
            ))}
            <div className="relative">
                <button
                    type="button"
                    aria-labelledby={`${id}-label`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-options`}
                    onClick={() => setIsOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 py-2.5 text-left text-sm text-zinc-100 transition-colors hover:border-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                >
                    <span className={selectedOptions.length ? "text-zinc-100" : "text-zinc-500"}>
                        {selectedOptions.length > 0
                            ? `${selectedOptions.length} selected`
                            : placeholder}
                    </span>
                    <ChevronDown
                        className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                    />
                </button>

                {isOpen && (
                    <div
                        id={`${id}-options`}
                        className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-900 p-2 shadow-2xl shadow-black/40"
                    >
                        {options.map((option, index) => {
                            const inputId = `${id}-option-${index}`;
                            return (
                                <label
                                    key={option.id}
                                    htmlFor={inputId}
                                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
                                >
                                    <input
                                        id={inputId}
                                        type="checkbox"
                                        value={option.id}
                                        checked={selectedValues.includes(option.id)}
                                        onChange={() => toggleOption(option.id)}
                                        className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 accent-violet-500 focus:ring-violet-500"
                                    />
                                    {option.displayName}
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>

            {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1" aria-live="polite">
                    {selectedOptions.map((option) => (
                        <span
                            key={option.id}
                            className="rounded-full bg-violet-500/20 px-2.5 py-1 text-xs text-violet-300"
                        >
                            {option.displayName}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
