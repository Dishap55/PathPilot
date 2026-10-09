const fs = require('fs');
const path = require('path');

const additionalProblems = {
  'dbms-architecture': {
    id: 'arch-ex-3',
    title: 'Buffer Pool Management, Dirty Pages & Eviction Policies',
    difficulty: 'Hard',
    attribution: 'Interview-style (Database Internals)',
    problem: 'A high-throughput OLTP database server maintains a buffer pool of 4 memory frames. When frame capacity is reached and a read miss occurs for page P5, trace how the LRU page replacement algorithm chooses a victim page and when the DB Writer background process issues an fsync for dirty pages.',
    givenSchema: `Conceptual Buffer Pool Table: frame_id INT, page_id INT, is_dirty BOOLEAN, pin_count INT, last_accessed_time TIMESTAMP`,
    givenData: [
      { frame_id: 1, page_id: 'P1', is_dirty: true, pin_count: 0, last_accessed: '10:00:01' },
      { frame_id: 2, page_id: 'P2', is_dirty: false, pin_count: 1, last_accessed: '10:00:04' },
      { frame_id: 3, page_id: 'P3', is_dirty: false, pin_count: 0, last_accessed: '10:00:03' },
      { frame_id: 4, page_id: 'P4', is_dirty: true, pin_count: 0, last_accessed: '10:00:02' }
    ],
    required: 'Identify the victim frame for page P5, detail the flushing protocol if dirty, and explain why pinned frames cannot be evicted.',
    concept: 'Buffer Pool Management, LRU Page Replacement, Dirty Bit & Checkpoint flushing.',
    query: `-- Query identifying LRU victim candidate (pin_count = 0 with oldest access timestamp)
SELECT frame_id, page_id, is_dirty
FROM buffer_pool_status
WHERE pin_count = 0
ORDER BY last_accessed_time ASC
LIMIT 1;

-- Protocol execution:
-- Frame 1 holds P1 (dirty: true, pin: 0, time: 10:00:01) -> Selected as victim!
-- 1. Flush P1 log records to WAL on disk (WAL invariant).
-- 2. Asynchronously flush dirty page P1 to table datafile on disk.
-- 3. Load requested page P5 from disk into Frame 1 and set pin_count = 1.`,
    output: [
      { victim_frame: 1, evicted_page: 'P1', action: 'Flush dirty page to disk via WAL protocol, then load P5' }
    ],
    explanation: 'When a page miss occurs in a saturated buffer pool, the DBMS scans for unpinned frames (pin_count = 0). Frame 1 has the oldest timestamp (10:00:01). Because its dirty bit is set, the DBMS must flush P1 modifications to persistent disk before overwriting the memory frame.',
    queryBreakdown: [
      { clause: 'WHERE pin_count = 0', purpose: 'Protects pages currently being accessed by running transactions from eviction.' },
      { clause: 'ORDER BY last_accessed_time ASC', purpose: 'Identifies Least Recently Used (LRU) candidate frame.' },
      { clause: 'WAL Invariant Check', purpose: 'Guarantees WAL is flushed before dirty data page reaches disk.' }
    ]
  },

  'er-model': {
    id: 'er-ex-3',
    title: 'Ternary Relationship vs Aggregation Transformation',
    difficulty: 'Hard',
    attribution: 'Interview-style (GATE / Enterprise Architecture)',
    problem: 'A medical clinical trial records a Doctor prescribing a specific Drug to a Patient for a specific Treatment Regimen. Differentiate between modeling this as a Ternary Relationship vs an Aggregation, and write the normalized relational table schema.',
    givenSchema: `Entities: Doctor(doc_id), Patient(pat_id), Drug(drug_id), Treatment(regimen_id)`,
    givenData: [
      { doctor: 'D10', patient: 'P402', drug: 'Remdesivir', regimen: 'COVID-Severe-5Day' }
    ],
    required: 'Provide SQL DDL defining the relational mapping of the ternary relationship with composite foreign keys and audit constraints.',
    concept: 'Higher-Degree ER Relationships and Relational Schema Reduction.',
    query: `CREATE TABLE clinical_prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL REFERENCES doctors(doc_id) ON DELETE RESTRICT,
    patient_id INT NOT NULL REFERENCES patients(pat_id) ON DELETE RESTRICT,
    drug_id INT NOT NULL REFERENCES drugs(drug_id) ON DELETE RESTRICT,
    prescribed_date DATE DEFAULT CURRENT_DATE,
    dosage_mg INT NOT NULL,
    CONSTRAINT uq_patient_drug_presc UNIQUE (patient_id, drug_id, prescribed_date)
);`,
    output: [
      { table_name: 'clinical_prescriptions', arity: 3, constraint: 'doctor_id, patient_id, drug_id foreign keys' }
    ],
    explanation: 'In relational schema reduction, an n-ary relationship becomes a dedicated table whose primary key is formed from the combination of participating candidate keys or a surrogate key backed by a composite uniqueness constraint.',
    queryBreakdown: [
      { clause: 'PRIMARY KEY', purpose: 'Surrogate primary key for rapid index lookups.' },
      { clause: 'FOREIGN KEYs', purpose: 'References all three participating parent entities.' },
      { clause: 'UNIQUE', purpose: 'Enforces business policy against redundant duplicate prescriptions.' }
    ]
  },

  'relational-model-keys': {
    id: 'keys-ex-3',
    title: 'Self-Referencing Foreign Keys & Hierarchical Integrity',
    difficulty: 'Medium',
    attribution: 'Placement-style (Amazon / Infosys)',
    problem: 'Design an organizational hierarchy table `employees` where each employee reports to a manager who is also an employee in the same table. The CEO has no manager (NULL). Enforce referential integrity on delete.',
    givenSchema: `employees(emp_id INT PK, name VARCHAR(50), manager_id INT FK)`,
    givenData: [
      { emp_id: 1, name: 'Alice (CEO)', manager_id: null },
      { emp_id: 2, name: 'Bob', manager_id: 1 },
      { emp_id: 3, name: 'Charlie', manager_id: 2 }
    ],
    required: 'Write DDL for self-referential constraint with ON DELETE SET NULL to preserve employee records when a manager resigns.',
    concept: 'Self-Referential (Recursive) Foreign Keys and Referential Actions (SET NULL).',
    query: `CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(50),
    manager_id INT,
    CONSTRAINT fk_emp_manager FOREIGN KEY (manager_id) 
        REFERENCES employees(emp_id) 
        ON DELETE SET NULL
);`,
    output: [
      { emp_id: 1, name: 'Alice', manager_id: null },
      { emp_id: 2, name: 'Bob', manager_id: 1 }
    ],
    explanation: 'Self-referential foreign keys allow an entity to establish relationships with members of the same relation. Setting ON DELETE SET NULL ensures child reporting nodes are not accidentally wiped out if a manager account is deactivated.',
    queryBreakdown: [
      { clause: 'REFERENCES employees(emp_id)', purpose: 'Points the foreign key constraint back to the primary key of the same table.' },
      { clause: 'ON DELETE SET NULL', purpose: 'Automatically sets manager_id to NULL when the referenced manager is deleted.' }
    ]
  },

  'sql-basics-ddl-dml': {
    id: 'sql-ex-3',
    title: 'Multi-Row Deduplication via Common Table Expressions (CTE)',
    difficulty: 'Hard',
    attribution: 'Placement-style (Amazon / LeetCode)',
    problem: 'A data pipeline accidentally inserted duplicate customer records with identical emails. Write a single standard SQL query using CTE and ROW_NUMBER() to identify and retain only the single lowest id for each email.',
    givenSchema: `customers (id INT PRIMARY KEY, name VARCHAR(50), email VARCHAR(100))`,
    givenData: [
      { id: 1, name: 'Alex', email: 'alex@work.com' },
      { id: 2, name: 'Alex M', email: 'alex@work.com' },
      { id: 3, name: 'Sara', email: 'sara@work.com' },
      { id: 4, name: 'Alex K', email: 'alex@work.com' }
    ],
    required: 'Return all duplicate rows that should be removed (i.e. row_num > 1).',
    concept: 'CTE with Window Ranking (ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)) for deduplication.',
    query: `WITH duplicate_cte AS (
    SELECT id, name, email,
           ROW_NUMBER() OVER (PARTITION BY email ORDER BY id ASC) as row_num
    FROM customers
)
SELECT id, name, email
FROM duplicate_cte
WHERE row_num > 1;`,
    output: [
      { id: 2, name: 'Alex M', email: 'alex@work.com' },
      { id: 4, name: 'Alex K', email: 'alex@work.com' }
    ],
    explanation: 'The CTE assigns a unique sequential rank to every row partitioned by email. The original record gets row_num = 1, and all redundant copies receive row_num > 1. Filtering for row_num > 1 isolates exactly the unwanted duplicates.',
    queryBreakdown: [
      { clause: 'WITH duplicate_cte AS (...)', purpose: 'Materializes temporary result with ranking metadata.' },
      { clause: 'PARTITION BY email', purpose: 'Resets the counter for each distinct email group.' },
      { clause: 'WHERE row_num > 1', purpose: 'Targets all redundant copies for deletion or auditing.' }
    ]
  },

  'sql-joins': {
    id: 'joins-ex-3',
    title: 'Full Outer Join Reconciliation Across Two Independent Ledgers',
    difficulty: 'Hard',
    attribution: 'Interview-style (Deloitte / Financial Systems)',
    problem: 'Two banking ledger systems record client transaction settlements. Reconcile both ledgers to identify: matched settlements, transactions in System A missing from B, and transactions in System B missing from A using FULL OUTER JOIN and COALESCE.',
    givenSchema: `ledger_a(tx_id INT, amount NUMERIC), ledger_b(tx_id INT, amount NUMERIC)`,
    givenData: [
      { ledger_a: 'Tx101: 500, Tx102: 750' },
      { ledger_b: 'Tx102: 750, Tx103: 1200' }
    ],
    required: 'Generate reconciled summary showing tx_id, amount_a, amount_b, and status (MATCHED, MISSING_IN_B, MISSING_IN_A).',
    concept: 'FULL OUTER JOIN with COALESCE and conditional CASE WHEN logic.',
    query: `SELECT 
    COALESCE(a.tx_id, b.tx_id) AS reconciled_tx_id,
    a.amount AS amount_system_a,
    b.amount AS amount_system_b,
    CASE 
        WHEN a.tx_id IS NOT NULL AND b.tx_id IS NOT NULL THEN 'MATCHED'
        WHEN a.tx_id IS NOT NULL AND b.tx_id IS NULL THEN 'MISSING_IN_B'
        ELSE 'MISSING_IN_A'
    END AS reconciliation_status
FROM ledger_a a
FULL OUTER JOIN ledger_b b ON a.tx_id = b.tx_id
ORDER BY reconciled_tx_id;`,
    output: [
      { reconciled_tx_id: 101, amount_system_a: 500, amount_system_b: null, reconciliation_status: 'MISSING_IN_B' },
      { reconciled_tx_id: 102, amount_system_a: 750, amount_system_b: 750, reconciliation_status: 'MATCHED' },
      { reconciled_tx_id: 103, amount_system_a: null, amount_system_b: 1200, reconciliation_status: 'MISSING_IN_A' }
    ],
    explanation: 'FULL OUTER JOIN preserves all rows from both tables regardless of whether a matching tx_id exists on the opposite side. COALESCE pulls whichever identifier is non-null, and CASE tags the audit reconciliation status.',
    queryBreakdown: [
      { clause: 'COALESCE(a.tx_id, b.tx_id)', purpose: 'Guarantees a non-null transaction ID in the output.' },
      { clause: 'FULL OUTER JOIN', purpose: 'Retains all unmatched rows from both left and right relations.' },
      { clause: 'CASE WHEN', purpose: 'Categorizes each row as matched, left-only, or right-only.' }
    ]
  },

  'sql-aggregation-groupby': {
    id: 'agg-ex-3',
    title: 'Department-Wise Multi-Metric Analytics with Filtered Aggregates',
    difficulty: 'Medium',
    attribution: 'Placement-style (Cognizant / Accenture)',
    problem: 'Given an orders table, calculate for each product category: total orders, total revenue, average order value, and count of high-value orders (> 1000). Show only categories with at least 3 orders and total revenue > 5000.',
    givenSchema: `orders (order_id INT, category VARCHAR(50), order_value NUMERIC)`,
    givenData: [
      { id: 1, category: 'Electronics', value: 1200 },
      { id: 2, category: 'Electronics', value: 800 },
      { id: 3, category: 'Electronics', value: 3500 },
      { id: 4, category: 'Apparel', value: 150 }
    ],
    required: 'Produce category summary with conditional counting and multiple HAVING thresholds.',
    concept: 'GROUP BY with SUM, AVG, COUNT(CASE WHEN ...), and compound HAVING conditions.',
    query: `SELECT 
    category,
    COUNT(*) AS total_orders,
    SUM(order_value) AS total_revenue,
    ROUND(AVG(order_value), 2) AS avg_order_value,
    SUM(CASE WHEN order_value > 1000 THEN 1 ELSE 0 END) AS high_value_orders_count
FROM orders
GROUP BY category
HAVING COUNT(*) >= 3 AND SUM(order_value) > 5000
ORDER BY total_revenue DESC;`,
    output: [
      { category: 'Electronics', total_orders: 3, total_revenue: 5500, avg_order_value: 1833.33, high_value_orders_count: 2 }
    ],
    explanation: 'GROUP BY collapses individual order rows into category groups. Conditional SUM with CASE counts rows that satisfy a specific sub-metric, and HAVING filters out categories that fail the macro thresholds.',
    queryBreakdown: [
      { clause: 'GROUP BY category', purpose: 'Aggregates metrics at the product category level.' },
      { clause: 'SUM(CASE WHEN ...)', purpose: 'Performs conditional aggregation without separate subqueries.' },
      { clause: 'HAVING COUNT(*) >= 3 AND ...', purpose: 'Filters aggregate groups after summation.' }
    ]
  },

  'sql-subqueries-nested': {
    id: 'subq-ex-3',
    title: 'Top 2 Highest Salaries per Department via Correlated Subquery',
    difficulty: 'Hard',
    attribution: 'Placement-style (Amazon / Microsoft SDE)',
    problem: 'In SQL engines or interview scenarios where window functions are disallowed, find the employees who earn one of the top 2 distinct salaries within their respective department using a correlated subquery.',
    givenSchema: `employees (emp_id INT PRIMARY KEY, name VARCHAR(50), department_id INT, salary INT)`,
    givenData: [
      { id: 1, name: 'A', dept: 1, sal: 100000 },
      { id: 2, name: 'B', dept: 1, sal: 90000 },
      { id: 3, name: 'C', dept: 1, sal: 80000 },
      { id: 4, name: 'D', dept: 2, sal: 95000 }
    ],
    required: 'Return emp_id, name, department_id, and salary for the top 2 distinct earners in each department.',
    concept: 'Correlated Subquery counting higher salaries in the same department (WHERE 2 > (SELECT COUNT(DISTINCT ...))).',
    query: `SELECT e1.emp_id, e1.name, e1.department_id, e1.salary
FROM employees e1
WHERE 2 > (
    SELECT COUNT(DISTINCT e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
      AND e2.salary > e1.salary
)
ORDER BY e1.department_id ASC, e1.salary DESC;`,
    output: [
      { emp_id: 1, name: 'A', department_id: 1, salary: 100000 },
      { emp_id: 2, name: 'B', department_id: 1, salary: 90000 },
      { emp_id: 4, name: 'D', department_id: 2, salary: 95000 }
    ],
    explanation: 'For every candidate row e1, the correlated subquery counts how many people in the same department earn strictly more than e1.salary. If that count is 0, e1 is #1; if count is 1, e1 is #2. Thus 2 > count precisely captures the top 2.',
    queryBreakdown: [
      { clause: 'WHERE 2 > (SELECT COUNT(...))', purpose: 'Correlated predicate filtering rows with fewer than 2 higher earners.' },
      { clause: 'e2.department_id = e1.department_id', purpose: 'Correlates the inner query to outer employee department.' },
      { clause: 'e2.salary > e1.salary', purpose: 'Counts strictly superior salaries in the same group.' }
    ]
  },

  'normalization': {
    id: 'norm-ex-3',
    title: 'Decomposing 3NF to BCNF for Overlapping Candidate Keys',
    difficulty: 'Hard',
    attribution: 'Placement-style (GATE / Infosys Technical)',
    problem: 'Given relation StudentAdvisor(student_id, subject, advisor) where: (student_id, subject) -> advisor, and advisor -> subject. Each student has at most one advisor per subject, but an advisor advises only one subject. Identify why this relation is in 3NF but violates BCNF, and decompose it losslessly.',
    givenSchema: `StudentAdvisor(student_id, subject, advisor); FDs: { (student_id, subject) -> advisor, advisor -> subject }`,
    givenData: [
      { student_id: 101, subject: 'Math', advisor: 'Prof. Gauss' },
      { student_id: 102, subject: 'Math', advisor: 'Prof. Gauss' },
      { student_id: 101, subject: 'Physics', advisor: 'Prof. Newton' }
    ],
    required: 'Show candidate keys, identify BCNF violation, and give decomposed relational schemas.',
    concept: 'Boyce-Codd Normal Form (BCNF) strict determinant rule vs 3NF prime attribute allowance.',
    query: `-- BCNF Decomposition:
-- Candidate Keys: (student_id, subject) and (student_id, advisor)
-- In FD: advisor -> subject:
-- 1. In 3NF: 'subject' is a prime attribute (part of candidate key), so 3NF is SATISFIED!
-- 2. In BCNF: 'advisor' is NOT a superkey, so BCNF is VIOLATED!

-- Decomposed Relations:
CREATE TABLE advisor_subject (
    advisor VARCHAR(50) PRIMARY KEY,
    subject VARCHAR(50) NOT NULL
);

CREATE TABLE student_advisor_assignment (
    student_id INT NOT NULL,
    advisor VARCHAR(50) NOT NULL REFERENCES advisor_subject(advisor),
    PRIMARY KEY (student_id, advisor)
);`,
    output: [
      { relation_1: 'advisor_subject (advisor PK, subject)', relation_2: 'student_advisor_assignment (student_id, advisor PK)', bcnf_status: 'Compliant' }
    ],
    explanation: 'BCNF requires every determinant (left hand side of a non-trivial FD) to be a superkey. Decomposing into advisor_subject and student_advisor_assignment satisfies BCNF and provides a lossless join, though the functional dependency (student_id, subject) -> advisor is now an inter-relational constraint.',
    queryBreakdown: [
      { clause: 'CREATE TABLE advisor_subject', purpose: 'Isolates the violating FD with advisor as its primary key.' },
      { clause: 'CREATE TABLE student_advisor_assignment', purpose: 'Maintains student assignment with foreign key referential link.' }
    ]
  },

  'transactions-acid': {
    id: 'trans-ex-3',
    title: 'Savepoints and Partial Rollbacks in Complex E-Commerce Checkout',
    difficulty: 'Medium',
    attribution: 'Placement-style (Amazon / Flipkart)',
    problem: 'An e-commerce order transaction performs three steps: 1) Reserve items, 2) Deduct user wallet balance, 3) Apply promotional coupon. If the coupon code is expired, step 3 should fail, but steps 1 and 2 must remain valid without rolling back the entire checkout. Demonstrate SAVEPOINT execution.',
    givenSchema: `orders(order_id PK), inventory(item_id PK, stock INT), wallets(user_id PK, balance NUMERIC)`,
    givenData: [
      { user_id: 10, balance: 200, item_id: 5, stock: 10 }
    ],
    required: 'Write SQL transaction using SAVEPOINT and ROLLBACK TO SAVEPOINT.',
    concept: 'Nested transaction control via SAVEPOINT and selective rollback.',
    query: `BEGIN TRANSACTION;

-- Step 1: Reserve inventory
UPDATE inventory SET stock = stock - 1 WHERE item_id = 5;

-- Step 2: Deduct wallet balance
UPDATE wallets SET balance = balance - 150 WHERE user_id = 10;

-- Create checkpoint before optional promotional logic
SAVEPOINT after_payment_sp;

-- Step 3: Attempt optional promotional credit (fails due to coupon expiry)
-- Simulation: Check fails, trigger partial rollback
ROLLBACK TO SAVEPOINT after_payment_sp;

-- Step 4: Record order with standard pricing and finalize
INSERT INTO orders (order_id, user_id, total_amount, status) 
VALUES (9901, 10, 150, 'PAID_STANDARD');

COMMIT;`,
    output: [
      { order_id: 9901, status: 'PAID_STANDARD', stock_deducted: 1, wallet_deducted: 150 }
    ],
    explanation: 'SAVEPOINT establishes an intermediate marker within a transaction. Calling ROLLBACK TO SAVEPOINT undoes all modifications performed after the savepoint without aborting the parent transaction or losing previous atomic updates.',
    queryBreakdown: [
      { clause: 'SAVEPOINT name', purpose: 'Marks an intermediate boundary inside the ongoing active transaction.' },
      { clause: 'ROLLBACK TO SAVEPOINT name', purpose: 'Undoes subsequent modifications while keeping prior updates intact in memory.' },
      { clause: 'COMMIT', purpose: 'Atomically commits all surviving operations to disk.' }
    ]
  },

  'concurrency-locking': {
    id: 'conc-ex-3',
    title: 'Deadlock Detection, Prevention & Wait-Die vs Wound-Wait Strategies',
    difficulty: 'Hard',
    attribution: 'Interview-style (Microsoft / Oracle)',
    problem: 'Two concurrent transactions T1 (timestamp 10, Older) and T2 (timestamp 20, Younger) request exclusive locks on resources A and B in opposing order: T1 holds A, requests B; T2 holds B, requests A. Compare how Wait-Die and Wound-Wait non-preemptive vs preemptive protocols resolve the deadlock.',
    givenSchema: `Transactions: T1 (TS=10, holds A), T2 (TS=20, holds B); Resources: A, B`,
    givenData: [
      { transaction: 'T1 (TS=10)', state: 'Holds lock on A, requests B' },
      { transaction: 'T2 (TS=20)', state: 'Holds lock on B, requests A' }
    ],
    required: 'Trace outcomes under Wait-Die (non-preemptive) and Wound-Wait (preemptive) schemes, identifying which transaction is aborted.',
    concept: 'Timestamp-based Deadlock Prevention: Wait-Die vs Wound-Wait.',
    query: `-- Wait-Die Rule: Old transaction waits; Young transaction dies (aborts & restarts)
-- 1. When T1 (Older, TS=10) requests resource B held by T2 (Younger, TS=20):
--    T1 is OLDER than T2 -> T1 WAITS!
-- 2. When T2 (Younger, TS=20) requests resource A held by T1 (Older, TS=10):
--    T2 is YOUNGER than T1 -> T2 DIES! (Aborted & restarted with original TS)

-- Wound-Wait Rule: Old wounds (preempts) young; Young waits
-- 1. When T1 (Older, TS=10) requests resource B held by T2 (Younger, TS=20):
--    T1 is OLDER -> T1 WOUNDS T2! (T2 is aborted, releases lock on B to T1)
-- 2. T1 proceeds immediately without deadlock.`,
    output: [
      { protocol: 'Wait-Die', aborted_tx: 'T2 (Younger)', survivor: 'T1' },
      { protocol: 'Wound-Wait', aborted_tx: 'T2 (Preempted)', survivor: 'T1' }
    ],
    explanation: 'Both protocols use transaction timestamps to prevent cyclic wait graphs. Because younger transactions can never cause older transactions to wait infinitely in Wound-Wait, or younger transactions die immediately in Wait-Die, deadlock cannot form.',
    queryBreakdown: [
      { clause: 'Wait-Die Strategy', purpose: 'Non-preemptive: older can wait, younger is aborted if requesting resource held by older.' },
      { clause: 'Wound-Wait Strategy', purpose: 'Preemptive: older interrupts younger and steals lock, younger waits if requesting older.' }
    ]
  },

  'indexing-btrees': {
    id: 'index-ex-3',
    title: 'Composite Index Column Ordering and Leftmost Prefix Rule',
    difficulty: 'Hard',
    attribution: 'Interview-style (Amazon / Database Tuning)',
    problem: 'An e-commerce table orders has 10 million rows. Queries frequently filter by status = \'SHIPPED\' and order_date BETWEEN \'2026-01-01\' AND \'2026-03-31\'. Explain why a composite B+ tree index on (status, order_date) outperforms (order_date, status) by examining B+ tree traversal.',
    givenSchema: `orders (order_id BIGINT PK, customer_id INT, status VARCHAR(20), order_date DATE, total_amount NUMERIC)`,
    givenData: [
      { status_values: 'SHIPPED (80%), PENDING (15%), CANCELLED (5%)' }
    ],
    required: 'Provide DDL creating optimal composite index and explain why range columns must follow equality columns.',
    concept: 'B+ Tree Leftmost Prefix Matching and Range-Predicate Index Halting.',
    query: `-- Optimal Index: Equality column first, Range column second
CREATE INDEX idx_orders_status_date ON orders (status, order_date);

-- Query executing Index Range Scan:
SELECT order_id, customer_id, total_amount
FROM orders
WHERE status = 'SHIPPED' 
  AND order_date >= '2026-01-01' 
  AND order_date <= '2026-03-31';`,
    output: [
      { index_name: 'idx_orders_status_date', scan_type: 'Index Range Scan', efficiency: 'Navigates directly to status=SHIPPED subtree and scans range' }
    ],
    explanation: 'In a multi-column B+ tree, keys are sorted first by column 1, then by column 2. When column 1 is evaluated with equality (=), the tree can continue using column 2 for binary search. However, once a range filter (BETWEEN, <, >) is applied to a leading column, subsequent index columns cannot be used for direct branch filtering.',
    queryBreakdown: [
      { clause: 'CREATE INDEX (status, order_date)', purpose: 'Orders the B+ tree leaf nodes by status first, then by date.' },
      { clause: 'Equality-first Rule', purpose: 'Maximizes index pruning before entering the range scan phase.' }
    ]
  },

  'views-stored-procedures': {
    id: 'prog-ex-3',
    title: 'Transactional Stored Procedure with Rollback & Error Handling',
    difficulty: 'Hard',
    attribution: 'Interview-style (TCS Digital / Infosys SP)',
    problem: 'Create a production-grade stored procedure process_fund_transfer(sender_id, recipient_id, transfer_amount) that validates sender balance, deducts from sender, adds to recipient, inserts an audit log entry, and rolls back atomically if balance is insufficient or recipient is invalid.',
    givenSchema: `accounts (account_id INT PK, balance NUMERIC), transfer_logs (log_id SERIAL PK, from_id INT, to_id INT, amount NUMERIC, log_time TIMESTAMP)`,
    givenData: [
      { account_id: 101, balance: 1000 },
      { account_id: 102, balance: 250 }
    ],
    required: 'Write PL/pgSQL or SQL procedure implementing atomic transfer with custom error signaling.',
    concept: 'Stored Procedure transaction management, EXCEPTION handling, and atomic row-level locking (FOR UPDATE).',
    query: `CREATE OR REPLACE PROCEDURE process_fund_transfer(
    p_sender INT,
    p_recipient INT,
    p_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_sender_balance NUMERIC;
BEGIN
    -- 1. Lock sender row to prevent race conditions
    SELECT balance INTO v_sender_balance
    FROM accounts
    WHERE account_id = p_sender
    FOR UPDATE;

    -- 2. Validate sufficient funds
    IF v_sender_balance < p_amount THEN
        RAISE EXCEPTION 'Insufficient funds: available %, requested %', v_sender_balance, p_amount;
    END IF;

    -- 3. Execute atomic debit & credit
    UPDATE accounts SET balance = balance - p_amount WHERE account_id = p_sender;
    UPDATE accounts SET balance = balance + p_amount WHERE account_id = p_recipient;

    -- 4. Audit ledger entry
    INSERT INTO transfer_logs (from_id, to_id, amount, log_time)
    VALUES (p_sender, p_recipient, p_amount, CURRENT_TIMESTAMP);

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
$$;`,
    output: [
      { procedure: 'process_fund_transfer', safety: 'SELECT FOR UPDATE row lock + automated rollback on failure' }
    ],
    explanation: 'Encapsulating transactional logic in a Stored Procedure eliminates client-server network roundtrips, enforces FOR UPDATE pessimistic locking against concurrent withdrawals, and guarantees that any unexpected exception rolls back all pending updates.',
    queryBreakdown: [
      { clause: 'FOR UPDATE', purpose: 'Acquires exclusive row-level lock on sender account, preventing double-spending.' },
      { clause: 'RAISE EXCEPTION', purpose: 'Aborts execution if business rule is violated.' },
      { clause: 'EXCEPTION WHEN OTHERS THEN ROLLBACK', purpose: 'Ensures the database is never left in a partial state.' }
    ]
  }
};

const filePath = path.resolve('client/src/data/dbms/dbmsProblemExamplesData.js');
const existingModule = require(filePath);
const allProblems = existingModule.DBMS_PROBLEM_EXAMPLES;

let totalAdded = 0;
for (const [topicKey, problemObj] of Object.entries(additionalProblems)) {
  if (allProblems[topicKey]) {
    const exists = allProblems[topicKey].some(p => p.id === problemObj.id);
    if (!exists) {
      allProblems[topicKey].push(problemObj);
      totalAdded++;
    }
  }
}

console.log(`Added ${totalAdded} benchmark problems.`);

// Reconstruct the file content cleanly
const newContent = `/**
 * MASTER DBMS PROBLEM SOLVING BENCHMARK EXAMPLES
 * 
 * 3 deeply authored solved examples per canonical topic (36 Total Benchmarks) containing:
 * - Problem title & description
 * - Difficulty & Company attribution (evidence-based: Interview-style / Placement-style)
 * - Given Tables & Schema
 * - What is required
 * - Core Concept
 * - SQL Query
 * - Output Table
 * - Step-by-Step Explanation
 * - Query Breakdown (SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY)
 */

export const DBMS_PROBLEM_EXAMPLES = ${JSON.stringify(allProblems, null, 2)};

export function getDBMSProblemExamples(rawTopicId) {
  if (!rawTopicId) return DBMS_PROBLEM_EXAMPLES['dbms-architecture'];
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  return DBMS_PROBLEM_EXAMPLES[clean] || DBMS_PROBLEM_EXAMPLES['dbms-architecture'];
}
`;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated dbmsProblemExamplesData.js!');
