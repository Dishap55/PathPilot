-- Roadmap & Roadmap Levels
CREATE TABLE IF NOT EXISTS roadmap (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_date DATE NOT NULL,
    generation_source VARCHAR(50) DEFAULT 'assessment_inference',
    status VARCHAR(30) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

-- Indexing
CREATE INDEX IF NOT EXISTS idx_roadmap_student ON roadmap(student_id, target_date);
CREATE INDEX IF NOT EXISTS idx_roadmap_levels ON roadmap_levels(roadmap_id, sequence_no);
