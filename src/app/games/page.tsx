// Fetch the library data on the server, then pass it to the interactive list.
import { GetGames } from "@/src/api/games";
import { GetStates } from "@/src/api/states";
import GameCollection from "@/src/components/games/game-collection";

// These values come from the live API, so fetch them at request time instead of during the build.
export const dynamic = "force-dynamic";

export default async function Games() {
    const [games, playStates] = await Promise.all([GetGames(), GetStates()]);

    return <GameCollection games={games} playStates={playStates} />;
}