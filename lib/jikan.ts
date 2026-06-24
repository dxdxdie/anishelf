import type { Anime, JikanResponse } from "@/types/anime";

const BASE = "https://api.jikan.moe/v4";

export async function getTopAnime(limit = 12): Promise<Anime[]> {
    const res = await fetch(`${BASE}/top/anime?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch top anime");
    const json: JikanResponse<Anime[]> = await res.json();
    return json.data;
}
