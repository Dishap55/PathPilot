-- Completed assessment summaries with a stable history model for future attempt types.
CREATE TABLE IF NOT EXISTS public.assessment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id TEXT NOT NULL UNIQUE,
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    assessment_type TEXT NOT NULL CHECK (assessment_type IN ('initial', 'periodic')),
    attempt_number INTEGER NOT NULL CHECK (attempt_number > 0),
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL,
    overall_time_seconds INTEGER NOT NULL CHECK (overall_time_seconds >= 0),
    subject_results JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT assessment_history_student_type_attempt_unique
      UNIQUE (student_id, assessment_type, attempt_number)
);

CREATE INDEX IF NOT EXISTS idx_assessment_history_student_latest
    ON public.assessment_history(student_id, assessment_type, attempt_number DESC);

ALTER TABLE public.assessment_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can view own assessment history" ON public.assessment_history;
CREATE POLICY "Students can view own assessment history"
    ON public.assessment_history FOR SELECT TO authenticated
    USING (student_id = auth.uid());

COMMENT ON TABLE public.assessment_history IS
  'Stores completed assessment summaries and attempt metadata; writes are managed by the trusted backend.';
