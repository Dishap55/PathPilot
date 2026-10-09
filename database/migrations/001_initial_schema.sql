-- =========================================================================
-- PathPilot Migration 001: Initial Complete Schema (23 Tables in Order)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. subjects
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. topics
CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    parent_topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
    supports_pattern BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. student_profiles
CREATE TABLE IF NOT EXISTS student_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    profile_photo_url TEXT,
    degree VARCHAR(100) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    current_year INT NOT NULL CHECK (current_year BETWEEN 1 AND 5),
    current_semester INT NOT NULL CHECK (current_semester BETWEEN 1 AND 10),
    graduation_year INT NOT NULL,
    preparation_unit VARCHAR(20) NOT NULL CHECK (preparation_unit IN ('months', 'weeks', 'days')),
    preparation_value INT NOT NULL CHECK (preparation_value > 0),
    target_date DATE NOT NULL,
    target_company VARCHAR(150),
    preferred_language VARCHAR(50) DEFAULT 'javascript',
    setup_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. student_subject_levels
CREATE TABLE IF NOT EXISTS student_subject_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    level VARCHAR(30) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'professional')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, subject_id)
);

-- 5. questions
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

-- 6. question_metadata
CREATE TABLE IF NOT EXISTS question_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL UNIQUE REFERENCES questions(id) ON DELETE CASCADE,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    pattern VARCHAR(100),
    language_support JSONB DEFAULT '["javascript", "python", "cpp", "java"]'::jsonb,
    expected_time INT DEFAULT 15,
    sql_schema_ref TEXT,
    execution_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. assessment_templates
CREATE TABLE IF NOT EXISTS assessment_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    level VARCHAR(30) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'professional')),
    name VARCHAR(150) NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 45,
    status VARCHAR(30) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    version INT NOT NULL DEFAULT 1,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. template_questions
CREATE TABLE IF NOT EXISTS template_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES assessment_templates(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    sequence_no INT NOT NULL,
    weight DECIMAL(4, 2) DEFAULT 1.00,
    UNIQUE(template_id, question_id)
);

-- 9. assessments
CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES assessment_templates(id) ON DELETE RESTRICT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    score DECIMAL(5, 2),
    summary_ref JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. assessment_attempts
CREATE TABLE IF NOT EXISTS assessment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    selected_answer TEXT,
    execution_run_id UUID,
    correct BOOLEAN NOT NULL DEFAULT FALSE,
    time_spent INT DEFAULT 0,
    answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. question_attempts
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

-- 12. topic_progress
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

-- 13. roadmap
CREATE TABLE IF NOT EXISTS roadmap (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_date DATE NOT NULL,
    generation_source VARCHAR(50) DEFAULT 'assessment_inference',
    status VARCHAR(30) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. roadmap_levels
CREATE TABLE IF NOT EXISTS roadmap_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID NOT NULL REFERENCES roadmap(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    sequence_no INT NOT NULL,
    status VARCHAR(30) DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
    prerequisite_ref UUID REFERENCES topics(id),
    unlocked_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    UNIQUE(roadmap_id, topic_id)
);

-- 15. reassessments
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

-- 16. confidence_records
CREATE TABLE IF NOT EXISTS confidence_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    confidence_value INT NOT NULL CHECK (confidence_value BETWEEN 1 AND 5),
    captured_at TIMESTAMPTZ DEFAULT NOW(),
    source VARCHAR(50) DEFAULT 'student_self_report'
);

-- 17. study_activity
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

-- 18. notes
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

-- 19. admin_users
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'moderator', 'reviewer')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. admin_audit_log
CREATE TABLE IF NOT EXISTS admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. ai_requests
CREATE TABLE IF NOT EXISTS ai_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    request_type VARCHAR(50) NOT NULL,
    context_hash VARCHAR(64) NOT NULL,
    workflow_id VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'timeout')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    response_ref JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. execution_runs
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

-- 23. sql_execution_runs
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
