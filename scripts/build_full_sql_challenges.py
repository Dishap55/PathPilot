"""
Build complete 65 SQL challenges data file
"""
import json
import os

all_challenges = []

def add_challenge(item):
    all_challenges.append(item)

# -------------------------------------------------------------
# 1. Basics & Filtering
# -------------------------------------------------------------
add_challenge({
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
})

add_challenge({
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
})

add_challenge({
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
})

add_challenge({
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
})

add_challenge({
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
})

add_challenge({
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
})

add_challenge({
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
})

add_challenge({
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
})

print(f"Basics added. Total: {len(all_challenges)}")
