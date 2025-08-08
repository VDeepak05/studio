
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");
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
    setError("");

    const storedUser = localStorage.getItem(`404love_user_${username}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        localStorage.setItem("404love_user", JSON.stringify({ username }));
        // Existing user always goes to profile. Profile page handles redirect to questionnaire if needed.
        router.push("/profile");
      } else {
        setError("Invalid password.");
      }
    } else {
      setError("User not found. Maybe try signing up?");
    }
  };

  const handleSignUp = () => {
    if (!signupUsername || !signupPassword) {
        setSignupError("Username and password are required.");
        return;
    }
    setSignupError("");

    const storedUser = localStorage.getItem(`404love_user_${signupUsername}`);
    if (storedUser) {
        setSignupError("Username already taken. Please choose another.");
        return;
    }

    // New user registration
    const newUser = { username: signupUsername, password: signupPassword };
    localStorage.setItem(`404love_user_${signupUsername}`, JSON.stringify(newUser));
    localStorage.setItem("404love_user", JSON.stringify({ username: signupUsername }));
    // New user, go to questionnaire
    router.push("/");
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
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
                            <CardDescription>
                            Ready for another round of digital disappointment?
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
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
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
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
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
                            Login
                            </Button>
                        </CardFooter>
                    </TabsContent>
                    <TabsContent value="signup">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">First Mistake?</CardTitle>
                            <CardDescription>
                                Create an account to begin your questionable journey.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="signup-username">Username</Label>
                            <Input
                                id="signup-username"
                                value={signupUsername}
                                onChange={(e) => setSignupUsername(e.target.value)}
                                placeholder="YourNextRegret"
                                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                            />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input
                                id="signup-password"
                                type="password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                placeholder="••••••••"
                                onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                            />
                            </div>
                            {signupError && <p className="text-primary animate-shake">{signupError}</p>}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSignUp} className="w-full">
                            Sign Up
                            </Button>
                        </CardFooter>
                    </TabsContent>
                </Tabs>
            </Card>
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
