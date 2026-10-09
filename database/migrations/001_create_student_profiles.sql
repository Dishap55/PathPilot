-- =========================================================================
-- PathPilot Database Migration: Table 1 - student_profiles
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY student_profiles table (No other tables)
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    profile_photo_url TEXT,
    degree TEXT,
    branch TEXT,
    current_year INTEGER,
    current_semester INTEGER,
    graduation_year INTEGER,
    preparation_unit TEXT,
    preparation_value INTEGER,
    target_date DATE,
    target_company TEXT,
    preferred_language TEXT,
    setup_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Table documentation comment
COMMENT ON TABLE public.student_profiles IS 'Stores authenticated student personal, academic, and preparation setup information linked to auth.users.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Isolated updated_at trigger function & trigger for student_profiles
CREATE OR REPLACE FUNCTION public.handle_student_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_student_profiles_updated_at ON public.student_profiles;
CREATE TRIGGER tr_student_profiles_updated_at
    BEFORE UPDATE ON public.student_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_student_profiles_updated_at();

-- 5. Row Level Security Policies
-- The core ownership rule: student_profiles.id = auth.uid()

-- SELECT Policy: A student can read only their own profile
DROP POLICY IF EXISTS "Students can view own profile" ON public.student_profiles;
CREATE POLICY "Students can view own profile"
    ON public.student_profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- INSERT Policy: A student can insert only a profile whose id equals auth.uid()
DROP POLICY IF EXISTS "Students can insert own profile" ON public.student_profiles;
CREATE POLICY "Students can insert own profile"
    ON public.student_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- UPDATE Policy: A student can update only their own profile
DROP POLICY IF EXISTS "Students can update own profile" ON public.student_profiles;
CREATE POLICY "Students can update own profile"
    ON public.student_profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- DELETE Policy:
-- Intentionally omitted. No unrestricted student DELETE policy is created.
-- Profile records cannot be deleted directly by students.
