import { AppHeader } from "@/components/app-header";
import { QuestionnaireForm } from "@/components/questionnaire-form";

export default function Home() {
  return (
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
        <QuestionnaireForm />
      </main>
    </div>
  );
}
