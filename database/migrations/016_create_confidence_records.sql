-- =========================================================================
-- PathPilot Database Migration: Table 16 - confidence_records
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.confidence_records table (Exactly 6 approved columns)
CREATE TABLE IF NOT EXISTS public.confidence_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE RESTRICT,
    confidence_value INTEGER NOT NULL,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    source TEXT NULL,
    CONSTRAINT chk_confidence_records_value CHECK (confidence_value BETWEEN 1 AND 10)
);

-- Note regarding longitudinal history:
-- No UNIQUE(student_id, topic_id) constraint is defined.
-- Multiple self-reported confidence captures across time are explicitly supported.

-- 2. Add documentation comment
COMMENT ON TABLE public.confidence_records IS 'Stores longitudinal student self-reported confidence ratings per topic on a 1-10 scale.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_confidence_records_student_id ON public.confidence_records(student_id);
CREATE INDEX IF NOT EXISTS idx_confidence_records_topic_id ON public.confidence_records(topic_id);
CREATE INDEX IF NOT EXISTS idx_confidence_records_student_topic_captured ON public.confidence_records(student_id, topic_id, captured_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.confidence_records ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view only their own confidence records
DROP POLICY IF EXISTS "Allow students to view own confidence records" ON public.confidence_records;
CREATE POLICY "Allow students to view own confidence records"
    ON public.confidence_records
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT: Students can record confidence ratings for themselves
DROP POLICY IF EXISTS "Allow students to insert own confidence records" ON public.confidence_records;
CREATE POLICY "Allow students to insert own confidence records"
    ON public.confidence_records
    FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid());

-- Student UPDATE: Students can update their own confidence records if needed
DROP POLICY IF EXISTS "Allow students to update own confidence records" ON public.confidence_records;
CREATE POLICY "Allow students to update own confidence records"
    ON public.confidence_records
    FOR UPDATE
    TO authenticated
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- Student DELETE:
-- No student DELETE policy is granted.
-- Longitudinal self-efficacy history is preserved for progress analytics.
