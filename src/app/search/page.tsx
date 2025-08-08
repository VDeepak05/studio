
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-3xl">
                <Search className="text-primary" />
                Search for More Disappointment
              </CardTitle>
              <CardDescription>
                Use our state-of-the-art search engine to find exactly what you're not looking for.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input placeholder="Enter a name, hobby, or red flag..." className="bg-card"/>
                    <Button>Search</Button>
                </div>
                <div className="text-center text-muted-foreground pt-8 space-y-4">
                    <p className="text-6xl animate-spin">⚙️</p>
                    <p>Our search algorithm is currently powered by a hamster on a wheel. He's taking a break.</p>
                    <p>Try searching for "low standards" or "emotionally unavailable." You might get more results.</p>
                </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
