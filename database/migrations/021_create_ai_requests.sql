-- =========================================================================
-- PathPilot Database Migration: Table 21 - ai_requests
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.ai_requests table (Exactly 9 approved columns)
CREATE TABLE IF NOT EXISTS public.ai_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL,
    context_hash TEXT NOT NULL,
    workflow_id TEXT NULL,
    status TEXT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ NULL,
    response_ref TEXT NULL,
    CONSTRAINT chk_ai_requests_request_type_not_empty CHECK (length(trim(request_type)) > 0),
    CONSTRAINT chk_ai_requests_context_hash_not_empty CHECK (length(trim(context_hash)) > 0),
    CONSTRAINT chk_ai_requests_status_not_empty CHECK (length(trim(status)) > 0),
    CONSTRAINT chk_ai_requests_completed_after_started CHECK (completed_at IS NULL OR completed_at >= started_at)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.ai_requests IS 'Tracks lifecycle states and artifact references for AI Mentor workflow requests.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_ai_requests_student_id ON public.ai_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_ai_requests_status ON public.ai_requests(status);
CREATE INDEX IF NOT EXISTS idx_ai_requests_student_started ON public.ai_requests(student_id, started_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.ai_requests ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view only their own AI request records
DROP POLICY IF EXISTS "Allow students to view own ai requests" ON public.ai_requests;
CREATE POLICY "Allow students to view own ai requests"
    ON public.ai_requests
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT, UPDATE, DELETE:
-- No student or public write policies are granted.
-- AI request creation, context hashing, orchestration linking (n8n/Gemini),
-- status progression, and response reference attachment are strictly handled
-- by secure backend services.
