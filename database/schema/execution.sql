-- Execution Runs, SQL Runs, Notes & AI Requests
CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content_ref TEXT NOT NULL,
    content_version INT DEFAULT 1,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS execution_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    language VARCHAR(30) NOT NULL,
    judge0_reference VARCHAR(100),
    status VARCHAR(30) NOT NULL,
    runtime_ms INT,
    memory_kb INT,
    stdout_ref TEXT,
    stderr_ref TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sql_execution_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    query_hash VARCHAR(64) NOT NULL,
    status VARCHAR(30) NOT NULL,
    result_ref JSONB,
    error_message TEXT,
    execution_ms INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    request_type VARCHAR(50) NOT NULL,
    context_hash VARCHAR(64) NOT NULL,
    workflow_id VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'timeout')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    response_ref JSONB
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_ai_requests_student ON ai_requests(student_id, created_at);
CREATE INDEX IF NOT EXISTS idx_execution_runs_student ON execution_runs(student_id, question_id);
CREATE INDEX IF NOT EXISTS idx_sql_runs_student ON sql_execution_runs(student_id, question_id);
