"use client";

import React, { useState } from "react";
import { ArrowRight, Zap, AlertTriangle, ShieldCheck, Skull } from "lucide-react";

interface CascadeNode {
  id: string;
  label: string;
  tag: string;
  detail: string;
}

const FLOW_ROW_1: CascadeNode[] = [
  {
    id: "init",
    label: "Initiating Event",
    tag: "Primary Insult",
    detail: "Hemorrhage, massive myocardial infarction, septic bacteremia, or pericardial tamponade disrupting normal hemodynamics.",
  },
  {
    id: "perfusion",
    label: "↓ Perfusion / O2 Delivery",
    tag: "Microvascular",
    detail: "Systemic capillary oxygen transport drops below the critical threshold required to support baseline cellular metabolism.",
  },
  {
    id: "hypoxia",
    label: "Cellular Hypoxia",
    tag: "Mitochondrial",
    detail: "Mitochondria cannot access molecular oxygen, arresting oxidative phosphorylation and aerobic Krebs cycle function.",
  },
  {
    id: "atp",
    label: "↓ ATP Production",
    tag: "Bioenergetics",
    detail: "Cellular energy currency collapses. ATP-dependent ion channels (Na+/K+ ATPase) fail, causing cell swelling and membrane damage.",
  },
];

const FLOW_ROW_2: CascadeNode[] = [
  {
    id: "anaerobic",
    label: "Anaerobic Metabolism",
    tag: "Metabolic Shift",
    detail: "Cells revert to anaerobic glycolysis to generate emergency ATP, producing 2 ATP per glucose instead of 36 ATP.",
  },
  {
    id: "lactate",
    label: "Lactate May Rise",
    tag: "Biomarker",
    detail: "Unoxidized pyruvate is converted into lactic acid by lactate dehydrogenase, producing systemic metabolic lactic acidosis.",
  },
  {
    id: "dysfunction",
    label: "Cellular Dysfunction",
    tag: "Cytopathic",
    detail: "Intracellular acidosis, calcium overload, lysosomal enzyme leakage, and reactive oxygen species destroy organelle structure.",
  },
  {
    id: "organ_injury",
    label: "Organ Injury",
    tag: "Clinical Stage",
    detail: "End-organ ischemia: acute tubular necrosis (kidneys), ARDS (lungs), ischemic hepatitis ('shock liver'), and encephalopathy.",
  },
];

export function PathophysiologyCascade() {
  const [selectedNode, setSelectedNode] = useState<CascadeNode | null>(FLOW_ROW_1[1]);

  return (
    <div className="space-y-6">
      {/* Top Interactive Flow Diagram Card */}
      <div className="rounded-xl bg-navy-900 border border-slate-700/60 p-6 text-white shadow-editorial">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
            Cellular Cascade Sequence
          </span>
          <span className="text-xs text-slate-400">
            Click any step to view cellular mechanism
          </span>
        </div>

        {/* Cascade Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3">
          {FLOW_ROW_1.map((node, i) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`relative flex flex-col p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? "bg-navy-800 border-teal-500 shadow-md ring-1 ring-teal-500/50"
                    : "bg-navy-850 border-slate-800 hover:border-slate-700 hover:bg-navy-800/60"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Step 0{i + 1}</span>
                  <span className="text-teal-400 text-[10px] uppercase font-mono">{node.tag}</span>
                </div>
                <div className="font-semibold text-sm text-slate-100 flex items-center justify-between">
                  <span>{node.label}</span>
                  {i < 3 && <ArrowRight className="hidden sm:inline w-3 h-3 text-slate-500 ml-1 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Turnaround arrow indicator */}
        <div className="hidden sm:flex justify-end pr-8 py-1">
          <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
            <span>Progressive dysoxia</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-90 text-teal-500" />
          </div>
        </div>

        {/* Cascade Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {FLOW_ROW_2.map((node, i) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`relative flex flex-col p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? "bg-navy-800 border-gold-500 shadow-md ring-1 ring-gold-500/50"
                    : "bg-navy-850 border-slate-800 hover:border-slate-700 hover:bg-navy-800/60"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Step 0{i + 5}</span>
                  <span className="text-gold-400 text-[10px] uppercase font-mono">{node.tag}</span>
                </div>
                <div className="font-semibold text-sm text-slate-100 flex items-center justify-between">
                  <span>{node.label}</span>
                  {i < 3 && <ArrowRight className="hidden sm:inline w-3 h-3 text-slate-500 ml-1 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Node Detail Box */}
        {selectedNode && (
          <div className="mt-5 p-4 rounded-lg bg-navy-950 border border-slate-800 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-teal-400" />
              <h5 className="font-bold text-teal-300">
                {selectedNode.label} ({selectedNode.tag})
              </h5>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {selectedNode.detail}
            </p>
          </div>
        )}
      </div>

      {/* Two Comparative Cards: Compensated vs Progressive/Refractory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Compensated */}
        <div className="rounded-xl bg-navy-900 border border-slate-700/60 p-5 text-white">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h4 className="text-base font-bold text-white">
              Compensated Shock (Early)
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span><strong>Tachycardia and vasoconstriction:</strong> Sympathetic discharge maintains systemic perfusion pressure.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span><strong>Blood pressure may be preserved:</strong> Normal systolic BP masks occult hypoperfusion.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
              <span><strong>Vital organs prioritized:</strong> Splanchnic, renal, and cutaneous circulation is sacrificed to preserve brain and heart flow.</span>
            </li>
          </ul>
        </div>

        {/* Progressive -> Refractory */}
        <div className="rounded-xl bg-navy-900 border border-gold-500/50 p-5 text-white clinical-pearl-border">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
            <Skull className="w-5 h-5 text-gold-500" />
            <h4 className="text-base font-bold text-gold-300">
              Progressive → Refractory Shock (Late)
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
              <span><strong>Persistent hypoperfusion & hypotension:</strong> Compensatory vasoconstriction fails due to local metabolic acidosis.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
              <span><strong>Metabolic and cellular injury:</strong> Capillary endothelial barrier collapses, provoking systemic plasma leak.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
              <span><strong>Multiple Organ Dysfunction (MODS):</strong> Coagulopathy, acute renal shutdown, and refractory circulatory collapse.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Caution Panel */}
      <div className="rounded-lg bg-navy-850 border border-gold-500/40 p-4 clinical-pearl-border text-slate-200 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-gold-500 shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-500">
            Clinical Teaching Note
          </span>
        </div>
        <p className="leading-relaxed">
          Stages are a clinical teaching model. Deterioration may be rapid; do not wait for hypotension or a particular stage to treat.
        </p>
      </div>
    </div>
  );
}
