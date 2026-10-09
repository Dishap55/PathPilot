/**
 * Comprehensive Master DBMS MCQ Question Bank
 * 196 Topic-Mapped Questions across all 12 Canonical DBMS Topics
 * Contains Progressive Hints, Explanations, Option Breakdowns, and Placement/Company Metadata
 */

export const DBMS_MCQ_QUESTIONS = [
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
  },
  {
    "id": "dbms-mcq-45",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Easy",
    "questionType": "Comparison",
    "question": "What is the critical difference between `DELETE` and `TRUNCATE` in standard SQL?",
    "options": [
      "A) DELETE is DDL and cannot be rolled back; TRUNCATE is DML and can be rolled back.",
      "B) DELETE is DML, deletes rows one by one with individual log records and can be rolled back; TRUNCATE is DDL, deallocates entire data pages at once, cannot be filtered with WHERE, and is significantly faster.",
      "C) Both commands perform the exact same physical operations on disk.",
      "D) TRUNCATE drops the table definition from the data dictionary."
    ],
    "correctIndex": 1,
    "hint": "Can you use a WHERE clause with TRUNCATE?",
    "progressiveHint": "DELETE logs row-by-row deletions; TRUNCATE deallocates extents/pages and resets auto-increment counters.",
    "explanation": "DELETE is a DML statement that logs row-by-row deletions, triggers `ON DELETE` triggers, and supports WHERE filters. TRUNCATE is a DDL statement that resets page allocations and high-water marks rapidly without per-row logging.",
    "optionExplanations": [
      "Option A is completely backwards.",
      "Option B is the classic, comprehensive technical comparison.",
      "Option C is false.",
      "Option D describes DROP TABLE, not TRUNCATE."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT / Digital Technical Round - DELETE vs TRUNCATE vs DROP",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-46",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Easy",
    "questionType": "Comparison",
    "question": "What is the difference between `TRUNCATE` and `DROP TABLE`?",
    "options": [
      "A) TRUNCATE removes all table data but leaves the table structure/schema intact; DROP TABLE removes all table data AND permanently deletes the table structure from the data dictionary.",
      "B) TRUNCATE removes the table structure; DROP leaves the table intact.",
      "C) DROP TABLE can be filtered with a WHERE clause.",
      "D) They are synonyms in MySQL."
    ],
    "correctIndex": 0,
    "hint": "After running the query, can you still run `INSERT INTO table` without re-creating it?",
    "progressiveHint": "With TRUNCATE, the empty table remains. With DROP, the table no longer exists.",
    "explanation": "TRUNCATE purges all tuples while preserving table columns, constraints, and permissions. DROP TABLE permanently removes the table definition from the database catalog.",
    "optionExplanations": [
      "Option A is correct.",
      "Option B inverts the two.",
      "Option C is false; DROP does not accept WHERE.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - DDL DROP vs TRUNCATE",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-47",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given table `users`:\n| id | name  | points |\n|----|-------|--------|\n| 1  | Alice | 100    |\n| 2  | Bob   | NULL   |\n| 3  | Carol | 50     |\n\nWhat is the output of:\nSELECT COUNT(*), COUNT(points) FROM users;",
    "options": [
      "A) 3, 3",
      "B) 3, 2",
      "C) 2, 2",
      "D) NULL, 2"
    ],
    "correctIndex": 1,
    "hint": "Does `COUNT(*)` count NULL values? Does `COUNT(column)` count NULL values?",
    "progressiveHint": "COUNT(*) counts total rows in the relation; COUNT(column_name) counts only NON-NULL entries.",
    "explanation": "`COUNT(*)` counts total rows regardless of contents (returns 3). `COUNT(points)` ignores NULLs, counting only 100 and 50 (returns 2). Result is (3, 2).",
    "optionExplanations": [
      "Option A is false because COUNT(col) ignores NULL.",
      "Option B is correct: 3 total rows, 2 non-null points.",
      "Option C is false.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - SQL Aggregate NULL Semantics",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-48",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given table `items`:\n| id | status |\n|----|--------|\n| 1  | active |\n| 2  | NULL   |\n| 3  | paused |\n\nWhat is the result of:\nSELECT COUNT(*) FROM items WHERE status <> 'active';",
    "options": [
      "A) 2 (rows 2 and 3)",
      "B) 1 (only row 3)",
      "C) 0",
      "D) Error"
    ],
    "correctIndex": 1,
    "hint": "In SQL three-valued logic, what is the result of `NULL <> 'active'`?",
    "progressiveHint": "Comparing NULL with any value yields UNKNOWN. Rows evaluating to UNKNOWN are REJECTED by the WHERE clause.",
    "explanation": "Row 1: 'active' <> 'active' is FALSE. Row 2: NULL <> 'active' is UNKNOWN (rejected). Row 3: 'paused' <> 'active' is TRUE (accepted). Only 1 row satisfies the condition.",
    "optionExplanations": [
      "Option A is the most common interview trap; developers mistakenly assume NULL <> 'active' is TRUE.",
      "Option B is correct. Only row 3 evaluates to TRUE.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Three Valued Logic WHERE Clause Trap",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-49",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Which SQL clause is used to filter records BEFORE any group aggregation takes place?",
    "options": [
      "A) HAVING",
      "B) WHERE",
      "C) GROUP BY",
      "D) ORDER BY"
    ],
    "correctIndex": 1,
    "hint": "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
    "progressiveHint": "Query execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.",
    "explanation": "The WHERE clause acts as the primary row-level filter before grouping occurs. The HAVING clause applies aggregate conditions after rows are grouped.",
    "optionExplanations": [
      "HAVING filters aggregate groups.",
      "WHERE: Correct. Filters raw individual rows prior to grouping.",
      "GROUP BY performs the grouping.",
      "ORDER BY sorts final output."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - SQL Query Lifecycle",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-50",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is the logical order of SQL query execution versus the written syntax order?",
    "options": [
      "A) SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
      "B) FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT",
      "C) WHERE -> FROM -> SELECT -> HAVING -> GROUP BY",
      "D) ORDER BY -> LIMIT -> SELECT -> FROM -> WHERE"
    ],
    "correctIndex": 1,
    "hint": "Can a WHERE clause see an alias defined in the SELECT clause?",
    "progressiveHint": "No, because FROM and WHERE execute BEFORE the SELECT clause is projected.",
    "explanation": "The database engine processes FROM (tables/joins) first, then WHERE (row filters), GROUP BY (aggregations), HAVING (group filters), SELECT (projection & expressions), and finally ORDER BY and LIMIT.",
    "optionExplanations": [
      "Option A is the written syntax order, not the execution order.",
      "Option B is the true logical evaluation pipeline in relational database engines.",
      "Option C and D are invalid orders."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Logical Query Processing Order",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-51",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "Why does the following query fail with an error in standard SQL?\n\nSELECT salary * 12 AS annual_sal\nFROM employees\nWHERE annual_sal > 50000;",
    "options": [
      "A) Multiplication is not allowed in SELECT statements.",
      "B) Column aliases created in the SELECT clause are not yet evaluated when the WHERE clause executes.",
      "C) annual_sal must be declared in double quotes.",
      "D) WHERE cannot compare numbers greater than 50000."
    ],
    "correctIndex": 1,
    "hint": "Check the logical order of query execution: does WHERE run before or after SELECT?",
    "progressiveHint": "WHERE executes BEFORE SELECT; therefore `annual_sal` does not exist yet when WHERE evaluates.",
    "explanation": "Because the WHERE clause executes before the SELECT clause, the column alias `annual_sal` is unknown during the filtering phase. You must repeat the expression `WHERE salary * 12 > 50000` or wrap in a CTE/subquery.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Fundamental logical order principle.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Column Aliases in WHERE Clause",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-52",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Which SQL wildcard character represents exactly ONE character in a `LIKE` pattern?",
    "options": [
      "A) % (Percent sign)",
      "B) _ (Underscore)",
      "C) * (Asterisk)",
      "D) ? (Question mark)"
    ],
    "correctIndex": 1,
    "hint": "`%` matches zero or more characters; what matches exactly one?",
    "progressiveHint": "In ANSI SQL: `%` = 0 or more characters, `_` = exactly 1 character.",
    "explanation": "In standard SQL pattern matching with LIKE, the underscore (`_`) matches exactly one character, while percent (`%`) matches zero, one, or multiple characters.",
    "optionExplanations": [
      "`%` matches zero or more characters.",
      "`_`: Correct. Matches exactly one single character.",
      "`*` and `?` are regex/glob characters, not standard SQL LIKE wildcards."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Pattern Matching Wildcards",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-53",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given table `products`:\n| id | name   | price |\n|----|--------|-------|\n| 1  | Apple  | 10    |\n| 2  | Banana | 20    |\n| 3  | Cherry | 30    |\n\nWhat is the result of:\nSELECT name FROM products WHERE price BETWEEN 10 AND 25;",
    "options": [
      "A) Banana",
      "B) Apple, Banana",
      "C) Apple, Banana, Cherry",
      "D) Cherry"
    ],
    "correctIndex": 1,
    "hint": "Is `BETWEEN` inclusive or exclusive in SQL?",
    "progressiveHint": "BETWEEN 10 AND 25 is equivalent to `price >= 10 AND price <= 25` (both endpoints inclusive).",
    "explanation": "BETWEEN is inclusive in SQL. Apple (10) and Banana (20) fall within [10, 25]. Cherry (30) is excluded.",
    "optionExplanations": [
      "Option A misses Apple.",
      "Option B is correct. Apple and Banana.",
      "Option C includes Cherry which exceeds 25.",
      "Option D is wrong."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite NTH - BETWEEN Operator Inclusivity",
      "role": "Project Engineer"
    }
  },
  {
    "id": "dbms-mcq-54",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "What is the value returned by this SQL expression?\nSELECT 10 + NULL;",
    "options": [
      "A) 10",
      "B) 0",
      "C) NULL",
      "D) Compilation Error"
    ],
    "correctIndex": 2,
    "hint": "Any arithmetic operation with NULL propagates what?",
    "progressiveHint": "NULL represents an unknown value. Adding anything to an unknown value is still unknown (NULL).",
    "explanation": "In SQL, arithmetic expressions involving NULL always yield NULL (`10 + NULL = NULL`). Use `COALESCE(val, 0)` if a default is desired.",
    "optionExplanations": [
      "Option A and B are common beginner traps assuming NULL acts as 0.",
      "Option C is correct. Any arithmetic with NULL evaluates to NULL.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - Arithmetic with NULL Values",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-55",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Medium",
    "questionType": "Query Logic",
    "question": "What is the purpose of the `COALESCE` function in SQL?",
    "options": [
      "A) Merges two tables into one.",
      "B) Returns the first non-NULL expression from a list of arguments.",
      "C) Converts text to uppercase.",
      "D) Deletes duplicate rows."
    ],
    "correctIndex": 1,
    "hint": "What does `COALESCE(phone, email, 'N/A')` return if phone is NULL but email is 'a@b.com'?",
    "progressiveHint": "Evaluates its arguments from left to right and returns the first value that is not NULL.",
    "explanation": "`COALESCE(val1, val2, ...)` sequentially tests arguments and returns the first non-NULL value found. If all arguments are NULL, it returns NULL.",
    "optionExplanations": [
      "Option A describes UNION or JOIN.",
      "Option B is correct.",
      "Option C describes UPPER().",
      "Option D describes DISTINCT."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Handling NULLs with COALESCE",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-56",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "Consider table `records` with 3 rows where all column values are NULL. What is the result of:\nSELECT COUNT(1) FROM records;",
    "options": [
      "A) 0",
      "B) 3",
      "C) NULL",
      "D) Error"
    ],
    "correctIndex": 1,
    "hint": "Does `COUNT(constant)` evaluate the constant or the row existence?",
    "progressiveHint": "`COUNT(1)` evaluates the literal constant '1' for each row. Since '1' is never NULL, it counts all 3 rows.",
    "explanation": "`COUNT(1)` evaluates the literal constant 1 for every row in the table. Because 1 is not NULL, it increments the count for all 3 rows, returning 3.",
    "optionExplanations": [
      "Option A is a trap assuming NULL row content prevents COUNT(1) from counting.",
      "Option B is correct. 3 rows counted.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - COUNT(*) vs COUNT(1) vs COUNT(col)",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-57",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Which SQL constraint prevents invalid, out-of-range numeric entries by enforcing custom conditional rules (e.g. `salary > 0`)?",
    "options": [
      "A) CHECK constraint",
      "B) DEFAULT constraint",
      "C) FOREIGN KEY constraint",
      "D) INDEX constraint"
    ],
    "correctIndex": 0,
    "hint": "Syntax: `CONSTRAINT chk_salary CHECK (salary > 0)`.",
    "progressiveHint": "CHECK constraints evaluate a boolean expression before accepting inserts or updates.",
    "explanation": "A CHECK constraint ensures all values in a column satisfy a specific boolean predicate (e.g. `age >= 18` or `price > 0`).",
    "optionExplanations": [
      "CHECK: Correct. Validates custom boolean conditions.",
      "DEFAULT provides fallback values.",
      "FOREIGN KEY ensures referential consistency.",
      "INDEX is an access path, not an integrity constraint."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Placement - SQL Constraints",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-58",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `nums`:\n| val |\n|-----|\n| 1   |\n| 2   |\n| 2   |\n| 3   |\n| NULL|\n\nWhat is the output of:\nSELECT COUNT(DISTINCT val) FROM nums;",
    "options": [
      "A) 5",
      "B) 4",
      "C) 3",
      "D) NULL"
    ],
    "correctIndex": 2,
    "hint": "Does `COUNT(DISTINCT ...)` include NULL in the distinct count?",
    "progressiveHint": "In ANSI SQL, aggregate functions ignore NULLs. Distinct non-null values are {1, 2, 3}.",
    "explanation": "`COUNT(DISTINCT val)` identifies unique non-null values {1, 2, 3}, resulting in 3. NULL is ignored.",
    "optionExplanations": [
      "Option A counts all rows.",
      "Option B mistakenly includes NULL as a distinct value in COUNT.",
      "Option C is correct. Exactly 3 distinct non-null values.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - DISTINCT and NULL Cardinality",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-59",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is the difference between `UNION` and `UNION ALL`?",
    "options": [
      "A) UNION retains duplicate rows; UNION ALL removes duplicate rows.",
      "B) UNION performs a duplicate elimination pass (sorting/hashing) to return only distinct rows; UNION ALL appends result sets directly, preserving all duplicates and executing significantly faster.",
      "C) UNION works only on numbers; UNION ALL works on text.",
      "D) They are identical in execution speed."
    ],
    "correctIndex": 1,
    "hint": "Which one requires an expensive deduplication sort operation?",
    "progressiveHint": "Always use UNION ALL unless duplicate elimination is explicitly required.",
    "explanation": "UNION eliminates duplicate rows between query results by sorting or hashing, introducing CPU overhead. UNION ALL simply concatenates the record streams without deduplication, offering superior performance.",
    "optionExplanations": [
      "Option A reverses the two.",
      "Option B is the precise technical distinction.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Set Operators UNION vs UNION ALL",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-60",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "What is returned by this SQL query?\nSELECT NULL = NULL;",
    "options": [
      "A) TRUE",
      "B) FALSE",
      "C) NULL (or UNKNOWN)",
      "D) 1"
    ],
    "correctIndex": 2,
    "hint": "Can two unknown quantities be asserted to be equal to each other?",
    "progressiveHint": "In three-valued logic, equality comparison with NULL always evaluates to UNKNOWN (represented as NULL).",
    "explanation": "NULL represents missing or unknown information. Since one unknown value cannot be asserted to equal another unknown value, `NULL = NULL` evaluates to UNKNOWN (NULL). Use `IS NULL` to test for nullness.",
    "optionExplanations": [
      "Option A is a common beginner assumption.",
      "Option B is false.",
      "Option C is correct. Evaluates to UNKNOWN / NULL.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - SQL Three Valued Logic Fundamentals",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-61",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Which SQL command is used to remove an existing database view from the system catalog?",
    "options": [
      "A) DELETE VIEW view_name;",
      "B) REMOVE VIEW view_name;",
      "C) DROP VIEW view_name;",
      "D) TRUNCATE VIEW view_name;"
    ],
    "correctIndex": 2,
    "hint": "Structure removals in DDL use the `DROP` keyword.",
    "progressiveHint": "`DROP TABLE`, `DROP VIEW`, `DROP INDEX`.",
    "explanation": "`DROP VIEW view_name;` is the standard DDL command to delete a view definition from the database data dictionary.",
    "optionExplanations": [
      "DELETE is DML for rows.",
      "REMOVE is not a SQL keyword.",
      "DROP VIEW: Correct DDL command.",
      "TRUNCATE applies only to tables."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Technical Round - DDL Commands",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-62",
    "topicId": "sql-basics-ddl-dml",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given table `accounts`:\n| id | balance |\n|----|---------|\n| 1  | 500     |\n| 2  | 200     |\n\nWhat is the result of running:\nUPDATE accounts SET balance = balance + 100 WHERE id = 1;\nROLLBACK;\nSELECT balance FROM accounts WHERE id = 1;",
    "options": [
      "A) 600",
      "B) 500",
      "C) NULL",
      "D) Error"
    ],
    "correctIndex": 1,
    "hint": "What does `ROLLBACK` do to uncommitted updates within a transaction block?",
    "progressiveHint": "ROLLBACK reverts all modifications made by the transaction, restoring data to its pre-transaction state.",
    "explanation": "Because `ROLLBACK` was issued before any `COMMIT`, the update adding 100 to balance is undone, restoring balance back to 500.",
    "optionExplanations": [
      "Option A assumes the transaction committed.",
      "Option B is correct. Rollback reverted the change to 500.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite NTH - Transaction Control TCL Statements",
      "role": "Project Engineer"
    }
  },
  {
    "id": "dbms-mcq-63",
    "topicId": "sql-joins",
    "difficulty": "Easy",
    "questionType": "Comparison",
    "question": "What is the primary difference between an `INNER JOIN` and a `LEFT OUTER JOIN`?",
    "options": [
      "A) INNER JOIN returns only matching rows from both tables; LEFT OUTER JOIN returns all rows from the left table plus matched rows from the right table (with NULLs for unmatched right rows).",
      "B) LEFT JOIN is faster because it does not check join conditions.",
      "C) INNER JOIN can join up to 2 tables; LEFT JOIN can join infinite tables.",
      "D) They return identical results unless ORDER BY is specified."
    ],
    "correctIndex": 0,
    "hint": "Think about what happens to records in the left table that have no partner in the right table.",
    "progressiveHint": "INNER JOIN drops unmatched left rows; LEFT JOIN keeps them with NULL right columns.",
    "explanation": "INNER JOIN retains tuples only when the join condition evaluates to TRUE on both sides. LEFT OUTER JOIN guarantees all left table rows appear in the result, padding right table columns with NULL when no match exists.",
    "optionExplanations": [
      "Option A is the canonical definition.",
      "Option B is false.",
      "Option C is false.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Inner vs Outer Joins",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-64",
    "topicId": "sql-joins",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given tables:\n`table_a`: (id) -> [1, 2]\n`table_b`: (id) -> [2, 3]\n\nHow many rows are returned by:\nSELECT * FROM table_a a FULL OUTER JOIN table_b b ON a.id = b.id;",
    "options": [
      "A) 1 row",
      "B) 2 rows",
      "C) 3 rows",
      "D) 4 rows"
    ],
    "correctIndex": 2,
    "hint": "Match: (2, 2). Left-only: (1, NULL). Right-only: (NULL, 3).",
    "progressiveHint": "FULL OUTER JOIN preserves all matched rows + all unmatched left rows + all unmatched right rows.",
    "explanation": "Row 1: a.id=2 matches b.id=2. Row 2: a.id=1 has no match (1, NULL). Row 3: b.id=3 has no match (NULL, 3). Total = 3 rows.",
    "optionExplanations": [
      "Option A is INNER JOIN (1 row).",
      "Option B is LEFT JOIN or RIGHT JOIN (2 rows).",
      "Option C is correct. FULL OUTER JOIN yields 3 rows.",
      "Option D is CROSS JOIN (4 rows)."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - Full Outer Join Cardinality",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-65",
    "topicId": "sql-joins",
    "difficulty": "Hard",
    "questionType": "SQL Output",
    "question": "Given table `nums`:\n| id |\n|----|\n| 1  |\n| 1  |\n\nHow many rows are returned by:\nSELECT * FROM nums a JOIN nums b ON a.id = b.id;",
    "options": [
      "A) 2 rows",
      "B) 4 rows",
      "C) 1 row",
      "D) 0 rows"
    ],
    "correctIndex": 1,
    "hint": "Each row in table `a` matches EVERY matching row in table `b`.",
    "progressiveHint": "Row 1 in 'a' matches Row 1 and Row 2 in 'b' (2 pairs). Row 2 in 'a' matches Row 1 and Row 2 in 'b' (2 pairs). Total = 2 x 2 = 4 rows.",
    "explanation": "Joins evaluate row-by-row Cartesian product filtered by the ON clause. Since all 2 rows on the left match all 2 rows on the right, the result is 2 * 2 = 4 rows.",
    "optionExplanations": [
      "Option A is a common mistake assuming duplicate join keys are merged.",
      "Option B is correct. 2 * 2 = 4 rows generated.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Join Multiplication on Non-Unique Keys",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-66",
    "topicId": "sql-joins",
    "difficulty": "Placement",
    "questionType": "Interview Trap",
    "question": "Given:\nSELECT *\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.order_date > '2026-01-01';\n\nWhat unexpected behavior occurs with customers who have NO orders?",
    "options": [
      "A) They appear with NULL dates as expected.",
      "B) They are completely removed from the result set, converting the LEFT JOIN into an INNER JOIN.",
      "C) The query raises a syntax error.",
      "D) The database creates dummy orders for them."
    ],
    "correctIndex": 1,
    "hint": "For customers with no orders, `o.order_date` is NULL. What does `NULL > '2026-01-01'` evaluate to?",
    "progressiveHint": "`NULL > '2026-01-01'` evaluates to UNKNOWN, which the WHERE clause rejects! Move condition to ON clause.",
    "explanation": "Because `o.order_date` is NULL for non-ordering customers, `WHERE o.order_date > ...` evaluates to UNKNOWN and filters them out. This converts the LEFT JOIN into an INNER JOIN.",
    "optionExplanations": [
      "Option A is what developers intended, but NOT what happens.",
      "Option B is correct. Classic SQL interview trap.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Accidental Inner Join via WHERE Clause Trap",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-67",
    "topicId": "sql-joins",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What is a `NATURAL JOIN` in SQL?",
    "options": [
      "A) A join performed on organic data files.",
      "B) A join that automatically matches columns that share the exact same name and data type in both tables, omitting duplicate join columns from output.",
      "C) A join that does not use foreign keys.",
      "D) A join that randomly links rows."
    ],
    "correctIndex": 1,
    "hint": "It does not require an explicit `ON` clause.",
    "progressiveHint": "Dangerous in production because adding a column to one table can silently alter the join condition.",
    "explanation": "A NATURAL JOIN implicitly joins tables on all columns with identical names in both relations, projecting the matched column only once in the result set.",
    "optionExplanations": [
      "Option A is humorous.",
      "Option B is correct. Joins on identical column names automatically.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Natural Join Mechanism",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-68",
    "topicId": "sql-joins",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given:\nTable `X`: 3 rows (all NULL)\nTable `Y`: 3 rows (all NULL)\n\nHow many rows are returned by:\nSELECT * FROM X JOIN Y ON X.val = Y.val;",
    "options": [
      "A) 9 rows",
      "B) 3 rows",
      "C) 0 rows",
      "D) 1 row"
    ],
    "correctIndex": 2,
    "hint": "Does `NULL = NULL` evaluate to TRUE in an ON join predicate?",
    "progressiveHint": "In SQL, NULL = NULL evaluates to UNKNOWN. An inner join only returns rows where the predicate is TRUE.",
    "explanation": "Because `NULL = NULL` evaluates to UNKNOWN, no rows satisfy the ON condition. The INNER JOIN returns exactly 0 rows.",
    "optionExplanations": [
      "Option A is a common trap assuming NULLs match each other.",
      "Option B is false.",
      "Option C is correct. 0 rows returned because NULL != NULL.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Joining on NULL Values",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-69",
    "topicId": "sql-joins",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is a `CROSS JOIN` between a table with M rows and a table with N rows?",
    "options": [
      "A) Returns M + N rows.",
      "B) Returns the Cartesian product with M * N rows.",
      "C) Returns M - N rows.",
      "D) Returns only matching rows."
    ],
    "correctIndex": 1,
    "hint": "Every row of table 1 is paired with every row of table 2.",
    "progressiveHint": "If table 1 has 5 rows and table 2 has 10 rows, CROSS JOIN yields 5 * 10 = 50 rows.",
    "explanation": "CROSS JOIN produces the Cartesian product of the two tables. Every row from relation 1 is paired with every row from relation 2, producing M * N total rows.",
    "optionExplanations": [
      "Option A describes UNION ALL.",
      "Option B is correct. M * N Cartesian product.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Technical Interview - Cartesian Product Cardinality",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-70",
    "topicId": "sql-joins",
    "difficulty": "Hard",
    "questionType": "Query Logic",
    "question": "What physical join algorithm is most efficient when BOTH tables are large and already pre-sorted on the join keys?",
    "options": [
      "A) Nested Loop Join",
      "B) Block Nested Loop Join",
      "C) Merge Join (Sort-Merge Join)",
      "D) Hash Join"
    ],
    "correctIndex": 2,
    "hint": "Think of the merge step in Merge Sort (two pointers walking through pre-sorted arrays in O(M+N) time).",
    "progressiveHint": "Because both relations are sorted, no in-memory hash table or sort phase is needed; a single linear scan merges both streams.",
    "explanation": "Sort-Merge Join advances pointers through both sorted tables simultaneously in O(M + N) linear time without building an in-memory hash table, making it the most efficient algorithm for pre-sorted inputs.",
    "optionExplanations": [
      "Nested Loop is O(M*N), slow for large tables.",
      "Block Nested Loop reduces I/O but is still O(M*N).",
      "Merge Join: Correct. Linear O(M+N) scan on pre-sorted data.",
      "Hash Join requires building an in-memory hash table."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - Query Optimizer Physical Join Algorithms",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-71",
    "topicId": "sql-joins",
    "difficulty": "Placement",
    "questionType": "Scenario",
    "question": "An interviewer asks: 'Write a query to find all employees who earn more than their direct managers.' Which join type is essential to solve this problem in a single query?",
    "options": [
      "A) Cross Join with a third table",
      "B) Self Join (joining the `employees` table to itself)",
      "C) Full Outer Join between employees and departments",
      "D) Natural Join on manager_id"
    ],
    "correctIndex": 1,
    "hint": "Both employee and manager are records inside the SAME table.",
    "progressiveHint": "`FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary`.",
    "explanation": "A Self Join joins the table to itself under two distinct aliases (`e` for employee, `m` for manager), allowing row-level comparison between subordinate and supervisor.",
    "optionExplanations": [
      "Option A is unnecessary and inefficient.",
      "Option B is correct. Classic Self Join canonical placement pattern.",
      "Option C does not compare manager salary.",
      "Option D fails because manager_id != id column name."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 181 / Amazon Technical Interview - Self Join",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-72",
    "topicId": "sql-joins",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given table `dept`:\n| id | name |\n|----|------|\n| 1  | Tech |\n| 2  | HR   |\n\nAnd table `emp`:\n| id | dept_id |\n|----|---------|\n| 10 | 1       |\n\nHow many rows are returned by:\nSELECT * FROM dept d RIGHT JOIN emp e ON d.id = e.dept_id;",
    "options": [
      "A) 1 row",
      "B) 2 rows",
      "C) 3 rows",
      "D) 0 rows"
    ],
    "correctIndex": 0,
    "hint": "A RIGHT JOIN preserves all rows from the RIGHT table (`emp`). How many rows are in `emp`?",
    "progressiveHint": "`emp` has 1 row, and its `dept_id=1` matches `dept.id=1`. Exactly 1 row returned.",
    "explanation": "A RIGHT JOIN preserves all rows from the right relation (`emp`). Since `emp` contains only 1 row and matches Tech, exactly 1 row is returned. (HR in the left table is dropped).",
    "optionExplanations": [
      "Option A is correct: exactly 1 row.",
      "Option B is a trap assuming HR survives in RIGHT JOIN (it would in LEFT JOIN).",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - Right Outer Join Execution",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-73",
    "topicId": "sql-joins",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What is an `Anti-Join` in relational database design?",
    "options": [
      "A) A join that corrupts the database.",
      "B) A query pattern that returns rows from the first table that have NO matching rows in the second table (typically via `LEFT JOIN ... WHERE right.id IS NULL` or `NOT EXISTS`).",
      "C) A join that only connects foreign keys to non-primary keys.",
      "D) A join that runs backwards."
    ],
    "correctIndex": 1,
    "hint": "Finding customers who never ordered, or departments with zero employees.",
    "progressiveHint": "It is the opposite of a semi-join; it returns elements in set A that are not in set B (A - B).",
    "explanation": "An Anti-Join returns rows from the left table that have zero corresponding matches in the right table. It is expressed via `LEFT JOIN ... WHERE right.key IS NULL` or `WHERE NOT EXISTS (...)`.",
    "optionExplanations": [
      "Option A is nonsensical.",
      "Option B is correct. Anti-join isolates non-matching records.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Semi-Join and Anti-Join Concepts",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-74",
    "topicId": "sql-joins",
    "difficulty": "Hard",
    "questionType": "Comparison",
    "question": "When does the Query Optimizer prefer a `Hash Join` over a `Nested Loop Join`?",
    "options": [
      "A) When both tables are very small (e.g. 5 rows).",
      "B) When joining large, unsorted datasets on an equality condition (`=`) where building an in-memory hash table of the smaller relation is cost-effective.",
      "C) When joining on range conditions (`<` or `>`).",
      "D) When indexes exist on all columns."
    ],
    "correctIndex": 1,
    "hint": "Can hash tables evaluate range inequalities like `a.val < b.val`?",
    "progressiveHint": "Hash joins only work on equi-joins (`=`). They build a hash map on the smaller build-side relation, then probe it with the larger probe-side relation.",
    "explanation": "Hash Join is chosen for large equi-joins where inputs are unsorted. The optimizer loads the smaller table into an in-memory hash table (build phase) and streams the larger table against it (probe phase).",
    "optionExplanations": [
      "Option A: Nested loop is faster for tiny tables.",
      "Option B is correct. Ideal for large, unsorted equi-joins.",
      "Option C: Hash joins cannot evaluate inequalities.",
      "Option D: Index Nested Loop would be preferred if indexes exist."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - Hash Join vs Nested Loop Optimizer Decisions",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-75",
    "topicId": "sql-joins",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `A`:\n| id |\n|----|\n| 1  |\n| 2  |\n\nAnd table `B`:\n| id |\n|----|\n| 3  |\n| 4  |\n\nHow many rows are returned by:\nSELECT * FROM A INNER JOIN B ON A.id = B.id;",
    "options": [
      "A) 4 rows",
      "B) 2 rows",
      "C) 0 rows",
      "D) 1 row"
    ],
    "correctIndex": 2,
    "hint": "Are there any overlapping IDs between {1, 2} and {3, 4}?",
    "progressiveHint": "An INNER JOIN requires matching keys. With disjoint sets, no rows match.",
    "explanation": "Since sets {1, 2} and {3, 4} have no elements in common, the join condition `A.id = B.id` is never satisfied, returning 0 rows.",
    "optionExplanations": [
      "Option A is CROSS JOIN (2 * 2 = 4).",
      "Option B is false.",
      "Option C is correct. 0 rows because join keys are disjoint.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite NTH - Inner Join with Disjoint Sets",
      "role": "Project Engineer"
    }
  },
  {
    "id": "dbms-mcq-76",
    "topicId": "sql-joins",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is a `Semi-Join` in database query processing?",
    "options": [
      "A) A join that returns only half of the columns.",
      "B) A join that returns rows from the first table for which at least one match exists in the second table, but without duplicating rows or including second-table columns (e.g. `EXISTS`).",
      "C) A join that executes in half the time.",
      "D) A join on floating point numbers."
    ],
    "correctIndex": 1,
    "hint": "Think of `SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.c_id = c.id)`.",
    "progressiveHint": "Unlike INNER JOIN, a semi-join never duplicates parent rows even if multiple child records match.",
    "explanation": "A Semi-Join checks for existence: it returns rows from table A that match at least one record in table B. Crucially, even if table B has 10 matching child rows, table A's row appears only ONCE.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is the formal relational algebra definition of Semi-Join.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Semi-Join vs Inner Join Deduplication",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-77",
    "topicId": "sql-joins",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "Can an `INNER JOIN` between two tables produce MORE rows than either input table?",
    "options": [
      "A) No, an INNER JOIN can never exceed the row count of the larger table.",
      "B) Yes, if the join keys contain duplicate values in both tables (many-to-many relationship), the output count can equal M * N.",
      "C) Only if a UNION is also present.",
      "D) Only in NoSQL graph databases."
    ],
    "correctIndex": 1,
    "hint": "If table A has five rows with `id=1` and table B has five rows with `id=1`, how many rows result from `A JOIN B ON A.id = B.id`?",
    "progressiveHint": "5 * 5 = 25 rows, which is far larger than either table's 5 rows!",
    "explanation": "Yes. When join keys are not unique (e.g. non-key columns), matching values multiply. Two tables of 1,000 duplicate rows each will produce 1,000,000 rows in an INNER JOIN.",
    "optionExplanations": [
      "Option A is a common interview misconception.",
      "Option B is correct. M * N multiplication occurs on non-unique join keys.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Join Cardinality Explosion Traps",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-78",
    "topicId": "sql-joins",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Which keyword is used in standard SQL to specify join equality when both tables have the exact same column name (e.g. `customer_id`) without repeating the table prefixes?",
    "options": [
      "A) USING (customer_id)",
      "B) MATCHING (customer_id)",
      "C) SAME AS (customer_id)",
      "D) EQUAL (customer_id)"
    ],
    "correctIndex": 0,
    "hint": "Syntax: `SELECT * FROM orders JOIN customers USING (...)`.",
    "progressiveHint": "The `USING` clause simplifies `ON a.customer_id = b.customer_id` and consolidates the column in the output.",
    "explanation": "The `USING (column_name)` clause is shorthand for equality joins where the join column has the same name in both relations. It also prevents duplicate column names in `SELECT *`.",
    "optionExplanations": [
      "`USING`: Correct ANSI SQL syntax.",
      "MATCHING is not a SQL keyword.",
      "SAME AS is invalid syntax.",
      "EQUAL is invalid syntax."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Placement - SQL USING Clause",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-79",
    "topicId": "sql-joins",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `A`:\n| id |\n|----|\n| 1  |\n| 2  |\n\nAnd table `B`:\n| id |\n|----|\n| 1  |\n\nWhat is the row count of:\nSELECT * FROM A LEFT JOIN B ON A.id = B.id;",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 0"
    ],
    "correctIndex": 1,
    "hint": "How many rows are in the LEFT table `A`? Does a LEFT JOIN preserve all rows from `A`?",
    "progressiveHint": "Table A has 2 rows (1 and 2). Row 1 matches B.id=1; Row 2 has no match and is padded with NULL. Total = 2 rows.",
    "explanation": "A LEFT JOIN preserves every row from the left table. Table A has 2 rows, so the output contains at least 2 rows. Since B has only one match for id=1, total output is 2 rows.",
    "optionExplanations": [
      "Option A is INNER JOIN count.",
      "Option B is correct. 2 rows.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Left Join Output Row Count",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-80",
    "topicId": "sql-joins",
    "difficulty": "Medium",
    "questionType": "Query Logic",
    "question": "What happens if a query specifies `SELECT * FROM table1, table2;` without a `WHERE` or `JOIN` clause?",
    "options": [
      "A) The database throws a syntax error.",
      "B) An INNER JOIN is performed automatically on primary keys.",
      "C) A Cartesian Product (CROSS JOIN) is executed, pairing every row of table1 with every row of table2.",
      "D) Only the first row of each table is returned."
    ],
    "correctIndex": 2,
    "hint": "Comma-separated table list in SQL without a WHERE clause produces what?",
    "progressiveHint": "In ANSI SQL-89 syntax, listing tables separated by commas without predicates triggers a full Cartesian product.",
    "explanation": "Omitting a join condition when querying multiple tables produces a full Cartesian Product (CROSS JOIN), generating M * N rows and potentially overwhelming server memory.",
    "optionExplanations": [
      "Option A is false; comma joins are valid SQL-89 syntax.",
      "Option B is false.",
      "Option C is correct. Executes a full Cartesian product.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Cartesian Product Hazards",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-81",
    "topicId": "sql-joins",
    "difficulty": "Hard",
    "questionType": "Scenario",
    "question": "You need to find customers who placed orders in 2025 BUT NEVER placed any orders in 2026. What is the most efficient relational join technique?",
    "options": [
      "A) INNER JOIN orders_2025 with orders_2026",
      "B) LEFT JOIN orders_2025 with orders_2026 on customer_id, filtering WHERE orders_2026.customer_id IS NULL",
      "C) CROSS JOIN both tables",
      "D) FULL OUTER JOIN without WHERE"
    ],
    "correctIndex": 1,
    "hint": "You want elements present in 2025 that do NOT exist in 2026 (Set Difference / Anti-Join).",
    "progressiveHint": "A LEFT JOIN from 2025 to 2026 followed by `WHERE right.id IS NULL` filters out returning customers.",
    "explanation": "This anti-join pattern pairs 2025 customers with 2026 orders. Customers who did not purchase in 2026 produce NULLs for 2026 columns, which `WHERE orders_2026.id IS NULL` captures cleanly.",
    "optionExplanations": [
      "Option A finds customers who ordered in BOTH years.",
      "Option B is correct. Isolates 2025 customers with zero 2026 activity.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Customer Churn & Cohort Anti-Join",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-82",
    "topicId": "sql-joins",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "Can an `OUTER JOIN` ever return FEWER rows than the left table in a `LEFT JOIN`?",
    "options": [
      "A) Yes, if the join condition is false for all rows.",
      "B) No, a LEFT JOIN is guaranteed to return AT LEAST as many rows as the left table (unless a downstream WHERE clause filters them out).",
      "C) Yes, if the right table is completely empty.",
      "D) Yes, if distinct is used."
    ],
    "correctIndex": 1,
    "hint": "Does a LEFT JOIN ever discard left rows during the join phase?",
    "progressiveHint": "Every left row is preserved; if no match exists, it is padded with NULLs. The count can only be >= left table rows.",
    "explanation": "By definition, the join phase of a LEFT JOIN preserves every row from the left table. It can produce more rows (if duplicates exist on the right), but never fewer.",
    "optionExplanations": [
      "Option A is false; unmatched rows are padded with NULL, not discarded.",
      "Option B is correct. Guaranteed >= count of left table.",
      "Option C is false; empty right table produces exactly count(left) rows.",
      "Option D is irrelevant to the join itself."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Cognizant GenC - Outer Join Invariants",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-83",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What is the primary difference between the `WHERE` clause and the `HAVING` clause?",
    "options": [
      "A) WHERE is used only in MySQL; HAVING is used in Oracle.",
      "B) WHERE filters individual rows before grouping; HAVING filters aggregate groups after `GROUP BY` has been performed.",
      "C) HAVING is executed before WHERE.",
      "D) WHERE can evaluate `AVG()` and `SUM()`, but HAVING cannot."
    ],
    "correctIndex": 1,
    "hint": "Which one can evaluate aggregate functions like `COUNT(*) > 5`?",
    "progressiveHint": "WHERE filters raw tuples; HAVING filters grouped aggregate calculations.",
    "explanation": "WHERE filters individual table records before aggregation. HAVING filters grouped summaries produced by GROUP BY and can evaluate aggregate functions like SUM, COUNT, and AVG.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is the canonical SQL distinction.",
      "Option C is backwards.",
      "Option D is backwards."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - WHERE vs HAVING Clause",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-84",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given table `sales`:\n| dept | amount |\n|------|--------|\n| A    | 100    |\n| A    | 200    |\n| B    | 50     |\n| B    | 50     |\n| C    | 400    |\n\nWhat is returned by:\nSELECT dept, SUM(amount)\nFROM sales\nGROUP BY dept\nHAVING SUM(amount) >= 300;",
    "options": [
      "A) A (300) and C (400)",
      "B) Only C (400)",
      "C) A (300), B (100), C (400)",
      "D) Only A (300)"
    ],
    "correctIndex": 0,
    "hint": "Dept A total = 100 + 200 = 300. Dept B total = 50 + 50 = 100. Dept C total = 400.",
    "progressiveHint": "The filter is `>= 300`. Both 300 and 400 satisfy the condition.",
    "explanation": "Dept A sums to 300 (>= 300 is TRUE). Dept B sums to 100 (rejected). Dept C sums to 400 (>= 300 is TRUE). Departments A and C are returned.",
    "optionExplanations": [
      "Option A is correct: Dept A (300) and Dept C (400).",
      "Option B mistakenly uses strictly greater than (>).",
      "Option C includes Dept B which fails the threshold.",
      "Option D misses Dept C."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - Aggregation and HAVING Output",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-85",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "Can a SQL query use the `HAVING` clause WITHOUT a `GROUP BY` clause?",
    "options": [
      "A) No, HAVING always requires an explicit GROUP BY clause or a syntax error is raised.",
      "B) Yes, HAVING without GROUP BY treats the entire table as a single aggregate group.",
      "C) Only if an ORDER BY clause is present.",
      "D) Only in SQLite, not in ANSI standard SQL."
    ],
    "correctIndex": 1,
    "hint": "Consider `SELECT AVG(salary) FROM employees HAVING AVG(salary) > 50000;`.",
    "progressiveHint": "When GROUP BY is omitted, the entire table is treated as one single implicit group.",
    "explanation": "In standard ANSI SQL, a HAVING clause without GROUP BY treats the entire table as a single group. If the aggregate condition is met, the aggregate result is returned; otherwise, zero rows are returned.",
    "optionExplanations": [
      "Option A is a widespread interview misconception.",
      "Option B is correct. Treats the entire relation as a single group.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - HAVING Clause without GROUP BY Trap",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-86",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Medium",
    "questionType": "Query Logic",
    "question": "In standard SQL, if a query includes `GROUP BY department`, which columns are permitted in the `SELECT` list?",
    "options": [
      "A) Any column from the table arbitrarily.",
      "B) Only the grouped column (`department`), aggregate functions (like `SUM`, `AVG`), or expressions functionally dependent on the grouped columns.",
      "C) Only integer columns.",
      "D) Columns must be wrapped in `ORDER BY`."
    ],
    "correctIndex": 1,
    "hint": "If a department has 10 employees with 10 different names, which single name would `SELECT name` return without aggregation?",
    "progressiveHint": "Under SQL-92 and strict SQL modes, non-aggregated columns must appear in the GROUP BY clause to prevent non-deterministic values.",
    "explanation": "Standard SQL requires that every column in the SELECT list must either appear in the GROUP BY clause or be enclosed within an aggregate function, preventing ambiguity.",
    "optionExplanations": [
      "Option A is non-deterministic and forbidden by strict SQL standards (ONLY_FULL_GROUP_BY).",
      "Option B is the formal ANSI SQL rule.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - ONLY_FULL_GROUP_BY Rules",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-87",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "How do standard aggregate functions (`SUM`, `AVG`, `MIN`, `MAX`) handle NULL values in a column?",
    "options": [
      "A) They throw an immediate runtime error.",
      "B) They convert NULL to 0 and include it in calculations.",
      "C) They ignore NULL values completely during calculation.",
      "D) They return NULL whenever any row contains NULL."
    ],
    "correctIndex": 2,
    "hint": "If salaries are 100, 200, and NULL, what is `AVG(salary)`: 100 or 150?",
    "progressiveHint": "100 + 200 = 300; divided by 2 non-null rows = 150. NULL is ignored.",
    "explanation": "All standard SQL aggregate functions (except `COUNT(*)`) automatically filter out and ignore NULL values before performing their computations.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is a common beginner misconception; NULL is not treated as 0 in AVG.",
      "Option C is correct. NULLs are completely ignored.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Aggregate Functions and NULL Handling",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-88",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `scores`:\n| score |\n|-------|\n| 10    |\n| 20    |\n| NULL  |\n\nWhat is the output of:\nSELECT AVG(score) FROM scores;",
    "options": [
      "A) 10",
      "B) 15",
      "C) NULL",
      "D) 30"
    ],
    "correctIndex": 1,
    "hint": "Sum = 10 + 20 = 30. How many non-null values are there: 2 or 3?",
    "progressiveHint": "Average = Sum / Non-Null Count = 30 / 2 = 15.",
    "explanation": "Because `AVG()` ignores NULLs, the divisor is 2 (the count of non-null values), not 3. Result: 30 / 2 = 15.",
    "optionExplanations": [
      "Option A is 30 / 3 (the error if NULL was treated as 0).",
      "Option B is correct: 30 / 2 = 15.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon Online Assessment - AVG Null Divisor Trap",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-89",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Medium",
    "questionType": "SQL Output",
    "question": "Given table `users`:\n| email         |\n|---------------|\n| john@work.com |\n| jane@work.com |\n| john@work.com |\n| alex@work.com |\n\nWhat query correctly finds all duplicate emails?",
    "options": [
      "A) SELECT email FROM users WHERE COUNT(email) > 1;",
      "B) SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1;",
      "C) SELECT DISTINCT email FROM users WHERE email IS NOT NULL;",
      "D) SELECT email FROM users GROUP BY email WHERE COUNT(*) > 1;"
    ],
    "correctIndex": 1,
    "hint": "Can `COUNT()` be used directly in the `WHERE` clause?",
    "progressiveHint": "Aggregates cannot be used in WHERE; you must group by email and filter with HAVING.",
    "explanation": "`SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1;` is the canonical, optimal query to identify duplicate values across relational databases.",
    "optionExplanations": [
      "Option A is invalid syntax (aggregates cannot exist in WHERE).",
      "Option B is correct. Group by email and filter with HAVING.",
      "Option C returns unique emails, not duplicates.",
      "Option D has invalid syntax order (WHERE cannot follow GROUP BY)."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 182 / Amazon Technical Round - Duplicate Emails",
      "role": "Software Development Engineer"
    }
  },
  {
    "id": "dbms-mcq-90",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Hard",
    "questionType": "Comparison",
    "question": "What is the difference between `COUNT(*)` and `COUNT(1)` in modern relational database query optimizers?",
    "options": [
      "A) COUNT(1) is always 10x faster because it does not read any columns.",
      "B) In modern query optimizers (PostgreSQL, MySQL, Oracle, SQL Server), they are internally rewritten to the exact same execution plan with identical performance.",
      "C) COUNT(*) reads the disk; COUNT(1) reads the network.",
      "D) COUNT(1) excludes NULL rows; COUNT(*) includes them."
    ],
    "correctIndex": 1,
    "hint": "Do modern query planners differentiate between counting rows and counting a constant literal 1?",
    "progressiveHint": "Optimizers recognize both as counting total row cardinality, utilizing the smallest available index.",
    "explanation": "In modern relational database engines, `COUNT(*)` and `COUNT(1)` are parsed into the identical internal plan representation and execute with zero performance difference.",
    "optionExplanations": [
      "Option A is an outdated myth from 1990s legacy engines.",
      "Option B is correct. Modern optimizers treat them identically.",
      "Option C is false.",
      "Option D is false; both count all rows."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - Database Engine Query Optimizer Facts vs Myths",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-91",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Which aggregate function returns the total number of non-null records in a specified column?",
    "options": [
      "A) TOTAL()",
      "B) COUNT(column_name)",
      "C) SUM(column_name)",
      "D) LENGTH(column_name)"
    ],
    "correctIndex": 1,
    "hint": "Differentiates from `COUNT(*)` which counts all rows.",
    "progressiveHint": "`COUNT(column_name)` counts non-null occurrences of that column.",
    "explanation": "`COUNT(column_name)` counts the number of rows where `column_name` is NOT NULL.",
    "optionExplanations": [
      "TOTAL() is a SQLite-specific floating point sum.",
      "COUNT(column_name): Correct.",
      "SUM adds numeric values together.",
      "LENGTH returns string character count."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Technical Round - SQL Aggregate Functions",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-92",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `orders`:\n| customer_id | amount |\n|-------------|--------|\n| 101         | 50     |\n| 101         | 70     |\n| 102         | 200    |\n\nWhat is the output of:\nSELECT customer_id, MAX(amount)\nFROM orders\nGROUP BY customer_id\nORDER BY customer_id ASC;",
    "options": [
      "A) 101 (70) and 102 (200)",
      "B) 101 (120) and 102 (200)",
      "C) 102 (200)",
      "D) 101 (50) and 102 (200)"
    ],
    "correctIndex": 0,
    "hint": "What is the maximum amount for customer 101: 50 or 70?",
    "progressiveHint": "Customer 101 has orders 50 and 70 -> MAX is 70. Customer 102 has 200 -> MAX is 200.",
    "explanation": "`MAX(amount)` computes the highest single order for each customer group. Customer 101 yields 70; Customer 102 yields 200.",
    "optionExplanations": [
      "Option A is correct: 101 with 70, 102 with 200.",
      "Option B uses SUM instead of MAX.",
      "Option C misses customer 101.",
      "Option D uses MIN instead of MAX."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite NTH - Group Aggregation Output",
      "role": "Project Engineer"
    }
  },
  {
    "id": "dbms-mcq-93",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Medium",
    "questionType": "Scenario",
    "question": "A table `employees` has columns `(id, department, salary)`. You want to return each department and its highest salary, but ONLY for departments with at least 5 employees. Which query is correct?",
    "options": [
      "A) SELECT department, MAX(salary) FROM employees WHERE COUNT(*) >= 5 GROUP BY department;",
      "B) SELECT department, MAX(salary) FROM employees GROUP BY department HAVING COUNT(*) >= 5;",
      "C) SELECT department, MAX(salary) FROM employees HAVING COUNT(*) >= 5;",
      "D) SELECT department, MAX(salary) FROM employees WHERE salary >= 5 GROUP BY department;"
    ],
    "correctIndex": 1,
    "hint": "Can you put `COUNT(*) >= 5` in WHERE?",
    "progressiveHint": "Group-level threshold filtering must reside in the `HAVING` clause.",
    "explanation": "Filtering by employee count per department requires grouping by department first, followed by `HAVING COUNT(*) >= 5`.",
    "optionExplanations": [
      "Option A uses aggregate in WHERE (syntax error).",
      "Option B is correct.",
      "Option C omits GROUP BY, returning only one global group.",
      "Option D filters salary value, not employee count."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC Next - Group Size Threshold Filtering",
      "role": "Digital Engineer"
    }
  },
  {
    "id": "dbms-mcq-94",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "What is returned if you execute `SELECT SUM(salary) FROM employees WHERE 1 = 0;` on an empty filtered set?",
    "options": [
      "A) 0",
      "B) NULL",
      "C) Error",
      "D) NaN"
    ],
    "correctIndex": 1,
    "hint": "What does `SUM()` return when it aggregates across zero rows?",
    "progressiveHint": "In ANSI SQL, SUM, AVG, MIN, and MAX return NULL when aggregating over zero matching rows. Only COUNT(*) returns 0.",
    "explanation": "When an aggregate function operates on an empty set, `SUM()`, `AVG()`, `MIN()`, and `MAX()` all evaluate to NULL. Only `COUNT()` evaluates to 0.",
    "optionExplanations": [
      "Option A is a very common trap; developers assume SUM over empty set is 0.",
      "Option B is correct: ANSI SQL specifies SUM returns NULL over empty sets.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Empty Set Aggregation Traps",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-95",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What happens when you group by multiple columns: `GROUP BY department, job_title`?",
    "options": [
      "A) Rows are grouped by department first, and job_title is ignored.",
      "B) A separate group is created for each unique combination of (`department`, `job_title`).",
      "C) An error is raised because GROUP BY only accepts one column.",
      "D) Rows are sorted but not aggregated."
    ],
    "correctIndex": 1,
    "hint": "Think of finding the average salary for ('Engineering', 'Manager') vs ('Engineering', 'Junior').",
    "progressiveHint": "Each distinct composite pair of (department, job_title) forms its own aggregated bucket.",
    "explanation": "Multi-column GROUP BY partitions rows into composite buckets where all rows sharing the exact same values for all listed columns belong to the same group.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Unique composite group per distinct pair.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Deloitte",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Deloitte USI - Multi-Attribute Group Aggregation",
      "role": "Technology Analyst"
    }
  },
  {
    "id": "dbms-mcq-96",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Can `DISTINCT` be used inside aggregate functions like `SUM(DISTINCT salary)`?",
    "options": [
      "A) No, DISTINCT only works immediately after SELECT.",
      "B) Yes, it eliminates duplicate values before performing the summation.",
      "C) Only in Oracle, not in other relational engines.",
      "D) Only with COUNT, not with SUM or AVG."
    ],
    "correctIndex": 1,
    "hint": "If salaries are 100, 100, and 200, what is `SUM(DISTINCT salary)`?",
    "progressiveHint": "100 + 200 = 300.",
    "explanation": "Standard SQL allows `DISTINCT` inside aggregate functions (`COUNT(DISTINCT col)`, `SUM(DISTINCT col)`, `AVG(DISTINCT col)`), stripping duplicates before the aggregate computes.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Aggregate DISTINCT Modifiers",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-97",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `t`:\n| val |\n|-----|\n| 10  |\n| 10  |\n| 20  |\n\nWhat is the output of:\nSELECT SUM(DISTINCT val) FROM t;",
    "options": [
      "A) 40",
      "B) 30",
      "C) 20",
      "D) 10"
    ],
    "correctIndex": 1,
    "hint": "Distinct values are 10 and 20.",
    "progressiveHint": "10 + 20 = 30.",
    "explanation": "The DISTINCT modifier eliminates the duplicate 10 before summing, leaving 10 + 20 = 30.",
    "optionExplanations": [
      "Option A is 10 + 10 + 20 (standard SUM without DISTINCT).",
      "Option B is correct: 10 + 20 = 30.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - SUM(DISTINCT) Evaluation",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-98",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "What is the result of `COUNT(*)` executed on a table containing 0 rows?",
    "options": [
      "A) NULL",
      "B) 0",
      "C) -1",
      "D) Throws an exception"
    ],
    "correctIndex": 1,
    "hint": "Remember: SUM, AVG, MIN, MAX return NULL on empty tables. What does COUNT return?",
    "progressiveHint": "COUNT counts occurrences. On an empty table, the count of rows is mathematically 0.",
    "explanation": "Unlike all other aggregate functions (which return NULL on an empty set), `COUNT(*)` and `COUNT(col)` always return the integer 0.",
    "optionExplanations": [
      "Option A is the trap confusing COUNT with SUM/AVG.",
      "Option B is correct. Returns 0.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Empty Relation Count Semantics",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-99",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Medium",
    "questionType": "Query Logic",
    "question": "Can an `ORDER BY` clause sort by an aggregate expression that is NOT in the `SELECT` list?",
    "options": [
      "A) No, columns sorted by ORDER BY must be explicitly projected in the SELECT list.",
      "B) Yes, in standard SQL, ORDER BY can sort by valid aggregate expressions (e.g. `ORDER BY COUNT(*) DESC`) even if not present in the SELECT clause.",
      "C) Only if DISTINCT is used.",
      "D) Only in Microsoft SQL Server."
    ],
    "correctIndex": 1,
    "hint": "Consider `SELECT department FROM employees GROUP BY department ORDER BY AVG(salary) DESC;`.",
    "progressiveHint": "Because ORDER BY executes AFTER grouping and aggregation, it has full access to aggregate calculations.",
    "explanation": "Because logical execution evaluates ORDER BY after grouping and aggregation, the query engine can sort by any valid aggregate expression even if it was not projected in SELECT.",
    "optionExplanations": [
      "Option A is a common misconception.",
      "Option B is correct and standard ANSI SQL behavior.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Technical Round - ORDER BY Aggregate Sorting",
      "role": "Software Engineer"
    }
  },
  {
    "id": "dbms-mcq-100",
    "topicId": "sql-aggregation-groupby",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "What is the result of:\nSELECT department, COUNT(*)\nFROM employees\nWHERE salary > 50000\nGROUP BY department\nHAVING COUNT(*) > 2;\n\nIf an employee earns 40,000, are they counted in `COUNT(*)` in the HAVING clause?",
    "options": [
      "A) Yes, COUNT(*) in HAVING always counts all rows in the base table.",
      "B) No, because the WHERE clause filtered out the employee BEFORE rows reached the GROUP BY and HAVING stages.",
      "C) Yes, unless an index was present.",
      "D) Only if the department has more than 5 employees."
    ],
    "correctIndex": 1,
    "hint": "Remember the execution pipeline: FROM -> WHERE -> GROUP BY -> HAVING.",
    "progressiveHint": "The WHERE clause permanently excludes rows from grouping; HAVING only counts rows that survived the WHERE filter.",
    "explanation": "The WHERE clause evaluates before GROUP BY. The employee with salary 40,000 is discarded upfront and never enters the grouping bucket or the HAVING count.",
    "optionExplanations": [
      "Option A is a common interview trap.",
      "Option B is correct. WHERE filters rows before GROUP BY and HAVING evaluate.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Pipeline Filter Sequence (WHERE before HAVING)",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-101",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What is a Scalar Subquery in SQL?",
    "options": [
      "A) A subquery that returns an entire table with multiple columns and multiple rows.",
      "B) A subquery that returns exactly ONE single value (one row and one column).",
      "C) A subquery that scales automatically across cloud nodes.",
      "D) A subquery that cannot contain a WHERE clause."
    ],
    "correctIndex": 1,
    "hint": "Think of `(SELECT MAX(salary) FROM employees)`.",
    "progressiveHint": "It can be placed anywhere a single literal constant or column expression is valid.",
    "explanation": "A scalar subquery evaluates to a single cell value (1 row, 1 column), allowing it to be used in SELECT, WHERE, and SET expressions alongside arithmetic operators.",
    "optionExplanations": [
      "Option A describes a table subquery.",
      "Option B is the formal relational definition of a Scalar Subquery.",
      "Option C confuses scalar with system scalability.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Scalar Subquery Properties",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-102",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is the key difference between a Non-Correlated Subquery and a Correlated Subquery?",
    "options": [
      "A) Non-correlated subqueries can run independently of the outer query once; Correlated subqueries reference columns from the outer query and re-evaluate for each candidate row of the outer query.",
      "B) Correlated subqueries run faster than non-correlated subqueries.",
      "C) Non-correlated subqueries cannot be used with IN.",
      "D) Correlated subqueries only work in MySQL."
    ],
    "correctIndex": 0,
    "hint": "Does the inner query reference an alias from the outer query?",
    "progressiveHint": "Correlated subqueries depend on the outer query's current row context, similar to a nested loop.",
    "explanation": "A non-correlated subquery is completely self-contained and executes once. A correlated subquery references values from the current outer row, causing it to evaluate repeatedly for each evaluated row in the outer query.",
    "optionExplanations": [
      "Option A is the canonical distinction.",
      "Option B is false; correlated subqueries often have higher overhead unless unnested by the optimizer.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Correlated vs Independent Subqueries",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-103",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "Given table `departments`:\n| id |\n|----|\n| 1  |\n| 2  |\n\nAnd subquery `SELECT dept_id FROM employees` returns values `(1, NULL)`.\nWhat is returned by:\nSELECT * FROM departments WHERE id NOT IN (SELECT dept_id FROM employees);",
    "options": [
      "A) Department 2",
      "B) No rows (Empty Result Set)",
      "C) Department 1 and 2",
      "D) An error is raised"
    ],
    "correctIndex": 1,
    "hint": "What does `id NOT IN (1, NULL)` expand to logically?",
    "progressiveHint": "`id <> 1 AND id <> NULL`. What does `anything <> NULL` evaluate to in three-valued logic?",
    "explanation": "`NOT IN (1, NULL)` expands to `id <> 1 AND id <> NULL`. For department 2: `2 <> 1` is TRUE, but `2 <> NULL` is UNKNOWN. `TRUE AND UNKNOWN` is UNKNOWN! The WHERE clause rejects all rows, returning EMPTY SET. (Always use NOT EXISTS when NULLs may exist!).",
    "optionExplanations": [
      "Option A is the most famous SQL trap in database placement history.",
      "Option B is correct. Returns 0 rows due to three-valued logic.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - The Classic NOT IN with NULL Subquery Trap",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-104",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "Why is `NOT EXISTS` generally safer and preferred over `NOT IN` when querying subqueries that might contain NULL values?",
    "options": [
      "A) NOT EXISTS uses three-valued logic while NOT IN does not.",
      "B) NOT EXISTS relies on whether rows exist (boolean TRUE/FALSE) and is completely immune to NULL values in subquery columns, unlike NOT IN which fails completely if a single NULL is present.",
      "C) NOT IN is deprecated in standard SQL.",
      "D) NOT EXISTS only works on Primary Keys."
    ],
    "correctIndex": 1,
    "hint": "Does `EXISTS` evaluate row existence or compare column values directly?",
    "progressiveHint": "EXISTS returns TRUE if at least 1 row is returned, and FALSE if 0 rows are returned. NULL column values inside the row do not alter row existence.",
    "explanation": "NOT EXISTS simply tests if the subquery returns any tuples. Since even a row of `(NULL)` represents an existing tuple, existence checks never degrade to UNKNOWN, avoiding the NOT IN NULL disaster.",
    "optionExplanations": [
      "Option A is backwards.",
      "Option B is correct. It guarantees two-valued existence semantics.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - NOT EXISTS vs NOT IN Null Safety",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-105",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `emp`:\n| id | name  | salary |\n|----|-------|--------|\n| 1  | Alice | 100    |\n| 2  | Bob   | 200    |\n| 3  | Carol | 300    |\n\nWhat is returned by:\nSELECT MAX(salary)\nFROM emp\nWHERE salary < (SELECT MAX(salary) FROM emp);",
    "options": [
      "A) 300",
      "B) 200",
      "C) 100",
      "D) NULL"
    ],
    "correctIndex": 1,
    "hint": "The inner query returns 300. What is the MAX of salaries strictly less than 300?",
    "progressiveHint": "Salaries < 300 are 100 and 200. The MAX is 200 (the Second Highest Salary).",
    "explanation": "Inner query finds 300. The outer query filters `salary < 300` and takes the maximum of the remaining subset, correctly retrieving 200.",
    "optionExplanations": [
      "Option A is the overall maximum.",
      "Option B is correct: 200 is the second highest salary.",
      "Option C is the minimum.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 176 / Amazon SDE - Second Highest Salary Query",
      "role": "Software Development Engineer"
    }
  },
  {
    "id": "dbms-mcq-106",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Medium",
    "questionType": "Query Logic",
    "question": "What is the difference between `ANY` and `ALL` operators when used with a subquery?",
    "options": [
      "A) `> ANY(subquery)` requires the value to be greater than AT LEAST ONE value in the subquery; `> ALL(subquery)` requires it to be greater than EVERY value in the subquery.",
      "B) ANY is for text; ALL is for numbers.",
      "C) ANY requires all values to match.",
      "D) They are synonymous with IN."
    ],
    "correctIndex": 0,
    "hint": "`> ANY` means greater than the MINIMUM; `> ALL` means greater than the MAXIMUM.",
    "progressiveHint": "ANY evaluates to TRUE if at least one comparison holds; ALL evaluates to TRUE only if all comparisons hold.",
    "explanation": "`> ANY` is satisfied if the value exceeds the smallest value returned by the subquery. `> ALL` is satisfied only if the value exceeds the absolute largest value returned by the subquery.",
    "optionExplanations": [
      "Option A is the formal ANSI SQL definition.",
      "Option B is false.",
      "Option C is backwards.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - ANY and ALL Quantified Subqueries",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-107",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Hard",
    "questionType": "SQL Output",
    "question": "Given table `T`:\n| val |\n|-----|\n| 10  |\n| 20  |\n| 30  |\n\nWhat is returned by:\nSELECT val FROM T WHERE val > ALL (SELECT val FROM T WHERE val < 25);",
    "options": [
      "A) 10, 20, 30",
      "B) 20, 30",
      "C) Only 30",
      "D) Empty result set"
    ],
    "correctIndex": 2,
    "hint": "The subquery `WHERE val < 25` returns {10, 20}. To be `> ALL({10, 20})`, `val` must be strictly greater than what?",
    "progressiveHint": "`val` must be greater than BOTH 10 and 20. Only 30 is strictly > 20.",
    "explanation": "Subquery outputs {10, 20}. Condition `val > ALL (10, 20)` requires `val > 20`. 10 is not > 20; 20 is not > 20; 30 IS > 20. Output is 30.",
    "optionExplanations": [
      "Option A is false.",
      "Option B mistakenly includes 20 (20 is not strictly greater than 20).",
      "Option C is correct. Exactly 30.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - ALL Operator Query Tracing",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-108",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Can a subquery be placed in the `FROM` clause of a SQL statement?",
    "options": [
      "A) No, subqueries are only allowed in WHERE and HAVING clauses.",
      "B) Yes, and it is known as a Derived Table (or Inline View), requiring an alias in standard SQL.",
      "C) Only if it contains fewer than 10 rows.",
      "D) Only in NoSQL databases."
    ],
    "correctIndex": 1,
    "hint": "Consider `SELECT * FROM (SELECT id, salary FROM employees) AS emp_subset;`.",
    "progressiveHint": "In ANSI SQL, a subquery in the FROM clause acts as a temporary virtual table.",
    "explanation": "A subquery in the FROM clause functions as a Derived Table (inline view). Standard SQL requires derived tables to be given a table alias so outer clauses can reference their columns.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Known as a Derived Table.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Placement - Derived Tables & Inline Views",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-109",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `scores`:\n| id | score |\n|----|-------|\n| 1  | 90    |\n| 2  | 80    |\n| 3  | 70    |\n\nWhat is returned by:\nSELECT COUNT(*) FROM scores WHERE score >= (SELECT AVG(score) FROM scores);",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 0"
    ],
    "correctIndex": 1,
    "hint": "Average = (90 + 80 + 70) / 3 = 80. How many scores are `>= 80`?",
    "progressiveHint": "90 and 80 are both >= 80. Exactly 2 rows.",
    "explanation": "The subquery computes average score = 80. The outer query counts rows where `score >= 80`, which are score 90 (id 1) and score 80 (id 2). Result: 2.",
    "optionExplanations": [
      "Option A is strictly greater than (> 80).",
      "Option B is correct: 90 and 80 qualify.",
      "Option C includes 70 which is < 80.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Round - Subquery Aggregate Comparison",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-110",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Medium",
    "questionType": "Conceptual",
    "question": "What is a Common Table Expression (CTE) defined with the `WITH` keyword?",
    "options": [
      "A) A permanent table written to disk.",
      "B) A named temporary result set that exists only within the execution scope of a single SQL statement, enhancing readability and enabling recursion.",
      "C) An index that speeds up joins.",
      "D) A trigger that executes on table mutations."
    ],
    "correctIndex": 1,
    "hint": "Syntax: `WITH dept_avg AS (SELECT ...) SELECT * FROM dept_avg;`.",
    "progressiveHint": "CTEs replace nested subqueries with clean, modular, top-down temporary abstractions.",
    "explanation": "A CTE (`WITH cte_name AS (...)`) defines an ephemeral, named query block valid only for the duration of the subsequent statement, greatly simplifying complex nested subqueries.",
    "optionExplanations": [
      "Option A describes a base table.",
      "Option B is correct. Temporary named result set.",
      "Option C describes a B+ tree index.",
      "Option D describes an audit trigger."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - CTE vs Nested Subqueries",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-111",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "What is the value returned by `SELECT 1 WHERE 1 NOT IN (SELECT NULL);`?",
    "options": [
      "A) 1",
      "B) Empty result set (No rows)",
      "C) NULL",
      "D) Error"
    ],
    "correctIndex": 1,
    "hint": "What does `1 NOT IN (NULL)` evaluate to in SQL boolean logic?",
    "progressiveHint": "`1 <> NULL` evaluates to UNKNOWN. The WHERE clause only outputs rows when the condition is TRUE.",
    "explanation": "Because `1 <> NULL` yields UNKNOWN, the condition is not satisfied. The query produces an empty result set with 0 rows.",
    "optionExplanations": [
      "Option A is the trap assuming 1 is not in NULL.",
      "Option B is correct. Empty result set.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - NULL Comparison in Subqueries",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-112",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Medium",
    "questionType": "Scenario",
    "question": "How can you rewrite a correlated subquery `WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id)` to improve execution performance on large datasets?",
    "options": [
      "A) You cannot rewrite it; correlated subqueries are the only way.",
      "B) By pre-computing department averages in a CTE / Derived Table with `GROUP BY dept_id` and joining it to `employees`.",
      "C) By converting the query to use UNION.",
      "D) By deleting NULL rows."
    ],
    "correctIndex": 1,
    "hint": "Instead of recalculating the average for each of the 1,000,000 employee rows, compute it ONCE per department.",
    "progressiveHint": "Pre-aggregating in a JOIN or using window functions (`AVG(salary) OVER (PARTITION BY dept_id)`) avoids O(N*M) repeated subquery executions.",
    "explanation": "Unnesting the subquery into a pre-aggregated CTE or derived table with `GROUP BY dept_id` computes the department average once per department rather than re-computing it for every single employee row.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Classic query optimization rewrite.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - Correlated Subquery Optimization & Unnesting",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-113",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `nums`:\n| x  |\n|----|\n| 5  |\n| 10 |\n| 15 |\n\nWhat is returned by:\nSELECT x FROM nums WHERE x = (SELECT MIN(x) FROM nums);",
    "options": [
      "A) 5",
      "B) 10",
      "C) 15",
      "D) 5, 10, 15"
    ],
    "correctIndex": 0,
    "hint": "What is `MIN(x)`?",
    "progressiveHint": "`MIN(x)` is 5. `WHERE x = 5` returns 5.",
    "explanation": "The scalar subquery evaluates to 5. The outer query filters `WHERE x = 5`, returning 5.",
    "optionExplanations": [
      "Option A is correct: 5.",
      "Option B is the median.",
      "Option C is the maximum.",
      "Option D is all rows."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - Scalar Subquery Point Query",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-114",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "Can a subquery inside an `EXISTS (SELECT ...)` clause select `SELECT 1/0` without throwing a division-by-zero error?",
    "options": [
      "A) It always throws a fatal division by zero error immediately.",
      "B) In many optimizers (PostgreSQL, Oracle), if the underlying table is empty, or because EXISTS only checks row existence without evaluating expressions, it may succeed without evaluating `1/0`.",
      "C) EXISTS forbids numbers.",
      "D) SQL does not support EXISTS."
    ],
    "correctIndex": 1,
    "hint": "Does `EXISTS` need to evaluate column values in the SELECT list, or just check if a tuple exists?",
    "progressiveHint": "Optimizers rewrite `EXISTS (SELECT ...)` to ignore the SELECT projection list entirely.",
    "explanation": "The query optimizer ignores the SELECT projection list in an `EXISTS` clause because it only tests for row existence (cardinality > 0), so expressions like `SELECT 1/0` or `SELECT *` are not evaluated.",
    "optionExplanations": [
      "Option A is a common developer assumption.",
      "Option B is correct. Demonstrates query optimizer short-circuiting.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - EXISTS Projection Pruning Optimization",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-115",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is the difference between a Correlated Subquery and a Window Function (e.g. `ROW_NUMBER()` or `RANK()`)?",
    "options": [
      "A) Window functions operate on partitions of data across the result set in a single linear pass without collapsing rows; Correlated subqueries re-query the table repeatedly for each row.",
      "B) Window functions delete rows from disk.",
      "C) Correlated subqueries cannot be used in PostgreSQL.",
      "D) There is no difference."
    ],
    "correctIndex": 0,
    "hint": "Think about how `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` works.",
    "progressiveHint": "Window functions evaluate partitions in a single scan, delivering dramatically superior performance over correlated subqueries.",
    "explanation": "Window functions process data across a specified window/partition in a single pass while preserving individual row identity, avoiding the quadratic O(N^2) overhead of correlated subqueries.",
    "optionExplanations": [
      "Option A is the formal architectural difference.",
      "Option B is false.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Window Functions vs Correlated Subqueries",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-116",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "Which clause CANNOT contain a subquery in standard SQL?",
    "options": [
      "A) SELECT",
      "B) FROM",
      "C) WHERE",
      "D) All of the above CAN contain subqueries"
    ],
    "correctIndex": 3,
    "hint": "Can you have a scalar subquery in SELECT? A derived table in FROM? A predicate subquery in WHERE?",
    "progressiveHint": "SQL is fully compositional; subqueries are permitted in SELECT, FROM, WHERE, HAVING, and INSERT statements.",
    "explanation": "Standard SQL is orthogonal and compositional: subqueries are supported in SELECT (scalar), FROM (derived table), WHERE, and HAVING clauses.",
    "optionExplanations": [
      "Option A, B, and C all permit subqueries.",
      "Option D is correct: all of them can contain subqueries."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Placement - Subquery Placement Rules",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-117",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Placement",
    "questionType": "SQL Output",
    "question": "Given table `items`:\n| id | price |\n|----|-------|\n| 1  | 100   |\n| 2  | 200   |\n| 3  | 300   |\n\nWhat is returned by:\nSELECT id FROM items WHERE price > (SELECT MIN(price) FROM items) AND price < (SELECT MAX(price) FROM items);",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 1, 2, 3"
    ],
    "correctIndex": 1,
    "hint": "MIN is 100, MAX is 300. Which item has price strictly between 100 and 300?",
    "progressiveHint": "Only id 2 (price 200) satisfies `price > 100 AND price < 300`.",
    "explanation": "Item 1 has price 100 (not > 100). Item 3 has price 300 (not < 300). Item 2 has price 200, which satisfies both predicates. Result: 2.",
    "optionExplanations": [
      "Option A is the minimum.",
      "Option B is correct. Item 2.",
      "Option C is the maximum.",
      "Option D includes the boundary extremes."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite NTH - Compound Subquery Filtering",
      "role": "Project Engineer"
    }
  },
  {
    "id": "dbms-mcq-118",
    "topicId": "sql-subqueries-nested",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "What happens if a scalar subquery used in a WHERE equality comparison (`WHERE salary = (SELECT salary FROM employees WHERE ... )`) returns MORE than one row?",
    "options": [
      "A) The database picks the first row silently.",
      "B) The database throws a runtime error: 'subquery returns more than 1 row'.",
      "C) It automatically converts to an IN clause.",
      "D) It returns NULL."
    ],
    "correctIndex": 1,
    "hint": "Can a scalar operator (`=`) compare a single value against multiple rows simultaneously?",
    "progressiveHint": "Single-row comparison operators (`=`, `<`, `>`) require the subquery to produce exactly <= 1 row at runtime.",
    "explanation": "If a subquery evaluated in a scalar comparison context returns multiple rows, the relational engine raises a runtime cardinality violation error: 'more than one row returned by a subquery used as an expression'.",
    "optionExplanations": [
      "Option A is non-standard and dangerous.",
      "Option B is correct. Throws a runtime subquery cardinality error.",
      "Option C is false.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Scalar Subquery Cardinality Violation Trap",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-119",
    "topicId": "normalization",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What is the primary objective of Database Normalization?",
    "options": [
      "A) Increasing the storage space on hard drives.",
      "B) Minimizing data redundancy and avoiding insertion, update, and deletion anomalies.",
      "C) Encrypting sensitive passwords.",
      "D) Replacing SQL queries with Python code."
    ],
    "correctIndex": 1,
    "hint": "Think about why storing the department name in every employee row causes update bugs.",
    "progressiveHint": "Normalization decomposes relations to ensure every fact is recorded in exactly one place.",
    "explanation": "Normalization organizes relational tables to eliminate redundant data and prevent modification anomalies (insertion, deletion, and update anomalies).",
    "optionExplanations": [
      "Option A is backwards.",
      "Option B is correct. Eliminates redundancy and update anomalies.",
      "Option C and D are unrelated concepts."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Goals of Relational Normalization",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-120",
    "topicId": "normalization",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "A relation is in First Normal Form (1NF) if and only if:",
    "options": [
      "A) It has no foreign keys.",
      "B) Every attribute contains only atomic (indivisible) values, and there are no repeating groups.",
      "C) All attributes depend on the entire candidate key.",
      "D) It has B+ tree indexes."
    ],
    "correctIndex": 1,
    "hint": "Can a column contain a comma-separated list of items like 'Java, SQL, Python' in 1NF?",
    "progressiveHint": "1NF mandates atomic domains: each cell holds exactly one single value.",
    "explanation": "First Normal Form requires that each attribute value must be atomic (no sets, lists, or composite repeating groups) and each row must be uniquely identifiable.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Atomic values and no repeating groups.",
      "Option C describes 2NF.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - First Normal Form 1NF Definition",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-121",
    "topicId": "normalization",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What type of dependency is forbidden in Second Normal Form (2NF)?",
    "options": [
      "A) Transitive Dependency",
      "B) Partial Dependency (where a non-prime attribute depends on only a proper subset of a composite candidate key)",
      "C) Multi-valued Dependency",
      "D) Trivial Dependency"
    ],
    "correctIndex": 1,
    "hint": "2NF = 1NF + No Partial Dependency.",
    "progressiveHint": "Every non-prime attribute must depend on the FULL candidate key, not part of it.",
    "explanation": "A relation is in 2NF if it is in 1NF and contains no Partial Functional Dependencies—meaning no non-prime attribute depends on a proper subset of any candidate key.",
    "optionExplanations": [
      "Transitive Dependency is forbidden in 3NF.",
      "Partial Dependency: Correct. Forbidden in 2NF.",
      "Multi-valued Dependency is handled in 4NF.",
      "Trivial Dependency (A -> A) is always valid."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - 2NF Partial Dependency Rules",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-122",
    "topicId": "normalization",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What type of dependency is eliminated when progressing from 2NF to Third Normal Form (3NF)?",
    "options": [
      "A) Partial Dependency",
      "B) Transitive Dependency (where X -> Y and Y -> Z, with X not determining Z directly)",
      "C) Atomic Dependency",
      "D) Join Dependency"
    ],
    "correctIndex": 1,
    "hint": "3NF rule: 'Every attribute must depend on the key, the whole key, and nothing but the key.'",
    "progressiveHint": "Eliminates non-prime attributes determining other non-prime attributes.",
    "explanation": "3NF eliminates Transitive Dependencies, ensuring that non-prime attributes depend ONLY on candidate keys, never on other non-prime attributes.",
    "optionExplanations": [
      "Partial Dependency is eliminated in 2NF.",
      "Transitive Dependency: Correct. Eliminated in 3NF.",
      "Atomic Dependency is nonsensical.",
      "Join Dependency is handled in 5NF."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite NTH - 3NF Transitive Dependency Elimination",
      "role": "Project Engineer"
    }
  },
  {
    "id": "dbms-mcq-123",
    "topicId": "normalization",
    "difficulty": "Hard",
    "questionType": "Comparison",
    "question": "What makes Boyce-Codd Normal Form (BCNF) strictly stronger than Third Normal Form (3NF)?",
    "options": [
      "A) BCNF allows partial dependencies.",
      "B) For every non-trivial functional dependency X -> Y, BCNF strictly requires X to be a Superkey, whereas 3NF permits Y to be a prime attribute even if X is not a superkey.",
      "C) BCNF does not require 1NF.",
      "D) BCNF requires tables to have no primary keys."
    ],
    "correctIndex": 1,
    "hint": "What is the exception clause in 3NF that BCNF eliminates?",
    "progressiveHint": "In 3NF, X -> Y is allowed if X is superkey OR Y is prime. BCNF removes the 'OR Y is prime' loophole.",
    "explanation": "3NF allows `X -> Y` if either X is a superkey OR Y is a prime attribute (part of a candidate key). BCNF eliminates this exception, mandating that the determinant X MUST always be a superkey.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is the precise mathematical definition distinguishing 3NF and BCNF.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - 3NF vs BCNF Determinant Strictness",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-124",
    "topicId": "normalization",
    "difficulty": "Placement",
    "questionType": "Normalization",
    "question": "Given Relation `R(A, B, C, D)` with Primary Key `(A, B)`.\nFunctional Dependencies:\n(A, B) -> C\nB -> D\n\nWhich Normal Form does relation R violate?",
    "options": [
      "A) 1NF",
      "B) 2NF (due to partial dependency B -> D)",
      "C) It is already in BCNF",
      "D) 4NF"
    ],
    "correctIndex": 1,
    "hint": "Look at dependency `B -> D`. Is B the whole primary key or a subset?",
    "progressiveHint": "B is a proper subset of candidate key (A, B). Since D is non-prime and depends on part of the key, it is a Partial Dependency.",
    "explanation": "The dependency `B -> D` is a Partial Dependency because attribute D depends on B alone, which is a proper subset of the composite candidate key `(A, B)`. This directly violates 2NF.",
    "optionExplanations": [
      "1NF is satisfied assuming atomic attributes.",
      "2NF: Correct. Violated by partial dependency B -> D.",
      "Option C is false.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Identifying Normal Form Violations",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-125",
    "topicId": "normalization",
    "difficulty": "Placement",
    "questionType": "Normalization",
    "question": "Given Relation `R(Emp_ID, Dept_ID, Dept_Name)` where `Emp_ID` is Primary Key.\nFDs:\nEmp_ID -> Dept_ID\nDept_ID -> Dept_Name\n\nWhich Normal Form is violated?",
    "options": [
      "A) 1NF",
      "B) 2NF",
      "C) 3NF (due to transitive dependency Emp_ID -> Dept_ID -> Dept_Name)",
      "D) None, it is in BCNF"
    ],
    "correctIndex": 2,
    "hint": "Emp_ID determines Dept_ID, and Dept_ID determines Dept_Name.",
    "progressiveHint": "Since Primary Key is single-column (Emp_ID), 2NF is satisfied. But Dept_Name depends on Dept_ID (non-key), forming a Transitive Dependency.",
    "explanation": "The relation is in 2NF (no composite key, so no partial dependencies). However, `Dept_ID -> Dept_Name` represents a Transitive Dependency between non-key attributes, violating 3NF.",
    "optionExplanations": [
      "Option A and B are satisfied.",
      "Option C is correct. Violated 3NF by transitive dependency.",
      "Option D is false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Transitive Dependency Decomposition",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-126",
    "topicId": "normalization",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "Can every relational schema decomposed into BCNF guarantee both Lossless Join AND Dependency Preservation?",
    "options": [
      "A) Yes, BCNF always preserves all dependencies and guarantees lossless joins.",
      "B) No; while Lossless Join can always be achieved in BCNF, Dependency Preservation cannot always be guaranteed (unlike 3NF, which guarantees both).",
      "C) BCNF does not guarantee lossless joins.",
      "D) Only 1NF guarantees lossless joins."
    ],
    "correctIndex": 1,
    "hint": "Why do many database designs stop at 3NF rather than pushing to BCNF?",
    "progressiveHint": "In BCNF, some functional dependencies across overlapping candidate keys cannot be verified without performing expensive multi-table joins.",
    "explanation": "3NF guarantees BOTH Lossless Join and Dependency Preservation. BCNF guarantees Lossless Join, but CANNOT always preserve functional dependencies without requiring cross-table join constraints.",
    "optionExplanations": [
      "Option A is a major interview misconception.",
      "Option B is the fundamental theoretical trade-off between 3NF and BCNF.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - 3NF vs BCNF Dependency Preservation Trade-off",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-127",
    "topicId": "normalization",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "If a relation has ONLY single-attribute (simple) candidate keys and is in 1NF, which Normal Form is it AUTOMATICALLY in?",
    "options": [
      "A) Automatically in 2NF",
      "B) Automatically in 3NF",
      "C) Automatically in BCNF",
      "D) Automatically in 4NF"
    ],
    "correctIndex": 0,
    "hint": "Partial dependencies require a COMPOSITE key to exist.",
    "progressiveHint": "Since a single column has no proper subsets, partial dependency is mathematically impossible.",
    "explanation": "Partial dependency requires a non-prime attribute to depend on a proper subset of a composite candidate key. If all candidate keys are single columns, no partial dependencies can exist, so 2NF is automatically satisfied.",
    "optionExplanations": [
      "2NF: Correct. Mathematical guarantee for single-attribute candidate keys.",
      "3NF is not guaranteed (transitive dependencies may still exist).",
      "BCNF is not guaranteed.",
      "4NF is not guaranteed."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - 2NF Automatic Satisfaction",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-128",
    "topicId": "normalization",
    "difficulty": "Medium",
    "questionType": "Conceptual",
    "question": "What is a Lossless-Join Decomposition?",
    "options": [
      "A) A decomposition where no data packets are lost across network cables.",
      "B) A decomposition of relation R into R1 and R2 such that joining R1 and R2 using NATURAL JOIN produces exactly the original relation R with zero spurious (phantom) tuples.",
      "C) A join that takes 0 milliseconds.",
      "D) Decomposing into 10 separate databases."
    ],
    "correctIndex": 1,
    "hint": "`R1 ⨝ R2 = R`.",
    "progressiveHint": "Lossless means no information loss and no false synthetic rows created.",
    "explanation": "A decomposition is Lossless (or non-additive) if the natural join of the decomposed relations reproduces the exact original relation without creating false spurious tuples.",
    "optionExplanations": [
      "Option A describes network integrity.",
      "Option B is the formal relational algebra definition.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Lossless Join Property Test",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-129",
    "topicId": "normalization",
    "difficulty": "Hard",
    "questionType": "Normalization",
    "question": "What is the necessary and sufficient condition for a decomposition of R into R1 and R2 to be a Lossless Join Decomposition?",
    "options": [
      "A) (R1 ∩ R2) must be empty.",
      "B) (R1 ∩ R2) -> R1 OR (R1 ∩ R2) -> R2 must be in the functional dependency closure F+ (the common attribute must be a superkey of at least one relation).",
      "C) Both R1 and R2 must have the exact same number of rows.",
      "D) R1 and R2 must share at least three columns."
    ],
    "correctIndex": 1,
    "hint": "The shared attribute must uniquely identify tuples in at least one of the decomposed tables.",
    "progressiveHint": "Common attributes `(R1 ∩ R2)` must functionally determine either all of R1 or all of R2.",
    "explanation": "A binary decomposition is lossless if and only if the intersection of attributes `(R1 ∩ R2)` forms a superkey of either R1 or R2.",
    "optionExplanations": [
      "Option A would cause a full Cartesian product with massive spurious tuples.",
      "Option B is the fundamental mathematical theorem for lossless joins.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Lossless Join Intersection Superkey Proof",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-130",
    "topicId": "normalization",
    "difficulty": "Placement",
    "questionType": "Scenario",
    "question": "Why do high-throughput analytical data warehouses (like Snowflake or Amazon Redshift) deliberately DENORMALIZE tables into Star or Snowflake schemas?",
    "options": [
      "A) Because analytical databases do not support primary keys.",
      "B) To minimize expensive multi-table JOIN operations during read-heavy analytical aggregations, trading increased storage redundancy for faster query execution.",
      "C) Because normalization causes syntax errors in SQL.",
      "D) To prevent users from issuing SELECT queries."
    ],
    "correctIndex": 1,
    "hint": "OLTP prioritizes fast writes without redundancy; OLAP prioritizes fast reads across billions of rows.",
    "progressiveHint": "Denormalization pre-joins dimension attributes into fact tables to eliminate run-time join overhead.",
    "explanation": "Analytical systems (OLAP) are read-dominated. Denormalization reduces expensive multi-table joins across billions of rows, drastically improving query scan speeds at the cost of duplicate storage.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Core data warehousing architecture trade-off.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Redshift - OLTP Normalization vs OLAP Denormalization",
      "role": "Data Engineer / SDE"
    }
  },
  {
    "id": "dbms-mcq-131",
    "topicId": "normalization",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What is an Insertion Anomaly?",
    "options": [
      "A) When an INSERT statement takes longer than 1 second.",
      "B) Inability to insert legitimate facts about an entity without artificially inserting unrelated data about a different entity (e.g. cannot add a new department without assigning an employee to it).",
      "C) Inserting text into an integer column.",
      "D) Running out of disk space."
    ],
    "correctIndex": 1,
    "hint": "If a department exists but has zero employees, can you record it in a table where (emp_id, dept_id) is the primary key?",
    "progressiveHint": "Because primary key cannot be NULL, you are blocked from recording the department alone.",
    "explanation": "An Insertion Anomaly occurs in unnormalized tables when certain facts cannot be recorded without simultaneously recording unrelated data, often blocked by primary key NOT NULL constraints.",
    "optionExplanations": [
      "Option A describes performance lag.",
      "Option B is the formal relational definition of an Insertion Anomaly.",
      "Option C describes a type mismatch error.",
      "Option D is hardware exhaustion."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Modification Anomalies",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-132",
    "topicId": "normalization",
    "difficulty": "Medium",
    "questionType": "Conceptual",
    "question": "What is Fourth Normal Form (4NF) designed to eliminate?",
    "options": [
      "A) Multi-Valued Dependencies (MVDs)",
      "B) Primary keys",
      "C) Atomic attributes",
      "D) B+ tree indexes"
    ],
    "correctIndex": 0,
    "hint": "Consider an instructor who teaches multiple subjects AND speaks multiple languages independently.",
    "progressiveHint": "4NF deals with independent multi-valued facts (A ->> B and A ->> C) stored in the same relation.",
    "explanation": "Fourth Normal Form (4NF) addresses Multi-Valued Dependencies (MVDs), decomposing relations where two or more independent multi-valued facts about an entity are inappropriately bundled together.",
    "optionExplanations": [
      "Multi-Valued Dependencies: Correct. Eliminated in 4NF.",
      "Option B, C, and D are false."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Cognizant GenC - Advanced Normal Forms 4NF and 5NF",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-133",
    "topicId": "normalization",
    "difficulty": "Hard",
    "questionType": "Normalization",
    "question": "Given Relation R(A, B, C) with FDs:\nA -> B\nB -> C\nC -> A\nWhat is the highest normal form of relation R?",
    "options": [
      "A) 1NF",
      "B) 2NF",
      "C) 3NF",
      "D) BCNF"
    ],
    "correctIndex": 3,
    "hint": "Calculate the candidate keys of R.",
    "progressiveHint": "(A)+ = {A,B,C}, (B)+ = {B,C,A}, (C)+ = {C,A,B}. All three attributes {A}, {B}, and {C} are candidate keys!",
    "explanation": "Because {A}, {B}, and {C} are all individual candidate keys, the determinant of every functional dependency (A, B, and C) is a Superkey. Therefore, R is in BCNF.",
    "optionExplanations": [
      "Option A, B, and C are lower forms.",
      "Option D is correct. All determinants are superkeys, satisfying BCNF."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "GATE / Amazon SDE - Cyclic FDs and BCNF Verification",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-134",
    "topicId": "normalization",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is a Deletion Anomaly?",
    "options": [
      "A) Accidentally dropping the wrong database table.",
      "B) Deleting one fact inadvertently causes the unintended loss of other completely independent facts (e.g. deleting the last student enrolled in a course deletes all course details).",
      "C) Deleting records without an index.",
      "D) When DELETE takes longer than TRUNCATE."
    ],
    "correctIndex": 1,
    "hint": "If a department has only one employee, and that employee leaves, what happens to the department record in an unnormalized table?",
    "progressiveHint": "Deleting the employee row wipes out the department name and details along with it.",
    "explanation": "A Deletion Anomaly occurs in poorly normalized designs when removing one piece of information unintentionally destroys separate, valuable business facts.",
    "optionExplanations": [
      "Option A describes administrative human error.",
      "Option B is the formal relational definition.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Deletion Anomaly Scenarios",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-135",
    "topicId": "normalization",
    "difficulty": "Hard",
    "questionType": "Conceptual",
    "question": "What is the closure of an attribute set X (denoted X+) with respect to a set of functional dependencies F?",
    "options": [
      "A) The number of tables that reference X.",
      "B) The set of all attributes that are functionally determined by X under F (applying Armstrong's Axioms).",
      "C) The physical index on X.",
      "D) The list of deleted keys."
    ],
    "correctIndex": 1,
    "hint": "How do you test if X is a candidate key?",
    "progressiveHint": "If X+ contains every attribute in the relation, then X is a superkey.",
    "explanation": "The attribute closure X+ is the complete set of attributes that can be inferred from X using Armstrong's axioms (reflexivity, augmentation, transitivity).",
    "optionExplanations": [
      "Option A is false.",
      "Option B is the formal definition of attribute closure.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Attribute Closure & Candidate Key Derivation",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-136",
    "topicId": "normalization",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "Is it always advisable to normalize every relational table to the highest possible normal form (5NF/6NF)?",
    "options": [
      "A) Yes, academic purity mandates 5NF in all commercial production systems.",
      "B) No, over-normalization increases the number of small tables, requiring complex multi-table JOINs that can degrade OLTP/OLAP query read performance; 3NF/BCNF is typically the pragmatic sweet spot.",
      "C) No, because 5NF is illegal in SQL.",
      "D) Yes, higher normal forms always run faster."
    ],
    "correctIndex": 1,
    "hint": "What is the cost of joining 10 tables together for a simple customer profile display?",
    "progressiveHint": "Every join incurs memory, CPU, and index lookup overhead. 3NF balances redundancy elimination with join cost.",
    "explanation": "Over-normalizing introduces excessive fragmentation and join overhead. Most enterprise relational architectures normalize to 3NF or BCNF, balancing integrity with pragmatic query performance.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is the core systems engineering reality.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - Real-World Normalization Engineering Trade-offs",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-137",
    "topicId": "transactions-acid",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What does the 'A' in ACID properties stand for, and what does it guarantee?",
    "options": [
      "A) Availability: The database is online 24/7.",
      "B) Atomicity: All operations in a transaction execute successfully to completion, or none do (All-or-Nothing).",
      "C) Authentication: Users must enter passwords.",
      "D) Asynchrony: Operations run without blocking."
    ],
    "correctIndex": 1,
    "hint": "If a bank transfer deducts from A but fails before crediting B, what property reverts the deduction?",
    "progressiveHint": "Atomicity prevents partial execution of transactions.",
    "explanation": "Atomicity ensures that a transaction is treated as a single, indivisible unit of work: either all its modifications are permanently recorded, or the entire transaction is rolled back.",
    "optionExplanations": [
      "Option A describes distributed systems availability.",
      "Option B is correct. All-or-nothing execution.",
      "Option C describes security.",
      "Option D describes asynchronous I/O."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - ACID Properties Definitions",
      "role": "Ninja Developer"
    }
  },
  {
    "id": "dbms-mcq-138",
    "topicId": "transactions-acid",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is the difference between Atomicity and Durability in the ACID model?",
    "options": [
      "A) Atomicity guarantees that once committed, data survives power failures; Durability guarantees all-or-nothing execution.",
      "B) Atomicity guarantees all-or-nothing execution; Durability guarantees that once a transaction commits, its updates persist permanently on non-volatile storage even after a system crash.",
      "C) They are identical concepts.",
      "D) Durability applies only to RAM buffer pool."
    ],
    "correctIndex": 1,
    "hint": "Atomicity = Undo uncommitted; Durability = Redo committed after crash.",
    "progressiveHint": "Durability is achieved through Write-Ahead Logging (WAL) flushed to persistent disk before acknowledge.",
    "explanation": "Atomicity ensures incomplete transactions are completely undone if a failure occurs. Durability guarantees that once a transaction commits, its modifications can never be lost, even during sudden hardware power outages.",
    "optionExplanations": [
      "Option A reverses the definitions.",
      "Option B is the precise technical distinction.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - ACID Atomicity vs Durability",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-139",
    "topicId": "transactions-acid",
    "difficulty": "Medium",
    "questionType": "Conceptual",
    "question": "What does the 'Consistency' property in ACID guarantee?",
    "options": [
      "A) The database is always fast.",
      "B) A transaction transitions the database from one valid state satisfying all declared integrity constraints (primary keys, foreign keys, CHECK constraints) to another valid state.",
      "C) All tables have the same number of rows.",
      "D) All servers have the same clock time."
    ],
    "correctIndex": 1,
    "hint": "What happens if a transaction tries to insert an age of -5 when a `CHECK (age > 0)` constraint exists?",
    "progressiveHint": "Consistency guarantees that database invariants and business rules are never violated.",
    "explanation": "Consistency ensures a transaction can only bring the database from one valid state to another, maintaining all schema constraints, cascades, and business rules.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is the formal definition of Consistency.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - Consistency Invariants in Transactions",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-140",
    "topicId": "transactions-acid",
    "difficulty": "Hard",
    "questionType": "Comparison",
    "question": "What is the Dirty Read concurrency anomaly, and which SQL Isolation Level permits it?",
    "options": [
      "A) A transaction reads data modified by an uncommitted concurrent transaction that might subsequently be rolled back; permitted under `READ UNCOMMITTED`.",
      "B) A transaction reads old cached data from disk; permitted under `SERIALIZABLE`.",
      "C) A transaction reads duplicate rows; permitted under `REPEATABLE READ`.",
      "D) A transaction reads deleted tables; permitted under `READ COMMITTED`."
    ],
    "correctIndex": 0,
    "hint": "If T1 updates salary to 90k, T2 reads 90k, and then T1 aborts/rolls back, T2 has read dirty phantom data.",
    "progressiveHint": "`READ UNCOMMITTED` is the only standard level that allows reading uncommitted dirty pages.",
    "explanation": "A Dirty Read occurs when transaction T2 reads uncommitted modifications made by T1. If T1 rolls back, T2 has operated on invalid data that never truly existed. Only `READ UNCOMMITTED` permits this anomaly.",
    "optionExplanations": [
      "Option A is the formal ANSI SQL definition.",
      "Option B, C, and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Transaction Isolation Levels & Dirty Reads",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-141",
    "topicId": "transactions-acid",
    "difficulty": "Hard",
    "questionType": "Comparison",
    "question": "What is a Non-Repeatable Read (Fuzzy Read) anomaly?",
    "options": [
      "A) A transaction reads the same row twice and observes that its column values were modified or deleted by another committed concurrent transaction.",
      "B) A transaction fails to repeat a query due to syntax error.",
      "C) A transaction reads from two different databases.",
      "D) When a transaction aborts during a loop."
    ],
    "correctIndex": 0,
    "hint": "T1 reads row X (balance=100). T2 updates row X to 200 and COMMITS. T1 re-reads row X and sees 200.",
    "progressiveHint": "Prevented by `REPEATABLE READ` and `SERIALIZABLE` levels.",
    "explanation": "A Non-Repeatable Read occurs when a transaction reads an existing row twice within its transaction scope and sees altered column data because a concurrent transaction modified and committed that row in between.",
    "optionExplanations": [
      "Option A is the formal ANSI SQL definition.",
      "Option B, C, and D are false."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft - Transaction Concurrency Anomalies",
      "role": "Software Engineer"
    }
  },
  {
    "id": "dbms-mcq-142",
    "topicId": "transactions-acid",
    "difficulty": "Hard",
    "questionType": "Comparison",
    "question": "What is a Phantom Read anomaly?",
    "options": [
      "A) A transaction reads ghost tables dropped last year.",
      "B) A transaction re-executes a range query (`WHERE ...`) and discovers NEW additional rows inserted and committed by another concurrent transaction that satisfy the search predicate.",
      "C) A transaction loses network connection to the server.",
      "D) Reading from an uncommitted write."
    ],
    "correctIndex": 1,
    "hint": "Compare with Non-Repeatable Read: Non-Repeatable modifies an EXISTING row; Phantom INSERTS a brand new row into a range query.",
    "progressiveHint": "Only `SERIALIZABLE` isolation strictly prevents phantom reads under ANSI SQL standards (or Range Locks / MVCC snapshot isolation).",
    "explanation": "A Phantom Read occurs when transaction T1 queries a range of rows (`WHERE salary > 50000`), and a concurrent transaction T2 inserts a new row matching that range and commits. When T1 re-runs the range query, new 'phantom' rows appear.",
    "optionExplanations": [
      "Option A is humorous.",
      "Option B is the formal ANSI SQL definition of Phantom Read.",
      "Option C and D describe other concepts."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Phantom Reads vs Non-Repeatable Reads",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-143",
    "topicId": "transactions-acid",
    "difficulty": "Placement",
    "questionType": "Comparison",
    "question": "Rank the standard SQL Transaction Isolation Levels from LOWEST isolation (most permissive) to HIGHEST isolation (strict serializability):",
    "options": [
      "A) READ COMMITTED -> READ UNCOMMITTED -> REPEATABLE READ -> SERIALIZABLE",
      "B) READ UNCOMMITTED -> READ COMMITTED -> REPEATABLE READ -> SERIALIZABLE",
      "C) SERIALIZABLE -> REPEATABLE READ -> READ COMMITTED -> READ UNCOMMITTED",
      "D) REPEATABLE READ -> READ COMMITTED -> SERIALIZABLE -> READ UNCOMMITTED"
    ],
    "correctIndex": 1,
    "hint": "Lowest level permits dirty reads; highest level guarantees serial schedule equivalency.",
    "progressiveHint": "READ UNCOMMITTED (permits dirty read) -> READ COMMITTED (default in PG/Oracle) -> REPEATABLE READ (default in MySQL) -> SERIALIZABLE.",
    "explanation": "ANSI SQL-92 defines 4 isolation levels in ascending order of strictness: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE.",
    "optionExplanations": [
      "Option A inverts the first two.",
      "Option B is the correct ascending order.",
      "Option C is descending order.",
      "Option D is scrambled."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - SQL Isolation Level Hierarchy",
      "role": "Systems Engineer"
    }
  },
  {
    "id": "dbms-mcq-144",
    "topicId": "transactions-acid",
    "difficulty": "Medium",
    "questionType": "Conceptual",
    "question": "What is the state of a transaction immediately after its final SQL statement has executed, but BEFORE the commit log is flushed to disk?",
    "options": [
      "A) Active",
      "B) Partially Committed",
      "C) Committed",
      "D) Terminated"
    ],
    "correctIndex": 1,
    "hint": "Review the 5 transaction states: Active -> Partially Committed -> Committed / Failed -> Aborted.",
    "progressiveHint": "It is partially committed because it hasn't reached persistent storage; if power cuts now, it transitions to Failed.",
    "explanation": "In standard transaction state transition diagrams, a transaction enters the Partially Committed state after its final statement has run. Only when its WAL records are flushed to persistent disk does it enter the Committed state.",
    "optionExplanations": [
      "Active is while statements are currently executing.",
      "Partially Committed: Correct. Waiting for persistent disk flush.",
      "Committed occurs after durable flush.",
      "Terminated is after resources are deallocated."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Transaction State Machine Transitions",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-145",
    "topicId": "transactions-acid",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What does a `SAVEPOINT` command allow a database developer to do?",
    "options": [
      "A) Permanently save data without ever being able to roll it back.",
      "B) Set an intermediate marker within a transaction, allowing selective partial rollback to that marker without aborting the entire transaction.",
      "C) Save the query to a text file on the Desktop.",
      "D) Automatically double the RAM buffer pool."
    ],
    "correctIndex": 1,
    "hint": "Syntax: `SAVEPOINT sp1; ... ROLLBACK TO SAVEPOINT sp1;`.",
    "progressiveHint": "Allows error recovery within nested business logic without discarding earlier completed work.",
    "explanation": "SAVEPOINT defines a logical checkpoint inside an ongoing transaction. If a subsequent sub-operation encounters an error, the application can issue `ROLLBACK TO SAVEPOINT` to revert only the sub-operation.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Enables granular partial rollbacks.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Technical Interview - Savepoints and Partial Rollback",
      "role": "Software Engineer"
    }
  },
  {
    "id": "dbms-mcq-146",
    "topicId": "transactions-acid",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "What is the Lost Update anomaly in concurrent transactions?",
    "options": [
      "A) When the database drops a packet over the internet.",
      "B) When two concurrent transactions T1 and T2 read the same row, compute updates based on the initial value, and T2 overwrites T1's update without incorporating T1's modifications.",
      "C) When an update query takes more than 10 minutes.",
      "D) When auto-commit is disabled."
    ],
    "correctIndex": 1,
    "hint": "Both read balance 100. T1 adds 50 (writes 150). T2 deducts 20 from initial 100 (writes 80). T1's +50 deposit is lost!",
    "progressiveHint": "Prevented by pessimistic locking (`SELECT ... FOR UPDATE`) or optimistic concurrency control with version numbers.",
    "explanation": "Lost Update occurs when two transactions concurrently read the same state and perform blind writes. The later write overwrites the earlier write, wiping out its modifications completely.",
    "optionExplanations": [
      "Option A is network loss.",
      "Option B is correct. Canonical Lost Update definition.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Lost Update Anomaly & Optimistic Locking",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-147",
    "topicId": "transactions-acid",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "How does Multi-Version Concurrency Control (MVCC) eliminate read-write contention in modern database engines (PostgreSQL, MySQL InnoDB, Oracle)?",
    "options": [
      "A) By forcing all reads to acquire exclusive locks.",
      "B) By maintaining multiple snapshot versions of rows (using transaction IDs / timestamps), ensuring readers do not block writers, and writers do not block readers.",
      "C) By disabling transactions entirely.",
      "D) By executing all queries serially on a single CPU core."
    ],
    "correctIndex": 1,
    "hint": "The golden mantra of MVCC: 'Readers never block writers; writers never block readers.'",
    "progressiveHint": "Readers view a consistent historical snapshot of data created before their transaction started.",
    "explanation": "MVCC creates historical versions of modified rows tagged with transaction timestamps. Readers read the version committed before their transaction started without acquiring shared read locks, avoiding blocking writers.",
    "optionExplanations": [
      "Option A describes 2PL, which suffers from heavy read-write blocking.",
      "Option B is correct. Core MVCC architecture.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - MVCC Snapshot Isolation Internals",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-148",
    "topicId": "transactions-acid",
    "difficulty": "Hard",
    "questionType": "Transaction Schedule",
    "question": "Given schedule S of transactions T1 and T2:\nT1: Read(A)\nT2: Read(A)\nT1: Write(A)\nT2: Write(A)\n\nWhich concurrency anomaly is manifested in this schedule?",
    "options": [
      "A) Phantom Read",
      "B) Lost Update (T2's write overwrites T1's write without knowing T1 modified A)",
      "C) Dirty Read",
      "D) Cascading Rollback"
    ],
    "correctIndex": 1,
    "hint": "T1 and T2 both read the original A. T1 writes its update, but T2 immediately overwrites A based on the stale read.",
    "progressiveHint": "The write by T1 is permanently lost because T2 overwrites it blindly.",
    "explanation": "Because T2 read A before T1 wrote its changes, T2's subsequent write overwrites T1's modifications based on stale initial data, producing a classic Lost Update.",
    "optionExplanations": [
      "Option A involves range insertions.",
      "Option B is correct: Lost Update schedule.",
      "Option C involves reading uncommitted data.",
      "Option D involves abort cascades."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Transaction Schedules & Anomaly Detection",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-149",
    "topicId": "transactions-acid",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What is the purpose of database Checkpointing during Write-Ahead Log (WAL) recovery?",
    "options": [
      "A) To delete the database schema.",
      "B) To periodically flush dirty buffer pool pages to disk and write a checkpoint record, reducing crash recovery scan time by bounding how far back the log must be analyzed.",
      "C) To disconnect inactive users.",
      "D) To enforce unique key constraints."
    ],
    "correctIndex": 1,
    "hint": "Without checkpoints, how much log history would the database have to replay after a crash?",
    "progressiveHint": "Checkpoints guarantee that all dirty pages modified before the checkpoint are safely on disk.",
    "explanation": "Checkpointing flushes dirty RAM pages to disk and marks a checkpoint record in the log. On crash restart, recovery only needs to replay log entries from the latest checkpoint forward, speeding recovery.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Bounds recovery time and truncates old log files.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Cognizant",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Cognizant GenC - WAL Checkpointing & Crash Recovery",
      "role": "Programmer Analyst"
    }
  },
  {
    "id": "dbms-mcq-150",
    "topicId": "transactions-acid",
    "difficulty": "Placement",
    "questionType": "Scenario",
    "question": "An e-commerce ticket booking service handles the final concert ticket. Two users click 'Purchase' at the exact same millisecond. What SQL clause prevents double-booking under pessimistic locking?",
    "options": [
      "A) SELECT * FROM tickets WHERE id = 1 FOR UPDATE;",
      "B) SELECT * FROM tickets WHERE id = 1 ORDER BY id;",
      "C) SELECT DISTINCT * FROM tickets WHERE id = 1;",
      "D) SELECT * FROM tickets WHERE id = 1 GROUP BY id;"
    ],
    "correctIndex": 0,
    "hint": "Which clause acquires an exclusive row-level lock on the queried row until the transaction commits?",
    "progressiveHint": "`FOR UPDATE` locks the selected row, forcing concurrent transactions to wait until the current transaction commits or rolls back.",
    "explanation": "`SELECT ... FOR UPDATE` acquires an exclusive lock on the ticket row. The second transaction blocks until the first completes its booking and changes status to SOLD, preventing race conditions.",
    "optionExplanations": [
      "Option A is correct. Industry standard pessimistic concurrency row lock.",
      "Option B only sorts.",
      "Option C eliminates duplicates.",
      "Option D performs grouping."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Pessimistic Locking with SELECT FOR UPDATE",
      "role": "SDE-1"
    }
  },
  {
    "id": "dbms-mcq-151",
    "topicId": "transactions-acid",
    "difficulty": "Hard",
    "questionType": "Interview Trap",
    "question": "In the ARIES crash recovery algorithm, what are the three sequential phases executed on restart?",
    "options": [
      "A) Compile -> Execute -> Terminate",
      "B) Analysis Phase -> REDO Phase -> UNDO Phase",
      "C) Lock -> Unlock -> Commit",
      "D) Scan -> Filter -> Sort"
    ],
    "correctIndex": 1,
    "hint": "Analyze active transactions, re-apply committed changes, rollback uncommitted updates.",
    "progressiveHint": "Analysis identifies dirty pages and active transactions; REDO repeats history to restore state; UNDO rolls back active/aborted transactions.",
    "explanation": "The ARIES recovery algorithm operates in three distinct phases: 1) Analysis (determines dirty pages and active transactions at crash time), 2) REDO (repeats history to bring database to crash moment), and 3) UNDO (rolls back active uncommitted transactions).",
    "optionExplanations": [
      "Option A describes query processing.",
      "Option B is the famous ARIES 3-phase crash recovery algorithm.",
      "Option C describes locking.",
      "Option D describes query scanning."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - ARIES Crash Recovery Protocol (Analysis, REDO, UNDO)",
      "role": "SDE-2"
    }
  },
  {
    "id": "dbms-mcq-152",
    "topicId": "transactions-acid",
    "difficulty": "Medium",
    "questionType": "Comparison",
    "question": "What is the difference between Cascading Rollback and Cascadeless Schedule?",
    "options": [
      "A) Cascading rollback means a server crash; Cascadeless means no crash.",
      "B) In Cascading Rollback, the failure of one transaction forces multiple dependent transactions that read its uncommitted data to roll back; in a Cascadeless Schedule, transactions only read committed data, preventing domino-effect aborts.",
      "C) Cascadeless schedules do not support rollback.",
      "D) They are identical."
    ],
    "correctIndex": 1,
    "hint": "If T2 reads uncommitted data from T1, and T1 aborts, what must T2 do?",
    "progressiveHint": "T2 must also abort. If T3 read from T2, T3 must also abort (Cascading Abort). Cascadeless schedules eliminate this.",
    "explanation": "A schedule is Cascadeless (avoids cascading aborts) if every transaction reads only data written by committed transactions, guaranteeing that no abort forces another transaction to roll back.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Defines cascadeless schedules.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Cascading vs Cascadeless Schedules",
      "role": "Digital Developer"
    }
  },
  {
    "id": "dbms-mcq-153",
    "topicId": "transactions-acid",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "What does AUTOCOMMIT mode do in database client sessions?",
    "options": [
      "A) It automatically deletes failed queries.",
      "B) It automatically treats every single SQL DML statement as an independent transaction that commits immediately upon execution.",
      "C) It disables transaction logging.",
      "D) It backs up the database every hour."
    ],
    "correctIndex": 1,
    "hint": "When AUTOCOMMIT is ON, do you need to type `COMMIT;` manually after an INSERT?",
    "progressiveHint": "When AUTOCOMMIT is enabled, each statement is immediately committed.",
    "explanation": "In AUTOCOMMIT mode, the DBMS treats each individual SQL statement as an autonomous transaction, automatically committing its changes upon completion without waiting for an explicit `COMMIT;`.",
    "optionExplanations": [
      "Option A is false.",
      "Option B is correct. Automatically commits individual statements.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Placement - AUTOCOMMIT Behavior",
      "role": "Analyst"
    }
  },
  {
    "id": "dbms-mcq-154",
    "topicId": "transactions-acid",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "Does issuing a DDL statement (such as `CREATE TABLE` or `ALTER TABLE`) inside an open transaction in MySQL (InnoDB) preserve the transaction?",
    "options": [
      "A) Yes, DDL can be rolled back in MySQL.",
      "B) No, in MySQL, DDL statements cause an IMPLICIT COMMIT of the current active transaction, making previous DML statements irreversible.",
      "C) DDL statements are ignored inside transactions.",
      "D) MySQL does not support DDL."
    ],
    "correctIndex": 1,
    "hint": "Can you ROLLBACK a `CREATE TABLE` statement in MySQL?",
    "progressiveHint": "Unlike PostgreSQL (which supports transactional DDL), MySQL implicitly commits the active transaction before and after executing any DDL statement.",
    "explanation": "In MySQL, DDL statements trigger an implicit commit. Any prior uncommitted INSERT or UPDATE statements are permanently committed to disk immediately before the DDL statement runs and cannot be rolled back.",
    "optionExplanations": [
      "Option A is a widespread developer pitfall; true in PostgreSQL, but FALSE in MySQL.",
      "Option B is correct. Triggers an implicit commit.",
      "Option C and D are false."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - MySQL Implicit Commit on DDL Trap",
      "role": "SDE-1"
    }
  },
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
    "question": "Given schedule S:\nT1: Read(X)\nT2: Write(X)\nT1: Write(X)\n\nIs this schedule Conflict Serializable?",
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
    "question": "A composite index exists on columns `(status, created_at)`.\nWhich of the following queries CANNOT use this index for filtering (violates the Leftmost Prefix Rule)?",
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
    "question": "An index exists on column `hire_date`. Why does the following query fail to use the index efficiently (causing a full table scan)?\nSELECT * FROM employees WHERE YEAR(hire_date) = 2024;",
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
];
