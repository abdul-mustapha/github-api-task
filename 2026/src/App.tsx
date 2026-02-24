import { useState, useRef, useCallback } from "react";
import { Container, SimpleGrid, Text, Stack, Loader, Center } from "@mantine/core";
import { Search } from "lucide-react";
import type { SearchParams, Repository } from "@/types";
import { useGitHubSearch } from "@/hooks/use-github-search";
import { Navbar } from "@/components/navbar";
import { SearchForm } from "@/components/search-form";
import { RepoCard } from "@/components/repo-card";
import { RepoCardSkeleton } from "@/components/repo-card-skeleton";
import { RepoModal } from "@/components/repo-modal";
import { NoResults } from "@/components/no-results";

const defaultParams: SearchParams = {
  query: "",
  language: "",
  sort: "best-match",
};

export default function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultParams);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGitHubSearch(searchParams);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const bottomRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      });

      observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage]
  );

  const allRepos = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.total_count ?? 0;
  const hasSearch = searchParams.query.length > 0;

  return (
    <>
      <Navbar />

      <Container size="lg" py="md">
        <Stack gap="md">
          <SearchForm
            params={searchParams}
            onChange={setSearchParams}
            onClear={() => setSearchParams(defaultParams)}
          />

          <SearchResults
            hasSearch={hasSearch}
            isLoading={isLoading}
            allRepos={allRepos}
            totalCount={totalCount}
            query={searchParams.query}
            onSelectRepo={setSelectedRepo}
            bottomRef={bottomRef}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Stack>
      </Container>

      {selectedRepo && (
        <RepoModal
          repo={selectedRepo}
          opened
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </>
  );
}

interface SearchResultsProps {
  hasSearch: boolean;
  isLoading: boolean;
  allRepos: Repository[];
  totalCount: number;
  query: string;
  onSelectRepo: (repo: Repository) => void;
  bottomRef: (node: HTMLDivElement | null) => void;
  isFetchingNextPage: boolean;
}

function SearchResults({
  hasSearch,
  isLoading,
  allRepos,
  totalCount,
  query,
  onSelectRepo,
  bottomRef,
  isFetchingNextPage,
}: SearchResultsProps) {
  if (!hasSearch) {
    return (
      <Stack align="center" py={80}>
        <Search size={40} color="var(--mantine-color-dimmed)" />
        <Text size="lg" fw={600} c="dimmed">
          Start typing to search GitHub repositories
        </Text>
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  if (allRepos.length === 0) {
    return <NoResults query={query} />;
  }

  return (
    <>
      <Text size="sm" c="dimmed">
        Showing {allRepos.length} of {totalCount.toLocaleString()} results
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {allRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            onClick={() => onSelectRepo(repo)}
          />
        ))}
      </SimpleGrid>

      <div ref={bottomRef} style={{ padding: "2rem 0" }}>
        {isFetchingNextPage && (
          <Center>
            <Loader size="sm" />
          </Center>
        )}
      </div>
    </>
  );
}
