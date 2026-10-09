# PathPilot n8n AI Mentor Workflows

This directory houses the workflow definition files for **n8n**, which serves as PathPilot's AI orchestration engine.

## Workflows
1. `assessment-analysis.json` - Parses assessment scores, computes topic strengths/weaknesses, outputs recommendations.
2. `explanation.json` - Returns structured explanations for topics, edge cases, and code logic.
3. `roadmap-assistance.json` - Adapts personalized roadmaps based on pacing, target date, and performance.
4. `wrong-answer-guidance.json` - Generates non-revealing hints and points students to same-logic practice.
5. `content-generation.json` - Bounded question generation for administrative curation and review.

## Security Boundary
- n8n workflows communicate with Gemini server-to-server.
- AI never directly mutates scores or modifies authoritative tables in PostgreSQL.
- All AI responses are validated by server services before returning to the frontend.
