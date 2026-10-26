"use client";

import React, { useState } from "react";
import { Heart, ShieldAlert } from "lucide-react";

interface ComparisonRow {
  dimension: string;
  cardiogenic: string;
  obstructive: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    dimension: "Primary Mechanism",
    cardiogenic: "Primary intrinsic myocardial pump failure (contractility, rhythm, or valve failure) with low forward cardiac output.",
    obstructive: "Extracardiac physical / mechanical hindrance restricting diastolic chamber filling or systolic ventricular outflow.",
  },
  {
    dimension: "Key Causes",
    cardiogenic: "Acute MI (>40% LV necrosis), severe dilated cardiomyopathy, acute fulminant myocarditis, severe ventricular tachycardia.",
    obstructive: "Pericardial tamponade, massive saddle pulmonary embolism, tension pneumothorax.",
  },
  {
    dimension: "Bedside Lung Examination",
    cardiogenic: "Bilateral pulmonary crackles, dyspnea, orthopnea, frank pulmonary edema with pink frothy sputum.",
    obstructive: "Lungs often CLEAR bilaterally in tamponade and PE; unilateral ABSENT breath sounds with hyperresonance in tension pneumothorax.",
  },
  {
    dimension: "Venous Pressures",
    cardiogenic: "Elevated JVP and elevated left-sided filling pressures (high PCWP > 18 mmHg).",
    obstructive: "Elevated JVP (Beck's triad), but left ventricular filling is often mechanically compromised.",
  },
  {
    dimension: "Key Bedside Investigations",
    cardiogenic: "12-Lead ECG (ischemia/STEMI), cardiac troponin, echocardiogram (severely depressed LV ejection fraction, wall motion abnormality).",
    obstructive: "Bedside POCUS / Echo: pericardial effusion with RA/RV collapse (tamponade), severe acute RV dilation (PE), absent lung sliding (pneumothorax).",
  },
  {
    dimension: "Emergency Management Principles",
    cardiogenic: "Inotropes (dobutamine/milrinone), cautious vasopressors (norepinephrine), mechanical support (IABP, Impella), emergent coronary revascularization (PCI). Use fluids very cautiously.",
    obstructive: "Immediate physical decompression: emergency pericardiocentesis for tamponade, needle thoracostomy for tension pneumothorax, systemic thrombolysis or embolectomy for massive PE.",
  },
];

export function CardioVsObstructiveTable() {
  const [activeTab, setActiveTab] = useState<"side-by-side" | "table">("side-by-side");

  return (
    <div className="space-y-6">
      {/* Toggle View */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-teal-600 uppercase tracking-wider font-semibold">
            Comparative Differential Diagnostic Interface
          </span>
          <h3 className="text-lg font-bold text-clinical-text">
            Cardiogenic vs Obstructive Shock
          </h3>
        </div>
        <div className="inline-flex rounded-lg border border-clinical-border bg-white p-1 text-xs">
          <button
            onClick={() => setActiveTab("side-by-side")}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === "side-by-side" ? "bg-navy-900 text-white" : "text-clinical-muted hover:text-clinical-text"
            }`}
          >
            Dual View
          </button>
          <button
            onClick={() => setActiveTab("table")}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === "table" ? "bg-navy-900 text-white" : "text-clinical-muted hover:text-clinical-text"
            }`}
          >
            Comparison Matrix
          </button>
        </div>
      </div>

      {activeTab === "side-by-side" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cardiogenic Card */}
          <div className="rounded-xl bg-navy-900 border border-slate-700/60 p-6 text-white shadow-editorial flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-slate-800">
                <span className="p-2 rounded-lg bg-navy-800 text-teal-400 border border-slate-700">
                  <Heart className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono text-teal-400">PUMP FAILURE</span>
                  <h4 className="text-lg font-bold text-white">Cardiogenic Shock</h4>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                The heart cannot pump enough forward blood volume to meet metabolic demands despite adequate filling pressures.
              </p>

              <div className="space-y-3 text-xs mb-5">
                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Major Etiologies:
                  </span>
                  <p className="text-slate-300">
                    Myocardial infarction, severe acute heart failure, fulminant myocarditis, significant tachyarrhythmias.
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Hallmark Physical Signs:
                  </span>
                  <p className="text-slate-300">
                    Hypotension, cold extremities, oliguria, dyspnea, and <strong>bilateral pulmonary edema / crackles</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-navy-850 border border-slate-800 p-3.5 clinical-teal-border">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400 block mb-1">
                Management Directive
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Treat cardiac cause; consider vasopressor/inotrope support and urgent revascularization when indicated. <strong>Use fluids cautiously</strong>.
              </p>
            </div>
          </div>

          {/* Obstructive Card */}
          <div className="rounded-xl bg-navy-900 border border-gold-500/40 p-6 text-white shadow-editorial flex flex-col justify-between clinical-pearl-border">
            <div>
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-slate-800">
                <span className="p-2 rounded-lg bg-navy-800 text-gold-400 border border-slate-700">
                  <ShieldAlert className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono text-gold-400">BLOCKED FLOW</span>
                  <h4 className="text-lg font-bold text-white">Obstructive Shock</h4>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Mechanical obstruction physically impairs diastolic chamber filling or systolic ventricular outflow.
              </p>

              <div className="space-y-3 text-xs mb-5">
                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Major Etiologies:
                  </span>
                  <p className="text-slate-300">
                    Cardiac tamponade, massive pulmonary embolism, tension pneumothorax.
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Hallmark Physical Signs:
                  </span>
                  <p className="text-slate-300">
                    Distended jugular veins with <strong>clear lungs</strong> (or unilaterally absent breath sounds in tension pneumo); pulsus paradoxus.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-navy-850 border border-slate-800 p-3.5 clinical-pearl-border">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 block mb-1">
                Management Directive
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                <strong>Relieve the obstruction urgently:</strong> drainage (pericardiocentesis), decompression (thoracostomy), or selected reperfusion (thrombolysis) according to cause.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Full Comparison Table */
        <div className="overflow-x-auto rounded-xl border border-clinical-border bg-white shadow-editorial">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-navy-900 text-white text-xs uppercase tracking-wider">
                <th className="py-3 px-4 border-b border-slate-800 w-1/5">Dimension</th>
                <th className="py-3 px-4 border-b border-slate-800 w-2/5 text-teal-300">Cardiogenic Shock</th>
                <th className="py-3 px-4 border-b border-slate-800 w-2/5 text-gold-300">Obstructive Shock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-border text-clinical-text">
              {COMPARISONS.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                  <td className="py-3.5 px-4 font-semibold text-navy-900 text-xs">
                    {row.dimension}
                  </td>
                  <td className="py-3.5 px-4 text-xs leading-relaxed text-slate-700">
                    {row.cardiogenic}
                  </td>
                  <td className="py-3.5 px-4 text-xs leading-relaxed text-slate-700">
                    {row.obstructive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Critical Note */}
      <div className="rounded-lg bg-navy-850 border border-gold-500/40 p-4 clinical-pearl-border text-slate-200 text-sm">
        <p className="leading-relaxed">
          <strong className="text-gold-400 uppercase tracking-wide text-xs font-semibold block mb-0.5">
            Emergency Priority
          </strong>
          Obstructive shock is a mechanical crisis that will not respond to fluids or pressors alone. Immediate physical relief of the mechanical obstruction (thoracostomy, pericardiocentesis, thrombolysis) must be performed immediately.
        </p>
      </div>
    </div>
  );
}
