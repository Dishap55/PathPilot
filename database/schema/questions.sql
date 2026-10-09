-- Questions & Metadata Tables Definition
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE RESTRICT,
    type VARCHAR(30) NOT NULL CHECK (type IN ('mcq', 'coding', 'sql')),
    prompt TEXT NOT NULL,
    explanation TEXT,
    level VARCHAR(30) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'professional')),
    active BOOLEAN DEFAULT TRUE,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS question_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL UNIQUE REFERENCES questions(id) ON DELETE CASCADE,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    pattern VARCHAR(100),
    language_support JSONB DEFAULT '["javascript", "python", "cpp", "java"]'::jsonb,
    expected_time INT DEFAULT 15, -- in minutes
    sql_schema_ref TEXT,
    execution_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_questions_topic_level ON questions(topic_id, level);
CREATE INDEX IF NOT EXISTS idx_questions_active ON questions(active);
CREATE INDEX IF NOT EXISTS idx_question_metadata_diff ON question_metadata(difficulty);
