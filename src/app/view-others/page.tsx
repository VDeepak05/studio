
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Users } from "lucide-react";
import { fakeUsers, FakeUser } from "@/lib/fake-users";

const USERS_TO_SHOW = 100;

export default function ViewOthersPage() {
  const [displayedUsers, setDisplayedUsers] = useState<FakeUser[]>([]);

  useEffect(() => {
    const rejectedUserIds: number[] = JSON.parse(localStorage.getItem("404love_rejected") || "[]");
    
    const availableUsers = fakeUsers.filter(user => !rejectedUserIds.includes(user.id));
    
    // Shuffle the available users to get a random list each time
    const shuffledUsers = availableUsers.sort(() => 0.5 - Math.random());
    
    setDisplayedUsers(shuffledUsers.slice(0, USERS_TO_SHOW));
    
  }, []);

  return (
    <>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 md:p-8">
          <Card className="max-w-7xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 font-headline text-3xl">
                <Users className="text-primary" />
                Behold! The Gallery of Ghosters
              </CardTitle>
              <p className="text-muted-foreground pt-2">A curated collection of digital specters and romantic dead-ends. Choose wisely. Or don't.</p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {displayedUsers.map((user) => (
                <Card key={user.id} className="flex flex-col hover:shadow-primary/20 hover:shadow-lg transition-shadow">
                  <CardHeader className="items-center">
                     <Image
                        src={user.avatar}
                        alt={`Avatar of ${user.username}`}
                        width={96}
                        height={96}
                        className="size-24 rounded-full border-4 border-primary object-cover"
                        data-ai-hint="profile avatar"
                      />
                  </CardHeader>
                  <CardContent className="text-center flex-grow">
                     <p className="font-bold text-xl font-headline">{user.username}</p>
                     <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{user.bio}</p>
                  </CardContent>
                   <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/view-others/${user.username}`}>View Profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
