import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Compass className="h-10 w-10" strokeWidth={1.5} />
        <span className="text-6xl font-bold tracking-tight text-foreground">
          404
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Тайтл не найден</h1>
        <p className="max-w-md text-muted-foreground">
          There does not appear to be such a page —the anime may have been removed from
          the directory or link was entered incorrectly.
        </p>
      </div>

      <Button size="lg">
        <Link href="/">Return to main page</Link>
      </Button>
    </div>
  );
}
