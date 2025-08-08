
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { ThumbsUp } from "lucide-react";

export default function LikesPage() {
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
                <ThumbsUp className="text-primary" />
                Your Likes: An Empty Echo Chamber
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground space-y-4">
              <p className="text-6xl animate-pulse">💔</p>
              <p>You haven't liked anyone yet. Are you playing hard to get, or is your standard just... non-existent?</p>
              <p>This is the digital equivalent of staring at a wall. At least the wall doesn't judge you. Probably.</p>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
