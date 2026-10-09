# Product / Functional Blueprint

## 1. Product Definition
PathPilot is an AI-powered adaptive learning and placement preparation platform for students preparing across DSA, OOPS, Aptitude, DBMS, OS, and CN. It unifies assessment, learning materials, practice, mistake analysis, personalized roadmaps, progress tracking, reassessment, and placement readiness into one controlled learning loop.

## 2. Core Problem & Vision
Placement preparation is usually fragmented across disparate question platforms, notes, videos, and separate mock test platforms. Students solve questions without understanding patterns or knowing specific weak areas. PathPilot transforms this into an evidence-driven learning cycle:
`Learn ➔ Understand ➔ Ask Doubts ➔ Practice ➔ Feedback ➔ Progress ➔ Reassess ➔ Revise ➔ Placement Ready`

## 3. Core Modules
- **Module A - Public Landing & Auth**: AuthGuard, credentials, OAuth.
- **Module B - Profile & Setup**: Academic info, target date, subject-level preferences.
- **Module C - Initial Ability Assessment**: Diagnostic MCQs, DSA coding, and DBMS SQL questions.
- **Module D - Personalized Roadmap**: Dynamically ordered learning topics based on assessed weak areas.
- **Module E - Learning & Practice**: Notes, edge cases, code runner, SQL editor, same-logic practice.
- **Module F - Progress & Reassessment**: Accuracy, completion, streak, and milestone re-testing.
- **Module G - AI Mentor**: Bounded Gemini guidance via n8n (no direct score mutation or raw DB access).
- **Module H - Admin**: Question bank moderation, template configuration, AI question drafting.
