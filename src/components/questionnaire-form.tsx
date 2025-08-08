
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  key: string;
  text: string;
  options?: string[];
  type?: 'textarea';
}

interface QuestionnaireFormProps {
    questions: Question[];
}

export function QuestionnaireForm({ questions }: QuestionnaireFormProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (!answers[currentQuestion.key] && currentQuestion.type !== 'textarea') {
      setError("An answer is required to proceed with your doomed journey.");
      return;
    }
    setError("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question, submit
      try {
        sessionStorage.setItem("404love_answers", JSON.stringify(answers));
        router.push("/profile");
      } catch (e) {
        console.error("Could not save answers to sessionStorage", e);
        setError("Could not save your answers. Maybe your browser is also trying to save you from this app.")
      }
    }
  };

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if(error) setError("");
  };

  return (
    <Card className="w-full max-w-2xl mt-8 animate-fade-in-up [animation-delay:0.2s]">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{currentQuestion.text}</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
      </CardHeader>
      <CardContent>
        {currentQuestion.type === 'textarea' ? (
           <Textarea 
            placeholder="Spill the tea..."
            value={answers[currentQuestion.key] || ""}
            onChange={(e) => handleAnswerChange(currentQuestion.key, e.target.value)}
            className="bg-card"
          />
        ) : (
          <RadioGroup
            value={answers[currentQuestion.key]}
            onValueChange={(value) => handleAnswerChange(currentQuestion.key, value)}
            className="space-y-2"
          >
            {currentQuestion.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        {error && <p className="text-primary mt-4 animate-shake">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} className="ml-auto">
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Generate My Profile"}
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
