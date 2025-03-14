/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { axiosHnInstance, fetcher } from "@/lib/axiosInstances";
import { AxiosResponse } from "axios";

export function useFavoriteStoryIdsSWR() {
  const swr = useSWR<number[]>("/favorite-stories", fetcher);

  return swr;
}

export default function useFavoriteStoriesSWR() {
  const swrIds = useFavoriteStoryIdsSWR();

  const swrStories = useSWR<StoryType[]>(
    "favorite-stories-hn",
    storyFetcher(swrIds.data || [])
  );

  const swr = !swrIds.data ? swrIds : swrStories;

  return {
    ...swr,
    canRender: swr.data,
  };
}

const storyFetcher = (data: number[]) => async (): Promise<StoryType[]> => {
  const handleReqMap = (storyId: number) =>
    axiosHnInstance.get<StoryType>(`/items/${storyId}`);

  const requests = data.map(handleReqMap);
  const responses = await Promise.all(requests);

  const handleResMap = ({ data }: AxiosResponse<StoryType, any>) => data;
  return responses.map(handleResMap);
};
