"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, ArrowLeft, BookOpen, Sparkles, Check } from "lucide-react";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/lib/data/quiz";
import { recordQuizAttempt, getStoredProgress } from "@/lib/storage";

export function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    const progress = getStoredProgress();
    setHighScore(progress.quizHighScore);
  }, []);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = userAnswers[currentQ.id];
  const isCurrentAnswered = Boolean(selectedOption);

  const handleSelectOption = (optionId: string) => {
    // If this question is already answered in active mode, don't allow changing
    if (userAnswers[currentQ.id] !== undefined && !isReviewMode) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score += 1;
      }
    });
    return score;
  };

  const handleFinishQuiz = () => {
    const score = calculateScore();
    recordQuizAttempt(score, QUIZ_QUESTIONS.length);
    setHighScore((prev) => (prev !== null ? Math.max(prev, score) : score));
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setIsReviewMode(false);
  };

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Final Results Screen
  if (isSubmitted && !isReviewMode) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 80;

    return (
      <div className="max-w-2xl mx-auto rounded-xl border border-clinical-border bg-white p-8 shadow-editorial text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
          <Award className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
          Knowledge Check Completed
        </span>
        <h2 className="text-2xl font-bold text-navy-900 mt-1 mb-2">
          Assessment Results
        </h2>

        <div className="my-6 p-6 rounded-xl bg-slate-50 border border-clinical-border">
          <div className="text-5xl font-extrabold text-navy-900 font-mono mb-1">
            {score} <span className="text-2xl font-normal text-clinical-muted">/ {totalQuestions}</span>
          </div>
          <div className="text-sm font-semibold text-clinical-text">
            {percentage}% Overall Mastery Score
          </div>
          <div className="mt-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                passed
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}
            >
              {passed ? "Clinical Competency Achieved (≥80%)" : "Review Recommended (<80%)"}
            </span>
          </div>

          {highScore !== null && (
            <p className="text-xs text-clinical-muted mt-3">
              Personal Best: {highScore} / {totalQuestions}
            </p>
          )}
        </div>

        <p className="text-sm text-clinical-muted max-w-md mx-auto mb-8 leading-relaxed">
          {passed
            ? "Congratulations! You have demonstrated a comprehensive clinical grasp of shock classification, pathophysiology, bedside findings, and resuscitation protocols."
            : "Good effort. Shock management is a high-stakes clinical competency. We recommend reviewing the detailed rationales and revisiting earlier lessons."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsReviewMode(true)}
            className="px-5 py-2.5 rounded-lg bg-navy-900 text-white font-semibold text-sm hover:bg-navy-850 transition-colors shadow-editorial flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Review Answers & Rationales</span>
          </button>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-lg border border-clinical-border bg-white text-clinical-text font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          <Link
            href="/lessons"
            className="px-5 py-2.5 rounded-lg border border-teal-500/30 text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors"
          >
            Curriculum Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner & Progress */}
      <div className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-600 font-semibold">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-clinical-muted font-medium">
                Category: {currentQ.category}
              </span>
            </div>
            <h3 className="text-base font-bold text-navy-900 mt-1">
              {isReviewMode ? "Review Mode: Explanation & Clinical Rationale" : "Interactive Clinical Scenario"}
            </h3>
          </div>

          {isReviewMode ? (
            <button
              onClick={() => setIsReviewMode(false)}
              className="text-xs font-semibold text-teal-700 hover:underline"
            >
              ← Back to Score Summary
            </button>
          ) : (
            <div className="text-xs text-clinical-muted">
              Answered: <strong className="text-navy-900">{answeredCount}</strong> / {totalQuestions}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full bg-teal-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial">
        <h4 className="text-base font-semibold text-navy-900 mb-5 leading-relaxed">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === currentQ.correctOptionId;

            let optionStyle = "border-clinical-border bg-white hover:bg-slate-50 text-clinical-text";

            if (isCurrentAnswered || isReviewMode) {
              if (isCorrect) {
                optionStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium ring-1 ring-emerald-500";
              } else if (isSelected && !isCorrect) {
                optionStyle = "border-red-500 bg-red-50/80 text-red-950 ring-1 ring-red-500";
              } else {
                optionStyle = "border-clinical-border bg-slate-50 opacity-60 text-clinical-muted";
              }
            } else if (isSelected) {
              optionStyle = "border-teal-500 bg-teal-50 text-navy-900 ring-1 ring-teal-500";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isCurrentAnswered && !isReviewMode}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3.5 ${optionStyle}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 ${
                  (isCurrentAnswered || isReviewMode) && isCorrect
                    ? "bg-emerald-600 text-white"
                    : (isCurrentAnswered || isReviewMode) && isSelected
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-700 border border-slate-300"
                }`}>
                  {opt.id.toUpperCase()}
                </span>
                <span className="text-sm leading-relaxed flex-1">
                  {opt.text}
                </span>
                {(isCurrentAnswered || isReviewMode) && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {(isCurrentAnswered || isReviewMode) && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Box (shown after answering) */}
        {(isCurrentAnswered || isReviewMode) && (
          <div className="rounded-lg bg-navy-900 border border-slate-700/80 p-5 text-white text-xs mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-teal-300 uppercase tracking-wider">
                Clinical Rationale & Explanation
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {currentQ.explanation}
            </p>
            <div className="pt-2 border-t border-slate-800 text-slate-200">
              <strong className="text-gold-400 uppercase text-[11px] block mb-0.5">
                Key Takeaway:
              </strong>
              <span>{currentQ.clinicalPearl}</span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-clinical-border">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-clinical-border text-xs font-semibold text-clinical-text hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={!isCurrentAnswered && !isReviewMode}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-navy-900 text-white text-xs font-semibold hover:bg-navy-850 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              disabled={answeredCount < totalQuestions && !isReviewMode}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-md bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-editorial"
            >
              <span>View Results</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
