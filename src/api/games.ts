import { Game, GameConsoleDetails } from "../types/games";
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

export const GetGenresForGame = async (gameId: string): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/games/${gameId}/genres`);
  const genres = await response.json();
  return genres;
};

export const GetConsolesForGame = async (gameId: string): Promise<GameConsoleDetails[]> => {
  const response = await fetch(`${BASE_URL}/games/${gameId}/consoles`);
  const consoles = await response.json();
  return consoles;
}