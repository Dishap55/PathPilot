-- =========================================================================
-- PathPilot Database Migration: Table 10 - assessment_attempts
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.assessment_attempts table (Exactly 8 approved columns)
CREATE TABLE IF NOT EXISTS public.assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
    selected_answer TEXT NULL,
    execution_run_id UUID NULL,
    correct BOOLEAN NULL,
    time_spent INTEGER NULL,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_assessment_attempts_time_spent CHECK (time_spent IS NULL OR time_spent >= 0)
);

-- Note regarding execution_run_id:
-- execution_runs table does not exist yet. Foreign key constraint will be
-- added via ALTER TABLE once execution_runs is implemented.

-- 2. Add documentation comment
COMMENT ON TABLE public.assessment_attempts IS 'Stores per-question responses and evaluation results for student assessments.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_assessment_id ON public.assessment_attempts(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_question_id ON public.assessment_attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_assessment_question ON public.assessment_attempts(assessment_id, question_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view attempts only for assessments they own
DROP POLICY IF EXISTS "Allow students to view own assessment attempts" ON public.assessment_attempts;
CREATE POLICY "Allow students to view own assessment attempts"
    ON public.assessment_attempts
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.assessments
            WHERE assessments.id = assessment_attempts.assessment_id
              AND assessments.student_id = auth.uid()
        )
    );

-- Student INSERT: Students can record attempts only into assessments they own
DROP POLICY IF EXISTS "Allow students to insert own assessment attempts" ON public.assessment_attempts;
CREATE POLICY "Allow students to insert own assessment attempts"
    ON public.assessment_attempts
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.assessments
            WHERE assessments.id = assessment_attempts.assessment_id
              AND assessments.student_id = auth.uid()
        )
    );

-- Student UPDATE & DELETE:
-- No general student UPDATE or DELETE policies are granted.
-- Objective evaluation, execution run linking, correctness validation,
-- and assessment history integrity are strictly managed server-side.
