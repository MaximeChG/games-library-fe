// Fetch the database-backed play-state choices for forms and filters.
import { BASE_URL, fetchJson } from "../util/util";

export const GetStates = async (): Promise<{ id: string; displayName: string }[]> => {
  return fetchJson(`${BASE_URL}/states`);
};