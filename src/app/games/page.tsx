import Filter from "@/src/components/common/filter";
import Search from "@/src/components/common/search";
import { PLAY_STATES } from "@/src/types/games";

export default function Games() {
    return (
         <div className="w-full space-y-6 text-zinc-100 p-6 bg-zinc-950 min-h-screen">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <Search placeholder="Search games in your library..." />
        

        {/* Filtering Tabs */}
        <Filter FilterArray={PLAY_STATES}/>
      </div>
      </div>  
    );
}