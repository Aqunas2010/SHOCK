import React from "react";
import { Calculator } from "lucide-react";
import { ShockCalculators } from "@/components/medical/ShockCalculators";
import { ClinicalPearl } from "@/components/learning/ClinicalPearl";

export const metadata = {
  title: "Clinical Hemodynamic Calculators — SHOCK",
  description: "Interactive Shock Index and Mean Arterial Pressure calculators for early detection of occult shock and perfusion adequacy.",
};

export default function CalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 mb-2">
          <Calculator className="w-3.5 h-3.5 text-teal-600" />
          <span>BEDSIDE CLINICAL TOOLS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Hemodynamic Risk Calculators
        </h1>
        <p className="text-sm text-clinical-muted max-w-2xl mt-1 leading-relaxed">
          Evaluate early circulatory compromise using the Shock Index (SI) and quantify vital organ perfusion pressure with Mean Arterial Pressure (MAP).
        </p>
      </div>

      <ShockCalculators />

      <ClinicalPearl title="Clinical Utility of the Shock Index">
        In healthy young patients with robust cardiovascular reserve, blood pressure can remain deceptive within normal limits despite up to 30% intravascular volume loss. The Shock Index (HR / SBP &gt; 0.9) unmasks compensated shock long before systolic hypotension develops.
      </ClinicalPearl>

      <div className="p-4 rounded-xl border border-clinical-border bg-slate-50 text-xs text-clinical-muted leading-relaxed">
        <strong>Educational Disclaimer:</strong> These hemodynamic calculators are designed for medical simulation, academic teaching, and clinical reasoning exercises. They do not constitute individualized medical orders or diagnostic certainty.
      </div>
    </div>
  );
}
