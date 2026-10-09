-- =========================================================================
-- PathPilot Database Migration: Table 5 - questions
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.questions table (Exactly 10 approved columns)
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE RESTRICT,
    type TEXT NOT NULL,
    prompt TEXT NOT NULL,
    explanation TEXT,
    level TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_question_level CHECK (level IN ('Beginner', 'Intermediate', 'Professional'))
);

-- 2. Add documentation comment
COMMENT ON TABLE public.questions IS 'Central shared question bank for PathPilot curriculum questions.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_questions_topic_id ON public.questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic_level_active ON public.questions(topic_id, level, active);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- 5. Isolated updated_at trigger function & trigger for questions
CREATE OR REPLACE FUNCTION public.handle_questions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_questions_updated_at ON public.questions;
CREATE TRIGGER tr_questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_questions_updated_at();

-- 6. Row Level Security Policies
-- Questions are shared curriculum content, not student-owned data.

-- SELECT Policy: Authenticated users can read active questions
DROP POLICY IF EXISTS "Allow authenticated users to read active questions" ON public.questions;
CREATE POLICY "Allow authenticated users to read active questions"
    ON public.questions
    FOR SELECT
    TO authenticated
    USING (active = TRUE);

-- Normal students must NOT INSERT, UPDATE, or DELETE questions.
-- Administrative management policies will be added when admin_users is implemented.
-- Do NOT create unrestricted write policies.
