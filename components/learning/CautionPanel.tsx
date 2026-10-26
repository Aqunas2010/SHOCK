import React from "react";
import { AlertTriangle } from "lucide-react";

interface CautionPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function CautionPanel({
  title = "Clinical Caution",
  children,
  className = "",
}: CautionPanelProps) {
  return (
    <div
      className={`rounded-lg bg-navy-850 border border-gold-500/40 p-4 clinical-pearl-border text-slate-100 ${className}`}
      role="alert"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <AlertTriangle className="w-4 h-4 text-gold-500 shrink-0" aria-hidden="true" />
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
