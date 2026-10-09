/**
 * GRAPHS & BFS/DFS 10-CARD INTRODUCTION DATA DEFINITION
 * Reusable data structure for DSA → Graphs → Introduction Depth Carousel.
 */
export const GRAPHS_INTRO_DATA = {
  topicId: 'graphs',
  topicName: 'Graphs & BFS/DFS',
  subtitle: 'Master network connectivity, matrix traversal, shortest paths, and topological ordering.',
  cards: [
    {
      id: 'what-is-graphs',
      cardNumber: 1,
      badge: '01 · CORE CONCEPT',
      title: 'What are Graphs & BFS/DFS?',
      introText: 'A Graph is a non-linear network consisting of vertices (nodes) connected by edges (relationships), traversed using BFS or DFS.',
      coreIdea: {
        part1: 'Vertices (V)',
        part2: 'Edges (E)',
        result: 'Network Graph'
      },
      keyPoints: [
        {
          num: '01',
          title: 'VERTICES & EDGES',
          text: 'V represents entities; E represents connections between them.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'DIRECTED VS UNDIRECTED',
          text: 'Edges can be one-way (directed) or two-way (undirected).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'WEIGHTED VS UNWEIGHTED',
          text: 'Edges can carry numerical weights representing distance or cost.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'BFS VS DFS',
          text: 'BFS uses Queue for shortest path; DFS uses Stack/Recursion for deep exploration.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['B', 'C'], visited: ['A'], activeNode: 'A', label: 'Vertices (V) connected by Edges (E); Adjacency List stores graph neighbors' }
        ]
      },
      memoryTakeaway: 'Vertices + Edges + Visited Array = Graph Network'
    },
    {
      id: 'key-points',
      cardNumber: 2,
      badge: '02 · KEY SUMMARY',
      title: 'Key Points',
      introText: 'Essential principles governing graph representations and traversals.',
      coreIdea: {
        part1: 'Adjacency List',
        part2: 'Visited Array',
        result: 'No Cycles'
      },
      keyPoints: [
        {
          num: '01',
          title: 'ADJACENCY LIST',
          text: 'Optimal graph representation adj[u] storing neighbors in vector/list.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'VISITED ARRAY',
          text: 'Mandatory boolean visited array to prevent infinite loops in cyclic graphs.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '03',
          title: 'BFS GUARANTEES SHORTEST PATH',
          text: 'In unweighted graphs, BFS level order discovers shortest path first.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '04',
          title: 'TOPOLOGICAL SORT ON DAG',
          text: 'Linear ordering of nodes where u appears before v for every directed edge u->v.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['C', 'D'], visited: ['A', 'B'], activeNode: 'B', label: 'Visited set prevents infinite loops in cyclic graphs during BFS/DFS' }
        ]
      },
      memoryTakeaway: 'Adjacency List + Visited Set + Queue (BFS) / Stack (DFS)'
    },
    {
      id: 'why-use-graphs',
      cardNumber: 3,
      badge: '03 · ADVANTAGES',
      title: 'Why Use Graphs?',
      introText: 'Graphs model real-world networks, social connections, and maps.',
      coreIdea: {
        part1: 'Networks',
        part2: 'Shortest Path',
        result: 'Dependencies'
      },
      keyPoints: [
        {
          num: '01',
          title: 'REAL-WORLD NETWORKS',
          text: 'Models Google Maps navigation, social networks, and internet routing.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'DEPENDENCY RESOLUTION',
          text: 'Topological sort resolves task dependencies (e.g. build systems, course pre-reqs).',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'SHORTEST PATH DIJKSTRA',
          text: 'Finds optimal route in weighted road networks.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '04',
          title: 'IMAGE FLOOD FILL',
          text: 'Connected component algorithms power paint bucket tool and island detection.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['D'], visited: ['A', 'B', 'C'], activeNode: 'C', label: 'BFS computes shortest path in unweighted graphs level-by-level' }
        ]
      },
      memoryTakeaway: 'Shortest Path + Dependency Sorting + Network Modeling = Graphs'
    },
    {
      id: 'when-to-use-graphs',
      cardNumber: 4,
      badge: '04 · APPLICABILITY',
      title: 'When to Use Graphs?',
      introText: 'Key problem signals that require graph data structures.',
      coreIdea: {
        part1: 'Grid / Network',
        part2: 'Prerequisites',
        result: 'Use Graph'
      },
      keyPoints: [
        {
          num: '01',
          title: '2D GRID MATRIX TRAVERSAL',
          text: 'Islands, maze pathfinding, knight moves on chessboard.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'COURSE PRE-REQUISITES',
          text: 'Detecting cycles or ordering tasks with prerequisites.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'SHORTEST DISTANCE IN UNWEIGHTED GRAPH',
          text: 'Min steps to transform word A to word B (Word Ladder).',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'WEIGHTED DISTANCE',
          text: 'Min time for network signal propagation (Dijkstra).',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['B'], visited: ['A'], activeNode: 'A', label: 'Topological Sort on Directed Acyclic Graph (DAG) orders prerequisite tasks' }
        ]
      },
      memoryTakeaway: '2D Grids + Prerequisites + Shortest Path = Graph Solution'
    },
    {
      id: 'how-it-works',
      cardNumber: 5,
      badge: '05 · MECHANICS',
      title: 'How It Works',
      introText: 'Understanding BFS vs DFS loop mechanics.',
      coreIdea: {
        part1: 'Pop Node',
        part2: 'Check Neighbors',
        result: 'Mark Visited'
      },
      keyPoints: [
        {
          num: '01',
          title: 'BFS (BREADTH-FIRST SEARCH)',
          text: 'Initialize Queue, push start node, mark visited. Loop: pop node, explore unvisited neighbors level-by-level.',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        },
        {
          num: '02',
          title: 'DFS (DEPTH-FIRST SEARCH)',
          text: 'Mark node visited. Recursively explore each unvisited neighbor as deep as possible before backtracking.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '03',
          title: 'KAHN\'S ALGORITHM (TOPOLOGICAL)',
          text: 'Track in-degrees of nodes. Queue nodes with inDegree == 0.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '04',
          title: 'DIJKSTRA MIN-HEAP',
          text: 'Min-Heap stores (dist, u). Relax edges dist[v] = dist[u] + w.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['C'], visited: ['A', 'B'], activeNode: 'B', label: 'Kahn\'s Algorithm: Queue nodes with in-degree == 0' }
        ]
      },
      memoryTakeaway: 'BFS Queue = Level Ripples | DFS Stack = Deep Branching'
    },
    {
      id: 'patterns-types',
      cardNumber: 6,
      badge: '06 · PATTERNS',
      title: 'Patterns / Types',
      introText: '5 primary graph algorithmic patterns.',
      coreIdea: {
        part1: '5 Patterns',
        part2: 'Algorithm Match',
        result: 'Clean Traversal'
      },
      keyPoints: [
        {
          num: '01',
          title: 'CONNECTED COMPONENTS (DFS)',
          text: 'Flood fill islands or connected subgraphs.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '02',
          title: 'SHORTEST PATH (BFS)',
          text: 'Unweighted graph level order shortest path.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '03',
          title: 'CYCLE DETECTION',
          text: 'Back-edge detection in directed/undirected graphs.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '04',
          title: 'TOPOLOGICAL SORT',
          text: 'Order DAG vertices using Kahn\'s BFS in-degree.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['B', 'C'], visited: ['A'], activeNode: 'A', label: 'Graph Patterns: Grid BFS, Cycle Detection, Topological Sort, Dijkstra' }
        ]
      },
      memoryTakeaway: 'Islands DFS | Shortest BFS | Cycle Check | Topo Sort | Dijkstra'
    },
    {
      id: 'complexity',
      cardNumber: 7,
      badge: '07 · COMPLEXITY',
      title: 'Complexity Analysis',
      introText: 'Time and space complexity bounds across graph algorithms.',
      coreIdea: {
        part1: 'BFS/DFS: O(V+E)',
        part2: 'Dijkstra: O(E log V)',
        result: 'Space: O(V+E)'
      },
      keyPoints: [
        {
          num: '01',
          title: 'BFS / DFS TIME: O(V + E)',
          text: 'Visits every vertex V and checks every edge E.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'DIJKSTRA TIME: O(E log V)',
          text: 'Min-Heap edge relaxation over V vertices and E edges.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'GRAPH SPACE: O(V + E)',
          text: 'Adjacency list stores V node keys and E edge entries.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: '2D GRID GRAPH TIME',
          text: 'O(M * N) time and O(M * N) recursion/queue space.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['C'], visited: ['A', 'B'], activeNode: 'B', label: 'BFS/DFS Time: O(V + E); Space: O(V) for visited & queue' }
        ]
      },
      memoryTakeaway: 'Traversal O(V + E) | Dijkstra O(E log V) | Space O(V + E)'
    },
    {
      id: 'edge-cases',
      cardNumber: 8,
      badge: '08 · EDGE CASES',
      title: 'Important Edge Cases & Pitfalls',
      introText: 'Avoid infinite loops and incorrect graph assumptions.',
      coreIdea: {
        part1: 'Cycles',
        part2: 'Disconnected V',
        result: 'Visited Flag'
      },
      keyPoints: [
        {
          num: '01',
          title: 'MISSING VISITED CHECK',
          text: 'Forgetting visited array causes infinite loops on graph cycles.',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          dotBg: 'bg-rose-500'
        },
        {
          num: '02',
          title: 'DISCONNECTED GRAPH',
          text: 'Graph may have multiple disconnected components. Outer loop for (v = 0..V-1).',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        },
        {
          num: '03',
          title: 'NEGATIVE WEIGHT EDGES IN DIJKSTRA',
          text: 'Dijkstra fails on negative edge weights. Use Bellman-Ford instead.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'GRID BOUNDS OVERFLOW',
          text: 'Always check 0 <= r < M and 0 <= c < N before inspecting grid[r][c].',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          dotBg: 'bg-sky-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['D'], visited: ['A', 'B', 'C'], activeNode: 'C', label: 'Edge cases: Disconnected components, cyclic loops, self-edges' }
        ]
      },
      memoryTakeaway: 'Mark Visited Early -> Loop Disconnected Components -> Guard Grid Bounds'
    },
    {
      id: 'language-syntax',
      cardNumber: 9,
      badge: '09 · SYNTAX REFERENCE',
      title: 'Language Syntax',
      introText: 'Adjacency list representations across C++, Java, Python, and JavaScript.',
      isSyntaxCard: true,
      syntaxData: {
        'C++': `// Adjacency List Construction
int V = 5;
vector<vector<int>> adj(V);
for (auto& edge : edges) {
    adj[edge[0]].push_back(edge[1]);
    adj[edge[1]].push_back(edge[0]); // if undirected
}

// BFS Traversal
queue<int> q;
vector<bool> visited(V, false);
q.push(0); visited[0] = true;
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (!visited[v]) {
            visited[v] = true;
            q.push(v);
        }
    }
}`,
        'Java': `// Adjacency List Construction
List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
for (int[] edge : edges) {
    adj.get(edge[0]).add(edge[1]);
}

// DFS Recursion
void dfs(int u, boolean[] visited) {
    visited[u] = true;
    for (int v : adj.get(u)) {
        if (!visited[v]) dfs(v, visited);
    }
}`,
        'Python': `# Adjacency List from Edges
from collections import defaultdict, deque

adj = defaultdict(list)
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)

# BFS Queue
q = deque([start_node])
visited = {start_node}
while q:
    u = q.popleft()
    for v in adj[u]:
        if v not in visited:
            visited.add(v)
            q.append(v)`,
        'JavaScript': `// Adjacency List Construction
const adj = Array.from({ length: V }, () => []);
for (const [u, v] of edges) {
    adj[u].push(v);
}`
      }
    },
    {
      id: 'quick-memory',
      cardNumber: 10,
      badge: '10 · RECAP',
      title: 'Quick Memory / Takeaway',
      introText: 'Cheat sheet for graph interview problems.',
      coreIdea: {
        part1: 'O(V + E)',
        part2: 'Visited Set',
        result: 'Mastered'
      },
      keyPoints: [
        {
          num: '01',
          title: 'BFS SHORTEST PATH',
          text: 'Guarantees minimum edges path in unweighted graphs.',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dotBg: 'bg-emerald-500'
        },
        {
          num: '02',
          title: 'DFS ISLANDS',
          text: 'Flood fills connected components in O(M*N) time.',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dotBg: 'bg-indigo-500'
        },
        {
          num: '03',
          title: 'TOPOLOGICAL SORT',
          text: 'Kahn\'s BFS in-degree tracking for dependency DAGs.',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          dotBg: 'bg-purple-500'
        },
        {
          num: '04',
          title: 'DIJKSTRA',
          text: 'Min-Heap O(E log V) shortest path for weighted graphs.',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          dotBg: 'bg-amber-500'
        }
      ],
      pointerVisual: {
        steps: [
          { queue: ['B', 'C'], visited: ['A'], activeNode: 'A', label: 'Graph Takeaway: Build Adj List -> Mark Visited -> Run BFS (Queue) / DFS (Stack)' }
        ]
      },
      memoryTakeaway: 'Adjacency List + Visited Array + BFS (Queue) / DFS (Stack) / Dijkstra (Heap)'
    }
  ]
};
