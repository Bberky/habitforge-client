import useSWR from "swr";
import { USERS_API_URL, useGetLoggedUser } from "./users";
import { fetcher } from ".";
import useSWRMutation from "swr/mutation";
import { getCredentials } from "../auth";

export const USER_HABITS_API_URL = "user-habits";

export enum HabitGoalInterval {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export type UserHabit = {
  id: number;
  goalInterval: HabitGoalInterval;
  goalThreshold: number;
  habitId: number;
  userId: number;
};

export const useGetLoggedUserUserHabits = () => {
  const { data, isLoading } = useGetLoggedUser();
  const res = useSWR<UserHabit[]>(
    `${USERS_API_URL}/${data?.id}/${USER_HABITS_API_URL}`,
    fetcher,
  );

  return {
    ...res,
    isLoading: isLoading || res.isLoading,
  };
};

export const useGetUserHabit = (id: number) =>
  useSWR<UserHabit>(`${USER_HABITS_API_URL}/${id}`, fetcher);

export const useCreateUserHabitMutation = () => {
  return useSWRMutation<UserHabit, any, string, UserHabit>(
    USER_HABITS_API_URL,
    (url, { arg }) => fetcher(url, { method: "POST", data: arg }),
  );
};

export const useDeleteUserHabitMutation = (id: number) =>
  useSWRMutation<UserHabit, any, string>(
    `${USER_HABITS_API_URL}/${id}`,
    (url) => fetcher(url, { method: "DELETE", auth: getCredentials() }),
  );

export const useGetUserHabitCompletion = (id: number) =>
  useSWR<number>(`${USER_HABITS_API_URL}/${id}/completion`, fetcher);
