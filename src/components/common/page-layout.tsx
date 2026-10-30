// Provide the shared full-page background and centered content width.
import type { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <main className="min-h-screen w-full bg-zinc-950 px-4 py-6 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-7">{children}</div>
        </main>
    );
}
