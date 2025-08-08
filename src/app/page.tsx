
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { QuestionnaireForm } from "@/components/questionnaire-form";
import { Skeleton } from "@/components/ui/skeleton";
import { generateQuestions } from "@/ai/flows/generate-questions";
import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

interface Question {
  key: string;
  text: string;
  options?: string[];
  type?: 'textarea' | 'radio';
}


export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("404love_user");
    if (!user) {
      router.push("/login");
      return;
    }

    // If user has answers, they shouldn't be on the questionnaire page.
    const answers = localStorage.getItem("404love_answers");
    if (answers) {
      router.push("/profile");
      return;
    }

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const res = await generateQuestions({});
            const generatedQuestions = res.questions.map(q => ({...q, key: q.key.toLowerCase().replace(/\s+/g, '_')}));
            localStorage.setItem("404love_questions", JSON.stringify(generatedQuestions));
            setQuestions(generatedQuestions);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const storedQuestions = localStorage.getItem("404love_questions");
    if (storedQuestions) {
        try {
            const parsedQuestions = JSON.parse(storedQuestions);
            if (parsedQuestions && parsedQuestions.length > 0) {
                setQuestions(parsedQuestions);
                setLoading(false);
            } else {
                fetchQuestions();
            }
        } catch (e) {
            fetchQuestions();
        }
    } else {
      fetchQuestions();
    }
  }, [router]);

  // This check also covers the redirect from answers check.
  if (loading || !questions) {
    return (
      <>
        <Sidebar>
            <AppSidebar />
        </Sidebar>
        <SidebarInset>
            <div className="min-h-screen flex flex-col">
              <AppHeader />
              <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-2xl text-center space-y-4">
                  <Skeleton className="h-12 w-3/4 mx-auto" />
                  <Skeleton className="h-6 w-full mx-auto" />
                </div>
                <div className="w-full max-w-2xl mt-8 space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-32 ml-auto" />
                </div>
              </main>
            </div>
        </SidebarInset>
      </>
    );
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
            <div className="w-full max-w-2xl text-center space-y-4 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">
                Ready to Find Your Next Mistake?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Answer these deeply profound questions to help our broken algorithm find someone you're 110% incompatible with.
              </p>
            </div>
            <QuestionnaireForm questions={questions} />
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
