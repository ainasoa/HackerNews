/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import HnStoryItem from "./_HnStoryItem";
import { usePathname, useRouter } from "next/navigation";
import routePath from "@/lib/routePath";
import { Newspaper } from "lucide-react";
import HnEmpty from "./HnEmpty";
import useFavoriteMutation from "@/hooks/useFavoriteMutation";
import { useFavoriteStoryIdsSWR } from "@/hooks/useFavoriteStoriesSWR";

type PropType = {
  data: StoryType[];
};

export default function HnStoriesList({ data }: PropType) {
  const pathname = usePathname() as "/news" | "/favorite-news";
  const router = useRouter();
  const mutation = useFavoriteMutation();
  const { data: ids } = useFavoriteStoryIdsSWR();

  const gotoDetail = (story: StoryType) =>
    router.push(routePath[`${pathname}/[:id]`](story.story_id));

  const renderItem = (story: StoryType, key: number) => (
    <HnStoryItem
      key={key}
      data={story}
      isMyFavorite={(ids || []).includes(story.story_id)}
      onClickSeeMore={gotoDetail}
      onToggleFavorite={mutation.trigger as any}
    />
  );

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:max-w-[1000px] gap-6">
          {data.map(renderItem)}
        </div>
      ) : (
        <HnEmpty Icon={Newspaper} label="No story" />
      )}
    </>
  );
}
