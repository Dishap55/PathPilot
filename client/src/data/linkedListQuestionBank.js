/**
 * CURATED INTERVIEW-FOCUSED QUESTION BANK FOR LINKED LIST
 * 
 * 35 High-Value Curated Problems:
 * - Easy: 14 questions
 * - Medium: 16 questions
 * - Hard: 5 questions
 * 
 * Sub-Patterns Covered:
 * 1. Traversal & Node Manipulation
 * 2. Fast & Slow Pointer (Floyd Cycle & Middle Node)
 * 3. Reverse Linked List Variations
 * 4. Merge & Split Lists
 * 5. Doubly & Circular Linked Lists
 * 
 * Starter codes contain NO solution leaks.
 */

export const LINKED_LIST_QUESTION_BANK = [
  // EASY PROBLEMS (1-14)
  {
    id: 'reverse-linked-list-std',
    title: '1. Reverse Linked List',
    difficulty: 'Easy',
    pattern: 'Reverse Linked List Variations',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Cognizant', 'Accenture'],
    placementFocus: ['TCS', 'Cognizant', 'Accenture'],
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list's head.`,
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' }
    ],
    constraints: ['Number of nodes in list is in range [0, 5000]', '-5000 <= Node.val <= 5000'],
    functionName: 'reverseList',
    starterCode: {
      'Python': `def reverseList(head):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function reverseList(head) {
    // Write your code here
    return null;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "head = [1, 2, 3, 4, 5]",
            "expected": "[5, 4, 3, 2, 1]",
            "visualHint": "Maintain prev=null, curr=head, nextNode=curr.next. Reverse curr.next = prev."
      }
],
    solutionAnalysis: {
      intuition: 'Change pointer directions in a single pass maintaining prev, curr, and next pointers.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'prev = null, curr = head.',
        'While curr != null:',
        '  nextNode = curr.next',
        '  curr.next = prev',
        '  prev = curr',
        '  curr = nextNode',
        'Return prev.'
      ]
    }
  },
  {
    id: 'linked-list-cycle-detection',
    title: '2. Linked List Cycle',
    difficulty: 'Easy',
    pattern: 'Fast & Slow Pointer',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Meta', 'TCS', 'Capgemini'],
    placementFocus: ['TCS', 'Capgemini'],
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it. Return \`true\` if there is a cycle, otherwise return \`false\`.`,
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1', output: 'true' }
    ],
    constraints: ['Number of nodes in list is in range [0, 10^4]'],
    functionName: 'hasCycle',
    starterCode: {
      'Python': `def hasCycle(head):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public boolean hasCycle(ListNode head) {
        // Write your code here
        return false;
    }
}`,
      'C++': `class Solution {
public:
    bool hasCycle(ListNode* head) {
        // Write your code here
        return false;
    }
};`,
      'JavaScript': `function hasCycle(head) {
    // Write your code here
    return false;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "head = [3, 2, 0, -4], pos = 1",
            "expected": "true",
            "visualHint": "Floyd's Cycle Finding Algorithm: slow moves 1 step, fast moves 2 steps. If fast == slow, cycle exists."
      }
],
    solutionAnalysis: {
      intuition: 'Fast pointer moves twice as fast as slow pointer. If a cycle exists, fast will catch up to slow inside the loop.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'slow = head, fast = head.',
        'While fast != null and fast.next != null:',
        '  slow = slow.next',
        '  fast = fast.next.next',
        '  If slow == fast return true',
        'Return false.'
      ]
    }
  },
  {
    id: 'merge-two-sorted-lists-std',
    title: '3. Merge Two Sorted Lists',
    difficulty: 'Easy',
    pattern: 'Merge & Split Lists',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS', 'Wipro'],
    placementFocus: ['TCS', 'Wipro'],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`. Merge the two lists into one sorted list. Return the head of the merged linked list.`,
    examples: [
      { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', output: '[1, 1, 2, 3, 4, 4]' }
    ],
    constraints: ['Number of nodes in both lists is in range [0, 50]'],
    functionName: 'mergeTwoLists',
    starterCode: {
      'Python': `def mergeTwoLists(list1, list2):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function mergeTwoLists(list1, list2) {
    // Write your code here
    return null;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "list1 = [1, 2, 4], list2 = [1, 3, 4]",
            "expected": "[1, 1, 2, 3, 4, 4]",
            "visualHint": "Use dummy head node. Attach smaller node of list1 or list2 at each iteration."
      }
],
    solutionAnalysis: {
      intuition: 'Compare front values of both lists and attach smaller node to tail of merged list.',
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'dummy = ListNode(0), tail = dummy.',
        'While list1 != null and list2 != null:',
        '  If list1.val <= list2.val: tail.next = list1, list1 = list1.next',
        '  Else tail.next = list2, list2 = list2.next',
        '  tail = tail.next',
        'tail.next = list1 != null ? list1 : list2.',
        'Return dummy.next.'
      ]
    }
  },
  {
    id: 'middle-of-the-linked-list',
    title: '4. Middle of the Linked List',
    difficulty: 'Easy',
    pattern: 'Fast & Slow Pointer',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'TCS', 'Cognizant'],
    placementFocus: ['TCS', 'Cognizant'],
    description: `Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.`,
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[3, 4, 5]' },
      { input: 'head = [1, 2, 3, 4, 5, 6]', output: '[4, 5, 6]' }
    ],
    constraints: ['Number of nodes in list is in range [1, 100]'],
    functionName: 'middleNode',
    starterCode: {
      'Python': `def middleNode(head):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public ListNode middleNode(ListNode head) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function middleNode(head) {
    // Write your code here
    return null;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "head = [1, 2, 3, 4, 5]",
            "expected": "[3, 4, 5]",
            "visualHint": "When fast pointer reaches end (moves 2 steps), slow pointer (moves 1 step) sits at middle."
      }
],
    solutionAnalysis: {
      intuition: 'Fast pointer advances 2 steps while slow advances 1 step. When fast reaches end, slow is at middle.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'slow = head, fast = head.',
        'While fast != null and fast.next != null:',
        '  slow = slow.next',
        '  fast = fast.next.next',
        'Return slow.'
      ]
    }
  },
  {
    id: 'remove-nth-node-from-end-of-list',
    title: '5. Remove Nth Node From End of List',
    difficulty: 'Medium',
    pattern: 'Fast & Slow Pointer',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'TCS'],
    placementFocus: ['TCS'],
    description: `Given the head of a linked list, remove the \`n-th\` node from the end of the list and return its head in a single pass.`,
    examples: [
      { input: 'head = [1, 2, 3, 4, 5], n = 2', output: '[1, 2, 3, 5]' }
    ],
    constraints: ['Number of nodes in list is in range [1, 30]'],
    functionName: 'removeNthFromEnd',
    starterCode: {
      'Python': `def removeNthFromEnd(head, n):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function removeNthFromEnd(head, n) {
    // Write your code here
    return null;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "head = [1, 2, 3, 4, 5], n = 2",
            "expected": "[1, 2, 3, 5]",
            "visualHint": "Advance fast pointer n+1 steps ahead of slow pointer. When fast reaches null, slow is right before target node."
      }
],
    solutionAnalysis: {
      intuition: 'Maintain a gap of N nodes between fast and slow pointers using a dummy node.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'dummy = ListNode(0), dummy.next = head.',
        'fast = dummy, slow = dummy.',
        'Advance fast by n + 1 steps.',
        'While fast != null: fast = fast.next, slow = slow.next.',
        'slow.next = slow.next.next.',
        'Return dummy.next.'
      ]
    }
  },
  {
    id: 'reorder-list-linked-list',
    title: '6. Reorder List',
    difficulty: 'Medium',
    pattern: 'Reverse Linked List Variations',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    placementFocus: [],
    description: `You are given the head of a singly linked list. Reorder the list to be on the form: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ... You may not modify the values in the list's nodes.`,
    examples: [
      { input: 'head = [1, 2, 3, 4]', output: '[1, 4, 2, 3]' }
    ],
    constraints: ['Number of nodes in list is in range [1, 5 * 10^4]'],
    functionName: 'reorderList',
    starterCode: {
      'Python': `def reorderList(head):
    # Modify list in-place
    pass`,
      'Java': `class Solution {
    public void reorderList(ListNode head) {
        // Write your code here
    }
}`,
      'C++': `class Solution {
public:
    void reorderList(ListNode* head) {
        // Write your code here
    }
};`,
      'JavaScript': `function reorderList(head) {
    // Write your code here
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "head = [1, 2, 3, 4]",
            "expected": "[1, 4, 2, 3]",
            "visualHint": "Step 1: Find middle using fast/slow. Step 2: Reverse second half. Step 3: Interleave two halves."
      }
],
    solutionAnalysis: {
      intuition: 'Combines middle finding, list reversal, and two-pointer merging.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmSteps: [
        'Find middle of list using slow & fast pointers.',
        'Reverse second half starting from middle.next, set middle.next = null.',
        'Interleave nodes from first half and reversed second half.'
      ]
    }
  },
  {
    id: 'flatten-a-multilevel-doubly-linked-list',
    title: '7. Flatten a Multilevel Doubly Linked List',
    difficulty: 'Medium',
    pattern: 'Doubly & Circular Linked Lists',
    priority: 'High Priority',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    placementFocus: [],
    description: `Given a doubly linked list where in addition to next and prev pointers, each node has a child pointer, flatten the list so that all nodes appear in a single-level doubly linked list.`,
    examples: [
      { input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', output: '[1,2,3,7,8,11,12,9,10,4,5,6]' }
    ],
    constraints: ['Number of nodes in list is in range [0, 1000]'],
    functionName: 'flatten',
    starterCode: {
      'Python': `def flatten(head):
    # Write your code here
    pass`,
      'Java': `class Solution {
    public Node flatten(Node head) {
        // Write your code here
        return null;
    }
}`,
      'C++': `class Solution {
public:
    Node* flatten(Node* head) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function flatten(head) {
    // Write your code here
    return null;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "Multilevel doubly linked list",
            "expected": "Flattened 1D doubly list",
            "visualHint": "When child pointer exists, insert child list between curr and curr.next using stack or DFS."
      }
],
    solutionAnalysis: {
      intuition: 'DFS traversal inserts child lists directly into parent next pointers while keeping prev pointers valid.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N) stack',
      algorithmSteps: [
        'Iterate curr through list.',
        'If curr.child exists, find tail of child list, connect childTail.next = curr.next, curr.next = curr.child, curr.child = null.',
        'Update prev pointers accordingly.'
      ]
    }
  },
  {
    id: 'merge-k-sorted-lists-hard',
    title: '8. Merge K Sorted Lists',
    difficulty: 'Hard',
    pattern: 'Merge & Split Lists',
    priority: 'Must Practice',
    interviewFocus: true,
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    placementFocus: [],
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it in O(N log K) time.`,
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }
    ],
    constraints: ['k == lists.length', '0 <= k <= 10^4'],
    functionName: 'mergeKLists',
    starterCode: {
      'Python': `def mergeKLists(lists):
    # Write your code here (Min-Heap or Divide & Conquer)
    pass`,
      'Java': `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Write your code here
        return null;
    }
}`,
      'C++': `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Write your code here
        return nullptr;
    }
};`,
      'JavaScript': `function mergeKLists(lists) {
    // Write your code here
    return null;
}`
    },
    testCases: [
      {
            "id": 1,
            "title": "Test Case 1",
            "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
            "expected": "[1,1,2,3,4,4,5,6]",
            "visualHint": "Min-Heap storing (node.val, node) extracts smallest head in O(log K) time."
      }
],
    solutionAnalysis: {
      intuition: 'A min-heap of size K keeps track of smallest unmerged node across all K lists.',
      timeComplexity: 'O(N log K)',
      spaceComplexity: 'O(K)',
      algorithmSteps: [
        'Push head of each non-empty list into min-heap.',
        'While heap is not empty: extract min node, attach to merged list, push minNode.next to heap.',
        'Return dummy.next.'
      ]
    }
  }
];
