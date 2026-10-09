-- =========================================================================
-- PathPilot Database Migration: Table 12 - topic_progress
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.topic_progress table (Exactly 10 approved columns)
CREATE TABLE IF NOT EXISTS public.topic_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE RESTRICT,
    attempted_count INTEGER NOT NULL DEFAULT 0,
    completed_count INTEGER NOT NULL DEFAULT 0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    wrong_count INTEGER NOT NULL DEFAULT 0,
    accuracy NUMERIC NOT NULL DEFAULT 0,
    total_practice_seconds INTEGER NOT NULL DEFAULT 0,
    last_practiced_at TIMESTAMPTZ NULL,
    CONSTRAINT uq_topic_progress_student_topic UNIQUE (student_id, topic_id),
    CONSTRAINT chk_topic_progress_attempted CHECK (attempted_count >= 0),
    CONSTRAINT chk_topic_progress_completed CHECK (completed_count >= 0),
    CONSTRAINT chk_topic_progress_correct CHECK (correct_count >= 0),
    CONSTRAINT chk_topic_progress_wrong CHECK (wrong_count >= 0),
    CONSTRAINT chk_topic_progress_accuracy CHECK (accuracy >= 0 AND accuracy <= 100),
    CONSTRAINT chk_topic_progress_time CHECK (total_practice_seconds >= 0)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.topic_progress IS 'Stores student aggregate practice activity and performance metrics per topic.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_topic_progress_student_id ON public.topic_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_topic_progress_topic_id ON public.topic_progress(topic_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.topic_progress ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view only their own topic progress
DROP POLICY IF EXISTS "Allow students to view own topic progress" ON public.topic_progress;
CREATE POLICY "Allow students to view own topic progress"
    ON public.topic_progress
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT: Students can initialize topic progress only for themselves
DROP POLICY IF EXISTS "Allow students to insert own topic progress" ON public.topic_progress;
CREATE POLICY "Allow students to insert own topic progress"
    ON public.topic_progress
    FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid());

-- Student UPDATE: Students can update topic progress only for themselves
DROP POLICY IF EXISTS "Allow students to update own topic progress" ON public.topic_progress;
CREATE POLICY "Allow students to update own topic progress"
    ON public.topic_progress
    FOR UPDATE
    TO authenticated
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- Student DELETE:
-- No student DELETE policy is granted.
-- Topic progress represents historical cumulative metrics and must not be casually deleted from the client.
