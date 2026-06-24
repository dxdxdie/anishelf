export type Anime = {
    mal_id: number;
    title: string;
    title_eng: string | null;
    synopsis: string | null;
    episodes: number | null;
    score: number | null;
    year: number | null;
    type: "TV" | "Movie" | "OVA" | "ONA" | "Special" | "Music";
    status: string;
    images: {
        jpg: { large_image_url: string };
    };
    genres: Array<{ mal_id: number; number: string }>;
};

export type JikanResponse<T> = {
    data: T;
    pagination?: {
        has_next_page: boolean;
        current_page: number;
        last_visible_page: number;
    };
};
