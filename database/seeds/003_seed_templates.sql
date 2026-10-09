-- Seed Initial Ability Assessment Template
INSERT INTO assessment_templates (id, subject_id, level, name, duration_minutes, status, version) VALUES
(
    't1111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'beginner',
    'DSA Diagnostic Assessment - Level 1',
    30,
    'published',
    1
)
ON CONFLICT DO NOTHING;

INSERT INTO template_questions (template_id, question_id, sequence_no, weight) VALUES
('t1111111-1111-1111-1111-111111111111', 'q1111111-1111-1111-1111-111111111111', 1, 1.0)
ON CONFLICT DO NOTHING;
