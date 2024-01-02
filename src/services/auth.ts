import { AxiosBasicCredentials } from "axios";

export const USER_KEY = "habitforge-user";

export type Credentials = AxiosBasicCredentials;

export const getCredentials = (): Credentials | undefined => {
  if (typeof window !== "undefined")
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
};

export const setCredentials = (credentials: Credentials) => {
  if (typeof window !== "undefined")
    localStorage.setItem(USER_KEY, JSON.stringify(credentials));
};

export const clearCredentials = () => {
  if (typeof window !== "undefined") localStorage.removeItem(USER_KEY);
};
