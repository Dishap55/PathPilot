-- =========================================================================
-- PathPilot Database Migration: Table 17 - study_activity
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.study_activity table (Exactly 7 approved columns)
CREATE TABLE IF NOT EXISTS public.study_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    active_minutes INTEGER NOT NULL DEFAULT 0,
    questions_completed INTEGER NOT NULL DEFAULT 0,
    topics_touched INTEGER NOT NULL DEFAULT 0,
    streak_state TEXT NULL,
    CONSTRAINT uq_study_activity_student_date UNIQUE (student_id, activity_date),
    CONSTRAINT chk_study_activity_active_minutes CHECK (active_minutes >= 0),
    CONSTRAINT chk_study_activity_questions_completed CHECK (questions_completed >= 0),
    CONSTRAINT chk_study_activity_topics_touched CHECK (topics_touched >= 0)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.study_activity IS 'Stores student daily aggregate learning activity, questions completed, active minutes, and streak states.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_study_activity_student_id ON public.study_activity(student_id);
CREATE INDEX IF NOT EXISTS idx_study_activity_date ON public.study_activity(activity_date);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.study_activity ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view only their own study activity records
DROP POLICY IF EXISTS "Allow students to view own study activity" ON public.study_activity;
CREATE POLICY "Allow students to view own study activity"
    ON public.study_activity
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT: Students can initialize their own daily study activity
DROP POLICY IF EXISTS "Allow students to insert own study activity" ON public.study_activity;
CREATE POLICY "Allow students to insert own study activity"
    ON public.study_activity
    FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid());

-- Student UPDATE: Students can update their own daily study activity
DROP POLICY IF EXISTS "Allow students to update own study activity" ON public.study_activity;
CREATE POLICY "Allow students to update own study activity"
    ON public.study_activity
    FOR UPDATE
    TO authenticated
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- Student DELETE:
-- No student DELETE policy is granted.
-- Daily study history and streak tracking must not be casually deleted by the client.
