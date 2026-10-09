-- =========================================================================
-- PathPilot Database Migration: Table 14 - roadmap_levels
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.roadmap_levels table (Exactly 8 approved columns)
CREATE TABLE IF NOT EXISTS public.roadmap_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID NOT NULL REFERENCES public.roadmap(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE RESTRICT,
    sequence_no INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'locked',
    prerequisite_ref TEXT NULL,
    unlocked_at TIMESTAMPTZ NULL,
    completed_at TIMESTAMPTZ NULL,
    CONSTRAINT uq_roadmap_levels_sequence UNIQUE (roadmap_id, sequence_no),
    CONSTRAINT chk_roadmap_levels_sequence CHECK (sequence_no > 0),
    CONSTRAINT chk_roadmap_levels_status CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
    CONSTRAINT chk_roadmap_levels_completed_after_unlocked CHECK (completed_at IS NULL OR unlocked_at IS NULL OR completed_at >= unlocked_at)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.roadmap_levels IS 'Stores individual ordered learning steps and topics in student roadmaps.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_roadmap_levels_roadmap_id ON public.roadmap_levels(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_levels_topic_id ON public.roadmap_levels(topic_id);
CREATE INDEX IF NOT EXISTS idx_roadmap_levels_roadmap_seq ON public.roadmap_levels(roadmap_id, sequence_no);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.roadmap_levels ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Student SELECT: Students can view roadmap levels only for roadmaps they own
DROP POLICY IF EXISTS "Allow students to view own roadmap levels" ON public.roadmap_levels;
CREATE POLICY "Allow students to view own roadmap levels"
    ON public.roadmap_levels
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.roadmap
            WHERE roadmap.id = roadmap_levels.roadmap_id
              AND roadmap.student_id = auth.uid()
        )
    );

-- Student INSERT, UPDATE, DELETE:
-- No student INSERT, UPDATE, or DELETE policies are granted.
-- Sequence ordering, unlocking logic, and milestone completion
-- are strictly handled by backend services and learning-engine orchestration.
