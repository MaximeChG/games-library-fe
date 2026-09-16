import NavItem from "./nav-item";

interface HeaderProps {
    PageName: string;
}

export default function Header({ PageName }: HeaderProps) {
    return (
        <header className="flex items-center justify-between bg-gray-900 p-4 text-purple-400">
          <h1 className="text-xl font-bold">{PageName}</h1>

          <nav>
            <ul className="flex flex-wrap gap-2 text-sm font-medium">
              <NavItem label="Dashboard" href="/" />
              <NavItem label="Games" href="/games" />
              <NavItem label="Lists" href="/lists" />
              <NavItem label="Reviews" href="/reviews" />
            </ul>
          </nav>
        </header>
    );
};