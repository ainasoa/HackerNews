/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { redirect } from "next/navigation";
import routePath from "./routePath";
import { getSession, signOut } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MY_API,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session) {
    const { accessToken } = session.user as TokenType;

    if (accessToken) config.headers.Authorization = "Bearer " + accessToken;
  }

  return config;
});

axiosInstance.interceptors.response.use(async (config) => {
  if (config.status === 401) {
    await signOut({ redirect: false });
    await redirect(routePath["/login"]);
  }

  return config;
});

export const fetcher = async (key: string) => {
  const { data } = await axiosInstance.get(key);

  return data;
};

export const axiosHnInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HN_API,
});

export const hnFetcher = async (key: string) => {
  const { data } = await axiosHnInstance.get(key);

  return data;
};
