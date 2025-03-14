"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import HnCommentsList from "@/components/custom/HnCommentsList";
import useCommentsSWR from "@/hooks/useCommentsSWR";
import HnLoader from "@/components/custom/HnLoader";
import HnError from "@/components/custom/HnError";
import HnNextPageButton from "@/components/custom/HnNextPageButton";

export default function StoryDetailPage() {
  const swr = useCommentsSWR();
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <>
      <Button onClick={goBack}>
        <ArrowLeft />
      </Button>
      <HnError error={swr.error} />
      <HnLoader isLoading={swr.isLoading} />
      {(swr.canRender || swr.hasData) && (
        <>
          <h1 className="text-lg border-b font-bold my-6">
            {swr.result[0]?.story_title}
          </h1>
          <HnCommentsList data={swr.result} />
          <div className="mt-6">
            <HnNextPageButton
              isShow={swr.hasNextPage}
              isLoading={swr.isLoadingNextPage}
              onClick={swr.loadNextPage}
            />
          </div>
        </>
      )}
    </>
  );
}
