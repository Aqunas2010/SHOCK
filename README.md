# SHOCK — Clinical Learning & Emergency Management
### Advanced Interactive Medical Education and Clinical Learning Platform

**SHOCK** is a production-quality medical education web platform focused on understanding shock physiology, classification, clinical recognition, investigations, and initial emergency resuscitation.

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS**, **Radix UI**, **Lucide React**, **Framer Motion**, **Recharts**, **Zod**, **Prisma ORM**, and **Vitest**.

---

## 1. Clinical & Educational Curriculum (10 Modules)

| Lesson | Title | Core Concept & Content |
|---|---|---|
| **01** | **[Understanding Shock](http://localhost:3000)** | Hero landing page, 5-stage pathway, 4 core cards, interactive circulation and oxygen delivery cascade diagram. |
| **02** | **[What is Shock?](http://localhost:3000/lessons/what-is-shock)** | Formal definition, 5 determinants of perfusion, cardiac output equation ($CO = HR \times SV$), $DO_2$, and the fundamental clinical pearl: *Shock is not synonymous with hypotension*. |
| **03** | **[Classification of Shock](http://localhost:3000/lessons/classification-of-shock)** | Four major hemodynamic phenotypes (Hypovolemic, Cardiogenic, Distributive, Obstructive) with interactive modal deep-dive, causes, and hemodynamic matrix. |
| **04** | **[Pathophysiology](http://localhost:3000/lessons/pathophysiology)** | From perfusion failure to cellular hypoxia, anaerobic glycolysis, ATP depletion, lactic acidosis, and organ dysfunction. Compensated vs progressive/refractory cards. |
| **05** | **[Hypovolemic & Hemorrhagic Shock](http://localhost:3000/lessons/hypovolemic-shock)** | Volume loss cascade ($\downarrow$ Preload $\rightarrow$ $\downarrow$ Stroke Volume $\rightarrow$ $\downarrow$ Perfusion), clinical findings, permissive hypotension, and balanced 1:1:1 damage control resuscitation. |
| **06** | **[Cardiogenic vs Obstructive Shock](http://localhost:3000/lessons/cardiogenic-vs-obstructive)** | Side-by-side comparison interface and comprehensive comparative table. Distinguishing failing pump from physical mechanical blockage. |
| **07** | **[Distributive Shock](http://localhost:3000/lessons/distributive-shock)** | Septic shock (Surviving Sepsis bundle), Anaphylactic shock (immediate IM epinephrine in anterolateral mid-thigh), and Neurogenic shock (hypotension with bradycardia and warm dry skin). |
| **08** | **[Clinical Features & Investigations](http://localhost:3000/lessons/clinical-features-investigations)** | Bedside findings table by organ system (CV, Respiratory, Neurological, Renal, Skin) and comprehensive laboratory / imaging panel (Lactate, CBC, ABG, ECG, POCUS). |
| **09** | **[ABCDE Initial Assessment](http://localhost:3000/lessons/abcde-initial-assessment)** | Universal emergency resuscitation framework paired with core intervention table (crystalloids, blood products, norepinephrine, epinephrine IM, definitive care). |
| **10** | **[Knowledge Check Assessment](http://localhost:3000/quiz)** | Complete interactive testing engine with 10 scenario-based questions, 4 options each, immediate rationales, percentage calculation, and review mode. |

---

## 2. Interactive Features & Tools

- **Interactive Dynamic SVGs**:
  - `NormalPerfusionDiagram`: Vector model of circulation and $DO_2$ transport.
  - `ClassificationQuadrant`: 4-quadrant interactive shock selector with detailed modal inspector.
  - `PathophysiologyCascade`: Step-by-step cellular cascade from dysoxia to MODS.
  - `AbcdeFlowDiagram`: Emergency resuscitation timeline and action cards.
- **Clinical Calculators (`/calculator`)**:
  - **Shock Index ($HR / SBP$)**: Unmasks compensated shock before systolic hypotension develops.
  - **Mean Arterial Pressure ($MAP = DBP + \frac{SBP - DBP}{3}$)**: Evaluates cerebral and renal perfusion pressure targets ($\ge 65\text{ mmHg}$).
- **Global Search (`Cmd+K`)**:
  - Instant searchable index across all lessons, sections, pearls, and keywords with keyboard up/down/enter navigation.
- **Resilient Learning Progress Tracker**:
  - Automatically saves completed lessons, bookmarks, and quiz scores in local storage with safe schema validation.
- **Differential Diagnostics Matrix (`/compare`)**:
  - Dual-card and full tabular comparison between Cardiogenic and Obstructive shock, plus full hemodynamic matrix.

---

## 3. Design System & Strict Aesthetic Rules

Adheres strictly to the university-grade medical reference design specification:
- **Primary navy**: `#0B1628`
- **Secondary navy**: `#14243A`
- **Page background**: `#F4F6F9`
- **Primary text**: `#202B3C`
- **Secondary text**: `#66758A`
- **Muted teal**: `#438F96` (active states, progress bars, accents)
- **Border**: `#DCE3EB`
- **Muted gold**: `#C49A58` (clinical pearls and caution panels)
- **Zero neon colors, zero emojis, zero cartoon illustrations, and zero generic AI templates**.

---

## 4. Full-Stack Architecture

```
SHOCK/
├── app/
│   ├── layout.tsx                     # Root layout with Header, Footer, and ReadingProgress
│   ├── page.tsx                       # Lesson 01: Understanding Shock landing page
│   ├── lessons/
│   │   ├── page.tsx                   # Curriculum Directory with category filters & search
│   │   └── [slug]/page.tsx            # Dynamic lesson page (Lessons 01 - 10)
│   ├── calculator/page.tsx            # Bedside Shock Index & MAP calculators
│   ├── compare/page.tsx               # Cardiogenic vs Obstructive & Hemodynamic matrix
│   ├── quiz/page.tsx                  # Knowledge Check quiz page
│   ├── api/
│   │   ├── quiz/route.ts              # Route handler for quiz questions & evaluations
│   │   └── progress/route.ts          # Route handler for progress syncing
│   ├── not-found.tsx                  # 404 handler
│   └── error.tsx                      # Error boundary
├── components/
│   ├── layout/                        # Header, Footer, LessonSidebar
│   ├── learning/                      # GlobalSearch (Cmd+K), LessonNavigation, ClinicalPearl, CautionPanel
│   ├── medical/                       # NormalPerfusionDiagram, ClassificationQuadrant, PathophysiologyCascade,
│   │                                  # CardioVsObstructiveTable, ClinicalFindingsTable, AbcdeFlowDiagram,
│   │                                  # ShockCalculators, HemodynamicMatrix
│   └── quiz/                          # QuizApp (MCQ engine with rationales and review mode)
├── lib/
│   ├── data/                          # Comprehensive peer-reviewed data (lessons.ts, quiz.ts)
│   ├── validations/                   # Zod schemas for calculators and submissions
│   ├── clinicalCalculations.ts        # Pure formulas for Shock Index & MAP
│   ├── searchIndex.ts                 # Full-text in-memory curriculum search index
│   └── storage.ts                     # Safe browser local storage manager
├── prisma/
│   ├── schema.prisma                  # PostgreSQL schema (Lesson, QuizQuestion, QuizAttempt, UserProgress)
│   └── seed.ts                        # Seed script
├── server/
│   └── db.ts                          # Prisma singleton with connection checks
└── tests/                             # Vitest unit test suite (18 automated tests)
```

---

## 5. Development & Testing Commands

### Prerequisites
- Node.js >= 18 (Tested on Node.js v20.18 LTS)
- npm >= 10

### Installation
```bash
npm install
```

### Run Locally (Dev Server)
```bash
npm run dev
# App will be accessible at http://localhost:3000
```

### Run Unit Tests
```bash
npm test
# Executes all 18 Vitest unit tests across calculators, quiz, search, and lessons
```

### Run TypeScript & Lint Checks
```bash
npx tsc --noEmit
npm run lint
```

### Build for Production
```bash
npm run build
# Generates all 21 SSG and dynamic routes
```

---

## 6. Database Configuration (Optional)

The application functions completely offline out of the box using typed local data and browser local storage.

To connect persistent PostgreSQL (Neon, Supabase, AWS RDS):
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
   ```
3. Run migrations and seed:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

---

## 7. License & Academic Disclaimer

This educational platform is designed exclusively for university students, resident physicians, and healthcare trainees for academic study, review, and medical simulation. It does not provide medical orders or individual patient care directives. Always follow local clinical guidelines and institutional protocols.
