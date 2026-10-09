/**
 * LINKED LIST 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA → Linked List → Introduction Depth Carousel.
 */
export const LINKED_LIST_INTRO_DATA = {
  topicId: 'linked-list',
  topicName: 'Linked List',
  subtitle: 'Master dynamic linear data structures connected via node pointers.',
  cards: [
    {
      id: 'what-is-linked-list',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What is a Linked List?',
      introText: 'A Linked List is a linear data structure where elements (nodes) are stored in non-contiguous memory, connected by pointer links.',
      coreIdea: {
        part1: 'Value + Pointer',
        part2: 'Node Links',
        result: 'Linked List'
      },
      keyPoints: [
        {
          num: '01',
          title: 'NODE STRUCTURE',
          text: 'Each node contains a data value and a pointer (next) to the following node.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'NON-CONTIGUOUS MEMORY',
          text: 'Nodes sit anywhere in heap memory connected via address pointers.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'O(1) HEAD INSERTION',
          text: 'Inserting at head takes constant O(1) time without shifting elements.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'DYNAMIC SIZING',
          text: 'Grows and shrinks on demand without preallocating memory.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 20, 30, 40],
        steps: [
          { activeIdx: 0, label: 'Head node [10] points to [20] via next pointer link' }
        ]
      },
      memoryTakeaway: 'Data + Next Pointer = Dynamic Linear List'
    },
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'Essential principles governing node memory and pointer manipulation.',
      coreIdea: {
        part1: 'Dummy Node',
        part2: 'Pointer Assignment',
        result: 'Clean Code'
      },
      keyPoints: [
        {
          num: '01',
          title: 'DUMMY HEAD NODE',
          text: 'Using a dummy head simplifies edge cases when modifying head pointer.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'NO RANDOM ACCESS',
          text: 'Accessing N-th element requires linear traversal from head O(N).',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '03',
          title: 'POINTER OVERHEAD',
          text: 'Extra memory used per node to store next and prev pointers.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'POINTER REASSIGNMENT ORDER',
          text: 'Always save next node before reassigning node.next = newPrev.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        nodes: [0, 10, 20, 30],
        steps: [
          { prev: 0, curr: 1, label: 'Dummy head node (0) simplifies head insertion and deletion' }
        ]
      },
      memoryTakeaway: 'Use Dummy Head Node -> Save next pointer -> Prevent orphan nodes'
    },
    {
      id: 'why-use-linked-list',
      cardNumber: 3,
      badge: '03 · ADVANTAGES',
      title: 'Why Use Linked List?',
      introText: 'Provides constant-time dynamic insertions and deletions.',
      coreIdea: {
        part1: 'O(1) Insert',
        part2: 'O(1) Delete',
        result: 'Dynamic Memory'
      },
      keyPoints: [
        {
          num: '01',
          title: 'FAST INSERTION & DELETION',
          text: 'O(1) insertion/deletion once target node pointer is known.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'NO MEMORY WASTAGE',
          text: 'Allocates memory node-by-node instead of over-allocating array buffers.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'EASY QUEUE IMPLEMENTATION',
          text: 'Powers LinkedList-based FIFOs and LRU Cache structures.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'SPLIT & MERGE OPERABILITY',
          text: 'Concatenating two linked lists takes O(1) time by updating tail.next.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 25, 20, 30],
        steps: [
          { activeIdx: 1, label: 'Inserting node 25 takes O(1) time: update 10.next = 25 & 25.next = 20' }
        ]
      },
      memoryTakeaway: 'O(1) Head Modification + Dynamic Heap Allocation = Linked List Power'
    },
    {
      id: 'when-to-use-linked-list',
      cardNumber: 4,
      badge: '04 · APPLICABILITY',
      title: 'When to Use Linked List?',
      introText: 'Key indicators that point to choosing a linked list.',
      coreIdea: {
        part1: 'Frequent Inserts',
        part2: 'LRU Cache',
        result: 'Linked List'
      },
      keyPoints: [
        {
          num: '01',
          title: 'FREQUENT HEAD / TAIL MODIFICATION',
          text: 'Implementing Stacks, Queues, or Deques.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'LRU CACHE DESIGN',
          text: 'Doubly Linked List + Hash Map enables O(1) cache access & eviction.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'UNKNOWN TOTAL CAPACITY',
          text: 'Dataset size grows unpredictably during execution.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'CYCLE DETECTION & FLOYD\'S ALGO',
          text: 'Detecting state loops or finding middle nodes efficiently.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 20, 30, 40],
        steps: [
          { curr: 1, next: 3, label: 'Floyd\'s Cycle Detection: Fast pointer moves 2 steps, Slow pointer moves 1 step' }
        ]
      },
      memoryTakeaway: 'LRU Cache + Stacks/Queues + Floyd Cycle Detection = Linked List'
    },
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANICS',
      title: 'How It Works',
      introText: 'Understanding pointer traversal and node insertion mechanics.',
      coreIdea: {
        part1: 'prev = null',
        part2: 'curr = head',
        result: 'Pointer Shift'
      },
      keyPoints: [
        {
          num: '01',
          title: 'NODE CREATION',
          text: 'Allocate heap memory for new node with data value.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'HEAD INSERTION',
          text: 'newNode.next = head, head = newNode.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'TRAVERSAL LOOP',
          text: 'curr = head; while (curr != null) curr = curr.next.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'NODE DELETION',
          text: 'prev.next = target.next (target node bypassed & garbage collected).',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 20, 30, 40],
        steps: [
          { prev: 0, curr: 1, next: 2, label: 'Reversing list: save next, assign curr.next = prev, advance prev & curr' }
        ]
      },
      memoryTakeaway: 'Bypass Node -> Update Pointers -> Garbage Collector reclaims'
    },
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · PATTERNS',
      title: 'Patterns / Types',
      introText: '5 primary linked list problem patterns.',
      coreIdea: {
        part1: '5 Patterns',
        part2: 'Pointer Tricks',
        result: 'Clean Solution'
      },
      keyPoints: [
        {
          num: '01',
          title: 'FAST & SLOW POINTER',
          text: 'Cycle detection (Floyd\'s) and finding middle node.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'IN-PLACE REVERSAL',
          text: 'Reverse entire list or subarray segment in O(1) space.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'MERGING & SPLITTING',
          text: 'Merge K sorted lists or split into equal halves.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'DOUBLY LINKED LIST',
          text: 'Nodes store next and prev pointers for bidirectional traversal.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 20, 30, 40],
        steps: [
          { curr: 1, next: 3, label: 'Two Pointers on Linked List: Fast & Slow pointers locate middle node in 1 pass' }
        ]
      },
      memoryTakeaway: 'Fast & Slow | In-Place Reversal | Dummy Head | Doubly Linked'
    },
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · COMPLEXITY',
      title: 'Complexity Analysis',
      introText: 'Time and space tradeoffs for linked list operations.',
      coreIdea: {
        part1: 'Head Insert: O(1)',
        part2: 'Lookup: O(N)',
        result: 'Space: O(N)'
      },
      keyPoints: [
        {
          num: '01',
          title: 'HEAD INSERT / DELETE: O(1)',
          text: 'Constant time modifying head pointer.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'ACCESS BY INDEX: O(N)',
          text: 'Must traverse nodes sequentially from head.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '03',
          title: 'SEARCH BY VALUE: O(N)',
          text: 'Linear scan through nodes.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'TAIL INSERT WITH POINTER: O(1)',
          text: 'If tail pointer is maintained, tail push is O(1).',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 20, 30, 40],
        steps: [
          { activeIdx: 2, label: 'O(1) Insertion & Deletion once target pointer is located; O(N) lookup time' }
        ]
      },
      memoryTakeaway: 'Head Modification = O(1) | Element Search = O(N)'
    },
    {
      id: 'edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Edge Cases & Pitfalls',
      introText: 'Avoid null pointer crashes and lost head references.',
      coreIdea: {
        part1: 'Null Checks',
        part2: 'Lost Reference',
        result: 'Dummy Node'
      },
      keyPoints: [
        {
          num: '01',
          title: 'NULL HEAD OR SINGLE NODE',
          text: 'Always test head == null or head.next == null.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '02',
          title: 'LOST HEAD REFERENCE',
          text: 'Assigning head = head.next without saving prev causes memory loss.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'EVEN VS ODD NODES IN FLOYD',
          text: 'Check while (fast != null && fast.next != null) to handle both lengths.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'DOUBLY LINKED PREV UPDATE',
          text: 'When deleting node, update node.next.prev = node.prev if node.next exists.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 20, 30, 40],
        steps: [
          { activeIdx: 0, label: 'Handle Null Head, Single Node, and loss of next pointer reference' }
        ]
      },
      memoryTakeaway: 'Check head == null -> Use Dummy Head -> Guard fast.next'
    },
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · SYNTAX REFERENCE',
      title: 'Language Syntax',
      introText: 'Node definitions across C++, Java, Python, and JavaScript.',
      isSyntaxCard: true,
      syntaxData: {
        'C++': `// Singly Linked List Node
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Iterative Traversal
ListNode* curr = head;
while (curr != nullptr) {
    // Process curr->val
    curr = curr->next;
}`,
        'Java': `// Singly Linked List Node
public class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

// Iterative Traversal
ListNode curr = head;
while (curr != null) {
    // Process curr.val
    curr = curr.next;
}`,
        'Python': `# Singly Linked List Node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Iterative Traversal
curr = head
while curr:
    # Process curr.val
    curr = curr.next`,
        'JavaScript': `// Singly Linked List Node
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// Iterative Traversal
let curr = head;
while (curr !== null) {
    // Process curr.val
    curr = curr.next;
}`
      }
    },
    {
      id: 'quick-memory',
      cardNumber: 10,
      badge: '10 · RECAP',
      title: 'Quick Memory / Takeaway',
      introText: 'Cheat sheet for linked list interview questions.',
      coreIdea: {
        part1: 'Fast & Slow',
        part2: 'Dummy Head',
        result: 'Mastered'
      },
      keyPoints: [
        {
          num: '01',
          title: 'FAST & SLOW',
          text: 'Middle node: slow 1x, fast 2x speed. Cycle: fast catches slow.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'IN-PLACE REVERSAL',
          text: 'prev=null, curr=head; while(curr) { next=curr.next; curr.next=prev; prev=curr; curr=next; }',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'DUMMY HEAD',
          text: 'Eliminates special case code for list head modifications.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'N-TH FROM END',
          text: 'Advance fast by N steps, then move fast and slow together.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        nodes: [10, 20, 30, 40],
        steps: [
          { activeIdx: 0, label: 'Linked List Takeaway: Save Next Pointer -> Use Dummy Head -> Fast/Slow Pointers' }
        ]
      },
      memoryTakeaway: 'Fast & Slow Pointer + Dummy Head + Reversal Loop = High Score'
    }
  ]
};
