
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { ThumbsDown } from "lucide-react";

export default function DislikesPage() {
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
                <ThumbsDown className="text-primary" />
                Your Dislikes: A Growing Graveyard
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground space-y-4">
              <p className="text-6xl animate-bounce">🗑️</p>
              <p>You haven't disliked anyone yet. Don't be shy, your disapproval is a gift. Go on, crush some digital dreams.</p>
              <p>This page is currently emptier than a politician's promise.</p>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
