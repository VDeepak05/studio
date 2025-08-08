
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Users } from "lucide-react";

export default function ViewOthersPage() {
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
                <Users className="text-primary" />
                Behold! The Gallery of Ghosters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground space-y-4">
              <p className="text-6xl">👻</p>
              <p>There are no other users to display. It seems you're the only one brave (or foolish) enough to be here.</p>
              <p>Either that, or everyone else has already found their perfectly incompatible match and deleted the app in a fit of rage. Your turn soon!</p>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
