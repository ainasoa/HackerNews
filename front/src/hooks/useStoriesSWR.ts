import { hnFetcher } from "@/lib/axiosInstances";
import dateToSeconde from "@/lib/dateToSeconde";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const initialFilter = {
  nbPages: 0,
  nextPage: 2,
  page: 1,
  sort: "search_by_date",
  created_at_i: "",
  created_at_i2: "",
  points: "",
  num_comments: "",
  query: "",
};

export default function useStoriesSWR() {
  const [result, setResult] = useState<StoryType[][]>([]);
  const [state, setState] = useState({ ...initialFilter });

  const url = useMemo(() => createStoryURL(state), [state]);
  const swr = useSWR<StoryHnApiType<StoryType>>(url, hnFetcher);

  useEffect(() => {
    if (!!swr.data) {
      const page = swr.data?.page as number;
      const hits = swr.data?.hits as StoryType[];

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

  const toggleSort = async () => {
    setResult([]);
    setState((v) => ({
      ...v,
      sort: v.sort === "search_by_date" ? "search" : "search_by_date",
    }));
  };
  const setFilter = async (params: NumericFilterType) => {
    setResult([]);
    setState({ ...initialFilter, ...params });
  };

  const search = async (query: string) => {
    setResult([]);
    setState({ ...initialFilter, query });
  };

  const loadNextPage = async () =>
    setState((v) => ({ ...v, page: v.nextPage }));

  return {
    ...swr,
    sort: state.sort,
    isFirstLoading: swr.isLoading && !result.length,
    isLoadingNextPage: swr.isLoading && !!result.length,
    hasNextPage: state.page < state.nbPages,
    canRender: !swr.isLoading && !swr.error,
    hasData: !!result.length,
    result: result.flat(),
    loadNextPage,
    toggleSort,
    setFilter,
    search,
  };
}

function createStoryURL(state: typeof initialFilter) {
  let url = `/${state.sort}?tags=story&page=${state.page}&query=${state.query}`;
  const numericFilters = [];

  if (state.points) numericFilters.push(`points${state.points}`);

  if (state.created_at_i)
    numericFilters.push(`created_at_i>${dateToSeconde(state.created_at_i)}`);

  if (state.created_at_i2)
    numericFilters.push(`created_at_i<${dateToSeconde(state.created_at_i2)}`);

  if (state.num_comments)
    numericFilters.push(`num_comments${state.num_comments}`);

  if (numericFilters.length)
    url += `&numericFilters=${numericFilters.join(",")}`;

  return url;
}
