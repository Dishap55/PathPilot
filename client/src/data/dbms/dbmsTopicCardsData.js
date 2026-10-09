/**
 * MASTER DBMS 10-CARD THEORY DATA
 * 
 * Contains EXACTLY 10 topic-specific cards for each canonical DBMS topic:
 * Card 1: What is it? (Beginner intuition + analogy)
 * Card 2: Why do we need it? (Problem -> Why it matters -> How DBMS solves it)
 * Card 3: How does it work? (Step-by-step flow / visual transformation)
 * Card 4: Syntax / Structure (Real SQL syntax or schema structure)
 * Card 5: Real-World Example (Real enterprise/e-commerce/banking scenario)
 * Card 6: Types / Variations (Genuine types/variations)
 * Card 7: Complete Working Example (Schema + Sample data + SQL + Result + Explanation)
 * Card 8: Common Mistakes / Traps (Wrong -> Why -> Correct)
 * Card 9: Interview & Placement Angle (Placement/Interview-style questions + scenario)
 * Card 10: Quick Revision / Cheat Sheet (Compact revision pill with key rules)
 */

export const DBMS_TOPIC_CARDS = {
  // =========================================================================
  // 1. DBMS ARCHITECTURE & FILE SYSTEM VS DBMS
  // =========================================================================
  'dbms-architecture': [
    {
      cardNumber: 1,
      title: 'What is DBMS Architecture?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'A Database Management System (DBMS) is specialized software that lets users and applications create, query, and maintain organized data safely without managing low-level disk files directly.',
      analogy: 'Think of an OS file system like an unorganized filing cabinet where anyone can grab any paper folder. A DBMS is like a professional bank vault with security guards, an indexing ledger, multiple teller counters, and strict record keeping for every deposit and withdrawal.',
      keyConcept: 'DBMS abstracts physical disk blocks into logical tables, rows, and relationships, guaranteeing ACID safety and concurrent access.',
      diagramType: '3-tier-architecture'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need a DBMS? (File System vs DBMS)',
      badge: 'Problem & Solution',
      problem: 'Operating System File Systems (like CSVs or text files) lack concurrent write control, atomic crash safety, index-based rapid lookup, and row-level security.',
      whyItMatters: 'If two users edit a file simultaneously in a file system, one overwrite destroys the other user\'s update (Lost Update). If the server loses power during a write, the file corrupts completely.',
      howSolves: 'DBMS provides: (1) Data Independence, (2) Concurrency Control via locking/MVCC, (3) Crash Recovery via Write-Ahead Logging (WAL), (4) Integrity Constraints (Primary/Foreign keys), and (5) High-speed B+ Tree indexing.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (The 3-Tier ANSI-SPARC Architecture)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'External Level (Views)', desc: 'Individual users and client apps see customized logical views (e.g., student view vs admin payroll view).' },
        { step: 2, title: 'Conceptual / Logical Level', desc: 'Defines what data is stored and relationships between all tables (schema design, constraints, security rules).' },
        { step: 3, title: 'Internal / Physical Level', desc: 'Defines how data is physically stored on disk (B+ Trees, page blocks, file clusters, hashing).' },
        { step: 4, title: 'Data Independence Mappings', desc: 'Logical Data Independence protects views from table changes; Physical Data Independence protects queries from disk layout changes.' }
      ],
      diagramType: 'architecture-layers'
    },
    {
      cardNumber: 4,
      title: 'Architecture Structure & Schema Levels',
      badge: 'Structural Blueprint',
      structureDetails: {
        layer1: 'User / Application Level -> Queries (SQL / APIs)',
        layer2: 'Query Processor -> Parser, Optimizer, Execution Engine',
        layer3: 'Storage Engine -> Buffer Manager, Transaction Manager, Lock Manager, Recovery Manager',
        layer4: 'Physical Storage -> Data Files, Index Files, Write-Ahead Log (WAL) on Disk'
      },
      codeSnippet: `-- Example illustrating Data Independence in SQL
-- 1. Conceptual Schema (Actual Physical Base Table)
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2),
    ssn VARCHAR(11)
);

-- 2. External View (Logical Independence: Hides SSN and Salary from public apps)
CREATE VIEW public_employee_directory AS
SELECT emp_id, name FROM employees;`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Core Banking System',
      badge: 'Production Scenario',
      scenario: 'State Bank of India (SBI) processes over 50,000 transactions per second across 22,000 branches and mobile banking apps.',
      challenge: 'Branch tellers, mobile apps, and ATM networks all read and write to the same account balance simultaneously.',
      architectureSolution: 'The 3-tier architecture allows mobile apps to use lightweight API views without knowing disk partitioning. The DBMS Lock Manager and WAL guarantee that if an ATM crashes midway through money dispensing, the account balance rolls back completely.'
    },
    {
      cardNumber: 6,
      title: 'Types of DBMS Architectures',
      badge: 'Architectural Variations',
      variations: [
        { type: '1-Tier Architecture', desc: 'Client, logic, and database all sit on the same local machine (e.g., SQLite in a local mobile app).' },
        { type: '2-Tier (Client-Server)', desc: 'Client application directly communicates with the database server using ODBC/JDBC (common in legacy desktop enterprise apps).' },
        { type: '3-Tier Architecture', desc: 'Client Browser -> Web/App Server (Business Logic) -> Centralized Database Server (Enterprise standard today).' },
        { type: 'Distributed / Cloud DBMS', desc: 'Data is replicated and partitioned across multiple cluster nodes (e.g., PostgreSQL clusters, Spanner, CockroachDB).' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Schema & Query Flow',
      badge: 'Working Trace',
      schema: 'CREATE TABLE accounts (account_no INT PRIMARY KEY, holder VARCHAR(50), balance INT);',
      sampleData: [
        { account_no: 101, holder: 'Alice Smith', balance: 5000 },
        { account_no: 102, holder: 'Bob Johnson', balance: 2500 }
      ],
      query: `-- Transfer 1000 from Alice to Bob with DBMS Transaction Guarantees
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 1000 WHERE account_no = 101;
UPDATE accounts SET balance = balance + 1000 WHERE account_no = 102;
COMMIT;`,
      result: [
        { account_no: 101, holder: 'Alice Smith', balance: 4000 },
        { account_no: 102, holder: 'Bob Johnson', balance: 3500 }
      ],
      executionFlow: '1. Parser parses SQL -> 2. Optimizer chooses index on account_no -> 3. Lock manager acquires exclusive row lock -> 4. Buffer pool updates page in RAM -> 5. WAL writes commit record to disk -> 6. Locks released.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Architectural Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Assuming Physical Data Independence means you never need to rebuild queries if a table column is renamed.',
          why: 'Renaming a table column affects the Logical/Conceptual Schema. Physical data independence only protects against disk/index changes.',
          correct: 'Logical Data Independence protects views when base schema changes; Physical Data Independence protects queries when storage/indexes change.'
        },
        {
          wrong: 'Using an OS file system (storing JSON on disk) for concurrent multi-user write workflows.',
          why: 'OS file locks are coarse-grained (entire file), causing massive bottlenecks or race conditions and dirty writes.',
          correct: 'Use an ACID-compliant relational DBMS with row-level locks and isolation levels.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Architecture',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'What is the exact difference between Physical and Logical Data Independence?',
          a: 'Logical Data Independence is the ability to modify the conceptual schema (e.g., adding/modifying tables) without changing external views. Physical Data Independence is the ability to modify the internal schema (e.g., adding B-Tree indexes, changing storage from HDD to NVMe) without changing conceptual schemas or queries.'
        },
        {
          q: 'Why does a DBMS maintain a Write-Ahead Log (WAL)?',
          a: 'For crash recovery (Durability). Before any dirty page in memory is flushed to disk, the change must be appended to sequential disk log. If power fails, REDO and UNDO passes restore the exact consistent state.'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: DBMS Architecture',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'DBMS = Software managing persistent data with ACID, indexing, security, and concurrency.',
        keyRule: 'Always maintain separation of external, conceptual, and internal levels (ANSI-SPARC).',
        comparison: 'File System: No concurrency, no ACID, manual indexing | DBMS: ACID, row locks, B+ Trees, declarative SQL.',
        commonTrap: 'Confusing logical data independence with physical data independence.',
        interviewKeyword: 'ANSI-SPARC 3-tier, Logical vs Physical Independence, WAL, Buffer Manager, Query Optimizer.'
      }
    }
  ],

  // =========================================================================
  // 2. ER MODEL & SCHEMA DESIGN
  // =========================================================================
  'er-model': [
    {
      cardNumber: 1,
      title: 'What is the ER Model?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'The Entity-Relationship (ER) Model is a high-level conceptual blueprint that visually models the data requirements of a system using real-world entities (things) and relationships (associations between things).',
      analogy: 'Before an architect pours concrete or lays bricks for a house, they draw a detailed architectural blueprint showing rooms, doors, and plumbing pipes. An ER diagram is the blueprint of a database before creating actual SQL tables.',
      keyConcept: 'ER models consist of Entities (rectangles), Attributes (ovals), and Relationships (diamonds), with clear Cardinality constraints (1:1, 1:N, M:N).',
      diagramType: 'er-diagram'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need ER Modeling?',
      badge: 'Problem & Solution',
      problem: 'Jumping straight into writing CREATE TABLE SQL statements leads to duplicate columns, missed foreign keys, and incorrect many-to-many relationship structures.',
      whyItMatters: 'A flawed relational schema discovered in production requires painful table migrations, data loss risks, and costly code rewrites.',
      howSolves: 'ER modeling provides visual clarity on entity boundaries, defines cardinality early, identifies primary keys, and outlines how M:N relationships translate into bridge/junction tables.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (ER Diagram Components & Mapping)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Entity Sets', desc: 'Real-world objects with independent existence (e.g., Student, Course, Instructor). Weak entities depend on a parent entity for identity.' },
        { step: 2, title: 'Attributes', desc: 'Simple, Composite (Address: Street, City), Multivalued (Phone numbers {double oval}), and Derived (Age derived from DOB {dashed oval}).' },
        { step: 3, title: 'Relationship Sets', desc: 'Associations between entities (e.g., Student "Enrolls_In" Course). Represented by diamond shapes.' },
        { step: 4, title: 'Relational Schema Mapping', desc: '1:N places parent primary key as Foreign Key in child table; M:N creates a separate junction table with composite primary key.' }
      ],
      diagramType: 'cardinality-mapping'
    },
    {
      cardNumber: 4,
      title: 'ER Symbols & Relational Schema Mapping Syntax',
      badge: 'Structural Blueprint',
      structureDetails: {
        rectangle: 'Entity Set (e.g., Department, Employee)',
        doubleRectangle: 'Weak Entity (e.g., Dependent / OrderItem)',
        diamond: 'Relationship Set (e.g., Manages, Works_In)',
        oval: 'Attribute; Underlined Oval = Primary Key; Double Oval = Multivalued',
        dashedOval: 'Derived Attribute (e.g., Total_Amount calculated on query)'
      },
      codeSnippet: `-- Translating M:N Relationship (Student M:N Course) to Relational Schema
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    credits INT DEFAULT 3
);

-- Junction / Associative Table for M:N Relationship
CREATE TABLE student_courses (
    student_id INT REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(course_id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (student_id, course_id)
);`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: University Portal Schema',
      badge: 'Production Scenario',
      scenario: 'A university management system tracks 10,000 students, 300 professors, and 500 course offerings across different semesters.',
      challenge: 'A student can take many courses; each course has multiple enrolled students (M:N). Each department is headed by exactly one professor (1:1). Each professor belongs to one department (1:N).',
      architectureSolution: 'ER mapping cleanly produces: (1) `departments` with `head_id` FK to `professors`, (2) `professors` with `dept_id` FK, and (3) `enrollments` junction table with composite key `(student_id, course_id, semester)`.'
    },
    {
      cardNumber: 6,
      title: 'Types of Cardinality Ratios & Entity Variations',
      badge: 'Architectural Variations',
      variations: [
        { type: 'One-to-One (1:1)', desc: 'E.g., Citizen <-> Passport. Place FK in either table with UNIQUE constraint.' },
        { type: 'One-to-Many (1:N)', desc: 'E.g., Customer <-> Orders. Place Customer_ID as Foreign Key in Orders table.' },
        { type: 'Many-to-Many (M:N)', desc: 'E.g., Students <-> Courses, Doctors <-> Patients. Requires a separate junction table.' },
        { type: 'Weak Entity Set', desc: 'Cannot exist without identifying parent entity. Has a partial key (discriminator) underlined with dashed line (e.g., Employee Dependents).' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Mapping ER to SQL Tables',
      badge: 'Working Trace',
      schema: 'E-commerce ER model: Customer (1:N) Orders (M:N) Products',
      sampleData: [
        { table: 'customers', rows: [{ id: 1, name: 'Rohan' }, { id: 2, name: 'Priya' }] },
        { table: 'orders', rows: [{ order_id: 501, customer_id: 1, order_date: '2026-10-01' }] },
        { table: 'order_items', rows: [{ order_id: 501, product_id: 99, qty: 2 }] }
      ],
      query: `-- Retrieve customer orders with product item counts
SELECT c.name, o.order_id, COUNT(oi.product_id) AS total_items
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY c.name, o.order_id;`,
      result: [
        { name: 'Rohan', order_id: 501, total_items: 1 }
      ],
      executionFlow: 'Customer connects to Orders via 1:N FK. Orders connects to Products via M:N bridge `order_items`. Relational join connects all 3 seamlessly.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & ER Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Trying to store a Many-to-Many relationship by creating a comma-separated list of IDs in a single column (e.g., courses="101,102,103").',
          why: 'Violates 1st Normal Form (atomicity). Makes searching, indexing, and foreign key integrity impossible.',
          correct: 'Always resolve M:N relationships into an independent bridge / associative table with composite primary key.'
        },
        {
          wrong: 'Treating a Weak Entity like an independent entity and giving it a standalone auto-increment primary key with no composite parent reference.',
          why: 'Weak entities depend on the identifying relationship for semantic identity (e.g., Dependent_Name + Employee_ID).',
          correct: 'Include parent foreign key as part of the weak entity\'s composite primary key.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: ER Modeling',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'How many minimum relational tables are needed for an M:N relationship with two entity sets?',
          a: 'Exactly 3 tables: Table A for Entity Set 1, Table B for Entity Set 2, and Table C (junction table) containing foreign keys referencing A and B.'
        },
        {
          q: 'What is the difference between total participation and partial participation?',
          a: 'Total participation (represented by a double line) means EVERY entity in the set must participate in the relationship (e.g., every Loan must belong to a Customer). Partial participation means only some entities participate (e.g., not every Customer has a Loan).'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: ER Modeling',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'ER Model = High-level visual conceptual blueprint of entities, attributes, and relationships.',
        keyRule: 'M:N relationships MUST map to a junction table; 1:N puts foreign key on the "Many" side.',
        comparison: 'Strong Entity: Has own primary key | Weak Entity: Needs parent foreign key + partial discriminator.',
        commonTrap: 'Storing multivalued attributes inside one text cell instead of creating a child table.',
        interviewKeyword: 'Cardinality ratio, Participation constraint, Weak entity, Discriminator, Junction table.'
      }
    }
  ],

  // =========================================================================
  // 3. RELATIONAL MODEL, KEYS & CONSTRAINTS
  // =========================================================================
  'relational-model-keys': [
    {
      cardNumber: 1,
      title: 'What are Database Keys & Integrity Constraints?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'A key is an attribute (or group of attributes) used to uniquely identify any row (tuple) in a table and create trusted links between different tables.',
      analogy: 'Your country gives you a National Identity Number (like SSN or Aadhaar) that guarantees no other person shares your exact number. In a database table, the Primary Key is that unique identity badge for every row.',
      keyConcept: 'Integrity constraints protect database sanity: Entity Integrity (PK cannot be NULL), Referential Integrity (FK must match existing PK or be NULL).',
      diagramType: 'keys-hierarchy'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Keys & Constraints?',
      badge: 'Problem & Solution',
      problem: 'Without keys, two identical rows can be inserted. Without foreign key constraints, an invoice could reference an order number that does not exist in the database (orphan records).',
      whyItMatters: 'Duplicate rows create accounting errors, and orphaned foreign keys crash user dashboards and corrupt inventory balances.',
      howSolves: 'Primary keys prevent duplicate rows and NULL entries. Foreign keys enforce referential integrity with ON DELETE CASCADE or ON DELETE RESTRICT.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (The Key Hierarchy: Super -> Candidate -> Primary)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Super Key', desc: 'ANY set of attributes that uniquely identifies a row (can have redundant extra attributes like {EmpID, Name, Phone}).' },
        { step: 2, title: 'Candidate Key', desc: 'A MINIMAL Super Key with zero redundant attributes (e.g., {EmpID} or {Email}).' },
        { step: 3, title: 'Primary Key', desc: 'The single candidate key chosen by the database designer to uniquely identify records (Must be UNIQUE and NOT NULL).' },
        { step: 4, title: 'Alternate / Secondary Key', desc: 'Candidate keys that were not chosen as the primary key (e.g., Email or Phone).' },
        { step: 5, title: 'Foreign Key', desc: 'An attribute in a child table referencing a Candidate/Primary Key in a parent table.' }
      ],
      diagramType: 'key-circles'
    },
    {
      cardNumber: 4,
      title: 'SQL Syntax: Defining Keys & Constraints',
      badge: 'Structural Blueprint',
      structureDetails: {
        PRIMARY_KEY: 'CONSTRAINT pk_emp PRIMARY KEY (emp_id) -> Enforces UNIQUE + NOT NULL',
        UNIQUE: 'CONSTRAINT uq_email UNIQUE (email) -> Allows single NULL in SQL standard',
        FOREIGN_KEY: 'FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE',
        CHECK: 'CHECK (salary >= 10000 AND age >= 18)',
        DEFAULT: 'DEFAULT CURRENT_TIMESTAMP'
      },
      codeSnippet: `CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE, -- Alternate Key
    salary DECIMAL(10,2) CHECK (salary > 0),
    dept_id INT,
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) 
        REFERENCES departments(dept_id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: E-Commerce Order & Customer Linkage',
      badge: 'Production Scenario',
      scenario: 'Amazon manages billions of customer orders. A customer deletes their account or updates their primary email address.',
      challenge: 'What happens to orders placed by that customer? If referential integrity is violated, financial reports fail reconciliation.',
      architectureSolution: 'Amazon sets `customer_id` in `orders` as a Foreign Key. With `ON UPDATE CASCADE`, updating a customer ID updates all their past orders automatically. `ON DELETE RESTRICT` prevents account deletion while active open orders exist.'
    },
    {
      cardNumber: 6,
      title: 'Types of Database Keys',
      badge: 'Architectural Variations',
      variations: [
        { type: 'Super Key', desc: 'Superset of attributes uniquely identifying tuples. Every candidate key is a super key, but not every super key is minimal.' },
        { type: 'Candidate Key', desc: 'Minimal super key. There can be multiple candidate keys in a single table.' },
        { type: 'Primary Key', desc: 'Chosen candidate key. Enforces strictly UNIQUE and NOT NULL.' },
        { type: 'Composite Key', desc: 'A key composed of two or more columns (e.g., OrderID + ProductID in OrderItems).' },
        { type: 'Foreign Key', desc: 'Maintains referential integrity between two related tables.' },
        { type: 'Surrogate Key', desc: 'An artificial system-generated unique identifier (e.g., UUID or Auto-Increment BIGINT) with no business meaning.' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Referential Integrity Actions',
      badge: 'Working Trace',
      schema: 'Parent: departments (dept_id, name); Child: employees (emp_id, name, dept_id)',
      sampleData: [
        { dept_id: 10, name: 'Engineering' },
        { dept_id: 20, name: 'Human Resources' }
      ],
      query: `-- Step 1: Insert employee with valid dept_id
INSERT INTO employees (emp_id, name, dept_id) VALUES (1, 'Alice', 10);

-- Step 2: Try inserting invalid foreign key (Raises Error)
-- INSERT INTO employees (emp_id, name, dept_id) VALUES (2, 'Bob', 99); 
-- ERROR: insert or update on table "employees" violates foreign key constraint "fk_dept"

-- Step 3: Delete department with CASCADE enabled
DELETE FROM departments WHERE dept_id = 10;
SELECT * FROM employees;`,
      result: [
        { emp_id: 1, name: 'Alice', dept_id: null }
      ],
      executionFlow: 'When parent row (dept_id=10) was deleted, the child row had its foreign key updated to NULL because of ON DELETE SET NULL.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Key Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Believing a UNIQUE constraint is identical to a PRIMARY KEY constraint.',
          why: 'A table can have MULTIPLE UNIQUE constraints, and in SQL standard UNIQUE columns allow NULL values. A table can only have ONE PRIMARY KEY, which strictly forbids NULL.',
          correct: 'Use PRIMARY KEY for row identity; use UNIQUE for candidate attributes like Email or Phone.'
        },
        {
          wrong: 'Assuming Foreign Key columns cannot contain NULL values.',
          why: 'Foreign keys CAN be NULL unless explicitly defined with NOT NULL. A NULL foreign key simply means the relationship is optional.',
          correct: 'If every employee MUST belong to a department, define `dept_id INT NOT NULL REFERENCES departments(dept_id)`.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Database Keys',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'Can a table have multiple Candidate Keys and multiple Primary Keys?',
          a: 'A table CAN have multiple Candidate Keys (e.g., both RollNumber and RegistrationNumber are candidate keys), but it can only have EXACTLY ONE Primary Key chosen from those candidate keys.'
        },
        {
          q: 'What is the difference between ON DELETE CASCADE and ON DELETE SET NULL?',
          a: 'ON DELETE CASCADE deletes the child rows when the referenced parent row is deleted. ON DELETE SET NULL sets the child foreign key column to NULL while keeping the child rows intact.'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Keys & Constraints',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'Keys = Attributes guaranteeing uniqueness and relational links across tables.',
        keyRule: 'Candidate Key is minimal Super Key. Primary Key = Chosen Candidate Key (NOT NULL + UNIQUE).',
        comparison: 'Primary Key: 1 per table, NO NULLs | Unique Key: Multiple allowed, NULL allowed.',
        commonTrap: 'Forgetting ON DELETE CASCADE leaves foreign key references unable to delete parent rows.',
        interviewKeyword: 'Super Key, Candidate Key, Referential Integrity, Surrogate Key, Composite Key.'
      }
    }
  ],

  // =========================================================================
  // 4. SQL DDL, DML & BASIC QUERIES
  // =========================================================================
  'sql-basics-ddl-dml': [
    {
      cardNumber: 1,
      title: 'What is SQL? (DDL, DML, DCL, TCL)',
      badge: 'Beginner Intuition',
      inSimpleWords: 'Structured Query Language (SQL) is the standard declarative programming language used to define schemas, insert data, query records, and control access in relational databases.',
      analogy: 'Imagine ordering at a restaurant. You tell the waiter "I want a medium-rare steak with baked potatoes" (declarative). You do not tell the chef how to turn on the stove, slice the meat, or set the timer. In SQL, you specify WHAT data you want, and the database optimizer decides HOW to fetch it.',
      keyConcept: 'SQL commands divide into 4 categories: DDL (structure), DML (data records), DCL (permissions), and TCL (transactions).',
      diagramType: 'sql-sublanguages'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Standard SQL Commands?',
      badge: 'Problem & Solution',
      problem: 'Directly modifying memory blocks or files requires imperative low-level code (C/C++) with high bug rates and zero portability.',
      whyItMatters: 'Without a high-level declarative query language, every app developer would have to write custom binary search and file parsing routines.',
      howSolves: 'SQL standardizes operations. DDL handles table definitions, DML performs CRUD operations, and the database query optimizer optimizes the search plan automatically.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (Logical SQL Execution Order)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'FROM & JOINs', desc: 'Identify source tables and produce the joined cross-product dataset.' },
        { step: 2, title: 'WHERE Filter', desc: 'Filter individual rows BEFORE grouping is performed.' },
        { step: 3, title: 'GROUP BY', desc: 'Group remaining rows into aggregate buckets.' },
        { step: 4, title: 'HAVING Filter', desc: 'Filter grouped buckets AFTER aggregation.' },
        { step: 5, title: 'SELECT & Expressions', desc: 'Compute requested column expressions and aliases.' },
        { step: 6, title: 'ORDER BY & LIMIT', desc: 'Sort final output rows and truncate to specified limit.' }
      ],
      diagramType: 'sql-execution-order'
    },
    {
      cardNumber: 4,
      title: 'Syntax: Core DDL and DML Statements',
      badge: 'Structural Blueprint',
      structureDetails: {
        DDL: 'CREATE TABLE, ALTER TABLE, DROP TABLE, TRUNCATE TABLE (Auto-committed, modifies structure)',
        DML: 'INSERT INTO, UPDATE ... SET, DELETE FROM, SELECT (Operates on data, roll-backable)',
        DCL: 'GRANT, REVOKE (Permissions)',
        TCL: 'COMMIT, ROLLBACK, SAVEPOINT (Transaction management)'
      },
      codeSnippet: `-- DDL: Create and alter table structure
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    price NUMERIC(10,2) CHECK (price >= 0),
    stock INT DEFAULT 0
);
ALTER TABLE products ADD COLUMN category VARCHAR(50);

-- DML: Insert and query data
INSERT INTO products (title, price, stock, category) 
VALUES ('Mechanical Keyboard', 89.99, 45, 'Electronics');

SELECT title, price, stock 
FROM products 
WHERE category = 'Electronics' AND price < 100.00
ORDER BY price ASC;`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Product Catalog Filtering',
      badge: 'Production Scenario',
      scenario: 'An e-commerce marketplace with 500,000 items allows users to filter by price range, brand, rating, and sort by price.',
      challenge: 'Thousands of shoppers filter catalog items simultaneously with complex criteria (e.g., brand = "Sony" AND price BETWEEN 50 AND 200).',
      architectureSolution: 'The database uses the `WHERE` clause to filter out 99% of candidate rows, applies index scans on `(category, price)`, and evaluates the `ORDER BY` to deliver instant paginated results.'
    },
    {
      cardNumber: 6,
      title: 'Types of SQL Operations & DELETE vs TRUNCATE vs DROP',
      badge: 'Architectural Variations',
      variations: [
        { type: 'DELETE', desc: 'DML command. Removes specific rows based on WHERE clause. Can be rolled back. Fires row-level triggers. Slower because it logs each deleted row in WAL.' },
        { type: 'TRUNCATE', desc: 'DDL command. Deallocates all data pages in table. Much faster than DELETE. Cannot filter with WHERE. Resets identity auto-increments.' },
        { type: 'DROP', desc: 'DDL command. Completely destroys table schema and all its rows, indexes, and triggers from data dictionary.' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Filtering & Sorting',
      badge: 'Working Trace',
      schema: 'CREATE TABLE employees (id INT, name VARCHAR(50), dept VARCHAR(30), salary INT);',
      sampleData: [
        { id: 1, name: 'Alice', dept: 'IT', salary: 85000 },
        { id: 2, name: 'Bob', dept: 'Finance', salary: 62000 },
        { id: 3, name: 'Charlie', dept: 'IT', salary: 92000 },
        { id: 4, name: 'Diana', dept: 'Marketing', salary: 54000 }
      ],
      query: `SELECT name, dept, salary
FROM employees
WHERE dept = 'IT' AND salary > 80000
ORDER BY salary DESC;`,
      result: [
        { name: 'Charlie', dept: 'IT', salary: 92000 },
        { name: 'Alice', dept: 'IT', salary: 85000 }
      ],
      executionFlow: '1. FROM employees -> 2. WHERE filters rows matching IT and salary > 80000 -> 3. SELECT projects name, dept, salary -> 4. ORDER BY sorts descending by salary.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & SQL Syntax Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Using column aliases created in SELECT inside the WHERE clause (e.g., SELECT salary * 12 AS annual_sal FROM emp WHERE annual_sal > 50000;).',
          why: 'The WHERE clause executes BEFORE the SELECT clause in the logical execution order, so `annual_sal` does not exist yet when WHERE runs!',
          correct: 'Repeat the expression: WHERE (salary * 12) > 50000, or use a Common Table Expression (CTE) / subquery.'
        },
        {
          wrong: 'Using `= NULL` or `!= NULL` to check for missing values.',
          why: 'In SQL three-valued logic, `NULL = NULL` yields UNKNOWN, never TRUE. Any comparison with `= NULL` returns zero rows.',
          correct: 'Always use `IS NULL` or `IS NOT NULL`.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: DDL vs DML',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'What is the precise difference between DELETE, TRUNCATE, and DROP?',
          a: 'DELETE is a DML statement that removes rows one-by-one, logs each deletion in transaction logs, respects WHERE, and fires DELETE triggers. TRUNCATE is a DDL command that deallocates entire pages at once, cannot use WHERE, is faster, and resets identity columns. DROP is a DDL command that removes both table schema and data permanently.'
        },
        {
          q: 'Why can ORDER BY use aliases defined in SELECT, but WHERE cannot?',
          a: 'Because in the SQL query execution lifecycle, WHERE executes first (Phase 2) before SELECT (Phase 5), while ORDER BY executes last (Phase 6) after column aliases have been materialized.'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: SQL Basics',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'SQL = Declarative language for relational data definition, manipulation, and control.',
        keyRule: 'Logical Execution Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
        comparison: 'DELETE: DML, logs rows, rollbackable | TRUNCATE: DDL, page dealloc, fast | DROP: Destroys table.',
        commonTrap: 'Comparing with `= NULL` instead of `IS NULL`. Using SELECT aliases in WHERE.',
        interviewKeyword: 'Execution order, DDL vs DML, TRUNCATE vs DELETE, Three-valued logic, NULL handling.'
      }
    }
  ],

  // =========================================================================
  // 5. SQL JOINS & MULTI-TABLE QUERIES
  // =========================================================================
  'sql-joins': [
    {
      cardNumber: 1,
      title: 'What is a SQL JOIN?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'A SQL JOIN combines rows from two or more tables based on a related column between them (typically matching a Foreign Key in one table with a Primary Key in another).',
      analogy: 'Imagine you have an address book with names and home IDs, and a separate city registry with home IDs and addresses. Instead of rewriting the full address every time you write a friend\'s name, you "JOIN" the two books by looking up matching Home IDs.',
      keyConcept: 'Joins reconstruct the unified real-world view from normalized relational tables without data redundancy.',
      diagramType: 'join-venn'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Joins?',
      badge: 'Problem & Solution',
      problem: 'Storing all data in a single giant monolithic table causes massive redundancy, insertion anomalies, update anomalies, and waste of disk storage.',
      whyItMatters: 'Relational database normalization requires splitting data into separate logical tables (e.g., Customers, Orders, OrderItems).',
      howSolves: 'SQL JOINs allow us to query related records across normalized tables in a single query with blazing performance and zero redundancy.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (Join Algorithms & Execution)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Nested Loop Join', desc: 'For each outer table row, scans inner table matching join condition (optimal for small tables or when inner table has an index).' },
        { step: 2, title: 'Hash Join', desc: 'Builds an in-memory hash table on the smaller table, then probes it row-by-row with the larger table (optimal for large equi-joins).' },
        { step: 3, title: 'Merge / Sort-Merge Join', desc: 'Sorts both tables on join key, then scans both simultaneously in linear time (optimal when inputs are already sorted by index).' },
        { step: 4, title: 'NULL Filling', desc: 'For OUTER joins (LEFT, RIGHT, FULL), un-matched rows are preserved and padded with NULL for missing opposite columns.' }
      ],
      diagramType: 'join-algorithms'
    },
    {
      cardNumber: 4,
      title: 'SQL Join Syntax & Types',
      badge: 'Structural Blueprint',
      structureDetails: {
        INNER_JOIN: 'SELECT ... FROM A INNER JOIN B ON A.id = B.a_id (Only matching rows)',
        LEFT_JOIN: 'SELECT ... FROM A LEFT JOIN B ON A.id = B.a_id (All A rows + matching B rows, else NULL)',
        RIGHT_JOIN: 'SELECT ... FROM A RIGHT JOIN B ON A.id = B.a_id (All B rows + matching A rows, else NULL)',
        FULL_OUTER: 'SELECT ... FROM A FULL OUTER JOIN B ON A.id = B.a_id (All rows from both)',
        CROSS_JOIN: 'SELECT ... FROM A CROSS JOIN B (Cartesian product: Rows(A) * Rows(B))',
        SELF_JOIN: 'SELECT ... FROM Employees E1 JOIN Employees E2 ON E1.manager_id = E2.emp_id'
      },
      codeSnippet: `-- Standard Equi-Join across Employees and Departments
SELECT 
    e.emp_id,
    e.name AS employee_name,
    d.dept_name,
    e.salary
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;

-- LEFT JOIN to find employees without any assigned department
SELECT e.name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Swiggy / Zomato Order Tracking',
      badge: 'Production Scenario',
      scenario: 'Food delivery apps track orders across `Customers`, `Restaurants`, `Delivery_Partners`, and `Orders`.',
      challenge: 'The live delivery screen must display: Customer Name, Restaurant Address, Delivery Partner Name, and Items ordered.',
      architectureSolution: 'A multi-table JOIN connects `orders o JOIN customers c ON o.customer_id = c.id JOIN restaurants r ON o.restaurant_id = r.id LEFT JOIN delivery_partners dp ON o.driver_id = dp.id`. LEFT JOIN ensures the order is visible even before a driver accepts it.'
    },
    {
      cardNumber: 6,
      title: 'Types of SQL Joins & Output Cardinality',
      badge: 'Architectural Variations',
      variations: [
        { type: 'INNER JOIN', desc: 'Returns only records where the join predicate evaluates to TRUE in BOTH tables.' },
        { type: 'LEFT OUTER JOIN', desc: 'Returns ALL records from left table, and matched records from right table (pads with NULL when no match exists).' },
        { type: 'RIGHT OUTER JOIN', desc: 'Returns ALL records from right table, and matched records from left table.' },
        { type: 'FULL OUTER JOIN', desc: 'Combines LEFT and RIGHT join: returns all matching rows plus all unmatched rows from both sides.' },
        { type: 'SELF JOIN', desc: 'A regular join where a table is joined with itself using aliases (common for hierarchical manager-employee or parent-child structures).' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Finding Unmatched Records',
      badge: 'Working Trace',
      schema: 'customers (id, name); orders (order_id, customer_id, amount)',
      sampleData: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ],
      query: `-- Find customers who NEVER placed any orders
SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.order_id IS NULL;`,
      result: [
        { name: 'Charlie' }
      ],
      executionFlow: '1. LEFT JOIN pairs Charlie with NULL for order_id -> 2. WHERE o.order_id IS NULL keeps only Charlie -> 3. SELECT outputs Charlie.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Join Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Filtering the right table in the WHERE clause instead of the ON clause in a LEFT JOIN (e.g., LEFT JOIN orders o ON ... WHERE o.status = "Completed").',
          why: 'Because the WHERE clause executes AFTER the LEFT JOIN, rows with NULL values get discarded by `o.status = "Completed"`, converting your LEFT JOIN into an accidental INNER JOIN!',
          correct: 'Put the filter condition in the ON clause: `LEFT JOIN orders o ON c.id = o.customer_id AND o.status = "Completed"`.'
        },
        {
          wrong: 'Accidental Cartesian Product by forgetting the ON condition in JOIN syntax.',
          why: '`SELECT * FROM A, B` or `JOIN B` without condition generates N * M rows, which can freeze the database server.',
          correct: 'Always specify an explicit `ON A.key = B.key` join condition.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Joins',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'If Table A has 5 rows (all values 1) and Table B has 4 rows (all values 1), how many rows does an INNER JOIN return?',
          a: 'It returns 20 rows (5 * 4 = 20) because every single row in Table A matches every single row in Table B on the value 1.'
        },
        {
          q: 'How do you write a SELF JOIN to find employees who earn more than their manager?',
          a: '`SELECT e.name FROM employees e JOIN employees m ON e.manager_id = m.emp_id WHERE e.salary > m.salary;`'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: SQL Joins',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'JOIN = Combines columns from multiple tables using matching keys.',
        keyRule: 'INNER = Intersection only | LEFT = All Left + Matches | FULL = Everything with NULL pads.',
        comparison: 'Filtering right table in ON preserves left rows; filtering in WHERE turns LEFT JOIN into INNER JOIN.',
        commonTrap: 'Duplicate keys in both tables causing unintentional row multiplication (fan-out).',
        interviewKeyword: 'Nested loop, Hash join, Merge join, Cartesian product, Self join, ON vs WHERE.'
      }
    }
  ],

  // =========================================================================
  // 6. SQL AGGREGATION, GROUP BY & HAVING
  // =========================================================================
  'sql-aggregation-groupby': [
    {
      cardNumber: 1,
      title: 'What is Aggregation, GROUP BY & HAVING?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'Aggregation collapses multiple rows into a single summary calculation (like COUNT, SUM, AVG, MIN, MAX). GROUP BY groups rows sharing the same value into buckets, and HAVING filters those buckets based on aggregate calculations.',
      analogy: 'Imagine a school principal counting how many students are in each class. First, students gather in groups by Grade (GROUP BY). Then the principal counts students in each room (COUNT). Finally, they announce only classes that have more than 30 students (HAVING).',
      keyConcept: 'WHERE filters individual raw rows BEFORE grouping. HAVING filters aggregated group metrics AFTER grouping.',
      diagramType: 'groupby-buckets'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need GROUP BY & HAVING?',
      badge: 'Problem & Solution',
      problem: 'Raw transactional tables contain millions of granular events. Business executives do not want to read every single line item.',
      whyItMatters: 'To make decisions, businesses need aggregated metrics: total revenue per quarter, average employee salary per department, top churn rates per region.',
      howSolves: 'GROUP BY aggregates data into high-performance buckets, and HAVING provides precise threshold filtering on aggregate expressions.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (Aggregation Pipeline)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Row Filtering (WHERE)', desc: 'Eliminate unwanted individual rows before doing any grouping (e.g., only active employees).' },
        { step: 2, title: 'Hash / Sort Grouping', desc: 'Database sorts or builds an in-memory hash table on the GROUP BY columns to collect identical keys into buckets.' },
        { step: 3, title: 'Aggregate Evaluation', desc: 'Evaluates COUNT(), SUM(), AVG(), MIN(), MAX() for each bucket.' },
        { step: 4, title: 'Group Filtering (HAVING)', desc: 'Discards buckets that fail the aggregate condition (e.g., HAVING COUNT(*) > 5).' }
      ],
      diagramType: 'aggregation-pipeline'
    },
    {
      cardNumber: 4,
      title: 'Syntax: Aggregation with GROUP BY & HAVING',
      badge: 'Structural Blueprint',
      structureDetails: {
        AGGREGATES: 'COUNT(*), COUNT(col), SUM(col), AVG(col), MIN(col), MAX(col)',
        GROUP_BY: 'GROUP BY col1, col2 (Every non-aggregated column in SELECT must appear in GROUP BY)',
        HAVING: 'HAVING aggregate_expr condition (e.g., HAVING AVG(salary) > 75000)'
      },
      codeSnippet: `-- Complete Aggregation Query
SELECT 
    department_id,
    COUNT(*) AS total_employees,
    ROUND(AVG(salary), 2) AS average_salary,
    MAX(salary) AS highest_salary
FROM employees
WHERE is_active = TRUE           -- 1. Filters raw rows
GROUP BY department_id           -- 2. Groups into department buckets
HAVING COUNT(*) >= 3             -- 3. Filters group buckets
ORDER BY average_salary DESC;    -- 4. Sorts output`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Sales Analytics Dashboard',
      badge: 'Production Scenario',
      scenario: 'An e-commerce store with 2,000,000 orders needs to find departments with total sales exceeding $100,000 during Q3.',
      challenge: 'Calculating this without GROUP BY would require pulling 2 million rows into client application memory, causing Out-Of-Memory errors.',
      architectureSolution: 'The database performs `GROUP BY department_id HAVING SUM(order_total) > 100000` entirely in optimized database memory buffers and streams only 12 summary rows back to the frontend dashboard.'
    },
    {
      cardNumber: 6,
      title: 'Aggregate Functions & COUNT(*) vs COUNT(column)',
      badge: 'Architectural Variations',
      variations: [
        { type: 'COUNT(*)', desc: 'Counts ALL rows in the group, including rows where some or all columns are NULL.' },
        { type: 'COUNT(column_name)', desc: 'Counts only rows where the specified column is NOT NULL. Ignores NULL values.' },
        { type: 'COUNT(DISTINCT column)', desc: 'Counts unique non-null values in the group.' },
        { type: 'AVG(column)', desc: 'Calculates the arithmetic mean of non-null values. Important: Does not treat NULL as 0; it ignores NULL completely in the denominator.' },
        { type: 'SUM(column)', desc: 'Calculates sum of non-null values. If all values are NULL, returns NULL.' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Department Salary Analysis',
      badge: 'Working Trace',
      schema: 'employees (id, name, department, salary)',
      sampleData: [
        { id: 1, name: 'Alice', department: 'HR', salary: 50000 },
        { id: 2, name: 'Bob', department: 'HR', salary: 60000 },
        { id: 3, name: 'Charlie', department: 'Tech', salary: 120000 },
        { id: 4, name: 'Diana', department: 'Tech', salary: 110000 },
        { id: 5, name: 'Evan', department: 'Tech', salary: 130000 }
      ],
      query: `SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;`,
      result: [
        { department: 'Tech', emp_count: 3, avg_sal: 120000 }
      ],
      executionFlow: '1. Group HR (2 rows, avg 55000) and Tech (3 rows, avg 120000) -> 2. HAVING COUNT(*) > 2 filters out HR -> 3. Tech is returned.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Aggregation Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Putting aggregate functions inside the WHERE clause: `SELECT dept, AVG(salary) FROM emp WHERE AVG(salary) > 50000 GROUP BY dept;`',
          why: 'WHERE executes BEFORE groups are created. The database does not know the average yet when evaluating WHERE.',
          correct: 'Always put aggregate filters inside the HAVING clause: `GROUP BY dept HAVING AVG(salary) > 50000`.'
        },
        {
          wrong: 'Selecting a non-aggregated column that is NOT listed in the GROUP BY clause (e.g., `SELECT dept, name, MAX(salary) FROM emp GROUP BY dept;`).',
          why: 'In standard SQL, each department has multiple employee names; the database cannot guess which single name to display alongside MAX(salary).',
          correct: 'Every column in SELECT must either be an aggregate function or appear in the GROUP BY clause.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Aggregation',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'What is the exact difference between WHERE and HAVING?',
          a: 'WHERE filters rows BEFORE grouping occurs and cannot contain aggregate functions. HAVING filters aggregated groups AFTER grouping occurs and typically contains aggregate functions like COUNT(), SUM(), AVG().'
        },
        {
          q: 'If a column has values (10, 20, NULL), what is the result of AVG(col)?',
          a: 'The result is 15 ((10 + 20) / 2). Aggregate functions in SQL automatically ignore NULL values instead of treating them as zero.'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Aggregation',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'GROUP BY = Condenses multiple rows into summary buckets. HAVING = Filters summary buckets.',
        keyRule: 'Never put aggregate functions in WHERE. All non-aggregate SELECT columns must be in GROUP BY.',
        comparison: 'COUNT(*) counts every row | COUNT(col) ignores NULLs | AVG(col) ignores NULLs.',
        commonTrap: 'Using WHERE instead of HAVING for aggregate filtering.',
        interviewKeyword: 'HAVING vs WHERE, COUNT(*), Non-aggregate in SELECT, Aggregate NULL handling.'
      }
    }
  ],

  // =========================================================================
  // 7. SQL SUBQUERIES & CORRELATED QUERIES
  // =========================================================================
  'sql-subqueries-nested': [
    {
      cardNumber: 1,
      title: 'What is a SQL Subquery?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'A subquery (or nested query) is an SQL query enclosed within parentheses that is embedded inside another outer SQL query to provide dynamic values or intermediate data sets.',
      analogy: 'Imagine asking your teacher: "Who scored higher than the class average?" Before the teacher can answer who scored higher, they must FIRST calculate what the class average is. The calculation of the class average is the inner subquery, and finding students above that score is the outer query.',
      keyConcept: 'Subqueries can be Non-Correlated (executes once independently) or Correlated (executes repeatedly for every row of the outer query).',
      diagramType: 'subquery-nested'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Subqueries?',
      badge: 'Problem & Solution',
      problem: 'Many database questions cannot be answered with a static hardcoded value (e.g., finding the 2nd highest salary, or finding employees who earn more than their department\'s average).',
      whyItMatters: 'Without subqueries, you would have to write two separate queries in your backend application and store intermediate results in memory.',
      howSolves: 'Subqueries allow single-step declarative querying where the inner query feeds dynamic values directly into the outer query with full transactional isolation.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (Non-Correlated vs Correlated Execution)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Non-Correlated Subquery', desc: 'Executes once independently. Its result (scalar value, list, or table) is passed directly to the outer query.' },
        { step: 2, title: 'Correlated Subquery', desc: 'References columns from the outer query. The database executes the inner query once for every single candidate row in the outer query.' },
        { step: 3, title: 'EXISTS / NOT EXISTS Optimization', desc: 'Short-circuits immediately upon finding the first matching row, avoiding full table scans.' },
        { step: 4, title: 'Query Optimizer Rewrite', desc: 'Modern optimizers often rewrite correlated subqueries into equivalent joins or window functions for speed.' }
      ],
      diagramType: 'correlated-vs-noncorrelated'
    },
    {
      cardNumber: 4,
      title: 'Syntax: Scalar, Multi-Row & Correlated Subqueries',
      badge: 'Structural Blueprint',
      structureDetails: {
        SCALAR: 'Returns single value (1 row, 1 col) -> used with =, >, < operators',
        MULTI_ROW: 'Returns multiple rows -> used with IN, ANY, ALL',
        CORRELATED: 'References outer table alias -> e.g., WHERE e.salary > (SELECT AVG(...) WHERE dept_id = e.dept_id)',
        EXISTS: 'WHERE EXISTS (SELECT 1 FROM ...) -> returns TRUE as soon as 1 match is found'
      },
      codeSnippet: `-- Classic Interview Pattern: 2nd Highest Salary using Subquery
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary) 
    FROM employees
);

-- Correlated Subquery: Employees earning above their own department average
SELECT e.name, e.department_id, e.salary
FROM employees e
WHERE e.salary > (
    SELECT AVG(sub.salary)
    FROM employees sub
    WHERE sub.department_id = e.department_id
);`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Fraud Detection System',
      badge: 'Production Scenario',
      scenario: 'A payment gateway monitors transactions for suspicious activity.',
      challenge: 'Flag transactions that are 5 times greater than that user\'s personal average transaction amount over the past 90 days.',
      architectureSolution: 'A correlated query flags the transaction on the fly: `SELECT t.* FROM transactions t WHERE t.amount > 5 * (SELECT AVG(h.amount) FROM transactions h WHERE h.user_id = t.user_id AND h.created_at >= NOW() - INTERVAL "90 days")`.'
    },
    {
      cardNumber: 6,
      title: 'Types of Subqueries & Operators',
      badge: 'Architectural Variations',
      variations: [
        { type: 'Scalar Subquery', desc: 'Returns exactly one value (one row, one column). Can be used anywhere a value is expected (SELECT, WHERE).' },
        { type: 'IN / NOT IN Subquery', desc: 'Compares a value against a set of values returned by the inner query.' },
        { type: 'EXISTS / NOT EXISTS', desc: 'Tests for the existence of rows. Returns boolean TRUE/FALSE. Ideal for large tables because of short-circuiting.' },
        { type: 'Correlated Subquery', desc: 'The inner query depends on the current row of the outer query. Evaluates once per outer row.' },
        { type: 'Subquery in FROM (Derived Table)', desc: 'Acts as a temporary in-memory table. Must have an alias in standard SQL.' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Finding Duplicate Records',
      badge: 'Working Trace',
      schema: 'users (id INT, email VARCHAR(100))',
      sampleData: [
        { id: 1, email: 'john@example.com' },
        { id: 2, email: 'bob@example.com' },
        { id: 3, email: 'john@example.com' },
        { id: 4, email: 'alice@example.com' }
      ],
      query: `-- Find all duplicate emails in the system
SELECT email, COUNT(*) AS occurrences
FROM users
GROUP BY email
HAVING email IN (
    SELECT email 
    FROM users 
    GROUP BY email 
    HAVING COUNT(*) > 1
);`,
      result: [
        { email: 'john@example.com', occurrences: 2 }
      ],
      executionFlow: '1. Inner query returns set {"john@example.com"} -> 2. Outer query filters users matching that set and outputs duplicate count.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Subquery Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Using `NOT IN` when the subquery returns even a single `NULL` value (e.g., `WHERE id NOT IN (SELECT parent_id FROM t)` where parent_id contains NULL).',
          why: 'In SQL three-valued logic, `x NOT IN (1, 2, NULL)` evaluates to UNKNOWN for every single row! The query returns ZERO results, failing silently!',
          correct: 'Always use `NOT EXISTS` or ensure `WHERE parent_id IS NOT NULL` inside the NOT IN subquery.'
        },
        {
          wrong: 'Using a subquery that returns multiple rows with a scalar comparison operator like `= (SELECT ...)`.',
          why: 'Will throw a runtime error: "Subquery returned more than 1 value".',
          correct: 'Use `IN`, `ANY`, or `ALL` when the subquery can return multiple rows.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Subqueries',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'Why is EXISTS generally faster than IN for subqueries on large datasets?',
          a: 'EXISTS short-circuits as soon as the database finds a single matching row and returns boolean TRUE. IN evaluates the entire subquery result set into memory before comparing.'
        },
        {
          q: 'How do you find the Nth highest salary in SQL without window functions?',
          a: '`SELECT salary FROM employees e1 WHERE (N-1) = (SELECT COUNT(DISTINCT e2.salary) FROM employees e2 WHERE e2.salary > e1.salary);`'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Subqueries',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'Subquery = Inner query embedded inside outer query to provide dynamic filters or derived tables.',
        keyRule: 'Prefer EXISTS over IN when subquery targets large tables. Beware of NULLs with NOT IN.',
        comparison: 'Non-correlated: Runs once | Correlated: Runs once per outer row (references outer table).',
        commonTrap: 'NOT IN returning empty set if inner query contains even one NULL.',
        interviewKeyword: 'Correlated subquery, EXISTS vs IN, Nth highest salary, Derived table, Short-circuit.'
      }
    }
  ],

  // =========================================================================
  // 8. DATABASE NORMALIZATION (1NF TO BCNF)
  // =========================================================================
  'normalization': [
    {
      cardNumber: 1,
      title: 'What is Database Normalization?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'Normalization is the systematic process of organizing database tables and columns to eliminate duplicate redundant data and prevent data anomalies during inserts, updates, and deletes.',
      analogy: 'Imagine keeping a spreadsheet where every student row contains their name, class, course, AND the professor\'s phone number and home address. If a professor moves homes, you must update 500 rows! Normalization splits this into a Student table and a Professor table connected by an ID.',
      keyConcept: 'Normalization relies on Functional Dependencies (X -> Y) to guide splitting tables into 1NF, 2NF, 3NF, and BCNF without losing information.',
      diagramType: 'normalization-stages'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Normalization? (The 3 Anomalies)',
      badge: 'Problem & Solution',
      problem: 'Unnormalized tables suffer from 3 catastrophic database anomalies: Insertion Anomaly, Deletion Anomaly, and Update Anomaly.',
      whyItMatters: '(1) Insertion Anomaly: Cannot add a course until a student enrolls. (2) Deletion Anomaly: Deleting the only student enrolled in a course accidentally deletes the entire course from existence! (3) Update Anomaly: Updating an address requires editing 10,000 rows.',
      howSolves: 'Normalization guarantees Lossless Join Decomposition and Dependency Preservation, ensuring data integrity across normalized relations.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (The Normal Forms Progression)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: '1NF (Atomicity)', desc: 'All attribute values must be atomic (single-valued). No repeating groups or comma-separated lists.' },
        { step: 2, title: '2NF (No Partial Dependency)', desc: 'Must be in 1NF AND every non-prime attribute must depend fully on the ENTIRE candidate key (not a subset of a composite key).' },
        { step: 3, title: '3NF (No Transitive Dependency)', desc: 'Must be in 2NF AND no non-prime attribute can depend on another non-prime attribute (X -> Y: either X is super key or Y is prime).' },
        { step: 4, title: 'BCNF (Strict Boyce-Codd NF)', desc: 'For every functional dependency X -> Y, X MUST be a Super Key (stronger than 3NF).' }
      ],
      diagramType: 'normal-forms-ladder'
    },
    {
      cardNumber: 4,
      title: 'Syntax & Functional Dependency Rules',
      badge: 'Structural Blueprint',
      structureDetails: {
        FD_DEF: 'X -> Y means: if two rows agree on attribute X, they MUST agree on attribute Y.',
        PRIME_ATTR: 'An attribute that is part of ANY candidate key.',
        NON_PRIME: 'An attribute that is NOT part of any candidate key.',
        PARTIAL_DEP: 'Non-prime attribute depends on part of a composite key (Violates 2NF).',
        TRANSITIVE_DEP: 'Non-prime attribute depends on another non-prime attribute: A -> B and B -> C (Violates 3NF).'
      },
      codeSnippet: `-- Unnormalized Table (Violates 1NF & 2NF):
-- StudentCourses(StudentID, CourseID, StudentName, CourseName, InstructorAddress)

-- 1NF & 2NF Decomposition:
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    instructor_id INT
);

-- 3NF: Separate Instructor to eliminate Transitive Dependency (InstructorID -> InstructorAddress)
CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    instructor_name VARCHAR(100),
    address VARCHAR(200)
);`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Hospital Patient & Ward Management',
      badge: 'Production Scenario',
      scenario: 'A hospital admissions system tracks patients, assigned doctors, and room numbers.',
      challenge: 'If stored in one table: Patient_ID, Doctor_ID, Ward_No, Ward_Head_Nurse. If a ward changes head nurses, thousands of patient records must be updated.',
      architectureSolution: 'Normalized into 3NF: (1) Patients table, (2) Wards table with `Ward_No PRIMARY KEY` and `Head_Nurse`, and (3) Admissions table referencing Patient_ID and Ward_No.'
    },
    {
      cardNumber: 6,
      title: 'Comparison: 1NF vs 2NF vs 3NF vs BCNF',
      badge: 'Architectural Variations',
      variations: [
        { type: '1NF', desc: 'Atomic values only. Eliminate multi-valued columns and duplicate rows.' },
        { type: '2NF', desc: 'Eliminates Partial Dependencies. Only applicable when candidate key is composite.' },
        { type: '3NF', desc: 'Eliminates Transitive Dependencies. For all X -> Y: X is super key OR Y is prime attribute.' },
        { type: 'BCNF', desc: 'Boyce-Codd Normal Form. For all X -> Y: X MUST be a Super Key (no exceptions).' },
        { type: 'Denormalization', desc: 'Intentionally introducing controlled redundancy in Read-heavy Data Warehouses to reduce expensive joins.' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Decomposing to 3NF',
      badge: 'Working Trace',
      schema: 'Relation R(EmpID, DeptID, DeptName, EmpName) with FDs: EmpID -> DeptID, EmpName; DeptID -> DeptName',
      sampleData: [
        { EmpID: 101, EmpName: 'Alice', DeptID: 'D1', DeptName: 'R&D' },
        { EmpID: 102, EmpName: 'Bob', DeptID: 'D1', DeptName: 'R&D' },
        { EmpID: 103, EmpName: 'Charlie', DeptID: 'D2', DeptName: 'Sales' }
      ],
      query: `-- Decomposed into 3NF Relations:
-- Table 1: Employees(EmpID, EmpName, DeptID)
-- Table 2: Departments(DeptID, DeptName)

SELECT e.EmpID, e.EmpName, d.DeptName
FROM employees e
JOIN departments d ON e.DeptID = d.DeptID;`,
      result: [
        { EmpID: 101, EmpName: 'Alice', DeptName: 'R&D' },
        { EmpID: 102, EmpName: 'Bob', DeptName: 'R&D' },
        { EmpID: 103, EmpName: 'Charlie', DeptName: 'Sales' }
      ],
      executionFlow: 'Transitive dependency (EmpID -> DeptID -> DeptName) eliminated by splitting into two clean 3NF tables.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Normalization Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Checking for 2NF violation when the primary key is a single column.',
          why: 'A partial dependency requires a proper SUBSET of a candidate key. If the candidate key is a single column (not composite), 2NF is automatically satisfied!',
          correct: '2NF only needs to be checked if candidate keys are composite.'
        },
        {
          wrong: 'Over-normalizing OLAP data warehouses into BCNF.',
          why: 'BCNF requires many joins to reconstruct analytics data, slowing down BI dashboards.',
          correct: 'Normalize OLTP production transactional databases to 3NF/BCNF; use Star Schema / Snowflake (denormalized) for analytics.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Normalization',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'What is the exact condition that makes a relation BCNF but not 3NF?',
          a: 'In 3NF, for X -> Y, if X is not a super key, it is still valid IF Y is a prime attribute. In BCNF, this exception is forbidden: X MUST be a super key regardless of whether Y is prime.'
        },
        {
          q: 'Can every relation be decomposed into BCNF while preserving all functional dependencies?',
          a: 'No! BCNF decomposition is always lossless, but dependency preservation is NOT guaranteed in BCNF. 3NF always guarantees both lossless join and dependency preservation.'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Normalization',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'Normalization = Eliminating data redundancy and anomalies via functional dependencies.',
        keyRule: '1NF: Atomic values | 2NF: No partial dependency | 3NF: No transitive dependency | BCNF: X is Super Key.',
        comparison: '3NF: Always preserves dependencies | BCNF: May lose dependencies during decomposition.',
        commonTrap: 'Checking 2NF when table key is a single attribute.',
        interviewKeyword: 'Functional dependency, Lossless join, Dependency preservation, Prime attribute, Anomalies.'
      }
    }
  ],

  // =========================================================================
  // 9. TRANSACTIONS & ACID PROPERTIES
  // =========================================================================
  'transactions-acid': [
    {
      cardNumber: 1,
      title: 'What is a Database Transaction & ACID?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'A transaction is a single logical unit of work consisting of one or more SQL operations that must either execute completely or have no effect at all.',
      analogy: 'Imagine sending $500 via Google Pay to your friend. Two things must happen: (1) $500 is deducted from your bank, and (2) $500 is credited to your friend\'s bank. If the mobile network dies halfway through, your $500 must not vanish into thin air. Both steps must succeed together, or both must be rolled back.',
      keyConcept: 'ACID represents the 4 golden pillars: Atomicity (all-or-nothing), Consistency (rules preserved), Isolation (no interference), and Durability (saved permanently).',
      diagramType: 'acid-pillars'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need ACID Guarantees?',
      badge: 'Problem & Solution',
      problem: 'Computers crash, hard drives fail, power cuts occur, and millions of concurrent users write to the same database simultaneously.',
      whyItMatters: 'Without ACID, a power outage midway through a funds transfer could debit the sender without crediting the receiver, destroying trust in financial systems.',
      howSolves: 'The DBMS Transaction Manager coordinates Atomicity and Durability using Write-Ahead Logging (WAL) and undo/redo buffers, ensuring crash resilience.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (Transaction Life Cycle & States)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Active State', desc: 'Transaction begins and is currently executing read and write operations in RAM.' },
        { step: 2, title: 'Partially Committed', desc: 'Final statement has executed, but changes have not yet been flushed and confirmed on disk.' },
        { step: 3, title: 'Committed State', desc: 'Changes successfully written to Write-Ahead Log (WAL) on disk. Cannot be rolled back.' },
        { step: 4, title: 'Failed State', desc: 'An error occurred (constraint violation, crash, or deadlock abort).' },
        { step: 5, title: 'Aborted / Terminated', desc: 'Rollback complete. Database restored to state prior to transaction start.' }
      ],
      diagramType: 'transaction-state-machine'
    },
    {
      cardNumber: 4,
      title: 'Syntax: Transaction Control Statements (TCL)',
      badge: 'Structural Blueprint',
      structureDetails: {
        BEGIN: 'BEGIN TRANSACTION / START TRANSACTION (Marks beginning of atomic block)',
        COMMIT: 'COMMIT (Makes all changes permanent on disk)',
        ROLLBACK: 'ROLLBACK (Reverts all changes made since BEGIN)',
        SAVEPOINT: 'SAVEPOINT sp_name (Creates partial checkpoint within transaction)',
        ROLLBACK_TO: 'ROLLBACK TO SAVEPOINT sp_name (Reverts to named checkpoint)'
      },
      codeSnippet: `-- Bank Transfer Transaction with Error Handling
BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 500 
WHERE account_id = 'ACC_101' AND balance >= 500;

-- Create savepoint before second operation
SAVEPOINT transfer_checkpoint;

UPDATE accounts 
SET balance = balance + 500 
WHERE account_id = 'ACC_202';

-- If everything is valid:
COMMIT;

-- In case of application error:
-- ROLLBACK;`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Airline Seat Reservation System',
      badge: 'Production Scenario',
      scenario: 'IndiGo Airlines sells the last remaining window seat on flight 6E-204.',
      challenge: 'Two travelers in different cities click "Pay & Book" at the exact same millisecond.',
      architectureSolution: 'A serializable transaction locks the seat row. The first transaction commits successfully. The second transaction encounters the lock, detects the seat is no longer available, rolls back, and informs the user.'
    },
    {
      cardNumber: 6,
      title: 'The 4 ACID Properties Explained',
      badge: 'Architectural Variations',
      variations: [
        { type: 'Atomicity (All or Nothing)', desc: 'Guarantees either all SQL statements complete or none do. Managed by Recovery Manager using Undo Logs.' },
        { type: 'Consistency', desc: 'Transitions database from one valid state to another valid state, respecting all constraints (PK, FK, CHECK).' },
        { type: 'Isolation', desc: 'Guarantees that concurrent transactions do not see each other\'s uncommitted dirty intermediate state.' },
        { type: 'Durability', desc: 'Once committed, changes survive server crashes, power failures, or reboots. Enforced by Write-Ahead Log (WAL) and Redo Logs.' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Savepoints & Rollback',
      badge: 'Working Trace',
      schema: 'inventory (item_id, item_name, quantity)',
      sampleData: [
        { item_id: 1, item_name: 'Laptop', quantity: 10 },
        { item_id: 2, item_name: 'Mouse', quantity: 5 }
      ],
      query: `BEGIN TRANSACTION;
UPDATE inventory SET quantity = quantity - 1 WHERE item_id = 1; -- Laptop: 9
SAVEPOINT sp1;
UPDATE inventory SET quantity = quantity - 10 WHERE item_id = 2; -- Error: insufficient stock
ROLLBACK TO SAVEPOINT sp1; -- Mouse reverted, Laptop remains 9
COMMIT;
SELECT * FROM inventory;`,
      result: [
        { item_id: 1, item_name: 'Laptop', quantity: 9 },
        { item_id: 2, item_name: 'Mouse', quantity: 5 }
      ],
      executionFlow: 'Laptop quantity was updated to 9. Mouse update was rolled back to savepoint `sp1`. Commit finalized only the valid laptop decrement.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Transaction Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Assuming that committing a transaction writes the base data table file to disk immediately.',
          why: 'Writing data files to disk is slow (random I/O). The DBMS writes sequentially to the Write-Ahead Log (WAL) on disk and keeps dirty table pages in RAM buffer pool until checkpointing.',
          correct: 'Durability is guaranteed by the WAL disk sync, not immediate table heap writes.'
        },
        {
          wrong: 'Keeping transactions open while waiting for third-party network API calls (e.g., Stripe payment confirmation).',
          why: 'Holding open database transactions keeps row locks active, exhausting connection pools and causing database deadlocks.',
          correct: 'Never make external network HTTP calls inside an active database transaction.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: ACID Semantics',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'Which component of the DBMS guarantees Atomicity and Durability?',
          a: 'The Recovery Manager using the Write-Ahead Log (WAL). Undo logs guarantee Atomicity by rolling back aborted transactions. Redo logs guarantee Durability by reapplying committed changes upon recovery.'
        },
        {
          q: 'What is the difference between a Partially Committed state and a Committed state?',
          a: 'Partially Committed means all statements finished execution in memory, but logs haven\'t been guaranteed on disk. Committed means log records are successfully flushed to disk.'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Transactions & ACID',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'Transaction = Logical atomic unit of work satisfying ACID properties.',
        keyRule: 'Atomicity (Undo Log), Consistency (Constraints), Isolation (Locks/MVCC), Durability (WAL Redo Log).',
        comparison: 'ROLLBACK: Cancels all changes | SAVEPOINT: Partial checkpoint for selective rollback.',
        commonTrap: 'Doing network/HTTP calls inside an open transaction.',
        interviewKeyword: 'ACID, WAL, Undo/Redo, Savepoint, Partially committed, State machine.'
      }
    }
  ],

  // =========================================================================
  // 10. CONCURRENCY CONTROL & DEADLOCKS
  // =========================================================================
  'concurrency-locking': [
    {
      cardNumber: 1,
      title: 'What is Concurrency Control & Isolation?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'Concurrency control is the database mechanism that allows thousands of users to read and write data at the same time without creating corrupted values or data races.',
      analogy: 'Think of a Google Doc shared with your classmates. If two people type on the exact same word at the exact same millisecond without coordination, characters get jumbled. Concurrency control is the coordination protocol that ensures everyone\'s edits merge cleanly and predictably.',
      keyConcept: 'Without concurrency control, databases suffer from Dirty Reads, Non-Repeatable Reads, Phantom Reads, and Lost Updates.',
      diagramType: 'concurrency-conflicts'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Concurrency Protocols?',
      badge: 'Problem & Solution',
      problem: 'Serial execution (running one transaction at a time) is 100% safe, but destroys system throughput and responsiveness (only 1 user can use the app at a time).',
      whyItMatters: 'Interleaving transactions concurrently increases CPU and disk throughput, but introduces race conditions like the Lost Update anomaly.',
      howSolves: 'Two-Phase Locking (2PL) and Multi-Version Concurrency Control (MVCC) guarantee Conflict Serializability while allowing high concurrent throughput.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (Two-Phase Locking - 2PL)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Growing Phase', desc: 'Transaction acquires locks as needed (Shared locks for reads, Exclusive locks for writes). Cannot release any lock yet.' },
        { step: 2, title: 'Lock Point', desc: 'The moment the transaction holds all required locks.' },
        { step: 3, title: 'Shrinking Phase', desc: 'Transaction releases locks one by one. Strict rule: Once a lock is released, NO new lock can ever be acquired!' },
        { step: 4, title: 'Strict 2PL', desc: 'All exclusive locks are held until COMMIT/ABORT, preventing cascading rollbacks.' }
      ],
      diagramType: '2pl-phases'
    },
    {
      cardNumber: 4,
      title: 'Syntax: SQL Isolation Levels',
      badge: 'Structural Blueprint',
      structureDetails: {
        READ_UNCOMMITTED: 'Dirty Reads allowed, Non-Repeatable Reads allowed, Phantom Reads allowed (Fastest, lowest isolation)',
        READ_COMMITTED: 'No Dirty Reads. Reads only committed data. (Default in PostgreSQL, Oracle, SQL Server)',
        REPEATABLE_READ: 'No Dirty Reads, No Non-Repeatable Reads. (Default in MySQL InnoDB)',
        SERIALIZABLE: 'Zero anomalies. Complete logical isolation as if transactions ran one after another.'
      },
      codeSnippet: `-- Setting Transaction Isolation Level in SQL
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;

-- Row-level explicit locking
SELECT balance 
FROM accounts 
WHERE account_id = 'ACC_900' 
FOR UPDATE; -- Acquires Exclusive (X) Lock immediately

UPDATE accounts SET balance = balance - 100 WHERE account_id = 'ACC_900';
COMMIT;`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Flash Sale Ticket Booking',
      badge: 'Production Scenario',
      scenario: 'BookMyShow releases Coldplay concert tickets; 200,000 fans click to buy 5,000 tickets.',
      challenge: 'If Isolation Level is Read Uncommitted, multiple fans see the same ticket as available and pay for it (Double Booking).',
      architectureSolution: 'Using `SELECT ... FOR UPDATE` under `REPEATABLE READ` or `SERIALIZABLE` isolation acquires an exclusive lock on the ticket row, ensuring only the first buyer can complete checkout.'
    },
    {
      cardNumber: 6,
      title: 'The 4 Concurrency Anomalies & Deadlocks',
      badge: 'Architectural Variations',
      variations: [
        { type: 'Dirty Read', desc: 'T1 updates row without committing; T2 reads that dirty uncommitted value; T1 rolls back! (T2 used bogus data).' },
        { type: 'Non-Repeatable Read', desc: 'T1 reads row; T2 updates and commits that row; T1 reads row again and gets a different value!' },
        { type: 'Phantom Read', desc: 'T1 runs range query (e.g., salary > 50k); T2 inserts a new row matching that range; T1 repeats query and sees phantom new rows!' },
        { type: 'Deadlock', desc: 'T1 holds lock on A and waits for B; T2 holds lock on B and waits for A. Neither can progress (Wait-For Graph cycle).' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Deadlock Detection & Resolution',
      badge: 'Working Trace',
      schema: 'accounts (id, balance)',
      sampleData: [
        { id: 1, balance: 1000 },
        { id: 2, balance: 2000 }
      ],
      query: `-- Transaction 1: Locks Account 1, requests Account 2
-- T1: UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- T2: UPDATE accounts SET balance = balance - 100 WHERE id = 2;
-- T1: UPDATE accounts SET balance = balance + 100 WHERE id = 2; -- Waits for T2
-- T2: UPDATE accounts SET balance = balance + 100 WHERE id = 1; -- Deadlock detected!

-- DBMS Engine Action:
-- Detects cycle in Wait-For Graph: T1 -> T2 -> T1
-- Selects a victim transaction (e.g., T2) and aborts it with:
-- ERROR: deadlock detected (Detail: Process 1234 waits for ExclusiveLock)`,
      result: [
        { victim_action: 'T2 aborted and rolled back', survivor_action: 'T1 proceeds and commits' }
      ],
      executionFlow: 'DBMS Lock Manager detects cycle in Wait-For Graph, aborts one transaction as the victim, and lets the other complete safely.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Locking Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Assuming that 2PL (Two-Phase Locking) completely prevents deadlocks.',
          why: '2PL guarantees Serializability, but it DOES NOT prevent deadlocks! In fact, 2PL can easily cause deadlocks when two transactions acquire locks in different orders.',
          correct: 'To prevent deadlocks under 2PL, enforce a global ordering on lock acquisition or use Wait-Die / Wound-Wait timestamps.'
        },
        {
          wrong: 'Using SERIALIZABLE isolation for every query in high-traffic applications.',
          why: 'SERIALIZABLE creates high lock contention and frequent aborts/retries, crippling throughput.',
          correct: 'Use READ COMMITTED or REPEATABLE READ with explicit `FOR UPDATE` only where strict consistency is needed.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Concurrency Control',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'What is the difference between Strict 2PL and Rigorous 2PL?',
          a: 'Strict 2PL holds all Exclusive (write) locks until the transaction commits or aborts. Rigorous 2PL holds BOTH Shared (read) and Exclusive (write) locks until commit or abort.'
        },
        {
          q: 'What is a Wait-For Graph (WFG) and how is it used?',
          a: 'A directed graph where vertices represent active transactions and edges (Ti -> Tj) represent Ti waiting for a lock held by Tj. A cycle in the WFG indicates a deadlock.'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Concurrency Control',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'Concurrency Control = Manages simultaneous transaction access to preserve serializability and prevent anomalies.',
        keyRule: '2PL has Growing Phase (acquire locks) and Shrinking Phase (release locks). Once shrunk, no new locks!',
        comparison: 'Dirty Read (Read Uncommitted) | Non-Repeatable Read (Read Committed) | Phantom Read (Repeatable Read).',
        commonTrap: 'Believing 2PL prevents deadlocks. 2PL guarantees serializability, not deadlock freedom.',
        interviewKeyword: '2PL, MVCC, Wait-For Graph, Dirty read, Phantom read, Isolation levels, Victim selection.'
      }
    }
  ],

  // =========================================================================
  // 11. INDEXING, B-TREES & B+ TREES
  // =========================================================================
  'indexing-btrees': [
    {
      cardNumber: 1,
      title: 'What is a Database Index?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'A database index is a separate data structure (most commonly a B+ Tree) that stores sorted column values with pointers to their full table rows, enabling lightning-fast lookups without scanning every single row on disk.',
      analogy: 'Imagine searching for the word "Photosynthesis" in an 800-page biology textbook. Without an index, you would have to read every page from page 1 to 800 (Full Table Scan: O(N)). With the alphabetized index at the back of the book, you flip directly to "P", find "page 412", and jump there in 2 seconds (Index Seek: O(log N)).',
      keyConcept: 'Indexes dramatically speed up SELECT queries at the cost of additional disk storage and slightly slower INSERT, UPDATE, and DELETE operations.',
      diagramType: 'btree-index'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Indexes?',
      badge: 'Problem & Solution',
      problem: 'A database table with 10 million rows stored on disk requires reading gigabytes of data pages into RAM during a Full Table Scan (taking 30+ seconds).',
      whyItMatters: 'If every user search takes 30 seconds, a web service immediately crashes under traffic.',
      howSolves: 'A B+ Tree index has high fan-out (order 100+). Searching 10 million rows requires only 3 to 4 disk page reads (taking less than 2 milliseconds).'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (B-Tree vs B+ Tree Structure)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'Root & Internal Nodes', desc: 'Store only search keys and child page pointers (no data records). High fan-out keeps tree height extremely low (typically 3-4 levels).' },
        { step: 2, title: 'Leaf Nodes', desc: 'In a B+ Tree, ALL actual data pointers reside strictly in the leaf nodes, all at the exact same depth (balanced).' },
        { step: 3, title: 'Doubly-Linked Leaf Chain', desc: 'All leaf nodes are connected via a doubly-linked list, allowing blazing fast range scans (`WHERE age BETWEEN 20 AND 30`).' },
        { step: 4, title: 'Binary Search within Page', desc: 'Inside each disk page, search keys are sorted, allowing binary search in O(log K) CPU time.' }
      ],
      diagramType: 'bplus-tree-structure'
    },
    {
      cardNumber: 4,
      title: 'Syntax: Creating Clustered & Non-Clustered Indexes',
      badge: 'Structural Blueprint',
      structureDetails: {
        CLUSTERED_INDEX: 'Determines the physical on-disk storage order of table rows. Exactly 1 per table (typically Primary Key).',
        NON_CLUSTERED: 'Separate index structure with sorted keys and row pointers (RID or clustered key). Multiple allowed per table.',
        COMPOSITE_INDEX: 'Index on multiple columns: CREATE INDEX idx_dept_sal ON emp(dept_id, salary)',
        UNIQUE_INDEX: 'CREATE UNIQUE INDEX idx_email ON users(email)'
      },
      codeSnippet: `-- Create index on customer email
CREATE UNIQUE INDEX idx_customer_email ON customers(email);

-- Composite index for frequent multi-column queries
CREATE INDEX idx_emp_dept_salary ON employees(department_id, salary DESC);

-- Query using the composite index
EXPLAIN ANALYZE
SELECT emp_id, salary 
FROM employees 
WHERE department_id = 5 AND salary > 70000;`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: Uber Rider Phone Lookup',
      badge: 'Production Scenario',
      scenario: 'Uber receives 50 million ride requests daily. When a driver calls a rider, the app queries by rider phone number.',
      challenge: 'Scanning the 500-million-row riders table on disk would take minutes, leaving the driver hanging.',
      architectureSolution: 'A B+ Tree index on `phone_number` traverses 3 index levels in RAM cache and retrieves the rider record in under 1 millisecond.'
    },
    {
      cardNumber: 6,
      title: 'Types of Indexes in Modern DBMS',
      badge: 'Architectural Variations',
      variations: [
        { type: 'Clustered Index', desc: 'The leaf nodes of the B+ Tree ARE the actual data rows. A table can have ONLY ONE clustered index.' },
        { type: 'Non-Clustered (Secondary) Index', desc: 'Leaf nodes contain sorted key values and pointers to the base table rows. A table can have multiple secondary indexes.' },
        { type: 'Composite Index', desc: 'Index on two or more columns. Follows the Leftmost Prefix Rule.' },
        { type: 'Covering Index', desc: 'All columns requested in SELECT, WHERE, and ORDER BY exist in the index itself, avoiding touching the base table heap (Index-Only Scan).' },
        { type: 'Hash Index', desc: 'O(1) exact match lookup using hash functions, but does NOT support range queries (`>`, `<`, `BETWEEN`).' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Index Scan vs Seq Scan',
      badge: 'Working Trace',
      schema: 'orders (order_id PK, customer_id, order_date, amount)',
      sampleData: [
        { order_id: 1001, customer_id: 85, amount: 250 },
        { order_id: 1002, customer_id: 12, amount: 450 }
      ],
      query: `-- Check query execution plan using EXPLAIN
EXPLAIN SELECT order_id, amount FROM orders WHERE customer_id = 85;

-- Without index:
-- -> Seq Scan on orders (cost=0.00..18500.00 rows=10 width=16)

-- After creating index:
CREATE INDEX idx_orders_customer ON orders(customer_id);
-- -> Index Scan using idx_orders_customer on orders (cost=0.29..8.31 rows=10 width=16)`,
      result: [
        { plan: 'Index Scan', cost_reduction: 'Over 2,000x faster than Sequential Scan' }
      ],
      executionFlow: 'Optimizer switches from expensive Sequential Table Scan to O(log N) B+ Tree Index Scan.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Indexing Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Wrapping indexed columns inside functions in the WHERE clause: `WHERE YEAR(order_date) = 2026` or `WHERE LOWER(email) = "user@test.com"`.',
          why: 'Applying a function to an indexed column invalidates index usage, forcing the engine into a full table scan!',
          correct: 'Keep the indexed column naked: `WHERE order_date >= "2026-01-01" AND order_date < "2027-01-01"`, or create an expression/functional index.'
        },
        {
          wrong: 'Violating the Leftmost Prefix Rule on a composite index on `(A, B, C)` by querying only `WHERE B = 10 AND C = 20`.',
          why: 'A B+ Tree on (A, B, C) is sorted primarily by A. Without filtering on A, the tree cannot be navigated efficiently.',
          correct: 'Always include the leftmost column (A) in the query filter.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Indexing',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'Why are B+ Trees preferred over B-Trees and Binary Search Trees for database indexes?',
          a: '1. B+ Trees have very high fan-out, meaning low tree height and minimal disk I/O. 2. Leaf nodes in B+ Trees are linked sequentially in a linked list, making range scans blazing fast. 3. Internal nodes store only keys (no data), packing thousands of pointers per disk page.'
        },
        {
          q: 'What is a Covering Index?',
          a: 'An index that contains all columns requested by a query (in SELECT, WHERE, ORDER BY). The query engine satisfies the request directly from the index leaf nodes without performing a secondary lookup to the table heap (Index-Only Scan).'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Indexing',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'Index = B+ Tree data structure speeding up retrieval from O(N) to O(log N).',
        keyRule: '1 Clustered Index per table. Leftmost prefix rule for composite indexes. Do not wrap columns in functions.',
        comparison: 'Clustered: Leaf IS the table row | Non-Clustered: Leaf points to table row.',
        commonTrap: 'Putting functions on indexed columns (e.g. `WHERE UPPER(name) = "ALICE"`) causes full table scans.',
        interviewKeyword: 'B+ Tree, Clustered vs Non-clustered, Covering index, Leftmost prefix, High fan-out.'
      }
    }
  ],

  // =========================================================================
  // 12. VIEWS, TRIGGERS & STORED PROCEDURES
  // =========================================================================
  'views-stored-procedures': [
    {
      cardNumber: 1,
      title: 'What are Views, Triggers & Stored Procedures?',
      badge: 'Beginner Intuition',
      inSimpleWords: 'Views are virtual saved queries that act like tables. Stored Procedures are pre-compiled batches of SQL logic stored inside the database. Triggers are automated programs that fire automatically when specific table events occur.',
      analogy: 'A View is like a camera monitor showing a live feed of the front gate (you see the view, but the camera is not a physical gate). A Stored Procedure is like a kitchen microwave recipe preset (press button 1 to defrost and cook). A Trigger is like a fire sprinkler that sprays water automatically the moment smoke is detected.',
      keyConcept: 'These database objects enforce business rules, automate audits, encapsulate complex queries, and protect sensitive columns.',
      diagramType: 'programmable-dbms'
    },
    {
      cardNumber: 2,
      title: 'Why Do We Need Views & Triggers?',
      badge: 'Problem & Solution',
      problem: 'Sending raw multi-table joins and calculating payroll formulas repeatedly in client application code introduces security leaks and logic duplication.',
      whyItMatters: 'If 5 different mobile apps write their own audit logic, a bug in one app allows untracked balance tampering.',
      howSolves: 'Views restrict column visibility for row-level security. Triggers provide tamper-proof automated auditing directly at the database engine level.'
    },
    {
      cardNumber: 3,
      title: 'How Does It Work? (View Resolution & Trigger Lifecycle)',
      badge: 'Execution Architecture',
      steps: [
        { step: 1, title: 'View Query Merging', desc: 'When you query a View, the optimizer merges the view\'s defining query with your outer query into a single execution tree.' },
        { step: 2, title: 'BEFORE Trigger', desc: 'Fires before the row modification occurs (ideal for data validation, sanitization, or generating UUIDs).' },
        { step: 3, title: 'Operation Execution', desc: 'The actual INSERT, UPDATE, or DELETE executes on the target table page.' },
        { step: 4, title: 'AFTER Trigger', desc: 'Fires after the modification succeeds (ideal for audit logging and syncing external tables).' }
      ],
      diagramType: 'trigger-lifecycle'
    },
    {
      cardNumber: 4,
      title: 'Syntax: Creating Views, Triggers & Procedures',
      badge: 'Structural Blueprint',
      structureDetails: {
        CREATE_VIEW: 'CREATE VIEW view_name AS SELECT ... FROM ...',
        CREATE_TRIGGER: 'CREATE TRIGGER trg_name BEFORE/AFTER INSERT/UPDATE/DELETE ON table FOR EACH ROW ...',
        OLD_NEW: ':NEW represents incoming updated row; :OLD represents existing pre-update row',
        STORED_PROCEDURE: 'CREATE PROCEDURE proc_name(IN param1 INT) LANGUAGE plpgsql AS ...'
      },
      codeSnippet: `-- 1. Security View hiding sensitive salary details
CREATE VIEW public_staff_view AS
SELECT emp_id, name, department_id, email
FROM employees
WHERE is_active = TRUE;

-- 2. Audit Log Trigger
CREATE TABLE employee_audit (
    emp_id INT,
    old_salary NUMERIC,
    new_salary NUMERIC,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION log_salary_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO employee_audit (emp_id, old_salary, new_salary)
        VALUES (OLD.emp_id, OLD.salary, NEW.salary);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_salary_audit
AFTER UPDATE ON employees
FOR EACH ROW EXECUTE FUNCTION log_salary_change();`
    },
    {
      cardNumber: 5,
      title: 'Real-World Example: FinTech Audit Trail',
      badge: 'Production Scenario',
      scenario: 'A digital wallet platform must comply with banking compliance laws requiring an immutable audit trail of all balance changes.',
      challenge: 'Relying on application code developers to write an audit entry every time they update a balance risks developers forgetting it.',
      architectureSolution: 'An `AFTER UPDATE` Trigger on the `wallets` table writes automatically to an append-only `wallet_audits` table. Even if someone writes raw SQL, the trigger guarantees the audit record is captured.'
    },
    {
      cardNumber: 6,
      title: 'Types of Views & Trigger Modes',
      badge: 'Architectural Variations',
      variations: [
        { type: 'Standard (Virtual) View', desc: 'Stores NO physical data on disk. Recomputes query dynamically upon every access.' },
        { type: 'Materialized View', desc: 'Physically caches query results on disk. Must be refreshed periodically (`REFRESH MATERIALIZED VIEW`). Blazing fast for heavy analytics.' },
        { type: 'BEFORE Trigger', desc: 'Fires before row is written. Can inspect and modify `:NEW` values or abort transaction.' },
        { type: 'AFTER Trigger', desc: 'Fires after row is written. Cannot modify `:NEW`, but safe for audit logging and cascading updates.' },
        { type: 'INSTEAD OF Trigger', desc: 'Used on complex multi-table views to define custom update logic.' }
      ]
    },
    {
      cardNumber: 7,
      title: 'Complete Working Example: Safe View Querying',
      badge: 'Working Trace',
      schema: 'employees (emp_id, name, ssn, salary, dept_id)',
      sampleData: [
        { emp_id: 1, name: 'Alice', ssn: '999-11-2222', salary: 120000, dept_id: 10 },
        { emp_id: 2, name: 'Bob', ssn: '888-22-3333', salary: 95000, dept_id: 20 }
      ],
      query: `-- Querying the public view (SSN and Salary are hidden)
SELECT name, dept_id 
FROM public_staff_view 
WHERE dept_id = 10;`,
      result: [
        { name: 'Alice', dept_id: 10 }
      ],
      executionFlow: 'Database expands public_staff_view into base table query, strips SSN and Salary from projection, and returns only authorized columns.'
    },
    {
      cardNumber: 8,
      title: 'Common Mistakes & Trigger Traps',
      badge: 'Pitfalls & Traps',
      traps: [
        {
          wrong: 'Creating recursive triggers that trigger themselves indefinitely (e.g., Trigger on Table A updates Table A, which fires the trigger again).',
          why: 'Leads to infinite recursion and stack overflow errors that crash database connections.',
          correct: 'Always include terminating conditional checks or disable recursive triggers.'
        },
        {
          wrong: 'Treating a standard View like a fast performance cache.',
          why: 'A standard view does NOT cache data; it runs the full underlying SQL query every single time.',
          correct: 'Use a MATERIALIZED VIEW if you need physically cached precomputed query results.'
        }
      ]
    },
    {
      cardNumber: 9,
      title: 'Interview & Placement Angle: Views & Triggers',
      badge: 'Interview Mastery',
      questions: [
        {
          q: 'What is the difference between a View and a Materialized View?',
          a: 'A standard View is a virtual table that stores only the query definition and runs dynamically every time it is queried. A Materialized View physically saves the query result on disk like a table, delivering instant reads, but requires periodic refreshing to stay in sync with base tables.'
        },
        {
          q: 'What are the keywords OLD and NEW in triggers?',
          a: 'OLD represents the row before modification (available in UPDATE and DELETE). NEW represents the row after modification (available in INSERT and UPDATE).'
        }
      ]
    },
    {
      cardNumber: 10,
      title: 'Quick Revision Cheat Sheet: Views & Triggers',
      badge: 'Cheat Sheet',
      cheatSheet: {
        definition: 'Views = Virtual queries. Triggers = Event-driven automated procedures. Stored Procedures = Precompiled logic.',
        keyRule: 'Standard View runs query every time; Materialized View caches to disk. Triggers use OLD and NEW.',
        comparison: 'BEFORE Trigger: Data validation/sanitization | AFTER Trigger: Audit trails and cascading events.',
        commonTrap: 'Recursive triggers firing in an infinite loop. Assuming standard views cache data.',
        interviewKeyword: 'Materialized view, BEFORE vs AFTER trigger, OLD and NEW pseudorecords, Stored procedure, Encapsulation.'
      }
    }
  ]
};

/**
 * Helper to fetch the 10 cards for any topic ID
 */
export function getDBMSTopicCards(rawTopicId) {
  if (!rawTopicId) return DBMS_TOPIC_CARDS['dbms-architecture'];
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  return DBMS_TOPIC_CARDS[clean] || DBMS_TOPIC_CARDS['dbms-architecture'];
}
