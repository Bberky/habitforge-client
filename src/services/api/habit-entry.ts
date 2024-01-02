import useSWRMutation from "swr/mutation";
import { fetcher } from ".";
import { USER_HABITS_API_URL } from "./user-habits";
import useSWR from "swr";

export const HABIT_ENTRIES_API_URL = "entries";

export type HabitEntry = {
  id: number;
  value: number;
  createdAt: string;
};

export const useCreateHabitEntryMutation = (userHabitId: number) => {
  return useSWRMutation<HabitEntry, any, string, { value: number }>(
    `${USER_HABITS_API_URL}/${userHabitId}/${HABIT_ENTRIES_API_URL}`,
    (url, { arg }) => fetcher(url, { method: "POST", data: arg }),
  );
};

export const useGetHabitEntries = (userHabitId: number) =>
  useSWR<HabitEntry[]>(
    `${USER_HABITS_API_URL}/${userHabitId}/${HABIT_ENTRIES_API_URL}`,
    fetcher,
  );

export const useDeleteHabitEntryMutation = (userHabitId: number) =>
  useSWRMutation<HabitEntry, any, string, number>(
    `${USER_HABITS_API_URL}/${userHabitId}/${HABIT_ENTRIES_API_URL}`,
    (url, { arg }) => fetcher(`${url}/${arg}`, { method: "DELETE" }),
  );
