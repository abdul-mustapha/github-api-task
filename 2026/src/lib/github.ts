import type { GitHubSearchResponse, SearchParams } from "@/types";

function getHeaders(accept = "application/vnd.github+json"): HeadersInit {
  const headers: HeadersInit = { Accept: accept };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function searchRepositories(
  params: SearchParams,
  page = 1
): Promise<GitHubSearchResponse> {
  const { query, language, sort } = params;

  let q = query;
  if (language) {
    q += `+language:${language}`;
  }

  const url = new URL("https://api.github.com/search/repositories");
  url.searchParams.set("q", q);
  url.searchParams.set("per_page", "30");
  url.searchParams.set("page", String(page));
  if (sort && sort !== "best-match") {
    url.searchParams.set("sort", sort);
    url.searchParams.set("order", "desc");
  }

  const response = await fetch(url.toString(), {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchReadme(fullName: string): Promise<string> {
  const response = await fetch(
    `https://api.github.com/repos/${fullName}/readme`,
    { headers: getHeaders("application/vnd.github.raw+json") }
  );

  if (!response.ok) {
    if (response.status === 404) return "";
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.text();
}
