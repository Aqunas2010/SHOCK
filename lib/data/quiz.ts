export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  number: number;
  category: "Physiology" | "Hypovolemic" | "Cardiogenic" | "Distributive" | "Obstructive" | "Assessment" | "ABCDE";
  question: string;
  scenario?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  clinicalPearl: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    number: 1,
    category: "Physiology",
    question: "A 28-year-old trauma patient has a heart rate of 118 bpm, blood pressure of 116/82 mmHg, respiratory rate of 22/min, and a capillary refill time of 3.5 seconds. What is the most accurate physiological interpretation of this patient's condition?",
    options: [
      { id: "a", text: "The patient is hemodynamically normal because the blood pressure is within normal limits." },
      { id: "b", text: "The patient is in compensated shock, where sympathetic vasoconstriction and tachycardia are preserving blood pressure despite hypoperfusion." },
      { id: "c", text: "The patient is in irreversible cardiogenic shock requiring immediate inotropic infusion." },
      { id: "d", text: "The patient has pure respiratory distress and circulatory resuscitation is not indicated." },
    ],
    correctOptionId: "b",
    explanation: "Shock is not synonymous with arterial hypotension. In compensated shock, baroreceptor reflexes trigger intense sympathetic activation, causing tachycardia and arteriolar vasoconstriction (raising diastolic pressure and narrowing pulse pressure). Organ hypoperfusion is evidenced by prolonged capillary refill (>3s) and tachypnea.",
    clinicalPearl: "Compensated shock presents with tachycardia and cool peripheries while blood pressure remains preserved. Never wait for hypotension to begin resuscitation.",
  },
  {
    id: "q2",
    number: 2,
    category: "Physiology",
    question: "According to the fundamental hemodynamic equation CO = HR × SV, which physiological factor directly governs Stroke Volume (SV)?",
    options: [
      { id: "a", text: "Preload, myocardial contractility, and afterload." },
      { id: "b", text: "Arterial oxygen saturation and hemoglobin concentration exclusively." },
      { id: "c", text: "Respiratory rate and tidal volume." },
      { id: "d", text: "Serum lactate clearance rate." },
    ],
    correctOptionId: "a",
    explanation: "Stroke volume (SV) is determined by three interdependent factors: Preload (the end-diastolic volume stretching myocardial fibers), Contractility (the intrinsic inotropic state of the myocardium), and Afterload (the systemic vascular resistance opposing ventricular ejection).",
    clinicalPearl: "Cardiac Output = Heart Rate × Stroke Volume. Any acute drop in preload, contractility, or extreme rise in afterload reduces forward output.",
  },
  {
    id: "q3",
    number: 3,
    category: "Hypovolemic",
    question: "A 34-year-old motorcyclist arrives after a high-speed collision with active pelvic instability, heart rate 130 bpm, BP 84/50 mmHg, and cold clammy skin. Which resuscitation strategy is most appropriate?",
    options: [
      { id: "a", text: "Infuse 3 liters of cold 0.9% normal saline as rapidly as possible before imaging." },
      { id: "b", text: "Definitive bleeding control, pelvic binder application, and balanced blood component transfusion (1:1:1 PRBCs, FFP, platelets)." },
      { id: "c", text: "Start high-dose dobutamine infusion to increase cardiac inotropic state." },
      { id: "d", text: "Administer high-dose loop diuretics to stimulate renal clearance." },
    ],
    correctOptionId: "b",
    explanation: "In hemorrhagic shock, the primary defect is loss of whole blood. Rapid infusion of large clear crystalloid volumes dilutes clotting factors, worsens acidosis, and induces hypothermia ('the lethal triad'). Balanced damage control resuscitation with 1:1:1 blood products, tranexamic acid, and rapid anatomical source control is standard of care.",
    clinicalPearl: "Hemorrhagic shock requires blood product replacement and mechanical hemostasis. Avoid large volumes of crystalloid.",
  },
  {
    id: "q4",
    number: 4,
    category: "Cardiogenic",
    question: "A 66-year-old patient with an acute anterior STEMI presents with BP 80/54 mmHg, HR 105 bpm, cold extremities, bilateral diffuse pulmonary crackles, and elevated jugular venous pressure. Which hemodynamic profile is characteristic of this condition?",
    options: [
      { id: "a", text: "Decreased Preload, increased Cardiac Output, and markedly decreased SVR." },
      { id: "b", text: "Elevated Preload (CVP/PCWP), severely decreased Cardiac Output, and elevated SVR." },
      { id: "c", text: "Normal Preload, elevated Cardiac Output, and low SVR." },
      { id: "d", text: "Decreased Preload, decreased Cardiac Output, and decreased SVR." },
    ],
    correctOptionId: "b",
    explanation: "Cardiogenic shock is characterized by severe primary pump failure. As the left ventricle fails to eject forward volume, cardiac output (CO) falls precipitously. Blood backs up into the pulmonary circulation (raising PCWP and causing pulmonary edema) and venous system (raising CVP). The body compensates with intense arteriolar vasoconstriction (high SVR).",
    clinicalPearl: "Cardiogenic shock features low cardiac output with high filling pressures (congestion). Indiscriminate fluid administration worsens pulmonary edema.",
  },
  {
    id: "q5",
    number: 5,
    category: "Obstructive",
    question: "A 45-year-old woman collapses with sudden pleuritic chest pain and severe dyspnea. Her BP is 78/48 mmHg, HR 122 bpm, lungs are clear to auscultation bilaterally, and bedside echocardiography demonstrates a severely dilated right ventricle with a flattened interventricular septum. What is the most likely diagnosis?",
    options: [
      { id: "a", text: "Massive Pulmonary Embolism causing obstructive shock." },
      { id: "b", text: "Acute Left Ventricular Myocardial Infarction." },
      { id: "c", text: "Septic shock from an occult urinary source." },
      { id: "d", text: "Neurogenic shock secondary to disc herniation." },
    ],
    correctOptionId: "a",
    explanation: "Massive pulmonary embolism obstructs the pulmonary arterial tree, creating acute right ventricular afterload failure. The acute RV dilation and strain (McConnell's sign, septal flattening), combined with clear lung fields and profound hypotension, are classic hallmarks of obstructive shock requiring urgent reperfusion (thrombolysis or embolectomy).",
    clinicalPearl: "Clear lungs in a patient with severe hypotension and acute RV strain strongly suggest obstructive shock from massive pulmonary embolism.",
  },
  {
    id: "q6",
    number: 6,
    category: "Distributive",
    question: "A 19-year-old student develops sudden facial swelling, stridor, diffuse urticaria, and a blood pressure of 72/40 mmHg two minutes after eating peanut sauce. What is the immediate first-line medication?",
    options: [
      { id: "a", text: "Intravenous diphenhydramine (antihistamine)." },
      { id: "b", text: "Intramuscular Epinephrine into the anterolateral mid-thigh." },
      { id: "c", text: "Oral dexamethasone (corticosteroid)." },
      { id: "d", text: "Nebulized salbutamol alone." },
    ],
    correctOptionId: "b",
    explanation: "Intramuscular Epinephrine (0.5 mg in adults, 1:1,000 solution) into the anterolateral mid-thigh is the immediate, non-negotiable first-line treatment for anaphylactic shock. Epinephrine provides alpha-1 vasoconstriction to restore vascular tone and reverse mucosal edema, beta-1 cardiac support, and beta-2 bronchodilation while halting further mast cell mediator release. Antihistamines and steroids must never delay epinephrine.",
    clinicalPearl: "Epinephrine IM is the only life-saving first-line medication in anaphylaxis. Always inject in the mid-anterolateral thigh.",
  },
  {
    id: "q7",
    number: 7,
    category: "Distributive",
    question: "Following a cervical spine fracture at C5, a patient has a blood pressure of 82/46 mmHg, heart rate of 48 bpm, and warm, dry extremities. How does neurogenic shock differ hemodynamically from hypovolemic shock?",
    options: [
      { id: "a", text: "Neurogenic shock causes reflex tachycardia and severe peripheral vasoconstriction." },
      { id: "b", text: "Neurogenic shock causes loss of sympathetic tone, producing hypotension WITH bradycardia and warm, dry skin due to vasodilation." },
      { id: "c", text: "Neurogenic shock causes elevated systemic vascular resistance and cold clammy skin." },
      { id: "d", text: "Neurogenic shock causes pulmonary edema and marked jugular venous distension." },
    ],
    correctOptionId: "b",
    explanation: "Disruption of descending sympathetic pathways above T6 produces loss of vascular vasomotor tone (vasodilation) and uncouples cardiac sympathetic accelerator fibers, leaving parasympathetic vagal innervation unopposed. This yields the unique clinical combination of hypotension with bradycardia and warm, dry peripheries.",
    clinicalPearl: "Hypotension + Bradycardia + Warm Dry Skin following trauma = Neurogenic Shock until proven otherwise.",
  },
  {
    id: "q8",
    number: 8,
    category: "Assessment",
    question: "Which of the following laboratory findings is the most reliable clinical indicator of cellular hypoperfusion and anaerobic metabolism during shock resuscitation?",
    options: [
      { id: "a", text: "Serial serum blood lactate measurement and lactate clearance rate." },
      { id: "b", text: "Serum sodium concentration." },
      { id: "c", text: "Random blood glucose level alone." },
      { id: "d", text: "Serum alkaline phosphatase." },
    ],
    correctOptionId: "a",
    explanation: "Under tissue hypoxia, pyruvate cannot enter the Krebs cycle and is metabolized into lactic acid. Elevated serum lactate (>2.0 mmol/L, and particularly >4.0 mmol/L) reflects systemic dysoxia. Tracking lactate clearance (a target decrease of ≥10–20% every 2 hours) correlates strongly with successful resuscitation and survival.",
    clinicalPearl: "Serial lactate clearance is a vital surrogate marker for resolving cellular hypoxia during active resuscitation.",
  },
  {
    id: "q9",
    number: 9,
    category: "Assessment",
    question: "A bedside physical exam finding that provides the fastest, non-invasive assessment of peripheral microvascular perfusion at the bedside is:",
    options: [
      { id: "a", text: "Capillary refill time (CRT) measured on the distal finger or patella." },
      { id: "b", text: "Serum creatinine concentration." },
      { id: "c", text: "Presence of bowel sounds." },
      { id: "d", text: "Deep tendon reflexes." },
    ],
    correctOptionId: "a",
    explanation: "Capillary refill time (CRT), when performed with standardized pressure for 10 seconds, provides an immediate bedside assessment of microvascular perfusion. A CRT > 3 seconds correlates with hyperlactatemia, visceral hypoperfusion, and increased mortality (as demonstrated in the ANDROMEDA-SHOCK trial).",
    clinicalPearl: "Prolonged capillary refill time (>3 seconds) is a rapid and reliable bedside warning sign of sympathetic vasoconstriction and hypoperfusion.",
  },
  {
    id: "q10",
    number: 10,
    category: "ABCDE",
    question: "During initial ABCDE resuscitation of a 70-year-old patient in septic shock, fluid resuscitation with balanced crystalloids has been initiated. Blood pressure remains 76/44 mmHg (MAP 55 mmHg). What is the recommended first-line vasopressor to restore vascular tone?",
    options: [
      { id: "a", text: "Norepinephrine infusion titrated to target a MAP ≥ 65 mmHg." },
      { id: "b", text: "High-dose epinephrine bolus every 3 minutes." },
      { id: "c", text: "Dopamine infusion as the universal agent." },
      { id: "d", text: "Phenylephrine oral tablets." },
    ],
    correctOptionId: "a",
    explanation: "According to the Surviving Sepsis Campaign guidelines, Norepinephrine is the first-line vasopressor of choice in septic shock. It provides potent alpha-1 vasoconstriction to counteract pathological vasodilation and restore vascular capacitance, with modest beta-1 inotropic support, while causing less tachycardia and arrhythmias than dopamine.",
    clinicalPearl: "Norepinephrine is the first-line vasopressor in septic shock, titrated to maintain a Mean Arterial Pressure (MAP) of at least 65 mmHg.",
  },
];
