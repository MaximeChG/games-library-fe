// Fetch the database-backed console choices for the new-game form.
import { BASE_URL, fetchJson } from "../util/util";

export const GetConsoles = async (): Promise<{ id: string; name: string }[]> => {
  return fetchJson(`${BASE_URL}/consoles`);
};