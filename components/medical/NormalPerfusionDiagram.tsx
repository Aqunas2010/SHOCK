"use client";

import React, { useState } from "react";
import { Activity, Heart, Droplets, Wind, Info } from "lucide-react";

interface StepInfo {
  id: string;
  title: string;
  formula?: string;
  description: string;
  clinicalSignificance: string;
}

const STEPS: StepInfo[] = [
  {
    id: "volume",
    title: "1. Circulating Blood Volume",
    formula: "Effective Circulating Volume = Intravascular Plasma + RBC Mass",
    description: "Adequate blood volume generates venous return (preload) to stretch the right and left ventricles during diastole.",
    clinicalSignificance: "Loss of volume from hemorrhage or severe dehydration leads to reduced preload, initiating hypovolemic shock.",
  },
  {
    id: "pump",
    title: "2. Cardiac Output",
    formula: "CO = HR × SV (Normal: 4.0 – 8.0 L/min)",
    description: "Forward volume ejected per minute equals heart rate multiplied by stroke volume (governed by preload, contractility, and afterload).",
    clinicalSignificance: "Primary pump failure (myocardial infarction) or mechanical impediment (tamponade) causes severe forward flow deficiency.",
  },
  {
    id: "perfusion",
    title: "3. Systemic & Tissue Perfusion",
    formula: "MAP = (CO × SVR) + CVP (Target MAP ≥ 65 mmHg)",
    description: "Microvascular blood flow through arteriolar and capillary exchange beds driven by mean arterial pressure and appropriate vascular tone.",
    clinicalSignificance: "Loss of vascular tone in distributive shock leads to profound vasodilation, relative hypovolemia, and microcirculatory shunting.",
  },
  {
    id: "delivery",
    title: "4. Cellular Oxygen Delivery",
    formula: "DO2 = CO × [ (Hb × 1.34 × SaO2) + (PaO2 × 0.003) ] × 10",
    description: "Diffusion of molecular oxygen from capillary erythrocytes across the interstitium into cellular mitochondria for aerobic respiration.",
    clinicalSignificance: "When DO2 falls below critical metabolic threshold, anaerobic glycolysis begins, generating lactic acid and ATP depletion.",
  },
];

export function NormalPerfusionDiagram() {
  const [activeStepId, setActiveStepId] = useState<string>("volume");
  const currentStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  return (
    <div className="rounded-xl bg-navy-900 border border-slate-700/60 p-6 text-white shadow-editorial">
      {/* Title & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-400">
            Interactive Physiology Model
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">
            Circulation & Cellular Oxygen Delivery Cascade
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-800 border border-slate-700 text-xs text-slate-300">
          <Info className="w-3.5 h-3.5 text-teal-400" />
          <span>Click any node to inspect physiology</span>
        </div>
      </div>

      {/* Interactive Step Navigator / SVG Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        {STEPS.map((step, idx) => {
          const isActive = step.id === activeStepId;
          const icons = [Droplets, Heart, Activity, Wind];
          const IconComponent = icons[idx];

          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`relative flex flex-col p-4 rounded-lg text-left transition-all border ${
                isActive
                  ? "bg-navy-800 border-teal-500 shadow-md ring-1 ring-teal-500/50"
                  : "bg-navy-850 border-slate-800 hover:border-slate-700 hover:bg-navy-800/60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-2 rounded-md ${isActive ? "bg-teal-500 text-white" : "bg-navy-950 text-slate-400"}`}>
                  <IconComponent className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono text-slate-500">
                  0{idx + 1}
                </span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                Stage {idx + 1}
              </span>
              <span className={`text-sm font-bold ${isActive ? "text-teal-300" : "text-slate-200"}`}>
                {step.title.split(". ")[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* SVG Connecting Flow Line */}
      <div className="hidden sm:block w-full mb-6">
        <svg viewBox="0 0 800 32" className="w-full h-8 overflow-visible" aria-hidden="true">
          <line x1="100" y1="16" x2="700" y2="16" stroke="#1D324E" strokeWidth="3" strokeDasharray="6 6" />
          <line
            x1="100"
            y1="16"
            x2={activeStepId === "volume" ? 100 : activeStepId === "pump" ? 300 : activeStepId === "perfusion" ? 500 : 700}
            y2="16"
            stroke="#438F96"
            strokeWidth="3"
            className="transition-all duration-300 ease-out"
          />
          <circle cx="100" cy="16" r="6" fill={activeStepId === "volume" ? "#438F96" : "#1D324E"} />
          <circle cx="300" cy="16" r="6" fill={activeStepId === "pump" ? "#438F96" : "#1D324E"} />
          <circle cx="500" cy="16" r="6" fill={activeStepId === "perfusion" ? "#438F96" : "#1D324E"} />
          <circle cx="700" cy="16" r="6" fill={activeStepId === "delivery" ? "#438F96" : "#1D324E"} />
        </svg>
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="rounded-lg bg-navy-850 border border-slate-700/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-700/60">
          <h4 className="text-base font-bold text-teal-300">
            {currentStep.title}
          </h4>
          {currentStep.formula && (
            <code className="px-2.5 py-1 rounded bg-navy-950 text-teal-400 font-mono text-xs border border-slate-800">
              {currentStep.formula}
            </code>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Physiological Role
            </span>
            <p className="text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          <div className="rounded-md bg-navy-900/80 border border-gold-500/30 p-3.5 clinical-pearl-border">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 block mb-1">
              Clinical Relevance in Shock
            </span>
            <p className="text-slate-200 text-xs leading-relaxed">
              {currentStep.clinicalSignificance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
