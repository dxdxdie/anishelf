export type Anime = {
    mal_id: number;
    title: string;
    title_english?: string | null;
    title_japanese?: string | null;
    synopsis: string | null;
    episodes: number | null;
    score: number | null;
    type: "TV" | "Movie" | "OVA" | "ONA" | "Special" | "Music";
    status: string;
    aired: {
        from: string | null;
        string: string;
    };
    images: {
        jpg: { large_image_url: string };
    };
    genres: Array<{ mal_id: number; name: string }>;
};

export type JikanResponse<T> = {
    data: T;
    pagination?: {
        has_next_page: boolean;
        current_page: number;
        last_visible_page: number;
    };
};
