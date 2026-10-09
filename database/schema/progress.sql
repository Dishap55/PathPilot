-- Student Progress & Study Activity
CREATE TABLE IF NOT EXISTS topic_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    attempted_count INT NOT NULL DEFAULT 0 CHECK (attempted_count >= 0),
    completed_count INT NOT NULL DEFAULT 0 CHECK (completed_count >= 0),
    correct_count INT NOT NULL DEFAULT 0 CHECK (correct_count >= 0),
    wrong_count INT NOT NULL DEFAULT 0 CHECK (wrong_count >= 0),
    accuracy DECIMAL(5, 2) NOT NULL DEFAULT 0.00 CHECK (accuracy >= 0 AND accuracy <= 100),
    total_practice_seconds INT NOT NULL DEFAULT 0 CHECK (total_practice_seconds >= 0),
    last_practiced_at TIMESTAMPTZ,
    UNIQUE(student_id, topic_id)
);

CREATE TABLE IF NOT EXISTS study_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
    active_minutes INT NOT NULL DEFAULT 0 CHECK (active_minutes >= 0),
    questions_completed INT NOT NULL DEFAULT 0 CHECK (questions_completed >= 0),
    topics_touched INT NOT NULL DEFAULT 0 CHECK (topics_touched >= 0),
    streak_state INT NOT NULL DEFAULT 1 CHECK (streak_state >= 0),
    UNIQUE(student_id, activity_date)
);

CREATE TABLE IF NOT EXISTS confidence_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    confidence_value INT NOT NULL CHECK (confidence_value BETWEEN 1 AND 5),
    captured_at TIMESTAMPTZ DEFAULT NOW(),
    source VARCHAR(50) DEFAULT 'student_self_report'
);

-- Indexing
CREATE INDEX IF NOT EXISTS idx_topic_progress_student ON topic_progress(student_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_study_activity_student_date ON study_activity(student_id, activity_date);
