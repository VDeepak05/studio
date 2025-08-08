
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { MessageSquare } from "lucide-react";

export default function CommentsPage() {
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
                <MessageSquare className="text-primary" />
                Your Comments: Shouting into the Void
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground space-y-4">
              <p className="text-6xl animate-bounce">🕳️</p>
              <p>You've made no comments. Are you the silent type, or just saving your wit for a worthy audience? (Spoiler: you won't find one here.)</p>
              <p>Your comment history is as blank as your weekend plans.</p>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
