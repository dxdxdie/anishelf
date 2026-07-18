"use client";

import { useTopAnime } from "@/hooks/use-top-anime";
import { AnimeCard } from "./anime-card";

export default function TopAnimeList() {
    const { data, isLoading, isError, error } = useTopAnime();

    if (isLoading) {
        return <p>Загрузка...</p>;
    }
    if (isError) {
        return <p>Ошибка {error.message}</p>;
    }
    if (!data) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((element) => (
              <AnimeCard key={element.mal_id} anime={element} />
            ))}
      </div>
    );
}
