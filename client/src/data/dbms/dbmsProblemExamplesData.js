/**
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

export const DBMS_PROBLEM_EXAMPLES = {
  "dbms-architecture": [
    {
      "id": "arch-ex-1",
      "title": "Designing External Views for Role-Based Data Independence",
      "difficulty": "Medium",
      "attribution": "Interview-style (System Design)",
      "problem": "A hospital database contains sensitive medical history and billing info. Design logical external views to provide physical data independence for the Receptionist role and Physician role without altering the underlying physical storage schema.",
      "givenSchema": "CREATE TABLE patient_records (\n    patient_id INT PRIMARY KEY,\n    name VARCHAR(100),\n    contact_no VARCHAR(15),\n    diagnosis TEXT,\n    prescriptions TEXT,\n    billing_balance NUMERIC(10,2)\n);",
      "givenData": [
        {
          "patient_id": 101,
          "name": "John Doe",
          "contact_no": "9876543210",
          "diagnosis": "Hypertension",
          "billing_balance": 150
        },
        {
          "patient_id": 102,
          "name": "Jane Smith",
          "contact_no": "9123456780",
          "diagnosis": "Diabetes Type 2",
          "billing_balance": 0
        }
      ],
      "required": "Create two distinct Views: `reception_patient_view` (hiding medical diagnosis) and `doctor_patient_view` (showing medical details, hiding billing).",
      "concept": "Logical Data Independence via ANSI-SPARC 3-Tier External Schemas.",
      "query": "-- View for Receptionist (Billing & Contact info only)\nCREATE VIEW reception_patient_view AS\nSELECT patient_id, name, contact_no, billing_balance\nFROM patient_records;\n\n-- View for Doctors (Medical history only)\nCREATE VIEW doctor_patient_view AS\nSELECT patient_id, name, diagnosis, prescriptions\nFROM patient_records;",
      "output": [
        {
          "view": "reception_patient_view",
          "columns": "patient_id, name, contact_no, billing_balance"
        },
        {
          "view": "doctor_patient_view",
          "columns": "patient_id, name, diagnosis, prescriptions"
        }
      ],
      "explanation": "By abstracting base tables into external level views, any physical column restructuring or internal index change on `patient_records` does not break client applications consuming either view.",
      "queryBreakdown": [
        {
          "clause": "CREATE VIEW",
          "purpose": "Defines an external level schema representation without creating duplicate physical files on disk."
        },
        {
          "clause": "SELECT",
          "purpose": "Projects strictly authorized columns for specific user personas, implementing row-level security."
        },
        {
          "clause": "FROM",
          "purpose": "References the single source of truth conceptual relation `patient_records`."
        }
      ]
    },
    {
      "id": "arch-ex-2",
      "title": "Write-Ahead Logging (WAL) Crash Recovery Protocol",
      "difficulty": "Hard",
      "attribution": "Placement-style (Core Engineering)",
      "problem": "Explain the sequence of WAL actions required when transferring $200 from Account A to Account B, and determine how the DBMS recovers if power fails after writing log records but before dirty buffer pages reach disk.",
      "givenSchema": "accounts (account_id VARCHAR(10) PRIMARY KEY, balance INT);",
      "givenData": [
        {
          "account_id": "A",
          "balance": 1000
        },
        {
          "account_id": "B",
          "balance": 500
        }
      ],
      "required": "Trace WAL log sequence (START, UPDATE, COMMIT) and demonstrate how the Recovery Manager handles REDO and UNDO phases.",
      "concept": "Durability & Atomicity through Write-Ahead Logging (WAL) and ARIES recovery.",
      "query": "-- Conceptual SQL transaction sequence\nBEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 200 WHERE account_id = 'A';\nUPDATE accounts SET balance = balance + 200 WHERE account_id = 'B';\nCOMMIT;",
      "output": [
        {
          "log_sequence": "1. <T1, START>"
        },
        {
          "log_sequence": "2. <T1, A, old: 1000, new: 800>"
        },
        {
          "log_sequence": "3. <T1, B, old: 500, new: 700>"
        },
        {
          "log_sequence": "4. <T1, COMMIT> (Flushed to disk!)"
        }
      ],
      "explanation": "WAL enforces the Golden Rule: A dirty data page in RAM must NEVER be written to disk before its corresponding log record is flushed to persistent disk. If power fails after step 4, the Recovery Manager performs a REDO pass on restart, reading the committed log and writing A=800, B=700 into table data files.",
      "queryBreakdown": [
        {
          "clause": "BEGIN",
          "purpose": "Allocates transaction descriptor in DBMS Transaction Manager memory table."
        },
        {
          "clause": "UPDATE",
          "purpose": "Writes undo/redo log in WAL buffer and marks buffer pool memory pages dirty."
        },
        {
          "clause": "COMMIT",
          "purpose": "Forces fsync of WAL buffer to persistent storage, guaranteeing Durability."
        }
      ]
    },
    {
      "id": "arch-ex-3",
      "title": "Buffer Pool Management, Dirty Pages & Eviction Policies",
      "difficulty": "Hard",
      "attribution": "Interview-style (Database Internals)",
      "problem": "A high-throughput OLTP database server maintains a buffer pool of 4 memory frames. When frame capacity is reached and a read miss occurs for page P5, trace how the LRU page replacement algorithm chooses a victim page and when the DB Writer background process issues an fsync for dirty pages.",
      "givenSchema": "Conceptual Buffer Pool Table: frame_id INT, page_id INT, is_dirty BOOLEAN, pin_count INT, last_accessed_time TIMESTAMP",
      "givenData": [
        {
          "frame_id": 1,
          "page_id": "P1",
          "is_dirty": true,
          "pin_count": 0,
          "last_accessed": "10:00:01"
        },
        {
          "frame_id": 2,
          "page_id": "P2",
          "is_dirty": false,
          "pin_count": 1,
          "last_accessed": "10:00:04"
        },
        {
          "frame_id": 3,
          "page_id": "P3",
          "is_dirty": false,
          "pin_count": 0,
          "last_accessed": "10:00:03"
        },
        {
          "frame_id": 4,
          "page_id": "P4",
          "is_dirty": true,
          "pin_count": 0,
          "last_accessed": "10:00:02"
        }
      ],
      "required": "Identify the victim frame for page P5, detail the flushing protocol if dirty, and explain why pinned frames cannot be evicted.",
      "concept": "Buffer Pool Management, LRU Page Replacement, Dirty Bit & Checkpoint flushing.",
      "query": "-- Query identifying LRU victim candidate (pin_count = 0 with oldest access timestamp)\nSELECT frame_id, page_id, is_dirty\nFROM buffer_pool_status\nWHERE pin_count = 0\nORDER BY last_accessed_time ASC\nLIMIT 1;\n\n-- Protocol execution:\n-- Frame 1 holds P1 (dirty: true, pin: 0, time: 10:00:01) -> Selected as victim!\n-- 1. Flush P1 log records to WAL on disk (WAL invariant).\n-- 2. Asynchronously flush dirty page P1 to table datafile on disk.\n-- 3. Load requested page P5 from disk into Frame 1 and set pin_count = 1.",
      "output": [
        {
          "victim_frame": 1,
          "evicted_page": "P1",
          "action": "Flush dirty page to disk via WAL protocol, then load P5"
        }
      ],
      "explanation": "When a page miss occurs in a saturated buffer pool, the DBMS scans for unpinned frames (pin_count = 0). Frame 1 has the oldest timestamp (10:00:01). Because its dirty bit is set, the DBMS must flush P1 modifications to persistent disk before overwriting the memory frame.",
      "queryBreakdown": [
        {
          "clause": "WHERE pin_count = 0",
          "purpose": "Protects pages currently being accessed by running transactions from eviction."
        },
        {
          "clause": "ORDER BY last_accessed_time ASC",
          "purpose": "Identifies Least Recently Used (LRU) candidate frame."
        },
        {
          "clause": "WAL Invariant Check",
          "purpose": "Guarantees WAL is flushed before dirty data page reaches disk."
        }
      ]
    }
  ],
  "er-model": [
    {
      "id": "er-ex-1",
      "title": "Mapping Many-to-Many (M:N) Relationship to Relational Tables",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Infosys)",
      "problem": "A college library allows students to borrow multiple books, and a book title can have multiple student borrow records over time. Model the M:N relationship with borrow date and return date attributes.",
      "givenSchema": "Entities: Student(student_id, name), Book(book_id, title, author)",
      "givenData": [
        {
          "student": "101 - Rohan",
          "books_borrowed": "B-01 (Clean Code), B-02 (Database Concepts)"
        }
      ],
      "required": "Generate standard normalized SQL schema that resolves the M:N relationship with referential integrity.",
      "concept": "Associative / Junction table creation for M:N cardinality.",
      "query": "CREATE TABLE students (\n    student_id INT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE books (\n    book_id INT PRIMARY KEY,\n    title VARCHAR(150) NOT NULL,\n    author VARCHAR(100)\n);\n\n-- Junction Table representing the Borrow relationship\nCREATE TABLE book_loans (\n    loan_id SERIAL PRIMARY KEY,\n    student_id INT REFERENCES students(student_id) ON DELETE RESTRICT,\n    book_id INT REFERENCES books(book_id) ON DELETE RESTRICT,\n    borrow_date DATE DEFAULT CURRENT_DATE,\n    return_date DATE,\n    CONSTRAINT uq_active_loan UNIQUE (book_id, borrow_date)\n);",
      "output": [
        {
          "table_name": "book_loans",
          "foreign_keys": "student_id -> students, book_id -> books",
          "relationship_type": "M:N Bridge"
        }
      ],
      "explanation": "M:N relationships cannot be modeled directly with a foreign key in either parent table without violating 1NF. The junction table `book_loans` resolves this into two clean 1:N relationships.",
      "queryBreakdown": [
        {
          "clause": "PRIMARY KEY",
          "purpose": "Guarantees unique identity for each loan transaction record."
        },
        {
          "clause": "REFERENCES",
          "purpose": "Enforces referential integrity with parent students and books tables."
        },
        {
          "clause": "ON DELETE RESTRICT",
          "purpose": "Prevents accidental deletion of student records with active unreturned books."
        }
      ]
    },
    {
      "id": "er-ex-2",
      "title": "Modeling Weak Entity with Composite Key & ON DELETE CASCADE",
      "difficulty": "Hard",
      "attribution": "Interview-style (TCS Digital / Cognizant)",
      "problem": "An enterprise tracks employees and their family dependents. A dependent cannot exist without an employee and has no independent national SSN. Map this Weak Entity relationship.",
      "givenSchema": "Strong Entity: Employee(emp_id, emp_name); Weak Entity: Dependent(dep_name, birth_date, relationship)",
      "givenData": [
        {
          "emp_id": 1,
          "emp_name": "Vikram",
          "dependents": [
            {
              "dep_name": "Aarav",
              "relation": "Son"
            }
          ]
        }
      ],
      "required": "Write SQL schema for the weak entity using partial key + parent key as composite primary key.",
      "concept": "Weak entities, identifying relationships, and composite foreign key constraints.",
      "query": "CREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    emp_name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE employee_dependents (\n    emp_id INT,\n    dep_name VARCHAR(50),\n    relationship VARCHAR(30),\n    birth_date DATE,\n    PRIMARY KEY (emp_id, dep_name),\n    FOREIGN KEY (emp_id) REFERENCES employees(emp_id) ON DELETE CASCADE\n);",
      "output": [
        {
          "emp_id": 1,
          "dep_name": "Aarav",
          "relationship": "Son",
          "birth_date": "2018-05-12"
        }
      ],
      "explanation": "The weak entity table `employee_dependents` uses a composite primary key consisting of the identifying parent key `emp_id` and the partial discriminator `dep_name`. If the employee leaves, `ON DELETE CASCADE` removes their dependents automatically.",
      "queryBreakdown": [
        {
          "clause": "PRIMARY KEY (emp_id, dep_name)",
          "purpose": "Composite primary key formed from parent key and partial discriminator."
        },
        {
          "clause": "FOREIGN KEY ... ON DELETE CASCADE",
          "purpose": "Maintains existence dependency; deleting parent purges child automatically."
        }
      ]
    },
    {
      "id": "er-ex-3",
      "title": "Ternary Relationship vs Aggregation Transformation",
      "difficulty": "Hard",
      "attribution": "Interview-style (GATE / Enterprise Architecture)",
      "problem": "A medical clinical trial records a Doctor prescribing a specific Drug to a Patient for a specific Treatment Regimen. Differentiate between modeling this as a Ternary Relationship vs an Aggregation, and write the normalized relational table schema.",
      "givenSchema": "Entities: Doctor(doc_id), Patient(pat_id), Drug(drug_id), Treatment(regimen_id)",
      "givenData": [
        {
          "doctor": "D10",
          "patient": "P402",
          "drug": "Remdesivir",
          "regimen": "COVID-Severe-5Day"
        }
      ],
      "required": "Provide SQL DDL defining the relational mapping of the ternary relationship with composite foreign keys and audit constraints.",
      "concept": "Higher-Degree ER Relationships and Relational Schema Reduction.",
      "query": "CREATE TABLE clinical_prescriptions (\n    prescription_id SERIAL PRIMARY KEY,\n    doctor_id INT NOT NULL REFERENCES doctors(doc_id) ON DELETE RESTRICT,\n    patient_id INT NOT NULL REFERENCES patients(pat_id) ON DELETE RESTRICT,\n    drug_id INT NOT NULL REFERENCES drugs(drug_id) ON DELETE RESTRICT,\n    prescribed_date DATE DEFAULT CURRENT_DATE,\n    dosage_mg INT NOT NULL,\n    CONSTRAINT uq_patient_drug_presc UNIQUE (patient_id, drug_id, prescribed_date)\n);",
      "output": [
        {
          "table_name": "clinical_prescriptions",
          "arity": 3,
          "constraint": "doctor_id, patient_id, drug_id foreign keys"
        }
      ],
      "explanation": "In relational schema reduction, an n-ary relationship becomes a dedicated table whose primary key is formed from the combination of participating candidate keys or a surrogate key backed by a composite uniqueness constraint.",
      "queryBreakdown": [
        {
          "clause": "PRIMARY KEY",
          "purpose": "Surrogate primary key for rapid index lookups."
        },
        {
          "clause": "FOREIGN KEYs",
          "purpose": "References all three participating parent entities."
        },
        {
          "clause": "UNIQUE",
          "purpose": "Enforces business policy against redundant duplicate prescriptions."
        }
      ]
    }
  ],
  "relational-model-keys": [
    {
      "id": "keys-ex-1",
      "title": "Finding Candidate Keys from Functional Dependencies",
      "difficulty": "Hard",
      "attribution": "Placement-style (GATE / Campus Placements)",
      "problem": "Given relation R(A, B, C, D, E) with Functional Dependencies: F = { A -> BC, CD -> E, B -> D, E -> A }. Find all Candidate Keys of R.",
      "givenSchema": "Relation R(A, B, C, D, E); FDs: { A -> BC, CD -> E, B -> D, E -> A }",
      "givenData": [
        {
          "relation": "R(A, B, C, D, E)",
          "functional_dependencies": "A->BC, CD->E, B->D, E->A"
        }
      ],
      "required": "Step-by-step Attribute Closure calculation to determine all minimal candidate keys.",
      "concept": "Attribute Closure Method: A candidate key must be minimal and its closure must contain all attributes {A, B, C, D, E}.",
      "query": "-- Closure computation:\n-- 1. Closure of A:\n-- (A)+ = {A} -> {A, B, C} (using A->BC) -> {A, B, C, D} (using B->D) -> {A, B, C, D, E} (using CD->E)\n-- Therefore, A is a Candidate Key!\n\n-- 2. Can we reach A from other attributes?\n-- Since E -> A, closure of E:\n-- (E)+ = {E} -> {E, A} (using E->A) -> {E, A, B, C, D}\n-- Therefore, E is a Candidate Key!\n\n-- 3. Since CD -> E, test CD:\n-- (CD)+ = {C, D} -> {C, D, E} -> {C, D, E, A, B}\n-- Therefore, CD is a Candidate Key!\n\n-- 4. Since B -> D, test BC:\n-- (BC)+ = {B, C} -> {B, C, D} -> {B, C, D, E, A}\n-- Therefore, BC is a Candidate Key!",
      "output": [
        {
          "candidate_keys": "A, E, CD, BC",
          "total_keys": 4
        }
      ],
      "explanation": "All 4 candidate keys {A}, {E}, {CD}, and {BC} are minimal (no subset can determine all attributes). Any one can be selected as the Primary Key.",
      "queryBreakdown": [
        {
          "clause": "Attribute Closure (X+)",
          "purpose": "Computes the complete set of attributes functionally determined by X."
        },
        {
          "clause": "Minimality Check",
          "purpose": "Verifies that removing any attribute from the candidate key loses the ability to determine all attributes."
        }
      ]
    },
    {
      "id": "keys-ex-2",
      "title": "Enforcing Multi-Column Alternate Keys & Referential Actions",
      "difficulty": "Medium",
      "attribution": "Interview-style (TCS / Wipro)",
      "problem": "Create a university course enrollment table where a student can enroll in many courses, but cannot enroll in the same course twice in the same semester. Enforce referential integrity.",
      "givenSchema": "students(id PK), courses(id PK)",
      "givenData": [
        {
          "student_id": 10,
          "course_id": 201,
          "semester": "Fall-2026"
        }
      ],
      "required": "Write DDL enforcing composite uniqueness and proper referential cascading rules.",
      "concept": "Composite Alternate Key (UNIQUE constraint) combined with Foreign Key constraints.",
      "query": "CREATE TABLE enrollments (\n    enrollment_id SERIAL PRIMARY KEY,\n    student_id INT NOT NULL,\n    course_id INT NOT NULL,\n    semester VARCHAR(20) NOT NULL,\n    grade CHAR(2),\n    CONSTRAINT fk_enroll_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,\n    CONSTRAINT fk_enroll_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,\n    CONSTRAINT uq_student_course_sem UNIQUE (student_id, course_id, semester)\n);",
      "output": [
        {
          "constraint_name": "uq_student_course_sem",
          "type": "Composite UNIQUE",
          "protection": "Prevents duplicate enrollments in same semester"
        }
      ],
      "explanation": "The composite UNIQUE constraint ensures that (student_id, course_id, semester) is unique across rows, while `enrollment_id` serves as a lightweight surrogate Primary Key.",
      "queryBreakdown": [
        {
          "clause": "PRIMARY KEY",
          "purpose": "Provides unique, fast surrogate identifier for each row."
        },
        {
          "clause": "UNIQUE (col1, col2, col3)",
          "purpose": "Enforces business rule uniqueness across multi-attribute combination."
        },
        {
          "clause": "ON DELETE RESTRICT",
          "purpose": "Prevents deleting a course if students are actively enrolled in it."
        }
      ]
    },
    {
      "id": "keys-ex-3",
      "title": "Self-Referencing Foreign Keys & Hierarchical Integrity",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Infosys)",
      "problem": "Design an organizational hierarchy table `employees` where each employee reports to a manager who is also an employee in the same table. The CEO has no manager (NULL). Enforce referential integrity on delete.",
      "givenSchema": "employees(emp_id INT PK, name VARCHAR(50), manager_id INT FK)",
      "givenData": [
        {
          "emp_id": 1,
          "name": "Alice (CEO)",
          "manager_id": null
        },
        {
          "emp_id": 2,
          "name": "Bob",
          "manager_id": 1
        },
        {
          "emp_id": 3,
          "name": "Charlie",
          "manager_id": 2
        }
      ],
      "required": "Write DDL for self-referential constraint with ON DELETE SET NULL to preserve employee records when a manager resigns.",
      "concept": "Self-Referential (Recursive) Foreign Keys and Referential Actions (SET NULL).",
      "query": "CREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    title VARCHAR(50),\n    manager_id INT,\n    CONSTRAINT fk_emp_manager FOREIGN KEY (manager_id) \n        REFERENCES employees(emp_id) \n        ON DELETE SET NULL\n);",
      "output": [
        {
          "emp_id": 1,
          "name": "Alice",
          "manager_id": null
        },
        {
          "emp_id": 2,
          "name": "Bob",
          "manager_id": 1
        }
      ],
      "explanation": "Self-referential foreign keys allow an entity to establish relationships with members of the same relation. Setting ON DELETE SET NULL ensures child reporting nodes are not accidentally wiped out if a manager account is deactivated.",
      "queryBreakdown": [
        {
          "clause": "REFERENCES employees(emp_id)",
          "purpose": "Points the foreign key constraint back to the primary key of the same table."
        },
        {
          "clause": "ON DELETE SET NULL",
          "purpose": "Automatically sets manager_id to NULL when the referenced manager is deleted."
        }
      ]
    }
  ],
  "sql-basics-ddl-dml": [
    {
      "id": "sql-ex-1",
      "title": "Finding Employees Matching Specific Salary Ranges and Patterns",
      "difficulty": "Easy",
      "attribution": "Placement-style (Accenture / Capgemini)",
      "problem": "Retrieve all employees from the Engineering department whose salary is between $70,000 and $120,000, and whose email ends with \"@company.com\", sorted by salary descending.",
      "givenSchema": "employees (emp_id INT, name VARCHAR(100), dept VARCHAR(50), salary NUMERIC, email VARCHAR(100))",
      "givenData": [
        {
          "emp_id": 1,
          "name": "Alice",
          "dept": "Engineering",
          "salary": 95000,
          "email": "alice@company.com"
        },
        {
          "emp_id": 2,
          "name": "Bob",
          "dept": "Engineering",
          "salary": 65000,
          "email": "bob@company.com"
        },
        {
          "emp_id": 3,
          "name": "Charlie",
          "dept": "Sales",
          "salary": 110000,
          "email": "charlie@company.com"
        },
        {
          "emp_id": 4,
          "name": "Dave",
          "dept": "Engineering",
          "salary": 115000,
          "email": "dave@company.com"
        }
      ],
      "required": "Write SQL query with BETWEEN, LIKE pattern matching, and ORDER BY.",
      "concept": "Row-level filtering with logical operators (AND, BETWEEN, LIKE).",
      "query": "SELECT emp_id, name, salary, email\nFROM employees\nWHERE dept = 'Engineering'\n  AND salary BETWEEN 70000 AND 120000\n  AND email LIKE '%@company.com'\nORDER BY salary DESC;",
      "output": [
        {
          "emp_id": 4,
          "name": "Dave",
          "salary": 115000,
          "email": "dave@company.com"
        },
        {
          "emp_id": 1,
          "name": "Alice",
          "salary": 95000,
          "email": "alice@company.com"
        }
      ],
      "explanation": "`WHERE` filters records before projecting columns. `BETWEEN 70000 AND 120000` is inclusive. `LIKE '%@company.com'` matches the domain suffix. `ORDER BY salary DESC` sorts highest to lowest.",
      "queryBreakdown": [
        {
          "clause": "SELECT",
          "purpose": "Selects only the required output columns (emp_id, name, salary, email)."
        },
        {
          "clause": "FROM",
          "purpose": "Specifies the source table `employees`."
        },
        {
          "clause": "WHERE",
          "purpose": "Applies three combined boolean filters (dept, salary range, and email regex/pattern)."
        },
        {
          "clause": "ORDER BY",
          "purpose": "Sorts the final filtered result set in descending order of salary."
        }
      ]
    },
    {
      "id": "sql-ex-2",
      "title": "Updating Conditional Records with CASE Expressions",
      "difficulty": "Medium",
      "attribution": "Interview-style (Oracle / Microsoft)",
      "problem": "Give a 15% salary hike to IT employees, a 10% hike to HR employees, and a 5% hike to all others. Update records in place.",
      "givenSchema": "employees (emp_id INT, name VARCHAR(50), dept VARCHAR(20), salary NUMERIC)",
      "givenData": [
        {
          "emp_id": 1,
          "name": "Alice",
          "dept": "IT",
          "salary": 100000
        },
        {
          "emp_id": 2,
          "name": "Bob",
          "dept": "HR",
          "salary": 60000
        },
        {
          "emp_id": 3,
          "name": "Charlie",
          "dept": "Admin",
          "salary": 50000
        }
      ],
      "required": "Execute a single safe DML UPDATE query using conditional CASE expression.",
      "concept": "Conditional DML modification with CASE ... WHEN ... THEN.",
      "query": "UPDATE employees\nSET salary = CASE \n    WHEN dept = 'IT' THEN salary * 1.15\n    WHEN dept = 'HR' THEN salary * 1.10\n    ELSE salary * 1.05\nEND;",
      "output": [
        {
          "emp_id": 1,
          "name": "Alice",
          "dept": "IT",
          "updated_salary": 115000
        },
        {
          "emp_id": 2,
          "name": "Bob",
          "dept": "HR",
          "updated_salary": 66000
        },
        {
          "emp_id": 3,
          "name": "Charlie",
          "dept": "Admin",
          "updated_salary": 52500
        }
      ],
      "explanation": "CASE expression evaluates conditionally row-by-row inside the UPDATE statement, avoiding having to execute multiple separate UPDATE statements.",
      "queryBreakdown": [
        {
          "clause": "UPDATE",
          "purpose": "Specifies the target table `employees` for modification."
        },
        {
          "clause": "SET salary = CASE",
          "purpose": "Computes new salary dynamically based on each row's department value."
        },
        {
          "clause": "ELSE",
          "purpose": "Default fallback multiplier for any department not explicitly matched."
        }
      ]
    },
    {
      "id": "sql-ex-3",
      "title": "Multi-Row Deduplication via Common Table Expressions (CTE)",
      "difficulty": "Hard",
      "attribution": "Placement-style (Amazon / LeetCode)",
      "problem": "A data pipeline accidentally inserted duplicate customer records with identical emails. Write a single standard SQL query using CTE and ROW_NUMBER() to identify and retain only the single lowest id for each email.",
      "givenSchema": "customers (id INT PRIMARY KEY, name VARCHAR(50), email VARCHAR(100))",
      "givenData": [
        {
          "id": 1,
          "name": "Alex",
          "email": "alex@work.com"
        },
        {
          "id": 2,
          "name": "Alex M",
          "email": "alex@work.com"
        },
        {
          "id": 3,
          "name": "Sara",
          "email": "sara@work.com"
        },
        {
          "id": 4,
          "name": "Alex K",
          "email": "alex@work.com"
        }
      ],
      "required": "Return all duplicate rows that should be removed (i.e. row_num > 1).",
      "concept": "CTE with Window Ranking (ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)) for deduplication.",
      "query": "WITH duplicate_cte AS (\n    SELECT id, name, email,\n           ROW_NUMBER() OVER (PARTITION BY email ORDER BY id ASC) as row_num\n    FROM customers\n)\nSELECT id, name, email\nFROM duplicate_cte\nWHERE row_num > 1;",
      "output": [
        {
          "id": 2,
          "name": "Alex M",
          "email": "alex@work.com"
        },
        {
          "id": 4,
          "name": "Alex K",
          "email": "alex@work.com"
        }
      ],
      "explanation": "The CTE assigns a unique sequential rank to every row partitioned by email. The original record gets row_num = 1, and all redundant copies receive row_num > 1. Filtering for row_num > 1 isolates exactly the unwanted duplicates.",
      "queryBreakdown": [
        {
          "clause": "WITH duplicate_cte AS (...)",
          "purpose": "Materializes temporary result with ranking metadata."
        },
        {
          "clause": "PARTITION BY email",
          "purpose": "Resets the counter for each distinct email group."
        },
        {
          "clause": "WHERE row_num > 1",
          "purpose": "Targets all redundant copies for deletion or auditing."
        }
      ]
    }
  ],
  "sql-joins": [
    {
      "id": "joins-ex-1",
      "title": "Employees Earning More Than Their Manager (SELF JOIN)",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / LeetCode 181)",
      "problem": "Find all employees who earn more than their direct manager. Both employees and their managers are stored in the same `Employee` table.",
      "givenSchema": "Employee (id INT PRIMARY KEY, name VARCHAR(50), salary INT, managerId INT)",
      "givenData": [
        {
          "id": 1,
          "name": "Joe",
          "salary": 70000,
          "managerId": 3
        },
        {
          "id": 2,
          "name": "Henry",
          "salary": 80000,
          "managerId": 4
        },
        {
          "id": 3,
          "name": "Sam",
          "salary": 60000,
          "managerId": null
        },
        {
          "id": 4,
          "name": "Max",
          "salary": 90000,
          "managerId": null
        }
      ],
      "required": "Return the employee name(s) who earn strictly more than their manager.",
      "concept": "SELF JOIN using table aliasing to compare rows within the same table.",
      "query": "SELECT e.name AS Employee\nFROM Employee e\nINNER JOIN Employee m ON e.managerId = m.id\nWHERE e.salary > m.salary;",
      "output": [
        {
          "Employee": "Joe"
        }
      ],
      "explanation": "Table `Employee` is joined with itself. Alias `e` represents the employee, and alias `m` represents their manager. For Joe (salary 70000, managerId 3), Sam is manager (salary 60000). Since 70000 > 60000, Joe is returned.",
      "queryBreakdown": [
        {
          "clause": "SELECT e.name",
          "purpose": "Outputs the employee's name from the employee alias `e`."
        },
        {
          "clause": "FROM Employee e",
          "purpose": "Treats first instance of table as the employee record."
        },
        {
          "clause": "INNER JOIN Employee m ON e.managerId = m.id",
          "purpose": "Matches employee's managerId to manager's primary id."
        },
        {
          "clause": "WHERE e.salary > m.salary",
          "purpose": "Filters pairs where employee salary strictly exceeds manager salary."
        }
      ]
    },
    {
      "id": "joins-ex-2",
      "title": "Customers Who Never Ordered (LEFT JOIN with NULL Check)",
      "difficulty": "Easy",
      "attribution": "Placement-style (Microsoft / LeetCode 183)",
      "problem": "Find all customers from the Customers table who have never placed any orders in the Orders table.",
      "givenSchema": "Customers (id INT, name VARCHAR(50)); Orders (id INT, customerId INT)",
      "givenData": [
        {
          "customer": "1: Joe, 2: Henry, 3: Sam, 4: Max"
        },
        {
          "orders": "Order 1 by customer 3, Order 2 by customer 1"
        }
      ],
      "required": "Return customer names who have 0 orders.",
      "concept": "LEFT OUTER JOIN preserving unmatched left rows, filtered by `WHERE right_key IS NULL`.",
      "query": "SELECT c.name AS Customers\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customerId\nWHERE o.id IS NULL;",
      "output": [
        {
          "Customers": "Henry"
        },
        {
          "Customers": "Max"
        }
      ],
      "explanation": "LEFT JOIN keeps all customers. Customers who placed no orders receive NULL for all Orders columns (`o.id IS NULL`). Checking `WHERE o.id IS NULL` filters precisely for non-ordering customers.",
      "queryBreakdown": [
        {
          "clause": "SELECT c.name",
          "purpose": "Projects customer name."
        },
        {
          "clause": "LEFT JOIN Orders o ON c.id = o.customerId",
          "purpose": "Preserves all customers regardless of whether an order exists."
        },
        {
          "clause": "WHERE o.id IS NULL",
          "purpose": "Discards customers with matches, isolating customers with zero orders."
        }
      ]
    },
    {
      "id": "joins-ex-3",
      "title": "Full Outer Join Reconciliation Across Two Independent Ledgers",
      "difficulty": "Hard",
      "attribution": "Interview-style (Deloitte / Financial Systems)",
      "problem": "Two banking ledger systems record client transaction settlements. Reconcile both ledgers to identify: matched settlements, transactions in System A missing from B, and transactions in System B missing from A using FULL OUTER JOIN and COALESCE.",
      "givenSchema": "ledger_a(tx_id INT, amount NUMERIC), ledger_b(tx_id INT, amount NUMERIC)",
      "givenData": [
        {
          "ledger_a": "Tx101: 500, Tx102: 750"
        },
        {
          "ledger_b": "Tx102: 750, Tx103: 1200"
        }
      ],
      "required": "Generate reconciled summary showing tx_id, amount_a, amount_b, and status (MATCHED, MISSING_IN_B, MISSING_IN_A).",
      "concept": "FULL OUTER JOIN with COALESCE and conditional CASE WHEN logic.",
      "query": "SELECT \n    COALESCE(a.tx_id, b.tx_id) AS reconciled_tx_id,\n    a.amount AS amount_system_a,\n    b.amount AS amount_system_b,\n    CASE \n        WHEN a.tx_id IS NOT NULL AND b.tx_id IS NOT NULL THEN 'MATCHED'\n        WHEN a.tx_id IS NOT NULL AND b.tx_id IS NULL THEN 'MISSING_IN_B'\n        ELSE 'MISSING_IN_A'\n    END AS reconciliation_status\nFROM ledger_a a\nFULL OUTER JOIN ledger_b b ON a.tx_id = b.tx_id\nORDER BY reconciled_tx_id;",
      "output": [
        {
          "reconciled_tx_id": 101,
          "amount_system_a": 500,
          "amount_system_b": null,
          "reconciliation_status": "MISSING_IN_B"
        },
        {
          "reconciled_tx_id": 102,
          "amount_system_a": 750,
          "amount_system_b": 750,
          "reconciliation_status": "MATCHED"
        },
        {
          "reconciled_tx_id": 103,
          "amount_system_a": null,
          "amount_system_b": 1200,
          "reconciliation_status": "MISSING_IN_A"
        }
      ],
      "explanation": "FULL OUTER JOIN preserves all rows from both tables regardless of whether a matching tx_id exists on the opposite side. COALESCE pulls whichever identifier is non-null, and CASE tags the audit reconciliation status.",
      "queryBreakdown": [
        {
          "clause": "COALESCE(a.tx_id, b.tx_id)",
          "purpose": "Guarantees a non-null transaction ID in the output."
        },
        {
          "clause": "FULL OUTER JOIN",
          "purpose": "Retains all unmatched rows from both left and right relations."
        },
        {
          "clause": "CASE WHEN",
          "purpose": "Categorizes each row as matched, left-only, or right-only."
        }
      ]
    }
  ],
  "sql-aggregation-groupby": [
    {
      "id": "agg-ex-1",
      "title": "Department Highest Salary & Headcount Filter",
      "difficulty": "Medium",
      "attribution": "Placement-style (Google / Adobe)",
      "problem": "Find the department name, total number of employees, and the highest salary in that department, but ONLY for departments that have at least 2 employees.",
      "givenSchema": "Department (id INT, name VARCHAR(50)); Employee (id INT, name VARCHAR(50), salary INT, departmentId INT)",
      "givenData": [
        {
          "id": 1,
          "name": "IT",
          "employees": [
            {
              "name": "Joe",
              "sal": 85000
            },
            {
              "name": "Max",
              "sal": 90000
            }
          ]
        },
        {
          "id": 2,
          "name": "Sales",
          "employees": [
            {
              "name": "Henry",
              "sal": 80000
            }
          ]
        }
      ],
      "required": "Return department name, headcount, and max salary for departments with count >= 2.",
      "concept": "Combining JOIN with GROUP BY and aggregate filtering via HAVING.",
      "query": "SELECT \n    d.name AS Department,\n    COUNT(e.id) AS EmployeeCount,\n    MAX(e.salary) AS MaxSalary\nFROM Department d\nINNER JOIN Employee e ON d.id = e.departmentId\nGROUP BY d.name\nHAVING COUNT(e.id) >= 2\nORDER BY MaxSalary DESC;",
      "output": [
        {
          "Department": "IT",
          "EmployeeCount": 2,
          "MaxSalary": 90000
        }
      ],
      "explanation": "The query joins departments to employees, groups rows into department buckets by name, evaluates COUNT and MAX for each bucket, and filters out Sales because its count is 1 (< 2).",
      "queryBreakdown": [
        {
          "clause": "SELECT",
          "purpose": "Projects department name alongside aggregate calculations COUNT and MAX."
        },
        {
          "clause": "GROUP BY d.name",
          "purpose": "Groups joined records by department name."
        },
        {
          "clause": "HAVING COUNT(e.id) >= 2",
          "purpose": "Filters groups AFTER aggregation to keep departments with >= 2 employees."
        },
        {
          "clause": "ORDER BY MaxSalary DESC",
          "purpose": "Sorts remaining groups by maximum salary in descending order."
        }
      ]
    },
    {
      "id": "agg-ex-2",
      "title": "Finding Classes with More Than 5 Students",
      "difficulty": "Easy",
      "attribution": "Placement-style (LeetCode 596 / Uber)",
      "problem": "Find all classes that have 5 or more enrolled students.",
      "givenSchema": "Courses (student VARCHAR(50), class VARCHAR(50))",
      "givenData": [
        {
          "student": "A, B, C, D, E, F",
          "class": "Math"
        },
        {
          "student": "G",
          "class": "Computer"
        }
      ],
      "required": "Return class names with >= 5 distinct enrolled students.",
      "concept": "HAVING clause with COUNT(DISTINCT student).",
      "query": "SELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(DISTINCT student) >= 5;",
      "output": [
        {
          "class": "Math"
        }
      ],
      "explanation": "Grouping by `class` condenses students per class. `COUNT(DISTINCT student) >= 5` filters out duplicate student enrollments and keeps only classes meeting the threshold.",
      "queryBreakdown": [
        {
          "clause": "SELECT class",
          "purpose": "Returns the name of the qualified class."
        },
        {
          "clause": "FROM Courses",
          "purpose": "Source relation."
        },
        {
          "clause": "GROUP BY class",
          "purpose": "Groups all student records by class title."
        },
        {
          "clause": "HAVING COUNT(DISTINCT student) >= 5",
          "purpose": "Filters classes having at least 5 distinct students."
        }
      ]
    },
    {
      "id": "agg-ex-3",
      "title": "Department-Wise Multi-Metric Analytics with Filtered Aggregates",
      "difficulty": "Medium",
      "attribution": "Placement-style (Cognizant / Accenture)",
      "problem": "Given an orders table, calculate for each product category: total orders, total revenue, average order value, and count of high-value orders (> 1000). Show only categories with at least 3 orders and total revenue > 5000.",
      "givenSchema": "orders (order_id INT, category VARCHAR(50), order_value NUMERIC)",
      "givenData": [
        {
          "id": 1,
          "category": "Electronics",
          "value": 1200
        },
        {
          "id": 2,
          "category": "Electronics",
          "value": 800
        },
        {
          "id": 3,
          "category": "Electronics",
          "value": 3500
        },
        {
          "id": 4,
          "category": "Apparel",
          "value": 150
        }
      ],
      "required": "Produce category summary with conditional counting and multiple HAVING thresholds.",
      "concept": "GROUP BY with SUM, AVG, COUNT(CASE WHEN ...), and compound HAVING conditions.",
      "query": "SELECT \n    category,\n    COUNT(*) AS total_orders,\n    SUM(order_value) AS total_revenue,\n    ROUND(AVG(order_value), 2) AS avg_order_value,\n    SUM(CASE WHEN order_value > 1000 THEN 1 ELSE 0 END) AS high_value_orders_count\nFROM orders\nGROUP BY category\nHAVING COUNT(*) >= 3 AND SUM(order_value) > 5000\nORDER BY total_revenue DESC;",
      "output": [
        {
          "category": "Electronics",
          "total_orders": 3,
          "total_revenue": 5500,
          "avg_order_value": 1833.33,
          "high_value_orders_count": 2
        }
      ],
      "explanation": "GROUP BY collapses individual order rows into category groups. Conditional SUM with CASE counts rows that satisfy a specific sub-metric, and HAVING filters out categories that fail the macro thresholds.",
      "queryBreakdown": [
        {
          "clause": "GROUP BY category",
          "purpose": "Aggregates metrics at the product category level."
        },
        {
          "clause": "SUM(CASE WHEN ...)",
          "purpose": "Performs conditional aggregation without separate subqueries."
        },
        {
          "clause": "HAVING COUNT(*) >= 3 AND ...",
          "purpose": "Filters aggregate groups after summation."
        }
      ]
    }
  ],
  "sql-subqueries-nested": [
    {
      "id": "subq-ex-1",
      "title": "Second Highest Salary in SQL",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Microsoft / LeetCode 176)",
      "problem": "Write a SQL query to find the Second Highest Salary from the Employee table. If there is no second highest salary (e.g., table has only 1 row or identical salaries), return NULL.",
      "givenSchema": "Employee (id INT PRIMARY KEY, salary INT)",
      "givenData": [
        {
          "id": 1,
          "salary": 100
        },
        {
          "id": 2,
          "salary": 200
        },
        {
          "id": 3,
          "salary": 300
        }
      ],
      "required": "Return exactly one scalar row labeled `SecondHighestSalary` containing 200, or NULL if absent.",
      "concept": "Scalar subquery with MAX() filter.",
      "query": "SELECT MAX(salary) AS SecondHighestSalary\nFROM Employee\nWHERE salary < (\n    SELECT MAX(salary) \n    FROM Employee\n);",
      "output": [
        {
          "SecondHighestSalary": 200
        }
      ],
      "explanation": "The inner subquery `(SELECT MAX(salary) FROM Employee)` finds the absolute maximum (300). The outer query finds the maximum of all salaries strictly LESS than 300, which is 200. If no smaller salary exists, `MAX()` cleanly evaluates to NULL.",
      "queryBreakdown": [
        {
          "clause": "SELECT MAX(salary)",
          "purpose": "Finds the highest salary among the filtered subset; returns NULL if set is empty."
        },
        {
          "clause": "WHERE salary < (...)",
          "purpose": "Filters out the absolute top salary."
        },
        {
          "clause": "Inner (SELECT MAX(salary))",
          "purpose": "Evaluates first to find the single highest salary across the entire company."
        }
      ]
    },
    {
      "id": "subq-ex-2",
      "title": "Department Top Three Salaries (Correlated Subquery)",
      "difficulty": "Hard",
      "attribution": "Placement-style (Amazon / Bloomberg / LeetCode 185)",
      "problem": "Find employees who earn in the top 3 unique salaries within their respective departments.",
      "givenSchema": "Employee (id INT, name VARCHAR(50), salary INT, departmentId INT); Department (id INT, name VARCHAR(50))",
      "givenData": [
        {
          "dept": "IT",
          "salaries": [
            85000,
            85000,
            75000,
            70000,
            60000
          ]
        }
      ],
      "required": "Return department, employee, and salary for the top 3 distinct salaries per department.",
      "concept": "Correlated subquery counting distinct higher salaries.",
      "query": "SELECT \n    d.name AS Department,\n    e1.name AS Employee,\n    e1.salary AS Salary\nFROM Employee e1\nJOIN Department d ON e1.departmentId = d.id\nWHERE 3 > (\n    SELECT COUNT(DISTINCT e2.salary)\n    FROM Employee e2\n    WHERE e2.departmentId = e1.departmentId \n      AND e2.salary > e1.salary\n)\nORDER BY Department, Salary DESC;",
      "output": [
        {
          "Department": "IT",
          "Employee": "Max",
          "Salary": 85000
        },
        {
          "Department": "IT",
          "Employee": "Joe",
          "Salary": 85000
        },
        {
          "Department": "IT",
          "Employee": "Will",
          "Salary": 75000
        },
        {
          "Department": "IT",
          "Employee": "Sam",
          "Salary": 70000
        }
      ],
      "explanation": "For each employee `e1`, the correlated subquery counts how many unique salaries in that department are strictly higher than `e1.salary`. If that count is strictly less than 3 (i.e. 0, 1, or 2 people earn more), `e1` is in the top 3!",
      "queryBreakdown": [
        {
          "clause": "SELECT d.name, e1.name, e1.salary",
          "purpose": "Projects Department, Employee name, and their Salary."
        },
        {
          "clause": "WHERE 3 > (SELECT COUNT(...))",
          "purpose": "Correlated condition checking if fewer than 3 distinct salaries are higher."
        },
        {
          "clause": "WHERE e2.departmentId = e1.departmentId",
          "purpose": "Correlates the subquery to the candidate employee's department."
        }
      ]
    },
    {
      "id": "subq-ex-3",
      "title": "Top 2 Highest Salaries per Department via Correlated Subquery",
      "difficulty": "Hard",
      "attribution": "Placement-style (Amazon / Microsoft SDE)",
      "problem": "In SQL engines or interview scenarios where window functions are disallowed, find the employees who earn one of the top 2 distinct salaries within their respective department using a correlated subquery.",
      "givenSchema": "employees (emp_id INT PRIMARY KEY, name VARCHAR(50), department_id INT, salary INT)",
      "givenData": [
        {
          "id": 1,
          "name": "A",
          "dept": 1,
          "sal": 100000
        },
        {
          "id": 2,
          "name": "B",
          "dept": 1,
          "sal": 90000
        },
        {
          "id": 3,
          "name": "C",
          "dept": 1,
          "sal": 80000
        },
        {
          "id": 4,
          "name": "D",
          "dept": 2,
          "sal": 95000
        }
      ],
      "required": "Return emp_id, name, department_id, and salary for the top 2 distinct earners in each department.",
      "concept": "Correlated Subquery counting higher salaries in the same department (WHERE 2 > (SELECT COUNT(DISTINCT ...))).",
      "query": "SELECT e1.emp_id, e1.name, e1.department_id, e1.salary\nFROM employees e1\nWHERE 2 > (\n    SELECT COUNT(DISTINCT e2.salary)\n    FROM employees e2\n    WHERE e2.department_id = e1.department_id\n      AND e2.salary > e1.salary\n)\nORDER BY e1.department_id ASC, e1.salary DESC;",
      "output": [
        {
          "emp_id": 1,
          "name": "A",
          "department_id": 1,
          "salary": 100000
        },
        {
          "emp_id": 2,
          "name": "B",
          "department_id": 1,
          "salary": 90000
        },
        {
          "emp_id": 4,
          "name": "D",
          "department_id": 2,
          "salary": 95000
        }
      ],
      "explanation": "For every candidate row e1, the correlated subquery counts how many people in the same department earn strictly more than e1.salary. If that count is 0, e1 is #1; if count is 1, e1 is #2. Thus 2 > count precisely captures the top 2.",
      "queryBreakdown": [
        {
          "clause": "WHERE 2 > (SELECT COUNT(...))",
          "purpose": "Correlated predicate filtering rows with fewer than 2 higher earners."
        },
        {
          "clause": "e2.department_id = e1.department_id",
          "purpose": "Correlates the inner query to outer employee department."
        },
        {
          "clause": "e2.salary > e1.salary",
          "purpose": "Counts strictly superior salaries in the same group."
        }
      ]
    }
  ],
  "normalization": [
    {
      "id": "norm-ex-1",
      "title": "Eliminating Transitive Dependency to Achieve 3NF",
      "difficulty": "Medium",
      "attribution": "Placement-style (TCS Digital / Cognizant)",
      "problem": "Given an order invoice relation: `Orders(order_id, customer_id, customer_name, customer_city, order_date, total_amount)`. Identify the functional dependencies, identify the anomaly, and decompose into 3NF.",
      "givenSchema": "Orders (order_id, customer_id, customer_name, customer_city, order_date, total_amount)",
      "givenData": [
        {
          "order_id": 101,
          "customer_id": "C1",
          "customer_name": "Alice",
          "customer_city": "Delhi",
          "total_amount": 500
        },
        {
          "order_id": 102,
          "customer_id": "C1",
          "customer_name": "Alice",
          "customer_city": "Delhi",
          "total_amount": 1200
        }
      ],
      "required": "Identify why this violates 3NF and provide the decomposed relational schema.",
      "concept": "Transitive Dependency: `order_id -> customer_id` and `customer_id -> customer_name, customer_city`.",
      "query": "-- Violation: customer_name and customer_city depend on customer_id, which is NOT a candidate key in Orders.\n-- 3NF Decomposition into two clean relations:\n\nCREATE TABLE customers (\n    customer_id VARCHAR(10) PRIMARY KEY,\n    customer_name VARCHAR(100) NOT NULL,\n    customer_city VARCHAR(50)\n);\n\nCREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id VARCHAR(10) REFERENCES customers(customer_id),\n    order_date DATE DEFAULT CURRENT_DATE,\n    total_amount NUMERIC(10,2)\n);",
      "output": [
        {
          "table": "customers",
          "candidate_key": "customer_id",
          "normal_form": "3NF / BCNF"
        },
        {
          "table": "orders",
          "candidate_key": "order_id",
          "normal_form": "3NF / BCNF"
        }
      ],
      "explanation": "By moving customer details to a dedicated `customers` table, customer information is stored exactly once. If Alice changes her city, only one row in `customers` needs to be updated (zero update anomaly).",
      "queryBreakdown": [
        {
          "clause": "Primary Key",
          "purpose": "Establishes candidate keys for both independent entities."
        },
        {
          "clause": "Foreign Key (customer_id)",
          "purpose": "Preserves the relationship between orders and customers without duplicating customer attributes."
        }
      ]
    },
    {
      "id": "norm-ex-2",
      "title": "Testing Lossless Join & Dependency Preservation",
      "difficulty": "Hard",
      "attribution": "Interview-style (GATE / Google)",
      "problem": "Relation R(A, B, C, D) with F = { A -> B, B -> C, C -> D }. Decompose R into R1(A, B) and R2(B, C, D). Prove whether the decomposition is Lossless Join and whether it Preserves Dependencies.",
      "givenSchema": "R(A, B, C, D); F = { A -> B, B -> C, C -> D }; Decomposed into R1(A, B) and R2(B, C, D)",
      "givenData": [
        {
          "relation": "R(A, B, C, D)",
          "decomposition": "R1(A, B), R2(B, C, D)"
        }
      ],
      "required": "Formal proof of Lossless Join condition: (R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2.",
      "concept": "Lossless Join Theorem & Functional Dependency Preservation.",
      "query": "-- Proof Analysis:\n-- 1. Common Attribute: R1 ∩ R2 = {B}\n-- 2. Check if B is a Super Key of R1 or R2:\n-- (B)+ with respect to R2:\n-- {B}+ = {B, C, D} (using B->C and C->D)\n-- Since (B)+ contains all attributes of R2 (B, C, D), B is a Super Key for R2!\n-- Therefore, by theorem, the decomposition is GUARANTEED LOSSLESS!\n\n-- 3. Check Dependency Preservation:\n-- A -> B is preserved in R1(A, B)\n-- B -> C is preserved in R2(B, C, D)\n-- C -> D is preserved in R2(B, C, D)\n-- All original dependencies are preserved!",
      "output": [
        {
          "is_lossless": "YES (B is super key of R2)",
          "is_dependency_preserving": "YES (all FDs covered)"
        }
      ],
      "explanation": "Because the common attribute B forms a super key in relation R2, natural join R1 ⨝ R2 will reproduce exactly the original relation R with zero spurious tuples.",
      "queryBreakdown": [
        {
          "clause": "R1 ∩ R2 = {B}",
          "purpose": "Identifies the join attribute between decomposed relations."
        },
        {
          "clause": "(B)+ = {B, C, D}",
          "purpose": "Verifies that the join attribute uniquely determines at least one of the relations."
        }
      ]
    },
    {
      "id": "norm-ex-3",
      "title": "Decomposing 3NF to BCNF for Overlapping Candidate Keys",
      "difficulty": "Hard",
      "attribution": "Placement-style (GATE / Infosys Technical)",
      "problem": "Given relation StudentAdvisor(student_id, subject, advisor) where: (student_id, subject) -> advisor, and advisor -> subject. Each student has at most one advisor per subject, but an advisor advises only one subject. Identify why this relation is in 3NF but violates BCNF, and decompose it losslessly.",
      "givenSchema": "StudentAdvisor(student_id, subject, advisor); FDs: { (student_id, subject) -> advisor, advisor -> subject }",
      "givenData": [
        {
          "student_id": 101,
          "subject": "Math",
          "advisor": "Prof. Gauss"
        },
        {
          "student_id": 102,
          "subject": "Math",
          "advisor": "Prof. Gauss"
        },
        {
          "student_id": 101,
          "subject": "Physics",
          "advisor": "Prof. Newton"
        }
      ],
      "required": "Show candidate keys, identify BCNF violation, and give decomposed relational schemas.",
      "concept": "Boyce-Codd Normal Form (BCNF) strict determinant rule vs 3NF prime attribute allowance.",
      "query": "-- BCNF Decomposition:\n-- Candidate Keys: (student_id, subject) and (student_id, advisor)\n-- In FD: advisor -> subject:\n-- 1. In 3NF: 'subject' is a prime attribute (part of candidate key), so 3NF is SATISFIED!\n-- 2. In BCNF: 'advisor' is NOT a superkey, so BCNF is VIOLATED!\n\n-- Decomposed Relations:\nCREATE TABLE advisor_subject (\n    advisor VARCHAR(50) PRIMARY KEY,\n    subject VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE student_advisor_assignment (\n    student_id INT NOT NULL,\n    advisor VARCHAR(50) NOT NULL REFERENCES advisor_subject(advisor),\n    PRIMARY KEY (student_id, advisor)\n);",
      "output": [
        {
          "relation_1": "advisor_subject (advisor PK, subject)",
          "relation_2": "student_advisor_assignment (student_id, advisor PK)",
          "bcnf_status": "Compliant"
        }
      ],
      "explanation": "BCNF requires every determinant (left hand side of a non-trivial FD) to be a superkey. Decomposing into advisor_subject and student_advisor_assignment satisfies BCNF and provides a lossless join, though the functional dependency (student_id, subject) -> advisor is now an inter-relational constraint.",
      "queryBreakdown": [
        {
          "clause": "CREATE TABLE advisor_subject",
          "purpose": "Isolates the violating FD with advisor as its primary key."
        },
        {
          "clause": "CREATE TABLE student_advisor_assignment",
          "purpose": "Maintains student assignment with foreign key referential link."
        }
      ]
    }
  ],
  "transactions-acid": [
    {
      "id": "trans-ex-1",
      "title": "Atomic Bank Balance Transfer with Exception Handling",
      "difficulty": "Medium",
      "attribution": "Placement-style (Goldman Sachs / Morgan Stanley)",
      "problem": "Write a transactional banking procedure that transfers $1,000 from Sender to Receiver. If the sender has insufficient funds, roll back completely and return an error.",
      "givenSchema": "accounts (account_id INT PRIMARY KEY, balance NUMERIC(12,2))",
      "givenData": [
        {
          "account_id": 101,
          "balance": 1500
        },
        {
          "account_id": 202,
          "balance": 300
        }
      ],
      "required": "Write an atomic transaction that guarantees Atomicity and Consistency.",
      "concept": "TCL statements (BEGIN, COMMIT, ROLLBACK) protecting against partial execution.",
      "query": "BEGIN TRANSACTION;\n\n-- Check and debit sender\nUPDATE accounts\nSET balance = balance - 1000\nWHERE account_id = 101 AND balance >= 1000;\n\n-- Verify 1 row was updated (if balance < 1000, 0 rows updated)\n-- If update failed, the application executes: ROLLBACK;\n\n-- Credit receiver\nUPDATE accounts\nSET balance = balance + 1000\nWHERE account_id = 202;\n\nCOMMIT;",
      "output": [
        {
          "account_id": 101,
          "new_balance": 500
        },
        {
          "account_id": 202,
          "new_balance": 1300
        }
      ],
      "explanation": "Either both accounts are updated and committed together, or neither is updated. If power fails or the sender has insufficient balance, ROLLBACK restores the original balances.",
      "queryBreakdown": [
        {
          "clause": "BEGIN TRANSACTION",
          "purpose": "Opens an atomic transaction context."
        },
        {
          "clause": "WHERE balance >= 1000",
          "purpose": "Enforces business invariant preventing negative overdraft."
        },
        {
          "clause": "COMMIT",
          "purpose": "Flushes WAL commit record to disk, making changes permanent."
        }
      ]
    },
    {
      "id": "trans-ex-2",
      "title": "Dirty Read Prevention via Isolation Levels",
      "difficulty": "Hard",
      "attribution": "Interview-style (Amazon / Uber)",
      "problem": "Demonstrate how a Dirty Read occurs when Transaction 2 reads uncommitted data from Transaction 1, and show how setting Isolation Level to READ COMMITTED prevents it.",
      "givenSchema": "orders (order_id INT, status VARCHAR(20))",
      "givenData": [
        {
          "order_id": 500,
          "status": "PENDING"
        }
      ],
      "required": "Demonstrate concurrent timeline where Dirty Read is prevented.",
      "concept": "Transaction Isolation levels (READ UNCOMMITTED vs READ COMMITTED).",
      "query": "-- Timeline of Dirty Read Prevention:\n-- Step 1: Set isolation level\nSET TRANSACTION ISOLATION LEVEL READ COMMITTED;\n\n-- T1 updates order status to 'SHIPPED' but does NOT commit:\n-- T1: UPDATE orders SET status = 'SHIPPED' WHERE order_id = 500;\n\n-- T2 queries the order under READ COMMITTED:\n-- T2: SELECT status FROM orders WHERE order_id = 500;\n-- Result seen by T2: 'PENDING' (T2 reads the committed version, ignoring uncommitted 'SHIPPED')\n\n-- T1 encounters network failure and rolls back:\n-- T1: ROLLBACK;\n\n-- T2 never observed the invalid uncommitted state!",
      "output": [
        {
          "observed_status_by_T2": "PENDING",
          "anomaly_avoided": "Dirty Read Prevented"
        }
      ],
      "explanation": "Under READ COMMITTED, the database reads only data committed prior to the query start. T2 was shielded from T1's uncommitted temporary change.",
      "queryBreakdown": [
        {
          "clause": "SET TRANSACTION ISOLATION LEVEL",
          "purpose": "Configures concurrency guarantees for the current session."
        },
        {
          "clause": "READ COMMITTED",
          "purpose": "Locks or uses MVCC snapshots to ensure dirty uncommitted rows are invisible."
        }
      ]
    },
    {
      "id": "trans-ex-3",
      "title": "Savepoints and Partial Rollbacks in Complex E-Commerce Checkout",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Flipkart)",
      "problem": "An e-commerce order transaction performs three steps: 1) Reserve items, 2) Deduct user wallet balance, 3) Apply promotional coupon. If the coupon code is expired, step 3 should fail, but steps 1 and 2 must remain valid without rolling back the entire checkout. Demonstrate SAVEPOINT execution.",
      "givenSchema": "orders(order_id PK), inventory(item_id PK, stock INT), wallets(user_id PK, balance NUMERIC)",
      "givenData": [
        {
          "user_id": 10,
          "balance": 200,
          "item_id": 5,
          "stock": 10
        }
      ],
      "required": "Write SQL transaction using SAVEPOINT and ROLLBACK TO SAVEPOINT.",
      "concept": "Nested transaction control via SAVEPOINT and selective rollback.",
      "query": "BEGIN TRANSACTION;\n\n-- Step 1: Reserve inventory\nUPDATE inventory SET stock = stock - 1 WHERE item_id = 5;\n\n-- Step 2: Deduct wallet balance\nUPDATE wallets SET balance = balance - 150 WHERE user_id = 10;\n\n-- Create checkpoint before optional promotional logic\nSAVEPOINT after_payment_sp;\n\n-- Step 3: Attempt optional promotional credit (fails due to coupon expiry)\n-- Simulation: Check fails, trigger partial rollback\nROLLBACK TO SAVEPOINT after_payment_sp;\n\n-- Step 4: Record order with standard pricing and finalize\nINSERT INTO orders (order_id, user_id, total_amount, status) \nVALUES (9901, 10, 150, 'PAID_STANDARD');\n\nCOMMIT;",
      "output": [
        {
          "order_id": 9901,
          "status": "PAID_STANDARD",
          "stock_deducted": 1,
          "wallet_deducted": 150
        }
      ],
      "explanation": "SAVEPOINT establishes an intermediate marker within a transaction. Calling ROLLBACK TO SAVEPOINT undoes all modifications performed after the savepoint without aborting the parent transaction or losing previous atomic updates.",
      "queryBreakdown": [
        {
          "clause": "SAVEPOINT name",
          "purpose": "Marks an intermediate boundary inside the ongoing active transaction."
        },
        {
          "clause": "ROLLBACK TO SAVEPOINT name",
          "purpose": "Undoes subsequent modifications while keeping prior updates intact in memory."
        },
        {
          "clause": "COMMIT",
          "purpose": "Atomically commits all surviving operations to disk."
        }
      ]
    }
  ],
  "concurrency-locking": [
    {
      "id": "conc-ex-1",
      "title": "Testing Conflict Serializability using Precedence Graphs",
      "difficulty": "Hard",
      "attribution": "Placement-style (GATE / Cisco)",
      "problem": "Given Schedule S: `R1(A), W1(A), R2(A), R1(B), W2(A), W1(B)`. Construct the Precedence (Serialization) Graph and determine if Schedule S is Conflict Serializable.",
      "givenSchema": "Schedule S: R1(A), W1(A), R2(A), R1(B), W2(A), W1(B)",
      "givenData": [
        {
          "operations": "T1 reads A, T1 writes A, T2 reads A, T1 reads B, T2 writes A, T1 writes B"
        }
      ],
      "required": "Identify all conflicting operations (same item, different transaction, at least one is Write) and check for cycles.",
      "concept": "Conflict Serializability & Precedence Graph Cycle Detection.",
      "query": "-- Conflicting Operations Analysis:\n-- Conflict 1: W1(A) before R2(A)  -> Edge: T1 -> T2\n-- Conflict 2: W1(A) before W2(A)  -> Edge: T1 -> T2\n-- Conflict 3: R2(A) before W1(A)? No, R2(A) happens after W1(A).\n-- Are there any operations where T2 executes before T1 on the same item?\n-- None! All conflicting operations on A occur with T1 first, then T2.\n\n-- Precedence Graph:\n-- Vertices: { T1, T2 }\n-- Edges: { (T1 -> T2) }\n-- Cycle Check: Graph has NO cycles!",
      "output": [
        {
          "is_conflict_serializable": "YES",
          "equivalent_serial_order": "T1 -> T2"
        }
      ],
      "explanation": "Because the precedence graph contains no directed cycles, the interleaved schedule S is guaranteed to produce the exact same final state as serial execution order T1 followed by T2.",
      "queryBreakdown": [
        {
          "clause": "Precedence Graph Node",
          "purpose": "Represents an active transaction participating in the schedule."
        },
        {
          "clause": "Precedence Edge (Ti -> Tj)",
          "purpose": "Enforces that Ti's conflicting operation must precede Tj in any equivalent serial schedule."
        }
      ]
    },
    {
      "id": "conc-ex-2",
      "title": "Deadlock Detection with Wait-For Graph (WFG)",
      "difficulty": "Hard",
      "attribution": "Interview-style (Microsoft / Amazon)",
      "problem": "Two transactions T1 and T2 run concurrently. T1 locks Resource A and requests Resource B. T2 locks Resource B and requests Resource A. Show how the DBMS Lock Manager detects and resolves this deadlock.",
      "givenSchema": "Resources: A (row in accounts), B (row in accounts)",
      "givenData": [
        {
          "t1_held": "Lock on A",
          "t1_waiting": "Lock on B",
          "t2_held": "Lock on B",
          "t2_waiting": "Lock on A"
        }
      ],
      "required": "Construct the Wait-For Graph, identify the cycle, and explain victim selection.",
      "concept": "Wait-For Graph Cycle Detection and Victim Abort mechanism.",
      "query": "-- Deadlock Sequence:\n-- Step 1: T1 acquires Exclusive Lock on A\n-- Step 2: T2 acquires Exclusive Lock on B\n-- Step 3: T1 requests Exclusive Lock on B -> T1 blocked, waits for T2 (Edge: T1 -> T2)\n-- Step 4: T2 requests Exclusive Lock on A -> T2 blocked, waits for T1 (Edge: T2 -> T1)\n\n-- Wait-For Graph:\n-- Cycle: T1 -> T2 -> T1 (DEADLOCK!)\n\n-- Resolution:\n-- Lock Manager background daemon detects cycle.\n-- Chooses victim (T2) based on cost metric (e.g. least work done).\n-- Aborts T2 and releases T2's lock on B.\n-- T1 unblocks, acquires lock on B, and completes!",
      "output": [
        {
          "status": "Deadlock Broken",
          "victim": "T2 aborted",
          "survivor": "T1 proceeds to commit"
        }
      ],
      "explanation": "Without automated deadlock detection, both processes would hang indefinitely. The DBMS breaks the circular wait by aborting one transaction.",
      "queryBreakdown": [
        {
          "clause": "Wait-For Graph",
          "purpose": "Monitors lock dependencies between active transactions."
        },
        {
          "clause": "Victim Selection",
          "purpose": "Minimizes rollback overhead by choosing the transaction with fewer writes or younger age."
        }
      ]
    },
    {
      "id": "conc-ex-3",
      "title": "Deadlock Detection, Prevention & Wait-Die vs Wound-Wait Strategies",
      "difficulty": "Hard",
      "attribution": "Interview-style (Microsoft / Oracle)",
      "problem": "Two concurrent transactions T1 (timestamp 10, Older) and T2 (timestamp 20, Younger) request exclusive locks on resources A and B in opposing order: T1 holds A, requests B; T2 holds B, requests A. Compare how Wait-Die and Wound-Wait non-preemptive vs preemptive protocols resolve the deadlock.",
      "givenSchema": "Transactions: T1 (TS=10, holds A), T2 (TS=20, holds B); Resources: A, B",
      "givenData": [
        {
          "transaction": "T1 (TS=10)",
          "state": "Holds lock on A, requests B"
        },
        {
          "transaction": "T2 (TS=20)",
          "state": "Holds lock on B, requests A"
        }
      ],
      "required": "Trace outcomes under Wait-Die (non-preemptive) and Wound-Wait (preemptive) schemes, identifying which transaction is aborted.",
      "concept": "Timestamp-based Deadlock Prevention: Wait-Die vs Wound-Wait.",
      "query": "-- Wait-Die Rule: Old transaction waits; Young transaction dies (aborts & restarts)\n-- 1. When T1 (Older, TS=10) requests resource B held by T2 (Younger, TS=20):\n--    T1 is OLDER than T2 -> T1 WAITS!\n-- 2. When T2 (Younger, TS=20) requests resource A held by T1 (Older, TS=10):\n--    T2 is YOUNGER than T1 -> T2 DIES! (Aborted & restarted with original TS)\n\n-- Wound-Wait Rule: Old wounds (preempts) young; Young waits\n-- 1. When T1 (Older, TS=10) requests resource B held by T2 (Younger, TS=20):\n--    T1 is OLDER -> T1 WOUNDS T2! (T2 is aborted, releases lock on B to T1)\n-- 2. T1 proceeds immediately without deadlock.",
      "output": [
        {
          "protocol": "Wait-Die",
          "aborted_tx": "T2 (Younger)",
          "survivor": "T1"
        },
        {
          "protocol": "Wound-Wait",
          "aborted_tx": "T2 (Preempted)",
          "survivor": "T1"
        }
      ],
      "explanation": "Both protocols use transaction timestamps to prevent cyclic wait graphs. Because younger transactions can never cause older transactions to wait infinitely in Wound-Wait, or younger transactions die immediately in Wait-Die, deadlock cannot form.",
      "queryBreakdown": [
        {
          "clause": "Wait-Die Strategy",
          "purpose": "Non-preemptive: older can wait, younger is aborted if requesting resource held by older."
        },
        {
          "clause": "Wound-Wait Strategy",
          "purpose": "Preemptive: older interrupts younger and steals lock, younger waits if requesting older."
        }
      ]
    }
  ],
  "indexing-btrees": [
    {
      "id": "index-ex-1",
      "title": "Designing a Composite Covering Index for Query Optimization",
      "difficulty": "Hard",
      "attribution": "Placement-style (Amazon / Uber / Razorpay)",
      "problem": "A high-traffic e-commerce query frequently runs: `SELECT product_id, price FROM products WHERE category_id = 42 AND price < 500.00 ORDER BY price ASC;`. The table has 10 million rows. Design the optimal index.",
      "givenSchema": "products (product_id BIGINT PRIMARY KEY, category_id INT, price NUMERIC, stock INT, description TEXT)",
      "givenData": [
        {
          "table_size": "10,000,000 rows",
          "query_execution_time_without_index": "4,200 ms (Full Table Scan)"
        }
      ],
      "required": "Create a composite covering index that satisfies equality, range, projection, and sorting in a single Index-Only Scan.",
      "concept": "Leftmost Prefix Rule and Covering Index (Index-Only Scan).",
      "query": "-- Optimal Composite Index\n-- 1. category_id comes FIRST because it is an Equality filter (= 42)\n-- 2. price comes SECOND because it is a Range filter and ORDER BY column\n-- 3. product_id is already included in B+ Tree leaf nodes\nCREATE INDEX idx_products_cat_price ON products (category_id, price);\n\n-- Verification:\nEXPLAIN ANALYZE\nSELECT product_id, price \nFROM products \nWHERE category_id = 42 AND price < 500.00 \nORDER BY price ASC;",
      "output": [
        {
          "scan_type": "Index Only Scan using idx_products_cat_price",
          "execution_time": "0.85 ms",
          "speedup": "5,000x faster"
        }
      ],
      "explanation": "Because both `category_id` and `price` are stored in the index, the query engine never touches the heavy table heap. Sorting is free because keys in B+ Tree leaf nodes are already sorted.",
      "queryBreakdown": [
        {
          "clause": "CREATE INDEX (category_id, price)",
          "purpose": "Puts equality column first, range/sort column second."
        },
        {
          "clause": "Index-Only Scan",
          "purpose": "Retrieves all requested fields directly from the index B+ Tree leaves."
        }
      ]
    },
    {
      "id": "index-ex-2",
      "title": "B+ Tree Node Splitting & Tree Height Calculation",
      "difficulty": "Medium",
      "attribution": "Interview-style (Oracle / Qualcomm)",
      "problem": "A B+ Tree has order m = 100 (each internal node can hold up to 100 child pointers). How many maximum leaf records can the B+ Tree index with a height of only 3 levels (Root, Level 1, Leaf)?",
      "givenSchema": "B+ Tree parameters: Order m = 100; Leaf capacity = 50 records per leaf node",
      "givenData": [
        {
          "tree_height": 3,
          "root_fanout": 100,
          "level1_fanout": 100,
          "leaf_records": 50
        }
      ],
      "required": "Compute maximum indexing capacity for height 3.",
      "concept": "B+ Tree High Fan-out and Logarithmic Disk Access.",
      "query": "-- Mathematical Capacity Calculation:\n-- Level 1 (Root Node): 1 node -> up to 100 pointers\n-- Level 2 (Internal Level): 100 nodes -> up to 100 * 100 = 10,000 pointers\n-- Level 3 (Leaf Level): 10,000 leaf nodes\n-- Each leaf node stores 50 records:\n-- Total Max Records = 10,000 leaf nodes * 50 records = 500,000 records!\n\n-- With height = 4:\n-- 10,000 * 100 * 50 = 50,000,000 records (50 Million!) with just 4 disk reads!",
      "output": [
        {
          "max_records_height_3": "500,000 records",
          "max_records_height_4": "50,000,000 records",
          "disk_reads_per_search": "3 to 4 reads"
        }
      ],
      "explanation": "Because internal nodes store only keys and pointers without data payloads, the fan-out is huge, keeping the tree height flat (3-4 levels) even for 50 million records.",
      "queryBreakdown": [
        {
          "clause": "Order m = 100",
          "purpose": "Defines the branching factor (fan-out) per node."
        },
        {
          "clause": "O(log_m N)",
          "purpose": "Search complexity where base m is 100+, making lookups near-instantaneous."
        }
      ]
    },
    {
      "id": "index-ex-3",
      "title": "Composite Index Column Ordering and Leftmost Prefix Rule",
      "difficulty": "Hard",
      "attribution": "Interview-style (Amazon / Database Tuning)",
      "problem": "An e-commerce table orders has 10 million rows. Queries frequently filter by status = 'SHIPPED' and order_date BETWEEN '2026-01-01' AND '2026-03-31'. Explain why a composite B+ tree index on (status, order_date) outperforms (order_date, status) by examining B+ tree traversal.",
      "givenSchema": "orders (order_id BIGINT PK, customer_id INT, status VARCHAR(20), order_date DATE, total_amount NUMERIC)",
      "givenData": [
        {
          "status_values": "SHIPPED (80%), PENDING (15%), CANCELLED (5%)"
        }
      ],
      "required": "Provide DDL creating optimal composite index and explain why range columns must follow equality columns.",
      "concept": "B+ Tree Leftmost Prefix Matching and Range-Predicate Index Halting.",
      "query": "-- Optimal Index: Equality column first, Range column second\nCREATE INDEX idx_orders_status_date ON orders (status, order_date);\n\n-- Query executing Index Range Scan:\nSELECT order_id, customer_id, total_amount\nFROM orders\nWHERE status = 'SHIPPED' \n  AND order_date >= '2026-01-01' \n  AND order_date <= '2026-03-31';",
      "output": [
        {
          "index_name": "idx_orders_status_date",
          "scan_type": "Index Range Scan",
          "efficiency": "Navigates directly to status=SHIPPED subtree and scans range"
        }
      ],
      "explanation": "In a multi-column B+ tree, keys are sorted first by column 1, then by column 2. When column 1 is evaluated with equality (=), the tree can continue using column 2 for binary search. However, once a range filter (BETWEEN, <, >) is applied to a leading column, subsequent index columns cannot be used for direct branch filtering.",
      "queryBreakdown": [
        {
          "clause": "CREATE INDEX (status, order_date)",
          "purpose": "Orders the B+ tree leaf nodes by status first, then by date."
        },
        {
          "clause": "Equality-first Rule",
          "purpose": "Maximizes index pruning before entering the range scan phase."
        }
      ]
    }
  ],
  "views-stored-procedures": [
    {
      "id": "prog-ex-1",
      "title": "Automated Audit Logging with AFTER UPDATE Trigger",
      "difficulty": "Medium",
      "attribution": "Placement-style (JP Morgan / Wells Fargo)",
      "problem": "Create an automated database trigger that records any change to an employee's salary into an audit table, capturing the old salary, new salary, employee ID, and change timestamp.",
      "givenSchema": "employees (emp_id INT, name VARCHAR(50), salary NUMERIC); audit_log (log_id SERIAL, emp_id INT, old_sal NUMERIC, new_sal NUMERIC, changed_at TIMESTAMP)",
      "givenData": [
        {
          "emp_id": 101,
          "old_salary": 80000,
          "new_salary": 95000
        }
      ],
      "required": "Write SQL DDL creating the audit table, trigger function, and AFTER UPDATE trigger.",
      "concept": "Database Triggers, `:OLD` and `:NEW` pseudorecords.",
      "query": "CREATE TABLE salary_audit_log (\n    log_id SERIAL PRIMARY KEY,\n    emp_id INT NOT NULL,\n    old_salary NUMERIC NOT NULL,\n    new_salary NUMERIC NOT NULL,\n    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE OR REPLACE FUNCTION audit_salary_update()\nRETURNS TRIGGER AS $$\nBEGIN\n    IF OLD.salary <> NEW.salary THEN\n        INSERT INTO salary_audit_log (emp_id, old_salary, new_salary)\n        VALUES (OLD.emp_id, OLD.salary, NEW.salary);\n    END IF;\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trg_salary_change\nAFTER UPDATE ON employees\nFOR EACH ROW EXECUTE FUNCTION audit_salary_update();",
      "output": [
        {
          "log_id": 1,
          "emp_id": 101,
          "old_salary": 80000,
          "new_salary": 95000,
          "changed_at": "2026-10-06 12:00:00"
        }
      ],
      "explanation": "Whenever an application updates a salary, the trigger automatically captures the old and new values in the audit table without requiring any application-layer code.",
      "queryBreakdown": [
        {
          "clause": "CREATE TRIGGER ... AFTER UPDATE",
          "purpose": "Fires only after the update has been verified and applied to the table row."
        },
        {
          "clause": "FOR EACH ROW",
          "purpose": "Executes the audit routine for every individual updated row."
        },
        {
          "clause": "OLD and NEW",
          "purpose": "Pseudorecords referencing pre-update and post-update column values."
        }
      ]
    },
    {
      "id": "prog-ex-2",
      "title": "Creating an Updatable View with Check Option",
      "difficulty": "Hard",
      "attribution": "Interview-style (Oracle / SAP)",
      "problem": "Create a view for the Human Resources department that allows them to insert and update employees in Department 10 only. Prevent them from mistakenly inserting an employee into Department 20 through this view.",
      "givenSchema": "employees (emp_id INT PRIMARY KEY, name VARCHAR(50), department_id INT, salary NUMERIC)",
      "givenData": [
        {
          "emp_id": 501,
          "name": "Maya",
          "department_id": 10,
          "salary": 75000
        }
      ],
      "required": "Write View definition with `WITH CHECK OPTION` to enforce row-level constraints.",
      "concept": "Updatable Views and WITH CHECK OPTION integrity enforcement.",
      "query": "CREATE VIEW hr_dept_10_view AS\nSELECT emp_id, name, department_id, salary\nFROM employees\nWHERE department_id = 10\nWITH CHECK OPTION;\n\n-- Test valid insert (Succeeds)\nINSERT INTO hr_dept_10_view (emp_id, name, department_id, salary)\nVALUES (501, 'Maya', 10, 75000);\n\n-- Test invalid insert (Fails with check option violation!)\n-- INSERT INTO hr_dept_10_view (emp_id, name, department_id, salary)\n-- VALUES (502, 'Rohan', 20, 80000);\n-- ERROR: new row violates check option for view \"hr_dept_10_view\"",
      "output": [
        {
          "emp_id": 501,
          "name": "Maya",
          "department_id": 10,
          "salary": 75000
        }
      ],
      "explanation": "`WITH CHECK OPTION` ensures that any INSERT or UPDATE performed through the view must satisfy the view's WHERE condition (`department_id = 10`), preventing unauthorized out-of-scope rows.",
      "queryBreakdown": [
        {
          "clause": "CREATE VIEW",
          "purpose": "Defines the subset view for Department 10."
        },
        {
          "clause": "WITH CHECK OPTION",
          "purpose": "Guarantees no row can be inserted or modified if it would disappear from the view's filter."
        }
      ]
    },
    {
      "id": "prog-ex-3",
      "title": "Transactional Stored Procedure with Rollback & Error Handling",
      "difficulty": "Hard",
      "attribution": "Interview-style (TCS Digital / Infosys SP)",
      "problem": "Create a production-grade stored procedure process_fund_transfer(sender_id, recipient_id, transfer_amount) that validates sender balance, deducts from sender, adds to recipient, inserts an audit log entry, and rolls back atomically if balance is insufficient or recipient is invalid.",
      "givenSchema": "accounts (account_id INT PK, balance NUMERIC), transfer_logs (log_id SERIAL PK, from_id INT, to_id INT, amount NUMERIC, log_time TIMESTAMP)",
      "givenData": [
        {
          "account_id": 101,
          "balance": 1000
        },
        {
          "account_id": 102,
          "balance": 250
        }
      ],
      "required": "Write PL/pgSQL or SQL procedure implementing atomic transfer with custom error signaling.",
      "concept": "Stored Procedure transaction management, EXCEPTION handling, and atomic row-level locking (FOR UPDATE).",
      "query": "CREATE OR REPLACE PROCEDURE process_fund_transfer(\n    p_sender INT,\n    p_recipient INT,\n    p_amount NUMERIC\n)\nLANGUAGE plpgsql\nAS $$\nDECLARE\n    v_sender_balance NUMERIC;\nBEGIN\n    -- 1. Lock sender row to prevent race conditions\n    SELECT balance INTO v_sender_balance\n    FROM accounts\n    WHERE account_id = p_sender\n    FOR UPDATE;\n\n    -- 2. Validate sufficient funds\n    IF v_sender_balance < p_amount THEN\n        RAISE EXCEPTION 'Insufficient funds: available %, requested %', v_sender_balance, p_amount;\n    END IF;\n\n    -- 3. Execute atomic debit & credit\n    UPDATE accounts SET balance = balance - p_amount WHERE account_id = p_sender;\n    UPDATE accounts SET balance = balance + p_amount WHERE account_id = p_recipient;\n\n    -- 4. Audit ledger entry\n    INSERT INTO transfer_logs (from_id, to_id, amount, log_time)\n    VALUES (p_sender, p_recipient, p_amount, CURRENT_TIMESTAMP);\n\n    COMMIT;\nEXCEPTION\n    WHEN OTHERS THEN\n        ROLLBACK;\n        RAISE;\nEND;\n$$;",
      "output": [
        {
          "procedure": "process_fund_transfer",
          "safety": "SELECT FOR UPDATE row lock + automated rollback on failure"
        }
      ],
      "explanation": "Encapsulating transactional logic in a Stored Procedure eliminates client-server network roundtrips, enforces FOR UPDATE pessimistic locking against concurrent withdrawals, and guarantees that any unexpected exception rolls back all pending updates.",
      "queryBreakdown": [
        {
          "clause": "FOR UPDATE",
          "purpose": "Acquires exclusive row-level lock on sender account, preventing double-spending."
        },
        {
          "clause": "RAISE EXCEPTION",
          "purpose": "Aborts execution if business rule is violated."
        },
        {
          "clause": "EXCEPTION WHEN OTHERS THEN ROLLBACK",
          "purpose": "Ensures the database is never left in a partial state."
        }
      ]
    }
  ]
};

export function getDBMSProblemExamples(rawTopicId) {
  if (!rawTopicId) return DBMS_PROBLEM_EXAMPLES['dbms-architecture'];
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  return DBMS_PROBLEM_EXAMPLES[clean] || DBMS_PROBLEM_EXAMPLES['dbms-architecture'];
}
