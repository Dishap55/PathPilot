-- =========================================================================
-- PathPilot Database Migration: Table 4 - topics
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.topics table (Exactly 7 approved columns)
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    parent_topic_id UUID NULL REFERENCES public.topics(id) ON DELETE SET NULL,
    supports_pattern BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Add documentation comment
COMMENT ON TABLE public.topics IS 'Stores the hierarchical learning topics and sections under each PathPilot subject.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Authenticated users can read active topics
DROP POLICY IF EXISTS "Allow authenticated users to read active topics" ON public.topics;
CREATE POLICY "Allow authenticated users to read active topics"
    ON public.topics
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

-- 5. No student INSERT, UPDATE, or DELETE policies
-- Topics are shared reference and learning content. Normal students cannot modify topics.
-- Administrative management policies will be added when admin_users is implemented.

-- 6. Insert Top-Level Aptitude Sections (Quantitative, Logical, Reasoning)
DO $$
DECLARE
    v_apt_id UUID;
BEGIN
    -- Locate the Aptitude subject ID via stable unique code 'APT'
    SELECT id INTO v_apt_id FROM public.subjects WHERE code = 'APT';

    IF v_apt_id IS NOT NULL THEN
        -- Section 1: Quantitative
        IF NOT EXISTS (
            SELECT 1 FROM public.topics
            WHERE subject_id = v_apt_id AND name = 'Quantitative' AND parent_topic_id IS NULL
        ) THEN
            INSERT INTO public.topics (subject_id, name, description, parent_topic_id, supports_pattern, is_active)
            VALUES (v_apt_id, 'Quantitative', 'Quantitative aptitude, arithmetic, numerical ability, and problem solving.', NULL, FALSE, TRUE);
        END IF;

        -- Section 2: Logical
        IF NOT EXISTS (
            SELECT 1 FROM public.topics
            WHERE subject_id = v_apt_id AND name = 'Logical' AND parent_topic_id IS NULL
        ) THEN
            INSERT INTO public.topics (subject_id, name, description, parent_topic_id, supports_pattern, is_active)
            VALUES (v_apt_id, 'Logical', 'Logical deduction, sequence series, analytical puzzles, and pattern recognition.', NULL, FALSE, TRUE);
        END IF;

        -- Section 3: Reasoning
        IF NOT EXISTS (
            SELECT 1 FROM public.topics
            WHERE subject_id = v_apt_id AND name = 'Reasoning' AND parent_topic_id IS NULL
        ) THEN
            INSERT INTO public.topics (subject_id, name, description, parent_topic_id, supports_pattern, is_active)
            VALUES (v_apt_id, 'Reasoning', 'Verbal and non-verbal reasoning, critical deduction, and analytical inference.', NULL, FALSE, TRUE);
        END IF;
    END IF;
END $$;
