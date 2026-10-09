# SQL Challenges Part 2: Aggregation, GROUP BY, and Subqueries (Challenges 4, 5, 6, 24-40)

part2_challenges = [
    # 4. Duplicate Emails Detection
    {
        "id": "sql-ch-4",
        "topicId": "sql-aggregation-groupby",
        "title": "Duplicate Emails Detection",
        "difficulty": "Easy",
        "attribution": "Reported Interview (Amazon / LeetCode 182)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "LeetCode 182 / Amazon Online Assessment",
            "role": "Software Engineer"
        },
        "prompt": "Write a SQL query to report all the duplicate emails in the Person table.",
        "schema_context": """CREATE TABLE person (
    id INT PRIMARY KEY,
    email VARCHAR(100)
);
INSERT INTO person VALUES (1, 'a@b.com'), (2, 'c@d.com'), (3, 'a@b.com');""",
        "sample_data": [
            {"id": 1, "email": "a@b.com"},
            {"id": 2, "email": "c@d.com"},
            {"id": 3, "email": "a@b.com"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT email\nFROM person\nGROUP BY ...;",
        "solution_query": "SELECT email FROM person GROUP BY email HAVING COUNT(email) > 1;",
        "expected_result": [
            {"email": "a@b.com"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Duplicate identified",
                "description": "Verify a@b.com is returned",
                "code": "(res) => Array.isArray(res) && res.some(r => r.email === 'a@b.com')"
            },
            {
                "id": 2,
                "title": "Unique email excluded",
                "description": "Verify c@d.com is not in the output",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.email === 'c@d.com')"
            }
        ],
        "hints": [
            "Hint 1: Use `GROUP BY email` to combine rows with the same address.",
            "Hint 2: Filter groups with `HAVING COUNT(email) > 1`."
        ],
        "explanation": "Grouping by email gathers all identical email occurrences. The HAVING clause applies aggregate filtering, keeping only those groups whose row count strictly exceeds 1.",
        "queryBreakdown": [
            {"clause": "SELECT email", "purpose": "Projects distinct email value."},
            {"clause": "FROM person", "purpose": "Source relation."},
            {"clause": "GROUP BY email", "purpose": "Collapses identical email addresses."},
            {"clause": "HAVING COUNT(email) > 1", "purpose": "Filters for groups with frequency > 1."}
        ]
    },

    # 5. Second Highest Salary
    {
        "id": "sql-ch-5",
        "topicId": "sql-subqueries-nested",
        "title": "Second Highest Salary",
        "difficulty": "Medium",
        "attribution": "Reported Interview (Amazon / LeetCode 176)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "LeetCode 176 / Amazon SDE Round",
            "role": "Software Development Engineer"
        },
        "prompt": "Write a SQL query to find the second highest distinct salary from the Employee table. Return the result as `SecondHighestSalary`. If there is no second highest salary, return NULL.",
        "schema_context": """CREATE TABLE employee (
    id INT PRIMARY KEY,
    salary INT
);
INSERT INTO employee VALUES (1, 100), (2, 200), (3, 300);""",
        "sample_data": [
            {"id": 1, "salary": 100},
            {"id": 2, "salary": 200},
            {"id": 3, "salary": 300}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT MAX(salary) AS SecondHighestSalary\nFROM employee\nWHERE ...;",
        "solution_query": "SELECT MAX(salary) AS SecondHighestSalary FROM employee WHERE salary < (SELECT MAX(salary) FROM employee);",
        "expected_result": [
            {"SecondHighestSalary": 200}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Correct value check",
                "description": "Verify SecondHighestSalary is 200",
                "code": "(res) => Array.isArray(res) && res.length === 1 && (res[0].SecondHighestSalary == 200 || res[0].salary == 200)"
            },
            {
                "id": 2,
                "title": "Single-row result",
                "description": "Verify exactly one row is returned",
                "code": "(res) => Array.isArray(res) && res.length === 1"
            }
        ],
        "hints": [
            "Hint 1: Find the absolute maximum salary first using a subquery: `(SELECT MAX(salary) FROM employee)`.",
            "Hint 2: Select the `MAX(salary)` of rows strictly less than that maximum."
        ],
        "explanation": "The subquery `(SELECT MAX(salary) FROM employee)` determines the absolute top salary. The outer query then takes the MAX of all remaining rows strictly below that value.",
        "queryBreakdown": [
            {"clause": "SELECT MAX(salary) AS SecondHighestSalary", "purpose": "Returns the maximum of the filtered subset."},
            {"clause": "FROM employee", "purpose": "Source table."},
            {"clause": "WHERE salary < (SELECT MAX(salary) ...)", "purpose": "Excludes the overall top salary."}
        ]
    },

    # 6. Classes More Than 5 Students
    {
        "id": "sql-ch-6",
        "topicId": "sql-aggregation-groupby",
        "title": "Classes More Than 5 Students",
        "difficulty": "Easy",
        "attribution": "Reported Interview (Amazon / LeetCode 596)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "LeetCode 596 / Amazon Online Assessment",
            "role": "SDE"
        },
        "prompt": "Write a SQL query to report all the classes that have at least five students.",
        "schema_context": """CREATE TABLE courses (
    student VARCHAR(50),
    class VARCHAR(50)
);
INSERT INTO courses VALUES 
('A', 'Math'), ('B', 'English'), ('C', 'Math'), ('D', 'Biology'),
('E', 'Math'), ('F', 'Math'), ('G', 'Math');""",
        "sample_data": [
            {"student": "A", "class": "Math"},
            {"student": "B", "class": "English"},
            {"student": "C", "class": "Math"},
            {"student": "D", "class": "Biology"},
            {"student": "E", "class": "Math"},
            {"student": "F", "class": "Math"},
            {"student": "G", "class": "Math"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT class\nFROM courses\nGROUP BY ...;",
        "solution_query": "SELECT class FROM courses GROUP BY class HAVING COUNT(student) >= 5;",
        "expected_result": [
            {"class": "Math"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Math qualified",
                "description": "Verify Math is returned with >= 5 students",
                "code": "(res) => Array.isArray(res) && res.some(r => r.class === 'Math')"
            },
            {
                "id": 2,
                "title": "English excluded",
                "description": "Verify classes with < 5 students are not in output",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.class === 'English' || r.class === 'Biology')"
            }
        ],
        "hints": [
            "Hint 1: Group the table by the `class` column.",
            "Hint 2: Use `HAVING COUNT(student) >= 5` to filter for classes meeting the enrollment threshold."
        ],
        "explanation": "Grouping by class aggregates enrollment per course. The HAVING clause checks the group count against the threshold of 5.",
        "queryBreakdown": [
            {"clause": "SELECT class", "purpose": "Returns the course title."},
            {"clause": "FROM courses", "purpose": "Target table."},
            {"clause": "GROUP BY class", "purpose": "Aggregates students per class."},
            {"clause": "HAVING COUNT(student) >= 5", "purpose": "Threshold filter."}
        ]
    },

    # 24. Total and Average Salary by Department
    {
        "id": "sql-ch-24",
        "topicId": "sql-aggregation-groupby",
        "title": "Total and Average Salary by Department",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital Technical Round - Aggregate Metrics",
            "role": "Digital Developer"
        },
        "prompt": "Write a SQL query to calculate the `department`, employee count as `emp_count`, total salary expenditure as `total_salary`, and average salary as `avg_salary` (rounded to whole number) for each department. Order by `total_salary` descending.",
        "schema_context": """CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);
INSERT INTO employees VALUES
(1, 'Aarav', 'Tech', 90000),
(2, 'Binod', 'Sales', 60000),
(3, 'Chaya', 'Tech', 80000),
(4, 'Dev', 'Sales', 70000),
(5, 'Esha', 'HR', 55000);""",
        "sample_data": [
            {"emp_id": 1, "name": "Aarav", "department": "Tech", "salary": 90000},
            {"emp_id": 2, "name": "Binod", "department": "Sales", "salary": 60000},
            {"emp_id": 3, "name": "Chaya", "department": "Tech", "salary": 80000},
            {"emp_id": 4, "name": "Dev", "department": "Sales", "salary": 70000},
            {"emp_id": 5, "name": "Esha", "department": "HR", "salary": 55000}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT department, COUNT(*) AS emp_count, SUM(salary) AS total_salary, ROUND(AVG(salary)) AS avg_salary\nFROM employees\nGROUP BY ...\nORDER BY total_salary DESC;",
        "solution_query": "SELECT department, COUNT(*) AS emp_count, SUM(salary) AS total_salary, ROUND(AVG(salary)) AS avg_salary FROM employees GROUP BY department ORDER BY total_salary DESC;",
        "expected_result": [
            {"department": "Tech", "emp_count": 2, "total_salary": 170000, "avg_salary": 85000},
            {"department": "Sales", "emp_count": 2, "total_salary": 130000, "avg_salary": 65000},
            {"department": "HR", "emp_count": 1, "total_salary": 55000, "avg_salary": 55000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "All departments present",
                "description": "Verify Tech, Sales, and HR are calculated",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "Sorted by total_salary descending",
                "description": "Tech (170k) comes before Sales (130k) and HR (55k)",
                "code": "(res) => Array.isArray(res) && res[0].department === 'Tech' && res[1].department === 'Sales'"
            }
        ],
        "hints": [
            "Hint 1: Use `GROUP BY department`.",
            "Hint 2: Aggregate with `COUNT(*)`, `SUM(salary)`, and `ROUND(AVG(salary))`."
        ],
        "explanation": "GROUP BY aggregates individual worker rows into department totals, computing simultaneous summary functions.",
        "queryBreakdown": [
            {"clause": "GROUP BY department", "purpose": "Creates department groups."},
            {"clause": "SUM(salary), AVG(salary)", "purpose": "Calculates volume and average compensation."}
        ]
    },

    # 25. Highest and Lowest Salary per Job Role
    {
        "id": "sql-ch-25",
        "topicId": "sql-aggregation-groupby",
        "title": "Salary Extremes (MAX & MIN) per Job Title",
        "difficulty": "Medium",
        "attribution": "Placement-style (Cognizant / Accenture)",
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Cognizant Assessment - Aggregate Extremes",
            "role": "Programmer Analyst"
        },
        "prompt": "Write a SQL query to report `job_title`, highest salary as `max_salary`, lowest salary as `min_salary`, and salary spread as `salary_spread` (max - min) for each job title. Order by `salary_spread` descending.",
        "schema_context": """CREATE TABLE job_positions (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    job_title VARCHAR(50),
    salary INT
);
INSERT INTO job_positions VALUES
(1, 'Amit', 'Developer', 95000),
(2, 'Bina', 'Developer', 65000),
(3, 'Chetan', 'QA Engineer', 55000),
(4, 'Deepak', 'QA Engineer', 50000),
(5, 'Farhan', 'Product Manager', 120000);""",
        "sample_data": [
            {"job_title": "Developer", "salaries": "95000, 65000"},
            {"job_title": "QA Engineer", "salaries": "55000, 50000"},
            {"job_title": "Product Manager", "salaries": "120000"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT job_title, MAX(salary) AS max_salary, MIN(salary) AS min_salary, (MAX(salary) - MIN(salary)) AS salary_spread\nFROM job_positions\nGROUP BY ...;",
        "solution_query": "SELECT job_title, MAX(salary) AS max_salary, MIN(salary) AS min_salary, (MAX(salary) - MIN(salary)) AS salary_spread FROM job_positions GROUP BY job_title ORDER BY salary_spread DESC;",
        "expected_result": [
            {"job_title": "Developer", "max_salary": 95000, "min_salary": 65000, "salary_spread": 30000},
            {"job_title": "QA Engineer", "max_salary": 55000, "min_salary": 50000, "salary_spread": 5000},
            {"job_title": "Product Manager", "max_salary": 120000, "min_salary": 120000, "salary_spread": 0}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Spread calculation",
                "description": "Verify Developer spread is 30,000 (95k - 65k)",
                "code": "(res) => Array.isArray(res) && res.some(r => r.job_title === 'Developer' && r.salary_spread === 30000)"
            },
            {
                "id": 2,
                "title": "Order check",
                "description": "Verify Developer appears first due to highest spread",
                "code": "(res) => Array.isArray(res) && res[0].job_title === 'Developer'"
            }
        ],
        "hints": [
            "Hint 1: Use `MAX(salary)` and `MIN(salary)` grouped by `job_title`.",
            "Hint 2: Compute spread via `(MAX(salary) - MIN(salary))` in the SELECT clause."
        ],
        "explanation": "Calculates both extremes within each job position group and computes the arithmetic difference.",
        "queryBreakdown": [
            {"clause": "MAX(salary), MIN(salary)", "purpose": "Determines boundary compensation."},
            {"clause": "ORDER BY salary_spread DESC", "purpose": "Ranks job roles by compensation variance."}
        ]
    },

    # 26. Departments With Average Salary Above 75000
    {
        "id": "sql-ch-26",
        "topicId": "sql-aggregation-groupby",
        "title": "Departments With Average Salary Above Threshold",
        "difficulty": "Medium",
        "attribution": "Placement-style (Infosys / Wipro)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Round - HAVING Clause Filtering",
            "role": "Systems Engineer"
        },
        "prompt": "Write a SQL query to find `department` and average salary as `avg_salary` for all departments having an average salary strictly greater than 75,000. Order by `avg_salary` descending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary NUMERIC(10,2)
);
INSERT INTO staff VALUES
(1, 'A', 'Finance', 90000),
(2, 'B', 'Finance', 85000),
(3, 'C', 'Marketing', 60000),
(4, 'D', 'Marketing', 70000),
(5, 'E', 'Engineering', 95000);""",
        "sample_data": [
            {"department": "Finance", "salaries": "90000, 85000 (Avg: 87500)"},
            {"department": "Marketing", "salaries": "60000, 70000 (Avg: 65000)"},
            {"department": "Engineering", "salaries": "95000 (Avg: 95000)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT department, AVG(salary) AS avg_salary\nFROM staff\nGROUP BY department\nHAVING ...;",
        "solution_query": "SELECT department, AVG(salary) AS avg_salary FROM staff GROUP BY department HAVING AVG(salary) > 75000 ORDER BY avg_salary DESC;",
        "expected_result": [
            {"department": "Engineering", "avg_salary": 95000.0},
            {"department": "Finance", "avg_salary": 87500.0}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Qualified departments check",
                "description": "Verify Engineering and Finance are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res.some(r => r.department === 'Engineering') && res.some(r => r.department === 'Finance')"
            },
            {
                "id": 2,
                "title": "Marketing excluded",
                "description": "Verify Marketing (avg 65k) is excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.department === 'Marketing')"
            }
        ],
        "hints": [
            "Hint 1: You must use `HAVING AVG(salary) > 75000` because `WHERE` cannot evaluate aggregate functions.",
            "Hint 2: Sort descending by `avg_salary DESC`."
        ],
        "explanation": "WHERE filters rows before grouping; HAVING filters groups after aggregation. Since the predicate requires `AVG(salary)`, it must be placed in HAVING.",
        "queryBreakdown": [
            {"clause": "HAVING AVG(salary) > 75000", "purpose": "Filters grouped results by aggregate condition."}
        ]
    },

    # 27. Customer Order Counts and Lifetime Spend
    {
        "id": "sql-ch-27",
        "topicId": "sql-aggregation-groupby",
        "title": "High-Volume Customers Lifetime Spend",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Flipkart)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon Customer Analytics - Order Volume and Total GMV",
            "role": "Data Analyst / SDE"
        },
        "prompt": "Write a SQL query to report `customer_id`, total orders as `order_count`, and total spend as `total_spent` for all customers who have placed at least 2 orders. Order by `total_spent` descending.",
        "schema_context": """CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    amount NUMERIC(10,2)
);
INSERT INTO orders VALUES
(1, 101, 250.00),
(2, 102, 1200.00),
(3, 101, 450.00),
(4, 103, 300.00),
(5, 101, 100.00),
(6, 103, 700.00);""",
        "sample_data": [
            {"customer_id": 101, "orders": "3 orders, $800 total"},
            {"customer_id": 102, "orders": "1 order, $1200 total"},
            {"customer_id": 103, "orders": "2 orders, $1000 total"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT customer_id, COUNT(*) AS order_count, SUM(amount) AS total_spent\nFROM orders\nGROUP BY ...\nHAVING ...;",
        "solution_query": "SELECT customer_id, COUNT(*) AS order_count, SUM(amount) AS total_spent FROM orders GROUP BY customer_id HAVING COUNT(*) >= 2 ORDER BY total_spent DESC;",
        "expected_result": [
            {"customer_id": 103, "order_count": 2, "total_spent": 1000.00},
            {"customer_id": 101, "order_count": 3, "total_spent": 800.00}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Customers with >= 2 orders",
                "description": "Verify customer 103 (2 orders) and 101 (3 orders) are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res.some(r => r.customer_id === 103) && res.some(r => r.customer_id === 101)"
            },
            {
                "id": 2,
                "title": "Single-order customer excluded",
                "description": "Verify customer 102 (1 order) is excluded despite high amount",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.customer_id === 102)"
            }
        ],
        "hints": [
            "Hint 1: Group by `customer_id`.",
            "Hint 2: Filter groups with `HAVING COUNT(*) >= 2`."
        ],
        "explanation": "HAVING COUNT(*) >= 2 isolates frequent buyers and computes their lifetime spend using SUM.",
        "queryBreakdown": [
            {"clause": "GROUP BY customer_id", "purpose": "Collapses transactions per buyer."},
            {"clause": "HAVING COUNT(*) >= 2", "purpose": "Restricts to multi-order buyers."}
        ]
    },

    # 28. Multi-Column Group By: Department and Gender
    {
        "id": "sql-ch-28",
        "topicId": "sql-aggregation-groupby",
        "title": "Department and Gender Demographic Breakdown",
        "difficulty": "Medium",
        "attribution": "Placement-style (Deloitte / PwC)",
        "companyMetadata": {
            "company": "Deloitte",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Deloitte USI Assessment - Multi-Column GROUP BY Aggregates",
            "role": "Technology Analyst"
        },
        "prompt": "Write a SQL query to report `department`, `gender`, and head count as `head_count` grouped by both department and gender. Order by `department` ascending, then `gender` ascending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    gender CHAR(1)
);
INSERT INTO staff VALUES
(1, 'Alice', 'IT', 'F'),
(2, 'Bob', 'IT', 'M'),
(3, 'Charlie', 'IT', 'M'),
(4, 'Diana', 'HR', 'F'),
(5, 'Evelyn', 'HR', 'F');""",
        "sample_data": [
            {"dept": "IT", "F": 1, "M": 2},
            {"dept": "HR", "F": 2, "M": 0}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT department, gender, COUNT(*) AS head_count\nFROM staff\nGROUP BY department, gender\nORDER BY ...;",
        "solution_query": "SELECT department, gender, COUNT(*) AS head_count FROM staff GROUP BY department, gender ORDER BY department ASC, gender ASC;",
        "expected_result": [
            {"department": "HR", "gender": "F", "head_count": 2},
            {"department": "IT", "gender": "F", "head_count": 1},
            {"department": "IT", "gender": "M", "head_count": 2}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Group count check",
                "description": "Verify 3 distinct sub-groups are formed",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "IT Male count",
                "description": "Verify IT Male head_count is 2",
                "code": "(res) => Array.isArray(res) && res.some(r => r.department === 'IT' && r.gender === 'M' && r.head_count === 2)"
            }
        ],
        "hints": [
            "Hint 1: Put both columns in GROUP BY: `GROUP BY department, gender`.",
            "Hint 2: Order by `department ASC, gender ASC`."
        ],
        "explanation": "Multi-column GROUP BY partitions rows into composite buckets formed by each unique (department, gender) pair.",
        "queryBreakdown": [
            {"clause": "GROUP BY department, gender", "purpose": "Groups on multi-column Cartesian combinations."}
        ]
    },

    # 29. Orders Placed per Year
    {
        "id": "sql-ch-29",
        "topicId": "sql-aggregation-groupby",
        "title": "Annual Order Volumes Reporting",
        "difficulty": "Medium",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "TCS Technical Round - Date Parsing & Aggregation",
            "role": "Systems Engineer"
        },
        "prompt": "Write a SQL query using `SUBSTR` to extract the 4-digit order year as `order_year` and calculate `orders_count` for each calendar year from `orders`. Order by `order_year` ascending.",
        "schema_context": """CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date VARCHAR(10),
    amount NUMERIC
);
INSERT INTO orders VALUES
(1, '2024-05-12', 150),
(2, '2024-09-20', 300),
(3, '2025-01-15', 500),
(4, '2025-07-22', 200),
(5, '2026-02-10', 450);""",
        "sample_data": [
            {"year": "2024", "count": 2},
            {"year": "2025", "count": 2},
            {"year": "2026", "count": 1}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT SUBSTR(order_date, 1, 4) AS order_year, COUNT(*) AS orders_count\nFROM orders\nGROUP BY ...\nORDER BY order_year ASC;",
        "solution_query": "SELECT SUBSTR(order_date, 1, 4) AS order_year, COUNT(*) AS orders_count FROM orders GROUP BY SUBSTR(order_date, 1, 4) ORDER BY order_year ASC;",
        "expected_result": [
            {"order_year": "2024", "orders_count": 2},
            {"order_year": "2025", "orders_count": 2},
            {"order_year": "2026", "orders_count": 1}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Year extraction and grouping",
                "description": "Verify 3 distinct years (2024, 2025, 2026) are calculated",
                "code": "(res) => Array.isArray(res) && res.length === 3 && res[0].order_year === '2024' && res[2].order_year === '2026'"
            }
        ],
        "hints": [
            "Hint 1: Use `SUBSTR(order_date, 1, 4)` to slice the year from 'YYYY-MM-DD'.",
            "Hint 2: Group by the expression `SUBSTR(order_date, 1, 4)`."
        ],
        "explanation": "String manipulation in GROUP BY enables date bucket aggregation across all ANSI SQL / SQLite engines.",
        "queryBreakdown": [
            {"clause": "SUBSTR(order_date, 1, 4)", "purpose": "Extracts 4-digit year component."}
        ]
    },

    # 30. Products with Multiple Price Variations
    {
        "id": "sql-ch-30",
        "topicId": "sql-aggregation-groupby",
        "title": "Products with Multiple Price Variations",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Flipkart)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon Pricing Engine - Historical Price Volatility Analysis",
            "role": "Data Engineer"
        },
        "prompt": "Write a SQL query to report `product_id` and distinct price count as `price_variations` for all items in `price_history` that have had more than 1 distinct price recorded. Order by `price_variations` descending.",
        "schema_context": """CREATE TABLE price_history (
    record_id INT PRIMARY KEY,
    product_id INT,
    price NUMERIC(10,2)
);
INSERT INTO price_history VALUES
(1, 101, 199.99),
(2, 101, 179.99),
(3, 101, 199.99),
(4, 102, 50.00),
(5, 102, 50.00),
(6, 103, 300.00),
(7, 103, 320.00),
(8, 103, 290.00);""",
        "sample_data": [
            {"product_id": 101, "prices": "199.99, 179.99 (2 distinct)"},
            {"product_id": 102, "prices": "50.00 (1 distinct)"},
            {"product_id": 103, "prices": "300, 320, 290 (3 distinct)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT product_id, COUNT(DISTINCT price) AS price_variations\nFROM price_history\nGROUP BY ...\nHAVING ...;",
        "solution_query": "SELECT product_id, COUNT(DISTINCT price) AS price_variations FROM price_history GROUP BY product_id HAVING COUNT(DISTINCT price) > 1 ORDER BY price_variations DESC;",
        "expected_result": [
            {"product_id": 103, "price_variations": 3},
            {"product_id": 101, "price_variations": 2}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Variations check",
                "description": "Verify product 103 (3 variations) and 101 (2 variations) qualify",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].product_id === 103 && res[1].product_id === 101"
            },
            {
                "id": 2,
                "title": "Single-price product excluded",
                "description": "Verify product 102 is excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.product_id === 102)"
            }
        ],
        "hints": [
            "Hint 1: Use `COUNT(DISTINCT price)` to ignore duplicate identical prices.",
            "Hint 2: Filter in HAVING: `HAVING COUNT(DISTINCT price) > 1`."
        ],
        "explanation": "Combining COUNT with DISTINCT inside an aggregate evaluates unique value cardinalities within each group.",
        "queryBreakdown": [
            {"clause": "COUNT(DISTINCT price)", "purpose": "Counts unique price levels per product."}
        ]
    },

    # 31. Department with Maximum Average Salary
    {
        "id": "sql-ch-31",
        "topicId": "sql-aggregation-groupby",
        "title": "Department with Highest Average Salary",
        "difficulty": "Hard",
        "attribution": "Placement-style (Amazon / LeetCode)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE Interview - Aggregate Ranking & Limits",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to find the single `department` with the highest average salary and its average salary as `max_avg_salary`. Return only the top record.",
        "schema_context": """CREATE TABLE staff_salaries (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);
INSERT INTO staff_salaries VALUES
(1, 'Alice', 'Analytics', 95000),
(2, 'Bob', 'Analytics', 105000),
(3, 'Charlie', 'Engineering', 90000),
(4, 'David', 'Engineering', 85000),
(5, 'Eve', 'HR', 60000);""",
        "sample_data": [
            {"department": "Analytics", "avg": 100000},
            {"department": "Engineering", "avg": 87500},
            {"department": "HR", "avg": 60000}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT department, AVG(salary) AS max_avg_salary\nFROM staff_salaries\nGROUP BY department\nORDER BY max_avg_salary DESC\nLIMIT 1;",
        "solution_query": "SELECT department, AVG(salary) AS max_avg_salary FROM staff_salaries GROUP BY department ORDER BY max_avg_salary DESC LIMIT 1;",
        "expected_result": [
            {"department": "Analytics", "max_avg_salary": 100000.0}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Top department check",
                "description": "Verify Analytics with 100,000 average is returned",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].department === 'Analytics' && res[0].max_avg_salary == 100000"
            }
        ],
        "hints": [
            "Hint 1: Group by `department` and compute `AVG(salary)`.",
            "Hint 2: Sort descending and limit to 1: `ORDER BY max_avg_salary DESC LIMIT 1`."
        ],
        "explanation": "Orders aggregate group calculations descending and returns the absolute maximum group.",
        "queryBreakdown": [
            {"clause": "ORDER BY max_avg_salary DESC LIMIT 1", "purpose": "Extracts the top group."}
        ]
    },

    # 32. Third Highest Salary
    {
        "id": "sql-ch-32",
        "topicId": "sql-subqueries-nested",
        "title": "Third Highest Salary Using Offset & Subquery",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Microsoft)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon Technical Interview - Nth Highest Salary",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to find the 3rd highest distinct salary from `employees`. Return the column as `ThirdHighestSalary`.",
        "schema_context": """CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT
);
INSERT INTO employees VALUES
(1, 'A', 90000),
(2, 'B', 85000),
(3, 'C', 90000),
(4, 'D', 75000),
(5, 'E', 70000);""",
        "sample_data": [
            {"salaries": "90000 (1st), 85000 (2nd), 75000 (3rd), 70000 (4th)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT DISTINCT salary AS ThirdHighestSalary\nFROM employees\nORDER BY ... LIMIT 1 OFFSET ...;",
        "solution_query": "SELECT DISTINCT salary AS ThirdHighestSalary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;",
        "expected_result": [
            {"ThirdHighestSalary": 75000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Correct third salary",
                "description": "Verify ThirdHighestSalary is 75000",
                "code": "(res) => Array.isArray(res) && res.length === 1 && (res[0].ThirdHighestSalary == 75000 || res[0].salary == 75000)"
            }
        ],
        "hints": [
            "Hint 1: Use `SELECT DISTINCT salary` to ignore identical salary ties.",
            "Hint 2: Sort descending and use `LIMIT 1 OFFSET 2` (skipping the top 2)."
        ],
        "explanation": "LIMIT 1 OFFSET 2 skips the top 2 distinct salaries and retrieves the single third distinct value.",
        "queryBreakdown": [
            {"clause": "SELECT DISTINCT salary", "purpose": "Eliminates duplicate pay bands."},
            {"clause": "LIMIT 1 OFFSET 2", "purpose": "Paginates to the 3rd position."}
        ]
    },

    # 33. Employees Earning More Than Company Average
    {
        "id": "sql-ch-33",
        "topicId": "sql-subqueries-nested",
        "title": "Employees Earning Above Company Average",
        "difficulty": "Medium",
        "attribution": "Placement-style (Cognizant / Infosys)",
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant Technical Interview - Scalar Subquery Predicates",
            "role": "Programmer Analyst"
        },
        "prompt": "Write a SQL query to select `name` and `salary` of all employees who earn more than the overall company average salary. Order by `salary` descending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT
);
INSERT INTO staff VALUES
(1, 'Rohan', 50000),
(2, 'Sita', 90000),
(3, 'Tarun', 70000),
(4, 'Usha', 110000);""",
        "sample_data": [
            {"company_avg": 80000, "qualified": "Sita (90k), Usha (110k)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name, salary\nFROM staff\nWHERE salary > (SELECT AVG(salary) FROM staff)\nORDER BY salary DESC;",
        "solution_query": "SELECT name, salary FROM staff WHERE salary > (SELECT AVG(salary) FROM staff) ORDER BY salary DESC;",
        "expected_result": [
            {"name": "Usha", "salary": 110000},
            {"name": "Sita", "salary": 90000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Above average employees",
                "description": "Verify Usha and Sita are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].name === 'Usha' && res[1].name === 'Sita'"
            },
            {
                "id": 2,
                "title": "Below average excluded",
                "description": "Verify Rohan (50k) and Tarun (70k) are excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.name === 'Rohan' || r.name === 'Tarun')"
            }
        ],
        "hints": [
            "Hint 1: Write a scalar subquery `(SELECT AVG(salary) FROM staff)`.",
            "Hint 2: Compare `WHERE salary > (SELECT AVG(salary) FROM staff)`."
        ],
        "explanation": "A scalar subquery evaluates to a single numeric value, allowing row-by-row salary comparison in the outer query.",
        "queryBreakdown": [
            {"clause": "WHERE salary > (SELECT AVG(salary)...)", "purpose": "Scalar comparison against aggregate constant."}
        ]
    },

    # 34. Employees Earning More Than Department Average
    {
        "id": "sql-ch-34",
        "topicId": "sql-subqueries-nested",
        "title": "Employees Earning More Than Department Average",
        "difficulty": "Hard",
        "attribution": "Placement-style (Amazon / Microsoft)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE Technical Interview - Correlated Subqueries",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query using a correlated subquery to find `name`, `department`, and `salary` of employees whose salary is strictly higher than their department average. Order by `department`, then `salary` descending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);
INSERT INTO staff VALUES
(1, 'Aditi', 'IT', 95000),
(2, 'Bhavin', 'IT', 65000),
(3, 'Chetna', 'Sales', 75000),
(4, 'Deepak', 'Sales', 55000);""",
        "sample_data": [
            {"IT": "Aditi (95k), Bhavin (65k) -> Avg 80k -> Aditi qualifies"},
            {"Sales": "Chetna (75k), Deepak (55k) -> Avg 65k -> Chetna qualifies"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT e1.name, e1.department, e1.salary\nFROM staff e1\nWHERE e1.salary > (SELECT AVG(e2.salary) FROM staff e2 WHERE e2.department = e1.department)\nORDER BY e1.department ASC, e1.salary DESC;",
        "solution_query": "SELECT e1.name, e1.department, e1.salary FROM staff e1 WHERE e1.salary > (SELECT AVG(e2.salary) FROM staff e2 WHERE e2.department = e1.department) ORDER BY e1.department ASC, e1.salary DESC;",
        "expected_result": [
            {"name": "Aditi", "department": "IT", "salary": 95000},
            {"name": "Chetna", "department": "Sales", "salary": 75000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Correlated department check",
                "description": "Verify Aditi (IT) and Chetna (Sales) are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res.some(r => r.name === 'Aditi') && res.some(r => r.name === 'Chetna')"
            },
            {
                "id": 2,
                "title": "Below department average excluded",
                "description": "Verify Bhavin and Deepak are excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.name === 'Bhavin' || r.name === 'Deepak')"
            }
        ],
        "hints": [
            "Hint 1: In the inner query, correlate with `WHERE e2.department = e1.department`.",
            "Hint 2: Compare `e1.salary > (SELECT AVG(e2.salary) ...)`."
        ],
        "explanation": "A correlated subquery references attributes of the outer row (`e1.department`), dynamically recalculating the department average for every evaluated row.",
        "queryBreakdown": [
            {"clause": "WHERE e2.department = e1.department", "purpose": "Binds inner query execution to outer employee's department."}
        ]
    },

    # 35. Customers Who Placed Orders using IN
    {
        "id": "sql-ch-35",
        "topicId": "sql-subqueries-nested",
        "title": "Active Purchasing Customers via Subquery IN",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Capgemini)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "TCS Placement Prep - Subquery IN Operators",
            "role": "Systems Engineer"
        },
        "prompt": "Write a SQL query to select `customer_id` and `name` from `customers` who have placed at least one order in the `orders` table using an `IN (SELECT ...)` subquery. Order by `customer_id`.",
        "schema_context": """CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT
);
INSERT INTO customers VALUES (1, 'Kiran'), (2, 'Lata'), (3, 'Mohan');
INSERT INTO orders VALUES (101, 1), (102, 3), (103, 1);""",
        "sample_data": [
            {"customers": "1: Kiran, 2: Lata, 3: Mohan"},
            {"orders": "Placed by 1 and 3"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT customer_id, name\nFROM customers\nWHERE customer_id IN (SELECT ...)\nORDER BY customer_id ASC;",
        "solution_query": "SELECT customer_id, name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders) ORDER BY customer_id ASC;",
        "expected_result": [
            {"customer_id": 1, "name": "Kiran"},
            {"customer_id": 3, "name": "Mohan"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Active buyers returned",
                "description": "Verify Kiran and Mohan are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].customer_id === 1 && res[1].customer_id === 3"
            },
            {
                "id": 2,
                "title": "Inactive buyer excluded",
                "description": "Verify Lata (no orders) is excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.name === 'Lata')"
            }
        ],
        "hints": [
            "Hint 1: The inner query is `(SELECT customer_id FROM orders)`.",
            "Hint 2: Filter with `WHERE customer_id IN (...)`."
        ],
        "explanation": "The subquery returns the list of all purchasing customer IDs, and the outer IN predicate tests membership against this result set.",
        "queryBreakdown": [
            {"clause": "WHERE customer_id IN (SELECT ...)", "purpose": "Tests set membership against child foreign keys."}
        ]
    },

    # 36. Customers With No Orders Using NOT EXISTS
    {
        "id": "sql-ch-36",
        "topicId": "sql-subqueries-nested",
        "title": "Customers With No Orders via NOT EXISTS",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Infosys)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Amazon SDE Technical Round - NOT EXISTS vs NOT IN with NULLs",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query using `NOT EXISTS` to report `customer_id` and `name` of all customers who have never placed an order. Order by `customer_id`.",
        "schema_context": """CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT
);
INSERT INTO customers VALUES (1, 'Anil'), (2, 'Bablu'), (3, 'Chintan');
INSERT INTO orders VALUES (10, 1), (20, 2);""",
        "sample_data": [
            {"customers": "1: Anil, 2: Bablu, 3: Chintan"},
            {"orders": "10: Anil, 20: Bablu"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT c.customer_id, c.name\nFROM customers c\nWHERE NOT EXISTS (\n    SELECT 1 FROM orders o WHERE ...\n)\nORDER BY c.customer_id ASC;",
        "solution_query": "SELECT c.customer_id, c.name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id) ORDER BY c.customer_id ASC;",
        "expected_result": [
            {"customer_id": 3, "name": "Chintan"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Non-buyer isolated",
                "description": "Verify Chintan is returned",
                "code": "(res) => Array.isArray(res) && res.length === 1 && res[0].name === 'Chintan'"
            }
        ],
        "hints": [
            "Hint 1: Use `WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id)`.",
            "Hint 2: NOT EXISTS halts evaluation as soon as a single matching row is encountered."
        ],
        "explanation": "NOT EXISTS is null-safe and short-circuits execution as soon as a matching record is discovered, avoiding the classic NOT IN NULL pitfall.",
        "queryBreakdown": [
            {"clause": "WHERE NOT EXISTS (SELECT 1 ...)", "purpose": "Short-circuit semi-join anti-check."}
        ]
    },

    # 37. Most Recent Order per Customer
    {
        "id": "sql-ch-37",
        "topicId": "sql-subqueries-nested",
        "title": "Most Recent Order for Each Customer",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Walmart)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon Order Processing - Latest Activity Retrieval",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query using a correlated subquery to find `order_id`, `customer_id`, and `order_date` representing each customer's most recent order. Order by `customer_id` ascending.",
        "schema_context": """CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE
);
INSERT INTO orders VALUES
(101, 1, '2026-01-10'),
(102, 1, '2026-02-15'),
(103, 2, '2026-01-05'),
(104, 2, '2026-03-01'),
(105, 2, '2026-02-20');""",
        "sample_data": [
            {"customer_1": "101 (Jan), 102 (Feb) -> 102 latest"},
            {"customer_2": "103 (Jan), 104 (Mar), 105 (Feb) -> 104 latest"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT o1.order_id, o1.customer_id, o1.order_date\nFROM orders o1\nWHERE o1.order_date = (SELECT MAX(o2.order_date) FROM orders o2 WHERE ...)\nORDER BY o1.customer_id ASC;",
        "solution_query": "SELECT o1.order_id, o1.customer_id, o1.order_date FROM orders o1 WHERE o1.order_date = (SELECT MAX(o2.order_date) FROM orders o2 WHERE o2.customer_id = o1.customer_id) ORDER BY o1.customer_id ASC;",
        "expected_result": [
            {"order_id": 102, "customer_id": 1, "order_date": "2026-02-15"},
            {"order_id": 104, "customer_id": 2, "order_date": "2026-03-01"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Latest orders matched",
                "description": "Verify 102 and 104 are selected",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 102 && res[1].order_id === 104"
            }
        ],
        "hints": [
            "Hint 1: In the correlated subquery, find `MAX(order_date)` where `o2.customer_id = o1.customer_id`.",
            "Hint 2: Match `o1.order_date = (SELECT MAX ...)`."
        ],
        "explanation": "The correlated subquery determines the latest timestamp for that specific customer, filtering out older orders.",
        "queryBreakdown": [
            {"clause": "o1.order_date = (SELECT MAX(...))", "purpose": "Filters to highest timestamp within user group."}
        ]
    },

    # 38. Employees in Large Departments
    {
        "id": "sql-ch-38",
        "topicId": "sql-subqueries-nested",
        "title": "Employees in Departments with Multiple Members",
        "difficulty": "Medium",
        "attribution": "Placement-style (Cognizant)",
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Cognizant GenC - Subquery Aggregation Filtering",
            "role": "Programmer Analyst"
        },
        "prompt": "Write a SQL query to select `name` and `department` for employees who work in a department that has more than 2 employees. Order by `department`, then `name`.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50)
);
INSERT INTO staff VALUES
(1, 'Alice', 'Tech'),
(2, 'Bob', 'Tech'),
(3, 'Charlie', 'Tech'),
(4, 'David', 'Legal');""",
        "sample_data": [
            {"Tech": "3 employees (>2) -> All qualify"},
            {"Legal": "1 employee (<=2) -> Excluded"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name, department\nFROM staff\nWHERE department IN (\n    SELECT department FROM staff GROUP BY department HAVING ...\n)\nORDER BY department ASC, name ASC;",
        "solution_query": "SELECT name, department FROM staff WHERE department IN (SELECT department FROM staff GROUP BY department HAVING COUNT(*) > 2) ORDER BY department ASC, name ASC;",
        "expected_result": [
            {"name": "Alice", "department": "Tech"},
            {"name": "Bob", "department": "Tech"},
            {"name": "Charlie", "department": "Tech"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Tech department employees included",
                "description": "Verify Alice, Bob, Charlie are returned",
                "code": "(res) => Array.isArray(res) && res.length === 3 && res.every(r => r.department === 'Tech')"
            },
            {
                "id": 2,
                "title": "Legal employee excluded",
                "description": "Verify David is excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.name === 'David')"
            }
        ],
        "hints": [
            "Hint 1: Use an inner query: `SELECT department FROM staff GROUP BY department HAVING COUNT(*) > 2`.",
            "Hint 2: Filter outer table using `WHERE department IN (...)`."
        ],
        "explanation": "The subquery identifies departments meeting the size threshold, and the outer query filters employees belonging to those departments.",
        "queryBreakdown": [
            {"clause": "WHERE department IN (SELECT ... HAVING COUNT(*) > 2)", "purpose": "Filters individual rows based on group size criteria."}
        ]
    },

    # 39. Highest Paid Employee in Each Department
    {
        "id": "sql-ch-39",
        "topicId": "sql-subqueries-nested",
        "title": "Highest Paid Employee in Each Department",
        "difficulty": "Hard",
        "attribution": "Placement-style (Amazon / LeetCode 184)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "LeetCode 184 / Amazon SDE Technical Round",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to find the employee with the highest salary in each department. Return `name`, `department`, and `salary`. Order by `department` ascending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);
INSERT INTO staff VALUES
(1, 'Joe', 'IT', 85000),
(2, 'Jim', 'IT', 90000),
(3, 'Henry', 'HR', 80000),
(4, 'Sam', 'HR', 60000),
(5, 'Max', 'IT', 90000);""",
        "sample_data": [
            {"IT": "Jim (90k), Max (90k) -> Both are max"},
            {"HR": "Henry (80k) -> Max"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT e1.name, e1.department, e1.salary\nFROM staff e1\nWHERE e1.salary = (SELECT MAX(e2.salary) FROM staff e2 WHERE ...)\nORDER BY e1.department ASC, e1.name ASC;",
        "solution_query": "SELECT e1.name, e1.department, e1.salary FROM staff e1 WHERE e1.salary = (SELECT MAX(e2.salary) FROM staff e2 WHERE e2.department = e1.department) ORDER BY e1.department ASC, e1.name ASC;",
        "expected_result": [
            {"name": "Henry", "department": "HR", "salary": 80000},
            {"name": "Jim", "department": "IT", "salary": 90000},
            {"name": "Max", "department": "IT", "salary": 90000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Ties handled correctly",
                "description": "Verify both Jim and Max (90k) are returned for IT",
                "code": "(res) => Array.isArray(res) && res.some(r => r.name === 'Jim') && res.some(r => r.name === 'Max')"
            },
            {
                "id": 2,
                "title": "HR max employee",
                "description": "Verify Henry is returned for HR",
                "code": "(res) => Array.isArray(res) && res.some(r => r.name === 'Henry')"
            }
        ],
        "hints": [
            "Hint 1: Use a correlated subquery: `WHERE e1.salary = (SELECT MAX(e2.salary) FROM staff e2 WHERE e2.department = e1.department)`.",
            "Hint 2: This handles salary ties gracefully without dropping either top earner."
        ],
        "explanation": "Comparing salary against the department maximum cleanly supports ties without requiring analytical window functions.",
        "queryBreakdown": [
            {"clause": "WHERE e1.salary = (SELECT MAX(...))", "purpose": "Matches employee to the department ceiling."}
        ]
    },

    # 40. Difference from Company Average Salary
    {
        "id": "sql-ch-40",
        "topicId": "sql-subqueries-nested",
        "title": "Deviation from Company Average (Scalar SELECT Subquery)",
        "difficulty": "Medium",
        "attribution": "Placement-style (TCS Digital / Infosys)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS Digital - Subqueries in SELECT Clause",
            "role": "Digital Developer"
        },
        "prompt": "Write a SQL query using a scalar subquery in the `SELECT` clause to display `name`, `salary`, company average as `company_avg` (rounded to integer), and difference as `diff_from_avg` (salary - company_avg). Order by `diff_from_avg` descending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT
);
INSERT INTO staff VALUES
(1, 'Aarav', 100000),
(2, 'Bhavna', 80000),
(3, 'Chandan', 60000);""",
        "sample_data": [
            {"company_avg": 80000, "deviations": "Aarav (+20k), Bhavna (0), Chandan (-20k)"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name, salary,\n       (SELECT ROUND(AVG(salary)) FROM staff) AS company_avg,\n       (salary - (SELECT ROUND(AVG(salary)) FROM staff)) AS diff_from_avg\nFROM staff\nORDER BY diff_from_avg DESC;",
        "solution_query": "SELECT name, salary, (SELECT ROUND(AVG(salary)) FROM staff) AS company_avg, (salary - (SELECT ROUND(AVG(salary)) FROM staff)) AS diff_from_avg FROM staff ORDER BY diff_from_avg DESC;",
        "expected_result": [
            {"name": "Aarav", "salary": 100000, "company_avg": 80000, "diff_from_avg": 20000},
            {"name": "Bhavna", "salary": 80000, "company_avg": 80000, "diff_from_avg": 0},
            {"name": "Chandan", "salary": 60000, "company_avg": 80000, "diff_from_avg": -20000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Deviation calculations",
                "description": "Verify Aarav is +20,000, Bhavna is 0, Chandan is -20,000",
                "code": "(res) => Array.isArray(res) && res.length === 3 && res[0].diff_from_avg === 20000 && res[2].diff_from_avg === -20000"
            }
        ],
        "hints": [
            "Hint 1: Place `(SELECT ROUND(AVG(salary)) FROM staff)` directly in the SELECT list.",
            "Hint 2: Compute difference via `(salary - (SELECT ROUND(AVG(salary)) FROM staff))`."
        ],
        "explanation": "A scalar subquery can be projected in the SELECT clause alongside normal table columns to perform row-level comparative mathematics.",
        "queryBreakdown": [
            {"clause": "SELECT (SELECT AVG...) AS company_avg", "purpose": "Projects constant aggregate metric across every returned row."}
        ]
    }
]

print(f"Loaded Part 2: {len(part2_challenges)} challenges.")
