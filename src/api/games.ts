import { Game } from "../types/games";

type GameApi = Omit<Game, "addedDate" | "modifiedDate"> & {
  addedDate: string;
  modifiedDate: string;
};

const normalizeGame = (game: GameApi): Game => ({
  ...game,
  addedDate: new Date(game.addedDate),
  modifiedDate: new Date(game.modifiedDate),
});

export const GetGames = async (): Promise<Game[]> => {
  const response = await fetch("http://localhost:8080/games");
  const games = await response.json();

  return games.map(normalizeGame);
};