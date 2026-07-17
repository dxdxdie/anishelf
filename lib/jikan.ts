import type { Anime, JikanResponse } from "@/types/anime";

const BASE = "https://api.jikan.moe/v4";

export async function getTopAnime(limit = 12): Promise<Anime[]> {
    const res = await fetch(`${BASE}/top/anime?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch top anime");
    const json: JikanResponse<Anime[]> = await res.json();
    return json.data;
}

export async function searchAnime(
    query: string,
    limit: number,
): Promise<Anime[]> {
    if (!query) return [];

    const params = new URLSearchParams();
    params.set("q", query);
    params.set("limit", limit.toString());
    const updParams = params.toString();

    const res = await fetch(`${BASE}/anime?${updParams}`);
    if (!res.ok) throw new Error("Failed to fetch anime or anime not found");
    const json: JikanResponse<Anime[]> = await res.json();
    return json.data;
}

export async function getAnimeById(id: number) {
    const res = await fetch(`${BASE}/anime/${id}`);
    if (!res.ok) throw new Error("Failed to fetch anime or anime not found");
    const json: JikanResponse<Anime> = await res.json();
    return json.data;
}
