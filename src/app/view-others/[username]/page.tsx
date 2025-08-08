
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { fakeUsers } from "@/lib/fake-users";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ban, Heart, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function FakeUserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const username = params.username as string;
    const user = fakeUsers.find(u => u.username === username);
    const [comment, setComment] = useState("");

    if (!user) {
        return (
          <>
            <Sidebar>
                <AppSidebar />
            </Sidebar>
            <SidebarInset>
                <AppHeader />
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-2xl font-bold">User not found!</p>
                    <Button onClick={() => router.back()} className="mt-4">
                        <ArrowLeft className="mr-2"/>
                        Go Back
                    </Button>
                </div>
            </SidebarInset>
          </>
        );
    }
    
    const handleAskOut = () => {
        toast({
            title: `Asking out ${user.username}...`,
            description: "Hold your breath. Or don't. It won't change the outcome.",
        });

        setTimeout(() => {
            const storedStats = localStorage.getItem("404love_stats");
            const currentStats = storedStats ? JSON.parse(storedStats) : { rejects: 0, leftSwipes: 0 };
            const newStats = { ...currentStats, rejects: currentStats.rejects + 1 };
            localStorage.setItem("404love_stats", JSON.stringify(newStats));
            
            // Store rejected user to remove them from the list
            const rejectedUsers = JSON.parse(localStorage.getItem("404love_rejected") || "[]");
            rejectedUsers.push(user.id);
            localStorage.setItem("404love_rejected", JSON.stringify(rejectedUsers));

            toast({
                title: "It's a No.",
                description: `Shocker! ${user.username} rejected you. Your rejection count has been updated accordingly.`,
                variant: "destructive",
            });
            // Go back to the gallery to see the updated list
            router.push('/view-others');
        }, 3000); // 3-second delay for dramatic effect
    };

    const handleAction = (action: string) => {
        toast({
            title: `You tried to ${action} ${user.username}`,
            description: "Your attempt has been noted and will be used against you in the court of digital love. Nothing actually happened.",
            variant: action === 'Block' ? "destructive" : "default"
        })
    };
    
    const handlePostComment = () => {
        if (!comment.trim()) {
            toast({
                title: "Empty Comment",
                description: "You can't just post nothing. This isn't a modern art gallery.",
                variant: "destructive",
            });
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem("404love_user") || "{}");
        if (!currentUser.username) {
            toast({
                title: "Error",
                description: "You need to be logged in to leave a comment. Or do you?",
                variant: "destructive"
            });
            return;
        }

        const allComments = JSON.parse(localStorage.getItem("404love_comments") || "[]");
        const newComment = {
            id: Date.now(),
            fromUser: currentUser.username,
            toUser: user.username,
            comment: comment.trim(),
            timestamp: new Date().toISOString(),
        };
        allComments.push(newComment);
        localStorage.setItem("404love_comments", JSON.stringify(allComments));
        
        setComment("");
        toast({
            title: "Comment Posted!",
            description: `You've successfully shouted into the void at ${user.username}. They probably won't see it.`,
        });
    }

    return (
        <>
            <Sidebar>
                <AppSidebar />
            </Sidebar>
            <SidebarInset>
                <div className="min-h-screen flex flex-col">
                    <AppHeader />
                    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
                        <Card className="w-full max-w-md animate-fade-in-up">
                        <CardHeader className="items-center text-center">
                            <Image
                                src={user.avatar}
                                alt={`Profile picture of ${user.username}`}
                                width={128}
                                height={128}
                                className="size-32 rounded-full border-4 border-primary object-cover bg-secondary"
                                data-ai-hint="profile avatar"
                            />
                            <CardTitle className="font-headline text-3xl mt-4">{user.username}</CardTitle>
                            <CardDescription className="text-lg px-2">{user.bio}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="border-t pt-6">
                                <h3 className="font-bold mb-2 text-primary text-center">Ridiculous Traits</h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {user.traits.map(trait => <Badge key={trait} variant="secondary">{trait}</Badge>)}
                                </div>
                            </div>
                             <div>
                                <h3 className="font-bold mb-2 text-primary text-center">Emotional Baggage</h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {user.baggage.map(item => <Badge key={item} variant="outline">{item}</Badge>)}
                                </div>
                            </div>
                            <div className="border-t pt-6">
                                <h3 className="font-bold mb-2 text-primary text-center">Leave a Comment</h3>
                                <div className="space-y-2">
                                <Textarea 
                                    placeholder={`Say something nice... or don't. We're not your mom.`}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="bg-card"
                                />
                                <Button className="w-full" onClick={handlePostComment}>
                                    <MessageSquare className="mr-2" />
                                    Post Your Nonsense
                                </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <div className="flex gap-2 w-full">
                                <Button className="w-full" onClick={() => handleAction('Like')}>
                                    <ThumbsUp className="mr-2" />
                                    Like
                                </Button>
                                <Button variant="secondary" className="w-full" onClick={() => handleAction('Dislike')}>
                                    <ThumbsDown className="mr-2" />
                                    Dislike
                                </Button>
                                <Button variant="destructive" className="w-full" onClick={() => handleAction('Block')}>
                                    <Ban className="mr-2" />
                                    Block
                                </Button>
                            </div>
                            <Button variant="outline" className="w-full" onClick={handleAskOut}>
                                <Heart className="mr-2"/>
                                Ask to Date (and get rejected)
                            </Button>
                             <Button onClick={() => router.back()} className="w-full mt-2" variant="ghost">
                                <ArrowLeft className="mr-2"/>
                                Back to the Gallery
                            </Button>
                        </CardFooter>
                        </Card>
                    </main>
                </div>
            </SidebarInset>
        </>
    )
}
