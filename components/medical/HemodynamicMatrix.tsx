"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface MatrixEntry {
  type: string;
  preload: { val: "down" | "up" | "variable"; label: string };
  co: { val: "down" | "up"; label: string };
  svr: { val: "down" | "up"; label: string };
  scvo2: { val: "down" | "up"; label: string };
  primaryDefect: string;
  treatment: string;
}

const MATRIX_DATA: MatrixEntry[] = [
  {
    type: "Hypovolemic",
    preload: { val: "down", label: "Markedly Decreased (↓↓)" },
    co: { val: "down", label: "Decreased (↓↓)" },
    svr: { val: "up", label: "Increased (↑↑)" },
    scvo2: { val: "down", label: "Decreased (<65%)" },
    primaryDefect: "Intravascular volume depletion",
    treatment: "Anatomical bleeding control, crystalloids, balanced 1:1:1 blood transfusion",
  },
  {
    type: "Cardiogenic",
    preload: { val: "up", label: "Markedly Elevated (↑↑)" },
    co: { val: "down", label: "Markedly Decreased (↓↓)" },
    svr: { val: "up", label: "Increased (↑↑)" },
    scvo2: { val: "down", label: "Severely Decreased (<60%)" },
    primaryDefect: "Primary myocardial pump failure",
    treatment: "Inotropes, cautious vasopressors, revascularization (PCI), avoid excess fluids",
  },
  {
    type: "Distributive (Septic)",
    preload: { val: "down", label: "Normal or Decreased (↓)" },
    co: { val: "up", label: "Normal or Elevated (↑)" },
    svr: { val: "down", label: "Markedly Decreased (↓↓)" },
    scvo2: { val: "up", label: "Normal or Elevated (>70%)" },
    primaryDefect: "Loss of vascular tone (vasodilation)",
    treatment: "Norepinephrine, balanced crystalloids, prompt IV antimicrobials, source control",
  },
  {
    type: "Obstructive",
    preload: { val: "up", label: "Elevated CVP / Distorted (↑)" },
    co: { val: "down", label: "Markedly Decreased (↓↓)" },
    svr: { val: "up", label: "Increased (↑↑)" },
    scvo2: { val: "down", label: "Decreased (<60%)" },
    primaryDefect: "Mechanical barrier to flow",
    treatment: "Urgent physical relief: pericardiocentesis, thoracostomy, or thrombolysis",
  },
];

export function HemodynamicMatrix() {
  const [selectedRow, setSelectedRow] = useState<MatrixEntry | null>(null);

  const renderBadge = (dir: "down" | "up" | "variable", text: string) => {
    if (dir === "down") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <ArrowDown className="w-3 h-3 text-blue-600" />
          <span>{text}</span>
        </span>
      );
    }
    if (dir === "up") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <ArrowUp className="w-3 h-3 text-rose-600" />
          <span>{text}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        <Minus className="w-3 h-3" />
        <span>{text}</span>
      </span>
    );
  };

  return (
    <div className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-clinical-border">
        <div>
          <span className="text-xs font-mono text-teal-600 uppercase tracking-wider font-semibold">
            Hemodynamic Profile Comparator
          </span>
          <h4 className="text-lg font-bold text-navy-900">
            Cardiovascular Parameters Across Shock Types
          </h4>
        </div>
        <div className="text-xs text-clinical-muted hidden sm:block">
          Click any row for therapeutic summary
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-navy-900 text-white text-xs uppercase tracking-wider">
              <th className="py-3 px-3">Shock Type</th>
              <th className="py-3 px-3">Preload (CVP/PCWP)</th>
              <th className="py-3 px-3">Cardiac Output (CO)</th>
              <th className="py-3 px-3">Afterload (SVR)</th>
              <th className="py-3 px-3">ScvO2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-border text-xs">
            {MATRIX_DATA.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => setSelectedRow(row)}
                className={`cursor-pointer transition-colors ${
                  selectedRow?.type === row.type ? "bg-teal-50/70" : idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50/50 hover:bg-slate-100/60"
                }`}
              >
                <td className="py-3.5 px-3 font-bold text-navy-900 text-sm">
                  {row.type}
                </td>
                <td className="py-3.5 px-3">
                  {renderBadge(row.preload.val, row.preload.label)}
                </td>
                <td className="py-3.5 px-3">
                  {renderBadge(row.co.val, row.co.label)}
                </td>
                <td className="py-3.5 px-3">
                  {renderBadge(row.svr.val, row.svr.label)}
                </td>
                <td className="py-3.5 px-3">
                  {renderBadge(row.scvo2.val, row.scvo2.label)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRow && (
        <div className="mt-4 p-4 rounded-lg bg-navy-900 text-white text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="font-bold text-teal-300 text-sm">
              {selectedRow.type} Shock Breakdown
            </span>
            <span className="text-slate-400">
              Primary defect: {selectedRow.primaryDefect}
            </span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            <strong className="text-teal-400">Treatment Directives:</strong> {selectedRow.treatment}
          </p>
        </div>
      )}
    </div>
  );
}
