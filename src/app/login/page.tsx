
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppHeader } from "@/components/app-header";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    const storedUser = localStorage.getItem(`404love_user_${username}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        sessionStorage.setItem("404love_user", JSON.stringify({ username }));
        // Existing user, clear old questionnaire data
        sessionStorage.removeItem("404love_answers");
        sessionStorage.removeItem("404love_questions");
        router.push("/profile");
      } else {
        setError("Invalid password.");
      }
    } else {
      // New user registration
      const newUser = { username, password };
      localStorage.setItem(`404love_user_${username}`, JSON.stringify(newUser));
      sessionStorage.setItem("404love_user", JSON.stringify({ username }));
       // New user, go to questionnaire
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-sm animate-fade-in-up">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Welcome</CardTitle>
            <CardDescription>
              Log in to begin your questionable journey, or sign up if it's your
              first mistake.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="YourFutureEx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-primary animate-shake">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full">
              Login / Sign Up
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
