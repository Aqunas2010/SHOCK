"use client";

import React, { useState } from "react";
import { Calculator, Activity, Heart } from "lucide-react";
import { calculateShockIndex, calculateMap, ShockIndexResult, MapResult } from "@/lib/clinicalCalculations";

export function ShockCalculators() {
  const [activeTab, setActiveTab] = useState<"si" | "map">("si");

  // Shock Index inputs
  const [hr, setHr] = useState<number>(115);
  const [sbp, setSbp] = useState<number>(100);

  // MAP inputs
  const [mapSbp, setMapSbp] = useState<number>(90);
  const [mapDbp, setMapDbp] = useState<number>(55);

  let siResult: ShockIndexResult | null = null;
  let siError = "";
  try {
    siResult = calculateShockIndex(hr, sbp);
  } catch (err: unknown) {
    siError = err instanceof Error ? err.message : "Calculation error";
  }

  let mapResult: MapResult | null = null;
  let mapError = "";
  try {
    mapResult = calculateMap(mapSbp, mapDbp);
  } catch (err: unknown) {
    mapError = err instanceof Error ? err.message : "Calculation error";
  }

  return (
    <div className="rounded-xl border border-clinical-border bg-white p-6 shadow-editorial">
      {/* Header and Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-clinical-border">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Interactive Hemodynamic Calculators</span>
          </div>
          <h3 className="text-xl font-bold text-navy-900 mt-1">
            Bedside Perfusion Assessment Tools
          </h3>
        </div>

        <div className="inline-flex rounded-lg border border-clinical-border bg-slate-100 p-1 text-xs">
          <button
            onClick={() => setActiveTab("si")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === "si" ? "bg-navy-900 text-white" : "text-clinical-muted hover:text-navy-900"
            }`}
          >
            Shock Index (SI)
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === "map" ? "bg-navy-900 text-white" : "text-clinical-muted hover:text-navy-900"
            }`}
          >
            Mean Arterial Pressure (MAP)
          </button>
        </div>
      </div>

      {activeTab === "si" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs Column */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="hr-input" className="text-sm font-semibold text-navy-900 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-teal-600" />
                  <span>Heart Rate (bpm)</span>
                </label>
                <span className="font-mono font-bold text-navy-900 text-base">{hr} bpm</span>
              </div>
              <input
                id="hr-input"
                type="range"
                min="40"
                max="180"
                value={hr}
                onChange={(e) => setHr(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-clinical-muted mt-0.5">
                <span>40 bpm (Bradycardia)</span>
                <span>100 bpm</span>
                <span>180 bpm (Severe Tachycardia)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="sbp-input" className="text-sm font-semibold text-navy-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600" />
                  <span>Systolic Blood Pressure (mmHg)</span>
                </label>
                <span className="font-mono font-bold text-navy-900 text-base">{sbp} mmHg</span>
              </div>
              <input
                id="sbp-input"
                type="range"
                min="40"
                max="180"
                value={sbp}
                onChange={(e) => setSbp(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-clinical-muted mt-0.5">
                <span>40 mmHg (Profound)</span>
                <span>90 mmHg (Hypotension threshold)</span>
                <span>180 mmHg</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-clinical-border text-xs text-clinical-muted leading-relaxed">
              <strong>Equation:</strong> <code className="font-mono text-navy-900 font-semibold">Shock Index = Heart Rate ÷ Systolic BP</code>
              <br />
              A normal ratio is 0.5 to 0.7. Values &gt; 0.9 signify a high risk of occult hypoperfusion, bleeding, and need for transfusion.
            </div>
          </div>

          {/* Results Column */}
          {siResult && (
            <div className="flex flex-col justify-between p-5 rounded-xl border border-clinical-border bg-slate-50/50">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-clinical-muted block mb-1">
                  Calculated Score
                </span>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-extrabold text-navy-900 font-mono">
                    {siResult.shockIndex}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${siResult.severityClass}`}>
                    {siResult.category}
                  </span>
                </div>

                <div className="space-y-3 mt-4 text-sm">
                  <div>
                    <span className="text-xs font-bold uppercase text-clinical-muted block">
                      Physiological Interpretation:
                    </span>
                    <p className="text-clinical-text text-xs leading-relaxed mt-0.5">
                      {siResult.interpretation}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase text-clinical-muted block">
                      Recommended Clinical Action:
                    </span>
                    <p className="text-clinical-text text-xs leading-relaxed mt-0.5">
                      {siResult.clinicalAction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-clinical-border text-[11px] text-clinical-muted">
                Note: Shock index is especially sensitive in detecting early compensated hemorrhagic and septic shock prior to systolic hypotension.
              </div>
            </div>
          )}
          {siError && <div className="text-xs text-red-600">{siError}</div>}
        </div>
      ) : (
        /* MAP Calculator */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="map-sbp-input" className="text-sm font-semibold text-navy-900">
                  Systolic Blood Pressure (SBP)
                </label>
                <span className="font-mono font-bold text-navy-900 text-base">{mapSbp} mmHg</span>
              </div>
              <input
                id="map-sbp-input"
                type="range"
                min="50"
                max="200"
                value={mapSbp}
                onChange={(e) => setMapSbp(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="map-dbp-input" className="text-sm font-semibold text-navy-900">
                  Diastolic Blood Pressure (DBP)
                </label>
                <span className="font-mono font-bold text-navy-900 text-base">{mapDbp} mmHg</span>
              </div>
              <input
                id="map-dbp-input"
                type="range"
                min="30"
                max={mapSbp - 5}
                value={mapDbp}
                onChange={(e) => setMapDbp(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-clinical-border text-xs text-clinical-muted leading-relaxed">
              <strong>Equation:</strong> <code className="font-mono text-navy-900 font-semibold">MAP = DBP + ⅓(SBP - DBP)</code>
              <br />
              Standard clinical guidelines (e.g. Surviving Sepsis Campaign) recommend maintaining MAP ≥ 65 mmHg to sustain vital organ perfusion.
            </div>
          </div>

          {mapResult && (
            <div className="flex flex-col justify-between p-5 rounded-xl border border-clinical-border bg-slate-50/50">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-clinical-muted block mb-1">
                  Mean Arterial Pressure
                </span>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-extrabold text-navy-900 font-mono">
                    {mapResult.map} <span className="text-sm font-normal text-clinical-muted font-sans">mmHg</span>
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${mapResult.severityClass}`}>
                    {mapResult.category}
                  </span>
                </div>

                <div className="text-xs text-clinical-muted mb-3">
                  Pulse Pressure: <strong className="text-navy-900 font-mono">{mapResult.pulsePressure} mmHg</strong>
                </div>

                <div className="space-y-3 mt-4 text-sm">
                  <div>
                    <span className="text-xs font-bold uppercase text-clinical-muted block">
                      Physiological Perfusion State:
                    </span>
                    <p className="text-clinical-text text-xs leading-relaxed mt-0.5">
                      {mapResult.interpretation}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase text-clinical-muted block">
                      Clinical Action:
                    </span>
                    <p className="text-clinical-text text-xs leading-relaxed mt-0.5">
                      {mapResult.clinicalAction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-clinical-border text-[11px] text-clinical-muted">
                Educational reference only. Hemodynamic management must be individualized with echocardiography and clinical response.
              </div>
            </div>
          )}
          {mapError && <div className="text-xs text-red-600">{mapError}</div>}
        </div>
      )}
    </div>
  );
}
