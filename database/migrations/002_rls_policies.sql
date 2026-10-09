-- =========================================================================
-- PathPilot Migration 002: Row Level Security (RLS) & Helper Functions
-- =========================================================================

-- Enable RLS across all tables
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_subject_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE reassessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE confidence_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sql_execution_runs ENABLE ROW LEVEL SECURITY;

-- Security Helper Functions
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users
        WHERE user_id = $1 AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION owns_student_record(user_id UUID, student_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (user_id = student_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION can_access_question(question_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM questions
        WHERE id = $1 AND active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Student Profiles Policies
CREATE POLICY "Students can view own profile" ON student_profiles
    FOR SELECT USING (id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Students can insert own profile" ON student_profiles
    FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "Students can update own profile" ON student_profiles
    FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Student Subject Levels Policies
CREATE POLICY "Students can view own subject levels" ON student_subject_levels
    FOR SELECT USING (student_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Students can insert own subject levels" ON student_subject_levels
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own subject levels" ON student_subject_levels
    FOR UPDATE USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());

-- Reference Tables: Public read for active rows, admin manage
CREATE POLICY "Anyone can view active subjects" ON subjects
    FOR SELECT USING (is_active = TRUE OR is_admin(auth.uid()));

CREATE POLICY "Anyone can view active topics" ON topics
    FOR SELECT USING (is_active = TRUE OR is_admin(auth.uid()));

CREATE POLICY "Students view active questions" ON questions
    FOR SELECT USING (active = TRUE OR is_admin(auth.uid()));

CREATE POLICY "Students view question metadata" ON question_metadata
    FOR SELECT USING (EXISTS (SELECT 1 FROM questions q WHERE q.id = question_id AND q.active = TRUE) OR is_admin(auth.uid()));

CREATE POLICY "Students view notes" ON notes
    FOR SELECT USING (active = TRUE OR is_admin(auth.uid()));

-- Assessments and Attempts
CREATE POLICY "Students view own assessments" ON assessments
    FOR SELECT USING (student_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Students insert own assessments" ON assessments
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students view own assessment attempts" ON assessment_attempts
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM assessments a WHERE a.id = assessment_id AND a.student_id = auth.uid()) 
        OR is_admin(auth.uid())
    );

-- Question Attempts & Executions
CREATE POLICY "Students manage own question attempts" ON question_attempts
    FOR ALL USING (student_id = auth.uid() OR is_admin(auth.uid()))
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students view own executions" ON execution_runs
    FOR SELECT USING (student_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Students view own sql executions" ON sql_execution_runs
    FOR SELECT USING (student_id = auth.uid() OR is_admin(auth.uid()));

-- Progress & Roadmap
CREATE POLICY "Students manage own topic progress" ON topic_progress
    FOR ALL USING (student_id = auth.uid() OR is_admin(auth.uid()))
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students manage own roadmap" ON roadmap
    FOR ALL USING (student_id = auth.uid() OR is_admin(auth.uid()))
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students manage own roadmap levels" ON roadmap_levels
    FOR ALL USING (
        EXISTS (SELECT 1 FROM roadmap r WHERE r.id = roadmap_id AND r.student_id = auth.uid()) 
        OR is_admin(auth.uid())
    );

CREATE POLICY "Students manage study activity" ON study_activity
    FOR ALL USING (student_id = auth.uid() OR is_admin(auth.uid()))
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students manage confidence records" ON confidence_records
    FOR ALL USING (student_id = auth.uid() OR is_admin(auth.uid()))
    WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students manage reassessments" ON reassessments
    FOR ALL USING (student_id = auth.uid() OR is_admin(auth.uid()))
    WITH CHECK (student_id = auth.uid());

-- Admin full management policies
CREATE POLICY "Admins full access on questions" ON questions
    FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access on templates" ON assessment_templates
    FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access on template questions" ON template_questions
    FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access on audit log" ON admin_audit_log
    FOR ALL USING (is_admin(auth.uid()));
