
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Search, Ghost } from "lucide-react";
import { fakeUsers, FakeUser } from "@/lib/fake-users";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FakeUser[]>(fakeUsers);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (!searchQuery) {
      setSearchResults(fakeUsers);
      return;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    const results = fakeUsers.filter(user => 
        user.username.toLowerCase().includes(lowercasedQuery) || 
        user.bio.toLowerCase().includes(lowercasedQuery) ||
        user.traits.some(trait => trait.toLowerCase().includes(lowercasedQuery))
    );
    setSearchResults(results);
  };

  return (
    <>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 md:p-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-3xl">
                <Search className="text-primary" />
                Search for More Disappointment
              </CardTitle>
              <CardDescription>
                Use our state-of-the-art search engine to find exactly what you're not looking for. Try searching for "aliens", "tacos", or "bad decisions".
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter a name, hobby, or red flag..." 
                  className="bg-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
              <div className="pt-8">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {searchResults.map((user) => (
                      <Card key={user.id} className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
                        <CardHeader className="items-center">
                          <Image
                            src={user.avatar}
                            alt={`Avatar of ${user.username}`}
                            width={80}
                            height={80}
                            className="size-20 rounded-full border-4 border-primary object-cover"
                            data-ai-hint="profile avatar"
                          />
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="font-bold text-lg font-headline">{user.username}</p>
                          <p className="text-sm text-muted-foreground truncate">{user.bio}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full">
                            <Link href={`/view-others/${user.username}`}>View Profile</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  hasSearched && (
                    <div className="text-center text-muted-foreground space-y-4">
                        <Ghost className="mx-auto size-24 animate-bounce text-primary"/>
                        <p className="text-xl font-bold">No Souls Found</p>
                        <p>Your search for "{searchQuery}" yielded no results. It seems even our fake users have standards.</p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
