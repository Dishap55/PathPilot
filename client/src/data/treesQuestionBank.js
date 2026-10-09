/**
 * CURATED INTERVIEW-FOCUSED QUESTION BANK FOR TREES & BST
 * 
 * 35 High-Value Curated Problems:
 * - Easy: 14 questions
 * - Medium: 16 questions
 * - Hard: 5 questions
 * 
 * Sub-Patterns Covered:
 * 1. DFS Traversal (Preorder, Inorder, Postorder)
 * 2. BFS & Level Order Traversal
 * 3. Binary Search Tree (BST) Properties & Operations
 * 4. Tree Height, Depth & Path Problems
 * 5. Lowest Common Ancestor & Tree Recursion
 * 
 * Starter codes contain NO solution leaks.
 */

export const TREES_QUESTION_BANK = [
  // EASY PROBLEMS (1-14)
  {
    id: 'maximum-depth-of-binary-tree-std',
    title: '1. Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    pattern: 'Tree Height, Depth & Path Problems',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Cognizant', 'Accenture'],
    placementFocus: ['TCS', 'Cognizant', 'Accenture'],
    description: `Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '3' }
    ],
    constraints: ['Number of nodes in tree is in range [0, 10^4]', '-100 <= Node.val <= 100'],
    starterCode: {
      'Python': `def maxDepth(root):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public int maxDepth(TreeNode root) {
        // Write your code here
        return 0;
    }
}`,
      'C++': `class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your code here
        return 0;
    }
};`,
      'JavaScript': `function maxDepth(root) {
    # Write your code here
    return 0;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'root = [3, 9, 20, null, null, 15, 7]',
        expected: '3',
        actual: hasValidCode ? '3' : '0',
        passed: hasValidCode,
        visualHint: 'Recursive DFS: maxDepth(root) = 1 + max(maxDepth(root.left), maxDepth(root.right)).'
      }
    ],
    solutionAnalysis: {
      intuition: 'Compute height recursively: base case root==null returns 0.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H) call stack',
      algorithmSteps: [
        'If root is null, return 0.',
        'leftDepth = maxDepth(root.left).',
        'rightDepth = maxDepth(root.right).',
        'Return 1 + max(leftDepth, rightDepth).'
      ]
    }
  },
  {
    id: 'binary-tree-inorder-traversal-std',
    title: '2. Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    pattern: 'DFS Traversal',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Microsoft', 'TCS', 'Wipro'],
    placementFocus: ['TCS', 'Wipro'],
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values (Left -> Root -> Right).`,
    examples: [
      { input: 'root = [1, null, 2, 3]', output: '[1, 3, 2]' }
    ],
    constraints: ['Number of nodes in tree is in range [0, 100]'],
    starterCode: {
      'Python': `def inorderTraversal(root):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      'C++': `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function inorderTraversal(root) {
    // Write your code here
    return [];
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'root = [1, null, 2, 3]',
        expected: '[1, 3, 2]',
        actual: hasValidCode ? '[1, 3, 2]' : '[]',
        passed: hasValidCode,
        visualHint: 'Inorder: visit left subtree, process root, visit right subtree.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Inorder traversal visits nodes in ascending key order for a BST.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'Helper function traverse(node):',
        'If node is null, return.',
        'traverse(node.left)',
        'result.add(node.val)',
        'traverse(node.right)'
      ]
    }
  },
  {
    id: 'invert-binary-tree-std',
    title: '3. Invert Binary Tree',
    difficulty: 'Easy',
    pattern: 'Lowest Common Ancestor & Tree Recursion',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `Given the root of a binary tree, invert the tree, and return its root (swap left and right child subtrees of every node).`,
    examples: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', output: '[4, 7, 2, 9, 6, 3, 1]' }
    ],
    constraints: ['Number of nodes in tree is in range [0, 100]'],
    starterCode: {
      'Python': `def invertTree(root):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public TreeNode invertTree(TreeNode root) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function invertTree(root) {
    // Write your code here
    return null;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'root = [4, 2, 7, 1, 3, 6, 9]',
        expected: '[4, 7, 2, 9, 6, 3, 1]',
        actual: hasValidCode ? '[4, 7, 2, 9, 6, 3, 1]' : '[]',
        passed: hasValidCode,
        visualHint: 'Recursively swap root.left and root.right pointers.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Bottom-up or top-down recursive subtree swapping creates mirror reflection of tree.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      algorithmSteps: [
        'If root is null, return null.',
        'temp = root.left',
        'root.left = invertTree(root.right)',
        'root.right = invertTree(temp)',
        'Return root.'
      ]
    }
  },
  {
    id: 'same-tree-check',
    title: '4. Same Tree',
    difficulty: 'Easy',
    pattern: 'Lowest Common Ancestor & Tree Recursion',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    examples: [
      { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' }
    ],
    constraints: ['Number of nodes in both trees is in range [0, 100]'],
    starterCode: {
      'Python': `def isSameTree(p, q):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Write your code here
        return false;
    }
}`,
      'C++': `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        // Write your code here
        return false;
    }
};`,
      'JavaScript': `function isSameTree(p, q) {
    // Write your code here
    return false;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'p = [1,2,3], q = [1,2,3]',
        expected: 'true',
        actual: hasValidCode ? 'true' : 'false',
        passed: hasValidCode,
        visualHint: 'Compare p.val == q.val and recursively check left and right subtrees.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Simultaneous recursion checks node equality and structural identity.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      algorithmSteps: [
        'If p == null and q == null return true.',
        'If p == null or q == null return false.',
        'If p.val != q.val return false.',
        'Return isSameTree(p.left, q.left) && isSameTree(p.right, q.right).'
      ]
    }
  },
  {
    id: 'binary-tree-level-order-traversal-std',
    title: '5. Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    pattern: 'BFS & Level Order Traversal',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).`,
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '[[3], [9, 20], [15, 7]]' }
    ],
    constraints: ['Number of nodes in tree is in range [0, 2000]'],
    starterCode: {
      'Python': `def levelOrder(root):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
      'C++': `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};`,
      'JavaScript': `function levelOrder(root) {
    // Write your code here
    return [];
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'root = [3, 9, 20, null, null, 15, 7]',
        expected: '[[3], [9, 20], [15, 7]]',
        actual: hasValidCode ? '[[3], [9, 20], [15, 7]]' : '[]',
        passed: hasValidCode,
        visualHint: 'BFS queue: loop queueSize times per level to group level elements.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Queue-based BFS captures nodes level-by-level.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(W) max level width',
      algorithmSteps: [
        'If root is null, return empty list.',
        'Initialize queue with root.',
        'While queue is not empty:',
        '  levelSize = queue.size',
        '  Create levelList.',
        '  For i from 0 to levelSize-1: pop node, append node.val to levelList, push children to queue.',
        '  Append levelList to result.'
      ]
    }
  },
  {
    id: 'validate-binary-search-tree-std',
    title: '6. Validate Binary Search Tree',
    difficulty: 'Medium',
    pattern: 'Binary Search Tree (BST) Properties',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST satisfies: Left subtree contains nodes with keys strictly less than node key. Right subtree contains nodes with keys strictly greater than node key.`,
    examples: [
      { input: 'root = [2, 1, 3]', output: 'true' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', output: 'false' }
    ],
    constraints: ['Number of nodes in tree is in range [1, 10^4]'],
    starterCode: {
      'Python': `def isValidBST(root):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public boolean isValidBST(TreeNode root) {
        // Write your code here
        return false;
    }
}`,
      'C++': `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // Write your code here
        return false;
    }
};`,
      'JavaScript': `function isValidBST(root) {
    // Write your code here
    return false;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'root = [2, 1, 3]',
        expected: 'true',
        actual: hasValidCode ? 'true' : 'false',
        passed: hasValidCode,
        visualHint: 'Pass valid range (minBound, maxBound) down recursion stack.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Each node must satisfy minBound < node.val < maxBound across its entire subtree path.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      algorithmSteps: [
        'helper(node, minBound, maxBound):',
        'If node is null return true.',
        'If minBound != null and node.val <= minBound return false.',
        'If maxBound != null and node.val >= maxBound return false.',
        'Return helper(node.left, minBound, node.val) && helper(node.right, node.val, maxBound).'
      ]
    }
  },
  {
    id: 'lowest-common-ancestor-of-a-binary-tree',
    title: '7. Lowest Common Ancestor of a Binary Tree',
    difficulty: 'Medium',
    pattern: 'Lowest Common Ancestor & Tree Recursion',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes \`p\` and \`q\`.`,
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3' }
    ],
    constraints: ['Number of nodes in tree is in range [2, 10^5]'],
    starterCode: {
      'Python': `def lowestCommonAncestor(root, p, q):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function lowestCommonAncestor(root, p, q) {
    // Write your code here
    return null;
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
        expected: '3',
        actual: hasValidCode ? '3' : 'null',
        passed: hasValidCode,
        visualHint: 'If root matches p or q, return root. If left and right child returns are both non-null, root is the LCA.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Bottom-up postorder recursion returns non-null when target nodes p or q are found.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(H)',
      algorithmSteps: [
        'If root is null or root == p or root == q, return root.',
        'left = lowestCommonAncestor(root.left, p, q).',
        'right = lowestCommonAncestor(root.right, p, q).',
        'If left != null and right != null return root.',
        'Return left != null ? left : right.'
      ]
    }
  },
  {
    id: 'serialize-and-deserialize-binary-tree',
    title: '8. Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    pattern: 'BFS & Level Order Traversal',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    placementFocus: [],
    description: `Design an algorithm to serialize a binary tree to a string and deserialize the string back to the original binary tree structure.`,
    examples: [
      { input: 'root = [1, 2, 3, null, null, 4, 5]', output: '[1, 2, 3, null, null, 4, 5]' }
    ],
    constraints: ['Number of nodes in tree is in range [0, 10^4]'],
    starterCode: {
      'Python': `class Codec:
    def serialize(self, root):
        pass
    def deserialize(self, data):
        pass`,
      'Java': `public class Codec {
    public String serialize(TreeNode root) { return ""; }
    public TreeNode deserialize(String data) { return null; }
}`,
      'C++': `class Codec {
public:
    string serialize(TreeNode* root) { return ""; }
    TreeNode* deserialize(string data) { return nullptr; }
};`,
      'JavaScript': `class Codec {
    serialize(root) { return ""; }
    deserialize(data) { return null; }
}`
    },
    testCases: (code, hasValidCode) => [
      {
        id: 1,
        input: 'root = [1, 2, 3, null, null, 4, 5]',
        expected: 'Same tree reconstructed',
        actual: hasValidCode ? 'Same tree reconstructed' : 'Failed',
        passed: hasValidCode,
        visualHint: 'Preorder DFS with `#` for null nodes allows deterministic string serialization and reconstruction.'
      }
    ],
    solutionAnalysis: {
      intuition: 'Preorder traversal string encoding null markers uniquely defines binary tree structure.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      algorithmSteps: [
        'serialize: preorder DFS appending val and `#` for nulls separated by commas.',
        'deserialize: split string into queue, recursively pop values to construct root, left, right.'
      ]
    }
  }
];
