
"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { MessageSquare, HeartCrack } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fakeUsers } from "@/lib/fake-users";

interface Comment {
  id: number;
  fromUser: string;
  toUser: string;
  comment: string;
  timestamp: string;
}

export default function CommentsPage() {
  const [myComments, setMyComments] = useState<Comment[]>([]);
  const [commentsOnMyProfile, setCommentsOnMyProfile] = useState<Comment[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("404love_user");
    if (userString) {
      const user = JSON.parse(userString);
      setUsername(user.username);
      
      const allComments: Comment[] = JSON.parse(localStorage.getItem("404love_comments") || "[]");
      
      const userComments = allComments.filter(c => c.fromUser === user.username).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      const profileComments = allComments.filter(c => c.toUser === user.username).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setMyComments(userComments);
      setCommentsOnMyProfile(profileComments);
    }
  }, []);

  const getUserAvatar = (username: string) => {
    const user = fakeUsers.find(u => u.username === username);
    return user ? user.avatar : "https://placehold.co/128x128.png";
  };
  
  const getMyAvatar = () => {
     const avatar = localStorage.getItem("404love_avatar");
     return avatar || "https://placehold.co/128x128.png"
  }


  return (
    <>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-3xl">
                <MessageSquare className="text-primary" />
                Your Comments: Echoes in the Abyss
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="my-comments">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="my-comments">Comments You've Left</TabsTrigger>
                  <TabsTrigger value="comments-on-my-profile">Comments On Your Profile</TabsTrigger>
                </TabsList>
                <TabsContent value="my-comments" className="mt-4">
                  {myComments.length > 0 ? (
                    <div className="space-y-4">
                      {myComments.map(comment => (
                         <div key={comment.id} className="flex items-start gap-4 p-4 border rounded-lg">
                           <Avatar>
                            <AvatarImage src={getMyAvatar()} alt={comment.fromUser} data-ai-hint="profile avatar" />
                            <AvatarFallback>{comment.fromUser.substring(0,2)}</AvatarFallback>
                          </Avatar>
                           <div className="flex-1">
                            <p className="font-semibold">You commented on {comment.toUser}'s profile:</p>
                            <p className="text-muted-foreground italic">"{comment.comment}"</p>
                            <p className="text-xs text-muted-foreground/50 mt-1">{new Date(comment.timestamp).toLocaleString()}</p>
                           </div>
                         </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground space-y-4 p-8">
                      <p className="text-6xl animate-bounce">🕳️</p>
                      <p>You've made no comments. Are you the silent type, or just saving your wit for a worthy audience? (Spoiler: you won't find one here.)</p>
                      <p>Your comment history is as blank as your weekend plans.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="comments-on-my-profile" className="mt-4">
                   {commentsOnMyProfile.length > 0 ? (
                    <div className="space-y-4">
                      {commentsOnMyProfile.map(comment => (
                         <div key={comment.id} className="flex items-start gap-4 p-4 border rounded-lg">
                           <Avatar>
                            <AvatarImage src={getUserAvatar(comment.fromUser)} alt={comment.fromUser} data-ai-hint="profile avatar" />
                            <AvatarFallback>{comment.fromUser.substring(0,2)}</AvatarFallback>
                          </Avatar>
                           <div className="flex-1">
                            <p className="font-semibold">{comment.fromUser} commented on your profile:</p>
                            <p className="text-muted-foreground italic">"{comment.comment}"</p>
                            <p className="text-xs text-muted-foreground/50 mt-1">{new Date(comment.timestamp).toLocaleString()}</p>
                           </div>
                         </div>
                      ))}
                    </div>
                  ) : (
                     <div className="text-center text-muted-foreground space-y-4 p-8">
                        <HeartCrack className="mx-auto size-24 animate-pulse text-destructive"/>
                        <p className="text-xl font-bold">Crickets...</p>
                        <p>No one has commented on your profile. It's not you, it's... okay, it's probably you.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </>
  );
}
