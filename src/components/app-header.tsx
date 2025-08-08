
import { HeartCrack } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-white/10">
      <Link href="/profile" className="flex items-center gap-3">
        <HeartCrack className="text-primary size-8" />
        <h1 className="text-3xl font-headline font-bold text-primary">
          404Love
        </h1>
      </Link>
    </header>
  );
}
