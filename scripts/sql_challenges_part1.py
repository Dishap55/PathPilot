# SQL Challenges Part 1: Basics & Joins (Challenges 1-3, 7-23)

part1_challenges = [
    # 1. High Earning Engineers
    {
        "id": "sql-ch-1",
        "topicId": "sql-basics-ddl-dml",
        "title": "High-Earning Engineers Filter",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Infosys Technical Interview Questions - SQL Filtering",
            "role": "System Engineer"
        },
        "prompt": "Write a SQL query to select the `name` and `salary` of all employees in the 'Engineering' department who earn more than 70,000, ordered by salary descending.",
        "schema_context": """CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary INT
);
INSERT INTO employees VALUES 
(1, 'Alice Connor', 'Engineering', 95000),
(2, 'Bob Vance', 'Sales', 65000),
(3, 'Charlie Kelly', 'Engineering', 85000),
(4, 'Dennis Reynolds', 'Engineering', 68000),
(5, 'Frank Reynolds', 'Management', 120000);""",
        "sample_data": [
            {"emp_id": 1, "name": "Alice Connor", "department": "Engineering", "salary": 95000},
            {"emp_id": 2, "name": "Bob Vance", "department": "Sales", "salary": 65000},
            {"emp_id": 3, "name": "Charlie Kelly", "department": "Engineering", "salary": 85000},
            {"emp_id": 4, "name": "Dennis Reynolds", "department": "Engineering", "salary": 68000},
            {"emp_id": 5, "name": "Frank Reynolds", "department": "Management", "salary": 120000}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name, salary\nFROM employees\nWHERE ...;",
        "solution_query": "SELECT name, salary FROM employees WHERE department = 'Engineering' AND salary > 70000 ORDER BY salary DESC;",
        "expected_result": [
            {"name": "Alice Connor", "salary": 95000},
            {"name": "Charlie Kelly", "salary": 85000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Engineering filter check",
                "description": "Verify only Engineering employees are included",
                "code": "(res) => Array.isArray(res) && res.every(r => r.name !== 'Bob Vance' && r.name !== 'Frank Reynolds')"
            },
            {
                "id": 2,
                "title": "Salary threshold check",
                "description": "Verify employees with salary <= 70000 are excluded",
                "code": "(res) => Array.isArray(res) && res.every(r => r.salary > 70000)"
            },
            {
                "id": 3,
                "title": "Descending sort check",
                "description": "Verify Alice (95000) appears before Charlie (85000)",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].name === 'Alice Connor' && res[1].name === 'Charlie Kelly'"
            }
        ],
        "hints": [
            "Hint 1: Use the `WHERE` clause with two conditions joined by `AND`: `department = 'Engineering' AND salary > 70000`.",
            "Hint 2: Remember to sort by salary in descending order using `ORDER BY salary DESC`."
        ],
        "explanation": "The WHERE clause filters rows matching both the department and salary predicates simultaneously. SELECT projects the required columns and ORDER BY sorts highest salary first.",
        "queryBreakdown": [
            {"clause": "SELECT name, salary", "purpose": "Projects only required attributes."},
            {"clause": "FROM employees", "purpose": "Specifies target table."},
            {"clause": "WHERE department = 'Engineering' AND salary > 70000", "purpose": "Filters candidate rows."},
            {"clause": "ORDER BY salary DESC", "purpose": "Orders results descending."}
        ]
    },

    # 2. Customers Who Never Placed Orders
    {
        "id": "sql-ch-2",
        "topicId": "sql-joins",
        "title": "Customers Who Never Placed Orders",
        "difficulty": "Easy",
        "attribution": "Reported Interview (Amazon / LeetCode 183)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "LeetCode 183 / Amazon Online Assessment SQL Section",
            "role": "Software Development Engineer"
        },
        "prompt": "Write a SQL query to report all customers who never placed any orders. Return the column named `Customers`.",
        "schema_context": """CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customerId INT
);
INSERT INTO customers VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');
INSERT INTO orders VALUES (1, 3), (2, 1);""",
        "sample_data": [
            {"id": 1, "name": "Joe"},
            {"id": 2, "name": "Henry"},
            {"id": 3, "name": "Sam"},
            {"id": 4, "name": "Max"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name AS Customers\nFROM customers c\n...;",
        "solution_query": "SELECT c.name AS Customers FROM customers c LEFT JOIN orders o ON c.id = o.customerId WHERE o.id IS NULL;",
        "expected_result": [
            {"Customers": "Henry"},
            {"Customers": "Max"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Correct count of non-ordering customers",
                "description": "Verify exactly 2 customers are returned (Henry and Max)",
                "code": "(res) => Array.isArray(res) && res.length === 2"
            },
            {
                "id": 2,
                "title": "Check Henry and Max presence",
                "description": "Verify both Henry and Max are in the result set",
                "code": "(res) => Array.isArray(res) && res.some(r => (r.Customers || r.name) === 'Henry') && res.some(r => (r.Customers || r.name) === 'Max')"
            },
            {
                "id": 3,
                "title": "Exclude ordering customers",
                "description": "Verify Joe and Sam (who placed orders) are excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => (r.Customers || r.name) === 'Joe' || (r.Customers || r.name) === 'Sam')"
            }
        ],
        "hints": [
            "Hint 1: A `LEFT JOIN` between `customers` and `orders` keeps all customer records regardless of whether an order exists.",
            "Hint 2: Filter for unmatched records where the foreign key in `orders` is NULL: `WHERE orders.id IS NULL`."
        ],
        "explanation": "A LEFT JOIN pairs every customer with their order(s). Customers who never ordered produce NULL values in the orders columns. Filtering on `WHERE o.id IS NULL` isolates these customers.",
        "queryBreakdown": [
            {"clause": "SELECT c.name AS Customers", "purpose": "Aliases the output column as Customers."},
            {"clause": "FROM customers c LEFT JOIN orders o", "purpose": "Preserves all customers regardless of order existence."},
            {"clause": "ON c.id = o.customerId", "purpose": "Joins on foreign key relationship."},
            {"clause": "WHERE o.id IS NULL", "purpose": "Filters for customers with zero matched orders."}
        ]
    },

    # 3. Employees Earning More Than Their Manager
    {
        "id": "sql-ch-3",
        "topicId": "sql-joins",
        "title": "Employees Earning More Than Their Manager",
        "difficulty": "Medium",
        "attribution": "Reported Interview (Amazon / LeetCode 181)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "LeetCode 181 / Amazon Technical Interview",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to find the employees who earn more than their direct managers. Return the employee name as `Employee`.",
        "schema_context": """CREATE TABLE employee (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT,
    managerId INT
);
INSERT INTO employee VALUES 
(1, 'Joe', 70000, 3),
(2, 'Henry', 80000, 4),
(3, 'Sam', 60000, NULL),
(4, 'Max', 90000, NULL);""",
        "sample_data": [
            {"id": 1, "name": "Joe", "salary": 70000, "managerId": 3},
            {"id": 2, "name": "Henry", "salary": 80000, "managerId": 4},
            {"id": 3, "name": "Sam", "salary": 60000, "managerId": None},
            {"id": 4, "name": "Max", "salary": 90000, "managerId": None}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT e.name AS Employee\nFROM employee e\nJOIN employee m ON ...;",
        "solution_query": "SELECT e.name AS Employee FROM employee e JOIN employee m ON e.managerId = m.id WHERE e.salary > m.salary;",
        "expected_result": [
            {"Employee": "Joe"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Joe identified",
                "description": "Verify Joe (70k > 60k Sam) is returned",
                "code": "(res) => Array.isArray(res) && res.some(r => (r.Employee || r.name) === 'Joe')"
            },
            {
                "id": 2,
                "title": "Henry excluded",
                "description": "Verify Henry (80k < 90k Max) is excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => (r.Employee || r.name) === 'Henry')"
            },
            {
                "id": 3,
                "title": "Managers without managers handled",
                "description": "Verify Sam and Max (NULL managerId) are excluded",
                "code": "(res) => Array.isArray(res) && res.length === 1"
            }
        ],
        "hints": [
            "Hint 1: Use a `SELF JOIN` on the employee table: `employee e JOIN employee m ON e.managerId = m.id`.",
            "Hint 2: Filter with `WHERE e.salary > m.salary`."
        ],
        "explanation": "A Self Join treats one instance of the table as the employee (e) and the other as the manager (m). Comparing `e.salary > m.salary` extracts employees who outearn their superiors.",
        "queryBreakdown": [
            {"clause": "SELECT e.name AS Employee", "purpose": "Returns employee name."},
            {"clause": "FROM employee e JOIN employee m", "purpose": "Self-joins employee table."},
            {"clause": "ON e.managerId = m.id", "purpose": "Matches employee to their manager."},
            {"clause": "WHERE e.salary > m.salary", "purpose": "Filters for higher salary."}
        ]
    },

    # 7. Select Distinct Department Names
    {
        "id": "sql-ch-7",
        "topicId": "sql-basics-ddl-dml",
        "title": "Select Distinct Department Names",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS NQT)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "TCS NQT Technical Assessment - SQL Distinct Queries",
            "role": "Ninja / Digital Developer"
        },
        "prompt": "Write a SQL query to select all unique department names from the `employees` table, sorted alphabetically.",
        "schema_context": """CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50)
);
INSERT INTO employees VALUES
(1, 'Alice', 'Engineering'),
(2, 'Bob', 'Marketing'),
(3, 'Charlie', 'Engineering'),
(4, 'David', 'Sales'),
(5, 'Eva', 'Marketing');""",
        "sample_data": [
            {"emp_id": 1, "name": "Alice", "department": "Engineering"},
            {"emp_id": 2, "name": "Bob", "department": "Marketing"},
            {"emp_id": 3, "name": "Charlie", "department": "Engineering"},
            {"emp_id": 4, "name": "David", "department": "Sales"},
            {"emp_id": 5, "name": "Eva", "department": "Marketing"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT DISTINCT ...;",
        "solution_query": "SELECT DISTINCT department FROM employees ORDER BY department ASC;",
        "expected_result": [
            {"department": "Engineering"},
            {"department": "Marketing"},
            {"department": "Sales"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Distinct count check",
                "description": "Verify exactly 3 unique departments are returned",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "Alphabetical order check",
                "description": "Verify departments are ordered Engineering, Marketing, Sales",
                "code": "(res) => Array.isArray(res) && res[0].department === 'Engineering' && res[1].department === 'Marketing' && res[2].department === 'Sales'"
            }
        ],
        "hints": [
            "Hint 1: Use `SELECT DISTINCT department` to eliminate duplicates.",
            "Hint 2: Sort using `ORDER BY department ASC`."
        ],
        "explanation": "DISTINCT filters out repeated department values across all rows, and ORDER BY sorts them alphabetically.",
        "queryBreakdown": [
            {"clause": "SELECT DISTINCT department", "purpose": "Removes duplicate department rows."},
            {"clause": "FROM employees", "purpose": "Specifies source table."},
            {"clause": "ORDER BY department ASC", "purpose": "Sorts in alphabetical order."}
        ]
    },

    # 8. Products with Low Stock Quantity
    {
        "id": "sql-ch-8",
        "topicId": "sql-basics-ddl-dml",
        "title": "Products with Low Stock Quantity",
        "difficulty": "Easy",
        "attribution": "Placement-style (Cognizant)",
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Cognizant GenC Placement Prep - SQL DML & Filtering",
            "role": "Programmer Analyst"
        },
        "prompt": "Write a SQL query to find the `product_name` and `stock_quantity` of products with stock less than 20 units, ordered by stock ascending.",
        "schema_context": """CREATE TABLE inventory (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    stock_quantity INT
);
INSERT INTO inventory VALUES
(101, 'Mechanical Keyboard', 12),
(102, 'USB-C Cable', 85),
(103, 'Wireless Mouse', 8),
(104, 'Gaming Monitor', 24),
(105, 'Webcam 1080p', 15);""",
        "sample_data": [
            {"product_id": 101, "product_name": "Mechanical Keyboard", "stock_quantity": 12},
            {"product_id": 102, "product_name": "USB-C Cable", "stock_quantity": 85},
            {"product_id": 103, "product_name": "Wireless Mouse", "stock_quantity": 8},
            {"product_id": 104, "product_name": "Gaming Monitor", "stock_quantity": 24},
            {"product_id": 105, "product_name": "Webcam 1080p", "stock_quantity": 15}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT product_name, stock_quantity\nFROM inventory\nWHERE ...;",
        "solution_query": "SELECT product_name, stock_quantity FROM inventory WHERE stock_quantity < 20 ORDER BY stock_quantity ASC;",
        "expected_result": [
            {"product_name": "Wireless Mouse", "stock_quantity": 8},
            {"product_name": "Mechanical Keyboard", "stock_quantity": 12},
            {"product_name": "Webcam 1080p", "stock_quantity": 15}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Threshold check",
                "description": "Verify all returned items have stock_quantity < 20",
                "code": "(res) => Array.isArray(res) && res.every(r => r.stock_quantity < 20)"
            },
            {
                "id": 2,
                "title": "Count check",
                "description": "Verify exactly 3 items qualify",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 3,
                "title": "Ascending order check",
                "description": "Verify lowest stock (8) appears first",
                "code": "(res) => Array.isArray(res) && res[0].stock_quantity === 8"
            }
        ],
        "hints": [
            "Hint 1: Use `WHERE stock_quantity < 20`.",
            "Hint 2: Sort with `ORDER BY stock_quantity ASC`."
        ],
        "explanation": "Filters inventory rows below threshold 20 and sorts from lowest remaining units to highest.",
        "queryBreakdown": [
            {"clause": "SELECT product_name, stock_quantity", "purpose": "Projects required item information."},
            {"clause": "WHERE stock_quantity < 20", "purpose": "Filters low stock items."},
            {"clause": "ORDER BY stock_quantity ASC", "purpose": "Sorts in ascending order."}
        ]
    },

    # 9. Employees Hired in Date Range
    {
        "id": "sql-ch-9",
        "topicId": "sql-basics-ddl-dml",
        "title": "Employees Hired in Specific Date Range",
        "difficulty": "Easy",
        "attribution": "Placement-style (Wipro)",
        "companyMetadata": {
            "company": "Wipro",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Wipro Elite NTH Technical Round - Date Filter Queries",
            "role": "Project Engineer"
        },
        "prompt": "Write a SQL query to report the `name` and `hire_date` of all employees hired between '2024-01-01' and '2024-12-31' inclusive, ordered by `hire_date` ascending.",
        "schema_context": """CREATE TABLE staff (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    hire_date DATE
);
INSERT INTO staff VALUES
(1, 'Aarav Sharma', '2023-11-15'),
(2, 'Bhavna Patel', '2024-02-10'),
(3, 'Chetan Kumar', '2024-08-25'),
(4, 'Deepa Rao', '2025-01-05');""",
        "sample_data": [
            {"id": 1, "name": "Aarav Sharma", "hire_date": "2023-11-15"},
            {"id": 2, "name": "Bhavna Patel", "hire_date": "2024-02-10"},
            {"id": 3, "name": "Chetan Kumar", "hire_date": "2024-08-25"},
            {"id": 4, "name": "Deepa Rao", "hire_date": "2025-01-05"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name, hire_date\nFROM staff\nWHERE ...;",
        "solution_query": "SELECT name, hire_date FROM staff WHERE hire_date BETWEEN '2024-01-01' AND '2024-12-31' ORDER BY hire_date ASC;",
        "expected_result": [
            {"name": "Bhavna Patel", "hire_date": "2024-02-10"},
            {"name": "Chetan Kumar", "hire_date": "2024-08-25"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Date range inclusion",
                "description": "Verify only 2024 hires are included",
                "code": "(res) => Array.isArray(res) && res.every(r => r.hire_date.startsWith('2024'))"
            },
            {
                "id": 2,
                "title": "Exclusion check",
                "description": "Verify 2023 and 2025 hires are excluded",
                "code": "(res) => Array.isArray(res) && res.length === 2"
            }
        ],
        "hints": [
            "Hint 1: Use `hire_date BETWEEN '2024-01-01' AND '2024-12-31'`.",
            "Hint 2: Sort with `ORDER BY hire_date ASC`."
        ],
        "explanation": "BETWEEN checks inclusivity for start and end dates. Sorting ensures chronological order.",
        "queryBreakdown": [
            {"clause": "SELECT name, hire_date", "purpose": "Projects employee name and hiring date."},
            {"clause": "WHERE hire_date BETWEEN ...", "purpose": "Inclusively filters dates within the calendar year 2024."}
        ]
    },

    # 10. Customer Email Domain Pattern Search
    {
        "id": "sql-ch-10",
        "topicId": "sql-basics-ddl-dml",
        "title": "Customer Email Domain Pattern Search",
        "difficulty": "Easy",
        "attribution": "Placement-style (Accenture)",
        "companyMetadata": {
            "company": "Accenture",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Accenture Assessment - SQL Pattern Matching",
            "role": "Associate Software Engineer"
        },
        "prompt": "Write a SQL query to find the `id`, `name`, and `email` of all customers whose email address ends with '@gmail.com', ordered by name.",
        "schema_context": """CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);
INSERT INTO customers VALUES
(1, 'Rohan Mehta', 'rohan@gmail.com'),
(2, 'Priya Nair', 'priya@yahoo.com'),
(3, 'Ankit Verma', 'ankit@gmail.com'),
(4, 'Sneha Sen', 'sneha@outlook.com');""",
        "sample_data": [
            {"id": 1, "name": "Rohan Mehta", "email": "rohan@gmail.com"},
            {"id": 2, "name": "Priya Nair", "email": "priya@yahoo.com"},
            {"id": 3, "name": "Ankit Verma", "email": "ankit@gmail.com"},
            {"id": 4, "name": "Sneha Sen", "email": "sneha@outlook.com"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT id, name, email\nFROM customers\nWHERE email LIKE ...;",
        "solution_query": "SELECT id, name, email FROM customers WHERE email LIKE '%@gmail.com' ORDER BY name ASC;",
        "expected_result": [
            {"id": 3, "name": "Ankit Verma", "email": "ankit@gmail.com"},
            {"id": 1, "name": "Rohan Mehta", "email": "rohan@gmail.com"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Domain match check",
                "description": "Verify all returned emails end with @gmail.com",
                "code": "(res) => Array.isArray(res) && res.every(r => r.email.endsWith('@gmail.com'))"
            },
            {
                "id": 2,
                "title": "Alphabetical order check",
                "description": "Verify Ankit Verma comes before Rohan Mehta",
                "code": "(res) => Array.isArray(res) && res[0].name === 'Ankit Verma' && res[1].name === 'Rohan Mehta'"
            }
        ],
        "hints": [
            "Hint 1: Use the wildcard `%` before `@gmail.com`.",
            "Hint 2: `WHERE email LIKE '%@gmail.com'`."
        ],
        "explanation": "LIKE with `%` matches any sequence of leading characters ending in `@gmail.com`.",
        "queryBreakdown": [
            {"clause": "SELECT id, name, email", "purpose": "Projects customer details."},
            {"clause": "WHERE email LIKE '%@gmail.com'", "purpose": "Filters for target email domain."}
        ]
    },

    # 11. Filtering with IN
    {
        "id": "sql-ch-11",
        "topicId": "sql-basics-ddl-dml",
        "title": "Filtering with IN and Status Check",
        "difficulty": "Easy",
        "attribution": "Placement-style (Capgemini)",
        "companyMetadata": {
            "company": "Capgemini",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Capgemini Technical Interview - SQL Predicates",
            "role": "Analyst"
        },
        "prompt": "Write a SQL query to find `name`, `city`, and `status` of all suppliers located in 'New York', 'Chicago', or 'San Francisco' who are 'ACTIVE', ordered by name.",
        "schema_context": """CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50),
    status VARCHAR(20)
);
INSERT INTO suppliers VALUES
(1, 'Apex Supplies', 'New York', 'ACTIVE'),
(2, 'Beacon Tech', 'Boston', 'ACTIVE'),
(3, 'Crestwood Corp', 'Chicago', 'INACTIVE'),
(4, 'Delta Logistics', 'San Francisco', 'ACTIVE');""",
        "sample_data": [
            {"supplier_id": 1, "name": "Apex Supplies", "city": "New York", "status": "ACTIVE"},
            {"supplier_id": 2, "name": "Beacon Tech", "city": "Boston", "status": "ACTIVE"},
            {"supplier_id": 3, "name": "Crestwood Corp", "city": "Chicago", "status": "INACTIVE"},
            {"supplier_id": 4, "name": "Delta Logistics", "city": "San Francisco", "status": "ACTIVE"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT name, city, status\nFROM suppliers\nWHERE ...;",
        "solution_query": "SELECT name, city, status FROM suppliers WHERE city IN ('New York', 'Chicago', 'San Francisco') AND status = 'ACTIVE' ORDER BY name ASC;",
        "expected_result": [
            {"name": "Apex Supplies", "city": "New York", "status": "ACTIVE"},
            {"name": "Delta Logistics", "city": "San Francisco", "status": "ACTIVE"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Active check",
                "description": "Verify only ACTIVE suppliers are included",
                "code": "(res) => Array.isArray(res) && res.every(r => r.status === 'ACTIVE')"
            },
            {
                "id": 2,
                "title": "City inclusion",
                "description": "Verify Boston (not in list) and Crestwood (inactive) are excluded",
                "code": "(res) => Array.isArray(res) && res.length === 2"
            }
        ],
        "hints": [
            "Hint 1: Use `city IN ('New York', 'Chicago', 'San Francisco')`.",
            "Hint 2: Combine with `AND status = 'ACTIVE'`."
        ],
        "explanation": "The IN predicate succinctly checks membership in a list of allowed values alongside the boolean status filter.",
        "queryBreakdown": [
            {"clause": "city IN ('New York', ...)", "purpose": "Checks multi-city match."},
            {"clause": "AND status = 'ACTIVE'", "purpose": "Enforces active status."}
        ]
    },

    # 12. Handling NULL Values
    {
        "id": "sql-ch-12",
        "topicId": "sql-basics-ddl-dml",
        "title": "Handling NULL Values with IS NOT NULL",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Three-Valued Logic & NULLs",
            "role": "System Engineer"
        },
        "prompt": "Write a SQL query to select the `emp_id`, `name`, and `commission` of all sales agents who have earned a commission (commission is not NULL), ordered by commission descending.",
        "schema_context": """CREATE TABLE sales_agents (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    commission INT
);
INSERT INTO sales_agents VALUES
(1, 'Ravi', 5000),
(2, 'Simran', NULL),
(3, 'Kavita', 8000),
(4, 'Manoj', NULL);""",
        "sample_data": [
            {"emp_id": 1, "name": "Ravi", "commission": 5000},
            {"emp_id": 2, "name": "Simran", "commission": None},
            {"emp_id": 3, "name": "Kavita", "commission": 8000},
            {"emp_id": 4, "name": "Manoj", "commission": None}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT emp_id, name, commission\nFROM sales_agents\nWHERE ...;",
        "solution_query": "SELECT emp_id, name, commission FROM sales_agents WHERE commission IS NOT NULL ORDER BY commission DESC;",
        "expected_result": [
            {"emp_id": 3, "name": "Kavita", "commission": 8000},
            {"emp_id": 1, "name": "Ravi", "commission": 5000}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "No NULL commissions",
                "description": "Verify no NULL commission rows are returned",
                "code": "(res) => Array.isArray(res) && res.every(r => r.commission !== null && r.commission !== undefined)"
            },
            {
                "id": 2,
                "title": "Descending sort check",
                "description": "Verify Kavita (8000) appears first",
                "code": "(res) => Array.isArray(res) && res[0].name === 'Kavita' && res[1].name === 'Ravi'"
            }
        ],
        "hints": [
            "Hint 1: In SQL, never use `= NULL` or `!= NULL`. Always use `IS NOT NULL`.",
            "Hint 2: Sort descending: `ORDER BY commission DESC`."
        ],
        "explanation": "Because SQL operates on three-valued logic (TRUE, FALSE, UNKNOWN), testing equality against NULL produces UNKNOWN. `IS NOT NULL` evaluates cleanly to boolean TRUE or FALSE.",
        "queryBreakdown": [
            {"clause": "WHERE commission IS NOT NULL", "purpose": "Filters out records without assigned commission."},
            {"clause": "ORDER BY commission DESC", "purpose": "Sorts from highest commission down."}
        ]
    },

    # 13. Top 3 Highest Priced Products
    {
        "id": "sql-ch-13",
        "topicId": "sql-basics-ddl-dml",
        "title": "Top 3 Highest Priced Products with LIMIT",
        "difficulty": "Easy",
        "attribution": "Placement-style (Amazon / Walmart)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon Online Assessment - Query Result Pagination",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to retrieve the `product_name` and `price` of the top 3 highest-priced products, sorted from highest price to lowest.",
        "schema_context": """CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price NUMERIC(10,2)
);
INSERT INTO products VALUES
(1, 'Laptop Pro', 1200.00),
(2, 'Wireless Earbuds', 99.00),
(3, 'Smartphone Ultra', 950.00),
(4, 'Smartwatch', 250.00),
(5, 'Bluetooth Speaker', 60.00);""",
        "sample_data": [
            {"product_id": 1, "product_name": "Laptop Pro", "price": 1200.00},
            {"product_id": 2, "product_name": "Wireless Earbuds", "price": 99.00},
            {"product_id": 3, "product_name": "Smartphone Ultra", "price": 950.00},
            {"product_id": 4, "product_name": "Smartwatch", "price": 250.00},
            {"product_id": 5, "product_name": "Bluetooth Speaker", "price": 60.00}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT product_name, price\nFROM products\nORDER BY ... LIMIT ...;",
        "solution_query": "SELECT product_name, price FROM products ORDER BY price DESC LIMIT 3;",
        "expected_result": [
            {"product_name": "Laptop Pro", "price": 1200.00},
            {"product_name": "Smartphone Ultra", "price": 950.00},
            {"product_name": "Smartwatch", "price": 250.00}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Count limit check",
                "description": "Verify exactly 3 items are returned",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "Order check",
                "description": "Verify items appear in order: Laptop Pro, Smartphone Ultra, Smartwatch",
                "code": "(res) => Array.isArray(res) && res[0].product_name === 'Laptop Pro' && res[1].product_name === 'Smartphone Ultra'"
            }
        ],
        "hints": [
            "Hint 1: Order by price descending: `ORDER BY price DESC`.",
            "Hint 2: Restrict output rows with `LIMIT 3`."
        ],
        "explanation": "ORDER BY price DESC orders all items from highest to lowest, and LIMIT 3 truncates the result set to the top 3 rows.",
        "queryBreakdown": [
            {"clause": "ORDER BY price DESC", "purpose": "Sorts products descending."},
            {"clause": "LIMIT 3", "purpose": "Restricts output to the top three rows."}
        ]
    },

    # 14. Inner Join Orders with Customer Details
    {
        "id": "sql-ch-14",
        "topicId": "sql-joins",
        "title": "Inner Join Orders with Customer Details",
        "difficulty": "Easy",
        "attribution": "Placement-style (Cognizant)",
        "companyMetadata": {
            "company": "Cognizant",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Cognizant GenC Next Assessment - Relational Joins",
            "role": "Digital Engineer"
        },
        "prompt": "Write a SQL query to display `order_id`, customer `name`, `order_date`, and `total_amount` for all placed orders by joining `orders` and `customers`. Order by `order_id` ascending.",
        "schema_context": """CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50)
);
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount NUMERIC(10,2)
);
INSERT INTO customers VALUES
(101, 'Anita Roy', 'Mumbai'),
(102, 'Bikram Das', 'Kolkata'),
(103, 'Chitra Nair', 'Bengaluru');
INSERT INTO orders VALUES
(5001, 101, '2026-03-01', 1500.00),
(5002, 103, '2026-03-02', 2800.50),
(5003, 101, '2026-03-04', 750.00);""",
        "sample_data": [
            {"order_id": 5001, "customer_id": 101, "name": "Anita Roy", "total_amount": 1500.00},
            {"order_id": 5002, "customer_id": 103, "name": "Chitra Nair", "total_amount": 2800.50},
            {"order_id": 5003, "customer_id": 101, "name": "Anita Roy", "total_amount": 750.00}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT o.order_id, c.name, o.order_date, o.total_amount\nFROM orders o\nJOIN customers c ON ...\nORDER BY o.order_id ASC;",
        "solution_query": "SELECT o.order_id, c.name, o.order_date, o.total_amount FROM orders o JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;",
        "expected_result": [
            {"order_id": 5001, "name": "Anita Roy", "order_date": "2026-03-01", "total_amount": 1500.00},
            {"order_id": 5002, "name": "Chitra Nair", "order_date": "2026-03-02", "total_amount": 2800.50},
            {"order_id": 5003, "name": "Anita Roy", "order_date": "2026-03-04", "total_amount": 750.00}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Row count check",
                "description": "Verify exactly 3 order rows are joined",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "Customer name correctly matched",
                "description": "Verify order 5001 has customer Anita Roy",
                "code": "(res) => Array.isArray(res) && res[0].order_id === 5001 && res[0].name === 'Anita Roy'"
            }
        ],
        "hints": [
            "Hint 1: Use an `INNER JOIN` (or simply `JOIN`) on `o.customer_id = c.customer_id`.",
            "Hint 2: Sort by `o.order_id ASC`."
        ],
        "explanation": "INNER JOIN combines rows from orders and customers where the foreign key `customer_id` matches the primary key.",
        "queryBreakdown": [
            {"clause": "SELECT o.order_id, c.name, ...", "purpose": "Projects combined attributes from both relations."},
            {"clause": "FROM orders o JOIN customers c", "purpose": "Executes relational inner join."},
            {"clause": "ON o.customer_id = c.customer_id", "purpose": "Join predicate specifying equality on foreign key."}
        ]
    },

    # 15. Products Never Ordered
    {
        "id": "sql-ch-15",
        "topicId": "sql-joins",
        "title": "Products Never Ordered",
        "difficulty": "Easy",
        "attribution": "Placement-style (Amazon / Flipkart)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon Online Assessment - Unmatched Records",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to report the `product_id` and `product_name` of all products that have never appeared in any order item record. Order by `product_id`.",
        "schema_context": """CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100)
);
CREATE TABLE order_items (
    item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT
);
INSERT INTO products VALUES
(1, '4K TV'),
(2, 'Soundbar'),
(3, 'HDMI Cable'),
(4, 'Wall Mount');
INSERT INTO order_items VALUES
(10, 1001, 1),
(11, 1001, 3),
(12, 1002, 1);""",
        "sample_data": [
            {"product_id": 1, "product_name": "4K TV"},
            {"product_id": 2, "product_name": "Soundbar"},
            {"product_id": 3, "product_name": "HDMI Cable"},
            {"product_id": 4, "product_name": "Wall Mount"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT p.product_id, p.product_name\nFROM products p\nLEFT JOIN order_items oi ON ...\nWHERE ...;",
        "solution_query": "SELECT p.product_id, p.product_name FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.product_id IS NULL ORDER BY p.product_id ASC;",
        "expected_result": [
            {"product_id": 2, "product_name": "Soundbar"},
            {"product_id": 4, "product_name": "Wall Mount"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Unordered products check",
                "description": "Verify Soundbar and Wall Mount are returned",
                "code": "(res) => Array.isArray(res) && res.some(r => r.product_name === 'Soundbar') && res.some(r => r.product_name === 'Wall Mount')"
            },
            {
                "id": 2,
                "title": "Ordered products excluded",
                "description": "Verify 4K TV and HDMI Cable are excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.product_name === '4K TV' || r.product_name === 'HDMI Cable')"
            }
        ],
        "hints": [
            "Hint 1: Use `LEFT JOIN order_items oi ON p.product_id = oi.product_id`.",
            "Hint 2: Filter for unmatched items with `WHERE oi.product_id IS NULL`."
        ],
        "explanation": "A LEFT JOIN preserves every product. Products with no matching order item row have NULL in `oi.product_id`. Filtering with `WHERE oi.product_id IS NULL` isolates unbought products.",
        "queryBreakdown": [
            {"clause": "FROM products p LEFT JOIN order_items oi", "purpose": "Includes all product rows."},
            {"clause": "WHERE oi.product_id IS NULL", "purpose": "Isolates products with zero sales records."}
        ]
    },

    # 16. Departments Without Any Employees
    {
        "id": "sql-ch-16",
        "topicId": "sql-joins",
        "title": "Departments Without Any Employees",
        "difficulty": "Easy",
        "attribution": "Placement-style (TCS / Wipro)",
        "companyMetadata": {
            "company": "TCS",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "TCS Digital Technical Round - Anti-Join Patterns",
            "role": "Digital Developer"
        },
        "prompt": "Write a SQL query to find the `dept_id` and `dept_name` of all departments that currently have no assigned employees. Order by `dept_id`.",
        "schema_context": """CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    dept_id INT
);
INSERT INTO departments VALUES
(10, 'Human Resources'),
(20, 'Research & Development'),
(30, 'Customer Support'),
(40, 'Legal Compliance');
INSERT INTO employees VALUES
(1, 'Ramesh', 10),
(2, 'Suresh', 20),
(3, 'Geeta', 10);""",
        "sample_data": [
            {"dept_id": 10, "dept_name": "Human Resources"},
            {"dept_id": 20, "dept_name": "Research & Development"},
            {"dept_id": 30, "dept_name": "Customer Support"},
            {"dept_id": 40, "dept_name": "Legal Compliance"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT d.dept_id, d.dept_name\nFROM departments d\nLEFT JOIN employees e ON ...\nWHERE ...;",
        "solution_query": "SELECT d.dept_id, d.dept_name FROM departments d LEFT JOIN employees e ON d.dept_id = e.dept_id WHERE e.emp_id IS NULL ORDER BY d.dept_id ASC;",
        "expected_result": [
            {"dept_id": 30, "dept_name": "Customer Support"},
            {"dept_id": 40, "dept_name": "Legal Compliance"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Empty departments check",
                "description": "Verify Customer Support and Legal Compliance are returned",
                "code": "(res) => Array.isArray(res) && res.some(r => r.dept_name === 'Customer Support') && res.some(r => r.dept_name === 'Legal Compliance')"
            },
            {
                "id": 2,
                "title": "Staffed departments excluded",
                "description": "Verify HR (10) and R&D (20) are excluded",
                "code": "(res) => Array.isArray(res) && res.length === 2 && !res.some(r => r.dept_id === 10 || r.dept_id === 20)"
            }
        ],
        "hints": [
            "Hint 1: Left join `departments` with `employees` on `d.dept_id = e.dept_id`.",
            "Hint 2: Filter where `e.emp_id IS NULL`."
        ],
        "explanation": "This classic Anti-Join pattern identifies parent records that have no corresponding child records.",
        "queryBreakdown": [
            {"clause": "FROM departments d LEFT JOIN employees e", "purpose": "Preserves all departments."},
            {"clause": "WHERE e.emp_id IS NULL", "purpose": "Keeps only departments with no employees."}
        ]
    },

    # 17. Employees Without Assigned Department
    {
        "id": "sql-ch-17",
        "topicId": "sql-joins",
        "title": "Employees Without Assigned Department",
        "difficulty": "Easy",
        "attribution": "Placement-style (Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Infosys Technical Assessment - Unassigned Foreign Keys",
            "role": "Systems Associate"
        },
        "prompt": "Write a SQL query to find the `emp_id` and `name` of all employees whose `dept_id` is NULL or does not match any existing department in `departments`. Order by `emp_id`.",
        "schema_context": """CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    dept_id INT
);
INSERT INTO departments VALUES (1, 'Finance'), (2, 'Marketing');
INSERT INTO employees VALUES
(101, 'Kunal', 1),
(102, 'Isha', NULL),
(103, 'Deepak', 99),
(104, 'Meera', 2);""",
        "sample_data": [
            {"emp_id": 101, "name": "Kunal", "dept_id": 1},
            {"emp_id": 102, "name": "Isha", "dept_id": None},
            {"emp_id": 103, "name": "Deepak", "dept_id": 99},
            {"emp_id": 104, "name": "Meera", "dept_id": 2}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT e.emp_id, e.name\nFROM employees e\nLEFT JOIN departments d ON ...\nWHERE ...;",
        "solution_query": "SELECT e.emp_id, e.name FROM employees e LEFT JOIN departments d ON e.dept_id = d.dept_id WHERE d.dept_id IS NULL ORDER BY e.emp_id ASC;",
        "expected_result": [
            {"emp_id": 102, "name": "Isha"},
            {"emp_id": 103, "name": "Deepak"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Unassigned employees check",
                "description": "Verify Isha (dept_id NULL) and Deepak (dept_id 99 non-existent) are returned",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res.some(r => r.name === 'Isha') && res.some(r => r.name === 'Deepak')"
            },
            {
                "id": 2,
                "title": "Assigned employees excluded",
                "description": "Verify Kunal and Meera are excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.name === 'Kunal' || r.name === 'Meera')"
            }
        ],
        "hints": [
            "Hint 1: Use `LEFT JOIN departments d ON e.dept_id = d.dept_id`.",
            "Hint 2: Filter with `WHERE d.dept_id IS NULL` to catch both NULL FKs and orphan FKs."
        ],
        "explanation": "A LEFT JOIN on the parent table `departments` produces NULL for `d.dept_id` whenever the child row has a NULL FK or an invalid dangling pointer.",
        "queryBreakdown": [
            {"clause": "FROM employees e LEFT JOIN departments d", "purpose": "Preserves all employee records."},
            {"clause": "WHERE d.dept_id IS NULL", "purpose": "Isolates unassigned or orphaned employee rows."}
        ]
    },

    # 18. Self Join Pairs in Same Department
    {
        "id": "sql-ch-18",
        "topicId": "sql-joins",
        "title": "Pairs of Colleagues in Same Department",
        "difficulty": "Medium",
        "attribution": "Placement-style (Amazon / Microsoft)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon SDE Technical Interview - Self Join Permutations",
            "role": "SDE-1"
        },
        "prompt": "Write a SQL query to find all unique pairs of employees who belong to the same department. Return `colleague_1`, `colleague_2`, and `department`. Avoid self-pairing and duplicate mirrored pairs (i.e. ensure employee_1 id < employee_2 id). Order by department, then colleague_1.",
        "schema_context": """CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50)
);
INSERT INTO employees VALUES
(1, 'Alice', 'Engineering'),
(2, 'Bob', 'Marketing'),
(3, 'Charlie', 'Engineering'),
(4, 'David', 'Engineering');""",
        "sample_data": [
            {"id": 1, "name": "Alice", "department": "Engineering"},
            {"id": 2, "name": "Bob", "department": "Marketing"},
            {"id": 3, "name": "Charlie", "department": "Engineering"},
            {"id": 4, "name": "David", "department": "Engineering"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT e1.name AS colleague_1, e2.name AS colleague_2, e1.department\nFROM employees e1\nJOIN employees e2 ON ...;",
        "solution_query": "SELECT e1.name AS colleague_1, e2.name AS colleague_2, e1.department FROM employees e1 JOIN employees e2 ON e1.department = e2.department AND e1.id < e2.id ORDER BY e1.department ASC, colleague_1 ASC, colleague_2 ASC;",
        "expected_result": [
            {"colleague_1": "Alice", "colleague_2": "Charlie", "department": "Engineering"},
            {"colleague_1": "Alice", "colleague_2": "David", "department": "Engineering"},
            {"colleague_1": "Charlie", "colleague_2": "David", "department": "Engineering"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Exact pairs count",
                "description": "3 employees in Engineering produce 3 distinct combinations (n*(n-1)/2)",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "No duplicate mirrored pairs",
                "description": "Verify Charlie-Alice or David-Alice do not exist",
                "code": "(res) => Array.isArray(res) && res.every(r => r.colleague_1 !== r.colleague_2)"
            }
        ],
        "hints": [
            "Hint 1: Self-join on `e1.department = e2.department`.",
            "Hint 2: Enforce `AND e1.id < e2.id` to prevent pairing an employee with themselves and eliminate duplicate reverse permutations."
        ],
        "explanation": "Joining a table to itself with `e1.id < e2.id` generates mathematical combinations without duplicates or reflexive pairings.",
        "queryBreakdown": [
            {"clause": "JOIN employees e2 ON e1.department = e2.department", "purpose": "Matches employees in identical department."},
            {"clause": "AND e1.id < e2.id", "purpose": "Eliminates reflexive (Alice, Alice) and inverse (Charlie, Alice) duplicates."}
        ]
    },

    # 19. Three-Way Join: Students, Courses, Instructors
    {
        "id": "sql-ch-19",
        "topicId": "sql-joins",
        "title": "Three-Way Join: Student Enrollments & Instructors",
        "difficulty": "Medium",
        "attribution": "Placement-style (Deloitte / Cognizant)",
        "companyMetadata": {
            "company": "Deloitte",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Deloitte USI Technical Analyst - Multi-Table Joins",
            "role": "Technology Analyst"
        },
        "prompt": "Write a SQL query that joins `enrollments`, `students`, `courses`, and `instructors` to report student `student_name`, `course_title`, and instructor `instructor_name`. Order by `student_name` ascending.",
        "schema_context": """CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_title VARCHAR(100),
    instructor_id INT
);
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT
);
INSERT INTO students VALUES (1, 'Rohan'), (2, 'Sneha');
INSERT INTO instructors VALUES (10, 'Dr. Sharma'), (20, 'Prof. Verma');
INSERT INTO courses VALUES (101, 'Database Systems', 10), (102, 'Operating Systems', 20);
INSERT INTO enrollments VALUES (1, 1, 101), (2, 2, 101), (3, 2, 102);""",
        "sample_data": [
            {"student_name": "Rohan", "course_title": "Database Systems", "instructor_name": "Dr. Sharma"},
            {"student_name": "Sneha", "course_title": "Database Systems", "instructor_name": "Dr. Sharma"},
            {"student_name": "Sneha", "course_title": "Operating Systems", "instructor_name": "Prof. Verma"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT s.name AS student_name, c.course_title, i.name AS instructor_name\nFROM enrollments e\nJOIN students s ON ...\nJOIN courses c ON ...\nJOIN instructors i ON ...\nORDER BY student_name ASC;",
        "solution_query": "SELECT s.name AS student_name, c.course_title, i.name AS instructor_name FROM enrollments e JOIN students s ON e.student_id = s.student_id JOIN courses c ON e.course_id = c.course_id JOIN instructors i ON c.instructor_id = i.instructor_id ORDER BY student_name ASC, course_title ASC;",
        "expected_result": [
            {"student_name": "Rohan", "course_title": "Database Systems", "instructor_name": "Dr. Sharma"},
            {"student_name": "Sneha", "course_title": "Database Systems", "instructor_name": "Dr. Sharma"},
            {"student_name": "Sneha", "course_title": "Operating Systems", "instructor_name": "Prof. Verma"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Joined count check",
                "description": "Verify exactly 3 enrollment records are resolved",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "Instructor matching",
                "description": "Verify Sneha's Operating Systems class is taught by Prof. Verma",
                "code": "(res) => Array.isArray(res) && res.some(r => r.student_name === 'Sneha' && r.course_title === 'Operating Systems' && r.instructor_name === 'Prof. Verma')"
            }
        ],
        "hints": [
            "Hint 1: Start with `enrollments e`, join `students s ON e.student_id = s.student_id`.",
            "Hint 2: Chain join `courses c ON e.course_id = c.course_id`, then join `instructors i ON c.instructor_id = i.instructor_id`."
        ],
        "explanation": "Multi-table joins link normalized entities through sequential foreign-key-to-primary-key references.",
        "queryBreakdown": [
            {"clause": "JOIN students s ON e.student_id = s.student_id", "purpose": "Resolves student details."},
            {"clause": "JOIN courses c ON e.course_id = c.course_id", "purpose": "Resolves course name."},
            {"clause": "JOIN instructors i ON c.instructor_id = i.instructor_id", "purpose": "Resolves faculty name."}
        ]
    },

    # 20. Left Join with Multiple Match Conditions
    {
        "id": "sql-ch-20",
        "topicId": "sql-joins",
        "title": "Active Project Leads Filter via Left Join Predicates",
        "difficulty": "Medium",
        "attribution": "Placement-style (Capgemini / HCLTech)",
        "companyMetadata": {
            "company": "Capgemini",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Capgemini Placement Assessment - SQL ON vs WHERE Clause",
            "role": "Software Engineer"
        },
        "prompt": "Write a SQL query to display `project_name` and the lead employee `name` for all projects. If the project lead is inactive (`is_active = 0`), display NULL for the lead name while retaining the project in the output. Order by `project_id`.",
        "schema_context": """CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    is_active INT
);
CREATE TABLE projects (
    project_id INT PRIMARY KEY,
    project_name VARCHAR(100),
    lead_id INT
);
INSERT INTO employees VALUES
(1, 'Alice', 1),
(2, 'Bob', 0),
(3, 'Charlie', 1);
INSERT INTO projects VALUES
(101, 'Cloud Migration', 1),
(102, 'Legacy Refactor', 2),
(103, 'AI Chatbot', 3);""",
        "sample_data": [
            {"project_id": 101, "project_name": "Cloud Migration", "lead_id": 1},
            {"project_id": 102, "project_name": "Legacy Refactor", "lead_id": 2},
            {"project_id": 103, "project_name": "AI Chatbot", "lead_id": 3}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT p.project_name, e.name AS lead_name\nFROM projects p\nLEFT JOIN employees e ON ...\nORDER BY p.project_id ASC;",
        "solution_query": "SELECT p.project_name, e.name AS lead_name FROM projects p LEFT JOIN employees e ON p.lead_id = e.id AND e.is_active = 1 ORDER BY p.project_id ASC;",
        "expected_result": [
            {"project_name": "Cloud Migration", "lead_name": "Alice"},
            {"project_name": "Legacy Refactor", "lead_name": None},
            {"project_name": "AI Chatbot", "lead_name": "Charlie"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "All projects preserved",
                "description": "Verify all 3 projects remain in result set",
                "code": "(res) => Array.isArray(res) && res.length === 3"
            },
            {
                "id": 2,
                "title": "Inactive lead converted to NULL",
                "description": "Verify Legacy Refactor lead is NULL because Bob is_active=0",
                "code": "(res) => Array.isArray(res) && res.some(r => r.project_name === 'Legacy Refactor' && (r.lead_name === null || r.lead_name === undefined))"
            }
        ],
        "hints": [
            "Hint 1: Place the active condition `AND e.is_active = 1` inside the `ON` clause, NOT the `WHERE` clause!",
            "Hint 2: Placing conditions on the right table in `WHERE` converts a LEFT JOIN into an INNER JOIN."
        ],
        "explanation": "Crucial Interview Concept: An `ON` clause condition filters rows during the join phase, allowing unmatched left rows to survive with NULLs. A `WHERE` clause condition filters after the join, inadvertently dropping rows where `lead_name IS NULL`.",
        "queryBreakdown": [
            {"clause": "LEFT JOIN employees e ON p.lead_id = e.id AND e.is_active = 1", "purpose": "Applies condition during join, preserving all projects."}
        ]
    },

    # 21. Cross Join Product Catalog Variations
    {
        "id": "sql-ch-21",
        "topicId": "sql-joins",
        "title": "Cross Join Product Catalog Matrix",
        "difficulty": "Easy",
        "attribution": "Placement-style (Amazon / Retail)",
        "companyMetadata": {
            "company": "Amazon",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Amazon Retail Catalog - Cartesian Product SKU Generation",
            "role": "Data Engineer"
        },
        "prompt": "Write a SQL query using `CROSS JOIN` to generate all possible combinations of sizes and colors for an inventory matrix. Order by `size_name` ascending, then `color_name` ascending.",
        "schema_context": """CREATE TABLE sizes (
    size_name VARCHAR(10)
);
CREATE TABLE colors (
    color_name VARCHAR(20)
);
INSERT INTO sizes VALUES ('Small'), ('Medium'), ('Large');
INSERT INTO colors VALUES ('Red'), ('Blue');""",
        "sample_data": [
            {"size_name": "Small"}, {"size_name": "Medium"}, {"size_name": "Large"},
            {"color_name": "Red"}, {"color_name": "Blue"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT s.size_name, c.color_name\nFROM sizes s\nCROSS JOIN colors c\nORDER BY ...;",
        "solution_query": "SELECT s.size_name, c.color_name FROM sizes s CROSS JOIN colors c ORDER BY s.size_name ASC, c.color_name ASC;",
        "expected_result": [
            {"size_name": "Large", "color_name": "Blue"},
            {"size_name": "Large", "color_name": "Red"},
            {"size_name": "Medium", "color_name": "Blue"},
            {"size_name": "Medium", "color_name": "Red"},
            {"size_name": "Small", "color_name": "Blue"},
            {"size_name": "Small", "color_name": "Red"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Cartesian product count",
                "description": "3 sizes * 2 colors = 6 combinations",
                "code": "(res) => Array.isArray(res) && res.length === 6"
            },
            {
                "id": 2,
                "title": "Distinct combinations",
                "description": "Verify distinct pairings across all rows",
                "code": "(res) => Array.isArray(res) && res.some(r => r.size_name === 'Small' && r.color_name === 'Red')"
            }
        ],
        "hints": [
            "Hint 1: Use `FROM sizes s CROSS JOIN colors c`.",
            "Hint 2: Order by `s.size_name ASC, c.color_name ASC`."
        ],
        "explanation": "A CROSS JOIN produces the Cartesian product of two tables, multiplying each row of the first relation by every row of the second.",
        "queryBreakdown": [
            {"clause": "FROM sizes s CROSS JOIN colors c", "purpose": "Generates Cartesian product (3 x 2 = 6 rows)."}
        ]
    },

    # 22. Manager Hierarchy with Manager Names
    {
        "id": "sql-ch-22",
        "topicId": "sql-joins",
        "title": "Manager Hierarchy Reporting with COALESCE",
        "difficulty": "Medium",
        "attribution": "Placement-style (TCS / Infosys)",
        "companyMetadata": {
            "company": "Infosys",
            "evidenceType": "ACTUAL_REPORTED",
            "sourceTitle": "Infosys Technical Interview - Self Join & Hierarchy Handling",
            "role": "Systems Engineer Specialist"
        },
        "prompt": "Write a SQL query that displays `employee_name` and their direct `manager_name`. If an employee has no manager (such as the CEO), display 'No Manager' using COALESCE. Order by `employee_name` ascending.",
        "schema_context": """CREATE TABLE staff_hierarchy (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT
);
INSERT INTO staff_hierarchy VALUES
(1, 'Aditi', NULL),
(2, 'Barun', 1),
(3, 'Chandan', 1),
(4, 'Divya', 2);""",
        "sample_data": [
            {"id": 1, "name": "Aditi", "manager_id": None},
            {"id": 2, "name": "Barun", "manager_id": 1},
            {"id": 3, "name": "Chandan", "manager_id": 1},
            {"id": 4, "name": "Divya", "manager_id": 2}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT e.name AS employee_name, COALESCE(m.name, 'No Manager') AS manager_name\nFROM staff_hierarchy e\nLEFT JOIN staff_hierarchy m ON ...\nORDER BY employee_name ASC;",
        "solution_query": "SELECT e.name AS employee_name, COALESCE(m.name, 'No Manager') AS manager_name FROM staff_hierarchy e LEFT JOIN staff_hierarchy m ON e.manager_id = m.id ORDER BY employee_name ASC;",
        "expected_result": [
            {"employee_name": "Aditi", "manager_name": "No Manager"},
            {"employee_name": "Barun", "manager_name": "Aditi"},
            {"employee_name": "Chandan", "manager_name": "Aditi"},
            {"employee_name": "Divya", "manager_name": "Barun"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "CEO handled with No Manager",
                "description": "Verify Aditi has manager_name 'No Manager'",
                "code": "(res) => Array.isArray(res) && res.some(r => r.employee_name === 'Aditi' && r.manager_name === 'No Manager')"
            },
            {
                "id": 2,
                "title": "Subordinates correctly mapped",
                "description": "Verify Divya reports to Barun",
                "code": "(res) => Array.isArray(res) && res.some(r => r.employee_name === 'Divya' && r.manager_name === 'Barun')"
            }
        ],
        "hints": [
            "Hint 1: Use `LEFT JOIN staff_hierarchy m ON e.manager_id = m.id`.",
            "Hint 2: Wrap the manager name in `COALESCE(m.name, 'No Manager')`."
        ],
        "explanation": "A self-LEFT JOIN retains top-level managers whose `manager_id` is NULL. COALESCE replaces NULL values with the fallback text 'No Manager'.",
        "queryBreakdown": [
            {"clause": "COALESCE(m.name, 'No Manager')", "purpose": "Replaces NULL with descriptive fallback string."},
            {"clause": "LEFT JOIN staff_hierarchy m ON e.manager_id = m.id", "purpose": "Self-joins to retrieve supervisor details."}
        ]
    },

    # 23. Unmatched Records Across Two Vendor Lists
    {
        "id": "sql-ch-23",
        "topicId": "sql-joins",
        "title": "Identify Missing Vendors Across Two Systems",
        "difficulty": "Medium",
        "attribution": "Placement-style (Deloitte / System Integration)",
        "companyMetadata": {
            "company": "Deloitte",
            "evidenceType": "COMPANY_STYLE",
            "sourceTitle": "Deloitte Technical Round - Data Migration & Reconciliation",
            "role": "Business Technology Analyst"
        },
        "prompt": "Two procurement systems record vendor IDs: `legacy_vendors` and `new_vendors`. Write a SQL query using `LEFT JOIN` and `UNION` to report all vendor IDs that exist in `legacy_vendors` but are missing from `new_vendors`. Order by `vendor_id`.",
        "schema_context": """CREATE TABLE legacy_vendors (
    vendor_id INT PRIMARY KEY,
    vendor_name VARCHAR(50)
);
CREATE TABLE new_vendors (
    vendor_id INT PRIMARY KEY,
    vendor_name VARCHAR(50)
);
INSERT INTO legacy_vendors VALUES (101, 'Alpha'), (102, 'Beta'), (103, 'Gamma');
INSERT INTO new_vendors VALUES (102, 'Beta'), (104, 'Delta');""",
        "sample_data": [
            {"legacy": "101, 102, 103"},
            {"new": "102, 104"}
        ],
        "starter_query": "-- Write your SQL query below\nSELECT l.vendor_id, l.vendor_name\nFROM legacy_vendors l\nLEFT JOIN new_vendors n ON ...\nWHERE ...;",
        "solution_query": "SELECT l.vendor_id, l.vendor_name FROM legacy_vendors l LEFT JOIN new_vendors n ON l.vendor_id = n.vendor_id WHERE n.vendor_id IS NULL ORDER BY l.vendor_id ASC;",
        "expected_result": [
            {"vendor_id": 101, "vendor_name": "Alpha"},
            {"vendor_id": 103, "vendor_name": "Gamma"}
        ],
        "test_cases": [
            {
                "id": 1,
                "title": "Missing vendors detected",
                "description": "Verify 101 (Alpha) and 103 (Gamma) are identified",
                "code": "(res) => Array.isArray(res) && res.length === 2 && res[0].vendor_id === 101 && res[1].vendor_id === 103"
            },
            {
                "id": 2,
                "title": "Migrated vendor excluded",
                "description": "Verify 102 (Beta) is excluded",
                "code": "(res) => Array.isArray(res) && !res.some(r => r.vendor_id === 102)"
            }
        ],
        "hints": [
            "Hint 1: Left join `legacy_vendors l` with `new_vendors n` on `l.vendor_id = n.vendor_id`.",
            "Hint 2: Filter where `n.vendor_id IS NULL`."
        ],
        "explanation": "An anti-join using LEFT JOIN and IS NULL finds records that exist in the left system but failed to migrate to the right system.",
        "queryBreakdown": [
            {"clause": "FROM legacy_vendors l LEFT JOIN new_vendors n", "purpose": "Compares legacy records with new system."},
            {"clause": "WHERE n.vendor_id IS NULL", "purpose": "Isolates un-migrated legacy vendors."}
        ]
    }
]

print(f"Loaded Part 1: {len(part1_challenges)} challenges.")
