
"use client"

import { useSidebar } from "./ui/sidebar";
import { HeartCrack } from "lucide-react";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="py-6 px-4 md:px-8 border-b flex items-center gap-4">
      <div onClick={toggleSidebar} className="flex items-center gap-3 p-2 cursor-pointer -ml-2">
          <HeartCrack className="text-primary size-8" />
          <h1 className="text-2xl font-headline font-bold text-primary">
              404Love
          </h1>
      </div>
    </header>
  );
}
