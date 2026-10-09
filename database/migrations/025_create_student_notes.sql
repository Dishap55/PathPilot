-- =========================================================================
-- PathPilot Database Migration: Table 25 - student_notes
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create public.student_notes table
CREATE TABLE IF NOT EXISTS public.student_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    topic_id VARCHAR(150) NOT NULL,
    topic_name VARCHAR(200) NOT NULL,
    section VARCHAR(100) DEFAULT 'Practice',
    question_id VARCHAR(150),
    question_title VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_student_notes_content_not_empty CHECK (length(trim(content)) > 0)
);

-- 2. Add documentation comment
COMMENT ON TABLE public.student_notes IS 'Stores personal student-created notes captured during practice and learning.';

-- 3. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_student_notes_student ON public.student_notes(student_id);
CREATE INDEX IF NOT EXISTS idx_student_notes_lookup ON public.student_notes(student_id, subject, topic_id);
CREATE INDEX IF NOT EXISTS idx_student_notes_created_at ON public.student_notes(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies (Student-isolated: student A cannot read/edit/delete student B's notes)
DROP POLICY IF EXISTS "Students can view their own notes" ON public.student_notes;
CREATE POLICY "Students can view their own notes"
    ON public.student_notes
    FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Students can insert their own notes" ON public.student_notes;
CREATE POLICY "Students can insert their own notes"
    ON public.student_notes
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Students can update their own notes" ON public.student_notes;
CREATE POLICY "Students can update their own notes"
    ON public.student_notes
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = student_id)
    WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Students can delete their own notes" ON public.student_notes;
CREATE POLICY "Students can delete their own notes"
    ON public.student_notes
    FOR DELETE
    TO authenticated
    USING (auth.uid() = student_id);
