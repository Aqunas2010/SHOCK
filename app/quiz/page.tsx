import React from "react";
import { Award } from "lucide-react";
import { QuizApp } from "@/components/quiz/QuizApp";

export const metadata = {
  title: "Knowledge Check Quiz — SHOCK Medical Education",
  description: "Interactive clinical self-assessment quiz covering all 10 lessons: shock classification, pathophysiology, bedside findings, and ABCDE resuscitation.",
};

export default function QuizPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-mono font-bold text-teal-700">
          <Award className="w-3.5 h-3.5" />
          <span>LESSON 10 · SELF-ASSESSMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Knowledge Check Assessment
        </h1>
        <p className="text-sm text-clinical-muted leading-relaxed">
          Ten clinically realistic scenario-based questions evaluating your understanding of shock mechanisms, cellular consequences, clinical features, and emergency resuscitation.
        </p>
      </div>

      <QuizApp />
    </div>
  );
}
