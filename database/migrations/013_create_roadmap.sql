-- =========================================================================
-- PathPilot Database Migration: Table 13 - roadmap
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.roadmap table (Exactly 7 approved columns)
CREATE TABLE IF NOT EXISTS public.roadmap (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    target_date DATE NOT NULL,
    generation_source TEXT NOT NULL,
    status TEXT NOT NULL,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Note regarding uniqueness:
-- No UNIQUE(student_id) constraint is enforced.
-- Students may have regenerated or historical roadmaps across different statuses.

-- 2. Add documentation comment
COMMENT ON TABLE public.roadmap IS 'Stores the student personalized learning roadmap root entity.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_roadmap_student_id ON public.roadmap(student_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_student_status ON public.roadmap(student_id, status);
CREATE INDEX IF NOT EXISTS idx_roadmap_target_date ON public.roadmap(target_date);

-- 4. Isolated updated_at trigger function & trigger
CREATE OR REPLACE FUNCTION public.handle_roadmap_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_roadmap_updated_at ON public.roadmap;
CREATE TRIGGER trg_roadmap_updated_at
    BEFORE UPDATE ON public.roadmap
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_roadmap_updated_at();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.roadmap ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Student SELECT: Students can view only their own roadmap records
DROP POLICY IF EXISTS "Allow students to view own roadmap" ON public.roadmap;
CREATE POLICY "Allow students to view own roadmap"
    ON public.roadmap
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

-- Student INSERT, UPDATE, DELETE:
-- No student INSERT, UPDATE, or DELETE policies are granted.
-- Roadmap creation, regeneration, and lifecycle status changes
-- are exclusively performed by the backend / AI Mentor service layer.
