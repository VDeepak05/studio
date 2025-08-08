
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bomb, XCircle } from "lucide-react";

export default function MatchResultPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center overflow-hidden">
      {/* Explosion/Confetti effect */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-primary rounded-full animate-explode"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-accent rounded-md animate-explode"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDirection: 'reverse'
          }}
        />
      ))}

      <div className="z-10 flex flex-col items-center space-y-6 animate-fade-in-up">
        <XCircle className="size-32 text-destructive" />
        <h1 className="text-6xl md:text-8xl font-headline font-black text-destructive">
          404
        </h1>
        <p className="text-2xl md:text-4xl font-bold">
          Love Not Found
        </p>
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <p className="text-xl font-medium">Congratulations!</p>
          <p className="text-lg text-muted-foreground">You matched with: <span className="font-bold text-primary">NULL</span></p>
          <p className="text-lg text-muted-foreground">You are <span className="font-bold text-accent">110% incompatible</span>.</p>
        </div>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">
            <Bomb className="mr-2" />
            Try Again to Fail Better
          </Link>
        </Button>
      </div>
    </div>
  );
}
