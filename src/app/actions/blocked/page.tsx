
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Ban } from "lucide-react";

export default function BlockedPage() {
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
                <Ban className="text-primary" />
                Your Blocked List: The Abyss
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground space-y-4">
              <p className="text-6xl animate-pulse">🚫</p>
              <p>You haven't blocked anyone yet. Your tolerance is admirable, but ultimately futile here.</p>
              <p>This list is emptier than your inbox.</p>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
