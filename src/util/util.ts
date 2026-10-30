// Shared helpers for API URLs, date conversion, and readable dates.
import type { Game, ReturnedGamePayload } from "../types/games";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const normalizeGame = (game: ReturnedGamePayload): Game => ({
  ...game,
  createdAt: game.createdAt ? new Date(game.createdAt) : null,
  updatedAt: game.updatedAt ? new Date(game.updatedAt) : null,
});

export const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);

  // Fail before parsing so callers get a useful HTTP error instead of a JSON parse error.
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const formatDate = (date: Date | null): string => {
  if (!date || Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};