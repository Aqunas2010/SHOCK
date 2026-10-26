export interface LessonSection {
  id: string;
  title: string;
  content?: string;
  bullets?: string[];
  callout?: {
    type: "pearl" | "caution" | "note";
    title?: string;
    text: string;
  };
}

export interface Lesson {
  id: string;
  number: number;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  category: "Foundations" | "Classification" | "Pathophysiology" | "Assessment" | "Management" | "Quiz";
  sections: LessonSection[];
  keyTakeaways: string[];
  pearl?: string;
  caution?: string;
  hemodynamicSummary?: {
    preload: string;
    cardiacOutput: string;
    afterload: string;
    scvo2: string;
  };
}

export const LESSONS: Lesson[] = [
  {
    id: "lesson-01",
    number: 1,
    slug: "understanding-shock",
    tag: "01 / OVERVIEW",
    title: "Understanding Shock",
    subtitle: "Clinical Learning & Emergency Management",
    description: "Explore the mechanisms of circulatory failure, recognize clinical warning signs, and study the principles of initial emergency management.",
    estimatedMinutes: 6,
    category: "Foundations",
    sections: [
      {
        id: "core-mission",
        title: "The Clinical Challenge",
        content: "Circulatory shock is one of the most time-critical medical emergencies in acute care. Regardless of the underlying etiology, shock represents a failure of the cardiovascular system to deliver adequate oxygen to tissues relative to their metabolic demands. Early recognition, prompt hemodynamic stabilization, and timely cause-directed intervention are paramount to preventing irreversible end-organ injury.",
      },
      {
        id: "pathway",
        title: "The Systematic Learning Pathway",
        bullets: [
          "Foundations: Basic physiology, cellular oxygen delivery, and the cardiac output equation.",
          "Classification: The four distinct physiological mechanisms of circulatory failure.",
          "Pathophysiology: The cellular cascade from hypoperfusion and anaerobic metabolism to organ dysfunction.",
          "Clinical Assessment: Bedside features, hemodynamic profiling, and essential laboratory and imaging investigations.",
          "Management: Structured ABCDE resuscitation, targeted pharmacotherapy, and definitive source control.",
        ],
      },
      {
        id: "key-pillars",
        title: "Four Core Educational Pillars",
        bullets: [
          "Physiology First: Master the determinants of mean arterial pressure and cardiac output.",
          "Phenotype Recognition: Differentiate between cold and warm shock bedside presentations.",
          "Time-Critical Interventions: Learn immediate life-saving treatments (e.g. IM epinephrine in anaphylaxis, needle decompression in tension pneumothorax).",
          "Rational Investigation: Formulate targeted diagnostic strategies using POCUS, lactate clearance, and hemodynamic monitoring.",
        ],
        callout: {
          type: "pearl",
          title: "Clinical Core Rule",
          text: "Shock is a cellular emergency. Do not wait for arterial hypotension to manifest before initiating resuscitation. Recognize compensated hypoperfusion early.",
        },
      },
    ],
    keyTakeaways: [
      "Shock is an acute imbalance between systemic oxygen delivery (DO2) and oxygen consumption (VO2).",
      "Normal blood pressure does not rule out shock (compensated shock).",
      "Treatment must be tailored to the specific hemodynamic mechanism.",
    ],
  },
  {
    id: "lesson-02",
    number: 2,
    slug: "what-is-shock",
    tag: "01 / CORE CONCEPT",
    title: "What is Shock?",
    subtitle: "Definition and Determinants of Perfusion",
    description: "Shock is an acute circulatory failure in which tissue perfusion and oxygen delivery are inadequate to meet cellular metabolic needs, potentially leading to cellular dysfunction and organ injury.",
    estimatedMinutes: 8,
    category: "Foundations",
    pearl: "Shock is not synonymous with hypotension. Compensated shock can occur with a normal blood pressure through neurohormonal vasoconstriction and tachycardia.",
    sections: [
      {
        id: "definition",
        title: "Formal Definition",
        content: "Shock is fundamentally defined as acute systemic hypoperfusion resulting in cellular dysoxia. While arterial blood pressure is commonly monitored, tissue perfusion—the delivery of oxygenated blood through microvascular capillary beds to parenchymal cells—is the true physiological target.",
      },
      {
        id: "perfusion-determinants",
        title: "Normal Perfusion Depends On",
        bullets: [
          "Adequate circulating blood volume (effective intravascular volume).",
          "Effective cardiac pump function (myocardial contractility, rate, and rhythm).",
          "Appropriate vascular tone (systemic vascular resistance and venous capacitance).",
          "Arterial oxygen content (hemoglobin concentration, oxygen saturation, and PaO2).",
          "Cellular oxygen utilization (intact mitochondrial respiration and enzymatic function).",
        ],
      },
      {
        id: "cardiac-output-formula",
        title: "The Fundamental Hemodynamic Equation",
        content: "Cardiac output (CO) is the volume of blood ejected by the heart per minute. It is determined by heart rate multiplied by stroke volume: CO = HR × SV. Stroke volume is governed by preload (end-diastolic filling), contractility (inotropic state), and afterload (resistance against ejection).",
        bullets: [
          "CO = HR × SV (Cardiac Output = Heart Rate × Stroke Volume)",
          "DO2 = CO × CaO2 × 10 (Oxygen Delivery equals Cardiac Output multiplied by Arterial Oxygen Content)",
          "MAP = CO × SVR + CVP (Mean Arterial Pressure is determined by Flow and Vascular Resistance)",
        ],
        callout: {
          type: "note",
          title: "Physiological Cascade",
          text: "Circulating Volume → Preload → Stroke Volume → Cardiac Output → Systemic Perfusion → Cellular Oxygen Delivery.",
        },
      },
    ],
    keyTakeaways: [
      "Shock is cellular dysoxia resulting from inadequate delivery or utilization of oxygen.",
      "Blood pressure is maintained in early shock by sympathetic vasoconstriction and tachycardia.",
      "Effective perfusion requires blood volume, pump integrity, vascular tone, and oxygen carrying capacity.",
    ],
  },
  {
    id: "lesson-03",
    number: 3,
    slug: "classification-of-shock",
    tag: "02 / FOUR MAJOR TYPES",
    title: "Classification of Shock",
    subtitle: "Classify by the Mechanism",
    description: "The modern clinical taxonomy classifies shock into four distinct pathophysiological categories based on the primary site of cardiovascular failure.",
    estimatedMinutes: 10,
    category: "Classification",
    caution: "The type of shock directs immediate treatment: volume replacement, cardiac support, vascular support, or physical relief of mechanical obstruction. Giving large fluid boluses in cardiogenic shock can precipitate catastrophic pulmonary edema.",
    sections: [
      {
        id: "overview-mechanisms",
        title: "The Four Hemodynamic Phenotypes",
        content: "Originally conceptualized by Weil and Shubin, shock is classified by its primary hemodynamic defect. Identifying the correct mechanism is critical because treatment strategies differ radically.",
      },
      {
        id: "hypovolemic-summary",
        title: "01 · Hypovolemic Shock",
        content: "Caused by an absolute deficit in intravascular fluid volume. The heart is healthy and the vessels can constrict, but there is insufficient venous return (preload) to fill the cardiac ventricles.",
        bullets: [
          "Primary defect: Decreased circulating blood volume (↓ Preload).",
          "Etiologies: Hemorrhage (trauma, GI bleed, ruptured aneurysm, obstetric hemorrhage), dehydration, protracted vomiting/diarrhea, burns, third-spacing.",
          "Hemodynamics: ↓ Preload (CVP/PCWP), ↓ CO, ↑ SVR (compensatory vasoconstriction), ↓ ScvO2.",
        ],
      },
      {
        id: "cardiogenic-summary",
        title: "02 · Cardiogenic Shock",
        content: "Caused by primary failure of the heart as an effective forward pump, resulting in low cardiac output despite adequate or elevated ventricular filling pressures.",
        bullets: [
          "Primary defect: Impaired myocardial pump function (↓ Contractility or severe arrhythmia).",
          "Etiologies: Acute myocardial infarction (>40% LV necrosis), acute decompensated heart failure, myocarditis, severe valvular rupture, refractory ventricular or supraventricular tachyarrhythmias.",
          "Hemodynamics: ↑ Preload (elevated CVP and PCWP), ↓ CO, ↑ SVR, ↓ ScvO2.",
        ],
      },
      {
        id: "distributive-summary",
        title: "03 · Distributive Shock",
        content: "Characterized by severe peripheral vasodilation and abnormal microvascular blood-flow distribution. Circulating volume is initially normal, but vascular capacitance expands dramatically, leading to relative hypovolemia.",
        bullets: [
          "Primary defect: Loss of vascular vasomotor tone (↓ SVR) and microvascular permeability.",
          "Etiologies: Septic shock (most common), anaphylactic shock, neurogenic shock (high spinal cord transection), adrenal crisis.",
          "Hemodynamics: Low or normal Preload, Normal or ↑ CO (early hyperdynamic state), marked ↓ SVR, Normal or ↑ ScvO2 (impaired cellular extraction).",
        ],
      },
      {
        id: "obstructive-summary",
        title: "04 · Obstructive Shock",
        content: "Caused by physical, extracardiac mechanical obstruction to blood flow into or out of the central cardiac chambers.",
        bullets: [
          "Primary defect: Mechanical impediment to cardiac filling or ventricular outflow.",
          "Etiologies: Cardiac tamponade (pericardial effusion compressing right heart), massive pulmonary embolism (RV outflow occlusion), tension pneumothorax (mediastinal compression and vena cava kink).",
          "Hemodynamics: ↑ or distorted Preload (elevated CVP, low PCWP in PE), ↓ CO, ↑ SVR, marked ↓ ScvO2.",
        ],
      },
    ],
    keyTakeaways: [
      "Hypovolemic: Empty pipes. Treat with volume and bleeding control.",
      "Cardiogenic: Broken pump. Treat with inotropes, revascularization, avoid excess fluids.",
      "Distributive: Dilated pipes. Treat with vasopressors, antimicrobial/antigen control, fluids.",
      "Obstructive: Blocked flow. Treat with immediate physical decompression.",
    ],
  },
  {
    id: "lesson-04",
    number: 4,
    slug: "pathophysiology",
    tag: "03 / CELLULAR CONSEQUENCES",
    title: "Pathophysiology",
    subtitle: "From Perfusion Failure to Organ Dysfunction",
    description: "Follow the cascade from initial microvascular hypoperfusion through cellular hypoxia, anaerobic metabolism, ATP depletion, and irreversible multiple organ dysfunction.",
    estimatedMinutes: 9,
    category: "Pathophysiology",
    caution: "Stages of shock are a clinical teaching construct. In clinical reality, patient deterioration can be precipitous. Never delay resuscitation waiting for arterial hypotension or a specific stage.",
    sections: [
      {
        id: "cascade-flow",
        title: "The Cellular Cascade of Dysoxia",
        content: "When oxygen delivery falls below critical DO2, mitochondria can no longer sustain oxidative phosphorylation. Cells switch to anaerobic glycolysis, producing only 2 ATP per glucose molecule compared to 36 ATP under aerobic conditions. Pyruvate is converted to lactate, resulting in metabolic lactic acidosis.",
        bullets: [
          "Initiating Event (volume loss, pump failure, sepsis, or obstruction).",
          "↓ Systemic Perfusion & Microvascular Oxygen Delivery.",
          "Cellular Hypoxia & Mitochondrial Uncoupling.",
          "Depletion of Intracellular Adenosine Triphosphate (ATP).",
          "Anaerobic Glycolysis → Accumulation of Lactic Acid & H+ ions.",
          "Failure of ATP-dependent Na+/K+ membrane pumps → Intracellular edema and cell lysis.",
          "Systemic inflammatory response and Multiple Organ Dysfunction Syndrome (MODS).",
        ],
      },
      {
        id: "compensated-stage",
        title: "Compensated Shock (Early Stage)",
        bullets: [
          "Sympathetic nervous system activation triggers epinephrine and norepinephrine release.",
          "Tachycardia and arteriolar vasoconstriction preserve Mean Arterial Pressure (MAP).",
          "Renin-angiotensin-aldosterone system (RAAS) and ADH release conserve sodium and water.",
          "Blood flow is selectively shunted away from skin, splanchnic circulation, and kidneys to prioritize coronary and cerebral perfusion.",
          "Clinical picture: Normal blood pressure, mild tachypnea, cool extremities, mild oliguria, subtle anxiety.",
        ],
      },
      {
        id: "progressive-refractory-stage",
        title: "Progressive and Refractory Shock (Advanced Stage)",
        bullets: [
          "Compensatory vasoconstriction eventually causes severe local tissue ischemia.",
          "Arteriolar sphincters dilate under local acidic conditions while venules remain constricted, causing capillary pooling and plasma extravasation.",
          "Profound endothelial cell injury activates coagulation cascades, leading to microvascular thrombosis (DIC).",
          "Myocardial depressant factors and persistent acidosis blunt cardiac responsiveness to catecholamines.",
          "Clinical picture: Severe hypotension, altered mental status, anuria, cyanosis, cold mottled extremities, refractory lactic acidosis, multi-organ failure.",
        ],
      },
    ],
    keyTakeaways: [
      "Anaerobic metabolism yields only 5% of normal ATP and generates lactic acid.",
      "Compensatory mechanisms can maintain normal blood pressure despite significant volume deficit.",
      "Uncorrected cellular hypoxia triggers a self-reinforcing downward spiral of microvascular collapse.",
    ],
  },
  {
    id: "lesson-05",
    number: 5,
    slug: "hypovolemic-shock",
    tag: "04 / VOLUME LOSS",
    title: "Hypovolemic and Hemorrhagic Shock",
    subtitle: "Etiology, Hemodynamics, and Resuscitation Principles",
    description: "Explore the most frequent cause of shock worldwide: acute volume depletion from hemorrhage or fluid loss, resulting in decreased preload and inadequate systemic delivery.",
    estimatedMinutes: 9,
    category: "Management",
    pearl: "In trauma or massive hemorrhage, prioritize definitive anatomical hemorrhage control and balanced blood resuscitation (1:1:1 PRBC, FFP, platelets) over aggressive clear crystalloid infusion.",
    sections: [
      {
        id: "causes-hypovolemia",
        title: "Etiological Spectrum",
        bullets: [
          "Hemorrhage: Polytrauma, blunt/penetrating torso injuries, gastrointestinal hemorrhage (varices, peptic ulcers), ruptured ectopic pregnancy, postpartum hemorrhage, ruptured abdominal aortic aneurysm.",
          "Non-hemorrhagic fluid loss: Severe gastroenteritis (vomiting, diarrhea), diabetic ketoacidosis (osmotic diuresis), heat stroke, systemic burns (massive plasma exudation).",
          "Third-space sequestering: Acute pancreatitis, bowel obstruction, peritonitis.",
        ],
      },
      {
        id: "hemodynamic-sequence",
        title: "Pathophysiological Sequence",
        content: "Acute volume loss directly diminishes venous return to the right atrium (decreased preload). According to the Frank-Starling law, reduced end-diastolic volume causes decreased myocardial fiber stretch, reducing stroke volume and cardiac output.",
        bullets: [
          "↓ Intravascular Volume → ↓ Central Venous Pressure / Preload",
          "↓ Ventricular End-Diastolic Volume → ↓ Stroke Volume",
          "↓ Cardiac Output (CO = HR × SV) → ↓ Mean Arterial Pressure",
          "Compensatory baroreceptor activation → Tachycardia and profound peripheral vasoconstriction",
        ],
      },
      {
        id: "clinical-clues-hypovolemic",
        title: "Bedside Clinical Clues",
        bullets: [
          "Early: Tachycardia, narrow pulse pressure (e.g. 105/85 mmHg due to elevated diastolic vasoconstriction), mild tachypnea.",
          "Peripheral signs: Cold, clammy skin, pallor, delayed capillary refill time (>3 seconds).",
          "Renal: Decreased urine output (<0.5 mL/kg/hour in adults).",
          "Late: Frank hypotension (SBP < 90 mmHg or MAP < 65 mmHg), obtundation, lethargy, peripheral cyanosis.",
        ],
      },
      {
        id: "management-hypovolemic",
        title: "Resuscitation Principles",
        bullets: [
          "Immediate Hemostasis: Apply direct wound pressure, tourniquets, pelvic binder, endoscopic hemostasis, or urgent surgical/interventional radiology intervention.",
          "Vascular Access: Secure two large-bore peripheral IV lines (14–16 gauge) or rapid infusion catheter.",
          "Judicious Fluids: Use balanced crystalloids (e.g., Plasmalyte or Ringer's lactate). Avoid excessive unbuffered 0.9% normal saline which induces hyperchloremic metabolic acidosis.",
          "Permissive Hypotension: In non-head trauma penetrating hemorrhage, target a systolic BP of 80–90 mmHg (MAP ~50–60 mmHg) until definitive surgical control is achieved to prevent 'popping the clot'.",
          "Damage Control Resuscitation: Transfuse packed red blood cells, fresh frozen plasma, and platelets in equal balanced ratios (1:1:1) along with intravenous tranexamic acid (TXA) when indicated within 3 hours.",
        ],
        callout: {
          type: "caution",
          title: "Individualized Practice Reminder",
          text: "Universal fixed fluid volumes (such as mandatory 2-liter crystalloid boluses) are obsolete. Resuscitation must be tailored with frequent clinical and ultrasound reassessments.",
        },
      },
    ],
    keyTakeaways: [
      "Hemorrhagic shock requires source control first, followed by balanced blood component therapy.",
      "Narrowed pulse pressure is an early clinical indicator of compensatory vasoconstriction.",
      "Excessive crystalloids worsen coagulopathy, hypothermia, and acidosis (the lethal triad).",
    ],
    hemodynamicSummary: {
      preload: "Markedly Decreased (↓ CVP, ↓ PCWP)",
      cardiacOutput: "Decreased (↓ CO / CI)",
      afterload: "Increased (↑ SVR via compensatory vasoconstriction)",
      scvo2: "Decreased (↓ ScvO2 < 65% due to high tissue extraction)",
    },
  },
  {
    id: "lesson-06",
    number: 6,
    slug: "cardiogenic-vs-obstructive",
    tag: "05 / PUMP FAILURE OR BLOCKED FLOW",
    title: "Cardiogenic vs Obstructive Shock",
    subtitle: "Differentiating Primary Pump Failure from Flow Impairment",
    description: "Both cardiogenic and obstructive shock manifest with low cardiac output and elevated venous pressures, but their underlying mechanisms and emergency interventions are fundamentally different.",
    estimatedMinutes: 10,
    category: "Classification",
    caution: "Obstructive shock is a mechanical crisis that cannot be resolved with pharmacotherapy alone. Immediate procedural decompression (e.g., pericardiocentesis, thoracostomy, or thrombolysis) is life-saving.",
    sections: [
      {
        id: "core-differentiation",
        title: "The Diagnostic Dilemma",
        content: "Both conditions present with signs of low forward flow (hypotension, cool peripheries, altered mental status) accompanied by elevated systemic venous pressures (jugular venous distension). Differentiating them at the bedside requires rapid physical examination, ECG analysis, and point-of-care ultrasonography.",
      },
      {
        id: "cardiogenic-profile",
        title: "Cardiogenic Shock: The Failing Pump",
        content: "Primary myocardial inability to pump sufficient forward volume to meet physiological demands, resulting in systemic hypoperfusion with elevated ventricular filling pressures.",
        bullets: [
          "Common Causes: Acute myocardial infarction with extensive LV failure, fulminant acute myocarditis, end-stage dilated cardiomyopathy, acute severe mitral regurgitation (papillary muscle rupture), aortic dissection involving coronary ostia.",
          "Hallmark Findings: Bilateral pulmonary crackles/rales, pulmonary edema on chest imaging, elevated jugular venous pressure, S3 gallop, cool mottled extremities, oliguria.",
          "ECG: ST-segment elevation, dynamic ischemic changes, severe arrhythmias, or conduction blocks.",
          "Management: Cautious fluid trial only if RV infarction without pulmonary congestion; otherwise inotropic support (dobutamine/milrinone), vasopressors (norepinephrine) for severe hypotension, mechanical circulatory support (IABP, Impella, ECMO), and emergent coronary revascularization (PCI).",
        ],
      },
      {
        id: "obstructive-profile",
        title: "Obstructive Shock: The Blocked Conduit",
        content: "Extracardiac mechanical barrier preventing ventricular filling during diastole or ventricular ejection during systole.",
        bullets: [
          "1. Cardiac Tamponade: Pericardial fluid under pressure compresses cardiac chambers. Beck's triad: hypotension, distended jugular veins, muffled heart sounds. Pulsus paradoxus (>10 mmHg inspiratory drop in SBP).",
          "2. Massive Pulmonary Embolism: Thrombus lodges in main pulmonary artery trunks, causing acute right ventricular afterload failure. Signs: sudden dyspnea, clear lungs, acute right bundle branch block (S1Q3T3), severe RV dilation and McConnell's sign on echocardiogram.",
          "3. Tension Pneumothorax: Air trapped in pleural space under positive pressure shifts mediastinum, kinking the inferior vena cava and abolishing venous return. Signs: unilateral absent breath sounds, hyperresonance, tracheal deviation to contralateral side.",
        ],
      },
      {
        id: "comparison-table-summary",
        title: "Comparative Diagnostic Summary",
        bullets: [
          "Cardiogenic Shock: Intrinsic heart failure. Lungs usually show pulmonary edema and crackles. Echo shows poor ventricular contractility.",
          "Obstructive Shock: Extrinsic flow blockage. Lungs may be completely clear (PE, tamponade) or unilaterally absent (tension pneumo). Echo reveals pericardial effusion or severe acute RV strain.",
          "Emergency Action: Cardiogenic → inotropes and catheterization lab. Obstructive → needle decompression, pericardiocentesis, or thrombolysis.",
        ],
      },
    ],
    keyTakeaways: [
      "Both presentations present with high jugular venous pressure and low cardiac output.",
      "Pulmonary congestion strongly favors cardiogenic shock over obstructive shock.",
      "Point-of-care cardiac ultrasound is the single highest-yield bedside investigation to differentiate them.",
    ],
    hemodynamicSummary: {
      preload: "Elevated (↑ CVP, ↑ PCWP in cardiogenic; ↑ CVP in obstructive)",
      cardiacOutput: "Markedly Decreased (↓↓ CO / CI)",
      afterload: "Markedly Increased (↑↑ SVR compensatory vasoconstriction)",
      scvo2: "Markedly Decreased (↓↓ ScvO2 < 60% due to severe stagnation)",
    },
  },
  {
    id: "lesson-07",
    number: 7,
    slug: "distributive-shock",
    tag: "06 / VASCULAR TONE AND DISTRIBUTION",
    title: "Distributive Shock",
    subtitle: "Vasodilation, Endothelial Permeability, and Maldistribution",
    description: "Unlike other shock forms, distributive shock is characterized by profound systemic vasodilation, expanded vascular capacitance, and microcirculatory shunting.",
    estimatedMinutes: 9,
    category: "Classification",
    pearl: "Warm, flushed skin and bounding pulses can occur during early hyperdynamic distributive shock. The presence of warm extremities does not exclude life-threatening shock.",
    sections: [
      {
        id: "pathophysiology-distributive",
        title: "The Unique Hemodynamic Pattern",
        content: "The primary vascular defect is severe pathological decrease in systemic vascular resistance (SVR). Despite a normal or even elevated cardiac output in early stages ('warm shock'), effective perfusion of capillary exchange beds is compromised due to loss of precapillary arteriolar tone, endothelial barrier disruption, and microvascular microthrombi.",
      },
      {
        id: "septic-shock",
        title: "1. Septic Shock",
        bullets: [
          "Definition: Sepsis with persistent hypotension requiring vasopressors to maintain MAP ≥ 65 mmHg AND a serum lactate level > 2 mmol/L despite adequate fluid resuscitation.",
          "Mechanism: Pathogen-associated molecular patterns (PAMPs) trigger overwhelming release of cytokines (TNF-alpha, IL-1, IL-6), inducible nitric oxide synthase (iNOS) overproduction, and diffuse endothelial glycocalyx shedding.",
          "Clinical Clues: Fever or hypothermia (poor prognostic sign), rigors, tachypnea, altered mentation, petechial or purpuric rash, identifiable infection source (pulmonary, urinary, abdominal, skin/soft tissue).",
          "Initial Bundle: Measure blood lactate, obtain blood cultures before starting antibiotics, administer broad-spectrum empiric IV antimicrobials within 1 hour, administer 30 mL/kg balanced crystalloids for hypotension/lactate ≥4 mmol/L, titrate norepinephrine to target MAP ≥ 65 mmHg.",
        ],
      },
      {
        id: "anaphylactic-shock",
        title: "2. Anaphylactic Shock",
        bullets: [
          "Definition: Severe, life-threatening generalized or systemic hypersensitivity reaction with cardiovascular collapse and/or airway compromise.",
          "Mechanism: IgE-mediated mast cell and basophil degranulation with massive release of histamine, tryptase, leukotrienes, and prostaglandins causing systemic vasodilation and sudden severe capillary extravasation.",
          "Clinical Clues: Sudden onset (minutes) after allergen exposure (food, medication, insect sting). Urticaria, pruritus, angioedema (lips, tongue, uvula), stridor, bronchospasm, abdominal cramping, and profound hypotension.",
          "First-Line Treatment: Immediate Intramuscular (IM) Epinephrine 1:1,000 (0.5 mg in adults, 0.01 mg/kg in children) injected into the anterolateral mid-thigh. Repeat every 5–15 minutes as needed. Never delay epinephrine for antihistamines or corticosteroids.",
        ],
      },
      {
        id: "neurogenic-shock",
        title: "3. Neurogenic Shock",
        bullets: [
          "Definition: Form of distributive shock resulting from sudden disruption of descending sympathetic autonomic pathways following high spinal cord injury (typically at or above T6).",
          "Mechanism: Loss of sympathetic vasomotor tone causes massive arteriolar and venous dilation. Concurrently, loss of cardiac sympathetic accelerator fibers leaves parasympathetic (vagal) tone unopposed at the sinus node.",
          "Classic Clinical Triad: Arterial Hypotension WITH Bradycardia (or inappropriately normal heart rate) and Warm, Dry Skin (due to loss of peripheral vasoconstriction and sweating below the injury level).",
          "Management: Spinal immobilization, careful fluid resuscitation, vasopressors with combined alpha and beta activity (e.g. norepinephrine) or pure alpha agonists (phenylephrine), and atropine or pacing for symptomatic bradycardia. Target MAP ≥ 85 mmHg for spinal cord perfusion in acute cord injury.",
        ],
      },
    ],
    keyTakeaways: [
      "Distributive shock is defined by reduced systemic vascular resistance (low afterload).",
      "Septic shock mandates rapid antimicrobials, fluids, and norepinephrine titration.",
      "Anaphylaxis requires immediate intramuscular epinephrine as the primary life-saving drug.",
      "Neurogenic shock presents uniquely with hypotension, bradycardia, and warm dry skin.",
    ],
    hemodynamicSummary: {
      preload: "Decreased or Normal (relative venous pooling)",
      cardiacOutput: "Normal or Increased in early hyperdynamic state (↑ CO / CI)",
      afterload: "Markedly Decreased (↓↓ SVR)",
      scvo2: "Normal or Elevated (> 70% due to microvascular shunting and cellular extraction defect)",
    },
  },
  {
    id: "lesson-08",
    number: 8,
    slug: "clinical-features-investigations",
    tag: "07 / RECOGNIZE AND INVESTIGATE",
    title: "Clinical Features and Investigations",
    subtitle: "Systematic Bedside Examination & Laboratory Profiling",
    description: "Learn how to systematically recognize clinical signs of organ hypoperfusion across body systems and interpret vital investigations within their proper clinical context.",
    estimatedMinutes: 10,
    category: "Assessment",
    caution: "Trend vital signs, Mean Arterial Pressure, mental status, capillary refill time, urine output, and serum lactate clearance over time. Single static values can be falsely reassuring.",
    sections: [
      {
        id: "bedside-findings",
        title: "Bedside Physical Signs by Organ System",
        bullets: [
          "Cardiovascular: Tachycardia (>100 bpm), weak or thready peripheral pulses, narrow pulse pressure in hypovolemia/cardiogenic shock, wide pulse pressure in hyperdynamic sepsis, hypotension (late finding).",
          "Respiratory: Tachypnea (respiratory rate >22 breaths/min) is often the earliest sensitive sign of metabolic compensation for lactic acidosis; accessory muscle use, crackles in left heart failure.",
          "Neurological: Restlessness, acute confusion, agitation, obtundation, or coma due to reduced cerebral cortical perfusion.",
          "Renal: Oliguria (<0.5 mL/kg/h) or anuria, dark concentrated urine as kidneys preserve intravascular volume via tubular reabsorption.",
          "Cutaneous (Skin): Delayed capillary refill time (>3 seconds at fingertip or patella), cold/clammy extremities in hypovolemic/cardiogenic shock, mottled skin (mottling score over knees correlates with mortality), warm flushed skin in early sepsis.",
        ],
      },
      {
        id: "investigations-panel",
        title: "Essential Laboratory & Diagnostic Panel",
        bullets: [
          "Serum Blood Lactate: Critical biomarker of tissue hypoperfusion and anaerobic metabolism. Normal is < 2.0 mmol/L; values > 4.0 mmol/L indicate severe cellular distress. Clearance of lactate during resuscitation is a valuable prognostic guide.",
          "Complete Blood Count (CBC): Leukocytosis with left shift or leukopenia in sepsis; hemoconcentration in dehydration; acute anemia in hemorrhage (note: hemoglobin may be initially normal in acute bleeding before hemodilution occurs).",
          "Electrolytes, Renal & Liver Function: Elevated urea and creatinine (prerenal acute kidney injury), elevated transaminases (ischemic hepatitis / 'shock liver'), electrolyte disturbances.",
          "Blood Gas (ABG/VBG): Metabolic acidosis with elevated anion gap, negative base excess, hypoxemia (low PaO2), hypercapnia in respiratory exhaustion.",
          "12-Lead ECG & Cardiac Biomarkers: Assess for ST-elevation myocardial infarction, ischemia, tachyarrhythmias, heart blocks, pulmonary embolism signs (S1Q3T3, RBBB), and troponin elevation.",
          "Blood Cultures & Source Workup: Two sets of blood cultures (aerobic and anaerobic) before antibiotics, plus sputum, urine, wound, or CSF cultures as clinically indicated.",
          "Chest Radiography: Evaluate for pulmonary edema, pneumonia/infiltrates, pneumothorax, widened mediastinum, or cardiomegaly.",
          "Bedside Echocardiography & POCUS: Rapid ultrasound for shock (RUSH protocol): evaluate the 'Pump' (cardiac contractility, pericardial effusion, RV strain), the 'Tank' (IVC collapsibility, peritoneal/pleural free fluid), and the 'Pipes' (aortic aneurysm or dissection, DVT).",
        ],
      },
    ],
    keyTakeaways: [
      "Tachypnea is frequently the earliest physiological warning sign of metabolic acidosis.",
      "Capillary refill time and skin mottling are powerful bedside surrogates for microvascular perfusion.",
      "Lactate clearance (aiming for >10–20% reduction every 2 hours) is a key resuscitation target.",
      "Point-of-care ultrasound immediately narrows the differential diagnosis at the bedside.",
    ],
  },
  {
    id: "lesson-09",
    number: 9,
    slug: "abcde-initial-assessment",
    tag: "08 / FIRST RESPONSE",
    title: "ABCDE Initial Assessment",
    subtitle: "Structured Resuscitation & Emergency Interventions",
    description: "The universal clinical algorithm for evaluating and stabilizing the unstable patient in shock, paired with targeted therapeutic principles.",
    estimatedMinutes: 9,
    category: "Management",
    pearl: "Simultaneous assessment and resuscitation: while identifying life threats in Airway and Breathing, team members concurrently establish vascular access, initiate monitoring, and prepare interventions.",
    sections: [
      {
        id: "abcde-framework",
        title: "The Step-by-Step ABCDE Approach",
        bullets: [
          "A — Airway: Assess airway patency. Look for stridor, secretions, or swelling. Protect airway with endotracheal intubation if GCS ≤ 8, severe airway edema (anaphylaxis), or profound respiratory fatigue. Anticipate hemodynamic collapse during intubation due to loss of sympathetic tone and positive-pressure ventilation.",
          "B — Breathing: Check respiratory rate, chest expansion, and oxygen saturation. Administer high-flow supplemental oxygen (titrate to SpO2 94–98%, or 88–92% in chronic hypercapnia). Immediately recognize and decompress tension pneumothorax before intubation.",
          "C — Circulation: Rapidly assess pulse rate, rhythm, and volume, blood pressure, and capillary refill. Establish two large-bore peripheral IV lines (16G or 14G) or intraosseous (IO) access if peripheral veins are collapsed. Connect continuous 3-lead/5-lead ECG, noninvasive BP, and pulse oximetry. Control active external hemorrhage immediately.",
          "D — Disability: Assess level of consciousness using Glasgow Coma Scale (GCS) or AVPU scale. Check pupil size and reactivity. Always check capillary blood glucose immediately to detect and treat hypoglycemia simulating encephalopathy.",
          "E — Exposure: Fully expose the patient to examine the entire body for hidden hemorrhage, rashes, cellulitis, surgical wounds, bites, or line infections. Prevent hypothermia by covering the patient with warm blankets immediately after examination.",
        ],
      },
      {
        id: "intervention-table",
        title: "Core Pharmacological & Procedural Interventions",
        bullets: [
          "Crystalloids: Use balanced crystalloids (e.g. Plasmalyte or Hartmann's) in titrated 250–500 mL boluses. Continuously reassess response using dynamic measures of fluid responsiveness (passive leg raise, stroke volume change). Avoid fluid overload in cardiogenic shock.",
          "Blood Products: For hemorrhagic shock, initiate massive transfusion protocols with balanced 1:1:1 ratios of PRBCs, plasma, and platelets. In non-bleeding shock, maintain hemoglobin target between 7.0–8.0 g/dL.",
          "Norepinephrine: First-line vasopressor in septic and distributive shock. Potent alpha-1 vasoconstriction with modest beta-1 inotropic activity. Titrate through peripheral line or central venous catheter to maintain MAP ≥ 65 mmHg.",
          "Epinephrine IM: First-line drug of choice in anaphylactic shock. Administer 0.5 mg IM into anterolateral mid-thigh. Also used as continuous infusion in refractory septic or cardiogenic shock.",
          "Definitive Cause Control: Urgent surgical or interventional hemostasis for trauma; primary percutaneous coronary intervention (PCI) for myocardial infarction; catheter drainage for cardiac tamponade; emergency needle or finger thoracostomy for tension pneumothorax; broad-spectrum antimicrobials and surgical debridement/drainage for sepsis.",
        ],
        callout: {
          type: "note",
          title: "Medical Education Disclaimer",
          text: "These recommendations represent general clinical educational principles taught in acute medical curricula. They do not substitute for institutional protocols or individualized clinical judgment.",
        },
      },
    ],
    keyTakeaways: [
      "Follow the ABCDE sequence strictly to identify and manage immediate life threats.",
      "Check fingerstick blood glucose in all patients with altered mental status.",
      "Titrate fluids cautiously and use early vasopressors (norepinephrine) in distributive shock.",
      "Definitive cause control is the ultimate goal of shock resuscitation.",
    ],
  },
  {
    id: "lesson-10",
    number: 10,
    slug: "knowledge-check",
    tag: "09 / SELF-ASSESSMENT",
    title: "Knowledge Check",
    subtitle: "Comprehensive Clinical Assessment Quiz",
    description: "Evaluate your clinical understanding across shock classification, cellular pathophysiology, bedside examination findings, and initial emergency resuscitation protocols.",
    estimatedMinutes: 12,
    category: "Quiz",
    sections: [
      {
        id: "quiz-instructions",
        title: "Assessment Guidelines",
        content: "This assessment contains 10 clinically validated multiple-choice questions covering all core concepts from Lessons 01 through 09. Each question provides four plausible clinical options with one best answer, followed by immediate feedback, detailed rationales, and pathophysiological explanations.",
        bullets: [
          "10 multiple choice questions covering all 4 shock mechanisms, pathophysiology, investigations, and ABCDE.",
          "Immediate answer feedback with detailed educational explanations.",
          "Overall score calculation, percentage achievement, and recommendation badge.",
          "Review answers feature allowing you to inspect every question and explanation.",
          "Local storage persistence automatically saves your highest quiz score.",
        ],
      },
    ],
    keyTakeaways: [
      "Test your understanding across all four shock mechanisms and diagnostic clues.",
      "Understand why wrong answers (distractors) are incorrect in real clinical practice.",
      "Retake the quiz at any time to reinforce your clinical reasoning.",
    ],
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug);
}

export function getLessonByNumber(number: number): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.number === number);
}
