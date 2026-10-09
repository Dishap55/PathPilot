# MCQs Part 2: Topics 4-6
# 4. sql-basics-ddl-dml (18 MCQs: 45 to 62)
# 5. sql-joins (20 MCQs: 63 to 82)
# 6. sql-aggregation-groupby (18 MCQs: 83 to 100)

part2_mcqs = [
    # -------------------------------------------------------------
    # 4. sql-basics-ddl-dml (18 MCQs: 45 to 62)
    # -------------------------------------------------------------
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
        "question": """Given table `users`:
| id | name  | points |
|----|-------|--------|
| 1  | Alice | 100    |
| 2  | Bob   | NULL   |
| 3  | Carol | 50     |

What is the output of:
SELECT COUNT(*), COUNT(points) FROM users;""",
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
        "question": """Given table `items`:
| id | status |
|----|--------|
| 1  | active |
| 2  | NULL   |
| 3  | paused |

What is the result of:
SELECT COUNT(*) FROM items WHERE status <> 'active';""",
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
        "question": """Given table `products`:
| id | name   | price |
|----|--------|-------|
| 1  | Apple  | 10    |
| 2  | Banana | 20    |
| 3  | Cherry | 30    |

What is the result of:
SELECT name FROM products WHERE price BETWEEN 10 AND 25;""",
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
        "question": """What is the value returned by this SQL expression?
SELECT 10 + NULL;""",
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
        "question": """Consider table `records` with 3 rows where all column values are NULL. What is the result of:
SELECT COUNT(1) FROM records;""",
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
        "question": """Given table `nums`:
| val |
|-----|
| 1   |
| 2   |
| 2   |
| 3   |
| NULL|

What is the output of:
SELECT COUNT(DISTINCT val) FROM nums;""",
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
        "question": """What is returned by this SQL query?
SELECT NULL = NULL;""",
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
        "question": """Given table `accounts`:
| id | balance |
|----|---------|
| 1  | 500     |
| 2  | 200     |

What is the result of running:
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
ROLLBACK;
SELECT balance FROM accounts WHERE id = 1;""",
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

    # -------------------------------------------------------------
    # 5. sql-joins (20 MCQs: 63 to 82)
    # -------------------------------------------------------------
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
        "question": """Given tables:
`table_a`: (id) -> [1, 2]
`table_b`: (id) -> [2, 3]

How many rows are returned by:
SELECT * FROM table_a a FULL OUTER JOIN table_b b ON a.id = b.id;""",
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
        "question": """Given table `nums`:
| id |
|----|
| 1  |
| 1  |

How many rows are returned by:
SELECT * FROM nums a JOIN nums b ON a.id = b.id;""",
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
        "question": """Given:
SELECT *
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.order_date > '2026-01-01';

What unexpected behavior occurs with customers who have NO orders?""",
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
        "question": """Given:
Table `X`: 3 rows (all NULL)
Table `Y`: 3 rows (all NULL)

How many rows are returned by:
SELECT * FROM X JOIN Y ON X.val = Y.val;""",
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
        "question": """Given table `dept`:
| id | name |
|----|------|
| 1  | Tech |
| 2  | HR   |

And table `emp`:
| id | dept_id |
|----|---------|
| 10 | 1       |

How many rows are returned by:
SELECT * FROM dept d RIGHT JOIN emp e ON d.id = e.dept_id;""",
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
        "question": """Given table `A`:
| id |
|----|
| 1  |
| 2  |

And table `B`:
| id |
|----|
| 3  |
| 4  |

How many rows are returned by:
SELECT * FROM A INNER JOIN B ON A.id = B.id;""",
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
        "question": """Given table `A`:
| id |
|----|
| 1  |
| 2  |

And table `B`:
| id |
|----|
| 1  |

What is the row count of:
SELECT * FROM A LEFT JOIN B ON A.id = B.id;""",
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

    # -------------------------------------------------------------
    # 6. sql-aggregation-groupby (18 MCQs: 83 to 100)
    # -------------------------------------------------------------
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
        "question": """Given table `sales`:
| dept | amount |
|------|--------|
| A    | 100    |
| A    | 200    |
| B    | 50     |
| B    | 50     |
| C    | 400    |

What is returned by:
SELECT dept, SUM(amount)
FROM sales
GROUP BY dept
HAVING SUM(amount) >= 300;""",
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
        "question": """Given table `scores`:
| score |
|-------|
| 10    |
| 20    |
| NULL  |

What is the output of:
SELECT AVG(score) FROM scores;""",
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
        "question": """Given table `users`:
| email         |
|---------------|
| john@work.com |
| jane@work.com |
| john@work.com |
| alex@work.com |

What query correctly finds all duplicate emails?""",
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
        "question": """Given table `orders`:
| customer_id | amount |
|-------------|--------|
| 101         | 50     |
| 101         | 70     |
| 102         | 200    |

What is the output of:
SELECT customer_id, MAX(amount)
FROM orders
GROUP BY customer_id
ORDER BY customer_id ASC;""",
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
        "question": """Given table `t`:
| val |
|-----|
| 10  |
| 10  |
| 20  |

What is the output of:
SELECT SUM(DISTINCT val) FROM t;""",
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
        "question": """What is the result of:
SELECT department, COUNT(*)
FROM employees
WHERE salary > 50000
GROUP BY department
HAVING COUNT(*) > 2;

If an employee earns 40,000, are they counted in `COUNT(*)` in the HAVING clause?""",
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
    }
]

print(f"Loaded Part 2 MCQs: {len(part2_mcqs)} questions.")
