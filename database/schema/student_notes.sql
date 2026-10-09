-- Student Notes Table Definition
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

-- Indexing
CREATE INDEX IF NOT EXISTS idx_student_notes_student ON public.student_notes(student_id);
CREATE INDEX IF NOT EXISTS idx_student_notes_lookup ON public.student_notes(student_id, subject, topic_id);
CREATE INDEX IF NOT EXISTS idx_student_notes_created_at ON public.student_notes(created_at DESC);
