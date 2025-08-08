
"use client";

import { useEffect, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPasswordUsername, setForgotPasswordUsername] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem("404love_user")) {
        router.push('/profile');
    }
  }, [router]);

  const handleLogin = () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    const storedUser = localStorage.getItem(`404love_user_${username}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        localStorage.setItem("404love_user", JSON.stringify({ username }));
        // Existing user, check if they have answers
        if (localStorage.getItem("404love_answers")) {
          router.push("/profile");
        } else {
          router.push("/");
        }
      } else {
        setError("Invalid password.");
      }
    } else {
      // New user registration
      const newUser = { username, password };
      localStorage.setItem(`404love_user_${username}`, JSON.stringify(newUser));
      localStorage.setItem("404love_user", JSON.stringify({ username }));
       // New user, go to questionnaire
      router.push("/");
    }
  };

  const handleForgotPassword = () => {
    if (!forgotPasswordUsername) {
      toast({
        title: "Username required",
        description: "Please enter a username to recover the password.",
        variant: "destructive",
      });
      return;
    }
    const storedUser = localStorage.getItem(`404love_user_${forgotPasswordUsername}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      toast({
        title: "Password Recovery",
        description: `Your password is: ${user.password}. Don't lose it again!`,
      });
    } else {
       toast({
        title: "User Not Found",
        description: "No user found with that username. Are you sure you exist?",
        variant: "destructive",
      });
    }
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground">Forgot password?</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Forgot Your Password?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Forgot your password like you forgot your ex? Or do you? Enter your username below and we'll "recover" it for you. No promises it'll be the right one.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="forgot-username">Username</Label>
                        <Input
                            id="forgot-username"
                            value={forgotPasswordUsername}
                            onChange={(e) => setForgotPasswordUsername(e.target.value)}
                            placeholder="YourFutureEx"
                        />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleForgotPassword}>Recover Password</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin} className="w-full">
                  Login / Sign Up
                </Button>
              </CardFooter>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
