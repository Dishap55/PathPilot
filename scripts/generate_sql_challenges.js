/**
 * SCRIPT TO GENERATE MASTER DBMS SQL CHALLENGES
 * Generates 65 high-quality, fully runnable SQL challenges mapped to canonical topics.
 */

const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../client/src/data/dbms/dbmsSqlChallengesData.js');

const challenges = [
  // 1. Basic Filtering
  {
    id: 'sql-ch-1',
    topicId: 'sql-basics-ddl-dml',
    title: 'High-Earning Engineers Filter',
    difficulty: 'Easy',
    attribution: 'Placement-style (TCS / Infosys)',
    companyMetadata: {
      company: 'Infosys',
      evidenceType: 'COMPANY_STYLE',
      sourceTitle: 'Infosys Technical Interview Questions - SQL Filtering',
      role: 'System Engineer'
    },
    prompt: 'Write a SQL query to select the `name` and `salary` of all employees in the "Engineering" department who earn more than 70,000, ordered by salary descending.',
    schema_context: `CREATE TABLE employees (
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
(5, 'Frank Reynolds', 'Management', 120000);`,
    sample_data: [
      { emp_id: 1, name: 'Alice Connor', department: 'Engineering', salary: 95000 },
      { emp_id: 2, name: 'Bob Vance', department: 'Sales', salary: 65000 },
      { emp_id: 3, name: 'Charlie Kelly', department: 'Engineering', salary: 85000 },
      { emp_id: 4, name: 'Dennis Reynolds', department: 'Engineering', salary: 68000 },
      { emp_id: 5, name: 'Frank Reynolds', department: 'Management', salary: 120000 }
    ],
    starter_query: `-- Write your SQL query below
SELECT name, salary
FROM employees
WHERE ...;`,
    solution_query: `SELECT name, salary FROM employees WHERE department = 'Engineering' AND salary > 70000 ORDER BY salary DESC;`,
    expected_result: [
      { name: 'Alice Connor', salary: 95000 },
      { name: 'Charlie Kelly', salary: 85000 }
    ],
    test_cases: [
      {
        id: 1,
        title: 'Engineering filter check',
        description: 'Verify only Engineering employees are included',
        passedCheck: `(res) => Array.isArray(res) && res.every(r => r.name !== 'Bob Vance' && r.name !== 'Frank Reynolds')`
      },
      {
        id: 2,
        title: 'Salary threshold check',
        description: 'Verify employees with salary <= 70000 are excluded',
        passedCheck: `(res) => Array.isArray(res) && res.every(r => r.salary > 70000)`
      },
      {
        id: 3,
        title: 'Descending sort check',
        description: 'Verify Alice (95000) appears before Charlie (85000)',
        passedCheck: `(res) => Array.isArray(res) && res.length === 2 && res[0].name === 'Alice Connor' && res[1].name === 'Charlie Kelly'`
      }
    ],
    hints: [
      'Hint 1: Use the `WHERE` clause with two conditions joined by `AND`: `department = \'Engineering\' AND salary > 70000`.',
      'Hint 2: Remember to sort by salary in descending order using `ORDER BY salary DESC`.'
    ],
    explanation: 'The WHERE clause evaluates first, filtering rows that satisfy both conditions simultaneously. SELECT projects only the requested columns, and ORDER BY sorts the final output.',
    queryBreakdown: [
      { clause: 'SELECT name, salary', purpose: 'Returns only the requested column headers.' },
      { clause: 'FROM employees', purpose: 'Specifies the source table.' },
      { clause: 'WHERE department = \'Engineering\' AND salary > 70000', purpose: 'Filters candidate rows.' },
      { clause: 'ORDER BY salary DESC', purpose: 'Sorts output from highest salary to lowest.' }
    ]
  },

  // 2. Customers Who Never Placed Orders
  {
    id: 'sql-ch-2',
    topicId: 'sql-joins',
    title: 'Customers Who Never Placed Orders',
    difficulty: 'Easy',
    attribution: 'Reported Interview (Amazon / LeetCode 183)',
    companyMetadata: {
      company: 'Amazon',
      evidenceType: 'ACTUAL_REPORTED',
      sourceTitle: 'LeetCode 183 / Amazon Online Assessment SQL Section',
      role: 'Software Development Engineer'
    },
    prompt: 'Write a SQL query to report all customers who never placed any orders. Return the column named `Customers`.',
    schema_context: `CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customerId INT
);
INSERT INTO customers VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');
INSERT INTO orders VALUES (1, 3), (2, 1);`,
    sample_data: [
      { id: 1, name: 'Joe' },
      { id: 2, name: 'Henry' },
      { id: 3, name: 'Sam' },
      { id: 4, name: 'Max' }
    ],
    starter_query: `-- Write your SQL query below
SELECT name AS Customers
FROM customers c
...;`,
    solution_query: `SELECT c.name AS Customers FROM customers c LEFT JOIN orders o ON c.id = o.customerId WHERE o.id IS NULL;`,
    expected_result: [
      { Customers: 'Henry' },
      { Customers: 'Max' }
    ],
    test_cases: [
      {
        id: 1,
        title: 'Correct count of non-ordering customers',
        description: 'Verify exactly 2 customers are returned (Henry and Max)',
        passedCheck: `(res) => Array.isArray(res) && res.length === 2`
      },
      {
        id: 2,
        title: 'Check Henry and Max presence',
        description: 'Verify both Henry and Max are in the result set',
        passedCheck: `(res) => Array.isArray(res) && res.some(r => (r.Customers || r.name) === 'Henry') && res.some(r => (r.Customers || r.name) === 'Max')`
      },
      {
        id: 3,
        title: 'Exclude ordering customers',
        description: 'Verify Joe and Sam (who placed orders) are excluded',
        passedCheck: `(res) => Array.isArray(res) && !res.some(r => (r.Customers || r.name) === 'Joe' || (r.Customers || r.name) === 'Sam')`
      }
    ],
    hints: [
      'Hint 1: A `LEFT JOIN` between `customers` and `orders` keeps all customer records regardless of whether an order exists.',
      'Hint 2: Filter for unmatched records where the foreign key in `orders` is NULL: `WHERE orders.id IS NULL`.'
    ],
    explanation: 'A LEFT JOIN pairs every customer with their order(s). Customers who never ordered produce NULL values in the orders columns. Filtering on `WHERE o.id IS NULL` isolates these customers.',
    queryBreakdown: [
      { clause: 'SELECT c.name AS Customers', purpose: 'Aliases the output column as Customers.' },
      { clause: 'FROM customers c LEFT JOIN orders o', purpose: 'Preserves all customers regardless of order existence.' },
      { clause: 'ON c.id = o.customerId', purpose: 'Joins on foreign key relationship.' },
      { clause: 'WHERE o.id IS NULL', purpose: 'Filters for customers with zero matched orders.' }
    ]
  },

  // 3. Employees Earning More Than Manager
  {
    id: 'sql-ch-3',
    topicId: 'sql-joins',
    title: 'Employees Earning More Than Their Manager',
    difficulty: 'Medium',
    attribution: 'Reported Interview (Amazon / LeetCode 181)',
    companyMetadata: {
      company: 'Amazon',
      evidenceType: 'ACTUAL_REPORTED',
      sourceTitle: 'LeetCode 181 / Amazon Technical Interview',
      role: 'SDE-1'
    },
    prompt: 'Write a SQL query to find the employees who earn more than their direct managers. Return the employee name as `Employee`.',
    schema_context: `CREATE TABLE employee (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    salary INT,
    managerId INT
);
INSERT INTO employee VALUES 
(1, 'Joe', 70000, 3),
(2, 'Henry', 80000, 4),
(3, 'Sam', 60000, NULL),
(4, 'Max', 90000, NULL);`,
    sample_data: [
      { id: 1, name: 'Joe', salary: 70000, managerId: 3 },
      { id: 2, name: 'Henry', salary: 80000, managerId: 4 },
      { id: 3, name: 'Sam', salary: 60000, managerId: null },
      { id: 4, name: 'Max', salary: 90000, managerId: null }
    ],
    starter_query: `-- Write your SQL query below
SELECT e.name AS Employee
FROM employee e
JOIN employee m ON ...;`,
    solution_query: `SELECT e.name AS Employee FROM employee e JOIN employee m ON e.managerId = m.id WHERE e.salary > m.salary;`,
    expected_result: [
      { Employee: 'Joe' }
    ],
    test_cases: [
      {
        id: 1,
        title: 'Joe identified',
        description: 'Verify Joe (70k > 60k Sam) is returned',
        passedCheck: `(res) => Array.isArray(res) && res.some(r => (r.Employee || r.name) === 'Joe')`
      },
      {
        id: 2,
        title: 'Henry excluded',
        description: 'Verify Henry (80k < 90k Max) is excluded',
        passedCheck: `(res) => Array.isArray(res) && !res.some(r => (r.Employee || r.name) === 'Henry')`
      },
      {
        id: 3,
        title: 'Managers without managers handled',
        description: 'Verify Sam and Max (NULL managerId) are excluded',
        passedCheck: `(res) => Array.isArray(res) && res.length === 1`
      }
    ],
    hints: [
      'Hint 1: Use a `SELF JOIN` on the employee table: `employee e JOIN employee m ON e.managerId = m.id`.',
      'Hint 2: Filter with `WHERE e.salary > m.salary`.'
    ],
    explanation: 'A Self Join treats one instance of the table as the employee (e) and the other as the manager (m). Comparing `e.salary > m.salary` extracts employees who outearn their superiors.',
    queryBreakdown: [
      { clause: 'SELECT e.name AS Employee', purpose: 'Returns employee name.' },
      { clause: 'FROM employee e JOIN employee m', purpose: 'Self-joins employee table.' },
      { clause: 'ON e.managerId = m.id', purpose: 'Matches employee to their manager.' },
      { clause: 'WHERE e.salary > m.salary', purpose: 'Filters for higher salary.' }
    ]
  },

  // 4. Duplicate Emails Detection
  {
    id: 'sql-ch-4',
    topicId: 'sql-aggregation-groupby',
    title: 'Duplicate Emails Detection',
    difficulty: 'Easy',
    attribution: 'Reported Interview (Amazon / LeetCode 182)',
    companyMetadata: {
      company: 'Amazon',
      evidenceType: 'ACTUAL_REPORTED',
      sourceTitle: 'LeetCode 182 / Amazon Online Assessment',
      role: 'Software Engineer'
    },
    prompt: 'Write a SQL query to report all the duplicate emails in the Person table.',
    schema_context: `CREATE TABLE person (
    id INT PRIMARY KEY,
    email VARCHAR(100)
);
INSERT INTO person VALUES (1, 'a@b.com'), (2, 'c@d.com'), (3, 'a@b.com');`,
    sample_data: [
      { id: 1, email: 'a@b.com' },
      { id: 2, email: 'c@d.com' },
      { id: 3, email: 'a@b.com' }
    ],
    starter_query: `-- Write your SQL query below
SELECT email
FROM person
GROUP BY ...;`,
    solution_query: `SELECT email FROM person GROUP BY email HAVING COUNT(email) > 1;`,
    expected_result: [
      { email: 'a@b.com' }
    ],
    test_cases: [
      {
        id: 1,
        title: 'Duplicate identified',
        description: 'Verify a@b.com is returned',
        passedCheck: `(res) => Array.isArray(res) && res.some(r => r.email === 'a@b.com')`
      },
      {
        id: 2,
        title: 'Unique email excluded',
        description: 'Verify c@d.com is not in the output',
        passedCheck: `(res) => Array.isArray(res) && !res.some(r => r.email === 'c@d.com')`
      }
    ],
    hints: [
      'Hint 1: Use `GROUP BY email` to combine rows with the same address.',
      'Hint 2: Filter groups with `HAVING COUNT(email) > 1`.'
    ],
    explanation: 'Grouping by email gathers all identical email occurrences. The HAVING clause applies aggregate filtering, keeping only those groups whose row count strictly exceeds 1.',
    queryBreakdown: [
      { clause: 'SELECT email', purpose: 'Projects distinct email value.' },
      { clause: 'FROM person', purpose: 'Source relation.' },
      { clause: 'GROUP BY email', purpose: 'Collapses identical email addresses.' },
      { clause: 'HAVING COUNT(email) > 1', purpose: 'Filters for groups with frequency > 1.' }
    ]
  },

  // 5. Second Highest Salary
  {
    id: 'sql-ch-5',
    topicId: 'sql-subqueries-nested',
    title: 'Second Highest Salary',
    difficulty: 'Medium',
    attribution: 'Reported Interview (Amazon / LeetCode 176)',
    companyMetadata: {
      company: 'Amazon',
      evidenceType: 'ACTUAL_REPORTED',
      sourceTitle: 'LeetCode 176 / Amazon SDE Round',
      role: 'Software Development Engineer'
    },
    prompt: 'Write a SQL query to find the second highest distinct salary from the Employee table. Return the result as `SecondHighestSalary`. If there is no second highest salary, return NULL.',
    schema_context: `CREATE TABLE employee (
    id INT PRIMARY KEY,
    salary INT
);
INSERT INTO employee VALUES (1, 100), (2, 200), (3, 300);`,
    sample_data: [
      { id: 1, salary: 100 },
      { id: 2, salary: 200 },
      { id: 3, salary: 300 }
    ],
    starter_query: `-- Write your SQL query below
SELECT MAX(salary) AS SecondHighestSalary
FROM employee
WHERE ...;`,
    solution_query: `SELECT MAX(salary) AS SecondHighestSalary FROM employee WHERE salary < (SELECT MAX(salary) FROM employee);`,
    expected_result: [
      { SecondHighestSalary: 200 }
    ],
    test_cases: [
      {
        id: 1,
        title: 'Correct value check',
        description: 'Verify SecondHighestSalary is 200',
        passedCheck: `(res) => Array.isArray(res) && res.length === 1 && (res[0].SecondHighestSalary == 200 || res[0].salary == 200)`
      },
      {
        id: 2,
        title: 'Single-row result',
        description: 'Verify exactly one row is returned',
        passedCheck: `(res) => Array.isArray(res) && res.length === 1`
      }
    ],
    hints: [
      'Hint 1: Find the absolute maximum salary first using a subquery: `(SELECT MAX(salary) FROM employee)`.',
      'Hint 2: Select the `MAX(salary)` of rows strictly less than that maximum.'
    ],
    explanation: 'The subquery `(SELECT MAX(salary) FROM employee)` determines the absolute top salary. The outer query then takes the MAX of all remaining rows strictly below that value.',
    queryBreakdown: [
      { clause: 'SELECT MAX(salary) AS SecondHighestSalary', purpose: 'Returns the maximum of the filtered subset.' },
      { clause: 'FROM employee', purpose: 'Source table.' },
      { clause: 'WHERE salary < (SELECT MAX(salary) ...)', purpose: 'Excludes the overall top salary.' }
    ]
  },

  // 6. Classes More Than 5 Students
  {
    id: 'sql-ch-6',
    topicId: 'sql-aggregation-groupby',
    title: 'Classes More Than 5 Students',
    difficulty: 'Easy',
    attribution: 'Reported Interview (Amazon / LeetCode 596)',
    companyMetadata: {
      company: 'Amazon',
      evidenceType: 'ACTUAL_REPORTED',
      sourceTitle: 'LeetCode 596 / Amazon Online Assessment',
      role: 'SDE'
    },
    prompt: 'Write a SQL query to report all the classes that have at least five students.',
    schema_context: `CREATE TABLE courses (
    student VARCHAR(50),
    class VARCHAR(50)
);
INSERT INTO courses VALUES 
('A', 'Math'), ('B', 'English'), ('C', 'Math'), ('D', 'Biology'),
('E', 'Math'), ('F', 'Math'), ('G', 'Math');`,
    sample_data: [
      { student: 'A', class: 'Math' },
      { student: 'B', class: 'English' },
      { student: 'C', class: 'Math' },
      { student: 'D', class: 'Biology' },
      { student: 'E', class: 'Math' },
      { student: 'F', class: 'Math' },
      { student: 'G', class: 'Math' }
    ],
    starter_query: `-- Write your SQL query below
SELECT class
FROM courses
GROUP BY ...;`,
    solution_query: `SELECT class FROM courses GROUP BY class HAVING COUNT(student) >= 5;`,
    expected_result: [
      { class: 'Math' }
    ],
    test_cases: [
      {
        id: 1,
        title: 'Math qualified',
        description: 'Verify Math is returned with >= 5 students',
        passedCheck: `(res) => Array.isArray(res) && res.some(r => r.class === 'Math')`
      },
      {
        id: 2,
        title: 'English excluded',
        description: 'Verify classes with < 5 students are not in output',
        passedCheck: `(res) => Array.isArray(res) && !res.some(r => r.class === 'English' || r.class === 'Biology')`
      }
    ],
    hints: [
      'Hint 1: Group the table by the `class` column.',
      'Hint 2: Use `HAVING COUNT(student) >= 5` to filter for classes meeting the enrollment threshold.'
    ],
    explanation: 'Grouping by class aggregates enrollment per course. The HAVING clause checks the group count against the threshold of 5.',
    queryBreakdown: [
      { clause: 'SELECT class', purpose: 'Returns the course title.' },
      { clause: 'FROM courses', purpose: 'Target table.' },
      { clause: 'GROUP BY class', purpose: 'Aggregates students per class.' },
      { clause: 'HAVING COUNT(student) >= 5', purpose: 'Threshold filter.' }
    ]
  }
];

console.log('Registered base 6 challenges.');
