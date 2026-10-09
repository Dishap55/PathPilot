/**
 * CANONICAL QUESTION BANK (STEP 2 - SERVER)
 * 
 * Curated, pre-validated fallback questions for all 6 canonical subjects:
 * DSA, Aptitude, OOPS, DBMS, OS, CN.
 * 
 * Invariants:
 * - 100% compliant with canonical topic IDs
 * - Exactly conforms to questionValidator schemas
 * - Supports Easy, Medium, Hard difficulties
 * - Supplies both MCQ and Coding where appropriate
 */

const CANONICAL_QUESTION_BANK = [
  // =========================================================================
  // 1. DBMS (Database Management Systems)
  // =========================================================================
  {
    questionId: 'dbms_easy_arch_1',
    subject: 'DBMS',
    topicId: 'dbms-architecture',
    topicName: 'DBMS Architecture',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'In the Three-Schema ANSI/SPARC Architecture, which level describes how data is actually stored on secondary storage devices?',
    options: [
      'Internal (Physical) Level',
      'Conceptual (Logical) Level',
      'External (View) Level',
      'Client Interface Level'
    ],
    correctAnswer: 'Internal (Physical) Level',
    explanation: 'The Internal or Physical schema describes physical storage structures and access paths.',
    estimatedTime: 45
  },
  {
    questionId: 'dbms_easy_keys_1',
    subject: 'DBMS',
    topicId: 'relational-model-keys',
    topicName: 'Relational Model & Keys',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'Which of the following keys can accept at most one NULL value in standard SQL table definitions?',
    options: [
      'Primary Key',
      'Unique Key',
      'Foreign Key',
      'Super Key'
    ],
    correctAnswer: 'Unique Key',
    explanation: 'A Primary Key rejects all NULLs, whereas a Unique Key constraint allows NULLs (one in standard relational engines).',
    estimatedTime: 45
  },
  {
    questionId: 'dbms_med_sql_1',
    subject: 'DBMS',
    topicId: 'sql-joins-subqueries',
    topicName: 'SQL Joins & Subqueries',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'Which SQL JOIN type returns all records when there is a match in either left or right table?',
    options: [
      'FULL OUTER JOIN',
      'LEFT JOIN',
      'INNER JOIN',
      'CROSS JOIN'
    ],
    correctAnswer: 'FULL OUTER JOIN',
    explanation: 'A FULL OUTER JOIN returns all matched and unmatched rows from both participating relations.',
    estimatedTime: 60
  },
  {
    questionId: 'dbms_med_norm_1',
    subject: 'DBMS',
    topicId: 'normalization',
    topicName: 'Normalization (1NF to BCNF)',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'A relation R is in Third Normal Form (3NF) if it is in 2NF and has no:',
    options: [
      'Transitive functional dependencies for non-prime attributes',
      'Partial functional dependencies on composite keys',
      'Multi-valued dependencies',
      'Join dependencies'
    ],
    correctAnswer: 'Transitive functional dependencies for non-prime attributes',
    explanation: '3NF strictly removes transitive dependencies where X -> Y and Y -> Z for non-prime attributes.',
    estimatedTime: 60
  },
  {
    questionId: 'dbms_hard_acid_1',
    subject: 'DBMS',
    topicId: 'transactions-acid',
    topicName: 'Transactions & ACID Properties',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'Which transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still permit Phantom Reads?',
    options: [
      'Repeatable Read',
      'Read Committed',
      'Read Uncommitted',
      'Serializable'
    ],
    correctAnswer: 'Repeatable Read',
    explanation: 'Repeatable Read holds shared read locks until transaction completion, preventing non-repeatable reads but allowing phantoms unless range locks are applied.',
    estimatedTime: 75
  },
  {
    questionId: 'dbms_hard_index_1',
    subject: 'DBMS',
    topicId: 'indexing-b-trees',
    topicName: 'Indexing & B/B+ Trees',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'Why are B+ Trees predominantly preferred over standard B-Trees for relational database disk indexing?',
    options: [
      'All data pointers reside strictly in leaf nodes linked sequentially, optimizing range queries',
      'B+ trees have a strictly smaller branch factor than B-trees',
      'B+ trees do not require node rebalancing upon insertions',
      'B+ trees eliminate disk I/O completely via in-memory hashing'
    ],
    correctAnswer: 'All data pointers reside strictly in leaf nodes linked sequentially, optimizing range queries',
    explanation: 'In B+ trees, internal nodes contain only routing keys, allowing higher fanout and sequential leaf scanning for range queries.',
    estimatedTime: 75
  },
  {
    questionId: 'dbms_coding_sql_1',
    subject: 'DBMS',
    topicId: 'sql-basics-queries',
    topicName: 'SQL Basics & Queries',
    difficulty: 'Medium',
    questionType: 'coding',
    question: 'Write a SQL query to retrieve all employees whose salary exceeds 50,000 ordered by department.',
    problemStatement: 'Write an ANSI SQL query to select `employee_id`, `name`, `department`, and `salary` from table `employees` where `salary > 50000` ordered by `department` ascending.',
    constraints: ['Standard ANSI SQL', 'Salary > 50000'],
    supportedLanguages: ['sql'],
    starterCode: 'SELECT employee_id, name, department, salary\nFROM employees\nWHERE salary > 50000\nORDER BY department ASC;',
    testCases: [
      { id: 1, title: 'Salary filter test', expected: 'Rows where salary > 50000' }
    ],
    explanation: 'Basic SELECT statement with WHERE condition and ORDER BY clause.',
    estimatedTime: 90
  },

  // =========================================================================
  // 2. DSA (Data Structures & Algorithms)
  // =========================================================================
  {
    questionId: 'dsa_easy_arrays_1',
    subject: 'DSA',
    topicId: 'arrays',
    topicName: 'Arrays & Strings',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'What is the worst-case time complexity of accessing an element by index in a contiguous dynamic array?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'O(1)',
    explanation: 'Direct index arithmetic in contiguous memory yields O(1) random access time.',
    estimatedTime: 40
  },
  {
    questionId: 'dsa_easy_twopointers_1',
    subject: 'DSA',
    topicId: 'two-pointers',
    topicName: 'Two Pointers',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'In which scenario is the two-pointer inward convergence technique most directly applicable?',
    options: [
      'Finding a pair summing to a target in a sorted array',
      'Searching an element in an unsorted hash map',
      'Traversing nodes in an unweighted DAG',
      'Balancing an AVL tree after insertion'
    ],
    correctAnswer: 'Finding a pair summing to a target in a sorted array',
    explanation: 'Sorted arrays allow left and right pointers to converge inward in linear O(N) time.',
    estimatedTime: 45
  },
  {
    questionId: 'dsa_med_bs_1',
    subject: 'DSA',
    topicId: 'binary-search',
    topicName: 'Binary Search',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'To prevent integer overflow when calculating midpoint in binary search, which formula is recommended in languages like C++ and Java?',
    options: [
      'mid = low + (high - low) / 2',
      'mid = (low + high) / 2',
      'mid = (low + high) >> 2',
      'mid = high - (low / 2)'
    ],
    correctAnswer: 'mid = low + (high - low) / 2',
    explanation: '`low + (high - low) / 2` avoids calculating `low + high`, which can exceed 32-bit signed integer capacity.',
    estimatedTime: 50
  },
  {
    questionId: 'dsa_med_trees_1',
    subject: 'DSA',
    topicId: 'trees',
    topicName: 'Trees & BST',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'Which tree traversal yields elements in monotonically non-decreasing order for a valid Binary Search Tree?',
    options: [
      'In-order traversal (Left, Root, Right)',
      'Pre-order traversal (Root, Left, Right)',
      'Post-order traversal (Left, Right, Root)',
      'Level-order traversal (BFS)'
    ],
    correctAnswer: 'In-order traversal (Left, Root, Right)',
    explanation: 'In-order traversal of a BST always processes left subtree (smaller), root, and right subtree (larger) in sorted order.',
    estimatedTime: 50
  },
  {
    questionId: 'dsa_hard_dp_1',
    subject: 'DSA',
    topicId: 'dp',
    topicName: 'Dynamic Programming',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'In the 0/1 Knapsack problem with N items and capacity W, what is the standard 1D space-optimized transition iteration order for weight w?',
    options: [
      'Iterate w backwards from W down to item weight',
      'Iterate w forwards from 0 up to W',
      'Iterate items backwards and weights forwards',
      'Iterate in random order'
    ],
    correctAnswer: 'Iterate w backwards from W down to item weight',
    explanation: 'Iterating backwards ensures values from the previous item state are not overwritten prematurely in 1D array optimization.',
    estimatedTime: 75
  },
  {
    questionId: 'dsa_coding_twosum_1',
    subject: 'DSA',
    topicId: 'two-pointers',
    topicName: 'Two Pointers',
    difficulty: 'Easy',
    questionType: 'coding',
    question: 'Given a 1-indexed sorted array of integers, return the indices of two numbers that sum to target.',
    problemStatement: 'Given a 1-indexed array of integers `numbers` that is sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
    constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'Sorted in non-decreasing order'],
    supportedLanguages: ['cpp', 'java', 'python', 'javascript'],
    starterCode: {
      cpp: '#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        // Write your solution here\n        // Hint: use two pointers, left and right\n        \n    }\n};',
      java: 'class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        // Write your solution here\n        // Hint: use two pointers, left and right\n        \n    }\n}',
      python: 'class Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        # Write your solution here\n        # Hint: use two pointers, left and right\n        pass',
      javascript: '/**\n * @param {number[]} numbers\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(numbers, target) {\n    // Write your solution here\n    // Hint: use two pointers, left and right\n    \n}'
    },
    hint: 'Initialize one pointer at the start (0) and one at the end (length - 1). Check their sum and move pointers inwards.',
    testCases: [
      { id: 1, title: 'Standard pair', input: '[2, 7, 11, 15], target = 9', expected: '[1, 2]' },
      { id: 2, title: 'Zero sum', input: '[-1, 0], target = -1', expected: '[1, 2]' }
    ],
    explanation: 'Use two pointers from left and right converging inwards in O(N) time and O(1) space.',
    estimatedTime: 120
  },
  {
    questionId: 'dsa_coding_palindrome_1',
    subject: 'DSA',
    topicId: 'two-pointers',
    topicName: 'Two Pointers',
    difficulty: 'Easy',
    questionType: 'coding',
    question: 'Check if a string is a valid palindrome, considering only alphanumeric characters and ignoring cases.',
    problemStatement: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    supportedLanguages: ['cpp', 'java', 'python', 'javascript'],
    starterCode: {
      cpp: '#include <string>\n#include <cctype>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your solution here\n        // Hint: filter alphanumeric characters and check with two pointers\n        \n        return true;\n    }\n};',
      java: 'class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your solution here\n        // Hint: filter alphanumeric characters and check with two pointers\n        \n        return true;\n    }\n}',
      python: 'class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your solution here\n        # Hint: filter alphanumeric characters and check with two pointers\n        pass',
      javascript: '/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isPalindrome(s) {\n    // Write your solution here\n    // Hint: filter alphanumeric characters and check with two pointers\n    \n    return true;\n}'
    },
    hint: 'Move left and right pointers towards each other, skipping non-alphanumeric characters and comparing lowercase values.',
    testCases: [
      { id: 1, title: 'Valid phrase', input: 's = "A man, a plan, a canal: Panama"', expected: 'true' },
      { id: 2, title: 'Invalid phrase', input: 's = "race a car"', expected: 'false' }
    ],
    explanation: 'Scan from both ends inward, skipping non-alphanumeric characters. O(N) time, O(1) space.',
    estimatedTime: 120
  },
  {
    questionId: 'dsa_coding_reverse_1',
    subject: 'DSA',
    topicId: 'arrays',
    topicName: 'Arrays & Strings',
    difficulty: 'Easy',
    questionType: 'coding',
    question: 'Given an array of integers, reverse the array in-place.',
    problemStatement: 'Given an array of integers `nums`, reverse the order of elements in-place with O(1) extra memory.',
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    supportedLanguages: ['cpp', 'java', 'python', 'javascript'],
    starterCode: {
      cpp: '#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseArray(vector<int>& nums) {\n        // Write your solution here\n        // Hint: Swap elements from outside in\n        \n    }\n};',
      java: 'class Solution {\n    public void reverseArray(int[] nums) {\n        // Write your solution here\n        // Hint: Swap elements from outside in\n        \n    }\n}',
      python: 'class Solution:\n    def reverseArray(self, nums: list[int]) -> None:\n        # Write your solution here\n        # Hint: Swap elements from outside in\n        pass',
      javascript: '/**\n * @param {number[]} nums\n * @return {void}\n */\nfunction reverseArray(nums) {\n    // Write your solution here\n    // Hint: Swap elements from outside in\n    \n}'
    },
    hint: 'Swap elements at indices i and (length - 1 - i) until reaching the midpoint.',
    testCases: [
      { id: 1, title: 'Even length', input: 'nums = [1, 2, 3, 4]', expected: '[4, 3, 2, 1]' },
      { id: 2, title: 'Odd length', input: 'nums = [5, 4, 3, 2, 1]', expected: '[1, 2, 3, 4, 5]' }
    ],
    explanation: 'Two-pointer swap from ends towards center in O(N) time and O(1) space.',
    estimatedTime: 120
  },
  {
    questionId: 'dsa_easy_sort_1',
    subject: 'DSA',
    topicId: 'sorting',
    topicName: 'Sorting Algorithms',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'What is the best-case time complexity of standard Insertion Sort on an already sorted array of N elements?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(1)'],
    correctAnswer: 'O(N)',
    explanation: 'When the array is already sorted, Insertion Sort performs only 1 comparison per element and 0 shifts, achieving O(N) linear time.',
    estimatedTime: 40
  },
  {
    questionId: 'dsa_easy_ll_1',
    subject: 'DSA',
    topicId: 'linked-list',
    topicName: 'Linked List',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'In Floyd\'s Cycle Detection algorithm (Fast & Slow pointers), what speed multiplier is typically given to the fast pointer relative to the slow pointer?',
    options: ['2x (moves 2 steps per iteration)', '3x (moves 3 steps per iteration)', '1.5x (moves 3 steps every 2 iterations)', '4x (moves 4 steps per iteration)'],
    correctAnswer: '2x (moves 2 steps per iteration)',
    explanation: 'Moving the slow pointer by 1 step and the fast pointer by 2 steps guarantees meeting inside a loop in O(N) time with O(1) auxiliary memory.',
    estimatedTime: 45
  },
  {
    questionId: 'dsa_med_graphs_1',
    subject: 'DSA',
    topicId: 'graphs',
    topicName: 'Graphs & BFS/DFS',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'Which graph traversal algorithm guarantees finding the shortest path (minimum edge count) between two vertices in an unweighted graph?',
    options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Topological Sort', 'Tarjan\'s Strongly Connected Components'],
    correctAnswer: 'Breadth-First Search (BFS)',
    explanation: 'BFS explores vertices level by level, guaranteeing that the first time a target vertex is reached, the path uses the minimum number of unweighted edges.',
    estimatedTime: 50
  },
  {
    questionId: 'dsa_coding_binary_search_1',
    subject: 'DSA',
    topicId: 'binary-search',
    topicName: 'Binary Search',
    difficulty: 'Easy',
    questionType: 'coding',
    question: 'Given a sorted array of integers nums and a target integer, write a function to search target in nums. Return its index, or -1 if not found.',
    problemStatement: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.'],
    supportedLanguages: ['cpp', 'java', 'python', 'javascript'],
    starterCode: {
      cpp: '#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your solution here\n        // Hint: use binary search with low and high pointers\n        \n        return -1;\n    }\n};',
      java: 'class Solution {\n    public int search(int[] nums, int target) {\n        // Write your solution here\n        // Hint: use binary search with low and high pointers\n        \n        return -1;\n    }\n}',
      python: 'class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write your solution here\n        # Hint: use binary search with low and high pointers\n        return -1',
      javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n    // Write your solution here\n    // Hint: use binary search with low and high pointers\n    \n    return -1;\n}'
    },
    hint: 'Initialize low = 0 and high = nums.length - 1. While low <= high, compute mid and compare nums[mid] with target.',
    testCases: [
      { id: 1, title: 'Target present', input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', expected: '4' },
      { id: 2, title: 'Target absent', input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', expected: '-1' }
    ],
    explanation: 'Standard binary search divides the search space in half at each iteration, achieving O(log N) time and O(1) space.',
    estimatedTime: 90
  },
  {
    questionId: 'dsa_coding_check_sorted_1',
    subject: 'DSA',
    topicId: 'sorting',
    topicName: 'Sorting Algorithms',
    difficulty: 'Easy',
    questionType: 'coding',
    question: 'Given an array of integers nums, return true if the array is sorted in non-decreasing order, or false otherwise.',
    problemStatement: 'Given an array of integers `nums`, check if the array is sorted in non-decreasing order (`nums[i] <= nums[i+1]` for all valid `i`). Return true if sorted, otherwise false.',
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    supportedLanguages: ['cpp', 'java', 'python', 'javascript'],
    starterCode: {
      cpp: '#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSorted(vector<int>& nums) {\n        // Write your solution here\n        // Hint: iterate through array and check if nums[i] > nums[i+1]\n        \n        return true;\n    }\n};',
      java: 'class Solution {\n    public boolean isSorted(int[] nums) {\n        // Write your solution here\n        // Hint: iterate through array and check if nums[i] > nums[i+1]\n        \n        return true;\n    }\n}',
      python: 'class Solution:\n    def isSorted(self, nums: list[int]) -> bool:\n        # Write your solution here\n        # Hint: iterate through array and check if nums[i] > nums[i+1]\n        return True',
      javascript: '/**\n * @param {number[]} nums\n * @return {boolean}\n */\nfunction isSorted(nums) {\n    // Write your solution here\n    // Hint: iterate through array and check if nums[i] > nums[i+1]\n    \n    return true;\n}'
    },
    hint: 'Iterate from i = 0 to nums.length - 2. If nums[i] > nums[i+1], return false. If loop finishes, return true.',
    testCases: [
      { id: 1, title: 'Already sorted', input: 'nums = [1, 2, 3, 4, 5]', expected: 'true' },
      { id: 2, title: 'Unsorted array', input: 'nums = [1, 3, 2, 4, 5]', expected: 'false' }
    ],
    explanation: 'Single linear pass checking adjacent elements in O(N) time and O(1) space.',
    estimatedTime: 60
  },

  // =========================================================================
  // 3. OS (Operating Systems)
  // =========================================================================
  {
    questionId: 'os_easy_intro_1',
    subject: 'OS',
    topicId: 'intro-to-os',
    topicName: 'Introduction to Operating Systems',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'What hardware mechanism allows the operating system kernel to regain CPU control from a user program?',
    options: [
      'Timer interrupt',
      'TLB shootdown',
      'Direct memory bus clock',
      'Virtual page table lock'
    ],
    correctAnswer: 'Timer interrupt',
    explanation: 'Hardware timer interrupts guarantee periodic preemption so the CPU scheduler can regain control.',
    estimatedTime: 40
  },
  {
    questionId: 'os_easy_pcb_1',
    subject: 'OS',
    topicId: 'process-concept-pcb',
    topicName: 'Process Concept & PCB',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'Which operating system data structure maintains the process state, program counter, CPU registers, and scheduling information?',
    options: [
      'Process Control Block (PCB)',
      'Page Directory Table',
      'File Allocation Table',
      'Interrupt Vector Table'
    ],
    correctAnswer: 'Process Control Block (PCB)',
    explanation: 'The PCB is the kernel record storing all context required to save and restore an executing process.',
    estimatedTime: 45
  },
  {
    questionId: 'os_med_sched_1',
    subject: 'OS',
    topicId: 'cpu-scheduling-algorithms',
    topicName: 'CPU Scheduling Algorithms',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'Which CPU scheduling algorithm provides provably minimal average waiting time for a given set of stationary processes?',
    options: [
      'Shortest Job First (SJF)',
      'First-Come, First-Served (FCFS)',
      'Round Robin (RR)',
      'Priority Scheduling'
    ],
    correctAnswer: 'Shortest Job First (SJF)',
    explanation: 'SJF is provably optimal regarding average waiting time because shorter burst times are scheduled first.',
    estimatedTime: 50
  },
  {
    questionId: 'os_med_sync_1',
    subject: 'OS',
    topicId: 'process-synchronization',
    topicName: 'Process Synchronization',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'In Dijkstra\'s counting semaphore abstraction, what does the wait() or P() operation perform when the semaphore value is zero?',
    options: [
      'Blocks the invoking process on the semaphore queue',
      'Increments the semaphore value by 1',
      'Signals a waiting thread',
      'Resets all shared variables'
    ],
    correctAnswer: 'Blocks the invoking process on the semaphore queue',
    explanation: 'When S <= 0, wait(S) places the process in a sleeping/blocked queue until a signal(S) wake-up occurs.',
    estimatedTime: 55
  },
  {
    questionId: 'os_hard_deadlock_1',
    subject: 'OS',
    topicId: 'deadlocks-bankers',
    topicName: 'Deadlocks & Banker\'s Algorithm',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'Which of the following condition sets is necessary AND sufficient for a deadlock in a system with single-unit resource types?',
    options: [
      'A directed cycle in the Resource Allocation Graph (RAG)',
      'Mutual exclusion alone',
      'Hold and wait alone',
      'Preemption disabled alone'
    ],
    correctAnswer: 'A directed cycle in the Resource Allocation Graph (RAG)',
    explanation: 'For single-instance resource types, a cycle in the RAG is both necessary and sufficient for deadlock.',
    estimatedTime: 70
  },
  {
    questionId: 'os_hard_vm_1',
    subject: 'OS',
    topicId: 'virtual-memory-page-replacement',
    topicName: 'Virtual Memory & Page Replacement',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'What is Belady\'s Anomaly in operating systems page replacement?',
    options: [
      'Increasing the number of physical page frames results in MORE page faults under FIFO',
      'LRU replaces the most recently referenced page instead of least',
      'Thrashing causes CPU utilization to surge to 100%',
      'The TLB cache hit rate decreases as page size increases'
    ],
    correctAnswer: 'Increasing the number of physical page frames results in MORE page faults under FIFO',
    explanation: 'Belady\'s Anomaly describes the counter-intuitive phenomenon where allocating more frames causes more page faults under FIFO.',
    estimatedTime: 70
  },

  // =========================================================================
  // 4. OOPS (Object-Oriented Programming)
  // =========================================================================
  {
    questionId: 'oops_easy_classes_1',
    subject: 'OOPS',
    topicId: 'classes-objects',
    topicName: 'Classes & Objects',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'What is an object in object-oriented programming terminology?',
    options: [
      'An instantiated runtime entity embodying state and behavior',
      'A compiled binary executable file',
      'A blueprint containing abstract definitions only',
      'A pointer to dynamic memory allocation table'
    ],
    correctAnswer: 'An instantiated runtime entity embodying state and behavior',
    explanation: 'An object is a concrete instance of a class occupying memory at runtime.',
    estimatedTime: 40
  },
  {
    questionId: 'oops_easy_encap_1',
    subject: 'OOPS',
    topicId: 'encapsulation-data-hiding',
    topicName: 'Encapsulation & Data Hiding',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'How is data hiding conventionally achieved in class design?',
    options: [
      'Declaring fields private and exposing getters/setters',
      'Declaring all variables static in global scope',
      'Using multiple inheritance across derived classes',
      'Avoiding member functions in the class definition'
    ],
    correctAnswer: 'Declaring fields private and exposing getters/setters',
    explanation: 'Encapsulation binds data and functions together, hiding internal state via private access specifiers.',
    estimatedTime: 45
  },
  {
    questionId: 'oops_med_poly_1',
    subject: 'OOPS',
    topicId: 'polymorphism',
    topicName: 'Polymorphism (Runtime & Compile-time)',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'In C++ and Java, runtime polymorphism (dynamic method dispatch) is primarily achieved via:',
    options: [
      'Method overriding with virtual/dynamic binding',
      'Method overloading with different parameter lists',
      'Operator overloading',
      'Template metaprogramming'
    ],
    correctAnswer: 'Method overriding with virtual/dynamic binding',
    explanation: 'Method overriding enables dynamic binding at runtime using vtables / dynamic dispatch.',
    estimatedTime: 50
  },
  {
    questionId: 'oops_med_abstract_1',
    subject: 'OOPS',
    topicId: 'abstraction-interfaces',
    topicName: 'Abstraction & Interfaces',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'Which of the following describes a key distinction between an abstract class and an interface in modern OOP?',
    options: [
      'An abstract class can maintain state via instance variables, whereas interfaces cannot store non-static state',
      'Interfaces can be directly instantiated with the `new` keyword',
      'Abstract classes cannot contain any implemented concrete methods',
      'A class can inherit multiple abstract classes in Java'
    ],
    correctAnswer: 'An abstract class can maintain state via instance variables, whereas interfaces cannot store non-static state',
    explanation: 'Abstract classes can hold state and constructors, while interfaces define pure contracts (plus static/default helpers).',
    estimatedTime: 55
  },
  {
    questionId: 'oops_hard_solid_1',
    subject: 'OOPS',
    topicId: 'solid-principles',
    topicName: 'SOLID Principles & Design Patterns',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'Which SOLID principle mandates that subtype objects must be substitutable for supertype objects without altering program correctness?',
    options: [
      'Liskov Substitution Principle (LSP)',
      'Open/Closed Principle (OCP)',
      'Interface Segregation Principle (ISP)',
      'Dependency Inversion Principle (DIP)'
    ],
    correctAnswer: 'Liskov Substitution Principle (LSP)',
    explanation: 'LSP requires derived classes to honor contracts of their base types without throwing unexpected exceptions or breaking invariants.',
    estimatedTime: 60
  },
  {
    questionId: 'oops_hard_diamond_1',
    subject: 'OOPS',
    topicId: 'inheritance-types',
    topicName: 'Inheritance & Diamond Problem',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'How does C++ resolve the classic "Diamond Problem" of multiple inheritance ambiguity?',
    options: [
      'By declaring base inheritance virtual (virtual base class)',
      'By disallowing multiple inheritance entirely',
      'By using friend functions exclusively',
      'By compiling multiple separate binary vtables'
    ],
    correctAnswer: 'By declaring base inheritance virtual (virtual base class)',
    explanation: 'Virtual base classes ensure only one common instance of the grandparent class is included in the most derived class.',
    estimatedTime: 65
  },

  // =========================================================================
  // 5. CN (Computer Networks)
  // =========================================================================
  {
    questionId: 'cn_easy_osi_1',
    subject: 'CN',
    topicId: 'osi-model',
    topicName: 'OSI Reference Model',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'Which OSI layer is responsible for end-to-end communication, segmentation, flow control, and error recovery?',
    options: [
      'Transport Layer (Layer 4)',
      'Network Layer (Layer 3)',
      'Data Link Layer (Layer 2)',
      'Session Layer (Layer 5)'
    ],
    correctAnswer: 'Transport Layer (Layer 4)',
    explanation: 'The Transport layer (Layer 4) provides transparent transfer of data between end systems.',
    estimatedTime: 40
  },
  {
    questionId: 'cn_easy_tcp_1',
    subject: 'CN',
    topicId: 'transport-layer-tcp-udp',
    topicName: 'Transport Layer & TCP vs UDP',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'How many packets are exchanged in a standard TCP connection establishment handshake?',
    options: ['3 (SYN, SYN-ACK, ACK)', '2 (SYN, ACK)', '4 (SYN, ACK, FIN, ACK)', '1 (SYN)'],
    correctAnswer: '3 (SYN, SYN-ACK, ACK)',
    explanation: 'TCP uses a 3-way handshake (SYN -> SYN-ACK -> ACK) to synchronize sequence numbers and establish connections.',
    estimatedTime: 45
  },
  {
    questionId: 'cn_med_ip_1',
    subject: 'CN',
    topicId: 'network-layer-ipv4-ipv6',
    topicName: 'Network Layer & IPv4/IPv6',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'What is the standard address length in bits of IPv4 and IPv6 respectively?',
    options: [
      '32 bits and 128 bits',
      '64 bits and 128 bits',
      '32 bits and 64 bits',
      '16 bits and 32 bits'
    ],
    correctAnswer: '32 bits and 128 bits',
    explanation: 'IPv4 uses 32-bit addresses (4 bytes), while IPv6 uses 128-bit addresses (16 bytes).',
    estimatedTime: 50
  },
  {
    questionId: 'cn_med_dns_1',
    subject: 'CN',
    topicId: 'application-layer-http-dns',
    topicName: 'Application Layer Protocols (HTTP, DNS)',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'Which transport protocol and port does standard DNS query resolution primarily use?',
    options: [
      'UDP Port 53',
      'TCP Port 80',
      'TCP Port 443',
      'UDP Port 67'
    ],
    correctAnswer: 'UDP Port 53',
    explanation: 'DNS queries default to UDP port 53 for fast, stateless name lookups.',
    estimatedTime: 50
  },
  {
    questionId: 'cn_hard_cong_1',
    subject: 'CN',
    topicId: 'transport-layer-tcp-udp',
    topicName: 'Transport Layer & TCP vs UDP',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'In TCP Reno congestion control, what happens to the congestion window (cwnd) when a triple duplicate ACK is received?',
    options: [
      'cwnd is halved to ssthresh and fast recovery begins',
      'cwnd is reset to 1 MSS (Slow Start)',
      'cwnd is increased by 1 MSS linearly',
      'Connection enters TIME_WAIT immediately'
    ],
    correctAnswer: 'cwnd is halved to ssthresh and fast recovery begins',
    explanation: 'Triple duplicate ACKs trigger Fast Retransmit and Fast Recovery, setting ssthresh = cwnd / 2 without restarting at 1 MSS.',
    estimatedTime: 70
  },
  {
    questionId: 'cn_hard_routing_1',
    subject: 'CN',
    topicId: 'routing-algorithms',
    topicName: 'Routing Algorithms (OSPF, BGP)',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'Which graph algorithm forms the basis of link-state routing protocols such as OSPF?',
    options: [
      'Dijkstra\'s Shortest Path Algorithm',
      'Bellman-Ford Algorithm',
      'Floyd-Warshall All-Pairs Algorithm',
      'Kruskal\'s Minimum Spanning Tree'
    ],
    correctAnswer: 'Dijkstra\'s Shortest Path Algorithm',
    explanation: 'OSPF uses Dijkstra\'s SPF algorithm over the complete link-state database to compute shortest routes.',
    estimatedTime: 70
  },

  // =========================================================================
  // 6. Aptitude (Quantitative & Logical)
  // =========================================================================
  {
    questionId: 'apt_easy_pct_1',
    subject: 'Aptitude',
    topicId: 'percentages',
    topicName: 'Percentages',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'If the price of an article increases by 25%, by what percentage must consumption be reduced so that expenditure remains unchanged?',
    options: ['20%', '25%', '16.66%', '30%'],
    correctAnswer: '20%',
    explanation: 'Reduction % = [r / (100 + r)] * 100 = [25 / 125] * 100 = 20%.',
    estimatedTime: 50
  },
  {
    questionId: 'apt_easy_ratio_1',
    subject: 'Aptitude',
    topicId: 'ratio-and-proportion',
    topicName: 'Ratio & Proportion',
    difficulty: 'Easy',
    questionType: 'mcq',
    question: 'If A : B = 2 : 3 and B : C = 4 : 5, what is the combined ratio A : B : C?',
    options: ['8 : 12 : 15', '2 : 4 : 5', '6 : 8 : 10', '8 : 10 : 15'],
    correctAnswer: '8 : 12 : 15',
    explanation: 'Multiply first ratio by 4 (8 : 12) and second ratio by 3 (12 : 15) to obtain 8 : 12 : 15.',
    estimatedTime: 50
  },
  {
    questionId: 'apt_med_tw_1',
    subject: 'Aptitude',
    topicId: 'time-and-work',
    topicName: 'Time & Work',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'A can finish a task in 12 days and B in 24 days. Working together, how many days will they take to complete the work?',
    options: ['8 days', '6 days', '9 days', '10 days'],
    correctAnswer: '8 days',
    explanation: 'Combined rate = 1/12 + 1/24 = 3/24 = 1/8. Hence, 8 days.',
    estimatedTime: 60
  },
  {
    questionId: 'apt_med_tsd_1',
    subject: 'Aptitude',
    topicId: 'time-speed-distance',
    topicName: 'Time, Speed & Distance',
    difficulty: 'Medium',
    questionType: 'mcq',
    question: 'A car travels from city X to city Y at 60 km/h and returns at 40 km/h. What is the average speed for the entire journey?',
    options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'],
    correctAnswer: '48 km/h',
    explanation: 'Average speed for equal distances = (2 * v1 * v2) / (v1 + v2) = (2 * 60 * 40) / 100 = 48 km/h.',
    estimatedTime: 60
  },
  {
    questionId: 'apt_hard_prob_1',
    subject: 'Aptitude',
    topicId: 'probability',
    topicName: 'Probability',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'Two dice are rolled simultaneously. What is the probability that the sum of the numbers is at least 10?',
    options: ['1/6', '1/12', '5/36', '1/4'],
    correctAnswer: '1/6',
    explanation: 'Favorable outcomes: Sum 10 (4,6; 5,5; 6,4) = 3; Sum 11 (5,6; 6,5) = 2; Sum 12 (6,6) = 1. Total = 6/36 = 1/6.',
    estimatedTime: 70
  },
  {
    questionId: 'apt_hard_perm_1',
    subject: 'Aptitude',
    topicId: 'permutation-and-combination',
    topicName: 'Permutation & Combination',
    difficulty: 'Hard',
    questionType: 'mcq',
    question: 'In how many distinct ways can the letters of the word "LEADER" be arranged?',
    options: ['360', '720', '180', '120'],
    correctAnswer: '360',
    explanation: '"LEADER" has 6 letters with E repeating twice. Total permutations = 6! / 2! = 720 / 2 = 360.',
    estimatedTime: 70
  }
];

/**
 * Randomly shuffles the options of an MCQ question so that Option A is not always the correct answer.
 */
function shuffleQuestion(question) {
  if (!question || question.questionType !== 'mcq' || !Array.isArray(question.options) || question.options.length <= 1) {
    return question;
  }
  const options = [...question.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return {
    ...question,
    options,
    correctOptionIndex: options.indexOf(question.correctAnswer)
  };
}

/**
 * Retrieves fallback questions matching subject, canonical topic, and difficulty.
 * Guarantees never repeating an already-asked question if other unasked questions exist.
 * Automatically shuffles MCQ options so the correct answer is evenly distributed.
 */
function getFallbackQuestions({ subject, topicId = null, difficulty = null, excludedIds = [], questionType = null }) {
  const allSubject = CANONICAL_QUESTION_BANK.filter(q => q.subject.toLowerCase() === (subject || '').toLowerCase());

  let pool = allSubject;
  if (questionType) {
    const typeFiltered = pool.filter(q => q.questionType === questionType);
    if (typeFiltered.length > 0) pool = typeFiltered;
  }

  let candidates = pool;
  if (topicId) {
    const topicFiltered = candidates.filter(q => q.topicId === topicId);
    if (topicFiltered.length > 0) candidates = topicFiltered;
  }

  if (difficulty) {
    const diffFiltered = candidates.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    if (diffFiltered.length > 0) candidates = diffFiltered;
  }

  // 1. Try exact topic + difficulty + unasked
  let unasked = candidates.filter(q => !excludedIds.includes(q.questionId));
  if (unasked.length > 0) return unasked.map(shuffleQuestion);

  // 2. Try unasked in this topic (any difficulty in pool)
  if (topicId) {
    unasked = pool.filter(q => q.topicId === topicId && !excludedIds.includes(q.questionId));
    if (unasked.length > 0) return unasked.map(shuffleQuestion);
  }

  // 3. Try unasked in this difficulty (any topic in pool)
  if (difficulty) {
    unasked = pool.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase() && !excludedIds.includes(q.questionId));
    if (unasked.length > 0) return unasked.map(shuffleQuestion);
  }

  // 4. Try any unasked in the pool
  unasked = pool.filter(q => !excludedIds.includes(q.questionId));
  if (unasked.length > 0) return unasked.map(shuffleQuestion);

  // 5. Try any unasked in the entire subject
  unasked = allSubject.filter(q => !excludedIds.includes(q.questionId));
  if (unasked.length > 0) return unasked.map(shuffleQuestion);

  // 6. If completely exhausted, return candidates with options shuffled
  return candidates.map(shuffleQuestion);
}

module.exports = {
  CANONICAL_QUESTION_BANK,
  getFallbackQuestions,
  shuffleQuestion
};
