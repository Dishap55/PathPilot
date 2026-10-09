-- Reassessments & Question Attempts
CREATE TABLE IF NOT EXISTS question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    result VARCHAR(30) NOT NULL CHECK (result IN ('passed', 'failed', 'partial', 'compile_error', 'runtime_error', 'time_limit_exceeded')),
    code_submission_ref TEXT,
    sql_submission_ref TEXT,
    feedback_state JSONB,
    time_spent INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reassessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    source_type VARCHAR(50) DEFAULT 'adaptive_weakness_trigger',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    score DECIMAL(5, 2),
    comparison_ref JSONB
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_question_attempts_lookup ON question_attempts(student_id, question_id, created_at);
CREATE INDEX IF NOT EXISTS idx_reassessments_student ON reassessments(student_id, topic_id);
