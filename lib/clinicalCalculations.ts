export interface ShockIndexResult {
  shockIndex: number;
  category: "Normal" | "Elevated Risk" | "Severe Shock";
  severityClass: "text-emerald-700 bg-emerald-50 border-emerald-200" | "text-amber-800 bg-amber-50 border-amber-300" | "text-red-700 bg-red-50 border-red-300";
  interpretation: string;
  clinicalAction: string;
}

export interface MapResult {
  map: number;
  pulsePressure: number;
  category: "Adequate Perfusion" | "Borderline Perfusion" | "Critical Hypoperfusion";
  severityClass: "text-emerald-700 bg-emerald-50 border-emerald-200" | "text-amber-800 bg-amber-50 border-amber-300" | "text-red-700 bg-red-50 border-red-300";
  interpretation: string;
  clinicalAction: string;
}

/**
 * Calculates Shock Index (SI = Heart Rate / Systolic BP)
 * Normal: 0.5 - 0.7
 * Elevated Risk / Compensated: 0.7 - 0.9
 * Severe / Decompensated: > 0.9 (or > 1.0)
 */
export function calculateShockIndex(heartRate: number, systolicBp: number): ShockIndexResult {
  if (systolicBp <= 0) {
    throw new Error("Systolic blood pressure must be greater than zero");
  }

  const rawSI = heartRate / systolicBp;
  const shockIndex = Math.round(rawSI * 100) / 100;

  if (shockIndex < 0.7) {
    return {
      shockIndex,
      category: "Normal",
      severityClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
      interpretation: "Normal physiological baseline. Sympathetic tone and circulating stroke volume are balanced.",
      clinicalAction: "Continue routine monitoring and trend vital signs in clinical context.",
    };
  } else if (shockIndex <= 0.9) {
    return {
      shockIndex,
      category: "Elevated Risk",
      severityClass: "text-amber-800 bg-amber-50 border-amber-300",
      interpretation: "Suggests compensated circulatory compromise or early occult hypovolemia. Tachycardia is compensating for reduced stroke volume.",
      clinicalAction: "Perform thorough ABCDE assessment, check serum lactate, assess capillary refill time, and prepare vascular access.",
    };
  } else {
    return {
      shockIndex,
      category: "Severe Shock",
      severityClass: "text-red-700 bg-red-50 border-red-300",
      interpretation: "High risk of decompensated shock, significant occult hemorrhage, and high mortality. Compensatory mechanisms are failing.",
      clinicalAction: "Immediate high-priority resuscitation, activate massive transfusion or critical care bundle, secure emergency airway if needed.",
    };
  }
}

/**
 * Calculates Mean Arterial Pressure (MAP = DBP + (SBP - DBP) / 3)
 * Target in shock: MAP >= 65 mmHg
 */
export function calculateMap(systolicBp: number, diastolicBp: number): MapResult {
  if (systolicBp <= diastolicBp) {
    throw new Error("Systolic BP must be greater than Diastolic BP");
  }

  const pulsePressure = systolicBp - diastolicBp;
  const rawMap = diastolicBp + pulsePressure / 3;
  const map = Math.round(rawMap * 10) / 10;

  if (map >= 65) {
    return {
      map,
      pulsePressure,
      category: "Adequate Perfusion",
      severityClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
      interpretation: "MAP meets or exceeds standard target (≥65 mmHg) for vital organ autoregulation (cerebral, coronary, and renal beds).",
      clinicalAction: "Ensure ongoing tissue oxygenation and monitor for signs of occult dysoxia (e.g. rising lactate or oliguria).",
    };
  } else if (map >= 55) {
    return {
      map,
      pulsePressure,
      category: "Borderline Perfusion",
      severityClass: "text-amber-800 bg-amber-50 border-amber-300",
      interpretation: "Marginal organ perfusion pressure. Autoregulation in cerebral and renal vascular beds is at high risk of failure.",
      clinicalAction: "Initiate prompt hemodynamic support: fluid challenge if hypovolemic, or titrate vasopressors (norepinephrine) to reach target MAP ≥ 65 mmHg.",
    };
  } else {
    return {
      map,
      pulsePressure,
      category: "Critical Hypoperfusion",
      severityClass: "text-red-700 bg-red-50 border-red-300",
      interpretation: "Severe hypotension with immediate risk of myocardial ischemia, cerebral infarction, and acute tubular necrosis.",
      clinicalAction: "Emergency vasopressor / inotropic support and rapid volume resuscitation according to underlying shock classification.",
    };
  }
}
