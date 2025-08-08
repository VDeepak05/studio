

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

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleRegenerate = () => {
    sessionStorage.removeItem("404love_answers");
    sessionStorage.removeItem("404love_questions");
    router.push("/");
  };
  
  useEffect(() => {
    const user = sessionStorage.getItem("404love_user");
    const answersString = sessionStorage.getItem("404love_answers");

    if (!user) {
      router.push("/login");
      return;
    }
    
    if (!answersString) {
      // If there are no answers, they might have logged in but not filled the questionnaire.
      // Or they are a returning user who wants to start over.
      // Let's send them to the questionnaire page.
      router.push("/");
      return;
    }

    const answers = JSON.parse(answersString);
    const additionalInfo = Object.values(answers).join(' ') || "Loves chaos.";
    const avatarDescription = answers.potato || "A human face, probably.";
    
    generateMemeBio({ additionalInfo }).then((res) => setBio(res.bio));
    generateGlitchedAvatar({ description: `A glitched, distorted, surrealist portrait of a person. Their most notable trait is: ${avatarDescription}` }).then((res) => setAvatar(res.avatarDataUri));

  }, [router]);
  
  useEffect(() => {
    if (avatar && bio) {
      setLoading(false);
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
  }, [avatar, bio, toast]);

  return (
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
                <CardTitle className="font-headline text-3xl mt-4">You, probably.</CardTitle>
                <CardDescription className="text-lg px-2">{bio}</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
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
  );
}
