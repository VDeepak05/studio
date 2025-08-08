
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateGlitchedAvatar } from "@/ai/flows/glitch-avatar";
import { generateMemeBio } from "@/ai/flows/meme-bio";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const ridiculousTraits = [
  "Fluent in Sarcasm",
  "Certified Overthinker",
  "Horoscope Believer",
  "Answers 'you too' to the waiter",
  "Has 17 browser tabs open",
];
const baggageItems = [
  "Ex's Netflix Password",
  "Fear of low battery",
  "Emotional support water bottle",
  "Unfinished side quests",
];
const popupJokes = [
  "Your soulmate is buffering...",
  "Your emotional baggage exceeds our limit.",
  "Did you mean to apply for therapy instead?",
  "Searching for matches... none found. Shocker."
]

const chartConfig = {
  rejects: {
    label: "Rejects",
    color: "hsl(var(--primary))",
  },
  leftSwipes: {
    label: "Dislikes",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [stats, setStats] = useState({ rejects: 0, leftSwipes: 0 });
  const [loading, setLoading] = useState(true);

  const handleRegenerate = () => {
    // Only remove answers and questions, keep stats
    localStorage.removeItem("404love_answers");
    localStorage.removeItem("404love_questions");
    router.push("/");
  };
  
  useEffect(() => {
    const userString = localStorage.getItem("404love_user");
    if (!userString) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(userString);
    setUsername(user.username);

    // Load stats from localStorage or initialize them if they don't exist at all
    const storedStats = localStorage.getItem("404love_stats");
    if (storedStats) {
      setStats(JSON.parse(storedStats));
    } else {
      const initialStats = { rejects: 0, leftSwipes: 0 };
      setStats(initialStats);
      localStorage.setItem("404love_stats", JSON.stringify(initialStats));
    }

    const answersString = localStorage.getItem("404love_answers");
    if (!answersString) {
      setBio("Welcome back to the void. Ready for another round of disappointment?");
      setAvatar("https://placehold.co/128x128.png");
      setLoading(false);
      return;
    }

    const answers = JSON.parse(answersString);
    const additionalInfo = Object.values(answers).join(' ') || "Loves chaos.";
    const avatarDescription = answers.potato || "A human face, probably.";
    
    // Generate and store avatar if it doesn't exist
    const storedAvatar = localStorage.getItem("404love_avatar");
    if (storedAvatar) {
        setAvatar(storedAvatar);
    } else {
        generateGlitchedAvatar({ description: `A glitched, distorted, surrealist portrait of a person. Their most notable trait is: ${avatarDescription}` }).then((res) => {
            setAvatar(res.avatarDataUri);
            localStorage.setItem("404love_avatar", res.avatarDataUri);
        });
    }

    generateMemeBio({ additionalInfo }).then((res) => setBio(res.bio));

  }, [router]);
  
  useEffect(() => {
    const answersString = localStorage.getItem("404love_answers");
    if (!answersString) {
      return; // Don't start the counter if profile is not set up
    }
    
    // This interval now handles both left swipes and keeping the reject count in sync.
    const statsInterval = setInterval(() => {
      const storedStats = localStorage.getItem("404love_stats");
      const currentStats = storedStats ? JSON.parse(storedStats) : { rejects: 0, leftSwipes: 0 };
      const newStats = { ...currentStats, leftSwipes: currentStats.leftSwipes + 1 };
      localStorage.setItem("404love_stats", JSON.stringify(newStats));
      setStats(newStats);
    }, 25000); // Update every 25 seconds

    return () => clearInterval(statsInterval);
  }, []);

  useEffect(() => {
    if (avatar && bio) {
      setLoading(false);
      const answersString = localStorage.getItem("404love_answers");
      if (answersString) {
        const randomJoke = popupJokes[Math.floor(Math.random() * popupJokes.length)];
        const toastTimer = setTimeout(() => {
          toast({
            title: "A Quick Reality Check",
            description: randomJoke,
            variant: "destructive",
          });
        }, 2000);
        return () => clearTimeout(toastTimer);
      }
    }
  }, [avatar, bio, toast]);

  const chartData = [
    { metric: "Stats", rejects: stats.rejects, leftSwipes: stats.leftSwipes },
  ];

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
                {loading ? (
                  <>
                    <Skeleton className="size-32 rounded-full" />
                    <Skeleton className="h-8 w-48 mt-4" />
                    <Skeleton className="h-6 w-32 mt-2" />
                  </>
                ) : (
                  <>
                    <Image
                      src={avatar!}
                      alt="Your beautifully glitched profile picture"
                      width={128}
                      height={128}
                      className="size-32 rounded-full border-4 border-primary object-cover bg-secondary"
                      data-ai-hint="profile avatar"
                    />
                    <CardTitle className="font-headline text-3xl mt-4">{username || 'You, probably.'}</CardTitle>
                    <CardDescription className="text-lg px-2">{bio}</CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2 text-primary text-center">Your Stats of Sadness</h3>
                  <div className="text-center text-muted-foreground">
                    <p><span className="font-bold text-primary">{stats.rejects}</span> Rejects (more on the way)</p>
                    <p><span className="font-bold text-accent">{stats.leftSwipes}</span> Dislikes, no wonder.</p>
                  </div>
                  <ChartContainer config={chartConfig} className="mx-auto aspect-video max-h-40 mt-4">
                    <BarChart accessibilityLayer data={chartData} margin={{left: 10, right: 10}}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="metric"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={() => ""}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="rejects" fill="var(--color-rejects)" radius={4} />
                      <Bar dataKey="leftSwipes" fill="var(--color-leftSwipes)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="border-t pt-6">
                  <h3 className="font-bold mb-2 text-primary text-center">Ridiculous Traits</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {loading ? <Skeleton className="h-6 w-full" /> : ridiculousTraits.map(trait => <Badge key={trait} variant="secondary">{trait}</Badge>)}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-primary text-center">Emotional Baggage</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {loading ? <Skeleton className="h-6 w-full" /> : baggageItems.map(item => <Badge key={item} variant="outline">{item}</Badge>)}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button asChild className="w-full" size="lg" disabled={loading}>
                  <Link href="/matching">
                    {loading ? "Calibrating Disasters..." : "Find Your Next Mistake"}
                  </Link>
                </Button>
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  <RefreshCw className="mr-2" />
                  Start Over, Why Not?
                </Button>
              </CardFooter>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
