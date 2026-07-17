import { getAnimeById } from "@/lib/jikan";
import { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const anime = await getAnimeById(Number(id));
    return { title: anime.title, description: anime.synopsis };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const anime = await getAnimeById(Number(id));

    return (
        <div>
            <div>
                <h1>{anime.title}</h1>
                {anime.title_english && anime.title_english !== anime.title ? (
                    <h2>{anime.title_english}</h2>
                ) : null}
                {anime.title_japanese ? <p>{anime.title_japanese}</p> : null}
            </div>
            <div className="relative aspect-2/3 w-full max-w-75">
                <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    fill
                    className="object-cover object-top"
                />
            </div>
            <div>
                <ul>
                    <li>{anime.status}</li>
                    <li>
                        {anime.episodes !== null
                            ? `${anime.episodes} ${anime.episodes === 1 ? "episode" : "episodes"}`
                            : "No episodes yet"}
                    </li>
                    <li>{anime.aired.string}</li>
                </ul>
                {anime.genres.map((genre) => (
                    <Badge key={genre.mal_id}>{genre.name}</Badge>
                ))}
            </div>
            <div></div>
        </div>
    );
};

export default Page;
