// Game API calls live here so pages and components share one response contract.
import type { CreateGamePayload, Game, ReturnedGamePayload } from "../types/games";
import { BASE_URL, fetchJson, normalizeGame } from "../util/util";

export const GetGames = async (): Promise<Game[]> => {
  const games = await fetchJson<ReturnedGamePayload[]>(`${BASE_URL}/games`);
  return games.map(normalizeGame);
};

export const CreateGame = async (gameData: CreateGamePayload): Promise<void> => {
  const response = await fetch(`${BASE_URL}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  });

  if (!response.ok) {
    const responseText = await response.text();
    let message = `Failed to create game: ${response.status} ${response.statusText}`;

    try {
      const body = JSON.parse(responseText) as { message?: string };
      message = body.message ?? message;
    } catch {
      if (responseText) message = responseText;
    }

    throw new Error(message);
  }
};
