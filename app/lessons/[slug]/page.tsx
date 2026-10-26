import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { LESSONS, getLessonBySlug } from "@/lib/data/lessons";
import { LessonSidebar } from "@/components/layout/LessonSidebar";
import { LessonNavigation } from "@/components/learning/LessonNavigation";
import { ClinicalPearl } from "@/components/learning/ClinicalPearl";
import { CautionPanel } from "@/components/learning/CautionPanel";
import { NormalPerfusionDiagram } from "@/components/medical/NormalPerfusionDiagram";
import { ClassificationQuadrant } from "@/components/medical/ClassificationQuadrant";
import { PathophysiologyCascade } from "@/components/medical/PathophysiologyCascade";
import { CardioVsObstructiveTable } from "@/components/medical/CardioVsObstructiveTable";
import { ClinicalFindingsTable } from "@/components/medical/ClinicalFindingsTable";
import { AbcdeFlowDiagram } from "@/components/medical/AbcdeFlowDiagram";
import { QuizApp } from "@/components/quiz/QuizApp";

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export function generateMetadata({ params }: LessonPageProps) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) {
    return { title: "Lesson Not Found" };
  }
  return {
    title: `Lesson ${String(lesson.number).padStart(2, "0")}: ${lesson.title} — SHOCK`,
    description: lesson.description,
  };
}

export default function LessonDetailPage({ params }: LessonPageProps) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) {
    notFound();
  }

  const prevLesson = lesson.number > 1 ? LESSONS[lesson.number - 2] : undefined;
  const nextLesson = lesson.number < LESSONS.length ? LESSONS[lesson.number] : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-clinical-muted mb-6">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link href="/lessons" className="hover:text-navy-900 transition-colors">
          Lessons
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-navy-900 truncate">
          Lesson {String(lesson.number).padStart(2, "0")}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Lesson Content */}
        <article className="flex-1 min-w-0 space-y-10">
          {/* Header Card */}
          <header className="rounded-xl border border-clinical-border bg-white p-6 sm:p-8 shadow-editorial">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                {lesson.tag}
              </span>
              <div className="flex items-center gap-3 text-xs text-clinical-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{lesson.estimatedMinutes} min read</span>
                </span>
                <span>•</span>
                <span className="font-medium text-teal-700">{lesson.category}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 leading-tight">
              {lesson.title}
            </h1>
            <p className="text-sm font-semibold text-teal-700 uppercase tracking-wide mt-1 mb-4">
              {lesson.subtitle}
            </p>
            <p className="text-base text-clinical-muted leading-relaxed">
              {lesson.description}
            </p>
          </header>

          {/* Embedded Specialized Interactive Diagrams Per Lesson */}
          {lesson.slug === "what-is-shock" && (
            <section aria-label="Interactive Normal Perfusion Model">
              <NormalPerfusionDiagram />
            </section>
          )}

          {lesson.slug === "classification-of-shock" && (
            <section aria-label="Interactive Classification Quadrant">
              <ClassificationQuadrant />
            </section>
          )}

          {lesson.slug === "pathophysiology" && (
            <section aria-label="Interactive Pathophysiology Cascade">
              <PathophysiologyCascade />
            </section>
          )}

          {lesson.slug === "cardiogenic-vs-obstructive" && (
            <section aria-label="Comparative Interface">
              <CardioVsObstructiveTable />
            </section>
          )}

          {lesson.slug === "clinical-features-investigations" && (
            <section aria-label="Bedside Clinical Findings & Investigations">
              <ClinicalFindingsTable />
            </section>
          )}

          {lesson.slug === "abcde-initial-assessment" && (
            <section aria-label="ABCDE Resuscitation Algorithm">
              <AbcdeFlowDiagram />
            </section>
          )}

          {lesson.slug === "knowledge-check" && (
            <section aria-label="Knowledge Check Quiz">
              <QuizApp />
            </section>
          )}

          {/* Lesson Editorial Sections */}
          {lesson.sections.length > 0 && lesson.slug !== "knowledge-check" && (
            <div className="space-y-8">
              {lesson.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-xl border border-clinical-border bg-white p-6 sm:p-8 shadow-editorial space-y-4"
                >
                  <h2 className="text-xl font-bold text-navy-900 border-b border-clinical-border/80 pb-2.5">
                    {section.title}
                  </h2>

                  {section.content && (
                    <p className="text-sm text-clinical-text leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  {section.bullets && (
                    <ul className="space-y-2.5 text-sm text-clinical-text">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div className="mt-4">
                      {section.callout.type === "pearl" ? (
                        <ClinicalPearl title={section.callout.title}>
                          {section.callout.text}
                        </ClinicalPearl>
                      ) : (
                        <CautionPanel title={section.callout.title}>
                          {section.callout.text}
                        </CautionPanel>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {/* Clinical Pearl or Caution Panel if defined on lesson level */}
          {lesson.pearl && (
            <ClinicalPearl title="Clinical Pearl">
              {lesson.pearl}
            </ClinicalPearl>
          )}

          {lesson.caution && (
            <CautionPanel title="Clinical Warning & Caution">
              {lesson.caution}
            </CautionPanel>
          )}

          {/* Hemodynamic Summary Box (if present for shock type lessons) */}
          {lesson.hemodynamicSummary && (
            <div className="rounded-xl border border-slate-700 bg-navy-900 text-white p-6 shadow-editorial">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
                Hemodynamic Parameters Summary
              </span>
              <h3 className="text-lg font-bold text-white mb-4">
                Cardiovascular Profile at a Glance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-navy-850 border border-slate-800">
                  <span className="text-slate-400 uppercase font-medium block">Preload (CVP / PCWP)</span>
                  <span className="text-teal-300 font-bold text-sm mt-0.5 block">{lesson.hemodynamicSummary.preload}</span>
                </div>
                <div className="p-3 rounded-lg bg-navy-850 border border-slate-800">
                  <span className="text-slate-400 uppercase font-medium block">Cardiac Output (CO / CI)</span>
                  <span className="text-teal-300 font-bold text-sm mt-0.5 block">{lesson.hemodynamicSummary.cardiacOutput}</span>
                </div>
                <div className="p-3 rounded-lg bg-navy-850 border border-slate-800">
                  <span className="text-slate-400 uppercase font-medium block">Afterload (SVR)</span>
                  <span className="text-teal-300 font-bold text-sm mt-0.5 block">{lesson.hemodynamicSummary.afterload}</span>
                </div>
                <div className="p-3 rounded-lg bg-navy-850 border border-slate-800">
                  <span className="text-slate-400 uppercase font-medium block">Central Venous O2 (ScvO2)</span>
                  <span className="text-teal-300 font-bold text-sm mt-0.5 block">{lesson.hemodynamicSummary.scvo2}</span>
                </div>
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <section className="rounded-xl border border-teal-500/30 bg-teal-50/40 p-6 shadow-editorial">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <span>Key Clinical Takeaways</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-clinical-text">
              {lesson.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span className="leading-relaxed font-medium">{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom Navigation */}
          <LessonNavigation
            currentSlug={lesson.slug}
            prevLesson={prevLesson ? { slug: prevLesson.slug, title: prevLesson.title, number: prevLesson.number } : undefined}
            nextLesson={nextLesson ? { slug: nextLesson.slug, title: nextLesson.title, number: nextLesson.number } : undefined}
          />
        </article>

        {/* Right Sticky Sidebar */}
        <LessonSidebar currentSlug={lesson.slug} />
      </div>
    </div>
  );
}
