import useMutation from "swr/mutation";
import { axiosInstance } from "../lib/axiosInstances";
import { useFavoriteStoryIdsSWR } from "./useFavoriteStoriesSWR";

export default function useFavoriteMutation() {
  const { data, mutate } = useFavoriteStoryIdsSWR();

  return useMutation("/favorite-story", async (key, { arg: storyId }) => {
    console.log("storyId", storyId);
    await axiosInstance.post(key, {
      storyId,
      action: (data || []).includes(storyId) ? "remove" : "add",
    });

    await mutate();
  });
}
