-- =========================================================================
-- PathPilot Database Migration: Table 11 - question_attempts
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.question_attempts table (Exactly 9 approved columns)
CREATE TABLE IF NOT EXISTS public.question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
    result TEXT NOT NULL,
    code_submission_ref TEXT NULL,
    sql_submission_ref TEXT NULL,
    feedback_state TEXT NULL,
    time_spent INTEGER NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_question_attempts_result_not_empty CHECK (length(trim(result)) > 0),
    CONSTRAINT chk_question_attempts_time_spent CHECK (time_spent IS NULL OR time_spent >= 0)
);

-- Note regarding duplicate attempts:
-- No UNIQUE(student_id, question_id) constraint is defined.
-- Multiple practice attempts per question are explicitly supported.

-- 2. Add documentation comment
COMMENT ON TABLE public.question_attempts IS 'Stores student general practice attempt history across questions with submission references and execution results.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_question_attempts_student_id ON public.question_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_question_id ON public.question_attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_student_question_created ON public.question_attempts(student_id, question_id, created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can read only their own practice attempts
DROP POLICY IF EXISTS "Allow students to view own question attempts" ON public.question_attempts;
CREATE POLICY "Allow students to view own question attempts"
    ON public.question_attempts
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT: Students can record practice attempts only for themselves
DROP POLICY IF EXISTS "Allow students to insert own question attempts" ON public.question_attempts;
CREATE POLICY "Allow students to insert own question attempts"
    ON public.question_attempts
    FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid());

-- Student UPDATE & DELETE:
-- No general student UPDATE or DELETE policies are granted.
-- Practice attempts are historical append-only learning logs.
-- Mistake history and progress tracking integrity cannot be altered or removed by clients.
