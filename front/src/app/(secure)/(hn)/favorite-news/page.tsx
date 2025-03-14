/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import HnStoriesList from "@/components/custom/HnStoriesList";

import useFavoriteStoriesSWR, {
  useFavoriteStoryIdsSWR,
} from "@/hooks/useFavoriteStoriesSWR";
import HnError from "@/components/custom/HnError";
import HnLoader from "@/components/custom/HnLoader";

export default function FavoriteStoriesPage() {
  const ids = useFavoriteStoryIdsSWR();
  const swr = useFavoriteStoriesSWR();

  const data = useMemo(
    () => swr.data?.filter((i: any) => ids.data?.includes(i.story_id)),
    [ids.data]
  );

  return (
    <>
      <HnError error={swr.error} />
      <HnLoader isLoading={swr.isLoading} />
      {swr.canRender && <HnStoriesList data={(data as StoryType[]) || []} />}
    </>
  );
}
