/**
 * Data-driven DSA Syntax Reference Repository
 * 
 * Provides topic-specific, language-tailored syntax snippets for:
 * - Languages: C++, Java, Python, JavaScript, C
 * - Topics: Two Pointers, Sliding Window, Arrays, Linked List, Trees, Hash Map, etc.
 */

export const DSA_SYNTAX_DATA = {
  'two-pointers': {
    'C++': [
      {
        title: 'Vector / Array Declaration',
        code: `vector<int> arr = {2, 7, 11, 15};`,
        note: 'Requires #include <vector>'
      },
      {
        title: 'Array Size',
        code: `int n = arr.size();`,
        note: 'Returns size_t length of vector'
      },
      {
        title: 'Pointer Initialization',
        code: `int left = 0;\nint right = arr.size() - 1;`,
        note: 'Opposite direction boundary pointers'
      },
      {
        title: 'while Loop Convergence',
        code: `while (left < right) {\n    int sum = arr[left] + arr[right];\n    if (sum == target) return {left + 1, right + 1};\n    if (sum < target) left++;\n    else right--;\n}`,
        note: 'Monotonic pointer movement in sorted array'
      },
      {
        title: 'Sorting Array',
        code: `sort(arr.begin(), arr.end());`,
        note: 'Requires #include <algorithm>, O(N log N) time'
      },
      {
        title: 'Element Swapping',
        code: `swap(arr[left], arr[right]);`,
        note: 'In-place element swap'
      },
      {
        title: 'String Character Access',
        code: `char ch = s[index];\nif (isalnum(ch)) ch = tolower(ch);`,
        note: 'Requires #include <cctype> for isalnum / tolower'
      }
    ],
    'Java': [
      {
        title: 'Array Declaration',
        code: `int[] arr = {2, 7, 11, 15};`,
        note: 'Fixed-size primitive integer array'
      },
      {
        title: 'Array Length',
        code: `int n = arr.length;`,
        note: '.length property (no parentheses for arrays)'
      },
      {
        title: 'Pointer Initialization',
        code: `int left = 0;\nint right = arr.length - 1;`,
        note: 'Opposite direction boundary pointers'
      },
      {
        title: 'while Loop Convergence',
        code: `while (left < right) {\n    int sum = arr[left] + arr[right];\n    if (sum == target) return new int[]{left + 1, right + 1};\n    if (sum < target) left++;\n    else right--;\n}`,
        note: 'Monotonic pointer movement in sorted array'
      },
      {
        title: 'Sorting Array',
        code: `Arrays.sort(arr);`,
        note: 'Requires import java.util.Arrays;'
      },
      {
        title: 'Element Swapping',
        code: `int temp = arr[left];\narr[left] = arr[right];\narr[right] = temp;`,
        note: 'In-place temp variable swap'
      },
      {
        title: 'String Character Access',
        code: `char ch = str.charAt(index);\nif (Character.isLetterOrDigit(ch)) ch = Character.toLowerCase(ch);`,
        note: 'Use .charAt() for Java String access'
      }
    ],
    'Python': [
      {
        title: 'List / Array Declaration',
        code: `arr = [2, 7, 11, 15]`,
        note: 'Dynamic Python list'
      },
      {
        title: 'List Length',
        code: `n = len(arr)`,
        note: 'Built-in len() function'
      },
      {
        title: 'Pointer Initialization',
        code: `left = 0\nright = len(arr) - 1`,
        note: 'Opposite direction boundary pointers'
      },
      {
        title: 'while Loop Convergence',
        code: `while left < right:\n    total = arr[left] + arr[right]\n    if total == target:\n        return [left + 1, right + 1]\n    elif total < target:\n        left += 1\n    else:\n        right -= 1`,
        note: 'Monotonic pointer movement in sorted list'
      },
      {
        title: 'Sorting List',
        code: `arr.sort()  # In-place sort\n# or: sorted_arr = sorted(arr)`,
        note: 'In-place Timsort O(N log N)'
      },
      {
        title: 'Element Swapping (Tuple Unpacking)',
        code: `arr[left], arr[right] = arr[right], arr[left]`,
        note: 'Clean Pythonic tuple swapping'
      },
      {
        title: 'String Character Access',
        code: `ch = s[index]\nif ch.isalnum():\n    ch = ch.lower()`,
        note: 'Python string indexing & string methods'
      }
    ],
    'JavaScript': [
      {
        title: 'Array Declaration',
        code: `const arr = [2, 7, 11, 15];`,
        note: 'Standard JS Array'
      },
      {
        title: 'Array Length',
        code: `const n = arr.length;`,
        note: '.length property'
      },
      {
        title: 'Pointer Initialization',
        code: `let left = 0;\nlet right = arr.length - 1;`,
        note: 'Opposite direction boundary pointers'
      },
      {
        title: 'while Loop Convergence',
        code: `while (left < right) {\n    const sum = arr[left] + arr[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n}`,
        note: 'Monotonic pointer movement in sorted array'
      },
      {
        title: 'Sorting Array',
        code: `arr.sort((a, b) => a - b);`,
        note: 'Pass numeric comparator function'
      },
      {
        title: 'Element Swapping (Destructuring)',
        code: `[arr[left], arr[right]] = [arr[right], arr[left]];`,
        note: 'ES6 destructuring assignment'
      },
      {
        title: 'String Character Access',
        code: `const ch = str[index].toLowerCase();\nconst isAlphanumeric = /[a-z0-9]/i.test(ch);`,
        note: 'RegExp test for alphanumeric check'
      }
    ],
    'C': [
      {
        title: 'Array Declaration',
        code: `int arr[] = {2, 7, 11, 15};\nint n = sizeof(arr) / sizeof(arr[0]);`,
        note: 'C array & size calculation'
      },
      {
        title: 'Pointer Initialization',
        code: `int left = 0;\nint right = n - 1;`,
        note: 'Boundary index pointers'
      },
      {
        title: 'while Loop Convergence',
        code: `while (left < right) {\n    int sum = arr[left] + arr[right];\n    if (sum == target) break;\n    if (sum < target) left++;\n    else right--;\n}`,
        note: 'Monotonic pointer movement in sorted array'
      },
      {
        title: 'Element Swapping',
        code: `int temp = arr[left];\narr[left] = arr[right];\narr[right] = temp;`,
        note: 'C temp variable swap'
      }
    ]
  },

  'sliding-window': {
    'C++': [
      {
        title: 'Window Boundaries Initialization',
        code: `int left = 0, currentSum = 0, maxLen = 0;`,
        note: 'Subarray window trackers'
      },
      {
        title: 'Variable Window Loop',
        code: `for (int right = 0; right < arr.size(); right++) {\n    currentSum += arr[right];\n    while (currentSum > k) {\n        currentSum -= arr[left];\n        left++;\n    }\n    maxLen = max(maxLen, right - left + 1);\n}`,
        note: 'Expand right, shrink left when violated'
      }
    ],
    'Java': [
      {
        title: 'Window Boundaries Initialization',
        code: `int left = 0, currentSum = 0, maxLen = 0;`,
        note: 'Subarray window trackers'
      },
      {
        title: 'Variable Window Loop',
        code: `for (int right = 0; right < arr.length; right++) {\n    currentSum += arr[right];\n    while (currentSum > k) {\n        currentSum -= arr[left];\n        left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n}`,
        note: 'Expand right, shrink left when violated'
      }
    ],
    'Python': [
      {
        title: 'Window Boundaries Initialization',
        code: `left = 0\ncurrent_sum = 0\nmax_len = 0`,
        note: 'Subarray window trackers'
      },
      {
        title: 'Variable Window Loop',
        code: `for right in range(len(arr)):\n    current_sum += arr[right]\n    while current_sum > k:\n        current_sum -= arr[left]\n        left += 1\n    max_len = max(max_len, right - left + 1)`,
        note: 'Expand right, shrink left when violated'
      }
    ],
    'JavaScript': [
      {
        title: 'Window Boundaries Initialization',
        code: `let left = 0, currentSum = 0, maxLen = 0;`,
        note: 'Subarray window trackers'
      },
      {
        title: 'Variable Window Loop',
        code: `for (let right = 0; right < arr.length; right++) {\n    currentSum += arr[right];\n    while (currentSum > k) {\n        currentSum -= arr[left];\n        left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n}`,
        note: 'Expand right, shrink left when violated'
      }
    ]
  },

  'arrays': {
    'C++': [
      {
        title: 'Vector Declaration & Iteration',
        code: `vector<int> nums = {1, 2, 3, 4};\nfor (int i = 0; i < nums.size(); i++) {\n    // process nums[i]\n}`,
        note: 'Index traversal'
      }
    ],
    'Java': [
      {
        title: 'Array Declaration & Iteration',
        code: `int[] nums = {1, 2, 3, 4};\nfor (int i = 0; i < nums.length; i++) {\n    // process nums[i]\n}`,
        note: 'Index traversal'
      }
    ],
    'Python': [
      {
        title: 'List Declaration & Iteration',
        code: `nums = [1, 2, 3, 4]\nfor i, val in enumerate(nums):\n    # process i, val`,
        note: 'Enumerate loop'
      }
    ],
    'JavaScript': [
      {
        title: 'Array Declaration & Iteration',
        code: `const nums = [1, 2, 3, 4];\nnums.forEach((val, i) => {\n    // process i, val\n});`,
        note: 'forEach traversal'
      }
    ]
  },

  'sorting': {
    'C++': [
      {
        title: 'Standard Library Sort',
        code: `sort(nums.begin(), nums.end());\n// Custom comparator:\nsort(nums.begin(), nums.end(), greater<int>());`,
        note: 'O(N log N) IntroSort'
      }
    ],
    'Java': [
      {
        title: 'Arrays & Collections Sort',
        code: `Arrays.sort(nums); // Primitives O(N log N) Dual-Pivot Quicksort\nCollections.sort(list, (a, b) -> b - a); // Custom comparator`,
        note: 'Requires java.util.Arrays'
      }
    ],
    'Python': [
      {
        title: 'Built-in Timsort',
        code: `nums.sort() # In-place sort\nsorted_nums = sorted(nums, key=lambda x: -x)`,
        note: 'O(N log N) Timsort'
      }
    ],
    'JavaScript': [
      {
        title: 'Array.prototype.sort',
        code: `nums.sort((a, b) => a - b); // Ascending\nnums.sort((a, b) => b - a); // Descending`,
        note: 'Numeric comparator required'
      }
    ]
  },

  'binary-search': {
    'C++': [
      {
        title: 'Standard Binary Search Loop',
        code: `int left = 0, right = nums.size() - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}`,
        note: 'Prevent overflow using left + (right - left) / 2'
      }
    ],
    'Java': [
      {
        title: 'Standard Binary Search Loop',
        code: `int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}`,
        note: 'Or Arrays.binarySearch(nums, target)'
      }
    ],
    'Python': [
      {
        title: 'Standard Binary Search Loop',
        code: `left, right = 0, len(nums) - 1\nwhile left <= right:\n    mid = (left + right) // 2\n    if nums[mid] == target: return mid\n    elif nums[mid] < target: left = mid + 1\n    else: right = mid - 1`,
        note: 'Or import bisect; bisect.bisect_left(nums, target)'
      }
    ],
    'JavaScript': [
      {
        title: 'Standard Binary Search Loop',
        code: `let left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}`,
        note: 'Standard O(log N) lookup'
      }
    ]
  },

  'linked-list': {
    'C++': [
      {
        title: 'Node Structure & Traversal',
        code: `struct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* curr = head;\nwhile (curr != nullptr) {\n    curr = curr->next;\n}`,
        note: 'Pointer traversal'
      }
    ],
    'Java': [
      {
        title: 'Node Structure & Traversal',
        code: `class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\nListNode curr = head;\nwhile (curr != null) {\n    curr = curr.next;\n}`,
        note: 'Reference traversal'
      }
    ],
    'Python': [
      {
        title: 'Node Structure & Traversal',
        code: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ncurr = head\nwhile curr:\n    curr = curr.next`,
        note: 'Pythonic list traversal'
      }
    ],
    'JavaScript': [
      {
        title: 'Node Structure & Traversal',
        code: `class ListNode {\n    constructor(val = 0, next = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\n\nlet curr = head;\nwhile (curr) {\n    curr = curr.next;\n}`,
        note: 'Object reference traversal'
      }
    ]
  },

  'trees': {
    'C++': [
      {
        title: 'TreeNode Definition & Preorder DFS',
        code: `struct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid dfs(TreeNode* root) {\n    if (!root) return;\n    dfs(root->left);\n    dfs(root->right);\n}`,
        note: 'Recursive tree traversal'
      }
    ],
    'Java': [
      {
        title: 'TreeNode Definition & Preorder DFS',
        code: `public class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n\nvoid dfs(TreeNode root) {\n    if (root == null) return;\n    dfs(root.left);\n    dfs(root.right);\n}`,
        note: 'Recursive tree traversal'
      }
    ],
    'Python': [
      {
        title: 'TreeNode Definition & Preorder DFS',
        code: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef dfs(root):\n    if not root: return\n    dfs(root.left)\n    dfs(root.right)`,
        note: 'Recursive tree traversal'
      }
    ],
    'JavaScript': [
      {
        title: 'TreeNode Definition & Preorder DFS',
        code: `function dfs(root) {\n    if (!root) return;\n    dfs(root.left);\n    dfs(root.right);\n}`,
        note: 'Recursive tree traversal'
      }
    ]
  },

  'graphs': {
    'C++': [
      {
        title: 'Adjacency List & BFS Queue',
        code: `vector<vector<int>> adj(N);\nqueue<int> q;\nunordered_set<int> visited;\nq.push(start);\nvisited.insert(start);\nwhile (!q.empty()) {\n    int curr = q.front(); q.pop();\n    for (int neighbor : adj[curr]) {\n        if (!visited.count(neighbor)) {\n            visited.insert(neighbor);\n            q.push(neighbor);\n        }\n    }\n}`,
        note: 'Standard BFS traversal'
      }
    ],
    'Java': [
      {
        title: 'Adjacency List & BFS Queue',
        code: `List<List<Integer>> adj = new ArrayList<>();\nQueue<Integer> q = new LinkedList<>();\nSet<Integer> visited = new HashSet<>();\nq.offer(start);\nvisited.add(start);\nwhile (!q.isEmpty()) {\n    int curr = q.poll();\n    for (int neighbor : adj.get(curr)) {\n        if (visited.add(neighbor)) {\n            q.offer(neighbor);\n        }\n    }\n}`,
        note: 'Standard BFS traversal'
      }
    ],
    'Python': [
      {
        title: 'Adjacency List & BFS Queue',
        code: `from collections import deque\nadj = collections.defaultdict(list)\nq = deque([start])\nvisited = {start}\nwhile q:\n    curr = q.popleft()\n    for neighbor in adj[curr]:\n        if neighbor not in visited:\n            visited.add(neighbor)\n            q.append(neighbor)`,
        note: 'Standard BFS traversal'
      }
    ],
    'JavaScript': [
      {
        title: 'Adjacency List & BFS Queue',
        code: `const adj = new Map();\nconst q = [start];\nconst visited = new Set([start]);\nwhile (q.length) {\n    const curr = q.shift();\n    for (const neighbor of (adj.get(curr) || [])) {\n        if (!visited.has(neighbor)) {\n            visited.add(neighbor);\n            q.push(neighbor);\n        }\n    }\n}`,
        note: 'Standard BFS traversal'
      }
    ]
  },

  'dp': {
    'C++': [
      {
        title: '1D & 2D Memoization / Tabulation',
        code: `vector<int> dp(n + 1, 0);\ndp[0] = 1;\nfor (int i = 1; i <= n; i++) {\n    dp[i] = dp[i - 1] + (i >= 2 ? dp[i - 2] : 0);\n}`,
        note: 'Bottom-up DP table'
      }
    ],
    'Java': [
      {
        title: '1D & 2D Memoization / Tabulation',
        code: `int[] dp = new int[n + 1];\ndp[0] = 1;\nfor (int i = 1; i <= n; i++) {\n    dp[i] = dp[i - 1] + (i >= 2 ? dp[i - 2] : 0);\n}`,
        note: 'Bottom-up DP table'
      }
    ],
    'Python': [
      {
        title: '1D & 2D Memoization / Tabulation',
        code: `dp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i - 1] + (dp[i - 2] if i >= 2 else 0)`,
        note: 'Bottom-up DP table'
      }
    ],
    'JavaScript': [
      {
        title: '1D & 2D Memoization / Tabulation',
        code: `const dp = new Array(n + 1).fill(0);\ndp[0] = 1;\nfor (let i = 1; i <= n; i++) {\n    dp[i] = dp[i - 1] + (i >= 2 ? dp[i - 2] : 0);\n}`,
        note: 'Bottom-up DP table'
      }
    ]
  }
};
