import { Game } from "../types/games";
import { BASE_URL } from "../util/util";

type GameApi = Omit<Game, "addedDate" | "modifiedDate"> & {
  createdAt: string;
  updatedAt: string;
};

const normalizeGame = (game: GameApi): Game => ({
  ...game,
  createdAt: new Date(game.createdAt),
  updatedAt: new Date(game.updatedAt),
});

export const GetGames = async (): Promise<Game[]> => {
  const response = await fetch(`${BASE_URL}/games`);
  const games = await response.json();

  console.log(games);

  return games.map(normalizeGame);
};