import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Stethoscope, ShieldAlert, CheckCircle2, ChevronRight, ArrowUpRight } from "lucide-react";
import { NormalPerfusionDiagram } from "@/components/medical/NormalPerfusionDiagram";
import { ClinicalPearl } from "@/components/learning/ClinicalPearl";

export default function HomePage() {
  const learningPillars = [
    {
      id: "foundations",
      number: "01",
      title: "Foundations",
      subtitle: "Hemodynamic Determinants",
      description: "Master the fundamental physiology of oxygen delivery, vascular tone, and the cardiac output equation (CO = HR × SV).",
      slug: "what-is-shock",
      icon: BookOpen,
      category: "Lesson 02",
    },
    {
      id: "classification",
      number: "02",
      title: "Shock Classification",
      subtitle: "Four Major Phenotypes",
      description: "Differentiate between hypovolemic, cardiogenic, distributive, and obstructive shock with clinical clues and causes.",
      slug: "classification-of-shock",
      icon: Layers,
      category: "Lesson 03",
    },
    {
      id: "assessment",
      number: "03",
      title: "Clinical Assessment",
      subtitle: "Bedside & Lab Evaluation",
      description: "Recognize early signs across cardiovascular, respiratory, and neurological systems; interpret lactate and ultrasound.",
      slug: "clinical-features-investigations",
      icon: Stethoscope,
      category: "Lesson 08",
    },
    {
      id: "management",
      number: "04",
      title: "Initial Management",
      subtitle: "Structured ABCDE Approach",
      description: "Apply structured emergency resuscitation, targeted fluid therapy, vasopressors, and immediate cause-specific interventions.",
      slug: "abcde-initial-assessment",
      icon: ShieldAlert,
      category: "Lesson 09",
    },
  ];

  const pathwaySteps = [
    { label: "Foundations", num: "01", desc: "Core Physiology & Formula" },
    { label: "Classification", num: "02", desc: "Four Distinct Mechanisms" },
    { label: "Pathophysiology", num: "03", desc: "Dysoxia to Organ Injury" },
    { label: "Clinical Assessment", num: "04", desc: "Bedside Signs & Labs" },
    { label: "Management", num: "05", desc: "ABCDE Emergency Protocol" },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative w-full bg-navy-900 border-b border-slate-800 text-white overflow-hidden py-16 sm:py-24">
        {/* Subtle background radial tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(67,143,150,0.15),rgba(11,22,40,0))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-slate-700 text-xs font-mono text-teal-400">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>LESSON 01 — UNDERSTANDING SHOCK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Understanding Shock
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Explore the mechanisms of circulatory failure, recognize clinical warning signs, and study the principles of initial emergency management.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/lessons/what-is-shock"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm transition-all shadow-editorial"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/lessons/classification-of-shock"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <span>Explore Shock Types</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </Link>

              <Link
                href="/quiz"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                <span>Self-Assessment Quiz</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Compact Clinical Pearl Banner */}
          <div className="mt-12 max-w-3xl">
            <ClinicalPearl title="Fundamental Clinical Core Principle">
              Shock is not synonymous with hypotension. Compensated shock can occur while blood pressure remains initially preserved through neurohormonal vasoconstriction and tachycardia.
            </ClinicalPearl>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Four Learning Cards */}
        <section aria-labelledby="core-curriculum-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-600 font-bold">
                Core Curriculum Pillars
              </span>
              <h2 id="core-curriculum-heading" className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
                Foundations to Emergency Protocol
              </h2>
            </div>
            <Link
              href="/lessons"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <span>View All 10 Lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial flex flex-col justify-between hover:border-teal-500 hover:shadow-card transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="p-2 rounded-lg bg-navy-900 text-teal-400">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-mono text-clinical-muted font-bold">
                        {pillar.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-navy-900 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2.5">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs text-clinical-muted leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <Link
                    href={`/lessons/${pillar.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-teal-600 transition-colors pt-3 border-t border-clinical-border"
                  >
                    <span>Study Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Structured Learning Pathway */}
        <section className="rounded-xl border border-clinical-border bg-white p-6 sm:p-8 shadow-editorial" aria-labelledby="pathway-heading">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-600 font-bold">
                Recommended Study Progression
              </span>
              <h2 id="pathway-heading" className="text-xl sm:text-2xl font-bold text-navy-900 mt-1">
                Five-Stage Clinical Learning Pathway
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-clinical-muted">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Self-Paced Modular Flow</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {pathwaySteps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-clinical-border bg-slate-50/70 p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-700 uppercase block mb-1">
                    Stage {step.num}
                  </span>
                  <div className="text-sm font-bold text-navy-900 mb-1">
                    {step.label}
                  </div>
                  <p className="text-xs text-clinical-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < pathwaySteps.length - 1 && (
                  <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-clinical-border text-clinical-muted flex items-center justify-center text-[10px]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Medical Illustration / Circulation & O2 Delivery */}
        <section aria-labelledby="interactive-circulation-heading">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-600 font-bold">
              Dynamic Visual Reference
            </span>
            <h2 id="interactive-circulation-heading" className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1">
              Circulation & Tissue Oxygen Delivery Cascade
            </h2>
          </div>

          <NormalPerfusionDiagram />
        </section>

        {/* Bedside Tool Quick Access Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-teal-600 uppercase">Interactive Calculator</span>
              <h3 className="text-base font-bold text-navy-900 mt-1 mb-2">Shock Index (HR / SBP)</h3>
              <p className="text-xs text-clinical-muted leading-relaxed mb-4">
                Calculate the Shock Index to detect compensated shock before blood pressure collapses.
              </p>
            </div>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              <span>Launch Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-teal-600 uppercase">Diagnostic Reference</span>
              <h3 className="text-base font-bold text-navy-900 mt-1 mb-2">Cardiogenic vs Obstructive</h3>
              <p className="text-xs text-clinical-muted leading-relaxed mb-4">
                Examine bedside physical exam differences, lung auscultation, and urgent decompression principles.
              </p>
            </div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              <span>Compare Mechanisms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-teal-600 uppercase">Clinical Assessment</span>
              <h3 className="text-base font-bold text-navy-900 mt-1 mb-2">10-Question Knowledge Check</h3>
              <p className="text-xs text-clinical-muted leading-relaxed mb-4">
                Test your mastery with clinically realistic scenario questions, immediate feedback, and rationales.
              </p>
            </div>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
