import { BASE_URL } from "../util/util";

export const GetStates = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}/states`);
  const playStates = await response.json();

  return playStates;
};