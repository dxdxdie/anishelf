import { Anime } from "@/types/anime"
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

type AnimeCardProps = {
    anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
    return (
        <Card>
            <div className="relative h-64 w-full">
                <Image
                    fill
                    unoptimized
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="object-cover object-top"
                />
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1" title={anime.title}>{anime.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
                <ul>
                    <li>
                       {anime.status}
                    </li>
                    <li>
                        {anime.episodes !== null ? `${anime.episodes} ${anime.episodes === 1 ? "episode" : "episodes"}` : "No episodes yet"}
                    </li>
                    <li>
                      {anime.aired.string}
                    </li>
                </ul>
                <div className="flex flex-wrap gap-1">
                    {anime.genres.slice(0,3).map((genre) => <Badge key={genre.mal_id}>{genre.name}</Badge>)}
                </div>
            </CardContent>
            <CardFooter>
              <Badge>{anime.score !== null ? anime.score : "This anime has not been rated yet"}</Badge>
            </CardFooter>
        </Card>
    );
}
