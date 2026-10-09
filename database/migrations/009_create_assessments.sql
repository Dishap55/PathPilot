-- =========================================================================
-- PathPilot Database Migration: Table 9 - assessments
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.assessments table (Exactly 8 approved columns)
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES public.assessment_templates(id) ON DELETE RESTRICT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMPTZ NULL,
    status TEXT NOT NULL DEFAULT 'in_progress',
    score NUMERIC NULL,
    summary_ref TEXT NULL,
    CONSTRAINT chk_assessments_status CHECK (status IN ('in_progress', 'submitted', 'completed', 'abandoned', 'timed_out')),
    CONSTRAINT chk_assessments_score CHECK (score IS NULL OR score >= 0),
    CONSTRAINT chk_assessments_submitted_after_started CHECK (submitted_at IS NULL OR submitted_at >= started_at)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.assessments IS 'Stores actual student assessment session instances based on assessment templates.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_assessments_student_id ON public.assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_assessments_template_id ON public.assessments(template_id);
CREATE INDEX IF NOT EXISTS idx_assessments_student_status ON public.assessments(student_id, status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Authenticated students can only read their own assessments
DROP POLICY IF EXISTS "Allow students to view own assessments" ON public.assessments;
CREATE POLICY "Allow students to view own assessments"
    ON public.assessments
    FOR SELECT
    TO authenticated
    USING (
        student_id = auth.uid()
    );

-- Student INSERT: Authenticated students can create assessments only for themselves
DROP POLICY IF EXISTS "Allow students to insert own assessments" ON public.assessments;
CREATE POLICY "Allow students to insert own assessments"
    ON public.assessments
    FOR INSERT
    TO authenticated
    WITH CHECK (
        student_id = auth.uid()
    );

-- Student UPDATE & DELETE:
-- No general student UPDATE or DELETE policies are granted.
-- Evaluation, score calculation, status transitions, and submission timestamps
-- are strictly handled by secure backend / service-role assessment engine logic.
-- Assessment history cannot be casually modified or deleted by clients.
