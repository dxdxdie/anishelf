"use client";

import { useQuery } from "@tanstack/react-query";
import { getTopAnime } from "@/lib/jikan";

export function useTopAnime() {
    return useQuery({
        queryKey: ["anime", "top"],
        queryFn: () => getTopAnime(12),
    });
}
