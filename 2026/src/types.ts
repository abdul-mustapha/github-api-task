export interface Repository {
  id: number;
  full_name: string;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export type SortOption = "best-match" | "stars" | "forks" | "updated";

export interface SearchParams {
  query: string;
  language: string;
  sort: SortOption;
}
