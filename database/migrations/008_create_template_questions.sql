-- =========================================================================
-- PathPilot Database Migration: Table 8 - template_questions
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.template_questions table (Exactly 5 approved columns)
CREATE TABLE IF NOT EXISTS public.template_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES public.assessment_templates(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
    sequence_no INTEGER NOT NULL,
    weight NUMERIC NOT NULL DEFAULT 1.00,
    CONSTRAINT uq_template_sequence UNIQUE (template_id, sequence_no),
    CONSTRAINT uq_template_question UNIQUE (template_id, question_id),
    CONSTRAINT chk_template_questions_sequence CHECK (sequence_no > 0),
    CONSTRAINT chk_template_questions_weight CHECK (weight > 0)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.template_questions IS 'Maps curated question bank items to assessment templates with sequence order and score weighting.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_template_questions_template_id ON public.template_questions(template_id);
CREATE INDEX IF NOT EXISTS idx_template_questions_question_id ON public.template_questions(question_id);
CREATE INDEX IF NOT EXISTS idx_template_questions_template_seq ON public.template_questions(template_id, sequence_no);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.template_questions ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policy: Authenticated users can read questions for published templates only
DROP POLICY IF EXISTS "Allow authenticated users to read published template questions" ON public.template_questions;
CREATE POLICY "Allow authenticated users to read published template questions"
    ON public.template_questions
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.assessment_templates
            WHERE assessment_templates.id = template_questions.template_id
              AND assessment_templates.status = 'published'
        )
    );

-- 6. Student Write Restrictions:
-- Normal students cannot INSERT, UPDATE, or DELETE template questions.
-- Administrative management policies will be added when admin_users is implemented.
-- Do NOT create unrestricted write policies.
