'use client';

// Highlight the navigation link that matches the current route.
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
    label: string;
    href: string;
}

export default function NavItem({ label, href }: NavItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li
            className={`rounded-md px-3 py-2 transition-colors hover:bg-violet-950 hover:text-violet-200 ${
                isActive ? "bg-violet-800 text-white" : ""
            }`}
        >
            <Link href={href} aria-current={isActive ? "page" : undefined}>
                {label}
            </Link>
        </li>
    );
}