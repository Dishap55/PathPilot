-- =========================================================================
-- PathPilot Database Migration: Table 7 - assessment_templates
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.assessment_templates table (Exactly 8 approved columns)
CREATE TABLE IF NOT EXISTS public.assessment_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE RESTRICT,
    level TEXT NOT NULL,
    name TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'published',
    version INTEGER NOT NULL DEFAULT 1,
    created_by UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    CONSTRAINT chk_assessment_template_level CHECK (level IN ('Beginner', 'Intermediate', 'Professional')),
    CONSTRAINT chk_assessment_template_status CHECK (status IN ('draft', 'published', 'archived')),
    CONSTRAINT chk_assessment_template_duration CHECK (duration_minutes > 0),
    CONSTRAINT chk_assessment_template_version CHECK (version >= 1)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.assessment_templates IS 'Stores reusable diagnostic assessment definitions per subject and skill level.';

-- 3. Create approved performance indexes
CREATE INDEX IF NOT EXISTS idx_assessment_templates_subject_id ON public.assessment_templates(subject_id);
CREATE INDEX IF NOT EXISTS idx_assessment_templates_subject_level_status ON public.assessment_templates(subject_id, level, status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.assessment_templates ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policy: Authenticated users can read published/approved templates only
DROP POLICY IF EXISTS "Allow authenticated users to read published templates" ON public.assessment_templates;
CREATE POLICY "Allow authenticated users to read published templates"
    ON public.assessment_templates
    FOR SELECT
    TO authenticated
    USING (status = 'published');

-- 6. Student Write Restrictions:
-- Normal students cannot INSERT, UPDATE, or DELETE assessment templates.
-- Administrative write policies will be added when admin_users is implemented.
-- Do NOT create unrestricted write policies.
