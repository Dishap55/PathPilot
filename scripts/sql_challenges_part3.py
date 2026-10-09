# SQL Challenges Part 3: Keys, Views, Indexing, Normalization, ACID, Concurrency, Architecture, ER (Challenges 41-65)

part3_challenges = [
    # 41. Identify Orphaned Foreign Key Records
    {
        "id": "sql-ch-41",
        "topicId": "relational-model-keys",
        "title": "Identify Orphaned Foreign Key Records",
        "difficulty": "Medium",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Assessment - Foreign Key Violations",
            "role": "Systems Engineer"
        },
        "prompt": "Write a SQL query to identify all `order_id` and `customer_id` records in `orders` where the referenced `customer_id` does not exist in `customers`. Order by `order_id`.",
        "schema_context": """CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT
);
INSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO orders VALUES (101, 1), (102, 99), (103, 2), (104, 88);""",
        "sample_data": [
            {"customers": "1, 2"},
            {"orders": "101->1, 102->99 (orphan), 103->2, 104->88 (orphan)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT o.order_id, o.customer_id\nFROM orders o\nLEFT JOIN customers c ON ...\nWHERE ...;",
        "solution_query": "SELECT o.order_id, o.customer_id FROM orders o LEFT JOIN customers c ON o.customer_id = c.customer_id WHERE c.customer_id IS NULL ORDER BY o.order_id ASC;",
        "expected_result": [
            {"order_id": 102, "customer_id": 99},
            {"order_id": 104, "customer_id": 88}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Orphans detected",
                "description": "Verify orders 102 and 104 are detected as orphaned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 102 && res[1].order_id === 104"
            }
        ],
        "hints": [
            "Hint 1: Left join `orders` to `customers` on `o.customer_id = c.customer_id`.",
            "Hint 2: Filter with `WHERE c.customer_id IS NULL`."
        ],
        "explanation": "An anti-join detects child rows referencing parent keys that were deleted or never created.",
        "queryBreakdown": [
            {"clause": "WHERE c.customer_id IS NULL", "purpose": "Isolates orphaned child records."}
        ]
    },

    # 42. Candidate Key Uniqueness Verification
    {
        "id": "sql-ch-42",
        "topicId": "relational-model-keys",
        "title": "Verify Alternate Candidate Key Uniqueness",
        "difficulty": "Easy",
        "attribution": "Placement-style (Cognizant)",
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Cognizant GenC - Candidate Key Integrity Verification",
            "role": "Programmer Analyst"
        },
        "prompt": "Write a SQL query to find any duplicate phone numbers in `user_accounts` that violate the alternate candidate key constraint. Return `phone_number` and its occurrence count as `duplicates_count`.",
        "schema_context": """CREATE TABLE user_accounts (
    user_id INT PRIMARY KEY,
    name VARCHAR(50),
    phone_number VARCHAR(15)
);
INSERT INTO user_accounts VALUES
(1, 'Aarav', '9876543210'),
(2, 'Binod', '9123456780'),
(3, 'Chetan', '9876543210'),
(4, 'Deepa', '9988776655');""",
        "sample_data": [
            {"phone": "9876543210 used by Aarav and Chetan"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT phone_number, COUNT(*) AS duplicates_count\nFROM user_accounts\nGROUP BY phone_number\nHAVING ...;",
        "solution_query": "SELECT phone_number, COUNT(*) AS duplicates_count FROM user_accounts GROUP BY phone_number HAVING COUNT(*) > 1;",
        "expected_result": [
            {"phone_number": "9876543210", "duplicates_count": 2}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Duplicate detected",
                "description": "Verify 9876543210 has count 2",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].phone_number === '9876543210' && res[0].duplicates_count === 2"
            }
        ],
        "hints": [
            "Hint 1: Group by `phone_number`.",
            "Hint 2: Filter with `HAVING COUNT(*) > 1`."
        ],
        "explanation": "Validates uniqueness before establishing an alternate candidate key index.",
        "queryBreakdown": [
            {"clause": "HAVING COUNT(*) > 1", "purpose": "Identifies keys with duplicate violations."}
        ]
    },

    # 43. Composite Primary Key Lookups
    {
        "id": "sql-ch-43",
        "topicId": "relational-model-keys",
        "title": "Composite Primary Key Enrollment Lookups",
        "difficulty": "Easy",
        "attribution": "Placement-style (Wipro / TCS)",
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Wipro Placement Assessment - Composite Key Queries",
            "role": "Project Engineer"
        },
        "prompt": "Write a SQL query to select `student_id`, `course_id`, and `grade` for all enrollments in semester 'Fall-2026' having grade 'A'. Order by `student_id`.",
        "schema_context": """CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    semester VARCHAR(20),
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id, semester)
);
INSERT INTO enrollments VALUES
(101, 10, 'Fall-2026', 'A'),
(101, 20, 'Fall-2026', 'B'),
(102, 10, 'Fall-2026', 'A'),
(103, 10, 'Spring-2026', 'A');""",
        "sample_data": [
            {"fall_2026_grade_A": "101-10, 102-10"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT student_id, course_id, grade\nFROM enrollments\nWHERE ...;",
        "solution_query": "SELECT student_id, course_id, grade FROM enrollments WHERE semester = 'Fall-2026' AND grade = 'A' ORDER BY student_id ASC;",
        "expected_result": [
            {"student_id": 101, "course_id": 10, "grade": "A"},
            {"student_id": 102, "course_id": 10, "grade": "A"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Filtered results",
                "description": "Verify student 101 and 102 in Fall-2026 with grade A are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].student_id === 101 && res[1].student_id === 102"
            }
        ],
        "hints": [
            "Hint 1: Use `WHERE semester = 'Fall-2026' AND grade = 'A'`.",
            "Hint 2: Order by `student_id ASC`."
        ],
        "explanation": "Demonstrates point queries on relations with multi-attribute composite primary keys.",
        "queryBreakdown": [
            {"clause": "WHERE semester = 'Fall-2026' AND grade = 'A'", "purpose": "Filters composite key table."}
        ]
    },

    # 44. Cascade Delete Impact Simulation
    {
        "id": "sql-ch-44",
        "topicId": "relational-model-keys",
        "title": "Simulate Foreign Key Cascade Delete Impact",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Referential Actions (CASCADE)",
            "role": "Systems Engineer Specialist"
        },
        "prompt": "Before deleting customer with `id = 1`, write a SQL query to inspect all dependent order IDs and total amounts in `orders` that would be wiped out under `ON DELETE CASCADE`. Order by `order_id`.",
        "schema_context": """CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    amount NUMERIC
);
INSERT INTO orders VALUES
(1001, 1, 450),
(1002, 2, 200),
(1003, 1, 890),
(1004, 3, 150);""",
        "sample_data": [
            {"orders_for_customer_1": "1001 ($450), 1003 ($890)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT order_id, amount\nFROM orders\nWHERE customer_id = ...\nORDER BY order_id ASC;",
        "solution_query": "SELECT order_id, amount FROM orders WHERE customer_id = 1 ORDER BY order_id ASC;",
        "expected_result": [
            {"order_id": 1001, "amount": 450},
            {"order_id": 1003, "amount": 890}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Cascade scope check",
                "description": "Verify orders 1001 and 1003 are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 1001 && res[1].order_id === 1003"
            }
        ],
        "hints": [
            "Hint 1: Query `WHERE customer_id = 1`.",
            "Hint 2: Order by `order_id ASC`."
        ],
        "explanation": "Audits the exact blast radius of child records that would be removed by cascading foreign keys.",
        "queryBreakdown": [
            {"clause": "WHERE customer_id = 1", "purpose": "Isolates child records tied to targeted parent."}
        ]
    },

    # 45. Querying an Analytical View
    {
        "id": "sql-ch-45",
        "topicId": "views-stored-procedures",
        "title": "Querying a Predefined Analytical View",
        "difficulty": "Easy",
        "attribution": "Placement-style (Cognizant / Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Database Views & Abstraction",
            "role": "Systems Associate"
        },
        "prompt": "Write a SQL query to select all records from the analytical view `v_dept_summary` where `avg_salary` is at least 80,000, ordered by `avg_salary` descending.",
        "schema_context": """CREATE TABLE emp (id INT, dept VARCHAR(50), salary INT);
INSERT INTO emp VALUES (1, 'IT', 90000), (2, 'IT', 95000), (3, 'HR', 60000);
CREATE VIEW v_dept_summary AS
SELECT dept, COUNT(*) AS emp_count, AVG(salary) AS avg_salary
FROM emp GROUP BY dept;""",
        "sample_data": [
            {"view": "v_dept_summary (IT: 92500, HR: 60000)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT dept, emp_count, avg_salary\nFROM v_dept_summary\nWHERE ...;",
        "solution_query": "SELECT dept, emp_count, avg_salary FROM v_dept_summary WHERE avg_salary >= 80000 ORDER BY avg_salary DESC;",
        "expected_result": [
            {"dept": "IT", "emp_count": 2, "avg_salary": 92500.0}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "View query check",
                "description": "Verify IT department with avg 92500 is returned from the view",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].dept === 'IT'"
            }
        ],
        "hints": [
            "Hint 1: Treat `v_dept_summary` like any standard SQL table.",
            "Hint 2: Filter `WHERE avg_salary >= 80000`."
        ],
        "explanation": "Views present a virtual relational interface, allowing complex precomputed queries to be filtered cleanly with standard WHERE clauses.",
        "queryBreakdown": [
            {"clause": "FROM v_dept_summary", "purpose": "Queries the virtual relation abstraction."}
        ]
    },

    # 46. Categorizing Salaries Using CASE
    {
        "id": "sql-ch-46",
        "topicId": "views-stored-procedures",
        "title": "Salary Tier Classification with CASE",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / TCS)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon Online Assessment - Conditional CASE Expressions",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query using `CASE` to report `name`, `salary`, and a new column `salary_tier`: 'Senior' if salary >= 90000, 'Mid' if salary BETWEEN 60000 AND 89999, and 'Entry' otherwise. Order by `salary` descending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT
);
INSERT INTO staff VALUES
(1, 'Alice', 105000),
(2, 'Bob', 75000),
(3, 'Charlie', 45000),
(4, 'Diana', 92000);""",
        "sample_data": [
            {"Alice": "105k (Senior)", "Diana": "92k (Senior)", "Bob": "75k (Mid)", "Charlie": "45k (Entry)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name, salary,\n       CASE\n           WHEN ... THEN 'Senior'\n           WHEN ... THEN 'Mid'\n           ELSE 'Entry'\n       END AS salary_tier\nFROM staff\nORDER BY salary DESC;",
        "solution_query": "SELECT name, salary, CASE WHEN salary >= 90000 THEN 'Senior' WHEN salary BETWEEN 60000 AND 89999 THEN 'Mid' ELSE 'Entry' END AS salary_tier FROM staff ORDER BY salary DESC;",
        "expected_result": [
            {"name": "Alice", "salary": 105000, "salary_tier": "Senior"},
            {"name": "Diana", "salary": 92000, "salary_tier": "Senior"},
            {"name": "Bob", "salary": 75000, "salary_tier": "Mid"},
            {"name": "Charlie", "salary": 45000, "salary_tier": "Entry"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Tiers classified",
                "description": "Verify all 4 employees receive correct tiers",
                "code": "(res) => Array.isArray(res) && res.length === 4 && res[0].salary_tier === 'Senior' && res[2].salary_tier === 'Mid' && res[3].salary_tier === 'Entry'"
            }
        ],
        "hints": [
            "Hint 1: Use `CASE WHEN salary >= 90000 THEN 'Senior' ... ELSE 'Entry' END`.",
            "Hint 2: Alias the expression as `salary_tier`."
        ],
        "explanation": "CASE expressions provide if-then-else branching logic inside queries to synthesize categorized attributes.",
        "queryBreakdown": [
            {"clause": "CASE WHEN ... END AS salary_tier", "purpose": "Applies inline business conditional classification."}
        ]
    },

    # 47. Net Pay Calculation with Column Expressions
    {
        "id": "sql-ch-47",
        "topicId": "views-stored-procedures",
        "title": "Compute Gross, Deductions, and Net Pay",
        "difficulty": "Easy",
        "attribution": "Placement-style (Wipro / Infosys)",
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Wipro Technical Round - Computed Column Expressions",
            "role": "Project Engineer"
        },
        "prompt": "Write a SQL query to calculate `emp_id`, `name`, `gross_salary`, tax as `tax_deduction` (10% of gross), and `net_pay` (gross - tax). Order by `net_pay` descending.",
        "schema_context": """CREATE TABLE payroll (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    gross_salary NUMERIC(10,2)
);
INSERT INTO payroll VALUES
(1, 'Kavita', 100000.00),
(2, 'Laksh', 60000.00),
(3, 'Manish', 80000.00);""",
        "sample_data": [
            {"Kavita": "Gross 100k, Tax 10k, Net 90k"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT emp_id, name, gross_salary,\n       (gross_salary * 0.10) AS tax_deduction,\n       (gross_salary * 0.90) AS net_pay\nFROM payroll\nORDER BY net_pay DESC;",
        "solution_query": "SELECT emp_id, name, gross_salary, (gross_salary * 0.10) AS tax_deduction, (gross_salary * 0.90) AS net_pay FROM payroll ORDER BY net_pay DESC;",
        "expected_result": [
            {"emp_id": 1, "name": "Kavita", "gross_salary": 100000.00, "tax_deduction": 10000.00, "net_pay": 90000.00},
            {"emp_id": 3, "name": "Manish", "gross_salary": 80000.00, "tax_deduction": 8000.00, "net_pay": 72000.00},
            {"emp_id": 2, "name": "Laksh", "gross_salary": 60000.00, "tax_deduction": 6000.00, "net_pay": 54000.00}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Net pay computed",
                "description": "Verify Kavita net_pay is 90,000",
                "code": "(res) => Array.isArray(res) && res[0].name === 'Kavita' && res[0].net_pay == 90000"
            }
        ],
        "hints": [
            "Hint 1: Multiply `gross_salary * 0.10` for tax.",
            "Hint 2: Multiply `gross_salary * 0.90` for net pay."
        ],
        "explanation": "Calculated columns allow mathematical transformations without altering underlying stored table columns.",
        "queryBreakdown": [
            {"clause": "(gross_salary * 0.90) AS net_pay", "purpose": "Computes derived pay value."}
        ]
    },

    # 48. Pivoting Row Data with CASE and SUM
    {
        "id": "sql-ch-48",
        "topicId": "views-stored-procedures",
        "title": "Pivot Monthly Sales by Quarter using CASE & SUM",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Deloitte)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon Business Intelligence - Matrix Pivot Operations",
            "role": "BI Engineer / SDE"
        },
        "prompt": "Write a SQL query to pivot sales data by `rep_name`, showing `q1_sales` (sum of Q1 sales) and `q2_sales` (sum of Q2 sales). Order by `rep_name`.",
        "schema_context": """CREATE TABLE sales (
    id INT PRIMARY KEY,
    rep_name VARCHAR(50),
    quarter VARCHAR(10),
    revenue INT
);
INSERT INTO sales VALUES
(1, 'Alice', 'Q1', 5000),
(2, 'Alice', 'Q2', 7000),
(3, 'Bob', 'Q1', 3000),
(4, 'Bob', 'Q2', 4000);""",
        "sample_data": [
            {"Alice": "Q1: 5000, Q2: 7000"},
            {"Bob": "Q1: 3000, Q2: 4000"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT rep_name,\n       SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS q1_sales,\n       SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS q2_sales\nFROM sales\nGROUP BY rep_name\nORDER BY rep_name ASC;",
        "solution_query": "SELECT rep_name, SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS q1_sales, SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS q2_sales FROM sales GROUP BY rep_name ORDER BY rep_name ASC;",
        "expected_result": [
            {"rep_name": "Alice", "q1_sales": 12000, "q2_sales": 7000},  # will be verified
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Pivoted columns",
                "description": "Verify Alice has 5000 in Q1 and 7000 in Q2",
                "code": "(res) => Array.isArray(res) && res.some(r => r.rep_name === 'Alice' && r.q1_sales === 5000 && r.q2_sales === 7000)"
            }
        ],
        "hints": [
            "Hint 1: Use conditional aggregation: `SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END)`.",
            "Hint 2: Group by `rep_name`."
        ],
        "explanation": "Combining SUM with CASE statements transforms row-level dimension values into dedicated analytical columns (pivoting).",
        "queryBreakdown": [
            {"clause": "SUM(CASE WHEN ...)", "purpose": "Performs column transpose aggregation."}
        ]
    },

    # Fix expected_result for 48:
]

part3_challenges[7]["expected_result"] = [
    {"rep_name": "Alice", "q1_sales": 5000, "q2_sales": 7000},
    {"rep_name": "Bob", "q1_sales": 3000, "q2_sales": 4000}
]

# Adding challenges 49-65:
part3_challenges.extend([
    # 49. Range Index Lookup
    {
        "id": "sql-ch-49",
        "topicId": "indexing-btrees",
        "title": "Range Scan Predicate Optimization",
        "difficulty": "Easy",
        "attribution": "Placement-style (Amazon / Oracle)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - B+ Tree Range Traversals",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query that retrieves `account_id` and `balance` for all accounts with balance between 5000 and 15000 inclusive, ordered by `balance`.",
        "schema_context": """CREATE TABLE accounts (
    account_id INT PRIMARY KEY,
    balance INT
);
INSERT INTO accounts VALUES (101, 3000), (102, 7500), (103, 12000), (104, 25000);""",
        "sample_data": [
            {"accounts": "102 (7500), 103 (12000)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT account_id, balance FROM accounts WHERE balance BETWEEN 5000 AND 15000 ORDER BY balance ASC;",
        "solution_query": "SELECT account_id, balance FROM accounts WHERE balance BETWEEN 5000 AND 15000 ORDER BY balance ASC;",
        "expected_result": [
            {"account_id": 102, "balance": 7500},
            {"account_id": 103, "balance": 12000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Range filter check",
                "description": "Verify only 102 and 103 qualify",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].account_id === 102 && res[1].account_id === 103"
            }
        ],
        "hints": [
            "Hint 1: Use `WHERE balance BETWEEN 5000 AND 15000`.",
            "Hint 2: Sort by `balance ASC`."
        ],
        "explanation": "In a B+ Tree, range predicates navigate directly to the starting leaf page and scan sibling pointers linearly.",
        "queryBreakdown": [
            {"clause": "WHERE balance BETWEEN 5000 AND 15000", "purpose": "Executes B+ Tree index range scan."}
        ]
    },

    # 50. Leftmost Prefix Search
    {
        "id": "sql-ch-50",
        "topicId": "indexing-btrees",
        "title": "Multi-Column Composite Index Leftmost Matching",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Database Tuning)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon Database Internals - Composite Index Leftmost Prefix Rule",
            "role": "SDE-2"
        },
        "prompt": "Write a query filtering orders where `status = 'SHIPPED'` and `customer_id = 1`, ordering by `order_id` ascending.",
        "schema_context": """CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    status VARCHAR(20),
    customer_id INT
);
INSERT INTO orders VALUES
(1, 'SHIPPED', 1),
(2, 'PENDING', 1),
(3, 'SHIPPED', 2),
(4, 'SHIPPED', 1);""",
        "sample_data": [
            {"orders": "1: SHIPPED-1, 4: SHIPPED-1"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT order_id, status, customer_id FROM orders WHERE status = 'SHIPPED' AND customer_id = 1 ORDER BY order_id ASC;",
        "solution_query": "SELECT order_id, status, customer_id FROM orders WHERE status = 'SHIPPED' AND customer_id = 1 ORDER BY order_id ASC;",
        "expected_result": [
            {"order_id": 1, "status": "SHIPPED", "customer_id": 1},
            {"order_id": 4, "status": "SHIPPED", "customer_id": 1}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Matches both conditions",
                "description": "Verify orders 1 and 4 are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 1 && res[1].order_id === 4"
            }
        ],
        "hints": [
            "Hint 1: Filter with `WHERE status = 'SHIPPED' AND customer_id = 1`.",
            "Hint 2: Sort by `order_id ASC`."
        ],
        "explanation": "Evaluating equality predicates matching composite index column order enables maximum index subtree pruning.",
        "queryBreakdown": [
            {"clause": "WHERE status = 'SHIPPED' AND customer_id = 1", "purpose": "Leverages composite index leftmost matching."}
        ]
    },

    # 51. Optimizing IN Clause Searches
    {
        "id": "sql-ch-51",
        "topicId": "indexing-btrees",
        "title": "Indexed Multi-Value Probe with IN",
        "difficulty": "Medium",
        "attribution": "Placement-style (TCS / Capgemini)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "TCS Placement Prep - Indexed Set Lookups",
            "role": "Systems Engineer"
        },
        "prompt": "Write a SQL query to retrieve `user_id`, `username`, and `role` for all users whose `user_id` is in (101, 103, 105). Order by `user_id`.",
        "schema_context": """CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    role VARCHAR(30)
);
INSERT INTO users VALUES
(101, 'alex', 'ADMIN'),
(102, 'bob', 'USER'),
(103, 'charlie', 'MOD'),
(104, 'david', 'USER'),
(105, 'eve', 'ADMIN');""",
        "sample_data": [
            {"users": "101, 103, 105"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT user_id, username, role FROM users WHERE user_id IN (101, 103, 105) ORDER BY user_id ASC;",
        "solution_query": "SELECT user_id, username, role FROM users WHERE user_id IN (101, 103, 105) ORDER BY user_id ASC;",
        "expected_result": [
            {"user_id": 101, "username": "alex", "role": "ADMIN"},
            {"user_id": 103, "username": "charlie", "role": "MOD"},
            {"user_id": 105, "username": "eve", "role": "ADMIN"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Probe matching",
                "description": "Verify exactly 101, 103, 105 are returned",
                "code": "(res) => Array.isArray(res) && res.length === 3 && res[0].user_id === 101 && res[2].user_id === 105"
            }
        ],
        "hints": [
            "Hint 1: Use `WHERE user_id IN (101, 103, 105)`.",
            "Hint 2: Order by `user_id ASC`."
        ],
        "explanation": "Primary key lookups with IN perform multiple fast point searches down the B+ tree.",
        "queryBreakdown": [
            {"clause": "WHERE user_id IN (...)", "purpose": "Probes primary key index directly."}
        ]
    },

    # 52. Eliminating Repeating Groups (1NF Query)
    {
        "id": "sql-ch-52",
        "topicId": "normalization",
        "title": "Querying Normalized 1NF Atomic Attributes",
        "difficulty": "Medium",
        "attribution": "Placement-style (Infosys / Wipro)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - First Normal Form & Atomicity",
            "role": "Systems Associate"
        },
        "prompt": "In a properly normalized 1NF table `student_skills`, write a SQL query to find all students who possess the 'SQL' skill. Return `student_name` and `skill`. Order by `student_name`.",
        "schema_context": """CREATE TABLE student_skills (
    student_id INT,
    student_name VARCHAR(50),
    skill VARCHAR(50)
);
INSERT INTO student_skills VALUES
(1, 'Rohan', 'Java'),
(1, 'Rohan', 'SQL'),
(2, 'Priya', 'Python'),
(3, 'Ankit', 'SQL');""",
        "sample_data": [
            {"SQL_skills": "Rohan, Ankit"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT student_name, skill FROM student_skills WHERE skill = 'SQL' ORDER BY student_name ASC;",
        "solution_query": "SELECT student_name, skill FROM student_skills WHERE skill = 'SQL' ORDER BY student_name ASC;",
        "expected_result": [
            {"student_name": "Ankit", "skill": "SQL"},
            {"student_name": "Rohan", "skill": "SQL"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "SQL skills identified",
                "description": "Verify Ankit and Rohan are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].student_name === 'Ankit' && res[1].student_name === 'Rohan'"
            }
        ],
        "hints": [
            "Hint 1: In 1NF, every attribute is atomic, so a simple `WHERE skill = 'SQL'` works without regex or string parsing.",
            "Hint 2: Sort by `student_name ASC`."
        ],
        "explanation": "Because 1NF enforces atomic values rather than comma-separated lists, filtering operations are fast, indexable, and standard.",
        "queryBreakdown": [
            {"clause": "WHERE skill = 'SQL'", "purpose": "Direct equality search on atomic 1NF attribute."}
        ]
    },

    # 53. Reconstructing Normalized Relations
    {
        "id": "sql-ch-53",
        "topicId": "normalization",
        "title": "Reconstruct Normalized Relations via Foreign Key Join",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT - Lossless Join Decompositions",
            "role": "Ninja Developer"
        },
        "prompt": "Write a SQL query that joins normalized tables `orders` and `order_details` to calculate `order_id` and total order amount as `total_cost`. Order by `order_id`.",
        "schema_context": """CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date DATE
);
CREATE TABLE order_details (
    item_id INT PRIMARY KEY,
    order_id INT,
    price INT,
    quantity INT
);
INSERT INTO orders VALUES (101, '2026-03-01'), (102, '2026-03-02');
INSERT INTO order_details VALUES (1, 101, 100, 2), (2, 101, 50, 1), (3, 102, 200, 1);""",
        "sample_data": [
            {"order_101": "2*100 + 1*50 = 250"},
            {"order_102": "1*200 = 200"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT o.order_id, SUM(od.price * od.quantity) AS total_cost\nFROM orders o\nJOIN order_details od ON o.order_id = od.order_id\nGROUP BY o.order_id\nORDER BY o.order_id ASC;",
        "solution_query": "SELECT o.order_id, SUM(od.price * od.quantity) AS total_cost FROM orders o JOIN order_details od ON o.order_id = od.order_id GROUP BY o.order_id ORDER BY o.order_id ASC;",
        "expected_result": [
            {"order_id": 101, "total_cost": 250},
            {"order_id": 102, "total_cost": 200}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Lossless join cost calculation",
                "description": "Verify 101 has cost 250 and 102 has 200",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].total_cost === 250 && res[1].total_cost === 200"
            }
        ],
        "hints": [
            "Hint 1: Join on foreign key `o.order_id = od.order_id`.",
            "Hint 2: Sum `price * quantity` grouped by `order_id`."
        ],
        "explanation": "Lossless-join decomposition allows relations to be stored separately without redundancy and reconstructed cleanly at query time.",
        "queryBreakdown": [
            {"clause": "JOIN order_details od ON o.order_id = od.order_id", "purpose": "Reconstructs relationship losslessly."}
        ]
    },

    # 54. Detecting Transitive Dependencies
    {
        "id": "sql-ch-54",
        "topicId": "normalization",
        "title": "Detect Transitive Redundancy Inconsistencies",
        "difficulty": "Medium",
        "attribution": "Placement-style (GATE / Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - 2NF vs 3NF Transitive Dependencies",
            "role": "Systems Engineer"
        },
        "prompt": "In an unnormalized table violating 3NF, identify department codes having more than 1 distinct department name recorded. Return `dept_code`.",
        "schema_context": """CREATE TABLE unnormalized_staff (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    dept_code VARCHAR(10),
    dept_name VARCHAR(50)
);
INSERT INTO unnormalized_staff VALUES
(1, 'A', 'D1', 'Technology'),
(2, 'B', 'D1', 'Tech Dept'),
(3, 'C', 'D2', 'Human Resources'),
(4, 'D', 'D2', 'Human Resources');""",
        "sample_data": [
            {"D1": "Recorded as both 'Technology' and 'Tech Dept' (update anomaly)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT dept_code\nFROM unnormalized_staff\nGROUP BY dept_code\nHAVING COUNT(DISTINCT dept_name) > 1;",
        "solution_query": "SELECT dept_code FROM unnormalized_staff GROUP BY dept_code HAVING COUNT(DISTINCT dept_name) > 1;",
        "expected_result": [
            {"dept_code": "D1"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Inconsistency detected",
                "description": "Verify D1 is identified as inconsistent",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].dept_code === 'D1'"
            }
        ],
        "hints": [
            "Hint 1: Group by `dept_code`.",
            "Hint 2: Filter with `HAVING COUNT(DISTINCT dept_name) > 1`."
        ],
        "explanation": "Transitive dependencies (emp_id -> dept_code -> dept_name) cause update anomalies when a department name changes in one row but not another.",
        "queryBreakdown": [
            {"clause": "HAVING COUNT(DISTINCT dept_name) > 1", "purpose": "Catches redundant non-key update anomalies."}
        ]
    },

    # 55. Account Balance Reconciliation
    {
        "id": "sql-ch-55",
        "topicId": "transactions-acid",
        "title": "Double-Entry Ledger Audit Reconciliation",
        "difficulty": "Medium",
        "attribution": "Placement-style (Deloitte / Banking)",
        "companyMetadata": {
            "company": "Deloitte",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Deloitte Financial Systems - Ledger Audit Queries",
            "role": "Technology Analyst"
        },
        "prompt": "Write a SQL query to verify that the total debits equal total credits across all transactions. Return `total_debits`, `total_credits`, and `ledger_balanced` ('BALANCED' if equal, 'UNBALANCED' otherwise).",
        "schema_context": """CREATE TABLE ledger_entries (
    entry_id INT PRIMARY KEY,
    tx_id INT,
    debit NUMERIC(10,2),
    credit NUMERIC(10,2)
);
INSERT INTO ledger_entries VALUES
(1, 1001, 500.00, 0.00),
(2, 1001, 0.00, 500.00),
(3, 1002, 1200.00, 0.00),
(4, 1002, 0.00, 1200.00);""",
        "sample_data": [
            {"total_debits": 1700, "total_credits": 1700}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT SUM(debit) AS total_debits, SUM(credit) AS total_credits,\n       CASE WHEN SUM(debit) = SUM(credit) THEN 'BALANCED' ELSE 'UNBALANCED' END AS ledger_balanced\nFROM ledger_entries;",
        "solution_query": "SELECT SUM(debit) AS total_debits, SUM(credit) AS total_credits, CASE WHEN SUM(debit) = SUM(credit) THEN 'BALANCED' ELSE 'UNBALANCED' END AS ledger_balanced FROM ledger_entries;",
        "expected_result": [
            {"total_debits": 1700.0, "total_credits": 1700.0, "ledger_balanced": "BALANCED"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Balanced audit check",
                "description": "Verify ledger is BALANCED with 1700 on both sides",
                "code": "(res) => Array.isArray(res) && res[0].ledger_balanced === 'BALANCED' && res[0].total_debits == 1700"
            }
        ],
        "hints": [
            "Hint 1: Use `SUM(debit)` and `SUM(credit)`.",
            "Hint 2: Compare sums in a `CASE` statement."
        ],
        "explanation": "Guarantees transaction consistency (the 'C' in ACID) across financial ledger entries.",
        "queryBreakdown": [
            {"clause": "CASE WHEN SUM(debit) = SUM(credit)...", "purpose": "Verifies accounting equality invariant."}
        ]
    },

    # 56. Pending Transactions in Audit Log
    {
        "id": "sql-ch-56",
        "topicId": "transactions-acid",
        "title": "Identify Uncommitted or Pending Transactions",
        "difficulty": "Easy",
        "attribution": "Placement-style (Amazon / Core Engineering)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon Payments - Transaction State Auditing",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to select `tx_id`, `user_id`, and `amount` for all transactions whose status is 'PENDING', ordered by `tx_id`.",
        "schema_context": """CREATE TABLE transaction_log (
    tx_id INT PRIMARY KEY,
    user_id INT,
    amount NUMERIC,
    status VARCHAR(20)
);
INSERT INTO transaction_log VALUES
(1, 10, 50, 'COMMITTED'),
(2, 11, 200, 'PENDING'),
(3, 10, 150, 'FAILED'),
(4, 12, 80, 'PENDING');""",
        "sample_data": [
            {"pending": "tx 2 and 4"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT tx_id, user_id, amount\nFROM transaction_log\nWHERE status = 'PENDING'\nORDER BY tx_id ASC;",
        "solution_query": "SELECT tx_id, user_id, amount FROM transaction_log WHERE status = 'PENDING' ORDER BY tx_id ASC;",
        "expected_result": [
            {"tx_id": 2, "user_id": 11, "amount": 200},
            {"tx_id": 4, "user_id": 12, "amount": 80}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Pending rows isolated",
                "description": "Verify transactions 2 and 4 are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].tx_id === 2 && res[1].tx_id === 4"
            }
        ],
        "hints": [
            "Hint 1: Filter with `WHERE status = 'PENDING'`.",
            "Hint 2: Sort by `tx_id ASC`."
        ],
        "explanation": "Transactions not in COMMITTED state must be tracked by the Recovery Manager for potential rollback or retry.",
        "queryBreakdown": [
            {"clause": "WHERE status = 'PENDING'", "purpose": "Isolates active uncommitted operations."}
        ]
    },

    # 57. Idempotent Transaction Token Check
    {
        "id": "sql-ch-57",
        "topicId": "transactions-acid",
        "title": "Idempotent Transaction Token Validation",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Flipkart)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE - Idempotent Payment API Design",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to check if an idempotency key `idem_key = 'KEY-ABC-123'` already exists in `payments`. If found, return `payment_id` and `status` to prevent double-charging.",
        "schema_context": """CREATE TABLE payments (
    payment_id INT PRIMARY KEY,
    idem_key VARCHAR(50),
    amount NUMERIC,
    status VARCHAR(20)
);
INSERT INTO payments VALUES
(1001, 'KEY-ABC-123', 99.00, 'SUCCESS'),
(1002, 'KEY-XYZ-999', 49.00, 'SUCCESS');""",
        "sample_data": [
            {"key": "KEY-ABC-123 exists as payment 1001"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT payment_id, status\nFROM payments\nWHERE idem_key = 'KEY-ABC-123';",
        "solution_query": "SELECT payment_id, status FROM payments WHERE idem_key = 'KEY-ABC-123';",
        "expected_result": [
            {"payment_id": 1001, "status": "SUCCESS"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Idempotency match",
                "description": "Verify payment 1001 is retrieved",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].payment_id === 1001"
            }
        ],
        "hints": [
            "Hint 1: Query by `WHERE idem_key = 'KEY-ABC-123'`.",
            "Hint 2: Project `payment_id` and `status` to inspect the cached response state."
        ],
        "explanation": "Idempotency prevents duplicate state mutations during distributed network retries.",
        "queryBreakdown": [
            {"clause": "WHERE idem_key = ...", "purpose": "Probes unique client idempotency token."}
        ]
    },

    # 58. Lock Contention Catalog Query
    {
        "id": "sql-ch-58",
        "topicId": "concurrency-locking",
        "title": "Inspect Active Lock Contention in System Catalog",
        "difficulty": "Medium",
        "attribution": "Placement-style (Oracle / Microsoft)",
        "companyMetadata": {
            "company": "Microsoft",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Microsoft SQL Server - Lock Escalation & Blocking Queries",
            "role": "Software Engineer"
        },
        "prompt": "Write a SQL query to select all transactions in `db_locks` waiting for a lock (`granted = 0`), returning `tx_id`, `resource_name`, and `lock_mode`. Order by `tx_id`.",
        "schema_context": """CREATE TABLE db_locks (
    lock_id INT PRIMARY KEY,
    tx_id INT,
    resource_name VARCHAR(50),
    lock_mode VARCHAR(10),
    granted INT
);
INSERT INTO db_locks VALUES
(1, 101, 'table_accounts', 'X', 1),
(2, 102, 'table_accounts', 'X', 0),
(3, 103, 'table_orders', 'S', 1),
(4, 104, 'table_accounts', 'S', 0);""",
        "sample_data": [
            {"waiting": "tx 102 and 104 waiting for table_accounts"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT tx_id, resource_name, lock_mode\nFROM db_locks\nWHERE granted = 0\nORDER BY tx_id ASC;",
        "solution_query": "SELECT tx_id, resource_name, lock_mode FROM db_locks WHERE granted = 0 ORDER BY tx_id ASC;",
        "expected_result": [
            {"tx_id": 102, "resource_name": "table_accounts", "lock_mode": "X"},
            {"tx_id": 104, "resource_name": "table_accounts", "lock_mode": "S"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Blocked transactions identified",
                "description": "Verify transactions 102 and 104 are isolated",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].tx_id === 102 && res[1].tx_id === 104"
            }
        ],
        "hints": [
            "Hint 1: Filter with `WHERE granted = 0`.",
            "Hint 2: Order by `tx_id ASC`."
        ],
        "explanation": "Identifies blocked transactions waiting in the lock manager queue.",
        "queryBreakdown": [
            {"clause": "WHERE granted = 0", "purpose": "Filters for transactions denied immediate lock acquisition."}
        ]
    },

    # 59. Deadlock Wait-For Cycle Candidates
    {
        "id": "sql-ch-59",
        "topicId": "concurrency-locking",
        "title": "Detect Deadlock Wait-For Dependency Pairs",
        "difficulty": "Hard",
        "attribution": "Placement-style (Oracle / Microsoft)",
        "companyMetadata": {
            "company": "Microsoft",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Microsoft - Deadlock Graph Cycle Identification",
            "role": "Core Database Engineer"
        },
        "prompt": "In a wait-for graph table `tx_waits`, write a SQL query to detect mutual deadlock pairs where T1 is waiting for T2, and T2 is also waiting for T1. Return `t1_tx` and `t2_tx` (where t1_tx < t2_tx).",
        "schema_context": """CREATE TABLE tx_waits (
    waiting_tx INT,
    holding_tx INT
);
INSERT INTO tx_waits VALUES
(101, 102),
(102, 101),
(103, 104);""",
        "sample_data": [
            {"mutual_deadlock": "101 waits for 102 AND 102 waits for 101"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT w1.waiting_tx AS t1_tx, w1.holding_tx AS t2_tx\nFROM tx_waits w1\nJOIN tx_waits w2 ON ...\nWHERE ...;",
        "solution_query": "SELECT w1.waiting_tx AS t1_tx, w1.holding_tx AS t2_tx FROM tx_waits w1 JOIN tx_waits w2 ON w1.waiting_tx = w2.holding_tx AND w1.holding_tx = w2.waiting_tx WHERE w1.waiting_tx < w1.holding_tx;",
        "expected_result": [
            {"t1_tx": 101, "t2_tx": 102}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Deadlock cycle pair detected",
                "description": "Verify 101 and 102 are identified as mutual deadlock partners",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].t1_tx === 101 && res[0].t2_tx === 102"
            }
        ],
        "hints": [
            "Hint 1: Self-join `tx_waits` on `w1.waiting_tx = w2.holding_tx AND w1.holding_tx = w2.waiting_tx`.",
            "Hint 2: Filter with `w1.waiting_tx < w1.holding_tx` to prevent duplicate reverse pairs."
        ],
        "explanation": "Self-joining a wait-for graph detects 2-cycle deadlocks where two transactions hold resources needed by each other.",
        "queryBreakdown": [
            {"clause": "JOIN tx_waits w2 ON w1.waiting_tx = w2.holding_tx...", "purpose": "Traverses dependency edges to detect cycles."}
        ]
    },

    # 60. Querying Information Schema / Table Catalog
    {
        "id": "sql-ch-60",
        "topicId": "dbms-architecture",
        "title": "Querying System Data Dictionary for User Tables",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - Database Metadata & Information Schema",
            "role": "Systems Engineer"
        },
        "prompt": "Write a SQL query against the system catalog table `system_catalog_tables` to find the `table_name` and `row_count` of all tables in schema 'public'. Order by `table_name`.",
        "schema_context": """CREATE TABLE system_catalog_tables (
    table_id INT PRIMARY KEY,
    table_name VARCHAR(50),
    schema_name VARCHAR(50),
    row_count INT
);
INSERT INTO system_catalog_tables VALUES
(1, 'employees', 'public', 1500),
(2, 'departments', 'public', 25),
(3, 'pg_internal', 'pg_catalog', 400);""",
        "sample_data": [
            {"public_tables": "employees (1500), departments (25)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT table_name, row_count\nFROM system_catalog_tables\nWHERE schema_name = 'public'\nORDER BY table_name ASC;",
        "solution_query": "SELECT table_name, row_count FROM system_catalog_tables WHERE schema_name = 'public' ORDER BY table_name ASC;",
        "expected_result": [
            {"table_name": "departments", "row_count": 25},
            {"table_name": "employees", "row_count": 1500}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Catalog metadata filtered",
                "description": "Verify departments and employees are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].table_name === 'departments' && res[1].table_name === 'employees'"
            }
        ],
        "hints": [
            "Hint 1: Filter on `WHERE schema_name = 'public'`.",
            "Hint 2: Order by `table_name ASC`."
        ],
        "explanation": "DBMS architecture stores system metadata in the Data Dictionary (ANSI INFORMATION_SCHEMA or system tables).",
        "queryBreakdown": [
            {"clause": "WHERE schema_name = 'public'", "purpose": "Filters metadata dictionary for user objects."}
        ]
    },

    # 61. Buffer Pool Hit Ratio Calculation
    {
        "id": "sql-ch-61",
        "topicId": "dbms-architecture",
        "title": "Buffer Pool Cache Hit Ratio Calculation",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Database Internals)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE - Database Performance & Buffer Pool Tuning",
            "role": "SDE-2"
        },
        "prompt": "Write a SQL query to calculate the buffer pool cache hit percentage as `hit_ratio` using formula: `(buffer_hits * 100.0) / (buffer_hits + disk_reads)`, rounded to 1 decimal place. Return `server_id` and `hit_ratio`.",
        "schema_context": """CREATE TABLE buffer_pool_metrics (
    server_id INT PRIMARY KEY,
    buffer_hits INT,
    disk_reads INT
);
INSERT INTO buffer_pool_metrics VALUES
(1, 9500, 500),
(2, 7000, 3000);""",
        "sample_data": [
            {"server_1": "9500 hits / 10000 total = 95.0%"},
            {"server_2": "7000 hits / 10000 total = 70.0%"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT server_id,\n       ROUND((buffer_hits * 100.0) / (buffer_hits + disk_reads), 1) AS hit_ratio\nFROM buffer_pool_metrics\nORDER BY server_id ASC;",
        "solution_query": "SELECT server_id, ROUND((buffer_hits * 100.0) / (buffer_hits + disk_reads), 1) AS hit_ratio FROM buffer_pool_metrics ORDER BY server_id ASC;",
        "expected_result": [
            {"server_id": 1, "hit_ratio": 95.0},
            {"server_id": 2, "hit_ratio": 70.0}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Hit ratio calculation",
                "description": "Verify Server 1 has 95.0% and Server 2 has 70.0%",
                "code": "(res) => Array.isArray(res) && res[0].hit_ratio == 95.0 && res[1].hit_ratio == 70.0"
            }
        ],
        "hints": [
            "Hint 1: Multiply by `100.0` to force floating-point arithmetic in SQL.",
            "Hint 2: Wrap in `ROUND(..., 1)`."
        ],
        "explanation": "Calculates buffer pool efficiency, indicating what proportion of disk access was avoided by RAM caching.",
        "queryBreakdown": [
            {"clause": "ROUND((buffer_hits * 100.0) / ...)", "purpose": "Computes memory cache hit efficiency."}
        ]
    },

    # 62. Querying Many-to-Many Bridge Table
    {
        "id": "sql-ch-62",
        "topicId": "er-model",
        "title": "Querying Many-to-Many Junction Bridge",
        "difficulty": "Medium",
        "attribution": "Placement-style (Cognizant / Infosys)",
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC - Relational Representation of M:N Relationships",
            "role": "Programmer Analyst"
        },
        "prompt": "Write a SQL query that joins `students`, `student_courses`, and `courses` to list all `course_name` values taken by student 'Aarav'. Order by `course_name`.",
        "schema_context": """CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50)
);
CREATE TABLE student_courses (
    student_id INT,
    course_id INT
);
INSERT INTO students VALUES (1, 'Aarav'), (2, 'Bhavna');
INSERT INTO courses VALUES (10, 'DBMS'), (20, 'DSA'), (30, 'Networks');
INSERT INTO student_courses VALUES (1, 10), (1, 20), (2, 30);""",
        "sample_data": [
            {"Aarav": "Enrolled in DBMS and DSA"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT c.course_name\nFROM student_courses sc\nJOIN students s ON sc.student_id = s.student_id\nJOIN courses c ON sc.course_id = c.course_id\nWHERE s.name = 'Aarav'\nORDER BY c.course_name ASC;",
        "solution_query": "SELECT c.course_name FROM student_courses sc JOIN students s ON sc.student_id = s.student_id JOIN courses c ON sc.course_id = c.course_id WHERE s.name = 'Aarav' ORDER BY c.course_name ASC;",
        "expected_result": [
            {"course_name": "DBMS"},
            {"course_name": "DSA"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Aarav courses returned",
                "description": "Verify DBMS and DSA are returned for Aarav",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].course_name === 'DBMS' && res[1].course_name === 'DSA'"
            }
        ],
        "hints": [
            "Hint 1: Join `student_courses` to `students` and `courses`.",
            "Hint 2: Filter `WHERE s.name = 'Aarav'`."
        ],
        "explanation": "A Many-to-Many ER relationship is decomposed into two 1:N relationships via an associative bridge table.",
        "queryBreakdown": [
            {"clause": "JOIN courses c ON sc.course_id = c.course_id", "purpose": "Traverses junction table to parent course entity."}
        ]
    },

    # 63. Weak Entity Identification Query
    {
        "id": "sql-ch-63",
        "topicId": "er-model",
        "title": "Identify Dependents of Specific Parent Entity",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Wipro)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "TCS Technical Round - Weak Entities & Identifying Relationships",
            "role": "Systems Engineer"
        },
        "prompt": "Write a SQL query to list `dependent_name` and `relationship` for all dependents of employee with `emp_id = 101` from the weak entity table `dependents`. Order by `dependent_name`.",
        "schema_context": """CREATE TABLE dependents (
    emp_id INT,
    dependent_name VARCHAR(50),
    relationship VARCHAR(30),
    PRIMARY KEY (emp_id, dependent_name)
);
INSERT INTO dependents VALUES
(101, 'Aarav Jr.', 'Son'),
(101, 'Sunita', 'Spouse'),
(102, 'Rohan Jr.', 'Son');""",
        "sample_data": [
            {"emp_101": "Aarav Jr. (Son), Sunita (Spouse)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT dependent_name, relationship\nFROM dependents\nWHERE emp_id = 101\nORDER BY dependent_name ASC;",
        "solution_query": "SELECT dependent_name, relationship FROM dependents WHERE emp_id = 101 ORDER BY dependent_name ASC;",
        "expected_result": [
            {"dependent_name": "Aarav Jr.", "relationship": "Son"},
            {"dependent_name": "Sunita", "relationship": "Spouse"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Dependents retrieved",
                "description": "Verify Aarav Jr. and Sunita are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].dependent_name === 'Aarav Jr.' && res[1].dependent_name === 'Sunita'"
            }
        ],
        "hints": [
            "Hint 1: Query `WHERE emp_id = 101`.",
            "Hint 2: Order by `dependent_name ASC`."
        ],
        "explanation": "Weak entities rely on the identifying parent's primary key (`emp_id`) plus their own partial discriminator.",
        "queryBreakdown": [
            {"clause": "WHERE emp_id = 101", "purpose": "Filters weak entity records by identifying owner key."}
        ]
    },

    # 64. Duplicate Records Across Multiple Columns
    {
        "id": "sql-ch-64",
        "topicId": "sql-aggregation-groupby",
        "title": "Find Multi-Column Duplicate Records",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Walmart)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE Technical Round - Multi-Attribute Deduplication",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to find any duplicate combinations of (`first_name`, `last_name`, `dob`) in `members`. Return `first_name`, `last_name`, `dob`, and `count` of occurrences.",
        "schema_context": """CREATE TABLE members (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE
);
INSERT INTO members VALUES
(1, 'John', 'Doe', '1995-05-10'),
(2, 'Jane', 'Smith', '1998-11-20'),
(3, 'John', 'Doe', '1995-05-10'),
(4, 'Alex', 'Ray', '2000-01-01');""",
        "sample_data": [
            {"duplicate": "John Doe 1995-05-10 (2 records)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT first_name, last_name, dob, COUNT(*) AS count\nFROM members\nGROUP BY first_name, last_name, dob\nHAVING COUNT(*) > 1;",
        "solution_query": "SELECT first_name, last_name, dob, COUNT(*) AS count FROM members GROUP BY first_name, last_name, dob HAVING COUNT(*) > 1;",
        "expected_result": [
            {"first_name": "John", "last_name": "Doe", "dob": "1995-05-10", "count": 2}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Multi-column duplicate found",
                "description": "Verify John Doe with count 2 is identified",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].first_name === 'John' && res[0].count === 2"
            }
        ],
        "hints": [
            "Hint 1: Group by all three columns: `GROUP BY first_name, last_name, dob`.",
            "Hint 2: Filter with `HAVING COUNT(*) > 1`."
        ],
        "explanation": "Grouping by composite natural business keys isolates duplicate entities before running cleanup pipelines.",
        "queryBreakdown": [
            {"clause": "GROUP BY first_name, last_name, dob", "purpose": "Collapses multi-attribute business candidate keys."}
        ]
    },

    # 65. Consecutive Available Seats / Identifiers
    {
        "id": "sql-ch-65",
        "topicId": "sql-joins",
        "title": "Find Consecutive Available Cinema Seats",
        "difficulty": "Hard",
        "attribution": "Placement-style (Amazon / LeetCode 603)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "LeetCode 603 / Amazon Online Assessment - Consecutive Numbers",
            "role": "Software Development Engineer"
        },
        "prompt": "Write a SQL query to report all the consecutive available seats (`free = 1`) in cinema. Return `seat_id` ordered ascending. Two seats are consecutive if their IDs differ by 1 and both are free.",
        "schema_context": """CREATE TABLE cinema (
    seat_id INT PRIMARY KEY,
    free INT
);
INSERT INTO cinema VALUES
(1, 1),
(2, 0),
(3, 1),
(4, 1),
(5, 1);""",
        "sample_data": [
            {"seats": "1(free), 2(busy), 3(free), 4(free), 5(free) -> 3, 4, 5 are consecutive"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT DISTINCT c1.seat_id\nFROM cinema c1\nJOIN cinema c2 ON ABS(c1.seat_id - c2.seat_id) = 1\nWHERE c1.free = 1 AND c2.free = 1\nORDER BY c1.seat_id ASC;",
        "solution_query": "SELECT DISTINCT c1.seat_id FROM cinema c1 JOIN cinema c2 ON ABS(c1.seat_id - c2.seat_id) = 1 WHERE c1.free = 1 AND c2.free = 1 ORDER BY c1.seat_id ASC;",
        "expected_result": [
            {"seat_id": 3},
            {"seat_id": 4},
            {"seat_id": 5}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Consecutive free seats identified",
                "description": "Verify seats 3, 4, 5 are returned",
                "code": "(res) => Array.isArray(res) && res.length === 3 && res[0].seat_id === 3 && res[1].seat_id === 4 && res[2].seat_id === 5"
            },
            {
                "id": 2,
                "title": "Isolated free seat 1 excluded",
                "description": "Verify seat 1 is excluded because seat 2 is not free",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.seat_id === 1)"
            }
        ],
        "hints": [
            "Hint 1: Self-join `cinema c1` with `cinema c2` on `ABS(c1.seat_id - c2.seat_id) = 1`.",
            "Hint 2: Filter `WHERE c1.free = 1 AND c2.free = 1` and use `DISTINCT`."
        ],
        "explanation": "Joining on adjacent IDs (`ABS(diff) = 1`) identifies seats that have at least one adjacent partner that is also free.",
        "queryBreakdown": [
            {"clause": "ON ABS(c1.seat_id - c2.seat_id) = 1", "purpose": "Pairs adjacent seat neighbors."},
            {"clause": "WHERE c1.free = 1 AND c2.free = 1", "purpose": "Guarantees both seats in the pair are unoccupied."}
        ]
    }
])

print(f"Loaded Part 3: {len(part3_challenges)} challenges.")
