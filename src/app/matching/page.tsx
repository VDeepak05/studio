
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeartPulse } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const loadingMessages = [
  "Lowering your standards...",
  "Consulting the stars (they're not hopeful)...",
  "Finding people in your area to avoid...",
  "Analyzing your questionable choices...",
  "Rerouting your love life to a dead end...",
  "Preparing for disappointment...",
];

export default function MatchingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(13);
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.floor(Math.random() * 15);
      });
    }, 800);

    const redirectTimer = setTimeout(() => {
      router.push("/match-result");
    }, 8000);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center space-y-8">
      <HeartPulse className="size-24 text-primary animate-ping" />
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-4xl font-headline font-bold">
          Searching for Disaster...
        </h1>
        <p className="text-xl text-muted-foreground h-6">{message}</p>
        <Progress value={progress} className="w-full [&>div]:bg-primary" />
      </div>
      <p className="text-sm text-muted-foreground/50">
        (Don't worry, this will all be over soon.)
      </p>
    </div>
  );
}
