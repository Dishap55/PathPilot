# MCQs Part 4: Topics 10-12
# 10. concurrency-locking (14 MCQs: 155 to 168)
# 11. indexing-btrees (14 MCQs: 169 to 182)
# 12. views-stored-procedures (14 MCQs: 183 to 196)

part4_mcqs = [
    # -------------------------------------------------------------
    # 10. concurrency-locking (14 MCQs: 155 to 168)
    # -------------------------------------------------------------
    {
        "id": "dbms-mcq-155",
        "topicId": "concurrency-locking",
        "difficulty": "Easy",
        "questionType": "Comparison",
        "question": "What is the compatibility rule between Shared (S) locks and Exclusive (X) locks?",
        "options": [
            "A) S and S are compatible; S and X are incompatible; X and X are incompatible.",
            "B) S and X are compatible; X and X are compatible.",
            "C) X locks can be acquired simultaneously by multiple transactions.",
            "D) S locks block all other S locks."
        ],
        "correctIndex": 0,
        "hint": "Multiple readers can read concurrently (S-S). Writers require exclusive isolation (X).",
        "progressiveHint": "Shared locks allow concurrent reads. Exclusive locks block both other readers and other writers.",
        "explanation": "Shared locks (S) are compatible with other Shared locks (allowing concurrent reads). Exclusive locks (X) are mutually exclusive with all other locks (both S and X) to prevent conflicting concurrent writes.",
        "optionExplanations": [
            "Option A is the universal lock compatibility matrix rule.",
            "Option B, C, and D violate basic concurrency control principles."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - Lock Compatibility Matrix",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-156",
        "topicId": "concurrency-locking",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "What is the core rule of the Two-Phase Locking (2PL) protocol?",
        "options": [
            "A) Every transaction must execute in exactly two seconds.",
            "B) A transaction cannot acquire any new lock once it has released its first lock (divided into a Growing Phase where locks are acquired, and a Shrinking Phase where locks are released).",
            "C) Transactions must lock the entire database before reading.",
            "D) Transactions acquire locks in phase 1 and roll back in phase 2."
        ],
        "correctIndex": 1,
        "hint": "Growing Phase: only acquire locks. Shrinking Phase: only release locks.",
        "progressiveHint": "The Lock Point occurs at the end of the Growing Phase. 2PL mathematically guarantees conflict serializability.",
        "explanation": "Under 2PL, a transaction has two distinct phases: 1) Growing Phase (locks may be acquired, none released), and 2) Shrinking Phase (locks may be released, none acquired). Once a lock is released, no new locks can ever be obtained.",
        "optionExplanations": [
            "Option A is nonsensical.",
            "Option B is the formal definition of 2PL.",
            "Option C describes database-level locking.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Two-Phase Locking Protocol 2PL",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-157",
        "topicId": "concurrency-locking",
        "difficulty": "Hard",
        "questionType": "Comparison",
        "question": "Does standard Two-Phase Locking (Basic 2PL) guarantee freedom from Deadlocks?",
        "options": [
            "A) Yes, 2PL eliminates all deadlocks completely.",
            "B) No, Basic 2PL guarantees Conflict Serializability, but it DOES NOT prevent deadlocks.",
            "C) Only if all transactions are read-only.",
            "D) Deadlocks only occur in operating systems, not DBMS."
        ],
        "correctIndex": 1,
        "hint": "Can T1 hold lock A and request lock B, while T2 holds lock B and requests lock A under 2PL?",
        "progressiveHint": "Both transactions can acquire their first locks during their growing phase, resulting in a mutual circular wait (deadlock).",
        "explanation": "A major theoretical trap: Basic 2PL guarantees Conflict Serializability, but DOES NOT prevent deadlocks. Two transactions can enter mutual wait states while growing, requiring deadlock detection or prevention mechanisms.",
        "optionExplanations": [
            "Option A is a widespread interview misconception.",
            "Option B is correct. Guarantees serializability, but deadlocks can still occur.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - 2PL Deadlock Vulnerability Trap",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-158",
        "topicId": "concurrency-locking",
        "difficulty": "Hard",
        "questionType": "Comparison",
        "question": "What is Strict Two-Phase Locking (Strict 2PL), and what major problem does it solve?",
        "options": [
            "A) It requires transactions to finish in 1 millisecond.",
            "B) It requires all EXCLUSIVE (X) locks to be held until the transaction terminates (COMMIT or ABORT), preventing cascading rollbacks.",
            "C) It releases all locks before reading.",
            "D) It converts all locks to shared locks."
        ],
        "correctIndex": 1,
        "hint": "If a transaction releases an X lock before committing, and then aborts, what happens to other transactions that read that value?",
        "progressiveHint": "Holding X locks until COMMIT ensures other transactions never read uncommitted writes, guaranteeing a Cascadeless (Strict) schedule.",
        "explanation": "Strict 2PL mandates that all exclusive locks are retained until the transaction fully commits or aborts. This prevents other transactions from observing intermediate uncommitted writes, completely eliminating Cascading Aborts.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is the formal definition of Strict 2PL.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Strict 2PL & Cascadeless Execution",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-159",
        "topicId": "concurrency-locking",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "In a Precedence Graph (Serialization Graph) of a concurrent schedule, what indicates that the schedule is Conflict Serializable?",
        "options": [
            "A) The graph must contain at least one cycle.",
            "B) The graph must be completely Acyclic (contains NO directed cycles).",
            "C) The graph must have an even number of vertices.",
            "D) All nodes must have degree zero."
        ],
        "correctIndex": 1,
        "hint": "If T1 -> T2 and T2 -> T1, can the schedule be serialized into an equivalent serial order?",
        "progressiveHint": "Topological sort is possible if and only if the graph has no cycles. Acyclic = Conflict Serializable.",
        "explanation": "According to the Serializability Theorem, a schedule S is Conflict Serializable if and only if its Precedence Graph has no directed cycles (is an Acyclic Directed Graph).",
        "optionExplanations": [
            "Option A means non-serializable.",
            "Option B is the fundamental theorem of Conflict Serializability.",
            "Option C and D are irrelevant graph properties."
        ],
        "companyMetadata": {
            "company": "GATE / TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "GATE / TCS Digital - Precedence Graph Cycle Test",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-160",
        "topicId": "concurrency-locking",
        "difficulty": "Placement",
        "questionType": "Transaction Schedule",
        "question": """Given schedule S:
T1: Read(X)
T2: Write(X)
T1: Write(X)

Is this schedule Conflict Serializable?""",
        "options": [
            "A) Yes, equivalent to T1 -> T2.",
            "B) No, it contains conflicting operations that create a directed cycle between T1 and T2.",
            "C) Yes, equivalent to T2 -> T1.",
            "D) Cannot be determined without Y."
        ],
        "correctIndex": 1,
        "hint": "Check conflicts: T1:R(X) before T2:W(X) implies T1 -> T2. T2:W(X) before T1:W(X) implies T2 -> T1.",
        "progressiveHint": "T1 -> T2 and T2 -> T1 forms a direct 2-node cycle! A cycle means NOT conflict serializable.",
        "explanation": "Conflicting pairs on item X: 1) T1:Read(X) precedes T2:Write(X), generating edge T1 -> T2. 2) T2:Write(X) precedes T1:Write(X), generating edge T2 -> T1. This creates a directed cycle (T1 <-> T2), so the schedule is NOT Conflict Serializable.",
        "optionExplanations": [
            "Option A and C are impossible due to cyclic dependencies.",
            "Option B is correct: contains a directed cycle.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Conflict Serializability Precedence Testing",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-161",
        "topicId": "concurrency-locking",
        "difficulty": "Hard",
        "questionType": "Comparison",
        "question": "What is the difference between the `Wait-Die` and `Wound-Wait` deadlock prevention schemes?",
        "options": [
            "A) Wait-Die is non-preemptive (older transaction waits, younger transaction dies/aborts); Wound-Wait is preemptive (older transaction wounds/aborts younger, younger waits for older).",
            "B) Wait-Die only works in NoSQL; Wound-Wait is for SQL.",
            "C) Wait-Die allows deadlocks to form; Wound-Wait does not.",
            "D) In Wait-Die, older transactions are always aborted."
        ],
        "correctIndex": 0,
        "hint": "Timestamp TS(T) determines priority: smaller timestamp = older transaction.",
        "progressiveHint": "Wait-Die: Old waits, Young dies. Wound-Wait: Old wounds (preempts), Young waits.",
        "explanation": "In Wait-Die (non-preemptive), if Ti is older than Tj, Ti waits; if Ti is younger, Ti dies (rolls back). In Wound-Wait (preemptive), if Ti is older than Tj, Ti preempts/wounds Tj (Tj aborts); if Ti is younger, Ti waits.",
        "optionExplanations": [
            "Option A is the formal textbook definition.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "Microsoft",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Microsoft - Timestamp-Based Deadlock Prevention Protocols",
            "role": "Software Engineer"
        }
    },
    {
        "id": "dbms-mcq-162",
        "topicId": "concurrency-locking",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "What is Lock Escalation in a relational database?",
        "options": [
            "A) Converting a read lock to an exclusive lock.",
            "B) Automatically converting thousands of fine-grained locks (e.g. row-level locks) into a single coarse-grained lock (e.g. table-level lock) to free up lock manager memory.",
            "C) Increasing transaction priority.",
            "D) Increasing timeout intervals."
        ],
        "correctIndex": 1,
        "hint": "Each row lock consumes memory in the lock manager. What happens when a query updates 1,000,000 rows?",
        "progressiveHint": "The DBMS replaces 1,000,000 individual row locks with 1 table lock, reducing lock overhead but decreasing concurrency.",
        "explanation": "When a single transaction acquires an excessive number of fine-grained row locks, the lock manager escalates them to a table-level lock to reclaim memory, sacrificing concurrency for memory stability.",
        "optionExplanations": [
            "Option A describes lock upgrading/promotion.",
            "Option B is correct. Fine-grained to coarse-grained transition.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Microsoft",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Microsoft SQL Server - Lock Escalation Thresholds",
            "role": "Database Administrator / Engineer"
        }
    },
    {
        "id": "dbms-mcq-163",
        "topicId": "concurrency-locking",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "What is a Deadlock in a database management system?",
        "options": [
            "A) A state where all CPUs are at 100% usage.",
            "B) A state where two or more transactions are in a mutual circular wait, each holding a lock that the other needs, such that none can proceed without external intervention.",
            "C) When hard drive cables are disconnected.",
            "D) When an index is corrupted."
        ],
        "correctIndex": 1,
        "hint": "T1 holds A and waits for B; T2 holds B and waits for A.",
        "progressiveHint": "Represented by a cycle in the Wait-For Graph (WFG). Resolved by victim selection and rollback.",
        "explanation": "A deadlock is a permanent blocking condition caused by circular dependencies between transactions waiting for locked resources. The DBMS resolves it by picking a 'victim' transaction to abort.",
        "optionExplanations": [
            "Option A is CPU starvation.",
            "Option B is the formal DBMS definition of Deadlock.",
            "Option C and D are physical hardware/disk issues."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - Deadlock Conditions and Resolution",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-164",
        "topicId": "concurrency-locking",
        "difficulty": "Interview Trap",
        "questionType": "Interview Trap",
        "question": "What is Intent Locking (such as Intent Shared 'IS' and Intent Exclusive 'IX') used for in Multiple Granularity Locking?",
        "options": [
            "A) To declare that the user intends to pay for the database license.",
            "B) To allow higher-level nodes in the hierarchy (e.g. Table) to indicate that lower-level descendants (e.g. Rows) are locked, avoiding full-table scans to check for row locks.",
            "C) To predict future SQL queries using machine learning.",
            "D) To lock database connections."
        ],
        "correctIndex": 1,
        "hint": "Before acquiring a lock on a row, what must you place on the parent table and database?",
        "progressiveHint": "Without intent locks, a transaction wishing to lock an entire table would have to inspect every single row to see if a row lock exists.",
        "explanation": "Intent locks tag ancestor nodes (database, table, page) to signal that fine-grained locks exist lower in the tree. This allows a subsequent transaction requesting a table-level lock to detect conflicts in O(1) time without scanning individual rows.",
        "optionExplanations": [
            "Option A is humorous.",
            "Option B is correct. Core Multiple Granularity Locking (MGL) concept.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Multiple Granularity Locking & Intent Locks (IS/IX/SIX)",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-165",
        "topicId": "concurrency-locking",
        "difficulty": "Hard",
        "questionType": "Conceptual",
        "question": "What is Rigorous Two-Phase Locking (Rigorous 2PL)?",
        "options": [
            "A) It only allows one transaction at a time.",
            "B) It requires BOTH Shared (S) locks and Exclusive (X) locks to be held until the transaction terminates (COMMIT or ROLLBACK).",
            "C) It releases all locks before reading.",
            "D) It requires manual code inspection by a DBA."
        ],
        "correctIndex": 1,
        "hint": "Strict 2PL holds X locks until end. What does Rigorous 2PL hold until end?",
        "progressiveHint": "Rigorous 2PL holds ALL locks (both S and X) until the transaction commits, producing an execution order that matches the exact commit order.",
        "explanation": "Rigorous 2PL is the strictest variation of 2PL: all locks (both read/shared and write/exclusive) are held until transaction completion, ensuring serializability and eliminating cascading rollbacks.",
        "optionExplanations": [
            "Option A is serial execution.",
            "Option B is the formal definition of Rigorous 2PL.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Rigorous 2PL vs Strict 2PL",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-166",
        "topicId": "concurrency-locking",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "How does the DBMS Deadlock Detector break an active deadlock cycle in the Wait-For Graph?",
        "options": [
            "A) It shuts down the entire database server.",
            "B) It selects a 'Victim' transaction (based on cost, age, or fewest updates), aborts it, rolls back its modifications, and grants the released locks to waiting transactions.",
            "C) It pauses the CPU clock.",
            "D) It deletes the rows being locked."
        ],
        "correctIndex": 1,
        "hint": "Victim Selection and Transaction Abort.",
        "progressiveHint": "The victim is aborted and returned to the application with a retryable deadlock error code (e.g. SQLSTATE 40P01).",
        "explanation": "A background deadlock detector checks for cycles in the wait-for graph. When a cycle is detected, it selects a victim transaction based on rollback cost, rolls it back, and allows other transactions to continue.",
        "optionExplanations": [
            "Option A causes unacceptable downtime.",
            "Option B is correct. Automated victim selection and rollback.",
            "Option C and D are absurd."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC Next - Deadlock Victim Selection Heuristics",
            "role": "Digital Engineer"
        }
    },
    {
        "id": "dbms-mcq-167",
        "topicId": "concurrency-locking",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the difference between Optimistic Concurrency Control (OCC) and Pessimistic Concurrency Control?",
        "options": [
            "A) Pessimistic locking acquires locks upfront assuming conflicts are frequent; OCC assumes conflicts are rare, executes without locks, and validates for conflicts at commit time using version numbers.",
            "B) OCC is for banking; Pessimistic is for gaming.",
            "C) Pessimistic locking never causes deadlocks.",
            "D) OCC does not allow multiple users."
        ],
        "correctIndex": 0,
        "hint": "Pessimistic: Lock first, ask questions later. Optimistic: Do the work, validate version before saving.",
        "progressiveHint": "OCC divides into Read Phase, Validation Phase, and Write Phase.",
        "explanation": "Pessimistic locking prevents conflicts proactively via locks (`SELECT FOR UPDATE`). Optimistic locking executes without blocking, checking a version column during commit (`UPDATE ... WHERE version = expected_version`) and failing if modified concurrently.",
        "optionExplanations": [
            "Option A is the canonical systems design comparison.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Optimistic vs Pessimistic Concurrency Control",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-168",
        "topicId": "concurrency-locking",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "Which of the following is NOT one of Coffman's four necessary conditions for a Deadlock to occur?",
        "options": [
            "A) Mutual Exclusion",
            "B) Hold and Wait",
            "C) Circular Wait",
            "D) Preemptive Deallocation"
        ],
        "correctIndex": 3,
        "hint": "The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
        "progressiveHint": "Preemption PREVENTS deadlocks; NO Preemption is the condition required for deadlocks to occur.",
        "explanation": "The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If preemptive deallocation is permitted, deadlocks cannot persist.",
        "optionExplanations": [
            "Mutual Exclusion is a required condition.",
            "Hold and Wait is a required condition.",
            "Circular Wait is a required condition.",
            "Preemptive Deallocation: Correct (it breaks deadlocks, not causes them)."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - Coffman Deadlock Conditions",
            "role": "Ninja Developer"
        }
    },

    # -------------------------------------------------------------
    # 11. indexing-btrees (14 MCQs: 169 to 182)
    # -------------------------------------------------------------
    {
        "id": "dbms-mcq-169",
        "topicId": "indexing-btrees",
        "difficulty": "Easy",
        "questionType": "Comparison",
        "question": "What is the primary difference between a Clustered Index and a Non-Clustered (Secondary) Index?",
        "options": [
            "A) A Clustered Index determines the physical on-disk sorted order of actual table rows, so a table can have only ONE clustered index; Non-Clustered indexes store sorted key pointers pointing back to the data rows, allowing multiple non-clustered indexes per table.",
            "B) A table can have 10 clustered indexes.",
            "C) Non-clustered indexes are stored in RAM; Clustered indexes are stored on disk.",
            "D) Clustered indexes are slower than non-clustered indexes for point lookups."
        ],
        "correctIndex": 0,
        "hint": "Can physical books on a shelf be physically arranged in more than one order at a time?",
        "progressiveHint": "Data pages can only be physically sorted one way on disk, so only 1 clustered index is possible per table.",
        "explanation": "Because a Clustered Index dictates the physical ordering of records on disk (typically aligned with the Primary Key), only one can exist per table. Secondary indexes contain sorted index keys with row locators pointing to the base table.",
        "optionExplanations": [
            "Option A is the fundamental database storage engine definition.",
            "Option B is physically impossible.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Clustered vs Non-Clustered Indexes",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-170",
        "topicId": "indexing-btrees",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "Why are B+ Trees overwhelmingly preferred over standard B-Trees for relational database indexes?",
        "options": [
            "A) B+ Trees store all actual record data/pointers exclusively in the Leaf Nodes, and leaf nodes are linked via a doubly-linked list, enabling extremely fast sequential range scans (`BETWEEN`, `<`, `>`).",
            "B) B-Trees cannot store strings.",
            "C) B+ Trees are binary trees with only 2 children per node.",
            "D) B-Trees require 10x more disk space."
        ],
        "correctIndex": 0,
        "hint": "Internal nodes in a B+ Tree only store routing keys, allowing much higher fan-out and shallower tree depth.",
        "progressiveHint": "All leaf pages are linked sequentially in a chain, making range queries walk the leaves directly without backtracking through parent nodes.",
        "explanation": "In a B+ Tree: 1) Non-leaf nodes hold only keys, fitting more keys per page (higher fan-out, shallower tree depth), and 2) Leaf nodes contain all pointers and are linked in a continuous doubly-linked list, delivering optimal range scan performance.",
        "optionExplanations": [
            "Option A is the exact architectural reason B+ trees dominate database storage engines.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Why B+ Trees Over B-Trees in RDBMS",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-171",
        "topicId": "indexing-btrees",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "What is the typical time complexity of searching, inserting, or deleting a key in a balanced B+ Tree index with N records?",
        "options": [
            "A) O(1)",
            "B) O(log_B N) where B is the branching factor (fan-out) of the B+ tree",
            "C) O(N)",
            "D) O(N^2)"
        ],
        "correctIndex": 1,
        "hint": "The height of a B+ tree with high fan-out (B=500) over 10 million rows is typically only 3 or 4 disk I/O reads.",
        "progressiveHint": "Tree height is logarithmic with base B (where B is the number of keys per disk page).",
        "explanation": "Because a B+ tree is balanced and has a large branching factor B (often hundreds of keys per 8KB page), search time is O(log_B N), typically requiring only 3 or 4 page reads even for tens of millions of records.",
        "optionExplanations": [
            "Option A describes hash table point lookups.",
            "Option B is correct: logarithmic with base B (fan-out).",
            "Option C is a full table scan.",
            "Option D is nested loop complexity."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - B+ Tree Search Time Complexity",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-172",
        "topicId": "indexing-btrees",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": """A composite index exists on columns `(status, created_at)`.
Which of the following queries CANNOT use this index for filtering (violates the Leftmost Prefix Rule)?""",
        "options": [
            "A) WHERE status = 'ACTIVE' AND created_at > '2026-01-01'",
            "B) WHERE status = 'ACTIVE'",
            "C) WHERE created_at > '2026-01-01'",
            "D) WHERE status = 'ACTIVE' AND created_at = '2026-01-01'"
        ],
        "correctIndex": 2,
        "hint": "Can you use a telephone directory (sorted by Last Name, then First Name) to find people whose First Name is 'John' without knowing their Last Name?",
        "progressiveHint": "The leading (leftmost) column of the composite index MUST be present in the query predicate for the B+ tree to filter branches.",
        "explanation": "According to the Leftmost Prefix Rule, a composite index on `(A, B)` can satisfy queries on `(A)` or `(A, B)`, but CANNOT filter directly on `(B)` alone because the index is ordered first by A.",
        "optionExplanations": [
            "Option A uses both columns (valid).",
            "Option B uses the leading column A (valid).",
            "Option C: Correct answer. Skips the leading column `status`, triggering a full table scan or full index scan.",
            "Option D uses both columns (valid)."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Composite Index Leftmost Prefix Rule Violation",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-173",
        "topicId": "indexing-btrees",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the negative side effect of adding too many indexes to a relational database table?",
        "options": [
            "A) SELECT queries stop functioning.",
            "B) Write performance (INSERT, UPDATE, DELETE) degrades because every modification must update all associated B+ Tree indexes, and disk storage overhead increases.",
            "C) Foreign keys are disabled.",
            "D) Data becomes unnormalized."
        ],
        "correctIndex": 1,
        "hint": "What must the DBMS do to 10 B+ Trees when you insert 1 new row into the table?",
        "progressiveHint": "Indexes speed up reads (SELECT) at the direct expense of slower writes (INSERT/UPDATE/DELETE).",
        "explanation": "Every index requires dedicated storage and must be synchronously updated and rebalanced on every INSERT, DELETE, and relevant UPDATE. Over-indexing causes heavy write amplification and leaf page splitting.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is the core database tuning trade-off.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC - Index Write Penalty & Maintenance Costs",
            "role": "Programmer Analyst"
        }
    },
    {
        "id": "dbms-mcq-174",
        "topicId": "indexing-btrees",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "A table `users` contains column `gender` with only two distinct values ('M' and 'F') across 10,000,000 rows. Why is creating a standard B+ Tree index on `gender` usually ineffective and ignored by the query optimizer?",
        "options": [
            "A) B+ Trees cannot index single characters.",
            "B) Low Cardinality (Low Selectivity): Filtering on gender matches approximately 50% of the table, making a Sequential Table Scan faster than millions of random I/O secondary index lookups.",
            "C) Gender columns cannot have indexes in SQL.",
            "D) B+ Trees only work on unique columns."
        ],
        "correctIndex": 1,
        "hint": "When a query retrieves 50% of a table, is hopping back and forth via secondary index pointers faster than streaming the whole table from disk?",
        "progressiveHint": "Sequential disk I/O is faster than random page lookups if more than ~15-20% of the table is retrieved.",
        "explanation": "A column with low selectivity (low cardinality like boolean or gender) matches huge proportions of the table. The query optimizer calculates that scanning pages sequentially is cheaper than performing millions of random index lookups.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is correct. Low selectivity triggers optimizer table scan fallback.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Index Selectivity & Low Cardinality Optimization",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-175",
        "topicId": "indexing-btrees",
        "difficulty": "Hard",
        "questionType": "Conceptual",
        "question": "What is a Covering Index (Index-Only Scan)?",
        "options": [
            "A) An index with an encrypted cover.",
            "B) An index that contains all columns requested by a query (both in SELECT and WHERE), allowing the engine to satisfy the query entirely from the B+ Tree without reading the base table pages at all.",
            "C) An index that covers every table in the schema.",
            "D) An index created by the operating system."
        ],
        "correctIndex": 1,
        "hint": "If the index contains `(id, email, name)`, can `SELECT name FROM users WHERE email = ...` skip reading table pages?",
        "progressiveHint": "Eliminates the expensive 'table lookup / bookmark lookup' phase entirely.",
        "explanation": "A Covering Index contains all columns referenced in the query. Because all needed data resides directly in the B+ Tree leaf node, the query executes as an Index-Only Scan with zero table page I/O.",
        "optionExplanations": [
            "Option A is humorous.",
            "Option B is the formal definition of a Covering Index.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Covering Indexes and Index-Only Scans",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-176",
        "topicId": "indexing-btrees",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "Which SQL command creates an index named `idx_emp_salary` on column `salary` of table `employees`?",
        "options": [
            "A) MAKE INDEX idx_emp_salary ON employees (salary);",
            "B) CREATE INDEX idx_emp_salary ON employees (salary);",
            "C) ADD INDEX idx_emp_salary TO employees (salary);",
            "D) BUILD INDEX idx_emp_salary FOR employees (salary);"
        ],
        "correctIndex": 1,
        "hint": "DDL keyword to create objects is `CREATE`.",
        "progressiveHint": "`CREATE INDEX index_name ON table_name (column_name);`.",
        "explanation": "`CREATE INDEX idx_emp_salary ON employees (salary);` is the standard ANSI SQL DDL syntax to construct an index.",
        "optionExplanations": [
            "Option A is invalid syntax.",
            "Option B is correct standard SQL.",
            "Option C is ALTER TABLE syntax in MySQL, not standard CREATE.",
            "Option D is invalid."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - CREATE INDEX Syntax",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-177",
        "topicId": "indexing-btrees",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "How does a Hash Index differ from a B+ Tree Index in SQL databases?",
        "options": [
            "A) Hash indexes support O(1) point lookups on equality (`=`), but CANNOT support range queries (`<`, `>`, `BETWEEN`); B+ Tree indexes support both equality and range queries in O(log N) time.",
            "B) Hash indexes are always sorted; B+ Trees are unsorted.",
            "C) B+ Trees only work on numbers; Hash indexes only work on strings.",
            "D) Hash indexes require 100x more RAM."
        ],
        "correctIndex": 0,
        "hint": "Can a hash function like `hash(x) % N` maintain the relative sorted order of numbers?",
        "progressiveHint": "Hashing randomizes bucket placement, destroying sorted order. Hash indexes cannot evaluate `BETWEEN` or `ORDER BY`.",
        "explanation": "Hash indexes map keys to buckets using hash functions, achieving O(1) equality searches but completely failing for range queries or sorting. B+ Trees maintain sorted order, supporting both equality and range scans.",
        "optionExplanations": [
            "Option A is the formal comparison.",
            "Option B inverts sorted order.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Hash Indexes vs B+ Trees",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-178",
        "topicId": "indexing-btrees",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": """An index exists on column `hire_date`. Why does the following query fail to use the index efficiently (causing a full table scan)?
SELECT * FROM employees WHERE YEAR(hire_date) = 2024;""",
        "options": [
            "A) YEAR() function is invalid in SQL.",
            "B) Wrapping an indexed column inside a function prevents the B+ tree from performing a direct index range scan (Sargability violation).",
            "C) Indexes cannot store dates.",
            "D) 2024 must be written in quotes."
        ],
        "correctIndex": 1,
        "hint": "What is a 'SARGable' query (Search Argument Able)?",
        "progressiveHint": "Applying a function to an indexed column forces the engine to evaluate the function for every row. Rewrite as `hire_date >= '2024-01-01' AND hire_date <= '2024-12-31'`.",
        "explanation": "Applying functions (like `YEAR()`, `LOWER()`, or `SUBSTR()`) to indexed columns destroys SARGability. The B+ tree contains raw dates, not computed years, forcing the engine to scan the entire table unless a functional index was created.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is correct. Classic Sargability interview trap.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Query Sargability & Functional Index Traps",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-179",
        "topicId": "indexing-btrees",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "What is a Bitmap Index, and in which type of database environment is it most commonly utilized?",
        "options": [
            "A) An index used exclusively for storing JPEG images.",
            "B) An index representing column values as bit arrays (0s and 1s) for low-cardinality attributes, heavily utilized in read-heavy Data Warehouses (OLAP) to perform fast boolean bitwise operations (AND/OR).",
            "C) An index that replaces Primary Keys in OLTP systems.",
            "D) An index used for sound files."
        ],
        "correctIndex": 1,
        "hint": "Think of attributes like `gender`, `marital_status`, or `region` in a data warehouse with 100M rows.",
        "progressiveHint": "Boolean AND/OR/NOT operations on bit vectors can be computed directly in CPU vector registers at extreme speed.",
        "explanation": "Bitmap indexes represent low-cardinality column states with bit vectors. They allow complex multi-attribute ad-hoc analytical queries to be solved via rapid bitwise logical operations, ideal for OLAP data warehouses.",
        "optionExplanations": [
            "Option A is humorous.",
            "Option B is the formal definition of Bitmap Indexing.",
            "Option C is false; bitmap indexes have terrible write locking in OLTP.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Oracle / Deloitte",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Oracle Database Architecture - Bitmap Indexing in Data Warehouses",
            "role": "Technology Analyst"
        }
    },
    {
        "id": "dbms-mcq-180",
        "topicId": "indexing-btrees",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "Does creating a `PRIMARY KEY` on a table in MySQL (InnoDB) or SQL Server automatically generate an index?",
        "options": [
            "A) No, you must always run `CREATE INDEX` manually.",
            "B) Yes, the database engine automatically constructs a Clustered Index on the Primary Key column(s).",
            "C) Only if the table has more than 100 rows.",
            "D) Only in cloud environments."
        ],
        "correctIndex": 1,
        "hint": "How does the DBMS enforce primary key uniqueness rapidly on every INSERT?",
        "progressiveHint": "An index is automatically generated to enforce the uniqueness constraint in O(log N) time.",
        "explanation": "Relational database engines automatically build an index (specifically a Clustered Index in engines like InnoDB) on the Primary Key to enforce uniqueness and provide fast point access.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is correct. Automated clustered index creation.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Wipro Elite NTH - Automatic Primary Key Index Generation",
            "role": "Project Engineer"
        }
    },
    {
        "id": "dbms-mcq-181",
        "topicId": "indexing-btrees",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is a Dense Index versus a Sparse Index in database physical file organization?",
        "options": [
            "A) Dense indexes have an index entry for EVERY single search key value in the table; Sparse indexes have index entries only for some search key values (e.g. one per data block/page).",
            "B) Dense index is in RAM; Sparse index is on disk.",
            "C) Sparse indexes are only used for text columns.",
            "D) Dense indexes cannot be sorted."
        ],
        "correctIndex": 0,
        "hint": "Can a secondary non-clustered index ever be sparse?",
        "progressiveHint": "A sparse index requires the data file to be physically sorted (clustered), allowing block-level pointers.",
        "explanation": "A Dense Index contains an index record for every search key value in the file. A Sparse Index contains index records only for subset blocks, requiring the underlying data to be physically sorted.",
        "optionExplanations": [
            "Option A is the formal storage systems definition.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - Dense vs Sparse File Indexing",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-182",
        "topicId": "indexing-btrees",
        "difficulty": "Interview Trap",
        "questionType": "Interview Trap",
        "question": "If you create an index on `(A, B, C)`, does this index also optimize queries filtering ONLY on `WHERE C = 10`?",
        "options": [
            "A) Yes, an index on (A, B, C) works equally well for any combination of columns.",
            "B) No, the B+ tree is sorted primarily by A, then B, then C; filtering on C alone cannot use the index for branch traversal (violates Leftmost Prefix Rule).",
            "C) Only if C is an integer.",
            "D) Only if A and B are NULL."
        ],
        "correctIndex": 1,
        "hint": "Remember the Leftmost Prefix Rule: leading column A must be present.",
        "progressiveHint": "Searching by C alone requires an index skip scan or full table scan.",
        "explanation": "A composite index on (A, B, C) cannot be used for direct range search on C alone because the index nodes are sorted by A first. Skipping leading columns invalidates binary branch navigation.",
        "optionExplanations": [
            "Option A is a dangerous developer misconception.",
            "Option B is correct. Must contain leading prefixes to navigate B+ tree branches.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Composite Index Suffix Filtering Trap",
            "role": "SDE-1"
        }
    },

    # -------------------------------------------------------------
    # 12. views-stored-procedures (14 MCQs: 183 to 196)
    # -------------------------------------------------------------
    {
        "id": "dbms-mcq-183",
        "topicId": "views-stored-procedures",
        "difficulty": "Easy",
        "questionType": "Comparison",
        "question": "What is the key performance difference between a Standard Virtual View and a Materialized View?",
        "options": [
            "A) Standard Views cache data on disk; Materialized Views do not.",
            "B) Standard Views are saved SQL query definitions recomputed dynamically on every access; Materialized Views physically store the computed result set on disk and require periodic refreshes.",
            "C) Materialized Views cannot be queried using SELECT.",
            "D) Standard Views can only be created by root administrators."
        ],
        "correctIndex": 1,
        "hint": "Materialized means 'given physical form on disk'.",
        "progressiveHint": "Standard view = virtual macro query; Materialized view = cached table snapshot on disk.",
        "explanation": "A Standard View holds no physical records; its underlying query is executed dynamically whenever accessed. A Materialized View physically caches the query output on disk, providing fast read performance for heavy analytical aggregations.",
        "optionExplanations": [
            "Option A is backwards.",
            "Option B is correct.",
            "Option C is false; queried with normal SELECT.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Standard Views vs Materialized Views",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-184",
        "topicId": "views-stored-procedures",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the difference between a Stored Procedure and a Stored Function in SQL databases?",
        "options": [
            "A) Functions must return a value and cannot execute transaction control commands (COMMIT/ROLLBACK); Stored Procedures do not require return values, can return multiple OUT parameters, and can manage transactions.",
            "B) Stored Procedures cannot take input parameters.",
            "C) Stored Functions can only be written in Python.",
            "D) They are completely synonymous."
        ],
        "correctIndex": 0,
        "hint": "Can you call `COMMIT;` inside a user-defined function invoked in a SELECT query?",
        "progressiveHint": "UDFs invoked in SELECT expressions must be deterministic and side-effect free; procedures execute autonomous operational workflows.",
        "explanation": "A Function must return a value, cannot issue TCL statements (`COMMIT`/`ROLLBACK`), and can be called directly within SQL expressions (e.g. `SELECT fn(x)`). A Procedure is invoked via `CALL`, can return zero or multiple values, and can manage full transactions.",
        "optionExplanations": [
            "Option A is the canonical distinction.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - Stored Procedures vs Functions",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-185",
        "topicId": "views-stored-procedures",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "In a row-level database Trigger, which pseudorecords are accessible during an `UPDATE` operation?",
        "options": [
            "A) Only :OLD",
            "B) Only :NEW",
            "C) Both :OLD (values before modification) and :NEW (prospective updated values)",
            "D) Neither; triggers cannot inspect column values."
        ],
        "correctIndex": 2,
        "hint": "Can an audit trigger compare `OLD.salary` against `NEW.salary`?",
        "progressiveHint": "INSERT has only :NEW; DELETE has only :OLD; UPDATE has BOTH :OLD and :NEW.",
        "explanation": "During an UPDATE event, both transition pseudorecords are accessible: `:OLD` references column values prior to update, and `:NEW` contains prospective values being written, allowing validation and audit logging.",
        "optionExplanations": [
            "Option A applies only to DELETE.",
            "Option B applies only to INSERT.",
            "Option C is correct for UPDATE.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC - Trigger Pseudorecords (:OLD and :NEW)",
            "role": "Programmer Analyst"
        }
    },
    {
        "id": "dbms-mcq-186",
        "topicId": "views-stored-procedures",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "What is the purpose of the `WITH CHECK OPTION` clause when creating an updatable View?",
        "options": [
            "A) It verifies database spellings.",
            "B) It ensures that any INSERT or UPDATE issued through the view must satisfy the view's WHERE filter condition, preventing users from inserting rows that would disappear from the view.",
            "C) It encrypts view queries.",
            "D) It converts the view into a materialized view."
        ],
        "correctIndex": 1,
        "hint": "If a view filters `WHERE dept_id = 10`, what prevents an INSERT with `dept_id = 20` through this view?",
        "progressiveHint": "`WITH CHECK OPTION` rejects any row mutation that violates the defining predicate.",
        "explanation": "`WITH CHECK OPTION` guarantees that any DML operation executed through the view is rejected if the prospective row does not conform to the view's defining WHERE clause.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is the formal definition of WITH CHECK OPTION.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Round - Updatable Views WITH CHECK OPTION",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-187",
        "topicId": "views-stored-procedures",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "What is a Database Trigger?",
        "options": [
            "A) A user clicking a button on a web page.",
            "B) A procedural block of code that automatically executes (fires) in response to a specific event (such as `INSERT`, `UPDATE`, or `DELETE`) on a specified table.",
            "C) A tool for formatting SQL code.",
            "D) A hardware sensor in the server rack."
        ],
        "correctIndex": 1,
        "hint": "Event-driven database programming.",
        "progressiveHint": "Syntax: `CREATE TRIGGER trg_audit AFTER INSERT ON table FOR EACH ROW ...`.",
        "explanation": "A Trigger is a stored procedural program bound to a relation that is automatically invoked by the DBMS engine whenever designated DML or DDL mutation events occur.",
        "optionExplanations": [
            "Option A is a UI event.",
            "Option B is the formal DBMS definition.",
            "Option C describes a linter.",
            "Option D is hardware."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - Database Triggers Definition",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-188",
        "topicId": "views-stored-procedures",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the difference between a `BEFORE` trigger and an `AFTER` trigger?",
        "options": [
            "A) BEFORE triggers execute prior to modifying data (ideal for data validation or altering `:NEW` values); AFTER triggers execute after data modification succeeds (ideal for audit logging and cascading updates).",
            "B) BEFORE triggers only work on Tuesdays.",
            "C) AFTER triggers cannot access column values.",
            "D) BEFORE triggers run only once a year."
        ],
        "correctIndex": 0,
        "hint": "If you want to validate a salary and reject negative numbers, do you check BEFORE or AFTER writing to the table?",
        "progressiveHint": "BEFORE triggers can modify `:NEW` values or abort the insert before disk mutation occurs.",
        "explanation": "BEFORE triggers fire before constraints are checked and data is written, allowing validation or normalization of inputs. AFTER triggers fire after modification has safely occurred, ideal for audit log entries.",
        "optionExplanations": [
            "Option A is the formal comparison.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC - BEFORE vs AFTER Trigger Use Cases",
            "role": "Programmer Analyst"
        }
    },
    {
        "id": "dbms-mcq-189",
        "topicId": "views-stored-procedures",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "Can ANY arbitrary SQL view be updated via `INSERT` or `UPDATE` statements?",
        "options": [
            "A) Yes, all views in standard SQL are updatable.",
            "B) No; views containing `GROUP BY`, aggregate functions (`SUM`, `AVG`), `DISTINCT`, `UNION`, or complex outer joins are generally NOT directly updatable.",
            "C) Only views with fewer than 5 columns are updatable.",
            "D) Updatable views require NoSQL."
        ],
        "correctIndex": 1,
        "hint": "If a view shows `SELECT dept, AVG(salary) FROM employees GROUP BY dept`, which employee's salary should be updated if you update the view's average?",
        "progressiveHint": "Ambiguous mappings between view rows and underlying base table rows prevent updates.",
        "explanation": "To be updatable, a view must have an unambiguous 1-to-1 relationship with rows in the base table. Aggregations, GROUP BY, DISTINCT, and unions break this 1-to-1 mapping, making direct DML updates impossible.",
        "optionExplanations": [
            "Option A is a dangerous developer misconception.",
            "Option B is the formal ANSI SQL rule governing Updatable Views.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Updatable Views Criteria & Limitations",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-190",
        "topicId": "views-stored-procedures",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the difference between a Row-Level Trigger (`FOR EACH ROW`) and a Statement-Level Trigger in SQL?",
        "options": [
            "A) Row-level triggers execute once for EACH individual row affected by the SQL statement; Statement-level triggers execute ONCE per SQL statement regardless of how many rows were modified.",
            "B) Statement-level triggers only work on SELECT queries.",
            "C) Row-level triggers execute in the browser.",
            "D) They are identical in execution frequency."
        ],
        "correctIndex": 0,
        "hint": "If an UPDATE modifies 100 rows, how many times does a row-level trigger execute vs a statement-level trigger?",
        "progressiveHint": "Row-level: 100 times. Statement-level: 1 time.",
        "explanation": "A Row-Level Trigger (`FOR EACH ROW`) fires once for every row affected by the mutation. A Statement-Level Trigger fires exactly once for the overall SQL statement, even if 10,000 rows were modified.",
        "optionExplanations": [
            "Option A is the precise distinction.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Row-Level vs Statement-Level Triggers",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-191",
        "topicId": "views-stored-procedures",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "What is a Mutating Table Error in database triggers?",
        "options": [
            "A) When a table's schema is altered while the database is offline.",
            "B) When a row-level trigger attempts to query or modify the SAME table that is currently undergoing the triggering modification, risking inconsistent reads and infinite loops.",
            "C) When a hard drive suffers bit rot.",
            "D) When an index has duplicate keys."
        ],
        "correctIndex": 1,
        "hint": "Can an `AFTER UPDATE ON employees FOR EACH ROW` trigger query `SELECT * FROM employees` while the update is still in flight?",
        "progressiveHint": "In Oracle and other engines, ORA-04091 occurs when a trigger reads a table whose state is mid-transition.",
        "explanation": "A Mutating Table error occurs when a row-level trigger attempts to query or modify the very table that triggered it while the transaction is mid-operation, risking recursion and reading unstable transient states.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is the formal definition of the classic Mutating Table error.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Oracle / Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Oracle Architecture - Mutating Table Constraints in Triggers",
            "role": "Database Specialist"
        }
    },
    {
        "id": "dbms-mcq-192",
        "topicId": "views-stored-procedures",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "Why do security administrators use Views to enforce data access control in relational databases?",
        "options": [
            "A) Views run faster than tables.",
            "B) Users can be granted permissions to query a View while having direct SELECT access to the underlying sensitive base table completely revoked.",
            "C) Views prevent hard drive failure.",
            "D) Views eliminate the need for passwords."
        ],
        "correctIndex": 1,
        "hint": "How do you give an intern access to employee names and departments without exposing their salaries?",
        "progressiveHint": "GRANT SELECT ON public_view TO intern; REVOKE ALL ON base_table FROM intern.",
        "explanation": "Views provide a powerful security abstraction layer: grant access to a customized projection view while blocking direct access to the underlying base table, shielding sensitive columns.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is correct. Role-based column and row level security.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - View-Based Database Security",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-193",
        "topicId": "views-stored-procedures",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "An enterprise payment gateway must ensure that money deduction and ledger logging happen in the same compiled database routine without network latency roundtrips. What database construct should be used?",
        "options": [
            "A) A Stored Procedure with transaction control",
            "B) A client-side JavaScript loop",
            "C) A CSV file",
            "D) A temporary view"
        ],
        "correctIndex": 0,
        "hint": "Code compiled and executed directly inside the database engine server.",
        "progressiveHint": "Stored procedures execute on the database server, eliminating network roundtrips between sequential transactional steps.",
        "explanation": "Stored Procedures encapsulate multiple business steps directly inside the database engine, reducing network latency roundtrips and ensuring atomic execution with local transaction management.",
        "optionExplanations": [
            "Option A is correct. Industry standard for low-latency transactional workflows.",
            "Option B introduces network latency between every query.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon Payments - Stored Procedures vs Client-Side Orchestration",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-194",
        "topicId": "views-stored-procedures",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "How are parameters categorized in standard SQL Stored Procedures?",
        "options": [
            "A) IN (input only), OUT (output return only), and INOUT (passed in, modified, and returned back)",
            "B) PUBLIC, PRIVATE, PROTECTED",
            "C) LOCAL, GLOBAL, STATIC",
            "D) READ, WRITE, EXECUTE"
        ],
        "correctIndex": 0,
        "hint": "IN provides data into the procedure; OUT sends data back to the caller.",
        "progressiveHint": "Standard SQL/PL-SQL parameter modes: IN, OUT, INOUT.",
        "explanation": "Stored procedure parameter modes include: `IN` (read-only input from caller), `OUT` (write-only return value to caller), and `INOUT` (initialized by caller and updated by procedure).",
        "optionExplanations": [
            "Option A is the formal SQL parameter mode specification.",
            "Option B describes OOP access modifiers.",
            "Option C describes variable scoping.",
            "Option D describes file permissions."
        ],
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Wipro Elite NTH - Stored Procedure Parameter Modes",
            "role": "Project Engineer"
        }
    },
    {
        "id": "dbms-mcq-195",
        "topicId": "views-stored-procedures",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "Can an `INSTEAD OF` trigger be created on a Standard Table in PostgreSQL or Oracle?",
        "options": [
            "A) Yes, INSTEAD OF triggers work identically on tables and views.",
            "B) No, INSTEAD OF triggers are specifically designed for Views to intercept DML operations and translate them into custom underlying base table updates.",
            "C) Only on tables without primary keys.",
            "D) Only in MySQL."
        ],
        "correctIndex": 1,
        "hint": "What trigger type makes non-updatable complex views updatable?",
        "progressiveHint": "INSTEAD OF triggers bypass the default engine logic on Views to perform manual inserts/updates on base tables.",
        "explanation": "INSTEAD OF triggers are intended specifically for Views. They intercept INSERT, UPDATE, or DELETE operations on complex non-updatable views, allowing custom procedural code to update underlying base tables.",
        "optionExplanations": [
            "Option A is a common developer misconception.",
            "Option B is correct. INSTEAD OF triggers belong to Views.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - INSTEAD OF Triggers on Complex Views",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-196",
        "topicId": "views-stored-procedures",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "Which SQL statement is used to execute a stored procedure named `calculate_payroll`?",
        "options": [
            "A) RUN calculate_payroll();",
            "B) CALL calculate_payroll(); (or EXECUTE in SQL Server)",
            "C) START calculate_payroll();",
            "D) OPEN calculate_payroll();"
        ],
        "correctIndex": 1,
        "hint": "Standard ANSI SQL uses `CALL`.",
        "progressiveHint": "`CALL procedure_name(args);`.",
        "explanation": "In standard ANSI SQL, stored procedures are executed using the `CALL` statement (or `EXEC` / `EXECUTE` in T-SQL).",
        "optionExplanations": [
            "RUN is not a SQL statement.",
            "CALL: Correct standard SQL invocation.",
            "START is for transactions.",
            "OPEN is for cursors."
        ],
        "companyMetadata": {
            "company": "Capgemini",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Capgemini Technical Round - Procedure Invocation Syntax",
            "role": "Analyst"
        }
    }
]

print(f"Loaded Part 4 MCQs: {len(part4_mcqs)} questions.")
