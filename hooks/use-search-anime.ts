import { useQuery } from "@tanstack/react-query"
import { searchAnime } from "@/lib/jikan"

export function useSearchAnime(debouncedValue: string) {
    return useQuery({
        enabled: !!debouncedValue,
        queryKey: ["anime", "search", debouncedValue],
        queryFn: () => searchAnime(debouncedValue, 3),
    })
}
