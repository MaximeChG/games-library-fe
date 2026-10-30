// Fetch the database-backed genre choices for the new-game form.
import { BASE_URL, fetchJson } from "../util/util";

export const GetGenres = async (): Promise<{ id: string; displayName: string }[]> => {
  return fetchJson(`${BASE_URL}/genres`);
};