# NSG 215 – Human Behavior in Illness: Exam Prep App
### Build Spec for AI Coding Assistant

## 0. Project Summary
Build a course-specific study & quiz-drilling web app for **NSG 215 (Human Behavior in Illness)**. This is a fresh, original build — not a fork or scrape. It's *inspired by the structural pattern* of an existing physiology prep tool (referred to below as "the reference app"), but with original code, original content, and several UX/functionality upgrades. Do not copy the reference app's code, assets, branding, or wording — build equivalent functionality from scratch.

---

## 1. Reference Pattern (structure only, not to copy verbatim)
The reference app is a single-page app with tab navigation: **Home / Learn / Parameters / Drill / Tracker**.

- **Home** — hero tagline, content-coverage summary, quick-stat counters (question count, topic count, readiness %), CTA buttons into Learn and Drill, a "high-yield danger zones" teaser section.
- **Learn** — card-based concept review, content tagged as "core/slide" vs "extension" material.
- **Parameters** — focused memorization view for key facts/values/definitions.
- **Drill** — configurable quiz: question count (10/20/50/100/all), topic filter, difficulty filter, Practice mode (explains immediately) vs Exam mode (explanation withheld until the end), prev/next/submit navigation.
- **Tracker** — localStorage-only dashboard: attempted count, accuracy %, session count, a "preparedness" %, and a recently-missed-questions review list.
- Light/dark theme toggle.
- Casual, high-energy tone in the copy.

This pattern works well as a study-app skeleton — reuse the *shape*, not the content or code.

---

## 2. Target Course & Content Shift
**Course:** NSG 215 – Human Behavior in Illness (University of Ibadan Distance Learning Centre course manual; 3 units, 200-level, 8 Study Sessions, 108 pages)

Unlike a physiology course, this is a behavioral/psychosocial nursing subject. The question bank should lean toward **scenario-based, applied-reasoning items** (clinical vignette + question) rather than pure value/fact recall. Keep a smaller share of straight definitional/recall questions for foundational theory.

### Real course structure (extracted from the official course manual)
This replaces the earlier placeholder — these are the actual 8 Study Sessions and their subtopics.

1. **Introduction to Human Behavior and Illness** — concepts of behavior, health & illness; determinants of health; Health Belief Model
2. **Illness and Disease** — illness vs disease; acute vs chronic illness; stages of illness; classification of disease; illness behavior across childhood/adolescence/adulthood
3. **Medication Adherence** — adherence vs persistence; direct vs indirect assessment methods; reasons for non-adherence; nurses' responsibilities in ensuring adherence
4. **Illness Cognition** — illness vs healthiness; Leventhal's 5 illness-perception dimensions; concepts of disease causation (germ theory, epidemiological triad, multifactorial, web of causation); biological vs bio-psychosocial models; patterns of illness (acute/chronic)
5. **Coping Models with Adaptation to Illness** — the Transactional Model of Stress and Coping (primary/secondary appraisal); Responses to Stress Model; Motivational Model of Coping (3 universal stressors); Community Stress Prevention Model (6 dimensions)
6. **Coping Response** — Lazarus's 3 stress components; ways of conceptualizing coping; 6 stages of individual response to illness (crisis, isolation, anger, reconstruction, intermittent depression, renewal); coping and culture (individualism vs collectivism); 5-phase model of facing a fatal illness
7. **Coping with the Crisis of Illness** — Crisis Theory; direct vs defensive coping; ego defense mechanisms (16 types); grief & mourning; normal vs abnormal grief; awareness contexts (closed/suspected/mutual pretense/open); fears of terminal illness; 5-stage family grief model
8. **Influences on the Sick** — domains affected by chronic illness (physical/psychological/economic/social); Pollin's 8 fears; impact on families; factors influencing family response; reactions to hospitalization by age group; the 3-phase nurse-patient relationship

A **50-question starter bank** built directly from this manual (definitions, models, and original clinical-vignette questions testing the same concepts) ships alongside this spec — see `NSG215-question-bank-starter.json`. It follows the schema in Section 5 and is tagged `"sourceTag": "slide"` throughout since every correct answer traces back to the manual. Feed both files to the coding AI together.

**Known manual quirk:** the printed section header for Study Session 3 reads "Medical Adherence" (likely a typo) while the body text consistently uses "Medication Adherence" — the spec and starter bank use "Medication Adherence" throughout for consistency.

---

## 3. Feature Set

### Keep from the reference pattern
- Tab structure: Home, Learn, Concepts, Drill, Tracker
- Configurable quiz (count / topic / difficulty / mode)
- LocalStorage progress baseline
- Light/dark toggle

### Improve / add (this is the "better" part)
1. **Scenario-based question format** — clinical vignette + question stem, fitting an applied behavioral course.
2. **Data portability** — export/import progress as JSON. LocalStorage alone is fragile (cleared cache = lost progress).
3. **Smart weak-topic drilling** — prioritize topics with lower accuracy instead of pure random selection.
4. **Bookmark/flag** questions for later review, separate from the auto-generated "missed" list.
5. **Richer analytics** — per-topic accuracy breakdown (not just one aggregate %), time-per-question, streaks.
6. **Deeper explanations** — rationale for *why each wrong option is wrong*, not just why the correct one is right.
7. **Search** across Learn/Concepts content.
8. **Installable PWA + offline support.**
9. **Accessibility** — adjustable font size, full keyboard navigation, proper ARIA labeling.
10. **Optional "cheat sheet" export/print** — condensed view generated from the Concepts page.

---

## 4. Tech Stack
- **React + Vite**
- **Tailwind CSS**
- Client state: React Context or Zustand
- Persistence: localStorage first, with JSON export/import for backup; structure the data layer so a backend (e.g. Supabase) could be added later without a rewrite
- Deployment target: Netlify or Vercel
- Theming: CSS custom properties for light/dark (same approach as prior nursing-workbook builds)

---

## 5. Data Model (question bank schema)

```json
{
  "id": "nsg215-001",
  "topic": "Sick Role Theory",
  "subtopic": "Parsons' Sick Role",
  "difficulty": "intermediate",
  "type": "scenario",
  "stem": "Vignette + question text goes here.",
  "options": ["A", "B", "C", "D"],
  "correctIndex": 2,
  "explanation": {
    "correct": "Why the right answer is right.",
    "distractors": ["Why A is wrong.", "Why B is wrong.", "Why D is wrong."]
  },
  "sourceTag": "slide"
}
```
`sourceTag` values: `"slide"` (from official course material) or `"extension"` (supplementary, clearly labeled as such in the UI — same transparency principle as the reference app).

`type` values used in the starter bank: `"recall"` (definitional/factual) or `"scenario"` (clinical vignette + question). 50 ready-to-load examples of both types, covering all 8 study sessions, are in `NSG215-question-bank-starter.json`.

---

## 6. Page/Route Map
- `/` — Home
- `/learn` — Concept review
- `/concepts` — Key facts, models, theories to memorize
- `/drill` — Quiz configuration + runner
- `/tracker` — Progress dashboard

(Single-page app with tab state is also fine, matching the reference's pattern — dev's call.)

---

## 7. Content You Still Need to Supply
- ~~Actual NSG 215 syllabus/manual~~ — done: ingested from the uploaded course manual (Section 2, starter bank attached)
- **Expand past the 50-question starter bank.** The manual's 8 sessions also contain ~35 official Self-Assessment Questions (SAQs) with model answers not yet converted into multiple-choice format, plus dozens of "In-Text Questions" — both are additional real source material for growing the bank well past 50 without inventing new content
- Decide a realistic final target size given the source material (the reference app's 500 was physiology-specific; a behavioral course like this will naturally support fewer well-made questions than a numbers-heavy one — depth over padding)
- Confirm whether any supplementary textbook (beyond the course manual's own references) should be tagged as `"extension"` content

---

## 8. Tone / Copy Direction
The reference app uses a playful, high-energy Nigerian-student voice. Open decision: carry a similar voice adapted to NSG 215, or go more neutral/clinical. Not fixed here — flag it for a quick decision before writing final UI copy.

---

## 9. Out of Scope for v1
- User accounts / auth
- Multi-user leaderboard
- Backend server (start client-only; keep the data layer sync-ready for later)

---

## 10. Next Steps
1. ~~Confirm the real NSG 215 outline~~ — done (Section 2).
2. Hand this file + `NSG215-question-bank-starter.json` to the coding AI to scaffold the app (Sections 4–6 define the stack and data contract).
3. Once the app shell works end-to-end with the 50 starter questions, expand the bank using the manual's remaining SAQs and In-Text Questions (Section 7).
4. Decide the tone direction (Section 8) before finalizing UI copy.
