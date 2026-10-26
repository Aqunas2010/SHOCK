import { NextResponse } from "next/server";
import { QUIZ_QUESTIONS } from "@/lib/data/quiz";

export async function GET() {
  const safeQuestions = QUIZ_QUESTIONS.map((q) => ({
    id: q.id,
    number: q.number,
    category: q.category,
    question: q.question,
    options: q.options,
  }));

  return NextResponse.json({
    total: safeQuestions.length,
    questions: safeQuestions,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers: Record<string, string> = body.answers || {};

    let score = 0;
    const review = QUIZ_QUESTIONS.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctOptionId;
      if (isCorrect) score += 1;

      return {
        id: q.id,
        number: q.number,
        selectedOptionId: selected || null,
        correctOptionId: q.correctOptionId,
        isCorrect,
        explanation: q.explanation,
        clinicalPearl: q.clinicalPearl,
      };
    });

    const total = QUIZ_QUESTIONS.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 80;

    return NextResponse.json({
      score,
      total,
      percentage,
      passed,
      review,
      evaluatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid submission data" },
      { status: 400 }
    );
  }
}
