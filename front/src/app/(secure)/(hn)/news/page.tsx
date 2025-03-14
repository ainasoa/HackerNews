/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import HnFilterComponent from "@/components/custom/HnFilterComponent";
import HnStoriesList from "@/components/custom/HnStoriesList";
import useStoriesSWR from "@/hooks/useStoriesSWR";
import HnError from "@/components/custom/HnError";
import HnLoader from "@/components/custom/HnLoader";
import HnNextPageButton from "@/components/custom/HnNextPageButton";

export default function StoriesPage() {
  const swr = useStoriesSWR();

  return (
    <div className="flex flex-col items-center gap-6">
      <HnFilterComponent
        sort={swr.sort as any}
        onSearch={swr.search}
        onFilter={swr.setFilter}
        onSort={swr.toggleSort}
      />
      <HnError error={swr.error} />
      <HnLoader isLoading={swr.isFirstLoading} />
      {(swr.hasData || swr.canRender) && (
        <>
          <HnStoriesList data={swr.result} />
          <HnNextPageButton
            isShow={swr.hasNextPage}
            isLoading={swr.isLoadingNextPage}
            onClick={swr.loadNextPage}
          />
        </>
      )}
    </div>
  );
}
