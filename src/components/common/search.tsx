import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
    return (
         <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 py-2.5 pl-10 pr-4 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
    );
}