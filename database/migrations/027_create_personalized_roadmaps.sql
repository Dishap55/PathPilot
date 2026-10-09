-- Step 4.1 personalized DSA and Aptitude roadmap snapshots.
-- Assessment history remains the source of truth and is not changed here.
CREATE TABLE IF NOT EXISTS public.personalized_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    source_assessment_id TEXT NOT NULL UNIQUE
        REFERENCES public.assessment_history(assessment_id) ON DELETE CASCADE,
    source_assessment_type TEXT NOT NULL CHECK (source_assessment_type IN ('initial', 'periodic')),
    source TEXT NOT NULL CHECK (source IN ('INITIAL_ASSESSMENT', 'PERIODIC_ASSESSMENT')),
    starting_levels JSONB NOT NULL DEFAULT '{}'::jsonb,
    assessed_levels JSONB NOT NULL DEFAULT '{}'::jsonb,
    roadmap_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_personalized_roadmaps_student_active
    ON public.personalized_roadmaps(student_id, status, generated_at DESC);

ALTER TABLE public.personalized_roadmaps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can view own personalized roadmaps" ON public.personalized_roadmaps;
CREATE POLICY "Students can view own personalized roadmaps"
    ON public.personalized_roadmaps
    FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

COMMENT ON TABLE public.personalized_roadmaps IS
    'Versioned deterministic roadmap snapshots derived from persisted assessment history; backend-managed writes only.';
