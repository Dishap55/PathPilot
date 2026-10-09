-- =========================================================================
-- PathPilot Database Migration: Table 6 - question_metadata
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.question_metadata table (Exactly 7 approved columns)
CREATE TABLE IF NOT EXISTS public.question_metadata (
    question_id UUID PRIMARY KEY REFERENCES public.questions(id) ON DELETE CASCADE,
    difficulty TEXT NOT NULL,
    pattern TEXT NULL,
    language_support JSONB NULL,
    expected_time INTEGER NULL,
    sql_schema_ref TEXT NULL,
    execution_config JSONB NULL,
    CONSTRAINT chk_question_metadata_difficulty CHECK (difficulty IN ('Simple', 'Medium', 'Hard'))
);

-- 2. Add documentation comment
COMMENT ON TABLE public.question_metadata IS '1:1 metadata extension for questions containing execution, pattern, language support, and difficulty attributes.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.question_metadata ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Authenticated users can read metadata for ACTIVE questions only
DROP POLICY IF EXISTS "Allow authenticated users to read active question metadata" ON public.question_metadata;
CREATE POLICY "Allow authenticated users to read active question metadata"
    ON public.question_metadata
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.questions
            WHERE questions.id = question_metadata.question_id
              AND questions.active = TRUE
        )
    );

-- 5. Student Write Restrictions:
-- Normal students cannot INSERT, UPDATE, or DELETE question metadata.
-- Administrative management policies will be added when admin_users is implemented.
-- Do NOT create unrestricted write policies.
