-- Seed Core 6 Subjects
INSERT INTO subjects (id, name, code, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Data Structures & Algorithms', 'DSA', 'Core algorithmic patterns, complexity and problem solving'),
('22222222-2222-2222-2222-222222222222', 'Object Oriented Programming', 'OOPS', 'Classes, encapsulation, inheritance, polymorphism and design patterns'),
('33333333-3333-3333-3333-333333333333', 'Quantitative & Logical Aptitude', 'APT', 'Speed math, analytical reasoning, and quantitative problem solving'),
('44444444-4444-4444-4444-444444444444', 'Database Management Systems', 'DBMS', 'Relational design, normalization, transactions, and SQL mastery'),
('55555555-5555-5555-5555-555555555555', 'Operating Systems', 'OS', 'Process synchronization, memory management, file systems, and concurrency'),
('66666666-6666-6666-6666-666666666666', 'Computer Networks', 'CN', 'OSI model, TCP/IP, routing, switching, and transport protocols')
ON CONFLICT (code) DO NOTHING;

-- Seed Sample Topics
INSERT INTO topics (id, subject_id, name, description, supports_pattern) VALUES
('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Two Pointers & Sliding Window', 'Linear traversal patterns for subarray and target sum optimization', TRUE),
('a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Binary Search & Monotonic Arrays', 'Logarithmic search space reductions and predicate conditions', TRUE),
('b1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Polymorphism & Dynamic Dispatch', 'Method overriding, virtual tables, and interface contracts', FALSE),
('c1111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'SQL Joins & Grouping Aggregations', 'Multi-table correlation, HAVING filters, and analytic queries', FALSE)
ON CONFLICT DO NOTHING;
