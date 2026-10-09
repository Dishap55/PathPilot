-- =========================================================================
-- PathPilot Database Migration: Table 23 - sql_execution_runs
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.sql_execution_runs table (Exactly 9 approved columns)
CREATE TABLE IF NOT EXISTS public.sql_execution_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
    query_hash TEXT NOT NULL,
    status TEXT NOT NULL,
    result_ref TEXT NULL,
    error_message TEXT NULL,
    execution_ms INTEGER NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_sql_execution_runs_query_hash_not_empty CHECK (length(trim(query_hash)) > 0),
    CONSTRAINT chk_sql_execution_runs_status_not_empty CHECK (length(trim(status)) > 0),
    CONSTRAINT chk_sql_execution_runs_execution_ms CHECK (execution_ms IS NULL OR execution_ms >= 0)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.sql_execution_runs IS 'Stores execution records for DBMS SQL query practice performed through PathPilot controlled SQL execution environment.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_sql_execution_runs_student_id ON public.sql_execution_runs(student_id);
CREATE INDEX IF NOT EXISTS idx_sql_execution_runs_question_id ON public.sql_execution_runs(question_id);
CREATE INDEX IF NOT EXISTS idx_sql_execution_runs_query_hash ON public.sql_execution_runs(query_hash);
CREATE INDEX IF NOT EXISTS idx_sql_execution_runs_student_created ON public.sql_execution_runs(student_id, created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.sql_execution_runs ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view only their own SQL execution records
DROP POLICY IF EXISTS "Allow students to view own sql execution runs" ON public.sql_execution_runs;
CREATE POLICY "Allow students to view own sql execution runs"
    ON public.sql_execution_runs
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT, UPDATE, DELETE:
-- No client write policies are granted.
-- SQL execution records are written only by trusted backend/service-role execution services.
