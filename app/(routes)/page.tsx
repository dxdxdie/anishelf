import { getTopAnime } from "@/lib/jikan";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import TopAnimeList from "@/components/features/anime/top-anime-list";

export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["anime", "top"],
        queryFn: () => getTopAnime(12),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TopAnimeList />
        </HydrationBoundary>
    );
}
