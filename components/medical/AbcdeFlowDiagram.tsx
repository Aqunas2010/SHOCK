"use client";

import React, { useState } from "react";

interface AbcdeCard {
  letter: string;
  name: string;
  action: string;
  detail: string;
  criticalInterventions: string[];
}

const ABCDE_STEPS: AbcdeCard[] = [
  {
    letter: "A",
    name: "Airway",
    action: "Assess patency; protect airway when needed.",
    detail: "Inspect for obstruction, swelling (anaphylaxis), stridor, or vomitus. Position airway, perform suction, or perform endotracheal intubation if GCS ≤ 8 or impending obstruction.",
    criticalInterventions: ["Head-tilt chin-lift / jaw-thrust", "Suction secretions / blood", "Airway adjuncts (OPA/NPA)", "Endotracheal intubation with hemodynamically neutral induction"],
  },
  {
    letter: "B",
    name: "Breathing",
    action: "Assess oxygenation; oxygen / ventilatory support when indicated.",
    detail: "Check respiratory rate, work of breathing, bilateral breath sounds, and SpO2. Immediately identify and decompress tension pneumothorax (needle decompression / thoracostomy) prior to positive pressure ventilation.",
    criticalInterventions: ["High-flow oxygen via non-rebreather mask", "Target SpO2 94–98% (88–92% in chronic hypercapnia)", "Immediate decompression of tension pneumothorax", "Non-invasive or mechanical ventilation"],
  },
  {
    letter: "C",
    name: "Circulation",
    action: "Pulse, BP, IV access, bleeding control, appropriate fluids / blood, ECG.",
    detail: "Establish 2 large-bore (14–16G) IV lines or intraosseous (IO) access. Apply direct pressure, tourniquets, or pelvic binder for hemorrhage. Connect continuous ECG and non-invasive BP. Initiate balanced fluid boluses or blood products.",
    criticalInterventions: ["Direct hemorrhage control", "Two large-bore peripheral IVs or IO", "Titrated crystalloid boluses or 1:1:1 blood transfusion", "Initiate norepinephrine for septic/distributive shock", "12-lead ECG"],
  },
  {
    letter: "D",
    name: "Disability",
    action: "Consciousness and glucose; examine neurological status.",
    detail: "Rapid neurological evaluation: Glasgow Coma Scale (GCS) or AVPU score. Assess pupillary symmetry and light reflexes. Immediately measure capillary blood glucose to rule out hypoglycemia simulating shock encephalopathy.",
    criticalInterventions: ["Rapid capillary blood glucose measurement", "GCS / AVPU assessment", "Pupil examination (symmetry, reactivity)", "Recognize signs of raised ICP"],
  },
  {
    letter: "E",
    name: "Exposure",
    action: "Examine for cause and prevent hypothermia.",
    detail: "Fully undress the patient to inspect for concealed trauma, surgical wounds, purpuric/urticarial rashes, or occult infection. Cover with warm blankets immediately afterward to prevent hypothermia and coagulopathy, maintaining dignity.",
    criticalInterventions: ["Full log roll / body examination", "Inspect skin for rash (petechiae, hives)", "Measure core body temperature", "Active warm blankets to prevent hypothermia"],
  },
];

interface InterventionRow {
  intervention: string;
  clinicalPrinciple: string;
}

const INTERVENTIONS: InterventionRow[] = [
  {
    intervention: "Crystalloids",
    clinicalPrinciple: "Use when indicated; reassess response and avoid overload. Balanced crystalloids (e.g. Plasmalyte) preferred.",
  },
  {
    intervention: "Blood products",
    clinicalPrinciple: "For significant hemorrhage according to protocol. Utilize balanced 1:1:1 PRBCs, plasma, and platelets.",
  },
  {
    intervention: "Norepinephrine",
    clinicalPrinciple: "Usual first-line vasopressor in septic and distributive shock to restore vascular tone and maintain MAP ≥ 65 mmHg.",
  },
  {
    intervention: "Epinephrine IM",
    clinicalPrinciple: "First-line treatment for anaphylaxis. 0.5 mg IM in mid-anterolateral thigh. Repeat every 5–15 minutes as needed.",
  },
  {
    intervention: "Definitive treatment",
    clinicalPrinciple: "Control bleeding, treat infection, support heart, or relieve mechanical obstruction.",
  },
];

export function AbcdeFlowDiagram() {
  const [activeStep, setActiveStep] = useState<AbcdeCard>(ABCDE_STEPS[0]);

  return (
    <div className="space-y-6">
      {/* 4 Cards Matching Reference Slide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* A - Airway */}
        <div
          onClick={() => setActiveStep(ABCDE_STEPS[0])}
          className={`cursor-pointer rounded-xl bg-navy-900 border p-5 text-white transition-all ${
            activeStep.letter === "A" ? "border-teal-500 ring-1 ring-teal-500/50 shadow-md" : "border-slate-700/60 hover:border-slate-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
              A
            </span>
            <h4 className="text-base font-bold text-white">Airway</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Assess patency; protect airway when needed.
          </p>
        </div>

        {/* B - Breathing */}
        <div
          onClick={() => setActiveStep(ABCDE_STEPS[1])}
          className={`cursor-pointer rounded-xl bg-navy-900 border p-5 text-white transition-all ${
            activeStep.letter === "B" ? "border-teal-500 ring-1 ring-teal-500/50 shadow-md" : "border-slate-700/60 hover:border-slate-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
              B
            </span>
            <h4 className="text-base font-bold text-white">Breathing</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Assess oxygenation; oxygen / ventilatory support when indicated.
          </p>
        </div>

        {/* C - Circulation */}
        <div
          onClick={() => setActiveStep(ABCDE_STEPS[2])}
          className={`cursor-pointer rounded-xl bg-navy-900 border p-5 text-white transition-all ${
            activeStep.letter === "C" ? "border-teal-500 ring-1 ring-teal-500/50 shadow-md" : "border-slate-700/60 hover:border-slate-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
              C
            </span>
            <h4 className="text-base font-bold text-white">Circulation</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pulse, BP, IV access, bleeding control, appropriate fluids / blood, ECG.
          </p>
        </div>

        {/* D / E - Disability / Exposure */}
        <div
          onClick={() => setActiveStep(ABCDE_STEPS[3])}
          className={`cursor-pointer rounded-xl bg-navy-900 border p-5 text-white transition-all ${
            activeStep.letter === "D" || activeStep.letter === "E" ? "border-teal-500 ring-1 ring-teal-500/50 shadow-md" : "border-slate-700/60 hover:border-slate-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
              D · E
            </span>
            <h4 className="text-base font-bold text-white">Disability / Exposure</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Consciousness and glucose; examine for cause and prevent hypothermia.
          </p>
        </div>
      </div>

      {/* Selected Step Deep Dive */}
      <div className="rounded-xl bg-navy-950 border border-slate-800 p-5 text-white text-xs">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
          <span className="font-bold text-teal-300 text-sm">
            {activeStep.letter} — {activeStep.name} Detailed Resuscitation Protocol
          </span>
          <span className="text-[11px] text-slate-400">
            {activeStep.action}
          </span>
        </div>
        <p className="text-slate-300 mb-3 leading-relaxed">
          {activeStep.detail}
        </p>
        <div>
          <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider block mb-1">
            Immediate Clinical Actions:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeStep.criticalInterventions.map((action, i) => (
              <div key={i} className="flex items-center gap-1.5 p-2 rounded bg-navy-900 border border-slate-800 text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intervention Table Matching Reference Slide */}
      <div className="rounded-xl bg-navy-900 border border-slate-700/60 p-6 text-white shadow-editorial">
        <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-4 pb-2 border-b border-slate-800">
          Intervention & Clinical Principle Table
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-teal-400 uppercase tracking-wider">
                <th className="py-2.5 px-3 w-1/3">Intervention</th>
                <th className="py-2.5 px-3 w-2/3">Clinical Principle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {INTERVENTIONS.map((row, idx) => (
                <tr key={idx} className="hover:bg-navy-800/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-100">
                    {row.intervention}
                  </td>
                  <td className="py-3 px-3 text-slate-300 leading-relaxed">
                    {row.clinicalPrinciple}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Educational Principles Disclaimer */}
      <div className="rounded-lg bg-navy-850 border border-gold-500/40 p-4 clinical-pearl-border text-slate-200 text-sm">
        <p className="leading-relaxed">
          <strong className="text-gold-400 uppercase tracking-wide text-xs font-semibold block mb-0.5">
            Educational Disclaimer
          </strong>
          These resuscitation principles represent general clinical educational guidelines. They do not constitute individualized medical orders or institutional protocols.
        </p>
      </div>
    </div>
  );
}
