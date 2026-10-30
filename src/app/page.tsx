// The dashboard is the entry point and links visitors to their game library.
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to{" "}
                    <Link className="text-violet-400 hover:text-violet-300" href="/games">
                        your games library
                    </Link>
                </h1>
            </main>
        </div>
    );
}