"use client";

import { useTopAnime } from "@/hooks/use-top-anime";

export default function Home() {
    const { data, isLoading, isError, error } = useTopAnime();

    if (isLoading) {
        return <p>Загрузка...</p>;
    }
    if (isError) {
        return <p>Ошибка {error.message}</p>;
    }
    if (!data) return null;

    return (
        <ul>
            {data.map((element) => (
                <li key={element.mal_id}>{element.title}</li>
            ))}
        </ul>
    );
}
