import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-xl border border-clinical-border bg-white p-8 shadow-editorial text-center space-y-4">
        <span className="text-4xl font-extrabold text-navy-900 font-mono">
          404
        </span>
        <h1 className="text-xl font-bold text-navy-900">
          Lesson or Page Not Found
        </h1>
        <p className="text-xs text-clinical-muted leading-relaxed">
          The requested medical educational page does not exist or may have been relocated.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/lessons"
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-850 transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lessons Directory</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-clinical-border bg-white text-clinical-text text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
