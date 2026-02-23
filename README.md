# GitHub Repository Search

Search, filter, and explore GitHub repositories. Built with React 19, TypeScript, and Vite.

## Stack

- React 19 + TypeScript
- Vite
- Mantine v8 (UI components)
- TanStack Query (`useInfiniteQuery` for infinite scroll)
- Lucide React (icons)
- react-markdown (README rendering)

## Getting started

```bash
cd 2026
npm install
npm run dev
```

Opens at http://localhost:5173.

## GitHub token (optional)

Add a `VITE_GITHUB_TOKEN` to your `.env` in `2026/` for higher rate limits.

## What it does

Type in the search bar and results show up live (debounced 500ms). You can filter by language and sort by stars, forks, or last updated. Results load more as you scroll down (infinite scroll). Click a card to open a modal with full repo details and the rendered README.

Dark/light mode toggle in the top right, defaults to your system preference.

## Build

```bash
npm run build
npm run preview
```

## Original version

The `2022/` folder has the original submission from 2022 (CRA, React 18, JavaScript, Tailwind v3).
