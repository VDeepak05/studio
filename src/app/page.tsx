
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
    const user = sessionStorage.getItem("404love_user");
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchQuestions = () => {
        setLoading(true);
        generateQuestions({})
            .then((res) => {
                const generatedQuestions = res.questions.map(q => ({...q, key: q.key.toLowerCase().replace(/\s+/g, '_')}));
                sessionStorage.setItem("404love_questions", JSON.stringify(generatedQuestions));
                setQuestions(generatedQuestions);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }

    const storedQuestions = sessionStorage.getItem("404love_questions");
    if (storedQuestions) {
        setQuestions(JSON.parse(storedQuestions));
        setLoading(false);
    } else {
      fetchQuestions();
    }
  }, [router]);

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
