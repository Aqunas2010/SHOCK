import React from "react";
import { Layers } from "lucide-react";
import { CardioVsObstructiveTable } from "@/components/medical/CardioVsObstructiveTable";
import { HemodynamicMatrix } from "@/components/medical/HemodynamicMatrix";
import { CautionPanel } from "@/components/learning/CautionPanel";

export const metadata = {
  title: "Compare Shock Types & Hemodynamics — SHOCK",
  description: "Differential comparison between cardiogenic and obstructive shock, paired with a complete hemodynamic parameter matrix across all four shock mechanisms.",
};

export default function ComparePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 mb-2">
          <Layers className="w-3.5 h-3.5 text-teal-600" />
          <span>DIFFERENTIAL DIAGNOSTICS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Shock Comparison & Hemodynamic Matrix
        </h1>
        <p className="text-sm text-clinical-muted max-w-2xl mt-1 leading-relaxed">
          Contrast mechanical versus intrinsic pump failure, inspect bedside physical exam findings, and compare central venous pressures, output, and resistance.
        </p>
      </div>

      {/* Cardiogenic vs Obstructive Comparison */}
      <section aria-labelledby="cardio-obstructive-heading">
        <CardioVsObstructiveTable />
      </section>

      {/* Hemodynamic Matrix Across All 4 Types */}
      <section aria-labelledby="hemodynamic-matrix-heading">
        <HemodynamicMatrix />
      </section>

      <CautionPanel title="Multi-Phenotype Presentation">
        Mixed shock states can occur simultaneously (e.g. septic shock with septic cardiomyopathy, or severe hemorrhagic shock complicated by cardiac tamponade). Always use bedside ultrasonography (POCUS) and clinical reassessment to avoid rigid algorithmic assumptions.
      </CautionPanel>
    </div>
  );
}
