/**
 * TREES & BST 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA → Trees → Introduction Depth Carousel.
 */
export const TREES_INTRO_DATA = {
  topicId: 'trees',
  topicName: 'Trees & BST',
  subtitle: 'Master hierarchical data structures, recursive traversals, and Binary Search Tree properties.',
  cards: [
    {
      id: 'what-is-trees',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What are Trees & BST?',
      introText: 'A Tree is a hierarchical non-linear data structure consisting of nodes connected by edges, starting from a root node.',
      coreIdea: {
        part1: 'Root Node',
        part2: 'Branching Children',
        result: 'Hierarchical Tree'
      },
      keyPoints: [
        {
          num: '01',
          title: 'ROOT & LEAF NODES',
          text: 'Topmost node is Root; nodes with zero children are Leaves.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'BINARY TREE',
          text: 'Each parent node has at most 2 children (left and right).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'BINARY SEARCH TREE (BST)',
          text: 'Left subtree values < root.val < right subtree values.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'RECURSIVE SUBTREES',
          text: 'Every child node is itself the root of a smaller subtree.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['10', '5', '15'], label: 'Root 10 -> Left Subtree (5) & Right Subtree (15)' }
        ]
      },
      memoryTakeaway: 'Hierarchical Nodes + Subtrees + BST Ordering Invariant'
    },
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'Essential tree invariants and traversal characteristics.',
      coreIdea: {
        part1: 'DFS vs BFS',
        part2: 'Inorder = Sorted',
        result: 'Tree Mastery'
      },
      keyPoints: [
        {
          num: '01',
          title: 'INORDER BST SORT',
          text: 'Inorder traversal of a BST yields values in strictly sorted order.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'DFS (STACK / RECURSION)',
          text: 'Preorder (NLR), Inorder (LNR), Postorder (LRN) explore deep branches first.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'BFS (LEVEL ORDER QUEUE)',
          text: 'Queue visits nodes level-by-level from top to bottom.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'HEIGHT VS DEPTH',
          text: 'Height = longest path to leaf; Depth = path distance from root.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['2', '5', '7', '10', '15'], label: 'Inorder (LNR) on BST visits nodes in ascending order: 2 -> 5 -> 7 -> 10 -> 15' }
        ]
      },
      memoryTakeaway: 'BST Inorder = Sorted Array | DFS = Recursion | BFS = Queue'
    },
    {
      id: 'why-use-trees',
      cardNumber: 3,
      badge: '03 · ADVANTAGES',
      title: 'Why Use Trees?',
      introText: 'Trees provide logarithmic search efficiency and represent natural hierarchies.',
      coreIdea: {
        part1: 'O(log N) Search',
        part2: 'Hierarchical',
        result: 'Auto-Balancing'
      },
      keyPoints: [
        {
          num: '01',
          title: 'FAST LOOKUPS O(log N)',
          text: 'Balanced BST search takes O(log N) logarithmic time.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'HIERARCHICAL REPRESENTATION',
          text: 'Used for file systems, DOM trees, organizational charts, and AST compilers.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'RANGE QUERIES & INTERVALS',
          text: 'Segment Trees and Fenwick Trees calculate range sums in O(log N).',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'PRIORITY QUEUES & HEAPS',
          text: 'Binary Min/Max Heaps power priority scheduling.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['10', '5', '7'], label: 'Search value 7: 10 -> 5 (< 10) -> 7 (> 5) in O(log N) comparisons!' }
        ]
      },
      memoryTakeaway: 'Logarithmic Lookups O(log N) + Hierarchical Modeling = Trees'
    },
    {
      id: 'when-to-use-trees',
      cardNumber: 4,
      badge: '04 · APPLICABILITY',
      title: 'When to Use Trees?',
      introText: 'Recognizing coding problems best solved with tree data structures.',
      coreIdea: {
        part1: 'Hierarchy',
        part2: 'Ancestor/Path',
        result: 'Use Tree'
      },
      keyPoints: [
        {
          num: '01',
          title: 'HIERARCHICAL DATA',
          text: 'DOM elements, folder directories, decision trees.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'LOWEST COMMON ANCESTOR',
          text: 'Finding lowest shared parent of two nodes.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'PATH SUM PROBLEMS',
          text: 'Finding root-to-leaf paths matching target sum.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'DICTIONARY / PREFIX AUTOCOMPLETE',
          text: 'Trie (Prefix Tree) enables fast word auto-complete lookups.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['2', '7', '5'], label: 'Find LCA of node 2 and node 7: Lowest Common Ancestor is Node 5!' }
        ]
      },
      memoryTakeaway: 'Path Sums + Ancestor Searches + Level Scans = Tree Choice'
    },
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANICS',
      title: 'How It Works',
      introText: 'Understanding tree recursion and stack unwinding.',
      coreIdea: {
        part1: 'Base Case (null)',
        part2: 'Recurse Children',
        result: 'Combine Answers'
      },
      keyPoints: [
        {
          num: '01',
          title: 'BASE CASE',
          text: 'If root is null, return default base value (0, null, or true).',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'RECURSE SUBTREES',
          text: 'Solve problem recursively for root.left and root.right.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'COMBINE RESULTS',
          text: 'Aggregate answers from left and right children (e.g. 1 + max(left, right)).',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'UNWIND STACK',
          text: 'Return aggregated answer up to parent call.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['10', '5', '15'], label: 'Divide and conquer recursively on left and right subtrees' }
        ]
      },
      memoryTakeaway: 'Null Base Case -> Recurse Left & Right -> Combine Results'
    },
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · PATTERNS',
      title: 'Patterns / Types',
      introText: '5 core sub-patterns of tree algorithms.',
      coreIdea: {
        part1: '5 Patterns',
        part2: 'Traversal Type',
        result: 'Target Logic'
      },
      keyPoints: [
        {
          num: '01',
          title: 'DFS TRAVERSALS',
          text: 'Preorder (NLR), Inorder (LNR), Postorder (LRN).',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'BFS LEVEL ORDER',
          text: 'Queue visits nodes level by level.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'BST PROPERTIES',
          text: 'Validating BST, BST search, insertion, and deletion.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'TREE RECURSION / LCA',
          text: 'Lowest Common Ancestor and subtree identity checks.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['10', '5', '15', '2', '7', '20'], label: 'BFS visits level-by-level: Level 0 [10] -> Level 1 [5, 15] -> Level 2 [2, 7, 20]' }
        ]
      },
      memoryTakeaway: 'DFS Pre/In/Post | BFS Level Order | BST Properties | LCA'
    },
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · COMPLEXITY',
      title: 'Complexity Analysis',
      introText: 'Time and space complexity bounds across tree algorithms.',
      coreIdea: {
        part1: 'Time: O(N)',
        part2: 'Space: O(H)',
        result: 'H = log N to N'
      },
      keyPoints: [
        {
          num: '01',
          title: 'TRAVERSAL TIME: O(N)',
          text: 'Every node in tree is visited exactly once.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'BALANCED TREE SPACE: O(log N)',
          text: 'Recursion call stack max depth H = log N for balanced trees.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'SKEWED TREE SPACE: O(N)',
          text: 'Skewed tree degenerates into linked list with depth H = N.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '04',
          title: 'BST SEARCH TIME',
          text: 'O(log N) average, O(N) worst case if unbalanced.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['10', '5', '2'], label: 'Balanced Tree height H = log N; Skewed Tree height H = N' }
        ]
      },
      memoryTakeaway: 'Time: O(N) | Space: O(H) where H = log N (balanced) or N (skewed)'
    },
    {
      id: 'edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Edge Cases & Pitfalls',
      introText: 'Avoid common crashes when writing tree algorithms.',
      coreIdea: {
        part1: 'Null Root',
        part2: 'Skewed Tree',
        result: 'Guard Checks'
      },
      keyPoints: [
        {
          num: '01',
          title: 'NULL ROOT',
          text: 'Always handle root == null base case first.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '02',
          title: 'SINGLE NODE TREE',
          text: 'Verify algorithm handles trees with length 1 (root.left==null, root.right==null).',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'BST BOUNDARY OVERFLOW',
          text: 'In BST validation, node values can equal INT_MIN or INT_MAX. Use long bounds.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'SKEWED TREE STACK OVERFLOW',
          text: 'Extremely deep skewed trees cause call stack overflow. Fallback to iterative DFS with custom Stack.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['10'], label: 'Guard null root (root == null -> return 0) & handle single node tree' }
        ]
      },
      memoryTakeaway: 'Check Null Root -> Handle Single Node -> Use Long Bounds for BST'
    },
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · SYNTAX REFERENCE',
      title: 'Language Syntax',
      introText: 'TreeNode definitions across C++, Java, Python, and JavaScript.',
      isSyntaxCard: true,
      syntaxData: {
        'C++': `// Binary Tree Node Definition
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Recursive Inorder Traversal
void inorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}`,
        'Java': `// Binary Tree Node Definition
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

// Level Order Traversal (BFS)
Queue<TreeNode> q = new LinkedList<>();
q.add(root);
while (!q.isEmpty()) {
    TreeNode curr = q.poll();
    if (curr.left != null) q.add(curr.left);
    if (curr.right != null) q.add(curr.right);
}`,
        'Python': `# Binary Tree Node Definition
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Max Depth Recursion
def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
        'JavaScript': `// Binary Tree Node Definition
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}`
      }
    },
    {
      id: 'quick-memory',
      cardNumber: 10,
      badge: '10 · RECAP',
      title: 'Quick Memory / Takeaway',
      introText: 'Cheat sheet for tree and BST interview problems.',
      coreIdea: {
        part1: 'Base Case: null',
        part2: 'Recurse Subtrees',
        result: 'Mastered'
      },
      keyPoints: [
        {
          num: '01',
          title: 'INORDER BST',
          text: 'Yields elements in strictly sorted order.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'LEVEL ORDER BFS',
          text: 'Use Queue with size snapshot per level.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'BST VALIDATION',
          text: 'minBound < node.val < maxBound passed recursively.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'LCA',
          text: 'If left and right recursive calls are both non-null, current node is LCA.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        steps: [
          { activeNodes: ['10', '5', '15', '2', '7'], label: 'BST Inorder = Sorted | BFS = Level Queue | LCA = Dual Return Check' }
        ]
      },
      memoryTakeaway: 'BST Inorder = Sorted | BFS = Level Queue | LCA = Dual Return Check'
    }
  ]
};
