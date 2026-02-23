import { useInfiniteQuery } from "@tanstack/react-query";
import { searchRepositories } from "@/lib/github";
import type { SearchParams } from "@/types";

export function useGitHubSearch(params: SearchParams) {
  return useInfiniteQuery({
    queryKey: ["github-search", params.query, params.language, params.sort],
    queryFn: ({ pageParam }) => searchRepositories(params, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.length * 30;
      if (fetched >= lastPage.total_count || fetched >= 1000) return undefined;
      return allPages.length + 1;
    },
    enabled: params.query.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
