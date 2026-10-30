// Fetch the database-backed interest choices for the new-game form.
import { BASE_URL, fetchJson } from "../util/util";

export const GetInterests = async (): Promise<{ id: string; displayName: string }[]> => {
  return fetchJson(`${BASE_URL}/interests`);
};