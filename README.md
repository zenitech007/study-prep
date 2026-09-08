# University of Ibadan Distance Learning — StudyPrep Suite

A modern, high-retention study preparation companion and clinical exam-drilling platform designed for distance learning nursing students at the **University of Ibadan**.

Currently features **NSG 215 (Human Behavior in Illness)**, with an extensible multi-course architecture ready for upcoming courses like **NSG 216** and **NSG 217**.

---

## 🌟 Core Features

- **Multi-Course Library Hub**: Executive course catalog displaying readiness progression, accuracy stats, and one-click access to study manuals, cheat sheets, and drill banks.
- **100-Question Academic Drill Bank**: Converted official course manual In-Text Questions (ITQs) and Short Answer Questions (SAQs) across all 8 Study Sessions with comprehensive clinical rationales and distractor explanations.
- **Anki-Style Spaced Repetition (SM-2)**: Smart review algorithm that resurfaces missed and due questions at optimal intervals to maximize long-term exam retention.
- **Regional Text-to-Speech (TTS) Voice Reader**: Native Web Speech API integration with strict English filtering and female voice selection (prioritizing *Google Kore* / *Nigerian English*), allowing distance learners to listen to clinical vignettes and study notes during commutes.
- **Quick-Prep Cheat Sheet**: High-yield definitions, behavioral models, and flash facts organized by session for rapid pre-exam memorization.
- **System-Synced Theme**: Auto-detects device dark/light appearance with a manual override toggle.
- **100% Client-Side LocalStorage**: Complete privacy and portability with export/import and a safe progress reset modal.
- **Offline PWA Support**: Installable Progressive Web App with service worker offline caching.

---

## 📁 Repository Structure

```
study-prep/
├── NSG215-Study-App-Spec.md      # Specification document & course session breakdown
├── .gitignore                    # Root gitignore (node_modules, builds, logs)
├── README.md                     # Project overview and setup instructions
└── nsg215-app/                   # React + TypeScript + Vite + Tailwind CSS application
    ├── public/
    │   └── data/                 # Question banks & static assets
    ├── src/
    │   ├── components/           # UI components (drill, learn, tracker, common, layout)
    │   ├── data/                 # Course directory & manual reading content
    │   ├── pages/                # Route views (Hub, Course Dashboard, Drill, Learn, Quick-Prep, Tracker)
    │   ├── store/                # Zustand store & localStorage persistence engine
    │   ├── types/                # TypeScript interfaces and schemas
    │   └── utils/                # SRS algorithm, Web Speech engine, confetti, and analytics
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Development

```bash
# 1. Navigate to the web application directory
cd nsg215-app

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser to view the application.

### Building for Production

```bash
cd nsg215-app
npm run build
```

This compiles TypeScript with `tsc -b` and generates production bundles and PWA service workers in `nsg215-app/dist`.

---

## 🩺 Course Content Coverage (NSG 215)

- **Session 1**: Introduction to Human Behavior and Illness & Health Belief Model
- **Session 2**: Illness vs. Disease, Stages of Illness, and Developmental Behaviors
- **Session 3**: Medication Adherence & Nursing Interventions
- **Session 4**: Illness Cognition (Leventhal's Dimensions) & Models of Causation
- **Session 5**: Coping Models with Adaptation to Illness & Stress Prevention
- **Session 6**: Coping Responses, Culture, and Facing Fatal Illness
- **Session 7**: Coping with Crisis, Ego Defense Mechanisms, and Grief
- **Session 8**: Domains Affected by Chronic Illness & Nurse-Patient Relationships
