import useSWR from "swr";
import { fetcher } from ".";
import useSWRMutation from "swr/mutation";

export const HABITS_API_URL = "habits";

export type Habit = {
  id: number;
  name: string;
  description?: string;
  unit: string;
};

export type HabitInput = {
  name: string;
  description?: string;
  unit: string;
};

export const useGetHabits = (pub?: boolean) =>
  useSWR<Habit[]>(
    `${HABITS_API_URL}?publicOnly=${pub ? "true" : "false"}`,
    fetcher,
  );

export const useCreateHabitMutation = () => {
  return useSWRMutation<Habit, any, "habits", HabitInput>(
    HABITS_API_URL,
    (url, { arg }) => fetcher(url, { method: "POST", data: arg }),
  );
};

export const useGetHabit = (id: number) =>
  useSWR<Habit>(`${HABITS_API_URL}/${id}`, fetcher);
