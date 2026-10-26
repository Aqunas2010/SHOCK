"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Bookmark, Clock } from "lucide-react";
import { LESSONS } from "@/lib/data/lessons";
import { getStoredProgress } from "@/lib/storage";

interface LessonSidebarProps {
  currentSlug: string;
}

export function LessonSidebar({ currentSlug }: LessonSidebarProps) {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const handleUpdate = () => {
      const progress = getStoredProgress();
      setCompletedSlugs(progress.completedLessons);
      setBookmarkedSlugs(progress.bookmarkedLessons);
    };

    handleUpdate();
    window.addEventListener("storage", handleUpdate);
    return () => window.removeEventListener("storage", handleUpdate);
  }, [currentSlug]);

  const completedCount = completedSlugs.length;
  const progressPercent = Math.round((completedCount / LESSONS.length) * 100);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-5">
      {/* Curriculum Progress Box */}
      <div className="rounded-xl border border-clinical-border bg-white p-4 shadow-editorial">
        <div className="flex items-center justify-between text-xs font-semibold text-clinical-text mb-2">
          <span>Curriculum Progress</span>
          <span className="font-mono text-teal-600 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-2" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full bg-teal-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-[11px] text-clinical-muted flex justify-between">
          <span>{completedCount} of 10 completed</span>
          <Link href="/quiz" className="text-teal-700 font-medium hover:underline">
            Take Quiz →
          </Link>
        </div>
      </div>

      {/* Navigation List */}
      <div className="rounded-xl border border-clinical-border bg-white p-3 shadow-editorial">
        <span className="text-[10px] font-mono uppercase tracking-wider text-clinical-muted px-2 block mb-2 font-bold">
          All Educational Lessons
        </span>
        <nav className="space-y-1" aria-label="Lessons List">
          {LESSONS.map((lesson) => {
            const isActive = lesson.slug === currentSlug;
            const isCompleted = completedSlugs.includes(lesson.slug);
            const isBookmarked = bookmarkedSlugs.includes(lesson.slug);

            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.slug}`}
                className={`group flex items-start gap-2.5 p-2 rounded-lg text-xs transition-colors ${
                  isActive
                    ? "bg-navy-900 text-white font-semibold shadow-sm"
                    : "text-clinical-text hover:bg-slate-50 hover:text-navy-900"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? "text-teal-300" : "text-teal-600"}`} />
                  ) : (
                    <span
                      className={`inline-block w-3.5 h-3.5 rounded-full border text-[9px] font-mono text-center leading-3 ${
                        isActive
                          ? "border-teal-400 text-teal-300"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {lesson.number}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate">{lesson.title}</span>
                    {isBookmarked && (
                      <Bookmark className={`w-3 h-3 shrink-0 ${isActive ? "fill-gold-400 text-gold-400" : "fill-gold-500 text-gold-500"}`} />
                    )}
                  </div>
                  <div className={`text-[10px] mt-0.5 flex items-center gap-2 ${isActive ? "text-slate-300" : "text-clinical-muted"}`}>
                    <span>{lesson.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{lesson.estimatedMinutes}m</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Quick Tool Links */}
      <div className="rounded-xl border border-clinical-border bg-slate-50/70 p-3.5 text-xs text-clinical-muted space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-clinical-muted block font-bold">
          Quick Bedside Tools
        </span>
        <Link
          href="/calculator"
          className="block p-2 rounded-md bg-white border border-clinical-border text-navy-900 font-medium hover:border-teal-500 transition-colors"
        >
          Shock Index Calculator →
        </Link>
        <Link
          href="/compare"
          className="block p-2 rounded-md bg-white border border-clinical-border text-navy-900 font-medium hover:border-teal-500 transition-colors"
        >
          Hemodynamic Matrix →
        </Link>
      </div>
    </aside>
  );
}
