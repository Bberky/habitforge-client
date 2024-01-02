import axios, { AxiosRequestConfig } from "axios";
import { getCredentials } from "../auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async <T, D>(
  url: string,
  config?: Omit<AxiosRequestConfig<D>, "url">,
) => {
  return axios<T>({
    url: `${API_URL}/${url}`,
    auth: getCredentials(),
    ...config,
  }).then((res) => res.data);
};
