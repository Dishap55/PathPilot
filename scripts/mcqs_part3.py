# MCQs Part 3: Topics 7-9
# 7. sql-subqueries-nested (18 MCQs: 101 to 118)
# 8. normalization (18 MCQs: 119 to 136)
# 9. transactions-acid (18 MCQs: 137 to 154)

part3_mcqs = [
    # -------------------------------------------------------------
    # 7. sql-subqueries-nested (18 MCQs: 101 to 118)
    # -------------------------------------------------------------
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
        "question": """Given table `departments`:
| id |
|----|
| 1  |
| 2  |

And subquery `SELECT dept_id FROM employees` returns values `(1, NULL)`.
What is returned by:
SELECT * FROM departments WHERE id NOT IN (SELECT dept_id FROM employees);""",
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
        "question": """Given table `emp`:
| id | name  | salary |
|----|-------|--------|
| 1  | Alice | 100    |
| 2  | Bob   | 200    |
| 3  | Carol | 300    |

What is returned by:
SELECT MAX(salary)
FROM emp
WHERE salary < (SELECT MAX(salary) FROM emp);""",
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
        "question": """Given table `T`:
| val |
|-----|
| 10  |
| 20  |
| 30  |

What is returned by:
SELECT val FROM T WHERE val > ALL (SELECT val FROM T WHERE val < 25);""",
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
        "question": """Given table `scores`:
| id | score |
|----|-------|
| 1  | 90    |
| 2  | 80    |
| 3  | 70    |

What is returned by:
SELECT COUNT(*) FROM scores WHERE score >= (SELECT AVG(score) FROM scores);""",
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
        "question": """What is the value returned by `SELECT 1 WHERE 1 NOT IN (SELECT NULL);`?""",
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
        "question": """Given table `nums`:
| x  |
|----|
| 5  |
| 10 |
| 15 |

What is returned by:
SELECT x FROM nums WHERE x = (SELECT MIN(x) FROM nums);""",
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
        "question": """Given table `items`:
| id | price |
|----|-------|
| 1  | 100   |
| 2  | 200   |
| 3  | 300   |

What is returned by:
SELECT id FROM items WHERE price > (SELECT MIN(price) FROM items) AND price < (SELECT MAX(price) FROM items);""",
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

    # -------------------------------------------------------------
    # 8. normalization (18 MCQs: 119 to 136)
    # -------------------------------------------------------------
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
        "question": """Given Relation `R(A, B, C, D)` with Primary Key `(A, B)`.
Functional Dependencies:
(A, B) -> C
B -> D

Which Normal Form does relation R violate?""",
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
        "question": """Given Relation `R(Emp_ID, Dept_ID, Dept_Name)` where `Emp_ID` is Primary Key.
FDs:
Emp_ID -> Dept_ID
Dept_ID -> Dept_Name

Which Normal Form is violated?""",
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
        "question": """Given Relation R(A, B, C) with FDs:
A -> B
B -> C
C -> A
What is the highest normal form of relation R?""",
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
            "Option D is correct. All determinants are superkeys, satisfying BCNF.",
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

    # -------------------------------------------------------------
    # 9. transactions-acid (18 MCQs: 137 to 154)
    # -------------------------------------------------------------
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
        "question": """Given schedule S of transactions T1 and T2:
T1: Read(A)
T2: Read(A)
T1: Write(A)
T2: Write(A)

Which concurrency anomaly is manifested in this schedule?""",
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
    }
]

print(f"Loaded Part 3 MCQs: {len(part3_mcqs)} questions.")
