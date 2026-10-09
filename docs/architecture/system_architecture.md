# System Architecture & Engineering Rules

## High-Level Architecture
- **Frontend**: React.js SPA, Tailwind CSS, Lucide icons, React Router.
- **Backend**: Node.js + Express REST API with thin routes, controller validations, domain services.
- **Database**: Supabase PostgreSQL with strict Row Level Security (RLS) policies.
- **AI Orchestration**: n8n workflows routing approved context to Google Gemini.
- **Execution Engines**: Judge0 for DSA code execution; isolated sandbox for DBMS queries.

## Engineering Rules
1. Do not mix UI and business logic.
2. Do not allow AI to rewrite authoritative scores.
3. Do not trust client-supplied ownership IDs (always verify `auth.uid()`).
4. Do not expose secrets in frontend code.
5. Do not bypass RLS in student-facing flows.
6. Keep execution environments strictly sandboxed and controlled.
