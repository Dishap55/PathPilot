-- =========================================================================
-- PathPilot Database Migration: Table 15 - reassessments
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.reassessments table (Exactly 8 approved columns)
CREATE TABLE IF NOT EXISTS public.reassessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE RESTRICT,
    source_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMPTZ NULL,
    score NUMERIC NULL,
    comparison_ref TEXT NULL,
    CONSTRAINT chk_reassessments_source_not_empty CHECK (length(trim(source_type)) > 0),
    CONSTRAINT chk_reassessments_score CHECK (score IS NULL OR score >= 0),
    CONSTRAINT chk_reassessments_submitted_after_created CHECK (submitted_at IS NULL OR submitted_at >= created_at)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.reassessments IS 'Stores topic-specific reassessment events measuring updated student understanding after learning and practice.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_reassessments_student_id ON public.reassessments(student_id);
CREATE INDEX IF NOT EXISTS idx_reassessments_topic_id ON public.reassessments(topic_id);
CREATE INDEX IF NOT EXISTS idx_reassessments_student_topic_created ON public.reassessments(student_id, topic_id, created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.reassessments ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view only their own reassessment records
DROP POLICY IF EXISTS "Allow students to view own reassessments" ON public.reassessments;
CREATE POLICY "Allow students to view own reassessments"
    ON public.reassessments
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT, UPDATE, DELETE:
-- No student INSERT, UPDATE, or DELETE policies are granted.
-- Reassessment creation, evaluation, objective scoring, and comparison generation
-- are strictly handled by backend services and the assessment evaluation engine.
