// The site header provides the page title and links to available sections.
import NavItem from "./nav-item";

interface HeaderProps {
    pageName: string;
}

export default function Header({ pageName }: HeaderProps) {
    return (
        <header className="flex items-center justify-between bg-zinc-900 p-4 text-violet-300">
          <h1 className="text-xl font-bold">{pageName}</h1>

          <nav>
            <ul className="flex flex-wrap gap-2 text-sm font-medium">
              <NavItem label="Dashboard" href="/" />
              <NavItem label="Games" href="/games" />
              <NavItem label="Design" href="/design" />
            </ul>
          </nav>
        </header>
    );
};