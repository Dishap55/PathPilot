# MCQs Part 1: Topics 1-3
# 1. dbms-architecture (14 MCQs: 1 to 14)
# 2. er-model (14 MCQs: 15 to 28)
# 3. relational-model-keys (16 MCQs: 29 to 44)

part1_mcqs = [
    # -------------------------------------------------------------
    # 1. dbms-architecture (14 MCQs)
    # -------------------------------------------------------------
    {
        "id": "dbms-mcq-1",
        "topicId": "dbms-architecture",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "In the 3-tier ANSI-SPARC DBMS architecture, which level describes the physical storage structure and access paths on disk?",
        "options": [
            "A) External Level",
            "B) Conceptual Level",
            "C) Internal (Physical) Level",
            "D) Application Level"
        ],
        "correctIndex": 2,
        "hint": "Think about where B+ Trees, data pages, block allocations, and file clustering are physically defined.",
        "progressiveHint": "The ANSI-SPARC architecture has three levels: External (Views), Conceptual (Logical Tables), and Internal (Physical Disk Layout).",
        "explanation": "The Internal (Physical) Level describes how data is physically stored on persistent storage devices, including record formats, page layouts, B+ Tree indexing, and compression methods.",
        "optionExplanations": [
            "External Level defines customized user/application views.",
            "Conceptual Level defines what data is stored and entity relationships.",
            "Internal Level: Correct. Governs low-level physical block storage.",
            "Application Level is the client layer interacting via APIs."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT / Digital Technical Round - ANSI-SPARC 3-Schema Architecture",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-2",
        "topicId": "dbms-architecture",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the primary difference between Logical Data Independence and Physical Data Independence?",
        "options": [
            "A) Logical independence protects external views from conceptual schema changes; Physical independence protects conceptual schema from physical storage changes.",
            "B) Physical independence protects views; Logical independence protects indexes.",
            "C) They are identical concepts defined differently in SQL standards.",
            "D) Logical independence applies only to NoSQL; Physical independence applies to SQL."
        ],
        "correctIndex": 0,
        "hint": "Consider what happens when you add a column to a table (Logical) vs when you switch an index from Hash to B+ Tree (Physical).",
        "progressiveHint": "Logical data independence sits between External and Conceptual levels; Physical data independence sits between Conceptual and Internal levels.",
        "explanation": "Logical Data Independence ensures user views remain unaffected when tables or columns are added or restructured at the conceptual level. Physical Data Independence ensures queries remain unaffected when physical storage structures, files, or indexes change.",
        "optionExplanations": [
            "Option A is the exact ANSI-SPARC definition.",
            "Option B reverses the two concepts.",
            "Option C is incorrect; they are distinct structural tiers.",
            "Option D is completely false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Data Independence Concepts",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-3",
        "topicId": "dbms-architecture",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "Why does a DBMS Write-Ahead Log (WAL) require log records to be flushed to disk BEFORE the corresponding dirty table pages in the buffer pool are written to disk?",
        "options": [
            "A) To save RAM memory in the buffer pool.",
            "B) To ensure Atomicity and Durability during a crash (ARIES recovery protocol).",
            "C) Because disk write speeds are always faster than sequential log writes.",
            "D) To prevent users from issuing read queries while a write is occurring."
        ],
        "correctIndex": 1,
        "hint": "If power cuts while a dirty data page is written, how can the database UNDO the partial uncommitted write without the log?",
        "progressiveHint": "The WAL invariant guarantees that if the server crashes, the Recovery Manager has the before-image and after-image on disk to perform UNDO or REDO.",
        "explanation": "Under the WAL protocol, flushing log records first guarantees that the DBMS can either REDO committed transactions or UNDO uncommitted operations if a sudden power loss occurs.",
        "optionExplanations": [
            "Option A: WAL actually uses additional buffer memory.",
            "Option B: Correct. Guarantees crash recovery without data corruption.",
            "Option C: Random table page writes are actually slower than sequential log writes.",
            "Option D: Concurrency control handles read/write isolation, not WAL."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Database Storage Engine Internals & WAL Invariant",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-4",
        "topicId": "dbms-architecture",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "Which of the following is an advantage of a DBMS over a traditional file-processing system?",
        "options": [
            "A) Higher data redundancy and duplication",
            "B) Program-data dependence",
            "C) Centralized security, concurrency control, and crash recovery",
            "D) Absence of query optimization"
        ],
        "correctIndex": 2,
        "hint": "Think about what OS file systems lack when multiple users write to the same text file simultaneously.",
        "progressiveHint": "File systems lack ACID transactions, granular access control, and declarative SQL query optimization.",
        "explanation": "A DBMS eliminates uncontrolled redundancy, enforces data integrity constraints, provides concurrent multi-user transactions, and recovers automatically after hardware crashes.",
        "optionExplanations": [
            "Option A is a disadvantage of file systems.",
            "Option B is a flaw of file systems.",
            "Option C is correct. Centralized security and concurrency are core DBMS strengths.",
            "Option D is false; DBMS has powerful query optimizers."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Ninja Technical Round - DBMS vs File Systems",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-5",
        "topicId": "dbms-architecture",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "In the query execution pipeline, which component is responsible for transforming a parsed SQL query tree into an efficient physical execution plan?",
        "options": [
            "A) DDL Compiler",
            "B) Query Optimizer",
            "C) Buffer Manager",
            "D) Lock Manager"
        ],
        "correctIndex": 1,
        "hint": "Which component estimates I/O cost and chooses between Index Scan and Sequential Scan?",
        "progressiveHint": "Cost-based optimizers generate relational algebra trees and pick the lowest-cost access path.",
        "explanation": "The Query Optimizer analyzes table statistics, available indexes, and join algorithms (nested loop, hash, merge) to generate the lowest cost execution plan.",
        "optionExplanations": [
            "DDL Compiler compiles schema creation statements.",
            "Query Optimizer: Correct. Selects the most cost-effective execution path.",
            "Buffer Manager handles page caching in RAM.",
            "Lock Manager grants and detects lock conflicts."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Cognizant GenC - Query Processing Stages",
            "role": "Programmer Analyst"
        }
    },
    {
        "id": "dbms-mcq-6",
        "topicId": "dbms-architecture",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "A DBA adds a new B+ Tree index on column `hire_date` to speed up employee search queries. Which level of the ANSI-SPARC architecture was modified, and which level remained completely unchanged?",
        "options": [
            "A) Conceptual level modified; Internal level unchanged.",
            "B) Internal level modified; Conceptual and External levels unchanged (Physical Data Independence).",
            "C) External level modified; Conceptual level unchanged.",
            "D) Both External and Internal levels modified."
        ],
        "correctIndex": 1,
        "hint": "Adding an index affects physical disk access paths, not table columns or views.",
        "progressiveHint": "Physical data independence guarantees that physical storage tweaks do not require application code changes.",
        "explanation": "Indexes are physical access paths stored at the Internal (Physical) Level. Because of Physical Data Independence, the logical conceptual schema and external user queries remain unaffected.",
        "optionExplanations": [
            "Option A is backwards.",
            "Option B is correct. Demonstrates Physical Data Independence in practice.",
            "Option C is false.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Physical Schema Tuning",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-7",
        "topicId": "dbms-architecture",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the difference between a Database Schema and a Database Instance?",
        "options": [
            "A) Schema is the overall structural design/blueprint; Instance is the collection of actual data stored at a specific moment in time.",
            "B) Schema changes with every INSERT; Instance is permanent.",
            "C) Schema applies to NoSQL; Instance applies to Relational DBMS.",
            "D) Schema is stored in RAM; Instance is stored on disk."
        ],
        "correctIndex": 0,
        "hint": "Compare class definition (schema) to object state at runtime (instance).",
        "progressiveHint": "The schema rarely changes, while the instance changes constantly as transactions commit.",
        "explanation": "A Database Schema represents the formal blueprint and structural rules of the database. The Database Instance (or database state) is the concrete snapshot of data residing in the tables at any given instant.",
        "optionExplanations": [
            "Option A is the canonical database definition.",
            "Option B inverts the behavior.",
            "Option C and D are completely incorrect."
        ],
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Wipro Elite NTH - Database Fundamentals",
            "role": "Project Engineer"
        }
    },
    {
        "id": "dbms-mcq-8",
        "topicId": "dbms-architecture",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "Is changing a column data type from VARCHAR(50) to VARCHAR(100) an example of Logical or Physical Schema modification?",
        "options": [
            "A) Purely Physical because it changes disk storage format.",
            "B) Logical Schema modification because it alters the conceptual definition of the relation.",
            "C) Neither; it is an External Level View change.",
            "D) It is an unalterable operation in ANSI SQL."
        ],
        "correctIndex": 1,
        "hint": "Which schema level defines attributes, data types, and integrity constraints?",
        "progressiveHint": "Attribute domains are defined at the Conceptual (Logical) schema level.",
        "explanation": "The Conceptual schema defines table structures, column definitions, data types, and constraints. Modifying a column data type alters the logical blueprint, even though physical disk allocation will subsequently adjust.",
        "optionExplanations": [
            "Option A is a common trap confusing physical consequence with logical definition.",
            "Option B is correct.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Schema Evolution Traps",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-9",
        "topicId": "dbms-architecture",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "What is the primary role of the Database Data Dictionary (Metadata Catalog)?",
        "options": [
            "A) To store user passwords in plain text.",
            "B) To store 'data about data', such as schema definitions, constraints, indexes, and user privileges.",
            "C) To store temporary query cache results.",
            "D) To store backup archive tapes."
        ],
        "correctIndex": 1,
        "hint": "Think about what INFORMATION_SCHEMA or DBA_TABLES contains.",
        "progressiveHint": "The catalog maintains system-level knowledge of every table, view, column, and constraint.",
        "explanation": "The Data Dictionary is the central repository holding system metadata: table layouts, constraints, foreign keys, index structures, view definitions, and role authorizations.",
        "optionExplanations": [
            "Option A is a severe security vulnerability.",
            "Option B is correct.",
            "Option C describes the query cache.",
            "Option D describes offline cold storage."
        ],
        "companyMetadata": {
            "company": "Capgemini",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Capgemini Technical Interview - Data Dictionary Function",
            "role": "Analyst"
        }
    },
    {
        "id": "dbms-mcq-10",
        "topicId": "dbms-architecture",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "How does a 2-Tier Client-Server database architecture differ from a 3-Tier architecture?",
        "options": [
            "A) 2-tier runs application business logic directly on the client machine; 3-tier introduces an Application Server middle layer.",
            "B) 2-tier does not have a database server.",
            "C) 3-tier requires 3 database engines running in parallel.",
            "D) 2-tier is only used for web apps; 3-tier is for desktop apps."
        ],
        "correctIndex": 0,
        "hint": "Where does the application server (Node, Spring, Django) sit in modern web architecture?",
        "progressiveHint": "In 3-tier: Client (Browser) <-> App Server (Business Logic) <-> Database Server (Storage).",
        "explanation": "In 2-tier architecture, the client communicates directly with the database. In 3-tier architecture, an intermediate application server handles business logic, security authentication, and connection pooling.",
        "optionExplanations": [
            "Option A is the canonical system architecture definition.",
            "Option B is false.",
            "Option C confuses servers with tiers.",
            "Option D is backwards."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - 2-Tier vs 3-Tier Web Architectures",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-11",
        "topicId": "dbms-architecture",
        "difficulty": "Hard",
        "questionType": "Conceptual",
        "question": "What is the primary function of the Buffer Manager in a Relational DBMS?",
        "options": [
            "A) Parsing SQL grammar strings.",
            "B) Caching disk database pages in main memory (RAM) and coordinating page evictions via replacement policies.",
            "C) Compressing network packets sent to client drivers.",
            "D) Encrypting user passwords."
        ],
        "correctIndex": 1,
        "hint": "RAM is fast but volatile; disk is slow but durable. What bridges the two?",
        "progressiveHint": "The buffer manager minimizes expensive disk I/O by keeping hot pages in memory frames.",
        "explanation": "The Buffer Manager allocates memory frames in the buffer pool, loads required data pages from disk, pins active pages, and writes dirty pages back using policies like LRU or CLOCK.",
        "optionExplanations": [
            "Option A is done by the SQL Parser.",
            "Option B is correct.",
            "Option C is done by the Network Protocol Layer.",
            "Option D is done by the Authentication Subsystem."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Storage Engine Memory Architecture",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-12",
        "topicId": "dbms-architecture",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "An enterprise application needs to mask employee salaries from human resource interns while showing full compensation to payroll directors. How is this achieved under ANSI-SPARC architecture?",
        "options": [
            "A) By maintaining two separate physical copies of the database files.",
            "B) By defining distinct External Level Views on top of a single shared Conceptual schema.",
            "C) By creating a new primary key for each user.",
            "D) By disabling query optimization for interns."
        ],
        "correctIndex": 1,
        "hint": "Which level of ANSI-SPARC provides customized perspectives for different user personas?",
        "progressiveHint": "External level views allow row and column-level projection filtering without data duplication.",
        "explanation": "The External Level consists of views tailored to specific user roles. Creating `intern_view` (excluding salary) and `director_view` (including salary) enforces security without data duplication.",
        "optionExplanations": [
            "Option A creates catastrophic data inconsistency and redundancy.",
            "Option B is correct. Role-based external views solve this cleanly.",
            "Option C is irrelevant.",
            "Option D is absurd."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - View Security & External Schemas",
            "role": "Systems Engineer Specialist"
        }
    },
    {
        "id": "dbms-mcq-13",
        "topicId": "dbms-architecture",
        "difficulty": "Easy",
        "questionType": "Comparison",
        "question": "Which category of SQL commands does `ALTER TABLE ... ADD COLUMN` belong to?",
        "options": [
            "A) DML (Data Manipulation Language)",
            "B) DDL (Data Definition Language)",
            "C) DCL (Data Control Language)",
            "D) TCL (Transaction Control Language)"
        ],
        "correctIndex": 1,
        "hint": "Does it modify the structure/schema or the data rows?",
        "progressiveHint": "Commands that create, alter, or drop schema structures belong to DDL.",
        "explanation": "DDL commands (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`) define or modify database structure and schema blueprints.",
        "optionExplanations": [
            "DML modifies row content (`INSERT`, `UPDATE`, `DELETE`).",
            "DDL: Correct. Modifies table structure.",
            "DCL manages permissions (`GRANT`, `REVOKE`).",
            "TCL manages transactions (`COMMIT`, `ROLLBACK`)."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - SQL Command Categories",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-14",
        "topicId": "dbms-architecture",
        "difficulty": "Interview Trap",
        "questionType": "Interview Trap",
        "question": "Does a DBMS guarantee that committing a transaction immediately writes all updated table pages to the physical database data files on disk?",
        "options": [
            "A) Yes, COMMIT blocks until all dirty table pages in the buffer pool are written to disk.",
            "B) No, COMMIT only forces WAL log records to disk; dirty table pages can remain in RAM buffer pool until later checkpointing.",
            "C) Yes, otherwise Atomicity is permanently violated.",
            "D) No, COMMIT writes neither log nor data to disk until the database shuts down."
        ],
        "correctIndex": 1,
        "hint": "Think about why forcing random disk writes on every single COMMIT would destroy transaction throughput.",
        "progressiveHint": "Sequential log writes are fast; random page writes are deferred. WAL guarantees recovery even if table pages are dirty in RAM.",
        "explanation": "Under the WAL (Write-Ahead Logging) protocol, COMMIT only forces sequential log records to disk (fsync). Dirty data pages stay in RAM and are flushed lazily by background checkpoint processes.",
        "optionExplanations": [
            "Option A is false; doing so would result in severe disk I/O bottlenecks.",
            "Option B is correct. Fundamental database internals concept.",
            "Option C is false; WAL guarantees atomicity.",
            "Option D is false; that would violate Durability."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Database Engine Durability Traps",
            "role": "SDE-2"
        }
    },

    # -------------------------------------------------------------
    # 2. er-model (14 MCQs: 15 to 28)
    # -------------------------------------------------------------
    {
        "id": "dbms-mcq-15",
        "topicId": "er-model",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "In an Entity-Relationship (ER) diagram, how is a Weak Entity set represented?",
        "options": [
            "A) Single Rectangle",
            "B) Double Rectangle",
            "C) Dashed Ellipse",
            "D) Double Diamond"
        ],
        "correctIndex": 1,
        "hint": "A weak entity has a double border.",
        "progressiveHint": "Weak entity is a double rectangle, its identifying relationship is a double diamond.",
        "explanation": "In standard Chen ER notation, a strong entity is depicted by a single rectangle, and a weak entity (lacking its own primary key) is depicted by a double rectangle.",
        "optionExplanations": [
            "Single Rectangle represents a strong entity.",
            "Double Rectangle: Correct. Represents a weak entity.",
            "Dashed Ellipse represents a derived attribute.",
            "Double Diamond represents an identifying relationship."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - ER Diagram Notations",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-16",
        "topicId": "er-model",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "What is the primary key of a Weak Entity set in a relational schema?",
        "options": [
            "A) Its partial discriminator alone.",
            "B) Combination of the Primary Key of the identifying strong entity and the weak entity's partial discriminator.",
            "C) A randomly assigned UUID generated by the operating system.",
            "D) Weak entities cannot have primary keys in relational databases."
        ],
        "correctIndex": 1,
        "hint": "Consider employee dependents: `(emp_id, dependent_name)`.",
        "progressiveHint": "The partial discriminator only distinguishes entities among dependents of the same parent; the parent key is required for global uniqueness.",
        "explanation": "A weak entity does not possess sufficient attributes to form a primary key on its own. Its primary key is formed by combining the identifying owner entity's primary key with its own partial discriminator (discriminator key).",
        "optionExplanations": [
            "Option A is insufficient because two different employees could have dependents with the same name.",
            "Option B is correct.",
            "Option C is a surrogate workaround, not the relational definition.",
            "Option D is false; relational tables must have primary keys."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Round - Weak Entity Mapping",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-17",
        "topicId": "er-model",
        "difficulty": "Medium",
        "questionType": "ER Design",
        "question": "If Entity E1 has Total Participation in relationship R with Entity E2, what does this enforce in the database?",
        "options": [
            "A) Every entity in E1 must participate in at least one relationship instance in R.",
            "B) Exactly one entity in E1 can participate in R.",
            "C) Entity E1 does not require a foreign key.",
            "D) Relationship R must be Many-to-Many."
        ],
        "correctIndex": 0,
        "hint": "Total participation is also known as 'existence dependency'.",
        "progressiveHint": "Represented by a double line in ER diagrams, meaning the foreign key in E1 cannot be NULL.",
        "explanation": "Total participation (indicated by a double line) means every instance in E1 must be associated with at least one instance in E2. In SQL DDL, this translates to a `NOT NULL` constraint on the foreign key.",
        "optionExplanations": [
            "Option A is the exact definition of Total Participation.",
            "Option B describes a cardinality limit, not participation.",
            "Option C is false.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Wipro Elite NTH - Participation Constraints",
            "role": "Project Engineer"
        }
    },
    {
        "id": "dbms-mcq-18",
        "topicId": "er-model",
        "difficulty": "Hard",
        "questionType": "ER Design",
        "question": "What is the minimum number of relational tables required to represent a Many-to-Many (M:N) relationship between two strong entities E1 and E2 without multi-valued attributes?",
        "options": [
            "A) 1 Table",
            "B) 2 Tables",
            "C) 3 Tables",
            "D) 4 Tables"
        ],
        "correctIndex": 2,
        "hint": "You need table E1, table E2, and what else to bridge the relationship?",
        "progressiveHint": "An M:N relationship cannot store foreign keys in either parent table without violating 1NF; a junction/associative table is mandatory.",
        "explanation": "A Many-to-Many relationship requires exactly 3 tables: Table 1 for Entity E1, Table 2 for Entity E2, and Table 3 as the Associative (Junction) Table containing composite foreign keys pointing to both E1 and E2.",
        "optionExplanations": [
            "1 Table would cause massive redundancy and 1NF violations.",
            "2 Tables only work for 1:1 or 1:N relationships.",
            "3 Tables: Correct (Entity 1, Entity 2, Junction Table).",
            "4 Tables is redundant."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Relational Schema Reduction from ER",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-19",
        "topicId": "dbms-architecture",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "In an ER diagram, how is a Multi-Valued Attribute (such as multiple phone numbers for an employee) represented?",
        "options": [
            "A) Single Ellipse",
            "B) Double Ellipse",
            "C) Dashed Ellipse",
            "D) Diamond"
        ],
        "correctIndex": 1,
        "hint": "Weak entity has a double rectangle; multi-valued attribute has a double...",
        "progressiveHint": "Single ellipse is simple attribute, double ellipse is multi-valued, dashed ellipse is derived.",
        "explanation": "In Chen's ER notation, a double ellipse represents a multi-valued attribute that can store multiple distinct values for a single entity instance.",
        "optionExplanations": [
            "Single Ellipse represents a standard single-valued attribute.",
            "Double Ellipse: Correct. Multi-valued attribute.",
            "Dashed Ellipse represents a derived attribute (e.g. Age computed from DOB).",
            "Diamond represents a relationship set."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - ER Symbols and Attributes",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-20",
        "topicId": "er-model",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "How is a Multi-Valued Attribute mapped to relational database tables during ER-to-relational reduction?",
        "options": [
            "A) By storing a comma-separated string inside a single VARCHAR column.",
            "B) By creating a separate new table containing the primary key of the parent entity and the multi-valued attribute.",
            "C) By creating 10 duplicate columns (e.g., phone1, phone2, ..., phone10).",
            "D) Multi-valued attributes are simply discarded."
        ],
        "correctIndex": 1,
        "hint": "To satisfy First Normal Form (1NF), all column values must be atomic.",
        "progressiveHint": "The new table has a composite primary key consisting of (parent_primary_key, attribute_value).",
        "explanation": "To preserve 1NF (atomic values), a multi-valued attribute must be factored into its own dedicated table with the parent entity's primary key acting as a foreign key.",
        "optionExplanations": [
            "Option A violates 1NF (atomicity rule).",
            "Option B is correct and standard relational normalization.",
            "Option C causes null-padding and limits scalability.",
            "Option D causes data loss."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC - 1NF Transformation of Multivalued Attributes",
            "role": "Programmer Analyst"
        }
    },
    {
        "id": "dbms-mcq-21",
        "topicId": "er-model",
        "difficulty": "Placement",
        "questionType": "ER Design",
        "question": "A company policy states: 'Each department has exactly one manager, and an employee can manage at most one department.' What is the cardinality ratio and participation of the `Manages` relationship?",
        "options": [
            "A) Many-to-Many (M:N) with partial participation on both sides.",
            "B) One-to-One (1:1) with total participation of Department and partial participation of Employee.",
            "C) One-to-Many (1:N) with total participation on both sides.",
            "D) Many-to-One (N:1) with partial participation of Department."
        ],
        "correctIndex": 1,
        "hint": "Each department MUST have a manager (total), but not all employees are managers (partial).",
        "progressiveHint": "1:1 ratio because 1 dept has 1 manager and 1 manager manages 1 dept.",
        "explanation": "Because each department must have a manager, Department has total participation. Because not every employee is a manager, Employee has partial participation. The ratio is 1:1.",
        "optionExplanations": [
            "Option A is false; an employee cannot manage multiple departments.",
            "Option B is correct. 1:1 cardinality with total participation on Department.",
            "Option C is false.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - ER Cardinality & Participation Constraints",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-22",
        "topicId": "er-model",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "Can a Weak Entity participate as an identifying owner entity for another weak entity in a multi-level hierarchy?",
        "options": [
            "A) No, weak entities can only depend directly on a strong entity.",
            "B) Yes, forming a hierarchy of weak entities where the primary key cascades from all preceding ancestors.",
            "C) Only if circular foreign keys are allowed.",
            "D) Only in document NoSQL databases."
        ],
        "correctIndex": 1,
        "hint": "Consider Building -> Apartment (weak) -> Room (weak).",
        "progressiveHint": "Room's primary key would be (building_id, apartment_no, room_no).",
        "explanation": "Yes. In multi-level weak entity hierarchies, a weak entity can identify another sub-weak entity. The lowest entity's composite primary key accumulates identifying keys down the entire hierarchy.",
        "optionExplanations": [
            "Option A is a common misconception.",
            "Option B is correct. Standard conceptual modeling pattern.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Complex Entity Hierarchy Modeling",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-23",
        "topicId": "er-model",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "In ER modeling, what is a Recursive (Unary) Relationship?",
        "options": [
            "A) A relationship involving infinite entities.",
            "B) A relationship where the same entity set participates more than once in different roles.",
            "C) A relationship that cannot be queried using SQL.",
            "D) A relationship between tables in two different databases."
        ],
        "correctIndex": 1,
        "hint": "Think about an Employee managing another Employee.",
        "progressiveHint": "The relationship connects an entity set back to itself, such as `manages` or `is_prerequisite_of`.",
        "explanation": "A recursive or unary relationship connects an entity set to itself. For example, in `employees`, an employee participates in the role of 'subordinate' and another in the role of 'supervisor'.",
        "optionExplanations": [
            "Option A is nonsensical.",
            "Option B is correct.",
            "Option C is false; self-joins query recursive relationships easily.",
            "Option D describes federated databases."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Unary Relationships & Self-Joins",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-24",
        "topicId": "er-model",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "What is a Derived Attribute in an ER diagram?",
        "options": [
            "A) An attribute that cannot be stored.",
            "B) An attribute whose value is dynamically calculated from other stored attributes (e.g. `age` derived from `date_of_birth`).",
            "C) An attribute with multiple values.",
            "D) An attribute that serves as the foreign key."
        ],
        "correctIndex": 1,
        "hint": "Why store age in a database when it changes every year?",
        "progressiveHint": "Represented by a dashed ellipse in ER diagrams.",
        "explanation": "A derived attribute is not physically stored to prevent staleness; instead, it is computed on demand from existing stored attributes (e.g. calculating age from current_date - birth_date).",
        "optionExplanations": [
            "Option A is misleading.",
            "Option B is correct.",
            "Option C describes a multi-valued attribute.",
            "Option D describes a relational link."
        ],
        "companyMetadata": {
            "company": "Capgemini",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Capgemini Placement Assessment - Derived Attributes",
            "role": "Analyst"
        }
    },
    {
        "id": "dbms-mcq-25",
        "topicId": "er-model",
        "difficulty": "Hard",
        "questionType": "ER Design",
        "question": "When converting an ER diagram to relational tables, where should the Foreign Key be placed for a 1:N (One-to-Many) relationship between Department (1) and Employee (N)?",
        "options": [
            "A) In the Department table.",
            "B) In the Employee table.",
            "C) In a separate junction table with 3 columns.",
            "D) It can be placed in either table arbitrarily."
        ],
        "correctIndex": 1,
        "hint": "One department has many employees. Can one department row store multiple employee IDs without violating 1NF?",
        "progressiveHint": "Place the foreign key on the 'Many' side (Employee) pointing to the 'One' side (Department).",
        "explanation": "In a 1:N relationship, the foreign key must be placed on the 'N' (many) side. Each employee row stores exactly one `department_id`, maintaining 1NF and referential integrity.",
        "optionExplanations": [
            "Option A would require storing multiple employee IDs in one department row, violating 1NF.",
            "Option B is correct. FK always goes on the 'Many' side.",
            "Option C creates an unnecessary third table for a simple 1:N.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - 1:N Foreign Key Placement Rules",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-26",
        "topicId": "er-model",
        "difficulty": "Interview Trap",
        "questionType": "Interview Trap",
        "question": "Can an ER relationship set have its own descriptive attributes?",
        "options": [
            "A) No, attributes can only belong to Entity sets.",
            "B) Yes, for example the `borrow_date` attribute on a `Borrows` relationship between Student and Book.",
            "C) Only if the relationship is 1:1.",
            "D) Only in object-oriented databases."
        ],
        "correctIndex": 1,
        "hint": "Does `grade` belong to Student, Course, or the `Enrolls` relationship?",
        "progressiveHint": "Descriptive attributes belong to the relationship when they depend on both entities simultaneously.",
        "explanation": "Relationship sets can possess descriptive attributes. For instance, in an M:N relationship `Student Enrolls In Course`, the `grade` or `enrollment_date` belongs to the relationship itself.",
        "optionExplanations": [
            "Option A is a common misconception.",
            "Option B is correct.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Deloitte",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Deloitte USI - Relationship Attributes in Relational Mapping",
            "role": "Technology Analyst"
        }
    },
    {
        "id": "dbms-mcq-27",
        "topicId": "er-model",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "What is Specialization / Generalization in Enhanced ER (EER) modeling?",
        "options": [
            "A) Transforming tables into B+ trees.",
            "B) Defining superclass and subclass entity sets to model inheritance (IS-A relationships).",
            "C) Splitting a column into multiple sub-columns.",
            "D) Converting SQL into NoSQL."
        ],
        "correctIndex": 1,
        "hint": "Think of Person (Superclass) -> Employee, Student (Subclasses).",
        "progressiveHint": "Generalization is bottom-up abstraction; Specialization is top-down differentiation.",
        "explanation": "Specialization and Generalization model object-oriented 'IS-A' inheritance hierarchies, grouping shared attributes in a superclass while delegating specific attributes to subclasses.",
        "optionExplanations": [
            "Option A is indexing.",
            "Option B is correct. Represents EER superclass/subclass inheritance.",
            "Option C is normalization.",
            "Option D is irrelevant."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Infosys Placement - EER Specialization & Generalization",
            "role": "Systems Associate"
        }
    },
    {
        "id": "dbms-mcq-28",
        "topicId": "er-model",
        "difficulty": "Hard",
        "questionType": "ER Design",
        "question": "What is the key difference between Disjoint and Overlapping constraints in EER Specialization?",
        "options": [
            "A) Disjoint means an entity instance can belong to at most one subclass; Overlapping means it can belong to multiple subclasses simultaneously.",
            "B) Disjoint applies only to numbers; Overlapping applies to text.",
            "C) Overlapping means subclasses have no shared attributes.",
            "D) They are synonyms in database design."
        ],
        "correctIndex": 0,
        "hint": "Can a university Person be BOTH a Student AND an Employee at the same time?",
        "progressiveHint": "If yes, it is Overlapping; if an entity can only be one or the other, it is Disjoint ('d').",
        "explanation": "Under a Disjoint constraint ('d'), an entity instance can belong to at most one subclass. Under an Overlapping constraint ('o'), an entity instance can concurrently belong to more than one subclass.",
        "optionExplanations": [
            "Option A is the formal EER constraint definition.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - EER Hierarchy Constraints",
            "role": "SDE-1"
        }
    },

    # -------------------------------------------------------------
    # 3. relational-model-keys (16 MCQs: 29 to 44)
    # -------------------------------------------------------------
    {
        "id": "dbms-mcq-29",
        "topicId": "relational-model-keys",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "Which of the following properties is MANDATORY for a Primary Key?",
        "options": [
            "A) It must allow NULL values.",
            "B) It must be UNIQUE and NOT NULL.",
            "C) It must be composed of at least three columns.",
            "D) It must be a foreign key in another table."
        ],
        "correctIndex": 1,
        "hint": "Entity Integrity Constraint dictates primary key rules.",
        "progressiveHint": "A primary key cannot contain NULL because NULL cannot uniquely identify an entity.",
        "explanation": "Under the Entity Integrity Constraint, every relation must possess a Primary Key whose attributes are strictly UNIQUE and NOT NULL.",
        "optionExplanations": [
            "Option A violates the Entity Integrity Constraint.",
            "Option B is correct. Unique and Not Null are the defining traits of a Primary Key.",
            "Option C is false; single-column PKs are most common.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - Primary Key Integrity Rules",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-30",
        "topicId": "relational-model-keys",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is the critical functional difference between a PRIMARY KEY constraint and a UNIQUE KEY constraint in standard SQL?",
        "options": [
            "A) PRIMARY KEY allows multiple NULLs; UNIQUE KEY permits zero NULLs.",
            "B) A table can have only ONE Primary Key, and it disallows NULL; a table can have MULTIPLE Unique Keys, and Unique keys typically allow NULL values.",
            "C) There is no difference; they are interchangeable keywords.",
            "D) UNIQUE KEY can only be created on integer columns."
        ],
        "correctIndex": 1,
        "hint": "How many Primary Keys can a table have versus Unique constraints?",
        "progressiveHint": "Primary key defines the entity identifier (1 per table, NOT NULL). Unique constraints enforce alternate keys (multiple per table, NULL permitted).",
        "explanation": "A relation can have exactly one Primary Key, which strictly forbids NULLs. In contrast, multiple UNIQUE constraints can exist per table, and in standard SQL, UNIQUE columns permit NULL values (as NULL != NULL).",
        "optionExplanations": [
            "Option A is completely backwards.",
            "Option B is correct. Captures both count and NULL behavior.",
            "Option C is false.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Primary Key vs Unique Key",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-31",
        "topicId": "relational-model-keys",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is a Candidate Key in the relational model?",
        "options": [
            "A) Any column with duplicate values.",
            "B) A minimal Superkey that can uniquely identify every tuple in a relation without redundant attributes.",
            "C) A key that was rejected by the database administrator.",
            "D) A foreign key referencing a non-existent table."
        ],
        "correctIndex": 1,
        "hint": "All candidate keys are superkeys, but what makes them 'minimal'?",
        "progressiveHint": "Removing any attribute from a Candidate Key destroys its uniqueness property.",
        "explanation": "A Candidate Key is a minimal superkey. If any attribute is dropped from a candidate key, the remaining subset is no longer sufficient to uniquely identify tuples.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is correct. Minimal superkey is the mathematical definition.",
            "Option C is a humorous colloquial misconception.",
            "Option D is an orphaned foreign key."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC - Superkey vs Candidate Key Definitions",
            "role": "Programmer Analyst"
        }
    },
    {
        "id": "dbms-mcq-32",
        "topicId": "relational-model-keys",
        "difficulty": "Hard",
        "questionType": "Interview Trap",
        "question": "Can a Foreign Key reference a column that is NOT a Primary Key in the referenced parent table?",
        "options": [
            "A) No, Foreign Keys can strictly only reference Primary Keys.",
            "B) Yes, a Foreign Key can reference any column that has a UNIQUE constraint in the referenced table.",
            "C) Yes, Foreign Keys can reference completely unindexed, duplicate columns.",
            "D) Only in MySQL, not in PostgreSQL."
        ],
        "correctIndex": 1,
        "hint": "Does referential integrity require a Primary Key specifically, or just guaranteed uniqueness?",
        "progressiveHint": "Referential integrity requires that the referenced target is guaranteed to identify at most one row, which UNIQUE enforces.",
        "explanation": "In standard SQL and relational algebra, a Foreign Key must reference a candidate key of the parent table—either its PRIMARY KEY or any column backed by a UNIQUE constraint.",
        "optionExplanations": [
            "Option A is a widespread interview trap.",
            "Option B is correct. Any UNIQUE column can be the target of a Foreign Key.",
            "Option C is false; target must be unique.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Referential Integrity Target Rules",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-33",
        "topicId": "relational-model-keys",
        "difficulty": "Hard",
        "questionType": "Conceptual",
        "question": "Given Relation R(A, B, C, D) where the only candidate key is {A, B}. Which of the following is a Superkey?",
        "options": [
            "A) {A}",
            "B) {B}",
            "C) {A, B, C}",
            "D) {C, D}"
        ],
        "correctIndex": 2,
        "hint": "A superkey is any superset of a candidate key.",
        "progressiveHint": "Since {A, B} uniquely identifies the relation, adding any attribute (such as C) retains uniqueness, making {A, B, C} a superkey.",
        "explanation": "Any superset of a candidate key is a Superkey. Because {A, B} is a candidate key, {A, B, C} is guaranteed to have unique values across all tuples.",
        "optionExplanations": [
            "Option A and B are proper subsets of the minimal key, so they cannot identify all rows.",
            "Option C is correct. Superset of candidate key {A, B}.",
            "Option D does not contain the candidate key."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - Superkey Identification Problems",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-34",
        "topicId": "relational-model-keys",
        "difficulty": "Placement",
        "questionType": "Scenario",
        "question": "A parent table `departments` has primary key `dept_id`. A child table `employees` references `dept_id` with `ON DELETE SET NULL`. If department 10 is deleted, what happens to employees who worked in department 10?",
        "options": [
            "A) The employee rows are completely deleted from the database.",
            "B) The delete command is aborted with a foreign key violation error.",
            "C) The employees remain in the table, and their `dept_id` column is updated to NULL.",
            "D) The employees are automatically transferred to department 0."
        ],
        "correctIndex": 2,
        "hint": "The referential action explicitly specifies `SET NULL`.",
        "progressiveHint": "`CASCADE` deletes child rows; `RESTRICT` aborts the operation; `SET NULL` replaces the foreign key value with NULL.",
        "explanation": "`ON DELETE SET NULL` ensures child records survive when a parent record is removed by setting the foreign key pointer to NULL.",
        "optionExplanations": [
            "Option A describes `ON DELETE CASCADE`.",
            "Option B describes `ON DELETE RESTRICT` / `NO ACTION`.",
            "Option C is correct. The foreign key becomes NULL.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC - Referential Action Cascade Rules",
            "role": "Programmer Analyst"
        }
    },
    {
        "id": "dbms-mcq-35",
        "topicId": "relational-model-keys",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "What is a Surrogate Key?",
        "options": [
            "A) A natural key with business meaning like Social Security Number.",
            "B) An artificial, system-generated primary key (such as an auto-incrementing integer or UUID) with no intrinsic real-world meaning.",
            "C) A foreign key that has been disabled.",
            "D) A candidate key composed of 5 or more columns."
        ],
        "correctIndex": 1,
        "hint": "Think of `id SERIAL PRIMARY KEY` or `AUTO_INCREMENT`.",
        "progressiveHint": "Surrogate keys insulate database joins from changes in business natural keys.",
        "explanation": "A Surrogate Key is an artificially generated unique identifier (e.g. `emp_id INT AUTO_INCREMENT`) that has no business meaning but provides fast, compact primary key indexing.",
        "optionExplanations": [
            "Option A describes a Natural Key.",
            "Option B is correct. System-generated surrogate identifier.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Capgemini",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Capgemini Technical Interview - Natural vs Surrogate Keys",
            "role": "Software Engineer"
        }
    },
    {
        "id": "dbms-mcq-36",
        "topicId": "relational-model-keys",
        "difficulty": "Medium",
        "questionType": "Comparison",
        "question": "What is a Composite Key in database design?",
        "options": [
            "A) A key created using AES encryption.",
            "B) A primary or candidate key composed of two or more attributes combined to guarantee uniqueness.",
            "C) A key that only works on composite numbers.",
            "D) A foreign key pointing to two different databases."
        ],
        "correctIndex": 1,
        "hint": "Consider `PRIMARY KEY (student_id, course_id)`.",
        "progressiveHint": "No single attribute is unique alone; only their combination is unique.",
        "explanation": "A Composite Key is a multi-attribute key where multiple columns collectively identify each record uniquely (such as `order_id` + `item_id` in an order items table).",
        "optionExplanations": [
            "Option A is false.",
            "Option B is correct. Combination of 2 or more columns.",
            "Option C and D are nonsensical."
        ],
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Wipro Technical Round - Composite Primary Keys",
            "role": "Project Engineer"
        }
    },
    {
        "id": "dbms-mcq-37",
        "topicId": "relational-model-keys",
        "difficulty": "Interview Trap",
        "questionType": "Interview Trap",
        "question": "Can a Foreign Key in a child table contain NULL values?",
        "options": [
            "A) Never; foreign keys must strictly always reference a valid parent row.",
            "B) Yes, unless the foreign key column is explicitly declared with a `NOT NULL` constraint.",
            "C) Only if the parent table has a row where the primary key is NULL.",
            "D) Only during database migration mode."
        ],
        "correctIndex": 1,
        "hint": "Can an employee exist without having a manager assigned yet?",
        "progressiveHint": "Referential integrity requires that IF a foreign key value is present, it must match a parent key. If it is NULL, no parent check is enforced.",
        "explanation": "By default, SQL allows Foreign Keys to be NULL unless constrained by `NOT NULL`. A NULL foreign key represents an optional relationship (e.g. an employee who has no manager).",
        "optionExplanations": [
            "Option A is a very common interview trap.",
            "Option B is correct. Foreign keys permit NULL by default.",
            "Option C is false; primary keys cannot contain NULL.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Referential Integrity NULL Semantics",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-38",
        "topicId": "relational-model-keys",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "What is the Referential Integrity Constraint in the relational model?",
        "options": [
            "A) It states that primary keys must be numeric integers.",
            "B) It states that any foreign key value in a referencing relation must either exist as a primary/unique key in the referenced relation, or be NULL.",
            "C) It requires that tables have fewer than 10 foreign keys.",
            "D) It requires all tables to be in Boyce-Codd Normal Form."
        ],
        "correctIndex": 1,
        "hint": "It prevents 'dangling pointers' to non-existent parent rows.",
        "progressiveHint": "If table B references table A, table B cannot contain a reference to an ID that does not exist in table A.",
        "explanation": "Referential integrity guarantees consistency between linked tables: foreign key values must reference a valid, existing tuple in the referenced relation (or evaluate to NULL).",
        "optionExplanations": [
            "Option A is false.",
            "Option B is the formal definition of Referential Integrity.",
            "Option C and D are unrelated concepts."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - Referential Integrity Rules",
            "role": "Ninja Developer"
        }
    },
    {
        "id": "dbms-mcq-39",
        "topicId": "relational-model-keys",
        "difficulty": "Hard",
        "questionType": "Comparison",
        "question": "What is the difference between Natural Keys and Surrogate Keys regarding database index fragmentation during high-volume inserts?",
        "options": [
            "A) Natural keys (like UUIDv4 or strings) cause random B+ tree leaf splits and page fragmentation; monotonically increasing surrogate integer keys append sequentially without leaf splits.",
            "B) Natural keys are always faster to index than integer keys.",
            "C) Surrogate keys cause high page fragmentation because they are generated by software.",
            "D) There is no performance difference in B+ Tree storage."
        ],
        "correctIndex": 0,
        "hint": "What happens when you insert random strings into a sorted B+ tree vs sequential IDs (1, 2, 3...)?",
        "progressiveHint": "Sequential integers always append to the rightmost leaf page, minimizing expensive page splitting.",
        "explanation": "Sequential surrogate integer keys append naturally to the end of B+ Tree clustered indexes, minimizing random page splits. Random natural keys (like UUIDs or emails) insert into arbitrary leaf pages, causing heavy I/O fragmentation.",
        "optionExplanations": [
            "Option A is the core storage engine reason high-scale databases use auto-incrementing surrogate keys.",
            "Option B, C, and D are false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - B+ Tree Clustered Index Page Splitting & Key Selection",
            "role": "SDE-2"
        }
    },
    {
        "id": "dbms-mcq-40",
        "topicId": "relational-model-keys",
        "difficulty": "Easy",
        "questionType": "Conceptual",
        "question": "What is an Alternate Key?",
        "options": [
            "A) A candidate key that was not chosen as the Primary Key.",
            "B) A key that switches between two columns on alternate days.",
            "C) A key used only during weekend backups.",
            "D) A foreign key referencing a view."
        ],
        "correctIndex": 0,
        "hint": "If a table has Candidate Keys {emp_id, email, passport_no}, and `emp_id` is chosen as Primary Key, what are `email` and `passport_no` called?",
        "progressiveHint": "Alternate keys are all candidate keys other than the primary key.",
        "explanation": "Candidate keys that are not selected as the primary key are designated as Alternate Keys. In SQL, they are enforced using `UNIQUE NOT NULL` constraints.",
        "optionExplanations": [
            "Option A is the canonical database definition.",
            "Option B and C are humorous false choices.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Candidate vs Alternate Keys",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-41",
        "topicId": "relational-model-keys",
        "difficulty": "Placement",
        "questionType": "SQL Output",
        "question": "Consider table `students(id INT PRIMARY KEY, email VARCHAR(50) UNIQUE)`. What happens when the following two queries execute?\n\n1. INSERT INTO students VALUES (1, NULL);\n2. INSERT INTO students VALUES (2, NULL);",
        "options": [
            "A) Query 1 succeeds; Query 2 fails with unique constraint violation.",
            "B) Both queries succeed because in standard SQL, NULL does not equal NULL in UNIQUE constraints.",
            "C) Query 1 fails immediately because UNIQUE columns forbid NULL.",
            "D) Both queries fail with primary key violations."
        ],
        "correctIndex": 1,
        "hint": "In SQL, is `NULL = NULL` evaluated to TRUE or UNKNOWN?",
        "progressiveHint": "Standard SQL treats each NULL as distinct and unknown, allowing multiple NULLs in a UNIQUE column (unlike PRIMARY KEY).",
        "explanation": "In standard SQL (and engines like PostgreSQL/SQLite/Oracle), a UNIQUE column permits multiple NULL values because comparing NULL with NULL yields UNKNOWN, not TRUE. Both inserts succeed.",
        "optionExplanations": [
            "Option A is false (a common misconception from developers assuming UNIQUE disallows multiple NULLs).",
            "Option B is correct. Both inserts succeed cleanly.",
            "Option C is false.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - SQL Three-Valued Logic & Unique Constraint Nullability",
            "role": "SDE-1"
        }
    },
    {
        "id": "dbms-mcq-42",
        "topicId": "relational-model-keys",
        "difficulty": "Interview Trap",
        "questionType": "Interview Trap",
        "question": "Can a Composite Primary Key contain a column whose value is NULL for some rows?",
        "options": [
            "A) Yes, as long as the other column in the composite key is NOT NULL.",
            "B) No, the Entity Integrity Constraint requires that NO attribute forming part of a Primary Key can ever be NULL.",
            "C) Yes, if the table has fewer than 100 rows.",
            "D) Yes, if declared with `ON CONFLICT IGNORE`."
        ],
        "correctIndex": 1,
        "hint": "If a primary key has 3 columns (A, B, C), can column C ever be NULL?",
        "progressiveHint": "Entity Integrity forbids NULL in ANY component column of a primary key.",
        "explanation": "The Entity Integrity rule is absolute: no attribute participating in the primary key (whether single-column or composite) can contain a NULL value.",
        "optionExplanations": [
            "Option A is a widespread interview trap.",
            "Option B is correct. All constituent columns of a Primary Key must be NOT NULL.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Round - Composite Primary Key Nullability",
            "role": "Systems Engineer"
        }
    },
    {
        "id": "dbms-mcq-43",
        "topicId": "relational-model-keys",
        "difficulty": "Medium",
        "questionType": "Conceptual",
        "question": "What is the relationship between the number of Superkeys and Candidate Keys in a relation?",
        "options": [
            "A) Candidate keys >= Superkeys",
            "B) Superkeys >= Candidate keys (every candidate key is a superkey, but not every superkey is a candidate key)",
            "C) They are always equal in quantity.",
            "D) There is no mathematical relationship."
        ],
        "correctIndex": 1,
        "hint": "Every Candidate Key is a minimal Superkey. What happens when you add extraneous columns?",
        "progressiveHint": "Adding any column to a candidate key creates a new superkey, so superkeys always outnumber or equal candidate keys.",
        "explanation": "Because a Candidate Key is by definition a minimal Superkey, every candidate key is a superkey. Adding any set of non-key attributes produces additional superkeys, so Superkeys >= Candidate Keys.",
        "optionExplanations": [
            "Option A is mathematically impossible.",
            "Option B is correct.",
            "Option C is false.",
            "Option D is false."
        ],
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - Relational Theory & Key Hierarchies",
            "role": "Digital Developer"
        }
    },
    {
        "id": "dbms-mcq-44",
        "topicId": "relational-model-keys",
        "difficulty": "Hard",
        "questionType": "Scenario",
        "question": "A table `loan_records` has composite candidate key `(customer_id, loan_number)`. A developer deletes `customer_id` from the constraint, leaving only `loan_number`. If `loan_number` alone uniquely identifies all rows, what was `(customer_id, loan_number)` originally?",
        "options": [
            "A) A Foreign Key",
            "B) A Non-minimal Superkey (not a true Candidate Key)",
            "C) A Weak Entity",
            "D) A Surrogate Key"
        ],
        "correctIndex": 1,
        "hint": "If a subset (`loan_number`) is already unique, was the combination minimal?",
        "progressiveHint": "Candidate keys must be minimal. If a subset is unique, the larger set is merely a superkey.",
        "explanation": "Because `loan_number` is already unique, the combined set `(customer_id, loan_number)` contained an extraneous attribute, making it a non-minimal Superkey rather than a Candidate Key.",
        "optionExplanations": [
            "Option A is false.",
            "Option B is correct. It violates the minimality property of candidate keys.",
            "Option C and D are false."
        ],
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Cognizant GenC - Key Minimality Verification",
            "role": "Programmer Analyst"
        }
    }
]

print(f"Loaded Part 1 MCQs: {len(part1_mcqs)} questions.")
