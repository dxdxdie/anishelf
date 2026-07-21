<div align="center">

<img src="https://img.shields.io/badge/Next.js-15%2F16-36454F?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/React-19-708090?style=flat-square&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-strict-36454F?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/TanStack_Query-v5-708090?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack Query" />
<img src="https://img.shields.io/badge/Supabase-Auth_%2B_DB-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-36454F?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/status-in_progress-708090?style=flat-square" alt="Status" />

# AniShelf

A learning project — an anime tracker built with Next.js (App Router), with GitHub OAuth via Supabase and a custom BFF layer in front of a third-party anime data source.

[**Live Demo**](https://anishelf-bay.vercel.app) · [Report an Issue](https://github.com/dxdxdie/anishelf/issues)

</div>

<br />

## About

AniShelf is a personal portfolio project built while learning the Next.js App Router, TanStack Query, Supabase, and shadcn/ui in practice. The focus is on getting core patterns right — Server/Client Component boundaries, auth flows, query caching, and resilient data fetching — rather than shipping every feature at once.

The project deliberately documents its own evolution: architectural decisions, dead ends, and trade-offs are tracked as the project grows (see Roadmap and Architecture Notes below).

## Tech Stack

| Layer         | Technology                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------- |
| Framework     | [Next.js 15/16](https://nextjs.org/) (App Router)                                            |
| UI Library    | React 19                                                                                     |
| Language      | TypeScript (`strict`)                                                                        |
| Data Fetching | [TanStack Query](https://tanstack.com/query/latest) (v5)                                     |
| Auth & DB     | [Supabase](https://supabase.com/) (GitHub OAuth, Postgres, RLS)                              |
| Styling       | Tailwind CSS 4                                                                               |
| Components    | [shadcn/ui](https://ui.shadcn.com/)                                                          |
| Data Source   | Migrating from [Jikan API](https://jikan.moe/) to [AniList](https://anilist.co/) GraphQL API |
| Hosting       | Vercel                                                                                       |

## Project Structure

anishelf/

├── app/

│ ├── anime/[id]/ # anime details page (Server Component)

│ ├── auth/

│ │ ├── page.tsx # login page (GitHub OAuth trigger)

│ │ └── callback/ # route handler: code -> session exchange

│ ├── profile/ # protected route, renders user info

│ ├── library/ # protected route (in progress)

│ └── (routes)/ # home, search

├── components/

│ ├── features/

│ │ ├── auth/ # LogoutButton, ProfileDropdown

│ │ └── search/ # SearchInput, SearchDropdown, SearchBar

│ ├── layout/ # Header, Footer

│ └── ui/ # shadcn/ui primitives

├── hooks/ # useSearchAnime, useDebounce, etc.

├── lib/

│ └── jikan.ts # current API client (being replaced)

├── utils/

│ └── supabase/

│ ├── client.ts # browser client

│ └── server.ts # server client (async cookies)

├── middleware.ts # route protection (auth guard)

└── public/

## Getting Started

bash
npm install

npm run dev

Requires a `.env.local` with:
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build for production         |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint                   |

## Architecture Notes

- **Server-first data fetching** — pages that can be resolved on the server (e.g. anime details, profile) are `async` Server Components; auth state is read server-side via `supabase.auth.getUser()`, avoiding any client-side auth flicker.
- **Three separate Supabase clients** — a browser client (`utils/supabase/client.ts`), a server client with async `cookies()` (`utils/supabase/server.ts`), and a dedicated Edge-runtime client inside `middleware.ts` for route protection. Each has different cookie-handling requirements and cannot be merged into one.
- **Auth flow** — GitHub OAuth only (no email/password). `app/auth/page.tsx` triggers `signInWithOAuth`, `app/auth/callback/route.ts` exchanges the returned `code` for a session via `exchangeCodeForSession`. Without this exchange step, session cookies are never set and middleware treats the user as logged out.
- **Route protection** — `middleware.ts` redirects unauthenticated users away from `/profile` and `/library`, and redirects authenticated users away from `/auth`.
- **Composition over duplication** — `Header` is a Server Component that reads the session and conditionally renders either a `ProfileDropdown` (Client Component, handles its own open/close state and click-outside behavior) or a `Login` link — no auth state duplicated on the client.
- **Query caching** — search queries are debounced client-side and deduplicated by TanStack Query; loading/error states follow the `isPending` / `isFetching` / `isLoading` distinction introduced in v5.

## Known Issues & Ongoing Decisions

- **Jikan API instability** — the `/anime` endpoint has intermittent multi-day outages (504 Gateway Timeout), making search and detail pages unreliable. **Decision: migrating the data source to the [AniList GraphQL API](https://anilist.co/graphql)**, which is officially supported and far more stable.
- **BFF layer (in progress)** — introducing a Next.js Route Handler as a Backend-for-Frontend between the client and AniList: caches responses in a Supabase table, serves stale-but-available data if the upstream API fails, and shields the client from rate limits. Cache invalidation strategy (TTL vs. TTL + background refresh) is still being finalized.

## Roadmap

**Chapter 1 — MVP** ✅

- [x] Project bootstrap, routing, layout, metadata, `not-found.tsx`, footer

**Chapter 2 — Search** ✅

- [x] Typed API client, debounced search hook, search dropdown with a11y-correct markup
- [x] Anime details page (`app/anime/[id]`)

**Chapter 3 — Auth (Supabase)** — in progress

- [x] GitHub OAuth flow (login, callback, session exchange)
- [x] Route protection via middleware
- [x] Profile page (server-rendered user data)
- [x] Logout button with error handling
- [x] Profile dropdown in Header (avatar, click-outside, conditional rendering)
- [x] Rename `middleware.ts` → `proxy.ts` (Next.js convention update)

**Chapter 4 — Data source migration & BFF** — next up

- [ ] Migrate from Jikan REST to AniList GraphQL
- [ ] Route Handler BFF with Supabase-backed caching
- [ ] Cache invalidation strategy (TTL vs. TTL + background refresh)

**Chapter 5 — Library (Supabase DB)**

- [ ] `library` table schema + Row Level Security
- [ ] Add/remove anime, status tracking, mutations

**Chapter 6 — Polish**

- [ ] Prefill query cache on search-result click (`queryClient.setQueryData`)
- [ ] UI polish across all pages
- [ ] Stretch: paginated `/search` page

## License

This is a personal learning project — not currently licensed for reuse.
