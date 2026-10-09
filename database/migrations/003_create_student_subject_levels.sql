-- =========================================================================
-- PathPilot Database Migration: Table 3 - student_subject_levels
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.student_subject_levels table (Exactly 6 approved columns)
CREATE TABLE IF NOT EXISTS public.student_subject_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    level TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_student_subject UNIQUE (student_id, subject_id),
    CONSTRAINT chk_student_subject_level CHECK (level IN ('Beginner', 'Intermediate', 'Professional'))
);

-- 2. Add documentation comment
COMMENT ON TABLE public.student_subject_levels IS 'Stores the self-selected starting proficiency level of each student for each PathPilot subject.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.student_subject_levels ENABLE ROW LEVEL SECURITY;

-- 4. Isolated updated_at trigger function & trigger
CREATE OR REPLACE FUNCTION public.handle_student_subject_levels_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_student_subject_levels_updated_at ON public.student_subject_levels;
CREATE TRIGGER tr_student_subject_levels_updated_at
    BEFORE UPDATE ON public.student_subject_levels
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_student_subject_levels_updated_at();

-- 5. Row Level Security Policies
-- Core ownership rule: student_id = auth.uid()

-- SELECT Policy: A student can view only their own subject levels
DROP POLICY IF EXISTS "Students can view own subject levels" ON public.student_subject_levels;
CREATE POLICY "Students can view own subject levels"
    ON public.student_subject_levels
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- INSERT Policy: A student can insert subject levels only for themselves
DROP POLICY IF EXISTS "Students can insert own subject levels" ON public.student_subject_levels;
CREATE POLICY "Students can insert own subject levels"
    ON public.student_subject_levels
    FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid());

-- UPDATE Policy: A student can update only their own subject levels
DROP POLICY IF EXISTS "Students can update own subject levels" ON public.student_subject_levels;
CREATE POLICY "Students can update own subject levels"
    ON public.student_subject_levels
    FOR UPDATE
    TO authenticated
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- DELETE Policy:
-- Intentionally omitted. No unrestricted student DELETE policy is created.
-- Subject levels cannot be deleted directly by standard student users.
