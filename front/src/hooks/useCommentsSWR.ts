import { hnFetcher } from "@/lib/axiosInstances";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useCommentsSWR() {
  const { id } = useParams();
  const [result, setResult] = useState<CommentType[][]>([]);
  const [state, setState] = useState({
    nbPages: 0,
    nextPage: 2,
    page: 1,
  });

  const swr = useSWR<StoryHnApiType<CommentType>>(
    `/search_by_date?tags=comment,story_${id}&page=${state.page}`,
    hnFetcher
  );

  useEffect(() => {
    if (!!swr.data) {
      const page = swr.data?.page as number;
      const hits = swr.data?.hits as CommentType[];

      setResult((v) => {
        if (hits.length) v[page - 1] = hits;

        return [...v];
      });

      setState((v) => ({
        ...v,
        nextPage: page + 1,
        nbPages: swr.data?.nbPages as number,
      }));
    }
  }, [swr.data]);

  const loadNextPage = async () =>
    setState((v) => ({ ...v, page: v.nextPage }));

  return {
    ...swr,
    result: result.flat(),
    canRender: !swr.isLoading && !swr.error,
    hasData: !!result.length,
    isFirstLoading: swr.isLoading && !result.length,
    isLoadingNextPage: swr.isLoading && !!result.length,
    hasNextPage: state.page < state.nbPages,
    loadNextPage,
  };
}
