import React from "react";
import { Sparkles } from "lucide-react";

interface ClinicalPearlProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ClinicalPearl({
  title = "Clinical Pearl",
  children,
  className = "",
}: ClinicalPearlProps) {
  return (
    <div
      className={`rounded-lg bg-navy-800/80 border border-gold-500/30 p-4 clinical-pearl-border text-slate-100 shadow-sm ${className}`}
      role="note"
      aria-label={title}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles className="w-4 h-4 text-gold-500 shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gold-500">
          {title}
        </span>
      </div>
      <div className="text-sm leading-relaxed text-slate-200">
        {children}
      </div>
    </div>
  );
}
