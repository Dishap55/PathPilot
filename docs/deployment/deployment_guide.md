# Deployment Guide

## Architecture Components
- **Frontend**: Deployed as a static SPA (Vercel, Netlify, or Cloudflare Pages).
- **Backend API**: Deployed on Node.js runtime (Render, Railway, Fly.io, or AWS EC2).
- **Database**: Managed Supabase PostgreSQL with RLS and Storage enabled.
- **AI Automation**: Self-hosted or Cloud n8n container instance with webhook triggers.
- **Code Execution**: Remote Judge0 CE/Pro instance with API access key.
