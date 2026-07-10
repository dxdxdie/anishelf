import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { QueryProvider } from "@/components/providers/query-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
    title: {
        default: "Anishelf - your anime collection",
        template: "%s | AniShelf",
    },
    description: "AniShelf — a web application for searching, tracking and organizing anime titles. Data from the Jikan API (MyAnimeList), personal library with browsing statuses, real-time search.",
    keywords: [
        "anishelf",
        "аниме трекер",
        "myanimelist",
        "jikan api",
        "список аниме",
        "anime tracker"
    ],
    authors: [{ name: "dxdxdie", url: "https://github.com/dxdxdie" }],
    openGraph: {
        title: "Anishelf - your anime collection",
        description: "Search, add and track anime titles in a convenient library ",
        url: "https://anishelf-bay.vercel.app",
        siteName: "AniShelf",
        locale: "en_EN",
        type: "website"
    },
    icons: {
        icon: "/favicon.ico"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={cn("dark", "font-sans", geist.variable)}>
            <body className="bg-zinc-950 text-zinc-100 min-h-screen">
                <Header />
                <QueryProvider>{children}</QueryProvider>
                <Footer />
            </body>
        </html>
    );
}
