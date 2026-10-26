import React from "react";
import Link from "next/link";
import { LESSONS } from "@/lib/data/lessons";

export function Footer() {
  return (
    <footer className="w-full bg-navy-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
                SHOCK
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clinical Learning & Emergency Management. An advanced, peer-reviewed educational platform covering circulatory shock pathophysiology, bedside assessment, and resuscitation.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Next.js · TypeScript · Tailwind CSS
            </div>
          </div>

          {/* Curriculum Quick Links */}
          <div className="space-y-2 md:col-span-2">
            <h5 className="font-bold uppercase tracking-wider text-slate-300 text-xs">
              Curriculum Lessons (01 – 10)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              {LESSONS.map((l) => (
                <Link
                  key={l.id}
                  href={`/lessons/${l.slug}`}
                  className="hover:text-teal-300 transition-colors truncate text-slate-400"
                >
                  <span className="font-mono text-slate-500 text-[11px] mr-1">
                    {String(l.number).padStart(2, "0")}.
                  </span>
                  <span>{l.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Interactive Tools & Shortcuts */}
          <div className="space-y-3 md:col-span-1">
            <h5 className="font-bold uppercase tracking-wider text-slate-300 text-xs">
              Interactive Tools
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/compare" className="hover:text-teal-300 transition-colors">
                  Hemodynamic Matrix & Comparator
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-teal-300 transition-colors">
                  Shock Index & MAP Calculators
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-teal-300 transition-colors">
                  10-Question Knowledge Check
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Keyboard Navigation
              </span>
              <div className="space-y-1 text-[11px] text-slate-500 font-mono">
                <div><kbd className="px-1 rounded bg-navy-900 border border-slate-800 text-slate-300">⌘K</kbd> Global Search</div>
                <div><kbd className="px-1 rounded bg-navy-900 border border-slate-800 text-slate-300">← / →</kbd> Prev / Next Lesson</div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Medical Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-3xl leading-relaxed">
            <strong>Academic Educational Disclaimer:</strong> This platform is designed strictly for university students, resident physicians, and healthcare trainees for educational study and simulation. It does not provide medical advice or individual patient care directives. Always consult licensed clinical guidelines and institutional protocols in emergency care.
          </p>
          <div className="shrink-0 text-slate-500">
            © {new Date().getFullYear()} SHOCK Platform.
          </div>
        </div>
      </div>
    </footer>
  );
}
