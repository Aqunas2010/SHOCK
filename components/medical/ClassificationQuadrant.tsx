"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Droplets, Heart, Activity, ShieldAlert, ArrowRight, X, ChevronRight } from "lucide-react";

interface ShockTypeDetail {
  id: string;
  number: string;
  name: string;
  mechanism: string;
  causes: string[];
  clinicalClues: string[];
  hemodynamics: {
    preload: string;
    co: string;
    svr: string;
    scvo2: string;
  };
  lessonSlug: string;
}

const SHOCK_TYPES: ShockTypeDetail[] = [
  {
    id: "hypovolemic",
    number: "01",
    name: "Hypovolemic Shock",
    mechanism: "Decreased circulating intravascular blood volume (inadequate preload).",
    causes: ["Traumatic hemorrhage", "Gastrointestinal bleeding", "Postpartum hemorrhage", "Severe dehydration & vomiting", "Major thermal burns"],
    clinicalClues: ["Tachycardia with narrow pulse pressure", "Cold, clammy peripheries", "Delayed capillary refill > 3 sec", "Oliguria < 0.5 mL/kg/h"],
    hemodynamics: {
      preload: "Decreased (↓↓ CVP / PCWP)",
      co: "Decreased (↓↓ CO / CI)",
      svr: "Elevated (↑↑ Compensatory vasoconstriction)",
      scvo2: "Decreased (↓↓ < 65% due to high tissue extraction)",
    },
    lessonSlug: "hypovolemic-shock",
  },
  {
    id: "cardiogenic",
    number: "02",
    name: "Cardiogenic Shock",
    mechanism: "Primary failure of cardiac pump contractility or rate/rhythm.",
    causes: ["Acute myocardial infarction (extensive LV necrosis)", "Severe acute decompensated heart failure", "Fulminant myocarditis", "Malignant ventricular tachyarrhythmias", "Acute valvular regurgitation"],
    clinicalClues: ["Bilateral pulmonary crackles & edema", "Elevated jugular venous distension", "Hypotension with cool extremities", "S3 gallop rhythm"],
    hemodynamics: {
      preload: "Elevated (↑↑ CVP and PCWP venous congestion)",
      co: "Markedly Decreased (↓↓ Forward failure)",
      svr: "Elevated (↑↑ SVR compensatory vasoconstriction)",
      scvo2: "Markedly Decreased (↓↓ < 60% tissue stagnation)",
    },
    lessonSlug: "cardiogenic-vs-obstructive",
  },
  {
    id: "distributive",
    number: "03",
    name: "Distributive Shock",
    mechanism: "Severe systemic loss of vascular tone (vasodilation) and microvascular permeability.",
    causes: ["Septic shock (bacterial, viral, fungal)", "Anaphylactic shock (type I hypersensitivity)", "Neurogenic shock (cervical/high-thoracic spinal cord transection)", "Acute adrenal crisis"],
    clinicalClues: ["Warm, flushed skin in early hyperdynamic phase", "Bounding peripheral pulses", "Wide pulse pressure", "Fever or hypothermia in sepsis", "Wheeze/angioedema in anaphylaxis"],
    hemodynamics: {
      preload: "Low or Normal (relative venous pooling)",
      co: "Normal or Elevated in early hyperdynamic stage (↑ CO)",
      svr: "Markedly Decreased (↓↓ Loss of vasomotor tone)",
      scvo2: "Normal or Elevated (> 70% due to microvascular shunting)",
    },
    lessonSlug: "distributive-shock",
  },
  {
    id: "obstructive",
    number: "04",
    name: "Obstructive Shock",
    mechanism: "Physical, mechanical extracardiac barrier to ventricular filling or outflow.",
    causes: ["Cardiac tamponade (fluid in pericardial sac)", "Massive pulmonary embolism (saddle thrombus in pulmonary arteries)", "Tension pneumothorax (positive pleural pressure kinking vena cava)"],
    clinicalClues: ["Distended jugular veins with CLEAR lung fields", "Pulsus paradoxus in cardiac tamponade", "Unilateral absent breath sounds in tension pneumothorax", "Acute RV strain on bedside ultrasound"],
    hemodynamics: {
      preload: "Elevated or Distorted (↑ CVP, low LV filling in PE/tamponade)",
      co: "Markedly Decreased (↓↓ Forward output)",
      svr: "Elevated (↑↑ SVR compensatory vasoconstriction)",
      scvo2: "Markedly Decreased (↓↓ < 60%)",
    },
    lessonSlug: "cardiogenic-vs-obstructive",
  },
];

export function ClassificationQuadrant() {
  const [selectedType, setSelectedType] = useState<ShockTypeDetail | null>(null);

  const icons = [Droplets, Heart, Activity, ShieldAlert];

  return (
    <div className="space-y-6">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHOCK_TYPES.map((type, idx) => {
          const Icon = icons[idx];
          return (
            <div
              key={type.id}
              className="group relative rounded-xl bg-navy-900 border border-slate-700/60 p-5 text-white transition-all hover:border-teal-500 hover:shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-navy-800 text-teal-400 border border-slate-700/60">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {type.number}
                    </span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400/90 bg-teal-950/60 border border-teal-800/40 px-2 py-0.5 rounded">
                    Primary Defect
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-teal-300 transition-colors">
                  {type.name}
                </h4>

                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  {type.mechanism}
                </p>

                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Common Causes:
                  </span>
                  <p className="text-xs text-slate-300">
                    {type.causes.slice(0, 3).join(" · ")}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedType(type)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  href={`/lessons/${type.lessonSlug}`}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <span>Open Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gold Caution Bottom Banner */}
      <div className="rounded-lg bg-navy-850 border border-gold-500/40 p-4 clinical-pearl-border text-slate-200 text-sm shadow-sm">
        <p className="leading-relaxed">
          <strong className="text-gold-400 uppercase tracking-wide text-xs font-semibold block mb-0.5">
            Therapeutic Directive
          </strong>
          The type of shock directs treatment: volume replacement, cardiac support, vascular support, or relief of obstruction.
        </p>
      </div>

      {/* Detailed Modal Dialog */}
      {selectedType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl bg-navy-900 border border-slate-700 rounded-xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                  Type {selectedType.number} Deep Dive
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {selectedType.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedType(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Pathophysiological Mechanism
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedType.mechanism}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Hemodynamic Profile Matrix
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-navy-950 border border-slate-800">
                    <span className="text-slate-400 block font-medium">Preload (CVP / PCWP)</span>
                    <span className="text-teal-300 font-semibold">{selectedType.hemodynamics.preload}</span>
                  </div>
                  <div className="p-2.5 rounded bg-navy-950 border border-slate-800">
                    <span className="text-slate-400 block font-medium">Cardiac Output (CO / CI)</span>
                    <span className="text-teal-300 font-semibold">{selectedType.hemodynamics.co}</span>
                  </div>
                  <div className="p-2.5 rounded bg-navy-950 border border-slate-800">
                    <span className="text-slate-400 block font-medium">Afterload (SVR)</span>
                    <span className="text-teal-300 font-semibold">{selectedType.hemodynamics.svr}</span>
                  </div>
                  <div className="p-2.5 rounded bg-navy-950 border border-slate-800">
                    <span className="text-slate-400 block font-medium">Central Venous O2 (ScvO2)</span>
                    <span className="text-teal-300 font-semibold">{selectedType.hemodynamics.scvo2}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Key Causes
                </span>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-slate-300">
                  {selectedType.causes.map((cause, i) => (
                    <li key={i}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedType(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <Link
                  href={`/lessons/${selectedType.lessonSlug}`}
                  onClick={() => setSelectedType(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold transition-colors"
                >
                  <span>Go to Full Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
