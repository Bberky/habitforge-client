import useSWR from "swr";
import { fetcher } from ".";
import useSWRMutation from "swr/mutation";
import { HABITS_API_URL } from "./habits";

export const TAGS_API_URL = "tags";

export type Tag = {
  id: number;
  name: string;
  color: number;
};

export const useGetTags = () => useSWR<Tag[]>(TAGS_API_URL, fetcher);

export const useCreateTagMutation = () =>
  useSWRMutation<Tag, any, "tags", Omit<Tag, "id">>(
    TAGS_API_URL,
    (url, { arg }) => fetcher(url, { method: "POST", data: arg }),
  );

export const useGetHabitTags = (habitId: number) =>
  useSWR<Tag[]>(`${HABITS_API_URL}/${habitId}/${TAGS_API_URL}`, fetcher);

export const useDeleteHabitTagMutation = (habitId: number) =>
  useSWRMutation<Tag, any, string, number>(
    `${HABITS_API_URL}/${habitId}/${TAGS_API_URL}`,
    (url, { arg }) => fetcher(`${url}/${arg}`, { method: "DELETE" }),
  );

export const useAddHabitTagMutation = (habitId: number) =>
  useSWRMutation<Tag, any, string, number>(
    `${HABITS_API_URL}/${habitId}/${TAGS_API_URL}`,
    (url, { arg }) => fetcher(`${url}/${arg}`, { method: "PUT", data: arg }),
  );
