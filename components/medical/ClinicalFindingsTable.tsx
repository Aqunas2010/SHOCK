"use client";

import React, { useState } from "react";
import { Stethoscope, FileSearch, AlertCircle, Info } from "lucide-react";

interface FindingRow {
  system: string;
  findings: string;
  pathophysiology: string;
}

const BEDSIDE_FINDINGS: FindingRow[] = [
  {
    system: "Cardiovascular (CV)",
    findings: "Tachycardia (>100 bpm), hypotension (late), weak/thready pulse, narrow or wide pulse pressure.",
    pathophysiology: "Baroreceptor activation drives sympathetic tachycardia; stroke volume reduction narrows pulse pressure in cold shock.",
  },
  {
    system: "Respiratory",
    findings: "Tachypnea (>20–22/min), breathlessness, accessory muscle use, crackles (in cardiogenic pulmonary edema).",
    pathophysiology: "Respiratory center compensates for metabolic lactic acidosis by blowing off CO2 (Kussmaul breathing).",
  },
  {
    system: "Neurological",
    findings: "Restlessness, acute anxiety, confusion, lethargy, encephalopathy, progressive obtundation, or coma.",
    pathophysiology: "Reduced cerebral cortical perfusion pressure when MAP falls below autoregulatory range (~60–65 mmHg).",
  },
  {
    system: "Renal",
    findings: "Reduced urine output (< 0.5 mL/kg/h in adults), dark concentrated urine, progressive oliguria or anuria.",
    pathophysiology: "Prerenal hypoperfusion: renal vasoconstriction, RAAS, and ADH maximize tubular sodium/water preservation.",
  },
  {
    system: "Skin / Integumentary",
    findings: "Cold, clammy, mottled skin with delayed capillary refill (>3s) OR warm, flushed skin with flash CRT (<1s).",
    pathophysiology: "Cutaneous vasoconstriction to shunt blood to vital organs (cold shock) vs peripheral vasodilation (early warm distributive shock).",
  },
];

interface InvestigationItem {
  name: string;
  timing: string;
  purpose: string;
}

const INVESTIGATIONS: InvestigationItem[] = [
  {
    name: "Serum Blood Lactate",
    timing: "Immediate (Stat)",
    purpose: "Direct biochemical marker of anaerobic cellular metabolism and dysoxia. Serial clearance measures resuscitation efficacy.",
  },
  {
    name: "Complete Blood Count (CBC)",
    timing: "Urgent",
    purpose: "Evaluate for leukocytosis/leukopenia (sepsis), hemoconcentration (dehydration), or severe acute anemia/thrombocytopenia.",
  },
  {
    name: "Electrolytes, Renal & Liver Function",
    timing: "Urgent",
    purpose: "Assess for prerenal acute kidney injury (BUN/creatinine ratio), electrolyte dysregulation, and ischemic hepatitis ('shock liver').",
  },
  {
    name: "Arterial or Venous Blood Gas (ABG/VBG)",
    timing: "Urgent",
    purpose: "Quantify metabolic acidosis, base deficit, anion gap, and assess oxygenation (PaO2) and ventilatory adequacy (PaCO2).",
  },
  {
    name: "12-Lead ECG & Cardiac Troponin",
    timing: "Within 10 mins",
    purpose: "Rule out acute coronary syndromes (STEMI/NSTEMI), malignant dysrhythmias, and right ventricular strain patterns.",
  },
  {
    name: "Blood Cultures (2 sets)",
    timing: "Prior to antibiotics",
    purpose: "Essential for microbiologic identification before broad-spectrum antimicrobials in suspected septic shock.",
  },
  {
    name: "Chest Radiography (CXR)",
    timing: "Prompt (portable)",
    purpose: "Identify pulmonary edema, pneumonic consolidation, pneumothorax, or mediastinal widening.",
  },
  {
    name: "Bedside Echocardiography & POCUS",
    timing: "Immediate bedside",
    purpose: "Rapidly inspect cardiac contractility, pericardial effusion (tamponade), RV dilation (PE), and IVC collapsibility (volume status).",
  },
];

export function ClinicalFindingsTable() {
  const [selectedSystem, setSelectedSystem] = useState<FindingRow | null>(null);

  return (
    <div className="space-y-6">
      {/* Bedside Findings Card */}
      <div className="rounded-xl bg-navy-900 border border-slate-700/60 p-6 text-white shadow-editorial">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-400" />
            <h4 className="text-base font-bold text-white">Bedside Findings</h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            ORGAN SYSTEMS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-teal-400">
                <th className="py-2.5 px-3 w-1/4">System</th>
                <th className="py-2.5 px-3 w-3/4">Possible Findings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {BEDSIDE_FINDINGS.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedSystem(row)}
                  className="hover:bg-navy-800/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span>{row.system}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 leading-relaxed">
                    {row.findings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedSystem && (
          <div className="mt-4 p-3.5 rounded-lg bg-navy-950 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>Pathophysiological Mechanism for {selectedSystem.system}:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {selectedSystem.pathophysiology}
            </p>
          </div>
        )}
      </div>

      {/* Investigations Panel */}
      <div className="rounded-xl bg-navy-900 border border-slate-700/60 p-6 text-white shadow-editorial">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-teal-400" />
            <h4 className="text-base font-bold text-white">Investigations Panel</h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            CORE DIAGNOSTICS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {INVESTIGATIONS.map((inv, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-navy-850 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-100 text-sm">
                  {inv.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-navy-950 text-teal-400 font-mono text-[10px] border border-slate-800">
                  {inv.timing}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {inv.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Context Caution Panel */}
      <div className="rounded-lg bg-navy-850 border border-gold-500/40 p-4 clinical-pearl-border text-slate-200 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-gold-500 shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-500">
            Trend Interpretation Directive
          </span>
        </div>
        <p className="leading-relaxed">
          Trend vital signs, MAP, mental status, capillary refill, urine output and lactate. Interpret each in clinical context.
        </p>
      </div>
    </div>
  );
}
