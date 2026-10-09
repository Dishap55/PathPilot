-- =========================================================================
-- PathPilot Database Migration: Table 18 - notes
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.notes table (Exactly 6 approved columns)
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    content_ref TEXT NOT NULL,
    content_version INTEGER NOT NULL DEFAULT 1,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT chk_notes_content_version CHECK (content_version >= 1),
    CONSTRAINT chk_notes_title_not_empty CHECK (length(trim(title)) > 0),
    CONSTRAINT chk_notes_content_ref_not_empty CHECK (length(trim(content_ref)) > 0)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.notes IS 'Stores metadata and storage reference pointers for curriculum learning notes per topic.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_notes_topic_id ON public.notes(topic_id);
CREATE INDEX IF NOT EXISTS idx_notes_topic_active ON public.notes(topic_id, active);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Authenticated SELECT: Students can read active notes belonging to active topics
DROP POLICY IF EXISTS "Allow authenticated users to read active notes for active topics" ON public.notes;
CREATE POLICY "Allow authenticated users to read active notes for active topics"
    ON public.notes
    FOR SELECT
    TO authenticated
    USING (
        active = TRUE
        AND EXISTS (
            SELECT 1 FROM public.topics
            WHERE topics.id = notes.topic_id
              AND topics.is_active = TRUE
        )
    );

-- Student INSERT, UPDATE, DELETE:
-- No student INSERT, UPDATE, or DELETE policies are granted.
-- Notes are curated curriculum content managed by platform administrators.
-- Admin management policies will be added when admin_users is implemented.
