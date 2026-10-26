"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Bookmark, ArrowUp } from "lucide-react";
import { toggleLessonCompletion, toggleLessonBookmark, getStoredProgress } from "@/lib/storage";

interface LessonNavigationProps {
  currentSlug: string;
  prevLesson?: { slug: string; title: string; number: number };
  nextLesson?: { slug: string; title: string; number: number };
}

export function LessonNavigation({
  currentSlug,
  prevLesson,
  nextLesson,
}: LessonNavigationProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const progress = getStoredProgress();
    setIsCompleted(progress.completedLessons.includes(currentSlug));
    setIsBookmarked(progress.bookmarkedLessons.includes(currentSlug));

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSlug]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft" && prevLesson) {
        router.push(`/lessons/${prevLesson.slug}`);
      } else if ((e.key === "ArrowRight" || (e.code === "Space" && e.shiftKey)) && nextLesson) {
        router.push(`/lessons/${nextLesson.slug}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevLesson, nextLesson, router]);

  const handleToggleComplete = () => {
    const newStatus = toggleLessonCompletion(currentSlug);
    setIsCompleted(newStatus);
  };

  const handleToggleBookmark = () => {
    const newStatus = toggleLessonBookmark(currentSlug);
    setIsBookmarked(newStatus);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="border-t border-clinical-border pt-8 mt-12">
      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleComplete}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isCompleted
                ? "bg-teal-500 text-white hover:bg-teal-600"
                : "bg-white text-clinical-text border border-clinical-border hover:bg-slate-50"
            }`}
            aria-pressed={isCompleted}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-white" : "text-teal-600"}`} />
            {isCompleted ? "Lesson Completed" : "Mark as Complete"}
          </button>

          <button
            onClick={handleToggleBookmark}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-colors ${
              isBookmarked
                ? "bg-gold-500/10 text-gold-600 border border-gold-500/30"
                : "text-clinical-muted hover:text-clinical-text border border-clinical-border hover:bg-slate-50"
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this lesson"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-gold-500 text-gold-500" : ""}`} />
            <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-clinical-muted">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">←</kbd>
          <span>Prev</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">→</kbd>
          <span>Next</span>
        </div>
      </div>

      {/* Prev / Next Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevLesson ? (
          <Link
            href={`/lessons/${prevLesson.slug}`}
            className="group flex flex-col p-4 rounded-lg border border-clinical-border bg-white hover:border-teal-500 transition-colors shadow-editorial"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-clinical-muted group-hover:text-teal-600 mb-1">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>PREVIOUS LESSON ({String(prevLesson.number).padStart(2, "0")})</span>
            </div>
            <div className="text-base font-semibold text-clinical-text group-hover:text-navy-900">
              {prevLesson.title}
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-lg border border-clinical-border/40 bg-slate-50 opacity-50 flex flex-col justify-center text-xs text-clinical-muted">
            Start of Curriculum
          </div>
        )}

        {nextLesson ? (
          <Link
            href={`/lessons/${nextLesson.slug}`}
            className="group flex flex-col items-end text-right p-4 rounded-lg border border-clinical-border bg-white hover:border-teal-500 transition-colors shadow-editorial"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-clinical-muted group-hover:text-teal-600 mb-1">
              <span>NEXT LESSON ({String(nextLesson.number).padStart(2, "0")})</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="text-base font-semibold text-clinical-text group-hover:text-navy-900">
              {nextLesson.title}
            </div>
          </Link>
        ) : (
          <Link
            href="/quiz"
            className="group flex flex-col items-end text-right p-4 rounded-lg border border-teal-500 bg-teal-50/50 hover:bg-teal-50 transition-colors shadow-editorial"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
              <span>ASSESSMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="text-base font-semibold text-navy-900">
              Take the Knowledge Check Quiz →
            </div>
          </Link>
        )}
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-navy-900 text-white shadow-elevated hover:bg-navy-800 transition-all z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
