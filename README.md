# PathPilot: AI-Powered Adaptive Learning & Placement Coach

> **CSIT Department | IPS Academy**  
> Implementation-oriented specification and monorepo structure for the PathPilot project.

---

## 📌 Architecture Philosophy
PathPilot is scalable enough to support future placement-preparation extensions while remaining understandable and implementable by the student team. Presentation, API handling, business logic, AI orchestration, execution services and data access remain strictly separated.

```
USER
  ↓
REACT + TAILWIND
  ↓
API SERVICE
  ↓
EXPRESS ROUTE
  ↓
CONTROLLER
  ↓
BUSINESS SERVICE
  ↓
DATABASE / EXTERNAL SERVICE
```

---

## 📂 Monorepo Structure

```
pathpilot/
├── client/              # React frontend (Vite, Tailwind, Component library)
├── server/              # Node.js + Express backend (REST API, Services, RLS)
├── n8n/                 # AI Mentor orchestration workflows
├── database/            # Supabase PostgreSQL schema, migrations, RLS & seed data
├── scripts/             # Management, migration and seed utilities
├── docs/                # Architecture, API, Product and Database docs
├── .env.example         # System-wide environment configuration reference
├── .gitignore           # Git ignore declarations
├── package.json         # Root workspace package file
└── README.md            # Master project overview
```

---

## 🚀 Getting Started

1. **Clone & Install**:
   ```bash
   npm run setup
   ```
2. **Configure Environment Variables**:
   Copy `.env.example` to `server/.env` and `client/.env`.
3. **Run Migrations & Seeds**:
   ```bash
   npm run migrate
   npm run seed
   ```
4. **Launch Development Servers**:
   ```bash
   npm run dev
   ```
