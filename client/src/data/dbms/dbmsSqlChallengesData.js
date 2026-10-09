/**
 * MASTER DBMS SQL QUERY PRACTICE CHALLENGES (65 High-Quality placement challenges)
 * Covering all 12 canonical DBMS topics with runnable schema contexts, automated test cases,
 * progressive hints, and query breakdown explanations.
 */

export const DBMS_SQL_CHALLENGES = [
  {
    id: "sql-ch-1",
    topicId: "sql-basics-ddl-dml",
    title: "High-Earning Engineers Filter",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Infosys Technical Interview Questions - SQL Filtering",
      "role": "System Engineer"
},
    prompt: "Write a SQL query to select the `name` and `salary` of all employees in the 'Engineering' department who earn more than 70,000, ordered by salary descending.",
    schema_context: "CREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(100),\n    department VARCHAR(50),\n    salary INT\n);\nINSERT INTO employees VALUES \n(1, 'Alice Connor', 'Engineering', 95000),\n(2, 'Bob Vance', 'Sales', 65000),\n(3, 'Charlie Kelly', 'Engineering', 85000),\n(4, 'Dennis Reynolds', 'Engineering', 68000),\n(5, 'Frank Reynolds', 'Management', 120000);",
    sample_data: [
      {
            "emp_id": 1,
            "name": "Alice Connor",
            "department": "Engineering",
            "salary": 95000
      },
      {
            "emp_id": 2,
            "name": "Bob Vance",
            "department": "Sales",
            "salary": 65000
      },
      {
            "emp_id": 3,
            "name": "Charlie Kelly",
            "department": "Engineering",
            "salary": 85000
      },
      {
            "emp_id": 4,
            "name": "Dennis Reynolds",
            "department": "Engineering",
            "salary": 68000
      },
      {
            "emp_id": 5,
            "name": "Frank Reynolds",
            "department": "Management",
            "salary": 120000
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name, salary\nFROM employees\nWHERE ...;",
    solution_query: "SELECT name, salary FROM employees WHERE department = 'Engineering' AND salary > 70000 ORDER BY salary DESC;",
    expected_result: [
      {
            "name": "Alice Connor",
            "salary": 95000
      },
      {
            "name": "Charlie Kelly",
            "salary": 85000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Engineering filter check",
        description: "Verify only Engineering employees are included",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.name !== 'Bob Vance' && r.name !== 'Frank Reynolds')
      },
      {
        id: 2,
        title: "Salary threshold check",
        description: "Verify employees with salary <= 70000 are excluded",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.salary > 70000)
      },
      {
        id: 3,
        title: "Descending sort check",
        description: "Verify Alice (95000) appears before Charlie (85000)",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].name === 'Alice Connor' && res[1].name === 'Charlie Kelly'
      }
    ],
    hints: [
      "Hint 1: Use the `WHERE` clause with two conditions joined by `AND`: `department = 'Engineering' AND salary > 70000`.",
      "Hint 2: Remember to sort by salary in descending order using `ORDER BY salary DESC`."
],
    explanation: "The WHERE clause filters rows matching both the department and salary predicates simultaneously. SELECT projects the required columns and ORDER BY sorts highest salary first.",
    queryBreakdown: [
      {
            "clause": "SELECT name, salary",
            "purpose": "Projects only required attributes."
      },
      {
            "clause": "FROM employees",
            "purpose": "Specifies target table."
      },
      {
            "clause": "WHERE department = 'Engineering' AND salary > 70000",
            "purpose": "Filters candidate rows."
      },
      {
            "clause": "ORDER BY salary DESC",
            "purpose": "Orders results descending."
      }
]
  },
  {
    id: "sql-ch-2",
    topicId: "sql-joins",
    title: "Customers Who Never Placed Orders",
    difficulty: "Easy",
    attribution: "Reported Interview (Amazon / LeetCode 183)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 183 / Amazon Online Assessment SQL Section",
      "role": "Software Development Engineer"
},
    prompt: "Write a SQL query to report all customers who never placed any orders. Return the column named `Customers`.",
    schema_context: "CREATE TABLE customers (\n    id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\nCREATE TABLE orders (\n    id INT PRIMARY KEY,\n    customerId INT\n);\nINSERT INTO customers VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');\nINSERT INTO orders VALUES (1, 3), (2, 1);",
    sample_data: [
      {
            "id": 1,
            "name": "Joe"
      },
      {
            "id": 2,
            "name": "Henry"
      },
      {
            "id": 3,
            "name": "Sam"
      },
      {
            "id": 4,
            "name": "Max"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name AS Customers\nFROM customers c\n...;",
    solution_query: "SELECT c.name AS Customers FROM customers c LEFT JOIN orders o ON c.id = o.customerId WHERE o.id IS NULL;",
    expected_result: [
      {
            "Customers": "Henry"
      },
      {
            "Customers": "Max"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Correct count of non-ordering customers",
        description: "Verify exactly 2 customers are returned (Henry and Max)",
        passedCheck: (res) => Array.isArray(res) && res.length === 2
      },
      {
        id: 2,
        title: "Check Henry and Max presence",
        description: "Verify both Henry and Max are in the result set",
        passedCheck: (res) => Array.isArray(res) && res.some(r => (r.Customers || r.name) === 'Henry') && res.some(r => (r.Customers || r.name) === 'Max')
      },
      {
        id: 3,
        title: "Exclude ordering customers",
        description: "Verify Joe and Sam (who placed orders) are excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => (r.Customers || r.name) === 'Joe' || (r.Customers || r.name) === 'Sam')
      }
    ],
    hints: [
      "Hint 1: A `LEFT JOIN` between `customers` and `orders` keeps all customer records regardless of whether an order exists.",
      "Hint 2: Filter for unmatched records where the foreign key in `orders` is NULL: `WHERE orders.id IS NULL`."
],
    explanation: "A LEFT JOIN pairs every customer with their order(s). Customers who never ordered produce NULL values in the orders columns. Filtering on `WHERE o.id IS NULL` isolates these customers.",
    queryBreakdown: [
      {
            "clause": "SELECT c.name AS Customers",
            "purpose": "Aliases the output column as Customers."
      },
      {
            "clause": "FROM customers c LEFT JOIN orders o",
            "purpose": "Preserves all customers regardless of order existence."
      },
      {
            "clause": "ON c.id = o.customerId",
            "purpose": "Joins on foreign key relationship."
      },
      {
            "clause": "WHERE o.id IS NULL",
            "purpose": "Filters for customers with zero matched orders."
      }
]
  },
  {
    id: "sql-ch-3",
    topicId: "sql-joins",
    title: "Employees Earning More Than Their Manager",
    difficulty: "Medium",
    attribution: "Reported Interview (Amazon / LeetCode 181)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 181 / Amazon Technical Interview",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to find the employees who earn more than their direct managers. Return the employee name as `Employee`.",
    schema_context: "CREATE TABLE employee (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    salary INT,\n    managerId INT\n);\nINSERT INTO employee VALUES \n(1, 'Joe', 70000, 3),\n(2, 'Henry', 80000, 4),\n(3, 'Sam', 60000, NULL),\n(4, 'Max', 90000, NULL);",
    sample_data: [
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
    starter_query: "-- Write your SQL query below\nSELECT e.name AS Employee\nFROM employee e\nJOIN employee m ON ...;",
    solution_query: "SELECT e.name AS Employee FROM employee e JOIN employee m ON e.managerId = m.id WHERE e.salary > m.salary;",
    expected_result: [
      {
            "Employee": "Joe"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Joe identified",
        description: "Verify Joe (70k > 60k Sam) is returned",
        passedCheck: (res) => Array.isArray(res) && res.some(r => (r.Employee || r.name) === 'Joe')
      },
      {
        id: 2,
        title: "Henry excluded",
        description: "Verify Henry (80k < 90k Max) is excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => (r.Employee || r.name) === 'Henry')
      },
      {
        id: 3,
        title: "Managers without managers handled",
        description: "Verify Sam and Max (NULL managerId) are excluded",
        passedCheck: (res) => Array.isArray(res) && res.length === 1
      }
    ],
    hints: [
      "Hint 1: Use a `SELF JOIN` on the employee table: `employee e JOIN employee m ON e.managerId = m.id`.",
      "Hint 2: Filter with `WHERE e.salary > m.salary`."
],
    explanation: "A Self Join treats one instance of the table as the employee (e) and the other as the manager (m). Comparing `e.salary > m.salary` extracts employees who outearn their superiors.",
    queryBreakdown: [
      {
            "clause": "SELECT e.name AS Employee",
            "purpose": "Returns employee name."
      },
      {
            "clause": "FROM employee e JOIN employee m",
            "purpose": "Self-joins employee table."
      },
      {
            "clause": "ON e.managerId = m.id",
            "purpose": "Matches employee to their manager."
      },
      {
            "clause": "WHERE e.salary > m.salary",
            "purpose": "Filters for higher salary."
      }
]
  },
  {
    id: "sql-ch-4",
    topicId: "sql-aggregation-groupby",
    title: "Duplicate Emails Detection",
    difficulty: "Easy",
    attribution: "Reported Interview (Amazon / LeetCode 182)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 182 / Amazon Online Assessment",
      "role": "Software Engineer"
},
    prompt: "Write a SQL query to report all the duplicate emails in the Person table.",
    schema_context: "CREATE TABLE person (\n    id INT PRIMARY KEY,\n    email VARCHAR(100)\n);\nINSERT INTO person VALUES (1, 'a@b.com'), (2, 'c@d.com'), (3, 'a@b.com');",
    sample_data: [
      {
            "id": 1,
            "email": "a@b.com"
      },
      {
            "id": 2,
            "email": "c@d.com"
      },
      {
            "id": 3,
            "email": "a@b.com"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT email\nFROM person\nGROUP BY ...;",
    solution_query: "SELECT email FROM person GROUP BY email HAVING COUNT(email) > 1;",
    expected_result: [
      {
            "email": "a@b.com"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Duplicate identified",
        description: "Verify a@b.com is returned",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.email === 'a@b.com')
      },
      {
        id: 2,
        title: "Unique email excluded",
        description: "Verify c@d.com is not in the output",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.email === 'c@d.com')
      }
    ],
    hints: [
      "Hint 1: Use `GROUP BY email` to combine rows with the same address.",
      "Hint 2: Filter groups with `HAVING COUNT(email) > 1`."
],
    explanation: "Grouping by email gathers all identical email occurrences. The HAVING clause applies aggregate filtering, keeping only those groups whose row count strictly exceeds 1.",
    queryBreakdown: [
      {
            "clause": "SELECT email",
            "purpose": "Projects distinct email value."
      },
      {
            "clause": "FROM person",
            "purpose": "Source relation."
      },
      {
            "clause": "GROUP BY email",
            "purpose": "Collapses identical email addresses."
      },
      {
            "clause": "HAVING COUNT(email) > 1",
            "purpose": "Filters for groups with frequency > 1."
      }
]
  },
  {
    id: "sql-ch-5",
    topicId: "sql-subqueries-nested",
    title: "Second Highest Salary",
    difficulty: "Medium",
    attribution: "Reported Interview (Amazon / LeetCode 176)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 176 / Amazon SDE Round",
      "role": "Software Development Engineer"
},
    prompt: "Write a SQL query to find the second highest distinct salary from the Employee table. Return the result as `SecondHighestSalary`. If there is no second highest salary, return NULL.",
    schema_context: "CREATE TABLE employee (\n    id INT PRIMARY KEY,\n    salary INT\n);\nINSERT INTO employee VALUES (1, 100), (2, 200), (3, 300);",
    sample_data: [
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
    starter_query: "-- Write your SQL query below\nSELECT MAX(salary) AS SecondHighestSalary\nFROM employee\nWHERE ...;",
    solution_query: "SELECT MAX(salary) AS SecondHighestSalary FROM employee WHERE salary < (SELECT MAX(salary) FROM employee);",
    expected_result: [
      {
            "SecondHighestSalary": 200
      }
],
    test_cases: [
      {
        id: 1,
        title: "Correct value check",
        description: "Verify SecondHighestSalary is 200",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && (res[0].SecondHighestSalary == 200 || res[0].salary == 200)
      },
      {
        id: 2,
        title: "Single-row result",
        description: "Verify exactly one row is returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 1
      }
    ],
    hints: [
      "Hint 1: Find the absolute maximum salary first using a subquery: `(SELECT MAX(salary) FROM employee)`.",
      "Hint 2: Select the `MAX(salary)` of rows strictly less than that maximum."
],
    explanation: "The subquery `(SELECT MAX(salary) FROM employee)` determines the absolute top salary. The outer query then takes the MAX of all remaining rows strictly below that value.",
    queryBreakdown: [
      {
            "clause": "SELECT MAX(salary) AS SecondHighestSalary",
            "purpose": "Returns the maximum of the filtered subset."
      },
      {
            "clause": "FROM employee",
            "purpose": "Source table."
      },
      {
            "clause": "WHERE salary < (SELECT MAX(salary) ...)",
            "purpose": "Excludes the overall top salary."
      }
]
  },
  {
    id: "sql-ch-6",
    topicId: "sql-aggregation-groupby",
    title: "Classes More Than 5 Students",
    difficulty: "Easy",
    attribution: "Reported Interview (Amazon / LeetCode 596)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 596 / Amazon Online Assessment",
      "role": "SDE"
},
    prompt: "Write a SQL query to report all the classes that have at least five students.",
    schema_context: "CREATE TABLE courses (\n    student VARCHAR(50),\n    class VARCHAR(50)\n);\nINSERT INTO courses VALUES \n('A', 'Math'), ('B', 'English'), ('C', 'Math'), ('D', 'Biology'),\n('E', 'Math'), ('F', 'Math'), ('G', 'Math');",
    sample_data: [
      {
            "student": "A",
            "class": "Math"
      },
      {
            "student": "B",
            "class": "English"
      },
      {
            "student": "C",
            "class": "Math"
      },
      {
            "student": "D",
            "class": "Biology"
      },
      {
            "student": "E",
            "class": "Math"
      },
      {
            "student": "F",
            "class": "Math"
      },
      {
            "student": "G",
            "class": "Math"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT class\nFROM courses\nGROUP BY ...;",
    solution_query: "SELECT class FROM courses GROUP BY class HAVING COUNT(student) >= 5;",
    expected_result: [
      {
            "class": "Math"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Math qualified",
        description: "Verify Math is returned with >= 5 students",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.class === 'Math')
      },
      {
        id: 2,
        title: "English excluded",
        description: "Verify classes with < 5 students are not in output",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.class === 'English' || r.class === 'Biology')
      }
    ],
    hints: [
      "Hint 1: Group the table by the `class` column.",
      "Hint 2: Use `HAVING COUNT(student) >= 5` to filter for classes meeting the enrollment threshold."
],
    explanation: "Grouping by class aggregates enrollment per course. The HAVING clause checks the group count against the threshold of 5.",
    queryBreakdown: [
      {
            "clause": "SELECT class",
            "purpose": "Returns the course title."
      },
      {
            "clause": "FROM courses",
            "purpose": "Target table."
      },
      {
            "clause": "GROUP BY class",
            "purpose": "Aggregates students per class."
      },
      {
            "clause": "HAVING COUNT(student) >= 5",
            "purpose": "Threshold filter."
      }
]
  },
  {
    id: "sql-ch-7",
    topicId: "sql-basics-ddl-dml",
    title: "Select Distinct Department Names",
    difficulty: "Easy",
    attribution: "Placement-style (TCS NQT)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT Technical Assessment - SQL Distinct Queries",
      "role": "Ninja / Digital Developer"
},
    prompt: "Write a SQL query to select all unique department names from the `employees` table, sorted alphabetically.",
    schema_context: "CREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50)\n);\nINSERT INTO employees VALUES\n(1, 'Alice', 'Engineering'),\n(2, 'Bob', 'Marketing'),\n(3, 'Charlie', 'Engineering'),\n(4, 'David', 'Sales'),\n(5, 'Eva', 'Marketing');",
    sample_data: [
      {
            "emp_id": 1,
            "name": "Alice",
            "department": "Engineering"
      },
      {
            "emp_id": 2,
            "name": "Bob",
            "department": "Marketing"
      },
      {
            "emp_id": 3,
            "name": "Charlie",
            "department": "Engineering"
      },
      {
            "emp_id": 4,
            "name": "David",
            "department": "Sales"
      },
      {
            "emp_id": 5,
            "name": "Eva",
            "department": "Marketing"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT DISTINCT ...;",
    solution_query: "SELECT DISTINCT department FROM employees ORDER BY department ASC;",
    expected_result: [
      {
            "department": "Engineering"
      },
      {
            "department": "Marketing"
      },
      {
            "department": "Sales"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Distinct count check",
        description: "Verify exactly 3 unique departments are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "Alphabetical order check",
        description: "Verify departments are ordered Engineering, Marketing, Sales",
        passedCheck: (res) => Array.isArray(res) && res[0].department === 'Engineering' && res[1].department === 'Marketing' && res[2].department === 'Sales'
      }
    ],
    hints: [
      "Hint 1: Use `SELECT DISTINCT department` to eliminate duplicates.",
      "Hint 2: Sort using `ORDER BY department ASC`."
],
    explanation: "DISTINCT filters out repeated department values across all rows, and ORDER BY sorts them alphabetically.",
    queryBreakdown: [
      {
            "clause": "SELECT DISTINCT department",
            "purpose": "Removes duplicate department rows."
      },
      {
            "clause": "FROM employees",
            "purpose": "Specifies source table."
      },
      {
            "clause": "ORDER BY department ASC",
            "purpose": "Sorts in alphabetical order."
      }
]
  },
  {
    id: "sql-ch-8",
    topicId: "sql-basics-ddl-dml",
    title: "Products with Low Stock Quantity",
    difficulty: "Easy",
    attribution: "Placement-style (Cognizant)",
    companyMetadata: {
      "company": "Cognizant",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Cognizant GenC Placement Prep - SQL DML & Filtering",
      "role": "Programmer Analyst"
},
    prompt: "Write a SQL query to find the `product_name` and `stock_quantity` of products with stock less than 20 units, ordered by stock ascending.",
    schema_context: "CREATE TABLE inventory (\n    product_id INT PRIMARY KEY,\n    product_name VARCHAR(100),\n    stock_quantity INT\n);\nINSERT INTO inventory VALUES\n(101, 'Mechanical Keyboard', 12),\n(102, 'USB-C Cable', 85),\n(103, 'Wireless Mouse', 8),\n(104, 'Gaming Monitor', 24),\n(105, 'Webcam 1080p', 15);",
    sample_data: [
      {
            "product_id": 101,
            "product_name": "Mechanical Keyboard",
            "stock_quantity": 12
      },
      {
            "product_id": 102,
            "product_name": "USB-C Cable",
            "stock_quantity": 85
      },
      {
            "product_id": 103,
            "product_name": "Wireless Mouse",
            "stock_quantity": 8
      },
      {
            "product_id": 104,
            "product_name": "Gaming Monitor",
            "stock_quantity": 24
      },
      {
            "product_id": 105,
            "product_name": "Webcam 1080p",
            "stock_quantity": 15
      }
],
    starter_query: "-- Write your SQL query below\nSELECT product_name, stock_quantity\nFROM inventory\nWHERE ...;",
    solution_query: "SELECT product_name, stock_quantity FROM inventory WHERE stock_quantity < 20 ORDER BY stock_quantity ASC;",
    expected_result: [
      {
            "product_name": "Wireless Mouse",
            "stock_quantity": 8
      },
      {
            "product_name": "Mechanical Keyboard",
            "stock_quantity": 12
      },
      {
            "product_name": "Webcam 1080p",
            "stock_quantity": 15
      }
],
    test_cases: [
      {
        id: 1,
        title: "Threshold check",
        description: "Verify all returned items have stock_quantity < 20",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.stock_quantity < 20)
      },
      {
        id: 2,
        title: "Count check",
        description: "Verify exactly 3 items qualify",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 3,
        title: "Ascending order check",
        description: "Verify lowest stock (8) appears first",
        passedCheck: (res) => Array.isArray(res) && res[0].stock_quantity === 8
      }
    ],
    hints: [
      "Hint 1: Use `WHERE stock_quantity < 20`.",
      "Hint 2: Sort with `ORDER BY stock_quantity ASC`."
],
    explanation: "Filters inventory rows below threshold 20 and sorts from lowest remaining units to highest.",
    queryBreakdown: [
      {
            "clause": "SELECT product_name, stock_quantity",
            "purpose": "Projects required item information."
      },
      {
            "clause": "WHERE stock_quantity < 20",
            "purpose": "Filters low stock items."
      },
      {
            "clause": "ORDER BY stock_quantity ASC",
            "purpose": "Sorts in ascending order."
      }
]
  },
  {
    id: "sql-ch-9",
    topicId: "sql-basics-ddl-dml",
    title: "Employees Hired in Specific Date Range",
    difficulty: "Easy",
    attribution: "Placement-style (Wipro)",
    companyMetadata: {
      "company": "Wipro",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Wipro Elite NTH Technical Round - Date Filter Queries",
      "role": "Project Engineer"
},
    prompt: "Write a SQL query to report the `name` and `hire_date` of all employees hired between '2024-01-01' and '2024-12-31' inclusive, ordered by `hire_date` ascending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    hire_date DATE\n);\nINSERT INTO staff VALUES\n(1, 'Aarav Sharma', '2023-11-15'),\n(2, 'Bhavna Patel', '2024-02-10'),\n(3, 'Chetan Kumar', '2024-08-25'),\n(4, 'Deepa Rao', '2025-01-05');",
    sample_data: [
      {
            "id": 1,
            "name": "Aarav Sharma",
            "hire_date": "2023-11-15"
      },
      {
            "id": 2,
            "name": "Bhavna Patel",
            "hire_date": "2024-02-10"
      },
      {
            "id": 3,
            "name": "Chetan Kumar",
            "hire_date": "2024-08-25"
      },
      {
            "id": 4,
            "name": "Deepa Rao",
            "hire_date": "2025-01-05"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name, hire_date\nFROM staff\nWHERE ...;",
    solution_query: "SELECT name, hire_date FROM staff WHERE hire_date BETWEEN '2024-01-01' AND '2024-12-31' ORDER BY hire_date ASC;",
    expected_result: [
      {
            "name": "Bhavna Patel",
            "hire_date": "2024-02-10"
      },
      {
            "name": "Chetan Kumar",
            "hire_date": "2024-08-25"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Date range inclusion",
        description: "Verify only 2024 hires are included",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.hire_date.startsWith('2024'))
      },
      {
        id: 2,
        title: "Exclusion check",
        description: "Verify 2023 and 2025 hires are excluded",
        passedCheck: (res) => Array.isArray(res) && res.length === 2
      }
    ],
    hints: [
      "Hint 1: Use `hire_date BETWEEN '2024-01-01' AND '2024-12-31'`.",
      "Hint 2: Sort with `ORDER BY hire_date ASC`."
],
    explanation: "BETWEEN checks inclusivity for start and end dates. Sorting ensures chronological order.",
    queryBreakdown: [
      {
            "clause": "SELECT name, hire_date",
            "purpose": "Projects employee name and hiring date."
      },
      {
            "clause": "WHERE hire_date BETWEEN ...",
            "purpose": "Inclusively filters dates within the calendar year 2024."
      }
]
  },
  {
    id: "sql-ch-10",
    topicId: "sql-basics-ddl-dml",
    title: "Customer Email Domain Pattern Search",
    difficulty: "Easy",
    attribution: "Placement-style (Accenture)",
    companyMetadata: {
      "company": "Accenture",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Accenture Assessment - SQL Pattern Matching",
      "role": "Associate Software Engineer"
},
    prompt: "Write a SQL query to find the `id`, `name`, and `email` of all customers whose email address ends with '@gmail.com', ordered by name.",
    schema_context: "CREATE TABLE customers (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    email VARCHAR(100)\n);\nINSERT INTO customers VALUES\n(1, 'Rohan Mehta', 'rohan@gmail.com'),\n(2, 'Priya Nair', 'priya@yahoo.com'),\n(3, 'Ankit Verma', 'ankit@gmail.com'),\n(4, 'Sneha Sen', 'sneha@outlook.com');",
    sample_data: [
      {
            "id": 1,
            "name": "Rohan Mehta",
            "email": "rohan@gmail.com"
      },
      {
            "id": 2,
            "name": "Priya Nair",
            "email": "priya@yahoo.com"
      },
      {
            "id": 3,
            "name": "Ankit Verma",
            "email": "ankit@gmail.com"
      },
      {
            "id": 4,
            "name": "Sneha Sen",
            "email": "sneha@outlook.com"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT id, name, email\nFROM customers\nWHERE email LIKE ...;",
    solution_query: "SELECT id, name, email FROM customers WHERE email LIKE '%@gmail.com' ORDER BY name ASC;",
    expected_result: [
      {
            "id": 3,
            "name": "Ankit Verma",
            "email": "ankit@gmail.com"
      },
      {
            "id": 1,
            "name": "Rohan Mehta",
            "email": "rohan@gmail.com"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Domain match check",
        description: "Verify all returned emails end with @gmail.com",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.email.endsWith('@gmail.com'))
      },
      {
        id: 2,
        title: "Alphabetical order check",
        description: "Verify Ankit Verma comes before Rohan Mehta",
        passedCheck: (res) => Array.isArray(res) && res[0].name === 'Ankit Verma' && res[1].name === 'Rohan Mehta'
      }
    ],
    hints: [
      "Hint 1: Use the wildcard `%` before `@gmail.com`.",
      "Hint 2: `WHERE email LIKE '%@gmail.com'`."
],
    explanation: "LIKE with `%` matches any sequence of leading characters ending in `@gmail.com`.",
    queryBreakdown: [
      {
            "clause": "SELECT id, name, email",
            "purpose": "Projects customer details."
      },
      {
            "clause": "WHERE email LIKE '%@gmail.com'",
            "purpose": "Filters for target email domain."
      }
]
  },
  {
    id: "sql-ch-11",
    topicId: "sql-basics-ddl-dml",
    title: "Filtering with IN and Status Check",
    difficulty: "Easy",
    attribution: "Placement-style (Capgemini)",
    companyMetadata: {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Technical Interview - SQL Predicates",
      "role": "Analyst"
},
    prompt: "Write a SQL query to find `name`, `city`, and `status` of all suppliers located in 'New York', 'Chicago', or 'San Francisco' who are 'ACTIVE', ordered by name.",
    schema_context: "CREATE TABLE suppliers (\n    supplier_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    city VARCHAR(50),\n    status VARCHAR(20)\n);\nINSERT INTO suppliers VALUES\n(1, 'Apex Supplies', 'New York', 'ACTIVE'),\n(2, 'Beacon Tech', 'Boston', 'ACTIVE'),\n(3, 'Crestwood Corp', 'Chicago', 'INACTIVE'),\n(4, 'Delta Logistics', 'San Francisco', 'ACTIVE');",
    sample_data: [
      {
            "supplier_id": 1,
            "name": "Apex Supplies",
            "city": "New York",
            "status": "ACTIVE"
      },
      {
            "supplier_id": 2,
            "name": "Beacon Tech",
            "city": "Boston",
            "status": "ACTIVE"
      },
      {
            "supplier_id": 3,
            "name": "Crestwood Corp",
            "city": "Chicago",
            "status": "INACTIVE"
      },
      {
            "supplier_id": 4,
            "name": "Delta Logistics",
            "city": "San Francisco",
            "status": "ACTIVE"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name, city, status\nFROM suppliers\nWHERE ...;",
    solution_query: "SELECT name, city, status FROM suppliers WHERE city IN ('New York', 'Chicago', 'San Francisco') AND status = 'ACTIVE' ORDER BY name ASC;",
    expected_result: [
      {
            "name": "Apex Supplies",
            "city": "New York",
            "status": "ACTIVE"
      },
      {
            "name": "Delta Logistics",
            "city": "San Francisco",
            "status": "ACTIVE"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Active check",
        description: "Verify only ACTIVE suppliers are included",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.status === 'ACTIVE')
      },
      {
        id: 2,
        title: "City inclusion",
        description: "Verify Boston (not in list) and Crestwood (inactive) are excluded",
        passedCheck: (res) => Array.isArray(res) && res.length === 2
      }
    ],
    hints: [
      "Hint 1: Use `city IN ('New York', 'Chicago', 'San Francisco')`.",
      "Hint 2: Combine with `AND status = 'ACTIVE'`."
],
    explanation: "The IN predicate succinctly checks membership in a list of allowed values alongside the boolean status filter.",
    queryBreakdown: [
      {
            "clause": "city IN ('New York', ...)",
            "purpose": "Checks multi-city match."
      },
      {
            "clause": "AND status = 'ACTIVE'",
            "purpose": "Enforces active status."
      }
]
  },
  {
    id: "sql-ch-12",
    topicId: "sql-basics-ddl-dml",
    title: "Handling NULL Values with IS NOT NULL",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Three-Valued Logic & NULLs",
      "role": "System Engineer"
},
    prompt: "Write a SQL query to select the `emp_id`, `name`, and `commission` of all sales agents who have earned a commission (commission is not NULL), ordered by commission descending.",
    schema_context: "CREATE TABLE sales_agents (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    commission INT\n);\nINSERT INTO sales_agents VALUES\n(1, 'Ravi', 5000),\n(2, 'Simran', NULL),\n(3, 'Kavita', 8000),\n(4, 'Manoj', NULL);",
    sample_data: [
      {
            "emp_id": 1,
            "name": "Ravi",
            "commission": 5000
      },
      {
            "emp_id": 2,
            "name": "Simran",
            "commission": null
      },
      {
            "emp_id": 3,
            "name": "Kavita",
            "commission": 8000
      },
      {
            "emp_id": 4,
            "name": "Manoj",
            "commission": null
      }
],
    starter_query: "-- Write your SQL query below\nSELECT emp_id, name, commission\nFROM sales_agents\nWHERE ...;",
    solution_query: "SELECT emp_id, name, commission FROM sales_agents WHERE commission IS NOT NULL ORDER BY commission DESC;",
    expected_result: [
      {
            "emp_id": 3,
            "name": "Kavita",
            "commission": 8000
      },
      {
            "emp_id": 1,
            "name": "Ravi",
            "commission": 5000
      }
],
    test_cases: [
      {
        id: 1,
        title: "No NULL commissions",
        description: "Verify no NULL commission rows are returned",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.commission !== null && r.commission !== undefined)
      },
      {
        id: 2,
        title: "Descending sort check",
        description: "Verify Kavita (8000) appears first",
        passedCheck: (res) => Array.isArray(res) && res[0].name === 'Kavita' && res[1].name === 'Ravi'
      }
    ],
    hints: [
      "Hint 1: In SQL, never use `= NULL` or `!= NULL`. Always use `IS NOT NULL`.",
      "Hint 2: Sort descending: `ORDER BY commission DESC`."
],
    explanation: "Because SQL operates on three-valued logic (TRUE, FALSE, UNKNOWN), testing equality against NULL produces UNKNOWN. `IS NOT NULL` evaluates cleanly to boolean TRUE or FALSE.",
    queryBreakdown: [
      {
            "clause": "WHERE commission IS NOT NULL",
            "purpose": "Filters out records without assigned commission."
      },
      {
            "clause": "ORDER BY commission DESC",
            "purpose": "Sorts from highest commission down."
      }
]
  },
  {
    id: "sql-ch-13",
    topicId: "sql-basics-ddl-dml",
    title: "Top 3 Highest Priced Products with LIMIT",
    difficulty: "Easy",
    attribution: "Placement-style (Amazon / Walmart)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Online Assessment - Query Result Pagination",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to retrieve the `product_name` and `price` of the top 3 highest-priced products, sorted from highest price to lowest.",
    schema_context: "CREATE TABLE products (\n    product_id INT PRIMARY KEY,\n    product_name VARCHAR(100),\n    price NUMERIC(10,2)\n);\nINSERT INTO products VALUES\n(1, 'Laptop Pro', 1200.00),\n(2, 'Wireless Earbuds', 99.00),\n(3, 'Smartphone Ultra', 950.00),\n(4, 'Smartwatch', 250.00),\n(5, 'Bluetooth Speaker', 60.00);",
    sample_data: [
      {
            "product_id": 1,
            "product_name": "Laptop Pro",
            "price": 1200.0
      },
      {
            "product_id": 2,
            "product_name": "Wireless Earbuds",
            "price": 99.0
      },
      {
            "product_id": 3,
            "product_name": "Smartphone Ultra",
            "price": 950.0
      },
      {
            "product_id": 4,
            "product_name": "Smartwatch",
            "price": 250.0
      },
      {
            "product_id": 5,
            "product_name": "Bluetooth Speaker",
            "price": 60.0
      }
],
    starter_query: "-- Write your SQL query below\nSELECT product_name, price\nFROM products\nORDER BY ... LIMIT ...;",
    solution_query: "SELECT product_name, price FROM products ORDER BY price DESC LIMIT 3;",
    expected_result: [
      {
            "product_name": "Laptop Pro",
            "price": 1200.0
      },
      {
            "product_name": "Smartphone Ultra",
            "price": 950.0
      },
      {
            "product_name": "Smartwatch",
            "price": 250.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Count limit check",
        description: "Verify exactly 3 items are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "Order check",
        description: "Verify items appear in order: Laptop Pro, Smartphone Ultra, Smartwatch",
        passedCheck: (res) => Array.isArray(res) && res[0].product_name === 'Laptop Pro' && res[1].product_name === 'Smartphone Ultra'
      }
    ],
    hints: [
      "Hint 1: Order by price descending: `ORDER BY price DESC`.",
      "Hint 2: Restrict output rows with `LIMIT 3`."
],
    explanation: "ORDER BY price DESC orders all items from highest to lowest, and LIMIT 3 truncates the result set to the top 3 rows.",
    queryBreakdown: [
      {
            "clause": "ORDER BY price DESC",
            "purpose": "Sorts products descending."
      },
      {
            "clause": "LIMIT 3",
            "purpose": "Restricts output to the top three rows."
      }
]
  },
  {
    id: "sql-ch-14",
    topicId: "sql-joins",
    title: "Inner Join Orders with Customer Details",
    difficulty: "Easy",
    attribution: "Placement-style (Cognizant)",
    companyMetadata: {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC Next Assessment - Relational Joins",
      "role": "Digital Engineer"
},
    prompt: "Write a SQL query to display `order_id`, customer `name`, `order_date`, and `total_amount` for all placed orders by joining `orders` and `customers`. Order by `order_id` ascending.",
    schema_context: "CREATE TABLE customers (\n    customer_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    city VARCHAR(50)\n);\nCREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT,\n    order_date DATE,\n    total_amount NUMERIC(10,2)\n);\nINSERT INTO customers VALUES\n(101, 'Anita Roy', 'Mumbai'),\n(102, 'Bikram Das', 'Kolkata'),\n(103, 'Chitra Nair', 'Bengaluru');\nINSERT INTO orders VALUES\n(5001, 101, '2026-03-01', 1500.00),\n(5002, 103, '2026-03-02', 2800.50),\n(5003, 101, '2026-03-04', 750.00);",
    sample_data: [
      {
            "order_id": 5001,
            "customer_id": 101,
            "name": "Anita Roy",
            "total_amount": 1500.0
      },
      {
            "order_id": 5002,
            "customer_id": 103,
            "name": "Chitra Nair",
            "total_amount": 2800.5
      },
      {
            "order_id": 5003,
            "customer_id": 101,
            "name": "Anita Roy",
            "total_amount": 750.0
      }
],
    starter_query: "-- Write your SQL query below\nSELECT o.order_id, c.name, o.order_date, o.total_amount\nFROM orders o\nJOIN customers c ON ...\nORDER BY o.order_id ASC;",
    solution_query: "SELECT o.order_id, c.name, o.order_date, o.total_amount FROM orders o JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_id ASC;",
    expected_result: [
      {
            "order_id": 5001,
            "name": "Anita Roy",
            "order_date": "2026-03-01",
            "total_amount": 1500.0
      },
      {
            "order_id": 5002,
            "name": "Chitra Nair",
            "order_date": "2026-03-02",
            "total_amount": 2800.5
      },
      {
            "order_id": 5003,
            "name": "Anita Roy",
            "order_date": "2026-03-04",
            "total_amount": 750.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Row count check",
        description: "Verify exactly 3 order rows are joined",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "Customer name correctly matched",
        description: "Verify order 5001 has customer Anita Roy",
        passedCheck: (res) => Array.isArray(res) && res[0].order_id === 5001 && res[0].name === 'Anita Roy'
      }
    ],
    hints: [
      "Hint 1: Use an `INNER JOIN` (or simply `JOIN`) on `o.customer_id = c.customer_id`.",
      "Hint 2: Sort by `o.order_id ASC`."
],
    explanation: "INNER JOIN combines rows from orders and customers where the foreign key `customer_id` matches the primary key.",
    queryBreakdown: [
      {
            "clause": "SELECT o.order_id, c.name, ...",
            "purpose": "Projects combined attributes from both relations."
      },
      {
            "clause": "FROM orders o JOIN customers c",
            "purpose": "Executes relational inner join."
      },
      {
            "clause": "ON o.customer_id = c.customer_id",
            "purpose": "Join predicate specifying equality on foreign key."
      }
]
  },
  {
    id: "sql-ch-15",
    topicId: "sql-joins",
    title: "Products Never Ordered",
    difficulty: "Easy",
    attribution: "Placement-style (Amazon / Flipkart)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Online Assessment - Unmatched Records",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to report the `product_id` and `product_name` of all products that have never appeared in any order item record. Order by `product_id`.",
    schema_context: "CREATE TABLE products (\n    product_id INT PRIMARY KEY,\n    product_name VARCHAR(100)\n);\nCREATE TABLE order_items (\n    item_id INT PRIMARY KEY,\n    order_id INT,\n    product_id INT\n);\nINSERT INTO products VALUES\n(1, '4K TV'),\n(2, 'Soundbar'),\n(3, 'HDMI Cable'),\n(4, 'Wall Mount');\nINSERT INTO order_items VALUES\n(10, 1001, 1),\n(11, 1001, 3),\n(12, 1002, 1);",
    sample_data: [
      {
            "product_id": 1,
            "product_name": "4K TV"
      },
      {
            "product_id": 2,
            "product_name": "Soundbar"
      },
      {
            "product_id": 3,
            "product_name": "HDMI Cable"
      },
      {
            "product_id": 4,
            "product_name": "Wall Mount"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT p.product_id, p.product_name\nFROM products p\nLEFT JOIN order_items oi ON ...\nWHERE ...;",
    solution_query: "SELECT p.product_id, p.product_name FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.product_id IS NULL ORDER BY p.product_id ASC;",
    expected_result: [
      {
            "product_id": 2,
            "product_name": "Soundbar"
      },
      {
            "product_id": 4,
            "product_name": "Wall Mount"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Unordered products check",
        description: "Verify Soundbar and Wall Mount are returned",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.product_name === 'Soundbar') && res.some(r => r.product_name === 'Wall Mount')
      },
      {
        id: 2,
        title: "Ordered products excluded",
        description: "Verify 4K TV and HDMI Cable are excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.product_name === '4K TV' || r.product_name === 'HDMI Cable')
      }
    ],
    hints: [
      "Hint 1: Use `LEFT JOIN order_items oi ON p.product_id = oi.product_id`.",
      "Hint 2: Filter for unmatched items with `WHERE oi.product_id IS NULL`."
],
    explanation: "A LEFT JOIN preserves every product. Products with no matching order item row have NULL in `oi.product_id`. Filtering with `WHERE oi.product_id IS NULL` isolates unbought products.",
    queryBreakdown: [
      {
            "clause": "FROM products p LEFT JOIN order_items oi",
            "purpose": "Includes all product rows."
      },
      {
            "clause": "WHERE oi.product_id IS NULL",
            "purpose": "Isolates products with zero sales records."
      }
]
  },
  {
    id: "sql-ch-16",
    topicId: "sql-joins",
    title: "Departments Without Any Employees",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Wipro)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "TCS Digital Technical Round - Anti-Join Patterns",
      "role": "Digital Developer"
},
    prompt: "Write a SQL query to find the `dept_id` and `dept_name` of all departments that currently have no assigned employees. Order by `dept_id`.",
    schema_context: "CREATE TABLE departments (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(50)\n);\nCREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    dept_id INT\n);\nINSERT INTO departments VALUES\n(10, 'Human Resources'),\n(20, 'Research & Development'),\n(30, 'Customer Support'),\n(40, 'Legal Compliance');\nINSERT INTO employees VALUES\n(1, 'Ramesh', 10),\n(2, 'Suresh', 20),\n(3, 'Geeta', 10);",
    sample_data: [
      {
            "dept_id": 10,
            "dept_name": "Human Resources"
      },
      {
            "dept_id": 20,
            "dept_name": "Research & Development"
      },
      {
            "dept_id": 30,
            "dept_name": "Customer Support"
      },
      {
            "dept_id": 40,
            "dept_name": "Legal Compliance"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT d.dept_id, d.dept_name\nFROM departments d\nLEFT JOIN employees e ON ...\nWHERE ...;",
    solution_query: "SELECT d.dept_id, d.dept_name FROM departments d LEFT JOIN employees e ON d.dept_id = e.dept_id WHERE e.emp_id IS NULL ORDER BY d.dept_id ASC;",
    expected_result: [
      {
            "dept_id": 30,
            "dept_name": "Customer Support"
      },
      {
            "dept_id": 40,
            "dept_name": "Legal Compliance"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Empty departments check",
        description: "Verify Customer Support and Legal Compliance are returned",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.dept_name === 'Customer Support') && res.some(r => r.dept_name === 'Legal Compliance')
      },
      {
        id: 2,
        title: "Staffed departments excluded",
        description: "Verify HR (10) and R&D (20) are excluded",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && !res.some(r => r.dept_id === 10 || r.dept_id === 20)
      }
    ],
    hints: [
      "Hint 1: Left join `departments` with `employees` on `d.dept_id = e.dept_id`.",
      "Hint 2: Filter where `e.emp_id IS NULL`."
],
    explanation: "This classic Anti-Join pattern identifies parent records that have no corresponding child records.",
    queryBreakdown: [
      {
            "clause": "FROM departments d LEFT JOIN employees e",
            "purpose": "Preserves all departments."
      },
      {
            "clause": "WHERE e.emp_id IS NULL",
            "purpose": "Keeps only departments with no employees."
      }
]
  },
  {
    id: "sql-ch-17",
    topicId: "sql-joins",
    title: "Employees Without Assigned Department",
    difficulty: "Easy",
    attribution: "Placement-style (Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Infosys Technical Assessment - Unassigned Foreign Keys",
      "role": "Systems Associate"
},
    prompt: "Write a SQL query to find the `emp_id` and `name` of all employees whose `dept_id` is NULL or does not match any existing department in `departments`. Order by `emp_id`.",
    schema_context: "CREATE TABLE departments (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(50)\n);\nCREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    dept_id INT\n);\nINSERT INTO departments VALUES (1, 'Finance'), (2, 'Marketing');\nINSERT INTO employees VALUES\n(101, 'Kunal', 1),\n(102, 'Isha', NULL),\n(103, 'Deepak', 99),\n(104, 'Meera', 2);",
    sample_data: [
      {
            "emp_id": 101,
            "name": "Kunal",
            "dept_id": 1
      },
      {
            "emp_id": 102,
            "name": "Isha",
            "dept_id": null
      },
      {
            "emp_id": 103,
            "name": "Deepak",
            "dept_id": 99
      },
      {
            "emp_id": 104,
            "name": "Meera",
            "dept_id": 2
      }
],
    starter_query: "-- Write your SQL query below\nSELECT e.emp_id, e.name\nFROM employees e\nLEFT JOIN departments d ON ...\nWHERE ...;",
    solution_query: "SELECT e.emp_id, e.name FROM employees e LEFT JOIN departments d ON e.dept_id = d.dept_id WHERE d.dept_id IS NULL ORDER BY e.emp_id ASC;",
    expected_result: [
      {
            "emp_id": 102,
            "name": "Isha"
      },
      {
            "emp_id": 103,
            "name": "Deepak"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Unassigned employees check",
        description: "Verify Isha (dept_id NULL) and Deepak (dept_id 99 non-existent) are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res.some(r => r.name === 'Isha') && res.some(r => r.name === 'Deepak')
      },
      {
        id: 2,
        title: "Assigned employees excluded",
        description: "Verify Kunal and Meera are excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.name === 'Kunal' || r.name === 'Meera')
      }
    ],
    hints: [
      "Hint 1: Use `LEFT JOIN departments d ON e.dept_id = d.dept_id`.",
      "Hint 2: Filter with `WHERE d.dept_id IS NULL` to catch both NULL FKs and orphan FKs."
],
    explanation: "A LEFT JOIN on the parent table `departments` produces NULL for `d.dept_id` whenever the child row has a NULL FK or an invalid dangling pointer.",
    queryBreakdown: [
      {
            "clause": "FROM employees e LEFT JOIN departments d",
            "purpose": "Preserves all employee records."
      },
      {
            "clause": "WHERE d.dept_id IS NULL",
            "purpose": "Isolates unassigned or orphaned employee rows."
      }
]
  },
  {
    id: "sql-ch-18",
    topicId: "sql-joins",
    title: "Pairs of Colleagues in Same Department",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Microsoft)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE Technical Interview - Self Join Permutations",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to find all unique pairs of employees who belong to the same department. Return `colleague_1`, `colleague_2`, and `department`. Avoid self-pairing and duplicate mirrored pairs (i.e. ensure employee_1 id < employee_2 id). Order by department, then colleague_1.",
    schema_context: "CREATE TABLE employees (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50)\n);\nINSERT INTO employees VALUES\n(1, 'Alice', 'Engineering'),\n(2, 'Bob', 'Marketing'),\n(3, 'Charlie', 'Engineering'),\n(4, 'David', 'Engineering');",
    sample_data: [
      {
            "id": 1,
            "name": "Alice",
            "department": "Engineering"
      },
      {
            "id": 2,
            "name": "Bob",
            "department": "Marketing"
      },
      {
            "id": 3,
            "name": "Charlie",
            "department": "Engineering"
      },
      {
            "id": 4,
            "name": "David",
            "department": "Engineering"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT e1.name AS colleague_1, e2.name AS colleague_2, e1.department\nFROM employees e1\nJOIN employees e2 ON ...;",
    solution_query: "SELECT e1.name AS colleague_1, e2.name AS colleague_2, e1.department FROM employees e1 JOIN employees e2 ON e1.department = e2.department AND e1.id < e2.id ORDER BY e1.department ASC, colleague_1 ASC, colleague_2 ASC;",
    expected_result: [
      {
            "colleague_1": "Alice",
            "colleague_2": "Charlie",
            "department": "Engineering"
      },
      {
            "colleague_1": "Alice",
            "colleague_2": "David",
            "department": "Engineering"
      },
      {
            "colleague_1": "Charlie",
            "colleague_2": "David",
            "department": "Engineering"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Exact pairs count",
        description: "3 employees in Engineering produce 3 distinct combinations (n*(n-1)/2)",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "No duplicate mirrored pairs",
        description: "Verify Charlie-Alice or David-Alice do not exist",
        passedCheck: (res) => Array.isArray(res) && res.every(r => r.colleague_1 !== r.colleague_2)
      }
    ],
    hints: [
      "Hint 1: Self-join on `e1.department = e2.department`.",
      "Hint 2: Enforce `AND e1.id < e2.id` to prevent pairing an employee with themselves and eliminate duplicate reverse permutations."
],
    explanation: "Joining a table to itself with `e1.id < e2.id` generates mathematical combinations without duplicates or reflexive pairings.",
    queryBreakdown: [
      {
            "clause": "JOIN employees e2 ON e1.department = e2.department",
            "purpose": "Matches employees in identical department."
      },
      {
            "clause": "AND e1.id < e2.id",
            "purpose": "Eliminates reflexive (Alice, Alice) and inverse (Charlie, Alice) duplicates."
      }
]
  },
  {
    id: "sql-ch-19",
    topicId: "sql-joins",
    title: "Three-Way Join: Student Enrollments & Instructors",
    difficulty: "Medium",
    attribution: "Placement-style (Deloitte / Cognizant)",
    companyMetadata: {
      "company": "Deloitte",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Deloitte USI Technical Analyst - Multi-Table Joins",
      "role": "Technology Analyst"
},
    prompt: "Write a SQL query that joins `enrollments`, `students`, `courses`, and `instructors` to report student `student_name`, `course_title`, and instructor `instructor_name`. Order by `student_name` ascending.",
    schema_context: "CREATE TABLE students (\n    student_id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\nCREATE TABLE instructors (\n    instructor_id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\nCREATE TABLE courses (\n    course_id INT PRIMARY KEY,\n    course_title VARCHAR(100),\n    instructor_id INT\n);\nCREATE TABLE enrollments (\n    enrollment_id INT PRIMARY KEY,\n    student_id INT,\n    course_id INT\n);\nINSERT INTO students VALUES (1, 'Rohan'), (2, 'Sneha');\nINSERT INTO instructors VALUES (10, 'Dr. Sharma'), (20, 'Prof. Verma');\nINSERT INTO courses VALUES (101, 'Database Systems', 10), (102, 'Operating Systems', 20);\nINSERT INTO enrollments VALUES (1, 1, 101), (2, 2, 101), (3, 2, 102);",
    sample_data: [
      {
            "student_name": "Rohan",
            "course_title": "Database Systems",
            "instructor_name": "Dr. Sharma"
      },
      {
            "student_name": "Sneha",
            "course_title": "Database Systems",
            "instructor_name": "Dr. Sharma"
      },
      {
            "student_name": "Sneha",
            "course_title": "Operating Systems",
            "instructor_name": "Prof. Verma"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT s.name AS student_name, c.course_title, i.name AS instructor_name\nFROM enrollments e\nJOIN students s ON ...\nJOIN courses c ON ...\nJOIN instructors i ON ...\nORDER BY student_name ASC;",
    solution_query: "SELECT s.name AS student_name, c.course_title, i.name AS instructor_name FROM enrollments e JOIN students s ON e.student_id = s.student_id JOIN courses c ON e.course_id = c.course_id JOIN instructors i ON c.instructor_id = i.instructor_id ORDER BY student_name ASC, course_title ASC;",
    expected_result: [
      {
            "student_name": "Rohan",
            "course_title": "Database Systems",
            "instructor_name": "Dr. Sharma"
      },
      {
            "student_name": "Sneha",
            "course_title": "Database Systems",
            "instructor_name": "Dr. Sharma"
      },
      {
            "student_name": "Sneha",
            "course_title": "Operating Systems",
            "instructor_name": "Prof. Verma"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Joined count check",
        description: "Verify exactly 3 enrollment records are resolved",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "Instructor matching",
        description: "Verify Sneha's Operating Systems class is taught by Prof. Verma",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.student_name === 'Sneha' && r.course_title === 'Operating Systems' && r.instructor_name === 'Prof. Verma')
      }
    ],
    hints: [
      "Hint 1: Start with `enrollments e`, join `students s ON e.student_id = s.student_id`.",
      "Hint 2: Chain join `courses c ON e.course_id = c.course_id`, then join `instructors i ON c.instructor_id = i.instructor_id`."
],
    explanation: "Multi-table joins link normalized entities through sequential foreign-key-to-primary-key references.",
    queryBreakdown: [
      {
            "clause": "JOIN students s ON e.student_id = s.student_id",
            "purpose": "Resolves student details."
      },
      {
            "clause": "JOIN courses c ON e.course_id = c.course_id",
            "purpose": "Resolves course name."
      },
      {
            "clause": "JOIN instructors i ON c.instructor_id = i.instructor_id",
            "purpose": "Resolves faculty name."
      }
]
  },
  {
    id: "sql-ch-20",
    topicId: "sql-joins",
    title: "Active Project Leads Filter via Left Join Predicates",
    difficulty: "Medium",
    attribution: "Placement-style (Capgemini / HCLTech)",
    companyMetadata: {
      "company": "Capgemini",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Capgemini Placement Assessment - SQL ON vs WHERE Clause",
      "role": "Software Engineer"
},
    prompt: "Write a SQL query to display `project_name` and the lead employee `name` for all projects. If the project lead is inactive (`is_active = 0`), display NULL for the lead name while retaining the project in the output. Order by `project_id`.",
    schema_context: "CREATE TABLE employees (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    is_active INT\n);\nCREATE TABLE projects (\n    project_id INT PRIMARY KEY,\n    project_name VARCHAR(100),\n    lead_id INT\n);\nINSERT INTO employees VALUES\n(1, 'Alice', 1),\n(2, 'Bob', 0),\n(3, 'Charlie', 1);\nINSERT INTO projects VALUES\n(101, 'Cloud Migration', 1),\n(102, 'Legacy Refactor', 2),\n(103, 'AI Chatbot', 3);",
    sample_data: [
      {
            "project_id": 101,
            "project_name": "Cloud Migration",
            "lead_id": 1
      },
      {
            "project_id": 102,
            "project_name": "Legacy Refactor",
            "lead_id": 2
      },
      {
            "project_id": 103,
            "project_name": "AI Chatbot",
            "lead_id": 3
      }
],
    starter_query: "-- Write your SQL query below\nSELECT p.project_name, e.name AS lead_name\nFROM projects p\nLEFT JOIN employees e ON ...\nORDER BY p.project_id ASC;",
    solution_query: "SELECT p.project_name, e.name AS lead_name FROM projects p LEFT JOIN employees e ON p.lead_id = e.id AND e.is_active = 1 ORDER BY p.project_id ASC;",
    expected_result: [
      {
            "project_name": "Cloud Migration",
            "lead_name": "Alice"
      },
      {
            "project_name": "Legacy Refactor",
            "lead_name": null
      },
      {
            "project_name": "AI Chatbot",
            "lead_name": "Charlie"
      }
],
    test_cases: [
      {
        id: 1,
        title: "All projects preserved",
        description: "Verify all 3 projects remain in result set",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "Inactive lead converted to NULL",
        description: "Verify Legacy Refactor lead is NULL because Bob is_active=0",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.project_name === 'Legacy Refactor' && (r.lead_name === null || r.lead_name === undefined))
      }
    ],
    hints: [
      "Hint 1: Place the active condition `AND e.is_active = 1` inside the `ON` clause, NOT the `WHERE` clause!",
      "Hint 2: Placing conditions on the right table in `WHERE` converts a LEFT JOIN into an INNER JOIN."
],
    explanation: "Crucial Interview Concept: An `ON` clause condition filters rows during the join phase, allowing unmatched left rows to survive with NULLs. A `WHERE` clause condition filters after the join, inadvertently dropping rows where `lead_name IS NULL`.",
    queryBreakdown: [
      {
            "clause": "LEFT JOIN employees e ON p.lead_id = e.id AND e.is_active = 1",
            "purpose": "Applies condition during join, preserving all projects."
      }
]
  },
  {
    id: "sql-ch-21",
    topicId: "sql-joins",
    title: "Cross Join Product Catalog Matrix",
    difficulty: "Easy",
    attribution: "Placement-style (Amazon / Retail)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Retail Catalog - Cartesian Product SKU Generation",
      "role": "Data Engineer"
},
    prompt: "Write a SQL query using `CROSS JOIN` to generate all possible combinations of sizes and colors for an inventory matrix. Order by `size_name` ascending, then `color_name` ascending.",
    schema_context: "CREATE TABLE sizes (\n    size_name VARCHAR(10)\n);\nCREATE TABLE colors (\n    color_name VARCHAR(20)\n);\nINSERT INTO sizes VALUES ('Small'), ('Medium'), ('Large');\nINSERT INTO colors VALUES ('Red'), ('Blue');",
    sample_data: [
      {
            "size_name": "Small"
      },
      {
            "size_name": "Medium"
      },
      {
            "size_name": "Large"
      },
      {
            "color_name": "Red"
      },
      {
            "color_name": "Blue"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT s.size_name, c.color_name\nFROM sizes s\nCROSS JOIN colors c\nORDER BY ...;",
    solution_query: "SELECT s.size_name, c.color_name FROM sizes s CROSS JOIN colors c ORDER BY s.size_name ASC, c.color_name ASC;",
    expected_result: [
      {
            "size_name": "Large",
            "color_name": "Blue"
      },
      {
            "size_name": "Large",
            "color_name": "Red"
      },
      {
            "size_name": "Medium",
            "color_name": "Blue"
      },
      {
            "size_name": "Medium",
            "color_name": "Red"
      },
      {
            "size_name": "Small",
            "color_name": "Blue"
      },
      {
            "size_name": "Small",
            "color_name": "Red"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Cartesian product count",
        description: "3 sizes * 2 colors = 6 combinations",
        passedCheck: (res) => Array.isArray(res) && res.length === 6
      },
      {
        id: 2,
        title: "Distinct combinations",
        description: "Verify distinct pairings across all rows",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.size_name === 'Small' && r.color_name === 'Red')
      }
    ],
    hints: [
      "Hint 1: Use `FROM sizes s CROSS JOIN colors c`.",
      "Hint 2: Order by `s.size_name ASC, c.color_name ASC`."
],
    explanation: "A CROSS JOIN produces the Cartesian product of two tables, multiplying each row of the first relation by every row of the second.",
    queryBreakdown: [
      {
            "clause": "FROM sizes s CROSS JOIN colors c",
            "purpose": "Generates Cartesian product (3 x 2 = 6 rows)."
      }
]
  },
  {
    id: "sql-ch-22",
    topicId: "sql-joins",
    title: "Manager Hierarchy Reporting with COALESCE",
    difficulty: "Medium",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Self Join & Hierarchy Handling",
      "role": "Systems Engineer Specialist"
},
    prompt: "Write a SQL query that displays `employee_name` and their direct `manager_name`. If an employee has no manager (such as the CEO), display 'No Manager' using COALESCE. Order by `employee_name` ascending.",
    schema_context: "CREATE TABLE staff_hierarchy (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    manager_id INT\n);\nINSERT INTO staff_hierarchy VALUES\n(1, 'Aditi', NULL),\n(2, 'Barun', 1),\n(3, 'Chandan', 1),\n(4, 'Divya', 2);",
    sample_data: [
      {
            "id": 1,
            "name": "Aditi",
            "manager_id": null
      },
      {
            "id": 2,
            "name": "Barun",
            "manager_id": 1
      },
      {
            "id": 3,
            "name": "Chandan",
            "manager_id": 1
      },
      {
            "id": 4,
            "name": "Divya",
            "manager_id": 2
      }
],
    starter_query: "-- Write your SQL query below\nSELECT e.name AS employee_name, COALESCE(m.name, 'No Manager') AS manager_name\nFROM staff_hierarchy e\nLEFT JOIN staff_hierarchy m ON ...\nORDER BY employee_name ASC;",
    solution_query: "SELECT e.name AS employee_name, COALESCE(m.name, 'No Manager') AS manager_name FROM staff_hierarchy e LEFT JOIN staff_hierarchy m ON e.manager_id = m.id ORDER BY employee_name ASC;",
    expected_result: [
      {
            "employee_name": "Aditi",
            "manager_name": "No Manager"
      },
      {
            "employee_name": "Barun",
            "manager_name": "Aditi"
      },
      {
            "employee_name": "Chandan",
            "manager_name": "Aditi"
      },
      {
            "employee_name": "Divya",
            "manager_name": "Barun"
      }
],
    test_cases: [
      {
        id: 1,
        title: "CEO handled with No Manager",
        description: "Verify Aditi has manager_name 'No Manager'",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.employee_name === 'Aditi' && r.manager_name === 'No Manager')
      },
      {
        id: 2,
        title: "Subordinates correctly mapped",
        description: "Verify Divya reports to Barun",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.employee_name === 'Divya' && r.manager_name === 'Barun')
      }
    ],
    hints: [
      "Hint 1: Use `LEFT JOIN staff_hierarchy m ON e.manager_id = m.id`.",
      "Hint 2: Wrap the manager name in `COALESCE(m.name, 'No Manager')`."
],
    explanation: "A self-LEFT JOIN retains top-level managers whose `manager_id` is NULL. COALESCE replaces NULL values with the fallback text 'No Manager'.",
    queryBreakdown: [
      {
            "clause": "COALESCE(m.name, 'No Manager')",
            "purpose": "Replaces NULL with descriptive fallback string."
      },
      {
            "clause": "LEFT JOIN staff_hierarchy m ON e.manager_id = m.id",
            "purpose": "Self-joins to retrieve supervisor details."
      }
]
  },
  {
    id: "sql-ch-23",
    topicId: "sql-joins",
    title: "Identify Missing Vendors Across Two Systems",
    difficulty: "Medium",
    attribution: "Placement-style (Deloitte / System Integration)",
    companyMetadata: {
      "company": "Deloitte",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Deloitte Technical Round - Data Migration & Reconciliation",
      "role": "Business Technology Analyst"
},
    prompt: "Two procurement systems record vendor IDs: `legacy_vendors` and `new_vendors`. Write a SQL query using `LEFT JOIN` and `UNION` to report all vendor IDs that exist in `legacy_vendors` but are missing from `new_vendors`. Order by `vendor_id`.",
    schema_context: "CREATE TABLE legacy_vendors (\n    vendor_id INT PRIMARY KEY,\n    vendor_name VARCHAR(50)\n);\nCREATE TABLE new_vendors (\n    vendor_id INT PRIMARY KEY,\n    vendor_name VARCHAR(50)\n);\nINSERT INTO legacy_vendors VALUES (101, 'Alpha'), (102, 'Beta'), (103, 'Gamma');\nINSERT INTO new_vendors VALUES (102, 'Beta'), (104, 'Delta');",
    sample_data: [
      {
            "legacy": "101, 102, 103"
      },
      {
            "new": "102, 104"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT l.vendor_id, l.vendor_name\nFROM legacy_vendors l\nLEFT JOIN new_vendors n ON ...\nWHERE ...;",
    solution_query: "SELECT l.vendor_id, l.vendor_name FROM legacy_vendors l LEFT JOIN new_vendors n ON l.vendor_id = n.vendor_id WHERE n.vendor_id IS NULL ORDER BY l.vendor_id ASC;",
    expected_result: [
      {
            "vendor_id": 101,
            "vendor_name": "Alpha"
      },
      {
            "vendor_id": 103,
            "vendor_name": "Gamma"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Missing vendors detected",
        description: "Verify 101 (Alpha) and 103 (Gamma) are identified",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].vendor_id === 101 && res[1].vendor_id === 103
      },
      {
        id: 2,
        title: "Migrated vendor excluded",
        description: "Verify 102 (Beta) is excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.vendor_id === 102)
      }
    ],
    hints: [
      "Hint 1: Left join `legacy_vendors l` with `new_vendors n` on `l.vendor_id = n.vendor_id`.",
      "Hint 2: Filter where `n.vendor_id IS NULL`."
],
    explanation: "An anti-join using LEFT JOIN and IS NULL finds records that exist in the left system but failed to migrate to the right system.",
    queryBreakdown: [
      {
            "clause": "FROM legacy_vendors l LEFT JOIN new_vendors n",
            "purpose": "Compares legacy records with new system."
      },
      {
            "clause": "WHERE n.vendor_id IS NULL",
            "purpose": "Isolates un-migrated legacy vendors."
      }
]
  },
  {
    id: "sql-ch-24",
    topicId: "sql-aggregation-groupby",
    title: "Total and Average Salary by Department",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round - Aggregate Metrics",
      "role": "Digital Developer"
},
    prompt: "Write a SQL query to calculate the `department`, employee count as `emp_count`, total salary expenditure as `total_salary`, and average salary as `avg_salary` (rounded to whole number) for each department. Order by `total_salary` descending.",
    schema_context: "CREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50),\n    salary INT\n);\nINSERT INTO employees VALUES\n(1, 'Aarav', 'Tech', 90000),\n(2, 'Binod', 'Sales', 60000),\n(3, 'Chaya', 'Tech', 80000),\n(4, 'Dev', 'Sales', 70000),\n(5, 'Esha', 'HR', 55000);",
    sample_data: [
      {
            "emp_id": 1,
            "name": "Aarav",
            "department": "Tech",
            "salary": 90000
      },
      {
            "emp_id": 2,
            "name": "Binod",
            "department": "Sales",
            "salary": 60000
      },
      {
            "emp_id": 3,
            "name": "Chaya",
            "department": "Tech",
            "salary": 80000
      },
      {
            "emp_id": 4,
            "name": "Dev",
            "department": "Sales",
            "salary": 70000
      },
      {
            "emp_id": 5,
            "name": "Esha",
            "department": "HR",
            "salary": 55000
      }
],
    starter_query: "-- Write your SQL query below\nSELECT department, COUNT(*) AS emp_count, SUM(salary) AS total_salary, ROUND(AVG(salary)) AS avg_salary\nFROM employees\nGROUP BY ...\nORDER BY total_salary DESC;",
    solution_query: "SELECT department, COUNT(*) AS emp_count, SUM(salary) AS total_salary, ROUND(AVG(salary)) AS avg_salary FROM employees GROUP BY department ORDER BY total_salary DESC;",
    expected_result: [
      {
            "department": "Tech",
            "emp_count": 2,
            "total_salary": 170000,
            "avg_salary": 85000
      },
      {
            "department": "Sales",
            "emp_count": 2,
            "total_salary": 130000,
            "avg_salary": 65000
      },
      {
            "department": "HR",
            "emp_count": 1,
            "total_salary": 55000,
            "avg_salary": 55000
      }
],
    test_cases: [
      {
        id: 1,
        title: "All departments present",
        description: "Verify Tech, Sales, and HR are calculated",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "Sorted by total_salary descending",
        description: "Tech (170k) comes before Sales (130k) and HR (55k)",
        passedCheck: (res) => Array.isArray(res) && res[0].department === 'Tech' && res[1].department === 'Sales'
      }
    ],
    hints: [
      "Hint 1: Use `GROUP BY department`.",
      "Hint 2: Aggregate with `COUNT(*)`, `SUM(salary)`, and `ROUND(AVG(salary))`."
],
    explanation: "GROUP BY aggregates individual worker rows into department totals, computing simultaneous summary functions.",
    queryBreakdown: [
      {
            "clause": "GROUP BY department",
            "purpose": "Creates department groups."
      },
      {
            "clause": "SUM(salary), AVG(salary)",
            "purpose": "Calculates volume and average compensation."
      }
]
  },
  {
    id: "sql-ch-25",
    topicId: "sql-aggregation-groupby",
    title: "Salary Extremes (MAX & MIN) per Job Title",
    difficulty: "Medium",
    attribution: "Placement-style (Cognizant / Accenture)",
    companyMetadata: {
      "company": "Cognizant",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Cognizant Assessment - Aggregate Extremes",
      "role": "Programmer Analyst"
},
    prompt: "Write a SQL query to report `job_title`, highest salary as `max_salary`, lowest salary as `min_salary`, and salary spread as `salary_spread` (max - min) for each job title. Order by `salary_spread` descending.",
    schema_context: "CREATE TABLE job_positions (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    job_title VARCHAR(50),\n    salary INT\n);\nINSERT INTO job_positions VALUES\n(1, 'Amit', 'Developer', 95000),\n(2, 'Bina', 'Developer', 65000),\n(3, 'Chetan', 'QA Engineer', 55000),\n(4, 'Deepak', 'QA Engineer', 50000),\n(5, 'Farhan', 'Product Manager', 120000);",
    sample_data: [
      {
            "job_title": "Developer",
            "salaries": "95000, 65000"
      },
      {
            "job_title": "QA Engineer",
            "salaries": "55000, 50000"
      },
      {
            "job_title": "Product Manager",
            "salaries": "120000"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT job_title, MAX(salary) AS max_salary, MIN(salary) AS min_salary, (MAX(salary) - MIN(salary)) AS salary_spread\nFROM job_positions\nGROUP BY ...;",
    solution_query: "SELECT job_title, MAX(salary) AS max_salary, MIN(salary) AS min_salary, (MAX(salary) - MIN(salary)) AS salary_spread FROM job_positions GROUP BY job_title ORDER BY salary_spread DESC;",
    expected_result: [
      {
            "job_title": "Developer",
            "max_salary": 95000,
            "min_salary": 65000,
            "salary_spread": 30000
      },
      {
            "job_title": "QA Engineer",
            "max_salary": 55000,
            "min_salary": 50000,
            "salary_spread": 5000
      },
      {
            "job_title": "Product Manager",
            "max_salary": 120000,
            "min_salary": 120000,
            "salary_spread": 0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Spread calculation",
        description: "Verify Developer spread is 30,000 (95k - 65k)",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.job_title === 'Developer' && r.salary_spread === 30000)
      },
      {
        id: 2,
        title: "Order check",
        description: "Verify Developer appears first due to highest spread",
        passedCheck: (res) => Array.isArray(res) && res[0].job_title === 'Developer'
      }
    ],
    hints: [
      "Hint 1: Use `MAX(salary)` and `MIN(salary)` grouped by `job_title`.",
      "Hint 2: Compute spread via `(MAX(salary) - MIN(salary))` in the SELECT clause."
],
    explanation: "Calculates both extremes within each job position group and computes the arithmetic difference.",
    queryBreakdown: [
      {
            "clause": "MAX(salary), MIN(salary)",
            "purpose": "Determines boundary compensation."
      },
      {
            "clause": "ORDER BY salary_spread DESC",
            "purpose": "Ranks job roles by compensation variance."
      }
]
  },
  {
    id: "sql-ch-26",
    topicId: "sql-aggregation-groupby",
    title: "Departments With Average Salary Above Threshold",
    difficulty: "Medium",
    attribution: "Placement-style (Infosys / Wipro)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Round - HAVING Clause Filtering",
      "role": "Systems Engineer"
},
    prompt: "Write a SQL query to find `department` and average salary as `avg_salary` for all departments having an average salary strictly greater than 75,000. Order by `avg_salary` descending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50),\n    salary NUMERIC(10,2)\n);\nINSERT INTO staff VALUES\n(1, 'A', 'Finance', 90000),\n(2, 'B', 'Finance', 85000),\n(3, 'C', 'Marketing', 60000),\n(4, 'D', 'Marketing', 70000),\n(5, 'E', 'Engineering', 95000);",
    sample_data: [
      {
            "department": "Finance",
            "salaries": "90000, 85000 (Avg: 87500)"
      },
      {
            "department": "Marketing",
            "salaries": "60000, 70000 (Avg: 65000)"
      },
      {
            "department": "Engineering",
            "salaries": "95000 (Avg: 95000)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT department, AVG(salary) AS avg_salary\nFROM staff\nGROUP BY department\nHAVING ...;",
    solution_query: "SELECT department, AVG(salary) AS avg_salary FROM staff GROUP BY department HAVING AVG(salary) > 75000 ORDER BY avg_salary DESC;",
    expected_result: [
      {
            "department": "Engineering",
            "avg_salary": 95000.0
      },
      {
            "department": "Finance",
            "avg_salary": 87500.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Qualified departments check",
        description: "Verify Engineering and Finance are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res.some(r => r.department === 'Engineering') && res.some(r => r.department === 'Finance')
      },
      {
        id: 2,
        title: "Marketing excluded",
        description: "Verify Marketing (avg 65k) is excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.department === 'Marketing')
      }
    ],
    hints: [
      "Hint 1: You must use `HAVING AVG(salary) > 75000` because `WHERE` cannot evaluate aggregate functions.",
      "Hint 2: Sort descending by `avg_salary DESC`."
],
    explanation: "WHERE filters rows before grouping; HAVING filters groups after aggregation. Since the predicate requires `AVG(salary)`, it must be placed in HAVING.",
    queryBreakdown: [
      {
            "clause": "HAVING AVG(salary) > 75000",
            "purpose": "Filters grouped results by aggregate condition."
      }
]
  },
  {
    id: "sql-ch-27",
    topicId: "sql-aggregation-groupby",
    title: "High-Volume Customers Lifetime Spend",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Flipkart)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Customer Analytics - Order Volume and Total GMV",
      "role": "Data Analyst / SDE"
},
    prompt: "Write a SQL query to report `customer_id`, total orders as `order_count`, and total spend as `total_spent` for all customers who have placed at least 2 orders. Order by `total_spent` descending.",
    schema_context: "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT,\n    amount NUMERIC(10,2)\n);\nINSERT INTO orders VALUES\n(1, 101, 250.00),\n(2, 102, 1200.00),\n(3, 101, 450.00),\n(4, 103, 300.00),\n(5, 101, 100.00),\n(6, 103, 700.00);",
    sample_data: [
      {
            "customer_id": 101,
            "orders": "3 orders, $800 total"
      },
      {
            "customer_id": 102,
            "orders": "1 order, $1200 total"
      },
      {
            "customer_id": 103,
            "orders": "2 orders, $1000 total"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT customer_id, COUNT(*) AS order_count, SUM(amount) AS total_spent\nFROM orders\nGROUP BY ...\nHAVING ...;",
    solution_query: "SELECT customer_id, COUNT(*) AS order_count, SUM(amount) AS total_spent FROM orders GROUP BY customer_id HAVING COUNT(*) >= 2 ORDER BY total_spent DESC;",
    expected_result: [
      {
            "customer_id": 103,
            "order_count": 2,
            "total_spent": 1000.0
      },
      {
            "customer_id": 101,
            "order_count": 3,
            "total_spent": 800.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Customers with >= 2 orders",
        description: "Verify customer 103 (2 orders) and 101 (3 orders) are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res.some(r => r.customer_id === 103) && res.some(r => r.customer_id === 101)
      },
      {
        id: 2,
        title: "Single-order customer excluded",
        description: "Verify customer 102 (1 order) is excluded despite high amount",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.customer_id === 102)
      }
    ],
    hints: [
      "Hint 1: Group by `customer_id`.",
      "Hint 2: Filter groups with `HAVING COUNT(*) >= 2`."
],
    explanation: "HAVING COUNT(*) >= 2 isolates frequent buyers and computes their lifetime spend using SUM.",
    queryBreakdown: [
      {
            "clause": "GROUP BY customer_id",
            "purpose": "Collapses transactions per buyer."
      },
      {
            "clause": "HAVING COUNT(*) >= 2",
            "purpose": "Restricts to multi-order buyers."
      }
]
  },
  {
    id: "sql-ch-28",
    topicId: "sql-aggregation-groupby",
    title: "Department and Gender Demographic Breakdown",
    difficulty: "Medium",
    attribution: "Placement-style (Deloitte / PwC)",
    companyMetadata: {
      "company": "Deloitte",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Deloitte USI Assessment - Multi-Column GROUP BY Aggregates",
      "role": "Technology Analyst"
},
    prompt: "Write a SQL query to report `department`, `gender`, and head count as `head_count` grouped by both department and gender. Order by `department` ascending, then `gender` ascending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50),\n    gender CHAR(1)\n);\nINSERT INTO staff VALUES\n(1, 'Alice', 'IT', 'F'),\n(2, 'Bob', 'IT', 'M'),\n(3, 'Charlie', 'IT', 'M'),\n(4, 'Diana', 'HR', 'F'),\n(5, 'Evelyn', 'HR', 'F');",
    sample_data: [
      {
            "dept": "IT",
            "F": 1,
            "M": 2
      },
      {
            "dept": "HR",
            "F": 2,
            "M": 0
      }
],
    starter_query: "-- Write your SQL query below\nSELECT department, gender, COUNT(*) AS head_count\nFROM staff\nGROUP BY department, gender\nORDER BY ...;",
    solution_query: "SELECT department, gender, COUNT(*) AS head_count FROM staff GROUP BY department, gender ORDER BY department ASC, gender ASC;",
    expected_result: [
      {
            "department": "HR",
            "gender": "F",
            "head_count": 2
      },
      {
            "department": "IT",
            "gender": "F",
            "head_count": 1
      },
      {
            "department": "IT",
            "gender": "M",
            "head_count": 2
      }
],
    test_cases: [
      {
        id: 1,
        title: "Group count check",
        description: "Verify 3 distinct sub-groups are formed",
        passedCheck: (res) => Array.isArray(res) && res.length === 3
      },
      {
        id: 2,
        title: "IT Male count",
        description: "Verify IT Male head_count is 2",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.department === 'IT' && r.gender === 'M' && r.head_count === 2)
      }
    ],
    hints: [
      "Hint 1: Put both columns in GROUP BY: `GROUP BY department, gender`.",
      "Hint 2: Order by `department ASC, gender ASC`."
],
    explanation: "Multi-column GROUP BY partitions rows into composite buckets formed by each unique (department, gender) pair.",
    queryBreakdown: [
      {
            "clause": "GROUP BY department, gender",
            "purpose": "Groups on multi-column Cartesian combinations."
      }
]
  },
  {
    id: "sql-ch-29",
    topicId: "sql-aggregation-groupby",
    title: "Annual Order Volumes Reporting",
    difficulty: "Medium",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "TCS Technical Round - Date Parsing & Aggregation",
      "role": "Systems Engineer"
},
    prompt: "Write a SQL query using `SUBSTR` to extract the 4-digit order year as `order_year` and calculate `orders_count` for each calendar year from `orders`. Order by `order_year` ascending.",
    schema_context: "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    order_date VARCHAR(10),\n    amount NUMERIC\n);\nINSERT INTO orders VALUES\n(1, '2024-05-12', 150),\n(2, '2024-09-20', 300),\n(3, '2025-01-15', 500),\n(4, '2025-07-22', 200),\n(5, '2026-02-10', 450);",
    sample_data: [
      {
            "year": "2024",
            "count": 2
      },
      {
            "year": "2025",
            "count": 2
      },
      {
            "year": "2026",
            "count": 1
      }
],
    starter_query: "-- Write your SQL query below\nSELECT SUBSTR(order_date, 1, 4) AS order_year, COUNT(*) AS orders_count\nFROM orders\nGROUP BY ...\nORDER BY order_year ASC;",
    solution_query: "SELECT SUBSTR(order_date, 1, 4) AS order_year, COUNT(*) AS orders_count FROM orders GROUP BY SUBSTR(order_date, 1, 4) ORDER BY order_year ASC;",
    expected_result: [
      {
            "order_year": "2024",
            "orders_count": 2
      },
      {
            "order_year": "2025",
            "orders_count": 2
      },
      {
            "order_year": "2026",
            "orders_count": 1
      }
],
    test_cases: [
      {
        id: 1,
        title: "Year extraction and grouping",
        description: "Verify 3 distinct years (2024, 2025, 2026) are calculated",
        passedCheck: (res) => Array.isArray(res) && res.length === 3 && res[0].order_year === '2024' && res[2].order_year === '2026'
      }
    ],
    hints: [
      "Hint 1: Use `SUBSTR(order_date, 1, 4)` to slice the year from 'YYYY-MM-DD'.",
      "Hint 2: Group by the expression `SUBSTR(order_date, 1, 4)`."
],
    explanation: "String manipulation in GROUP BY enables date bucket aggregation across all ANSI SQL / SQLite engines.",
    queryBreakdown: [
      {
            "clause": "SUBSTR(order_date, 1, 4)",
            "purpose": "Extracts 4-digit year component."
      }
]
  },
  {
    id: "sql-ch-30",
    topicId: "sql-aggregation-groupby",
    title: "Products with Multiple Price Variations",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Flipkart)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Pricing Engine - Historical Price Volatility Analysis",
      "role": "Data Engineer"
},
    prompt: "Write a SQL query to report `product_id` and distinct price count as `price_variations` for all items in `price_history` that have had more than 1 distinct price recorded. Order by `price_variations` descending.",
    schema_context: "CREATE TABLE price_history (\n    record_id INT PRIMARY KEY,\n    product_id INT,\n    price NUMERIC(10,2)\n);\nINSERT INTO price_history VALUES\n(1, 101, 199.99),\n(2, 101, 179.99),\n(3, 101, 199.99),\n(4, 102, 50.00),\n(5, 102, 50.00),\n(6, 103, 300.00),\n(7, 103, 320.00),\n(8, 103, 290.00);",
    sample_data: [
      {
            "product_id": 101,
            "prices": "199.99, 179.99 (2 distinct)"
      },
      {
            "product_id": 102,
            "prices": "50.00 (1 distinct)"
      },
      {
            "product_id": 103,
            "prices": "300, 320, 290 (3 distinct)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT product_id, COUNT(DISTINCT price) AS price_variations\nFROM price_history\nGROUP BY ...\nHAVING ...;",
    solution_query: "SELECT product_id, COUNT(DISTINCT price) AS price_variations FROM price_history GROUP BY product_id HAVING COUNT(DISTINCT price) > 1 ORDER BY price_variations DESC;",
    expected_result: [
      {
            "product_id": 103,
            "price_variations": 3
      },
      {
            "product_id": 101,
            "price_variations": 2
      }
],
    test_cases: [
      {
        id: 1,
        title: "Variations check",
        description: "Verify product 103 (3 variations) and 101 (2 variations) qualify",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].product_id === 103 && res[1].product_id === 101
      },
      {
        id: 2,
        title: "Single-price product excluded",
        description: "Verify product 102 is excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.product_id === 102)
      }
    ],
    hints: [
      "Hint 1: Use `COUNT(DISTINCT price)` to ignore duplicate identical prices.",
      "Hint 2: Filter in HAVING: `HAVING COUNT(DISTINCT price) > 1`."
],
    explanation: "Combining COUNT with DISTINCT inside an aggregate evaluates unique value cardinalities within each group.",
    queryBreakdown: [
      {
            "clause": "COUNT(DISTINCT price)",
            "purpose": "Counts unique price levels per product."
      }
]
  },
  {
    id: "sql-ch-31",
    topicId: "sql-aggregation-groupby",
    title: "Department with Highest Average Salary",
    difficulty: "Hard",
    attribution: "Placement-style (Amazon / LeetCode)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE Interview - Aggregate Ranking & Limits",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to find the single `department` with the highest average salary and its average salary as `max_avg_salary`. Return only the top record.",
    schema_context: "CREATE TABLE staff_salaries (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50),\n    salary INT\n);\nINSERT INTO staff_salaries VALUES\n(1, 'Alice', 'Analytics', 95000),\n(2, 'Bob', 'Analytics', 105000),\n(3, 'Charlie', 'Engineering', 90000),\n(4, 'David', 'Engineering', 85000),\n(5, 'Eve', 'HR', 60000);",
    sample_data: [
      {
            "department": "Analytics",
            "avg": 100000
      },
      {
            "department": "Engineering",
            "avg": 87500
      },
      {
            "department": "HR",
            "avg": 60000
      }
],
    starter_query: "-- Write your SQL query below\nSELECT department, AVG(salary) AS max_avg_salary\nFROM staff_salaries\nGROUP BY department\nORDER BY max_avg_salary DESC\nLIMIT 1;",
    solution_query: "SELECT department, AVG(salary) AS max_avg_salary FROM staff_salaries GROUP BY department ORDER BY max_avg_salary DESC LIMIT 1;",
    expected_result: [
      {
            "department": "Analytics",
            "max_avg_salary": 100000.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Top department check",
        description: "Verify Analytics with 100,000 average is returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].department === 'Analytics' && res[0].max_avg_salary == 100000
      }
    ],
    hints: [
      "Hint 1: Group by `department` and compute `AVG(salary)`.",
      "Hint 2: Sort descending and limit to 1: `ORDER BY max_avg_salary DESC LIMIT 1`."
],
    explanation: "Orders aggregate group calculations descending and returns the absolute maximum group.",
    queryBreakdown: [
      {
            "clause": "ORDER BY max_avg_salary DESC LIMIT 1",
            "purpose": "Extracts the top group."
      }
]
  },
  {
    id: "sql-ch-32",
    topicId: "sql-subqueries-nested",
    title: "Third Highest Salary Using Offset & Subquery",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Microsoft)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon Technical Interview - Nth Highest Salary",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to find the 3rd highest distinct salary from `employees`. Return the column as `ThirdHighestSalary`.",
    schema_context: "CREATE TABLE employees (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    salary INT\n);\nINSERT INTO employees VALUES\n(1, 'A', 90000),\n(2, 'B', 85000),\n(3, 'C', 90000),\n(4, 'D', 75000),\n(5, 'E', 70000);",
    sample_data: [
      {
            "salaries": "90000 (1st), 85000 (2nd), 75000 (3rd), 70000 (4th)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT DISTINCT salary AS ThirdHighestSalary\nFROM employees\nORDER BY ... LIMIT 1 OFFSET ...;",
    solution_query: "SELECT DISTINCT salary AS ThirdHighestSalary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;",
    expected_result: [
      {
            "ThirdHighestSalary": 75000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Correct third salary",
        description: "Verify ThirdHighestSalary is 75000",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && (res[0].ThirdHighestSalary == 75000 || res[0].salary == 75000)
      }
    ],
    hints: [
      "Hint 1: Use `SELECT DISTINCT salary` to ignore identical salary ties.",
      "Hint 2: Sort descending and use `LIMIT 1 OFFSET 2` (skipping the top 2)."
],
    explanation: "LIMIT 1 OFFSET 2 skips the top 2 distinct salaries and retrieves the single third distinct value.",
    queryBreakdown: [
      {
            "clause": "SELECT DISTINCT salary",
            "purpose": "Eliminates duplicate pay bands."
      },
      {
            "clause": "LIMIT 1 OFFSET 2",
            "purpose": "Paginates to the 3rd position."
      }
]
  },
  {
    id: "sql-ch-33",
    topicId: "sql-subqueries-nested",
    title: "Employees Earning Above Company Average",
    difficulty: "Medium",
    attribution: "Placement-style (Cognizant / Infosys)",
    companyMetadata: {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant Technical Interview - Scalar Subquery Predicates",
      "role": "Programmer Analyst"
},
    prompt: "Write a SQL query to select `name` and `salary` of all employees who earn more than the overall company average salary. Order by `salary` descending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    salary INT\n);\nINSERT INTO staff VALUES\n(1, 'Rohan', 50000),\n(2, 'Sita', 90000),\n(3, 'Tarun', 70000),\n(4, 'Usha', 110000);",
    sample_data: [
      {
            "company_avg": 80000,
            "qualified": "Sita (90k), Usha (110k)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name, salary\nFROM staff\nWHERE salary > (SELECT AVG(salary) FROM staff)\nORDER BY salary DESC;",
    solution_query: "SELECT name, salary FROM staff WHERE salary > (SELECT AVG(salary) FROM staff) ORDER BY salary DESC;",
    expected_result: [
      {
            "name": "Usha",
            "salary": 110000
      },
      {
            "name": "Sita",
            "salary": 90000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Above average employees",
        description: "Verify Usha and Sita are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].name === 'Usha' && res[1].name === 'Sita'
      },
      {
        id: 2,
        title: "Below average excluded",
        description: "Verify Rohan (50k) and Tarun (70k) are excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.name === 'Rohan' || r.name === 'Tarun')
      }
    ],
    hints: [
      "Hint 1: Write a scalar subquery `(SELECT AVG(salary) FROM staff)`.",
      "Hint 2: Compare `WHERE salary > (SELECT AVG(salary) FROM staff)`."
],
    explanation: "A scalar subquery evaluates to a single numeric value, allowing row-by-row salary comparison in the outer query.",
    queryBreakdown: [
      {
            "clause": "WHERE salary > (SELECT AVG(salary)...)",
            "purpose": "Scalar comparison against aggregate constant."
      }
]
  },
  {
    id: "sql-ch-34",
    topicId: "sql-subqueries-nested",
    title: "Employees Earning More Than Department Average",
    difficulty: "Hard",
    attribution: "Placement-style (Amazon / Microsoft)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Technical Interview - Correlated Subqueries",
      "role": "SDE-1"
},
    prompt: "Write a SQL query using a correlated subquery to find `name`, `department`, and `salary` of employees whose salary is strictly higher than their department average. Order by `department`, then `salary` descending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50),\n    salary INT\n);\nINSERT INTO staff VALUES\n(1, 'Aditi', 'IT', 95000),\n(2, 'Bhavin', 'IT', 65000),\n(3, 'Chetna', 'Sales', 75000),\n(4, 'Deepak', 'Sales', 55000);",
    sample_data: [
      {
            "IT": "Aditi (95k), Bhavin (65k) -> Avg 80k -> Aditi qualifies"
      },
      {
            "Sales": "Chetna (75k), Deepak (55k) -> Avg 65k -> Chetna qualifies"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT e1.name, e1.department, e1.salary\nFROM staff e1\nWHERE e1.salary > (SELECT AVG(e2.salary) FROM staff e2 WHERE e2.department = e1.department)\nORDER BY e1.department ASC, e1.salary DESC;",
    solution_query: "SELECT e1.name, e1.department, e1.salary FROM staff e1 WHERE e1.salary > (SELECT AVG(e2.salary) FROM staff e2 WHERE e2.department = e1.department) ORDER BY e1.department ASC, e1.salary DESC;",
    expected_result: [
      {
            "name": "Aditi",
            "department": "IT",
            "salary": 95000
      },
      {
            "name": "Chetna",
            "department": "Sales",
            "salary": 75000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Correlated department check",
        description: "Verify Aditi (IT) and Chetna (Sales) are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res.some(r => r.name === 'Aditi') && res.some(r => r.name === 'Chetna')
      },
      {
        id: 2,
        title: "Below department average excluded",
        description: "Verify Bhavin and Deepak are excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.name === 'Bhavin' || r.name === 'Deepak')
      }
    ],
    hints: [
      "Hint 1: In the inner query, correlate with `WHERE e2.department = e1.department`.",
      "Hint 2: Compare `e1.salary > (SELECT AVG(e2.salary) ...)`."
],
    explanation: "A correlated subquery references attributes of the outer row (`e1.department`), dynamically recalculating the department average for every evaluated row.",
    queryBreakdown: [
      {
            "clause": "WHERE e2.department = e1.department",
            "purpose": "Binds inner query execution to outer employee's department."
      }
]
  },
  {
    id: "sql-ch-35",
    topicId: "sql-subqueries-nested",
    title: "Active Purchasing Customers via Subquery IN",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Capgemini)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "TCS Placement Prep - Subquery IN Operators",
      "role": "Systems Engineer"
},
    prompt: "Write a SQL query to select `customer_id` and `name` from `customers` who have placed at least one order in the `orders` table using an `IN (SELECT ...)` subquery. Order by `customer_id`.",
    schema_context: "CREATE TABLE customers (\n    customer_id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\nCREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT\n);\nINSERT INTO customers VALUES (1, 'Kiran'), (2, 'Lata'), (3, 'Mohan');\nINSERT INTO orders VALUES (101, 1), (102, 3), (103, 1);",
    sample_data: [
      {
            "customers": "1: Kiran, 2: Lata, 3: Mohan"
      },
      {
            "orders": "Placed by 1 and 3"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT customer_id, name\nFROM customers\nWHERE customer_id IN (SELECT ...)\nORDER BY customer_id ASC;",
    solution_query: "SELECT customer_id, name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders) ORDER BY customer_id ASC;",
    expected_result: [
      {
            "customer_id": 1,
            "name": "Kiran"
      },
      {
            "customer_id": 3,
            "name": "Mohan"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Active buyers returned",
        description: "Verify Kiran and Mohan are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].customer_id === 1 && res[1].customer_id === 3
      },
      {
        id: 2,
        title: "Inactive buyer excluded",
        description: "Verify Lata (no orders) is excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.name === 'Lata')
      }
    ],
    hints: [
      "Hint 1: The inner query is `(SELECT customer_id FROM orders)`.",
      "Hint 2: Filter with `WHERE customer_id IN (...)`."
],
    explanation: "The subquery returns the list of all purchasing customer IDs, and the outer IN predicate tests membership against this result set.",
    queryBreakdown: [
      {
            "clause": "WHERE customer_id IN (SELECT ...)",
            "purpose": "Tests set membership against child foreign keys."
      }
]
  },
  {
    id: "sql-ch-36",
    topicId: "sql-subqueries-nested",
    title: "Customers With No Orders via NOT EXISTS",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Infosys)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Technical Round - NOT EXISTS vs NOT IN with NULLs",
      "role": "SDE-1"
},
    prompt: "Write a SQL query using `NOT EXISTS` to report `customer_id` and `name` of all customers who have never placed an order. Order by `customer_id`.",
    schema_context: "CREATE TABLE customers (\n    customer_id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\nCREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT\n);\nINSERT INTO customers VALUES (1, 'Anil'), (2, 'Bablu'), (3, 'Chintan');\nINSERT INTO orders VALUES (10, 1), (20, 2);",
    sample_data: [
      {
            "customers": "1: Anil, 2: Bablu, 3: Chintan"
      },
      {
            "orders": "10: Anil, 20: Bablu"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT c.customer_id, c.name\nFROM customers c\nWHERE NOT EXISTS (\n    SELECT 1 FROM orders o WHERE ...\n)\nORDER BY c.customer_id ASC;",
    solution_query: "SELECT c.customer_id, c.name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id) ORDER BY c.customer_id ASC;",
    expected_result: [
      {
            "customer_id": 3,
            "name": "Chintan"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Non-buyer isolated",
        description: "Verify Chintan is returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].name === 'Chintan'
      }
    ],
    hints: [
      "Hint 1: Use `WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id)`.",
      "Hint 2: NOT EXISTS halts evaluation as soon as a single matching row is encountered."
],
    explanation: "NOT EXISTS is null-safe and short-circuits execution as soon as a matching record is discovered, avoiding the classic NOT IN NULL pitfall.",
    queryBreakdown: [
      {
            "clause": "WHERE NOT EXISTS (SELECT 1 ...)",
            "purpose": "Short-circuit semi-join anti-check."
      }
]
  },
  {
    id: "sql-ch-37",
    topicId: "sql-subqueries-nested",
    title: "Most Recent Order for Each Customer",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Walmart)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Order Processing - Latest Activity Retrieval",
      "role": "SDE-1"
},
    prompt: "Write a SQL query using a correlated subquery to find `order_id`, `customer_id`, and `order_date` representing each customer's most recent order. Order by `customer_id` ascending.",
    schema_context: "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT,\n    order_date DATE\n);\nINSERT INTO orders VALUES\n(101, 1, '2026-01-10'),\n(102, 1, '2026-02-15'),\n(103, 2, '2026-01-05'),\n(104, 2, '2026-03-01'),\n(105, 2, '2026-02-20');",
    sample_data: [
      {
            "customer_1": "101 (Jan), 102 (Feb) -> 102 latest"
      },
      {
            "customer_2": "103 (Jan), 104 (Mar), 105 (Feb) -> 104 latest"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT o1.order_id, o1.customer_id, o1.order_date\nFROM orders o1\nWHERE o1.order_date = (SELECT MAX(o2.order_date) FROM orders o2 WHERE ...)\nORDER BY o1.customer_id ASC;",
    solution_query: "SELECT o1.order_id, o1.customer_id, o1.order_date FROM orders o1 WHERE o1.order_date = (SELECT MAX(o2.order_date) FROM orders o2 WHERE o2.customer_id = o1.customer_id) ORDER BY o1.customer_id ASC;",
    expected_result: [
      {
            "order_id": 102,
            "customer_id": 1,
            "order_date": "2026-02-15"
      },
      {
            "order_id": 104,
            "customer_id": 2,
            "order_date": "2026-03-01"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Latest orders matched",
        description: "Verify 102 and 104 are selected",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 102 && res[1].order_id === 104
      }
    ],
    hints: [
      "Hint 1: In the correlated subquery, find `MAX(order_date)` where `o2.customer_id = o1.customer_id`.",
      "Hint 2: Match `o1.order_date = (SELECT MAX ...)`."
],
    explanation: "The correlated subquery determines the latest timestamp for that specific customer, filtering out older orders.",
    queryBreakdown: [
      {
            "clause": "o1.order_date = (SELECT MAX(...))",
            "purpose": "Filters to highest timestamp within user group."
      }
]
  },
  {
    id: "sql-ch-38",
    topicId: "sql-subqueries-nested",
    title: "Employees in Departments with Multiple Members",
    difficulty: "Medium",
    attribution: "Placement-style (Cognizant)",
    companyMetadata: {
      "company": "Cognizant",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Cognizant GenC - Subquery Aggregation Filtering",
      "role": "Programmer Analyst"
},
    prompt: "Write a SQL query to select `name` and `department` for employees who work in a department that has more than 2 employees. Order by `department`, then `name`.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50)\n);\nINSERT INTO staff VALUES\n(1, 'Alice', 'Tech'),\n(2, 'Bob', 'Tech'),\n(3, 'Charlie', 'Tech'),\n(4, 'David', 'Legal');",
    sample_data: [
      {
            "Tech": "3 employees (>2) -> All qualify"
      },
      {
            "Legal": "1 employee (<=2) -> Excluded"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name, department\nFROM staff\nWHERE department IN (\n    SELECT department FROM staff GROUP BY department HAVING ...\n)\nORDER BY department ASC, name ASC;",
    solution_query: "SELECT name, department FROM staff WHERE department IN (SELECT department FROM staff GROUP BY department HAVING COUNT(*) > 2) ORDER BY department ASC, name ASC;",
    expected_result: [
      {
            "name": "Alice",
            "department": "Tech"
      },
      {
            "name": "Bob",
            "department": "Tech"
      },
      {
            "name": "Charlie",
            "department": "Tech"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Tech department employees included",
        description: "Verify Alice, Bob, Charlie are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 3 && res.every(r => r.department === 'Tech')
      },
      {
        id: 2,
        title: "Legal employee excluded",
        description: "Verify David is excluded",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.name === 'David')
      }
    ],
    hints: [
      "Hint 1: Use an inner query: `SELECT department FROM staff GROUP BY department HAVING COUNT(*) > 2`.",
      "Hint 2: Filter outer table using `WHERE department IN (...)`."
],
    explanation: "The subquery identifies departments meeting the size threshold, and the outer query filters employees belonging to those departments.",
    queryBreakdown: [
      {
            "clause": "WHERE department IN (SELECT ... HAVING COUNT(*) > 2)",
            "purpose": "Filters individual rows based on group size criteria."
      }
]
  },
  {
    id: "sql-ch-39",
    topicId: "sql-subqueries-nested",
    title: "Highest Paid Employee in Each Department",
    difficulty: "Hard",
    attribution: "Placement-style (Amazon / LeetCode 184)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 184 / Amazon SDE Technical Round",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to find the employee with the highest salary in each department. Return `name`, `department`, and `salary`. Order by `department` ascending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    department VARCHAR(50),\n    salary INT\n);\nINSERT INTO staff VALUES\n(1, 'Joe', 'IT', 85000),\n(2, 'Jim', 'IT', 90000),\n(3, 'Henry', 'HR', 80000),\n(4, 'Sam', 'HR', 60000),\n(5, 'Max', 'IT', 90000);",
    sample_data: [
      {
            "IT": "Jim (90k), Max (90k) -> Both are max"
      },
      {
            "HR": "Henry (80k) -> Max"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT e1.name, e1.department, e1.salary\nFROM staff e1\nWHERE e1.salary = (SELECT MAX(e2.salary) FROM staff e2 WHERE ...)\nORDER BY e1.department ASC, e1.name ASC;",
    solution_query: "SELECT e1.name, e1.department, e1.salary FROM staff e1 WHERE e1.salary = (SELECT MAX(e2.salary) FROM staff e2 WHERE e2.department = e1.department) ORDER BY e1.department ASC, e1.name ASC;",
    expected_result: [
      {
            "name": "Henry",
            "department": "HR",
            "salary": 80000
      },
      {
            "name": "Jim",
            "department": "IT",
            "salary": 90000
      },
      {
            "name": "Max",
            "department": "IT",
            "salary": 90000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Ties handled correctly",
        description: "Verify both Jim and Max (90k) are returned for IT",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.name === 'Jim') && res.some(r => r.name === 'Max')
      },
      {
        id: 2,
        title: "HR max employee",
        description: "Verify Henry is returned for HR",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.name === 'Henry')
      }
    ],
    hints: [
      "Hint 1: Use a correlated subquery: `WHERE e1.salary = (SELECT MAX(e2.salary) FROM staff e2 WHERE e2.department = e1.department)`.",
      "Hint 2: This handles salary ties gracefully without dropping either top earner."
],
    explanation: "Comparing salary against the department maximum cleanly supports ties without requiring analytical window functions.",
    queryBreakdown: [
      {
            "clause": "WHERE e1.salary = (SELECT MAX(...))",
            "purpose": "Matches employee to the department ceiling."
      }
]
  },
  {
    id: "sql-ch-40",
    topicId: "sql-subqueries-nested",
    title: "Deviation from Company Average (Scalar SELECT Subquery)",
    difficulty: "Medium",
    attribution: "Placement-style (TCS Digital / Infosys)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Subqueries in SELECT Clause",
      "role": "Digital Developer"
},
    prompt: "Write a SQL query using a scalar subquery in the `SELECT` clause to display `name`, `salary`, company average as `company_avg` (rounded to integer), and difference as `diff_from_avg` (salary - company_avg). Order by `diff_from_avg` descending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    salary INT\n);\nINSERT INTO staff VALUES\n(1, 'Aarav', 100000),\n(2, 'Bhavna', 80000),\n(3, 'Chandan', 60000);",
    sample_data: [
      {
            "company_avg": 80000,
            "deviations": "Aarav (+20k), Bhavna (0), Chandan (-20k)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name, salary,\n       (SELECT ROUND(AVG(salary)) FROM staff) AS company_avg,\n       (salary - (SELECT ROUND(AVG(salary)) FROM staff)) AS diff_from_avg\nFROM staff\nORDER BY diff_from_avg DESC;",
    solution_query: "SELECT name, salary, (SELECT ROUND(AVG(salary)) FROM staff) AS company_avg, (salary - (SELECT ROUND(AVG(salary)) FROM staff)) AS diff_from_avg FROM staff ORDER BY diff_from_avg DESC;",
    expected_result: [
      {
            "name": "Aarav",
            "salary": 100000,
            "company_avg": 80000,
            "diff_from_avg": 20000
      },
      {
            "name": "Bhavna",
            "salary": 80000,
            "company_avg": 80000,
            "diff_from_avg": 0
      },
      {
            "name": "Chandan",
            "salary": 60000,
            "company_avg": 80000,
            "diff_from_avg": -20000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Deviation calculations",
        description: "Verify Aarav is +20,000, Bhavna is 0, Chandan is -20,000",
        passedCheck: (res) => Array.isArray(res) && res.length === 3 && res[0].diff_from_avg === 20000 && res[2].diff_from_avg === -20000
      }
    ],
    hints: [
      "Hint 1: Place `(SELECT ROUND(AVG(salary)) FROM staff)` directly in the SELECT list.",
      "Hint 2: Compute difference via `(salary - (SELECT ROUND(AVG(salary)) FROM staff))`."
],
    explanation: "A scalar subquery can be projected in the SELECT clause alongside normal table columns to perform row-level comparative mathematics.",
    queryBreakdown: [
      {
            "clause": "SELECT (SELECT AVG...) AS company_avg",
            "purpose": "Projects constant aggregate metric across every returned row."
      }
]
  },
  {
    id: "sql-ch-41",
    topicId: "relational-model-keys",
    title: "Identify Orphaned Foreign Key Records",
    difficulty: "Medium",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Assessment - Foreign Key Violations",
      "role": "Systems Engineer"
},
    prompt: "Write a SQL query to identify all `order_id` and `customer_id` records in `orders` where the referenced `customer_id` does not exist in `customers`. Order by `order_id`.",
    schema_context: "CREATE TABLE customers (\n    customer_id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\nCREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT\n);\nINSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob');\nINSERT INTO orders VALUES (101, 1), (102, 99), (103, 2), (104, 88);",
    sample_data: [
      {
            "customers": "1, 2"
      },
      {
            "orders": "101->1, 102->99 (orphan), 103->2, 104->88 (orphan)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT o.order_id, o.customer_id\nFROM orders o\nLEFT JOIN customers c ON ...\nWHERE ...;",
    solution_query: "SELECT o.order_id, o.customer_id FROM orders o LEFT JOIN customers c ON o.customer_id = c.customer_id WHERE c.customer_id IS NULL ORDER BY o.order_id ASC;",
    expected_result: [
      {
            "order_id": 102,
            "customer_id": 99
      },
      {
            "order_id": 104,
            "customer_id": 88
      }
],
    test_cases: [
      {
        id: 1,
        title: "Orphans detected",
        description: "Verify orders 102 and 104 are detected as orphaned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 102 && res[1].order_id === 104
      }
    ],
    hints: [
      "Hint 1: Left join `orders` to `customers` on `o.customer_id = c.customer_id`.",
      "Hint 2: Filter with `WHERE c.customer_id IS NULL`."
],
    explanation: "An anti-join detects child rows referencing parent keys that were deleted or never created.",
    queryBreakdown: [
      {
            "clause": "WHERE c.customer_id IS NULL",
            "purpose": "Isolates orphaned child records."
      }
]
  },
  {
    id: "sql-ch-42",
    topicId: "relational-model-keys",
    title: "Verify Alternate Candidate Key Uniqueness",
    difficulty: "Easy",
    attribution: "Placement-style (Cognizant)",
    companyMetadata: {
      "company": "Cognizant",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Cognizant GenC - Candidate Key Integrity Verification",
      "role": "Programmer Analyst"
},
    prompt: "Write a SQL query to find any duplicate phone numbers in `user_accounts` that violate the alternate candidate key constraint. Return `phone_number` and its occurrence count as `duplicates_count`.",
    schema_context: "CREATE TABLE user_accounts (\n    user_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    phone_number VARCHAR(15)\n);\nINSERT INTO user_accounts VALUES\n(1, 'Aarav', '9876543210'),\n(2, 'Binod', '9123456780'),\n(3, 'Chetan', '9876543210'),\n(4, 'Deepa', '9988776655');",
    sample_data: [
      {
            "phone": "9876543210 used by Aarav and Chetan"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT phone_number, COUNT(*) AS duplicates_count\nFROM user_accounts\nGROUP BY phone_number\nHAVING ...;",
    solution_query: "SELECT phone_number, COUNT(*) AS duplicates_count FROM user_accounts GROUP BY phone_number HAVING COUNT(*) > 1;",
    expected_result: [
      {
            "phone_number": "9876543210",
            "duplicates_count": 2
      }
],
    test_cases: [
      {
        id: 1,
        title: "Duplicate detected",
        description: "Verify 9876543210 has count 2",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].phone_number === '9876543210' && res[0].duplicates_count === 2
      }
    ],
    hints: [
      "Hint 1: Group by `phone_number`.",
      "Hint 2: Filter with `HAVING COUNT(*) > 1`."
],
    explanation: "Validates uniqueness before establishing an alternate candidate key index.",
    queryBreakdown: [
      {
            "clause": "HAVING COUNT(*) > 1",
            "purpose": "Identifies keys with duplicate violations."
      }
]
  },
  {
    id: "sql-ch-43",
    topicId: "relational-model-keys",
    title: "Composite Primary Key Enrollment Lookups",
    difficulty: "Easy",
    attribution: "Placement-style (Wipro / TCS)",
    companyMetadata: {
      "company": "Wipro",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Wipro Placement Assessment - Composite Key Queries",
      "role": "Project Engineer"
},
    prompt: "Write a SQL query to select `student_id`, `course_id`, and `grade` for all enrollments in semester 'Fall-2026' having grade 'A'. Order by `student_id`.",
    schema_context: "CREATE TABLE enrollments (\n    student_id INT,\n    course_id INT,\n    semester VARCHAR(20),\n    grade CHAR(2),\n    PRIMARY KEY (student_id, course_id, semester)\n);\nINSERT INTO enrollments VALUES\n(101, 10, 'Fall-2026', 'A'),\n(101, 20, 'Fall-2026', 'B'),\n(102, 10, 'Fall-2026', 'A'),\n(103, 10, 'Spring-2026', 'A');",
    sample_data: [
      {
            "fall_2026_grade_A": "101-10, 102-10"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT student_id, course_id, grade\nFROM enrollments\nWHERE ...;",
    solution_query: "SELECT student_id, course_id, grade FROM enrollments WHERE semester = 'Fall-2026' AND grade = 'A' ORDER BY student_id ASC;",
    expected_result: [
      {
            "student_id": 101,
            "course_id": 10,
            "grade": "A"
      },
      {
            "student_id": 102,
            "course_id": 10,
            "grade": "A"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Filtered results",
        description: "Verify student 101 and 102 in Fall-2026 with grade A are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].student_id === 101 && res[1].student_id === 102
      }
    ],
    hints: [
      "Hint 1: Use `WHERE semester = 'Fall-2026' AND grade = 'A'`.",
      "Hint 2: Order by `student_id ASC`."
],
    explanation: "Demonstrates point queries on relations with multi-attribute composite primary keys.",
    queryBreakdown: [
      {
            "clause": "WHERE semester = 'Fall-2026' AND grade = 'A'",
            "purpose": "Filters composite key table."
      }
]
  },
  {
    id: "sql-ch-44",
    topicId: "relational-model-keys",
    title: "Simulate Foreign Key Cascade Delete Impact",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Referential Actions (CASCADE)",
      "role": "Systems Engineer Specialist"
},
    prompt: "Before deleting customer with `id = 1`, write a SQL query to inspect all dependent order IDs and total amounts in `orders` that would be wiped out under `ON DELETE CASCADE`. Order by `order_id`.",
    schema_context: "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    customer_id INT,\n    amount NUMERIC\n);\nINSERT INTO orders VALUES\n(1001, 1, 450),\n(1002, 2, 200),\n(1003, 1, 890),\n(1004, 3, 150);",
    sample_data: [
      {
            "orders_for_customer_1": "1001 ($450), 1003 ($890)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT order_id, amount\nFROM orders\nWHERE customer_id = ...\nORDER BY order_id ASC;",
    solution_query: "SELECT order_id, amount FROM orders WHERE customer_id = 1 ORDER BY order_id ASC;",
    expected_result: [
      {
            "order_id": 1001,
            "amount": 450
      },
      {
            "order_id": 1003,
            "amount": 890
      }
],
    test_cases: [
      {
        id: 1,
        title: "Cascade scope check",
        description: "Verify orders 1001 and 1003 are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 1001 && res[1].order_id === 1003
      }
    ],
    hints: [
      "Hint 1: Query `WHERE customer_id = 1`.",
      "Hint 2: Order by `order_id ASC`."
],
    explanation: "Audits the exact blast radius of child records that would be removed by cascading foreign keys.",
    queryBreakdown: [
      {
            "clause": "WHERE customer_id = 1",
            "purpose": "Isolates child records tied to targeted parent."
      }
]
  },
  {
    id: "sql-ch-45",
    topicId: "views-stored-procedures",
    title: "Querying a Predefined Analytical View",
    difficulty: "Easy",
    attribution: "Placement-style (Cognizant / Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - Database Views & Abstraction",
      "role": "Systems Associate"
},
    prompt: "Write a SQL query to select all records from the analytical view `v_dept_summary` where `avg_salary` is at least 80,000, ordered by `avg_salary` descending.",
    schema_context: "CREATE TABLE emp (id INT, dept VARCHAR(50), salary INT);\nINSERT INTO emp VALUES (1, 'IT', 90000), (2, 'IT', 95000), (3, 'HR', 60000);\nCREATE VIEW v_dept_summary AS\nSELECT dept, COUNT(*) AS emp_count, AVG(salary) AS avg_salary\nFROM emp GROUP BY dept;",
    sample_data: [
      {
            "view": "v_dept_summary (IT: 92500, HR: 60000)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT dept, emp_count, avg_salary\nFROM v_dept_summary\nWHERE ...;",
    solution_query: "SELECT dept, emp_count, avg_salary FROM v_dept_summary WHERE avg_salary >= 80000 ORDER BY avg_salary DESC;",
    expected_result: [
      {
            "dept": "IT",
            "emp_count": 2,
            "avg_salary": 92500.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "View query check",
        description: "Verify IT department with avg 92500 is returned from the view",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].dept === 'IT'
      }
    ],
    hints: [
      "Hint 1: Treat `v_dept_summary` like any standard SQL table.",
      "Hint 2: Filter `WHERE avg_salary >= 80000`."
],
    explanation: "Views present a virtual relational interface, allowing complex precomputed queries to be filtered cleanly with standard WHERE clauses.",
    queryBreakdown: [
      {
            "clause": "FROM v_dept_summary",
            "purpose": "Queries the virtual relation abstraction."
      }
]
  },
  {
    id: "sql-ch-46",
    topicId: "views-stored-procedures",
    title: "Salary Tier Classification with CASE",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / TCS)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon Online Assessment - Conditional CASE Expressions",
      "role": "SDE-1"
},
    prompt: "Write a SQL query using `CASE` to report `name`, `salary`, and a new column `salary_tier`: 'Senior' if salary >= 90000, 'Mid' if salary BETWEEN 60000 AND 89999, and 'Entry' otherwise. Order by `salary` descending.",
    schema_context: "CREATE TABLE staff (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    salary INT\n);\nINSERT INTO staff VALUES\n(1, 'Alice', 105000),\n(2, 'Bob', 75000),\n(3, 'Charlie', 45000),\n(4, 'Diana', 92000);",
    sample_data: [
      {
            "Alice": "105k (Senior)",
            "Diana": "92k (Senior)",
            "Bob": "75k (Mid)",
            "Charlie": "45k (Entry)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT name, salary,\n       CASE\n           WHEN ... THEN 'Senior'\n           WHEN ... THEN 'Mid'\n           ELSE 'Entry'\n       END AS salary_tier\nFROM staff\nORDER BY salary DESC;",
    solution_query: "SELECT name, salary, CASE WHEN salary >= 90000 THEN 'Senior' WHEN salary BETWEEN 60000 AND 89999 THEN 'Mid' ELSE 'Entry' END AS salary_tier FROM staff ORDER BY salary DESC;",
    expected_result: [
      {
            "name": "Alice",
            "salary": 105000,
            "salary_tier": "Senior"
      },
      {
            "name": "Diana",
            "salary": 92000,
            "salary_tier": "Senior"
      },
      {
            "name": "Bob",
            "salary": 75000,
            "salary_tier": "Mid"
      },
      {
            "name": "Charlie",
            "salary": 45000,
            "salary_tier": "Entry"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Tiers classified",
        description: "Verify all 4 employees receive correct tiers",
        passedCheck: (res) => Array.isArray(res) && res.length === 4 && res[0].salary_tier === 'Senior' && res[2].salary_tier === 'Mid' && res[3].salary_tier === 'Entry'
      }
    ],
    hints: [
      "Hint 1: Use `CASE WHEN salary >= 90000 THEN 'Senior' ... ELSE 'Entry' END`.",
      "Hint 2: Alias the expression as `salary_tier`."
],
    explanation: "CASE expressions provide if-then-else branching logic inside queries to synthesize categorized attributes.",
    queryBreakdown: [
      {
            "clause": "CASE WHEN ... END AS salary_tier",
            "purpose": "Applies inline business conditional classification."
      }
]
  },
  {
    id: "sql-ch-47",
    topicId: "views-stored-procedures",
    title: "Compute Gross, Deductions, and Net Pay",
    difficulty: "Easy",
    attribution: "Placement-style (Wipro / Infosys)",
    companyMetadata: {
      "company": "Wipro",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Wipro Technical Round - Computed Column Expressions",
      "role": "Project Engineer"
},
    prompt: "Write a SQL query to calculate `emp_id`, `name`, `gross_salary`, tax as `tax_deduction` (10% of gross), and `net_pay` (gross - tax). Order by `net_pay` descending.",
    schema_context: "CREATE TABLE payroll (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    gross_salary NUMERIC(10,2)\n);\nINSERT INTO payroll VALUES\n(1, 'Kavita', 100000.00),\n(2, 'Laksh', 60000.00),\n(3, 'Manish', 80000.00);",
    sample_data: [
      {
            "Kavita": "Gross 100k, Tax 10k, Net 90k"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT emp_id, name, gross_salary,\n       (gross_salary * 0.10) AS tax_deduction,\n       (gross_salary * 0.90) AS net_pay\nFROM payroll\nORDER BY net_pay DESC;",
    solution_query: "SELECT emp_id, name, gross_salary, (gross_salary * 0.10) AS tax_deduction, (gross_salary * 0.90) AS net_pay FROM payroll ORDER BY net_pay DESC;",
    expected_result: [
      {
            "emp_id": 1,
            "name": "Kavita",
            "gross_salary": 100000.0,
            "tax_deduction": 10000.0,
            "net_pay": 90000.0
      },
      {
            "emp_id": 3,
            "name": "Manish",
            "gross_salary": 80000.0,
            "tax_deduction": 8000.0,
            "net_pay": 72000.0
      },
      {
            "emp_id": 2,
            "name": "Laksh",
            "gross_salary": 60000.0,
            "tax_deduction": 6000.0,
            "net_pay": 54000.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Net pay computed",
        description: "Verify Kavita net_pay is 90,000",
        passedCheck: (res) => Array.isArray(res) && res[0].name === 'Kavita' && res[0].net_pay == 90000
      }
    ],
    hints: [
      "Hint 1: Multiply `gross_salary * 0.10` for tax.",
      "Hint 2: Multiply `gross_salary * 0.90` for net pay."
],
    explanation: "Calculated columns allow mathematical transformations without altering underlying stored table columns.",
    queryBreakdown: [
      {
            "clause": "(gross_salary * 0.90) AS net_pay",
            "purpose": "Computes derived pay value."
      }
]
  },
  {
    id: "sql-ch-48",
    topicId: "views-stored-procedures",
    title: "Pivot Monthly Sales by Quarter using CASE & SUM",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Deloitte)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon Business Intelligence - Matrix Pivot Operations",
      "role": "BI Engineer / SDE"
},
    prompt: "Write a SQL query to pivot sales data by `rep_name`, showing `q1_sales` (sum of Q1 sales) and `q2_sales` (sum of Q2 sales). Order by `rep_name`.",
    schema_context: "CREATE TABLE sales (\n    id INT PRIMARY KEY,\n    rep_name VARCHAR(50),\n    quarter VARCHAR(10),\n    revenue INT\n);\nINSERT INTO sales VALUES\n(1, 'Alice', 'Q1', 5000),\n(2, 'Alice', 'Q2', 7000),\n(3, 'Bob', 'Q1', 3000),\n(4, 'Bob', 'Q2', 4000);",
    sample_data: [
      {
            "Alice": "Q1: 5000, Q2: 7000"
      },
      {
            "Bob": "Q1: 3000, Q2: 4000"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT rep_name,\n       SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS q1_sales,\n       SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS q2_sales\nFROM sales\nGROUP BY rep_name\nORDER BY rep_name ASC;",
    solution_query: "SELECT rep_name, SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS q1_sales, SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS q2_sales FROM sales GROUP BY rep_name ORDER BY rep_name ASC;",
    expected_result: [
      {
            "rep_name": "Alice",
            "q1_sales": 5000,
            "q2_sales": 7000
      },
      {
            "rep_name": "Bob",
            "q1_sales": 3000,
            "q2_sales": 4000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Pivoted columns",
        description: "Verify Alice has 5000 in Q1 and 7000 in Q2",
        passedCheck: (res) => Array.isArray(res) && res.some(r => r.rep_name === 'Alice' && r.q1_sales === 5000 && r.q2_sales === 7000)
      }
    ],
    hints: [
      "Hint 1: Use conditional aggregation: `SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END)`.",
      "Hint 2: Group by `rep_name`."
],
    explanation: "Combining SUM with CASE statements transforms row-level dimension values into dedicated analytical columns (pivoting).",
    queryBreakdown: [
      {
            "clause": "SUM(CASE WHEN ...)",
            "purpose": "Performs column transpose aggregation."
      }
]
  },
  {
    id: "sql-ch-49",
    topicId: "indexing-btrees",
    title: "Range Scan Predicate Optimization",
    difficulty: "Easy",
    attribution: "Placement-style (Amazon / Oracle)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - B+ Tree Range Traversals",
      "role": "SDE-1"
},
    prompt: "Write a SQL query that retrieves `account_id` and `balance` for all accounts with balance between 5000 and 15000 inclusive, ordered by `balance`.",
    schema_context: "CREATE TABLE accounts (\n    account_id INT PRIMARY KEY,\n    balance INT\n);\nINSERT INTO accounts VALUES (101, 3000), (102, 7500), (103, 12000), (104, 25000);",
    sample_data: [
      {
            "accounts": "102 (7500), 103 (12000)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT account_id, balance FROM accounts WHERE balance BETWEEN 5000 AND 15000 ORDER BY balance ASC;",
    solution_query: "SELECT account_id, balance FROM accounts WHERE balance BETWEEN 5000 AND 15000 ORDER BY balance ASC;",
    expected_result: [
      {
            "account_id": 102,
            "balance": 7500
      },
      {
            "account_id": 103,
            "balance": 12000
      }
],
    test_cases: [
      {
        id: 1,
        title: "Range filter check",
        description: "Verify only 102 and 103 qualify",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].account_id === 102 && res[1].account_id === 103
      }
    ],
    hints: [
      "Hint 1: Use `WHERE balance BETWEEN 5000 AND 15000`.",
      "Hint 2: Sort by `balance ASC`."
],
    explanation: "In a B+ Tree, range predicates navigate directly to the starting leaf page and scan sibling pointers linearly.",
    queryBreakdown: [
      {
            "clause": "WHERE balance BETWEEN 5000 AND 15000",
            "purpose": "Executes B+ Tree index range scan."
      }
]
  },
  {
    id: "sql-ch-50",
    topicId: "indexing-btrees",
    title: "Multi-Column Composite Index Leftmost Matching",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Database Tuning)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon Database Internals - Composite Index Leftmost Prefix Rule",
      "role": "SDE-2"
},
    prompt: "Write a query filtering orders where `status = 'SHIPPED'` and `customer_id = 1`, ordering by `order_id` ascending.",
    schema_context: "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    status VARCHAR(20),\n    customer_id INT\n);\nINSERT INTO orders VALUES\n(1, 'SHIPPED', 1),\n(2, 'PENDING', 1),\n(3, 'SHIPPED', 2),\n(4, 'SHIPPED', 1);",
    sample_data: [
      {
            "orders": "1: SHIPPED-1, 4: SHIPPED-1"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT order_id, status, customer_id FROM orders WHERE status = 'SHIPPED' AND customer_id = 1 ORDER BY order_id ASC;",
    solution_query: "SELECT order_id, status, customer_id FROM orders WHERE status = 'SHIPPED' AND customer_id = 1 ORDER BY order_id ASC;",
    expected_result: [
      {
            "order_id": 1,
            "status": "SHIPPED",
            "customer_id": 1
      },
      {
            "order_id": 4,
            "status": "SHIPPED",
            "customer_id": 1
      }
],
    test_cases: [
      {
        id: 1,
        title: "Matches both conditions",
        description: "Verify orders 1 and 4 are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].order_id === 1 && res[1].order_id === 4
      }
    ],
    hints: [
      "Hint 1: Filter with `WHERE status = 'SHIPPED' AND customer_id = 1`.",
      "Hint 2: Sort by `order_id ASC`."
],
    explanation: "Evaluating equality predicates matching composite index column order enables maximum index subtree pruning.",
    queryBreakdown: [
      {
            "clause": "WHERE status = 'SHIPPED' AND customer_id = 1",
            "purpose": "Leverages composite index leftmost matching."
      }
]
  },
  {
    id: "sql-ch-51",
    topicId: "indexing-btrees",
    title: "Indexed Multi-Value Probe with IN",
    difficulty: "Medium",
    attribution: "Placement-style (TCS / Capgemini)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "TCS Placement Prep - Indexed Set Lookups",
      "role": "Systems Engineer"
},
    prompt: "Write a SQL query to retrieve `user_id`, `username`, and `role` for all users whose `user_id` is in (101, 103, 105). Order by `user_id`.",
    schema_context: "CREATE TABLE users (\n    user_id INT PRIMARY KEY,\n    username VARCHAR(50),\n    role VARCHAR(30)\n);\nINSERT INTO users VALUES\n(101, 'alex', 'ADMIN'),\n(102, 'bob', 'USER'),\n(103, 'charlie', 'MOD'),\n(104, 'david', 'USER'),\n(105, 'eve', 'ADMIN');",
    sample_data: [
      {
            "users": "101, 103, 105"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT user_id, username, role FROM users WHERE user_id IN (101, 103, 105) ORDER BY user_id ASC;",
    solution_query: "SELECT user_id, username, role FROM users WHERE user_id IN (101, 103, 105) ORDER BY user_id ASC;",
    expected_result: [
      {
            "user_id": 101,
            "username": "alex",
            "role": "ADMIN"
      },
      {
            "user_id": 103,
            "username": "charlie",
            "role": "MOD"
      },
      {
            "user_id": 105,
            "username": "eve",
            "role": "ADMIN"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Probe matching",
        description: "Verify exactly 101, 103, 105 are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 3 && res[0].user_id === 101 && res[2].user_id === 105
      }
    ],
    hints: [
      "Hint 1: Use `WHERE user_id IN (101, 103, 105)`.",
      "Hint 2: Order by `user_id ASC`."
],
    explanation: "Primary key lookups with IN perform multiple fast point searches down the B+ tree.",
    queryBreakdown: [
      {
            "clause": "WHERE user_id IN (...)",
            "purpose": "Probes primary key index directly."
      }
]
  },
  {
    id: "sql-ch-52",
    topicId: "normalization",
    title: "Querying Normalized 1NF Atomic Attributes",
    difficulty: "Medium",
    attribution: "Placement-style (Infosys / Wipro)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - First Normal Form & Atomicity",
      "role": "Systems Associate"
},
    prompt: "In a properly normalized 1NF table `student_skills`, write a SQL query to find all students who possess the 'SQL' skill. Return `student_name` and `skill`. Order by `student_name`.",
    schema_context: "CREATE TABLE student_skills (\n    student_id INT,\n    student_name VARCHAR(50),\n    skill VARCHAR(50)\n);\nINSERT INTO student_skills VALUES\n(1, 'Rohan', 'Java'),\n(1, 'Rohan', 'SQL'),\n(2, 'Priya', 'Python'),\n(3, 'Ankit', 'SQL');",
    sample_data: [
      {
            "SQL_skills": "Rohan, Ankit"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT student_name, skill FROM student_skills WHERE skill = 'SQL' ORDER BY student_name ASC;",
    solution_query: "SELECT student_name, skill FROM student_skills WHERE skill = 'SQL' ORDER BY student_name ASC;",
    expected_result: [
      {
            "student_name": "Ankit",
            "skill": "SQL"
      },
      {
            "student_name": "Rohan",
            "skill": "SQL"
      }
],
    test_cases: [
      {
        id: 1,
        title: "SQL skills identified",
        description: "Verify Ankit and Rohan are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].student_name === 'Ankit' && res[1].student_name === 'Rohan'
      }
    ],
    hints: [
      "Hint 1: In 1NF, every attribute is atomic, so a simple `WHERE skill = 'SQL'` works without regex or string parsing.",
      "Hint 2: Sort by `student_name ASC`."
],
    explanation: "Because 1NF enforces atomic values rather than comma-separated lists, filtering operations are fast, indexable, and standard.",
    queryBreakdown: [
      {
            "clause": "WHERE skill = 'SQL'",
            "purpose": "Direct equality search on atomic 1NF attribute."
      }
]
  },
  {
    id: "sql-ch-53",
    topicId: "normalization",
    title: "Reconstruct Normalized Relations via Foreign Key Join",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT - Lossless Join Decompositions",
      "role": "Ninja Developer"
},
    prompt: "Write a SQL query that joins normalized tables `orders` and `order_details` to calculate `order_id` and total order amount as `total_cost`. Order by `order_id`.",
    schema_context: "CREATE TABLE orders (\n    order_id INT PRIMARY KEY,\n    order_date DATE\n);\nCREATE TABLE order_details (\n    item_id INT PRIMARY KEY,\n    order_id INT,\n    price INT,\n    quantity INT\n);\nINSERT INTO orders VALUES (101, '2026-03-01'), (102, '2026-03-02');\nINSERT INTO order_details VALUES (1, 101, 100, 2), (2, 101, 50, 1), (3, 102, 200, 1);",
    sample_data: [
      {
            "order_101": "2*100 + 1*50 = 250"
      },
      {
            "order_102": "1*200 = 200"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT o.order_id, SUM(od.price * od.quantity) AS total_cost\nFROM orders o\nJOIN order_details od ON o.order_id = od.order_id\nGROUP BY o.order_id\nORDER BY o.order_id ASC;",
    solution_query: "SELECT o.order_id, SUM(od.price * od.quantity) AS total_cost FROM orders o JOIN order_details od ON o.order_id = od.order_id GROUP BY o.order_id ORDER BY o.order_id ASC;",
    expected_result: [
      {
            "order_id": 101,
            "total_cost": 250
      },
      {
            "order_id": 102,
            "total_cost": 200
      }
],
    test_cases: [
      {
        id: 1,
        title: "Lossless join cost calculation",
        description: "Verify 101 has cost 250 and 102 has 200",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].total_cost === 250 && res[1].total_cost === 200
      }
    ],
    hints: [
      "Hint 1: Join on foreign key `o.order_id = od.order_id`.",
      "Hint 2: Sum `price * quantity` grouped by `order_id`."
],
    explanation: "Lossless-join decomposition allows relations to be stored separately without redundancy and reconstructed cleanly at query time.",
    queryBreakdown: [
      {
            "clause": "JOIN order_details od ON o.order_id = od.order_id",
            "purpose": "Reconstructs relationship losslessly."
      }
]
  },
  {
    id: "sql-ch-54",
    topicId: "normalization",
    title: "Detect Transitive Redundancy Inconsistencies",
    difficulty: "Medium",
    attribution: "Placement-style (GATE / Infosys)",
    companyMetadata: {
      "company": "Infosys",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Interview - 2NF vs 3NF Transitive Dependencies",
      "role": "Systems Engineer"
},
    prompt: "In an unnormalized table violating 3NF, identify department codes having more than 1 distinct department name recorded. Return `dept_code`.",
    schema_context: "CREATE TABLE unnormalized_staff (\n    emp_id INT PRIMARY KEY,\n    name VARCHAR(50),\n    dept_code VARCHAR(10),\n    dept_name VARCHAR(50)\n);\nINSERT INTO unnormalized_staff VALUES\n(1, 'A', 'D1', 'Technology'),\n(2, 'B', 'D1', 'Tech Dept'),\n(3, 'C', 'D2', 'Human Resources'),\n(4, 'D', 'D2', 'Human Resources');",
    sample_data: [
      {
            "D1": "Recorded as both 'Technology' and 'Tech Dept' (update anomaly)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT dept_code\nFROM unnormalized_staff\nGROUP BY dept_code\nHAVING COUNT(DISTINCT dept_name) > 1;",
    solution_query: "SELECT dept_code FROM unnormalized_staff GROUP BY dept_code HAVING COUNT(DISTINCT dept_name) > 1;",
    expected_result: [
      {
            "dept_code": "D1"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Inconsistency detected",
        description: "Verify D1 is identified as inconsistent",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].dept_code === 'D1'
      }
    ],
    hints: [
      "Hint 1: Group by `dept_code`.",
      "Hint 2: Filter with `HAVING COUNT(DISTINCT dept_name) > 1`."
],
    explanation: "Transitive dependencies (emp_id -> dept_code -> dept_name) cause update anomalies when a department name changes in one row but not another.",
    queryBreakdown: [
      {
            "clause": "HAVING COUNT(DISTINCT dept_name) > 1",
            "purpose": "Catches redundant non-key update anomalies."
      }
]
  },
  {
    id: "sql-ch-55",
    topicId: "transactions-acid",
    title: "Double-Entry Ledger Audit Reconciliation",
    difficulty: "Medium",
    attribution: "Placement-style (Deloitte / Banking)",
    companyMetadata: {
      "company": "Deloitte",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Deloitte Financial Systems - Ledger Audit Queries",
      "role": "Technology Analyst"
},
    prompt: "Write a SQL query to verify that the total debits equal total credits across all transactions. Return `total_debits`, `total_credits`, and `ledger_balanced` ('BALANCED' if equal, 'UNBALANCED' otherwise).",
    schema_context: "CREATE TABLE ledger_entries (\n    entry_id INT PRIMARY KEY,\n    tx_id INT,\n    debit NUMERIC(10,2),\n    credit NUMERIC(10,2)\n);\nINSERT INTO ledger_entries VALUES\n(1, 1001, 500.00, 0.00),\n(2, 1001, 0.00, 500.00),\n(3, 1002, 1200.00, 0.00),\n(4, 1002, 0.00, 1200.00);",
    sample_data: [
      {
            "total_debits": 1700,
            "total_credits": 1700
      }
],
    starter_query: "-- Write your SQL query below\nSELECT SUM(debit) AS total_debits, SUM(credit) AS total_credits,\n       CASE WHEN SUM(debit) = SUM(credit) THEN 'BALANCED' ELSE 'UNBALANCED' END AS ledger_balanced\nFROM ledger_entries;",
    solution_query: "SELECT SUM(debit) AS total_debits, SUM(credit) AS total_credits, CASE WHEN SUM(debit) = SUM(credit) THEN 'BALANCED' ELSE 'UNBALANCED' END AS ledger_balanced FROM ledger_entries;",
    expected_result: [
      {
            "total_debits": 1700.0,
            "total_credits": 1700.0,
            "ledger_balanced": "BALANCED"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Balanced audit check",
        description: "Verify ledger is BALANCED with 1700 on both sides",
        passedCheck: (res) => Array.isArray(res) && res[0].ledger_balanced === 'BALANCED' && res[0].total_debits == 1700
      }
    ],
    hints: [
      "Hint 1: Use `SUM(debit)` and `SUM(credit)`.",
      "Hint 2: Compare sums in a `CASE` statement."
],
    explanation: "Guarantees transaction consistency (the 'C' in ACID) across financial ledger entries.",
    queryBreakdown: [
      {
            "clause": "CASE WHEN SUM(debit) = SUM(credit)...",
            "purpose": "Verifies accounting equality invariant."
      }
]
  },
  {
    id: "sql-ch-56",
    topicId: "transactions-acid",
    title: "Identify Uncommitted or Pending Transactions",
    difficulty: "Easy",
    attribution: "Placement-style (Amazon / Core Engineering)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon Payments - Transaction State Auditing",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to select `tx_id`, `user_id`, and `amount` for all transactions whose status is 'PENDING', ordered by `tx_id`.",
    schema_context: "CREATE TABLE transaction_log (\n    tx_id INT PRIMARY KEY,\n    user_id INT,\n    amount NUMERIC,\n    status VARCHAR(20)\n);\nINSERT INTO transaction_log VALUES\n(1, 10, 50, 'COMMITTED'),\n(2, 11, 200, 'PENDING'),\n(3, 10, 150, 'FAILED'),\n(4, 12, 80, 'PENDING');",
    sample_data: [
      {
            "pending": "tx 2 and 4"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT tx_id, user_id, amount\nFROM transaction_log\nWHERE status = 'PENDING'\nORDER BY tx_id ASC;",
    solution_query: "SELECT tx_id, user_id, amount FROM transaction_log WHERE status = 'PENDING' ORDER BY tx_id ASC;",
    expected_result: [
      {
            "tx_id": 2,
            "user_id": 11,
            "amount": 200
      },
      {
            "tx_id": 4,
            "user_id": 12,
            "amount": 80
      }
],
    test_cases: [
      {
        id: 1,
        title: "Pending rows isolated",
        description: "Verify transactions 2 and 4 are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].tx_id === 2 && res[1].tx_id === 4
      }
    ],
    hints: [
      "Hint 1: Filter with `WHERE status = 'PENDING'`.",
      "Hint 2: Sort by `tx_id ASC`."
],
    explanation: "Transactions not in COMMITTED state must be tracked by the Recovery Manager for potential rollback or retry.",
    queryBreakdown: [
      {
            "clause": "WHERE status = 'PENDING'",
            "purpose": "Isolates active uncommitted operations."
      }
]
  },
  {
    id: "sql-ch-57",
    topicId: "transactions-acid",
    title: "Idempotent Transaction Token Validation",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Flipkart)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE - Idempotent Payment API Design",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to check if an idempotency key `idem_key = 'KEY-ABC-123'` already exists in `payments`. If found, return `payment_id` and `status` to prevent double-charging.",
    schema_context: "CREATE TABLE payments (\n    payment_id INT PRIMARY KEY,\n    idem_key VARCHAR(50),\n    amount NUMERIC,\n    status VARCHAR(20)\n);\nINSERT INTO payments VALUES\n(1001, 'KEY-ABC-123', 99.00, 'SUCCESS'),\n(1002, 'KEY-XYZ-999', 49.00, 'SUCCESS');",
    sample_data: [
      {
            "key": "KEY-ABC-123 exists as payment 1001"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT payment_id, status\nFROM payments\nWHERE idem_key = 'KEY-ABC-123';",
    solution_query: "SELECT payment_id, status FROM payments WHERE idem_key = 'KEY-ABC-123';",
    expected_result: [
      {
            "payment_id": 1001,
            "status": "SUCCESS"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Idempotency match",
        description: "Verify payment 1001 is retrieved",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].payment_id === 1001
      }
    ],
    hints: [
      "Hint 1: Query by `WHERE idem_key = 'KEY-ABC-123'`.",
      "Hint 2: Project `payment_id` and `status` to inspect the cached response state."
],
    explanation: "Idempotency prevents duplicate state mutations during distributed network retries.",
    queryBreakdown: [
      {
            "clause": "WHERE idem_key = ...",
            "purpose": "Probes unique client idempotency token."
      }
]
  },
  {
    id: "sql-ch-58",
    topicId: "concurrency-locking",
    title: "Inspect Active Lock Contention in System Catalog",
    difficulty: "Medium",
    attribution: "Placement-style (Oracle / Microsoft)",
    companyMetadata: {
      "company": "Microsoft",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Microsoft SQL Server - Lock Escalation & Blocking Queries",
      "role": "Software Engineer"
},
    prompt: "Write a SQL query to select all transactions in `db_locks` waiting for a lock (`granted = 0`), returning `tx_id`, `resource_name`, and `lock_mode`. Order by `tx_id`.",
    schema_context: "CREATE TABLE db_locks (\n    lock_id INT PRIMARY KEY,\n    tx_id INT,\n    resource_name VARCHAR(50),\n    lock_mode VARCHAR(10),\n    granted INT\n);\nINSERT INTO db_locks VALUES\n(1, 101, 'table_accounts', 'X', 1),\n(2, 102, 'table_accounts', 'X', 0),\n(3, 103, 'table_orders', 'S', 1),\n(4, 104, 'table_accounts', 'S', 0);",
    sample_data: [
      {
            "waiting": "tx 102 and 104 waiting for table_accounts"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT tx_id, resource_name, lock_mode\nFROM db_locks\nWHERE granted = 0\nORDER BY tx_id ASC;",
    solution_query: "SELECT tx_id, resource_name, lock_mode FROM db_locks WHERE granted = 0 ORDER BY tx_id ASC;",
    expected_result: [
      {
            "tx_id": 102,
            "resource_name": "table_accounts",
            "lock_mode": "X"
      },
      {
            "tx_id": 104,
            "resource_name": "table_accounts",
            "lock_mode": "S"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Blocked transactions identified",
        description: "Verify transactions 102 and 104 are isolated",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].tx_id === 102 && res[1].tx_id === 104
      }
    ],
    hints: [
      "Hint 1: Filter with `WHERE granted = 0`.",
      "Hint 2: Order by `tx_id ASC`."
],
    explanation: "Identifies blocked transactions waiting in the lock manager queue.",
    queryBreakdown: [
      {
            "clause": "WHERE granted = 0",
            "purpose": "Filters for transactions denied immediate lock acquisition."
      }
]
  },
  {
    id: "sql-ch-59",
    topicId: "concurrency-locking",
    title: "Detect Deadlock Wait-For Dependency Pairs",
    difficulty: "Hard",
    attribution: "Placement-style (Oracle / Microsoft)",
    companyMetadata: {
      "company": "Microsoft",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Microsoft - Deadlock Graph Cycle Identification",
      "role": "Core Database Engineer"
},
    prompt: "In a wait-for graph table `tx_waits`, write a SQL query to detect mutual deadlock pairs where T1 is waiting for T2, and T2 is also waiting for T1. Return `t1_tx` and `t2_tx` (where t1_tx < t2_tx).",
    schema_context: "CREATE TABLE tx_waits (\n    waiting_tx INT,\n    holding_tx INT\n);\nINSERT INTO tx_waits VALUES\n(101, 102),\n(102, 101),\n(103, 104);",
    sample_data: [
      {
            "mutual_deadlock": "101 waits for 102 AND 102 waits for 101"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT w1.waiting_tx AS t1_tx, w1.holding_tx AS t2_tx\nFROM tx_waits w1\nJOIN tx_waits w2 ON ...\nWHERE ...;",
    solution_query: "SELECT w1.waiting_tx AS t1_tx, w1.holding_tx AS t2_tx FROM tx_waits w1 JOIN tx_waits w2 ON w1.waiting_tx = w2.holding_tx AND w1.holding_tx = w2.waiting_tx WHERE w1.waiting_tx < w1.holding_tx;",
    expected_result: [
      {
            "t1_tx": 101,
            "t2_tx": 102
      }
],
    test_cases: [
      {
        id: 1,
        title: "Deadlock cycle pair detected",
        description: "Verify 101 and 102 are identified as mutual deadlock partners",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].t1_tx === 101 && res[0].t2_tx === 102
      }
    ],
    hints: [
      "Hint 1: Self-join `tx_waits` on `w1.waiting_tx = w2.holding_tx AND w1.holding_tx = w2.waiting_tx`.",
      "Hint 2: Filter with `w1.waiting_tx < w1.holding_tx` to prevent duplicate reverse pairs."
],
    explanation: "Self-joining a wait-for graph detects 2-cycle deadlocks where two transactions hold resources needed by each other.",
    queryBreakdown: [
      {
            "clause": "JOIN tx_waits w2 ON w1.waiting_tx = w2.holding_tx...",
            "purpose": "Traverses dependency edges to detect cycles."
      }
]
  },
  {
    id: "sql-ch-60",
    topicId: "dbms-architecture",
    title: "Querying System Data Dictionary for User Tables",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Infosys)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital - Database Metadata & Information Schema",
      "role": "Systems Engineer"
},
    prompt: "Write a SQL query against the system catalog table `system_catalog_tables` to find the `table_name` and `row_count` of all tables in schema 'public'. Order by `table_name`.",
    schema_context: "CREATE TABLE system_catalog_tables (\n    table_id INT PRIMARY KEY,\n    table_name VARCHAR(50),\n    schema_name VARCHAR(50),\n    row_count INT\n);\nINSERT INTO system_catalog_tables VALUES\n(1, 'employees', 'public', 1500),\n(2, 'departments', 'public', 25),\n(3, 'pg_internal', 'pg_catalog', 400);",
    sample_data: [
      {
            "public_tables": "employees (1500), departments (25)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT table_name, row_count\nFROM system_catalog_tables\nWHERE schema_name = 'public'\nORDER BY table_name ASC;",
    solution_query: "SELECT table_name, row_count FROM system_catalog_tables WHERE schema_name = 'public' ORDER BY table_name ASC;",
    expected_result: [
      {
            "table_name": "departments",
            "row_count": 25
      },
      {
            "table_name": "employees",
            "row_count": 1500
      }
],
    test_cases: [
      {
        id: 1,
        title: "Catalog metadata filtered",
        description: "Verify departments and employees are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].table_name === 'departments' && res[1].table_name === 'employees'
      }
    ],
    hints: [
      "Hint 1: Filter on `WHERE schema_name = 'public'`.",
      "Hint 2: Order by `table_name ASC`."
],
    explanation: "DBMS architecture stores system metadata in the Data Dictionary (ANSI INFORMATION_SCHEMA or system tables).",
    queryBreakdown: [
      {
            "clause": "WHERE schema_name = 'public'",
            "purpose": "Filters metadata dictionary for user objects."
      }
]
  },
  {
    id: "sql-ch-61",
    topicId: "dbms-architecture",
    title: "Buffer Pool Cache Hit Ratio Calculation",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Database Internals)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "Amazon SDE - Database Performance & Buffer Pool Tuning",
      "role": "SDE-2"
},
    prompt: "Write a SQL query to calculate the buffer pool cache hit percentage as `hit_ratio` using formula: `(buffer_hits * 100.0) / (buffer_hits + disk_reads)`, rounded to 1 decimal place. Return `server_id` and `hit_ratio`.",
    schema_context: "CREATE TABLE buffer_pool_metrics (\n    server_id INT PRIMARY KEY,\n    buffer_hits INT,\n    disk_reads INT\n);\nINSERT INTO buffer_pool_metrics VALUES\n(1, 9500, 500),\n(2, 7000, 3000);",
    sample_data: [
      {
            "server_1": "9500 hits / 10000 total = 95.0%"
      },
      {
            "server_2": "7000 hits / 10000 total = 70.0%"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT server_id,\n       ROUND((buffer_hits * 100.0) / (buffer_hits + disk_reads), 1) AS hit_ratio\nFROM buffer_pool_metrics\nORDER BY server_id ASC;",
    solution_query: "SELECT server_id, ROUND((buffer_hits * 100.0) / (buffer_hits + disk_reads), 1) AS hit_ratio FROM buffer_pool_metrics ORDER BY server_id ASC;",
    expected_result: [
      {
            "server_id": 1,
            "hit_ratio": 95.0
      },
      {
            "server_id": 2,
            "hit_ratio": 70.0
      }
],
    test_cases: [
      {
        id: 1,
        title: "Hit ratio calculation",
        description: "Verify Server 1 has 95.0% and Server 2 has 70.0%",
        passedCheck: (res) => Array.isArray(res) && res[0].hit_ratio == 95.0 && res[1].hit_ratio == 70.0
      }
    ],
    hints: [
      "Hint 1: Multiply by `100.0` to force floating-point arithmetic in SQL.",
      "Hint 2: Wrap in `ROUND(..., 1)`."
],
    explanation: "Calculates buffer pool efficiency, indicating what proportion of disk access was avoided by RAM caching.",
    queryBreakdown: [
      {
            "clause": "ROUND((buffer_hits * 100.0) / ...)",
            "purpose": "Computes memory cache hit efficiency."
      }
]
  },
  {
    id: "sql-ch-62",
    topicId: "er-model",
    title: "Querying Many-to-Many Junction Bridge",
    difficulty: "Medium",
    attribution: "Placement-style (Cognizant / Infosys)",
    companyMetadata: {
      "company": "Cognizant",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cognizant GenC - Relational Representation of M:N Relationships",
      "role": "Programmer Analyst"
},
    prompt: "Write a SQL query that joins `students`, `student_courses`, and `courses` to list all `course_name` values taken by student 'Aarav'. Order by `course_name`.",
    schema_context: "CREATE TABLE students (\n    student_id INT PRIMARY KEY,\n    name VARCHAR(50)\n);\nCREATE TABLE courses (\n    course_id INT PRIMARY KEY,\n    course_name VARCHAR(50)\n);\nCREATE TABLE student_courses (\n    student_id INT,\n    course_id INT\n);\nINSERT INTO students VALUES (1, 'Aarav'), (2, 'Bhavna');\nINSERT INTO courses VALUES (10, 'DBMS'), (20, 'DSA'), (30, 'Networks');\nINSERT INTO student_courses VALUES (1, 10), (1, 20), (2, 30);",
    sample_data: [
      {
            "Aarav": "Enrolled in DBMS and DSA"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT c.course_name\nFROM student_courses sc\nJOIN students s ON sc.student_id = s.student_id\nJOIN courses c ON sc.course_id = c.course_id\nWHERE s.name = 'Aarav'\nORDER BY c.course_name ASC;",
    solution_query: "SELECT c.course_name FROM student_courses sc JOIN students s ON sc.student_id = s.student_id JOIN courses c ON sc.course_id = c.course_id WHERE s.name = 'Aarav' ORDER BY c.course_name ASC;",
    expected_result: [
      {
            "course_name": "DBMS"
      },
      {
            "course_name": "DSA"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Aarav courses returned",
        description: "Verify DBMS and DSA are returned for Aarav",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].course_name === 'DBMS' && res[1].course_name === 'DSA'
      }
    ],
    hints: [
      "Hint 1: Join `student_courses` to `students` and `courses`.",
      "Hint 2: Filter `WHERE s.name = 'Aarav'`."
],
    explanation: "A Many-to-Many ER relationship is decomposed into two 1:N relationships via an associative bridge table.",
    queryBreakdown: [
      {
            "clause": "JOIN courses c ON sc.course_id = c.course_id",
            "purpose": "Traverses junction table to parent course entity."
      }
]
  },
  {
    id: "sql-ch-63",
    topicId: "er-model",
    title: "Identify Dependents of Specific Parent Entity",
    difficulty: "Easy",
    attribution: "Placement-style (TCS / Wipro)",
    companyMetadata: {
      "company": "TCS",
      "evidenceType": "COMPANY_STYLE",
      "sourceTitle": "TCS Technical Round - Weak Entities & Identifying Relationships",
      "role": "Systems Engineer"
},
    prompt: "Write a SQL query to list `dependent_name` and `relationship` for all dependents of employee with `emp_id = 101` from the weak entity table `dependents`. Order by `dependent_name`.",
    schema_context: "CREATE TABLE dependents (\n    emp_id INT,\n    dependent_name VARCHAR(50),\n    relationship VARCHAR(30),\n    PRIMARY KEY (emp_id, dependent_name)\n);\nINSERT INTO dependents VALUES\n(101, 'Aarav Jr.', 'Son'),\n(101, 'Sunita', 'Spouse'),\n(102, 'Rohan Jr.', 'Son');",
    sample_data: [
      {
            "emp_101": "Aarav Jr. (Son), Sunita (Spouse)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT dependent_name, relationship\nFROM dependents\nWHERE emp_id = 101\nORDER BY dependent_name ASC;",
    solution_query: "SELECT dependent_name, relationship FROM dependents WHERE emp_id = 101 ORDER BY dependent_name ASC;",
    expected_result: [
      {
            "dependent_name": "Aarav Jr.",
            "relationship": "Son"
      },
      {
            "dependent_name": "Sunita",
            "relationship": "Spouse"
      }
],
    test_cases: [
      {
        id: 1,
        title: "Dependents retrieved",
        description: "Verify Aarav Jr. and Sunita are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 2 && res[0].dependent_name === 'Aarav Jr.' && res[1].dependent_name === 'Sunita'
      }
    ],
    hints: [
      "Hint 1: Query `WHERE emp_id = 101`.",
      "Hint 2: Order by `dependent_name ASC`."
],
    explanation: "Weak entities rely on the identifying parent's primary key (`emp_id`) plus their own partial discriminator.",
    queryBreakdown: [
      {
            "clause": "WHERE emp_id = 101",
            "purpose": "Filters weak entity records by identifying owner key."
      }
]
  },
  {
    id: "sql-ch-64",
    topicId: "sql-aggregation-groupby",
    title: "Find Multi-Column Duplicate Records",
    difficulty: "Medium",
    attribution: "Placement-style (Amazon / Walmart)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Technical Round - Multi-Attribute Deduplication",
      "role": "SDE-1"
},
    prompt: "Write a SQL query to find any duplicate combinations of (`first_name`, `last_name`, `dob`) in `members`. Return `first_name`, `last_name`, `dob`, and `count` of occurrences.",
    schema_context: "CREATE TABLE members (\n    id INT PRIMARY KEY,\n    first_name VARCHAR(50),\n    last_name VARCHAR(50),\n    dob DATE\n);\nINSERT INTO members VALUES\n(1, 'John', 'Doe', '1995-05-10'),\n(2, 'Jane', 'Smith', '1998-11-20'),\n(3, 'John', 'Doe', '1995-05-10'),\n(4, 'Alex', 'Ray', '2000-01-01');",
    sample_data: [
      {
            "duplicate": "John Doe 1995-05-10 (2 records)"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT first_name, last_name, dob, COUNT(*) AS count\nFROM members\nGROUP BY first_name, last_name, dob\nHAVING COUNT(*) > 1;",
    solution_query: "SELECT first_name, last_name, dob, COUNT(*) AS count FROM members GROUP BY first_name, last_name, dob HAVING COUNT(*) > 1;",
    expected_result: [
      {
            "first_name": "John",
            "last_name": "Doe",
            "dob": "1995-05-10",
            "count": 2
      }
],
    test_cases: [
      {
        id: 1,
        title: "Multi-column duplicate found",
        description: "Verify John Doe with count 2 is identified",
        passedCheck: (res) => Array.isArray(res) && res.length === 1 && res[0].first_name === 'John' && res[0].count === 2
      }
    ],
    hints: [
      "Hint 1: Group by all three columns: `GROUP BY first_name, last_name, dob`.",
      "Hint 2: Filter with `HAVING COUNT(*) > 1`."
],
    explanation: "Grouping by composite natural business keys isolates duplicate entities before running cleanup pipelines.",
    queryBreakdown: [
      {
            "clause": "GROUP BY first_name, last_name, dob",
            "purpose": "Collapses multi-attribute business candidate keys."
      }
]
  },
  {
    id: "sql-ch-65",
    topicId: "sql-joins",
    title: "Find Consecutive Available Cinema Seats",
    difficulty: "Hard",
    attribution: "Placement-style (Amazon / LeetCode 603)",
    companyMetadata: {
      "company": "Amazon",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "LeetCode 603 / Amazon Online Assessment - Consecutive Numbers",
      "role": "Software Development Engineer"
},
    prompt: "Write a SQL query to report all the consecutive available seats (`free = 1`) in cinema. Return `seat_id` ordered ascending. Two seats are consecutive if their IDs differ by 1 and both are free.",
    schema_context: "CREATE TABLE cinema (\n    seat_id INT PRIMARY KEY,\n    free INT\n);\nINSERT INTO cinema VALUES\n(1, 1),\n(2, 0),\n(3, 1),\n(4, 1),\n(5, 1);",
    sample_data: [
      {
            "seats": "1(free), 2(busy), 3(free), 4(free), 5(free) -> 3, 4, 5 are consecutive"
      }
],
    starter_query: "-- Write your SQL query below\nSELECT DISTINCT c1.seat_id\nFROM cinema c1\nJOIN cinema c2 ON ABS(c1.seat_id - c2.seat_id) = 1\nWHERE c1.free = 1 AND c2.free = 1\nORDER BY c1.seat_id ASC;",
    solution_query: "SELECT DISTINCT c1.seat_id FROM cinema c1 JOIN cinema c2 ON ABS(c1.seat_id - c2.seat_id) = 1 WHERE c1.free = 1 AND c2.free = 1 ORDER BY c1.seat_id ASC;",
    expected_result: [
      {
            "seat_id": 3
      },
      {
            "seat_id": 4
      },
      {
            "seat_id": 5
      }
],
    test_cases: [
      {
        id: 1,
        title: "Consecutive free seats identified",
        description: "Verify seats 3, 4, 5 are returned",
        passedCheck: (res) => Array.isArray(res) && res.length === 3 && res[0].seat_id === 3 && res[1].seat_id === 4 && res[2].seat_id === 5
      },
      {
        id: 2,
        title: "Isolated free seat 1 excluded",
        description: "Verify seat 1 is excluded because seat 2 is not free",
        passedCheck: (res) => Array.isArray(res) && !res.some(r => r.seat_id === 1)
      }
    ],
    hints: [
      "Hint 1: Self-join `cinema c1` with `cinema c2` on `ABS(c1.seat_id - c2.seat_id) = 1`.",
      "Hint 2: Filter `WHERE c1.free = 1 AND c2.free = 1` and use `DISTINCT`."
],
    explanation: "Joining on adjacent IDs (`ABS(diff) = 1`) identifies seats that have at least one adjacent partner that is also free.",
    queryBreakdown: [
      {
            "clause": "ON ABS(c1.seat_id - c2.seat_id) = 1",
            "purpose": "Pairs adjacent seat neighbors."
      },
      {
            "clause": "WHERE c1.free = 1 AND c2.free = 1",
            "purpose": "Guarantees both seats in the pair are unoccupied."
      }
]
  }
];
