"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Bookmark, Clock, ArrowRight, Search } from "lucide-react";
import { LESSONS } from "@/lib/data/lessons";
import { getStoredProgress } from "@/lib/storage";

const CATEGORIES = ["All", "Foundations", "Classification", "Pathophysiology", "Assessment", "Management", "Quiz"];

export default function LessonsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const progress = getStoredProgress();
    setCompletedSlugs(progress.completedLessons);
    setBookmarkedSlugs(progress.bookmarkedLessons);
  }, []);

  const filteredLessons = LESSONS.filter((lesson) => {
    const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedCount = completedSlugs.length;
  const progressPercent = Math.round((completedCount / LESSONS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Progress Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-clinical-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-600 font-bold">
            Full Academic Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">
            Educational Lessons Directory
          </h1>
          <p className="text-sm text-clinical-muted max-w-2xl mt-2 leading-relaxed">
            Ten peer-reviewed lessons spanning cardiovascular physiology, classification of shock mechanisms, cellular dysoxia, bedside recognition, and acute ABCDE resuscitation.
          </p>
        </div>

        {/* Progress Box */}
        <div className="w-full md:w-72 p-4 rounded-xl border border-clinical-border bg-white shadow-editorial shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold text-clinical-text mb-2">
            <span>Course Completion</span>
            <span className="font-mono text-teal-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-2" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-clinical-muted flex justify-between">
            <span>{completedCount} of 10 lessons completed</span>
            <Link href="/quiz" className="text-teal-700 font-medium hover:underline">
              Take Quiz →
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-navy-900 text-white"
                  : "bg-white text-clinical-text border border-clinical-border hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-clinical-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter lessons..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-clinical-border bg-white text-clinical-text placeholder-clinical-muted outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLessons.map((lesson) => {
          const isCompleted = completedSlugs.includes(lesson.slug);
          const isBookmarked = bookmarkedSlugs.includes(lesson.slug);

          return (
            <div
              key={lesson.id}
              className="group rounded-xl border border-clinical-border bg-white p-6 shadow-editorial hover:border-teal-500 hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      LESSON {String(lesson.number).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {lesson.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-clinical-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.estimatedMinutes} min</span>
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span className="hidden sm:inline">Completed</span>
                      </span>
                    )}
                    {isBookmarked && (
                      <Bookmark className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-navy-900 group-hover:text-teal-700 transition-colors mb-1">
                  {lesson.title}
                </h3>
                <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">
                  {lesson.subtitle}
                </p>
                <p className="text-xs text-clinical-muted leading-relaxed line-clamp-3 mb-6">
                  {lesson.description}
                </p>
              </div>

              <div className="pt-4 border-t border-clinical-border flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {lesson.sections.length} core sections
                </span>

                <Link
                  href={`/lessons/${lesson.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 group-hover:bg-teal-600 text-white text-xs font-semibold transition-colors"
                >
                  <span>{isCompleted ? "Review Lesson" : "Start Lesson"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="p-12 text-center rounded-xl border border-clinical-border bg-white text-clinical-muted">
          <p className="text-sm font-semibold">No lessons match your search criteria</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-3 text-xs text-teal-700 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
