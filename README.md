<div align="center">


<img src="https://img.shields.io/badge/Next.js-16-36454F?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/React-19-708090?style=flat-square&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-strict-36454F?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/TanStack_Query-v5-708090?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack Query" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-36454F?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/status-in_progress-708090?style=flat-square" alt="Status" />

# AniShelf

A learning project — an anime tracker built with Next.js (App Router), powered by the public [Jikan API](https://jikan.moe/) (an unofficial REST API for MyAnimeList).

[**Live Demo**](https://anishelf-bay.vercel.app) · [Report an Issue](https://github.com/dxdxdie/anishelf/issues)

</div>

<br />

## About

AniShelf is a personal portfolio project built while learning the Next.js App Router, TanStack Query, and shadcn/ui in practice. It fetches and displays anime data from the Jikan API, with a focus on getting core patterns right — Server/Client Component boundaries, query caching and hydration, and clean component composition — rather than shipping every feature at once.

## Tech Stack

| Layer         | Technology                                                   |
| ------------- | ------------------------------------------------------------ |
| Framework     | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)    |
| UI Library    | React 19                                                     |
| Language      | TypeScript (`strict`, `noUncheckedIndexedAccess`)            |
| Data Fetching | [TanStack Query](https://tanstack.com/query/latest)          |
| Styling       | Tailwind CSS 4                                               |
| Components    | [shadcn/ui](https://ui.shadcn.com/) (preset: Nova, base color: Zinc) |
| Data Source   | [Jikan API](https://jikan.moe/) (unofficial MyAnimeList REST API) |
| Hosting       | Vercel                                                       |

## Project Structure

```
anishelf/
├── app/
│   └── (routes)/          # pages: home, search, library, profile
├── components/
│   ├── layout/             # Header, Footer
│   ├── providers/          # QueryClientProvider setup
│   └── ui/                 # shadcn/ui primitives (card, badge, button, skeleton)
├── hooks/                  # data-fetching hooks (useTopAnime, etc.)
├── lib/
│   └── jikan.ts             # Jikan API client
├── types/
│   └── anime.ts              # Jikan API response types
└── public/                  # static assets
```

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build for production         |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

## Architecture Notes

A few implementation details worth calling out, since they were the main learning goals of this project:

- **Server-first data fetching** — the home page is an `async` Server Component that calls `prefetchQuery`, then passes dehydrated state to a `HydrationBoundary`. The Client Component underneath (`TopAnimeList`) picks up the cached data with no loading flash and no duplicate client-side fetch.
- **Query caching** — `staleTime` and `gcTime` are tuned deliberately, and request deduplication was verified directly in TanStack Query Devtools rather than assumed.
- **Type-safe API layer** — `lib/jikan.ts` wraps the Jikan API behind typed functions (`getTopAnime`, etc.), with response shapes defined in `types/anime.ts` using a generic `JikanResponse<T>`.

## Roadmap

- [x] Project bootstrap, routing, and layout
- [x] Typed Jikan API client
- [x] TanStack Query integration (caching, dedup, devtools)
- [x] Server/Client Component hydration pattern
- [x] Route conventions (`loading.tsx`, `error.tsx`) + shadcn/ui components
- [x] Deployed to Vercel
- [ ] `not-found.tsx`
- [ ] Search page with debounced query
- [ ] Library page with Supabase auth + mutations (add/remove, status tracking)
- [ ] Polished metadata & Open Graph tags

## Known Issues

- `next/image` optimization occasionally fails locally behind a system/WSL proxy (`unoptimized` is used as a workaround in dev); this hasn't reproduced on the Vercel deployment.
- Header logo is a placeholder size — final branding assets are in progress.

## License

This is a personal learning project — not currently licensed for reuse.
