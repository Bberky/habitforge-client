import useSWR from "swr";
import { fetcher } from ".";
import useSWRMutation from "swr/mutation";
import { Habit } from "./habits";
import useSWRImmutable from "swr/immutable";

export const USERS_API_URL = "users";

export type User = {
  id: number;
  email: string;
  fullName?: string;
};

export type UserInput = {
  email: string;
  fullName?: string;
  password: string;
};

export const useGetLoggedUser = () =>
  useSWRImmutable<User>(`${USERS_API_URL}/me`, fetcher, {});

export const useSignUpMutation = () =>
  useSWRMutation<User, any, "users", UserInput>(USERS_API_URL, (url, { arg }) =>
    fetcher(url, { method: "POST", data: arg }),
  );

export const useGetLoggedUserHabits = () => {
  const { data } = useGetLoggedUser();

  return useSWR<Habit[]>(`${USERS_API_URL}/${data?.id}/habits`, fetcher);
};
