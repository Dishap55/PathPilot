-- =========================================================================
-- PathPilot Database Migration: Table 2 - subjects
-- Source of Truth: Approved PathPilot Database Architecture & Supabase Security
-- =========================================================================

-- 1. Create ONLY public.subjects table (Exactly 5 approved columns)
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Add documentation comment
COMMENT ON TABLE public.subjects IS 'Shared reference master table containing the subjects available in PathPilot.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Authenticated users can read active subjects
DROP POLICY IF EXISTS "Allow authenticated users to read active subjects" ON public.subjects;
CREATE POLICY "Allow authenticated users to read active subjects"
    ON public.subjects
    FOR SELECT
    TO authenticated
    USING (is_active = TRUE);

-- 5. No student INSERT, UPDATE, or DELETE policies
-- Normal students cannot modify shared reference subjects.
-- Admin management policies will be added when admin_users is implemented.

-- 6. Insert the six approved PathPilot reference subjects (Idempotent)
INSERT INTO public.subjects (name, code, description, is_active)
VALUES
    ('Data Structures & Algorithms', 'DSA', 'Core data structures, algorithms, problem-solving patterns, and complexity analysis.', TRUE),
    ('Object-Oriented Programming', 'OOPS', 'Classes, objects, inheritance, polymorphism, encapsulation, and design principles.', TRUE),
    ('Aptitude & Logical Reasoning', 'APT', 'Quantitative aptitude, logical reasoning, numerical ability, and problem solving.', TRUE),
    ('Database Management Systems', 'DBMS', 'Relational database concepts, SQL queries, normalization, indexing, and transactions.', TRUE),
    ('Operating Systems', 'OS', 'Processes, threads, CPU scheduling, synchronization, memory management, and file systems.', TRUE),
    ('Computer Networks', 'CN', 'OSI and TCP/IP models, network protocols, routing, IP addressing, and socket basics.', TRUE)
ON CONFLICT (code) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    is_active = EXCLUDED.is_active;
