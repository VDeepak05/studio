
import { HeartCrack } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";

export function AppHeader() {
  return (
    <header className="py-6 px-4 md:px-8 border-b flex items-center gap-4">
      <SidebarTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
          <HeartCrack className="text-primary size-8" />
          <h1 className="text-2xl font-headline font-bold text-primary">
            404Love
          </h1>
        </div>
      </SidebarTrigger>
    </header>
  );
}
