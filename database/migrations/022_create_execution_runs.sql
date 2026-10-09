-- =========================================================================
-- PathPilot Database Migration: Table 22 - execution_runs
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.execution_runs table (Exactly 11 approved columns)
CREATE TABLE IF NOT EXISTS public.execution_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
    language TEXT NOT NULL,
    judge0_reference TEXT NOT NULL,
    status TEXT NOT NULL,
    runtime_ms INTEGER NULL,
    memory_kb INTEGER NULL,
    stdout_ref TEXT NULL,
    stderr_ref TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_execution_runs_runtime CHECK (runtime_ms IS NULL OR runtime_ms >= 0),
    CONSTRAINT chk_execution_runs_memory CHECK (memory_kb IS NULL OR memory_kb >= 0),
    CONSTRAINT chk_execution_runs_language_not_empty CHECK (length(trim(language)) > 0),
    CONSTRAINT chk_execution_runs_judge0_ref_not_empty CHECK (length(trim(judge0_reference)) > 0),
    CONSTRAINT chk_execution_runs_status_not_empty CHECK (length(trim(status)) > 0)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.execution_runs IS 'Stores objective programming-code execution evidence and Judge0 performance metrics.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_execution_runs_student_id ON public.execution_runs(student_id);
CREATE INDEX IF NOT EXISTS idx_execution_runs_question_id ON public.execution_runs(question_id);
CREATE INDEX IF NOT EXISTS idx_execution_runs_judge0_reference ON public.execution_runs(judge0_reference);
CREATE INDEX IF NOT EXISTS idx_execution_runs_student_created ON public.execution_runs(student_id, created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.execution_runs ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view only their own execution records
DROP POLICY IF EXISTS "Allow students to view own execution runs" ON public.execution_runs;
CREATE POLICY "Allow students to view own execution runs"
    ON public.execution_runs
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT, UPDATE, DELETE:
-- No client write policies are granted.
-- Execution records represent objective technical evaluation evidence produced
-- by the server-side code execution engine and Judge0 sandbox.
