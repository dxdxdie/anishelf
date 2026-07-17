import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          AniShelf © {currentYear}. Pet project to track anime titles.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/dxdxdie/anishelf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}
