// Render a consistent page heading with optional context, metadata, and actions.
import type { ReactNode } from "react";

interface PageHeaderProps {
    eyebrow?: string;
    title: string;
    description?: string;
    metadata?: ReactNode;
    actions?: ReactNode;
}

export default function PageHeader({
    eyebrow,
    title,
    metadata,
    actions,
}: PageHeaderProps) {
    return (
        <header className="flex flex-col gap-1">
            {(eyebrow || metadata) && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                    {eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                            {eyebrow}
                        </p>
                    ) : <span />}
                    {metadata && <div className="text-sm text-zinc-500">{metadata}</div>}
                </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{title}</h1>
                </div>
                {actions}
            </div>
        </header>
    );
}
