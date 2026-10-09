/**
 * MASTER CANONICAL TOPIC REGISTRY FOR PATHPILOT (SERVER)
 * Authoritative topic registry for all 6 core placement subjects.
 */

const CANONICAL_SUBJECTS = ['DSA', 'Aptitude', 'OOPS', 'DBMS', 'OS', 'CN'];

const SUBJECT_ALIAS_MAP = {
  dsa: 'DSA',
  'data structures': 'DSA',
  'data structures & algorithms': 'DSA',
  'data structures and algorithms': 'DSA',

  aptitude: 'Aptitude',
  apt: 'Aptitude',
  'quantitative & logical aptitude': 'Aptitude',
  'quantitative aptitude': 'Aptitude',
  'logical reasoning': 'Aptitude',

  oops: 'OOPS',
  'object oriented programming': 'OOPS',
  'object-oriented programming': 'OOPS',

  dbms: 'DBMS',
  'database management systems': 'DBMS',
  'database management system': 'DBMS',
  database: 'DBMS',

  os: 'OS',
  'operating systems': 'OS',
  'operating system': 'OS',

  cn: 'CN',
  'computer networks': 'CN',
  'computer network': 'CN',
  networks: 'CN'
};

const VALID_STUDENT_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const LEVEL_ALIAS_MAP = {
  beginner: 'Beginner',
  basic: 'Beginner',
  novice: 'Beginner',

  intermediate: 'Intermediate',
  medium: 'Intermediate',

  advanced: 'Advanced',
  professional: 'Advanced',
  expert: 'Advanced',
  hard: 'Advanced'
};

const CANONICAL_TOPICS_BY_SUBJECT = {
  DSA: [
    { id: 'two-pointers', name: 'Two Pointers' },
    { id: 'arrays', name: 'Arrays & Strings' },
    { id: 'sorting', name: 'Sorting Algorithms' },
    { id: 'binary-search', name: 'Binary Search' },
    { id: 'linked-list', name: 'Linked List' },
    { id: 'trees', name: 'Trees & BST' },
    { id: 'graphs', name: 'Graphs & BFS/DFS' },
    { id: 'dp', name: 'Dynamic Programming' }
  ],

  Aptitude: [
    { id: 'number-system', name: 'Number System' },
    { id: 'hcf-lcm', name: 'HCF & LCM' },
    { id: 'percentages', name: 'Percentages' },
    { id: 'profit-and-loss', name: 'Profit & Loss' },
    { id: 'ratio-and-proportion', name: 'Ratio & Proportion' },
    { id: 'average', name: 'Average' },
    { id: 'simple-interest', name: 'Simple Interest' },
    { id: 'compound-interest', name: 'Compound Interest' },
    { id: 'time-and-work', name: 'Time & Work' },
    { id: 'pipes-and-cisterns', name: 'Pipes & Cisterns' },
    { id: 'time-speed-distance', name: 'Time, Speed & Distance' },
    { id: 'boats-and-streams', name: 'Boats & Streams' },
    { id: 'mixtures-and-allegations', name: 'Mixtures & Allegations' },
    { id: 'permutation-and-combination', name: 'Permutation & Combination' },
    { id: 'probability', name: 'Probability' },
    { id: 'algebra', name: 'Algebra' },
    { id: 'geometry', name: 'Geometry' },
    { id: 'mensuration', name: 'Mensuration' },
    { id: 'data-interpretation', name: 'Data Interpretation' },
    { id: 'number-series', name: 'Number Series' },
    { id: 'letter-series', name: 'Letter Series' },
    { id: 'coding-decoding', name: 'Coding-Decoding' },
    { id: 'blood-relations', name: 'Blood Relations' },
    { id: 'direction-sense', name: 'Direction Sense' },
    { id: 'syllogism', name: 'Syllogism' },
    { id: 'analogy', name: 'Analogy' },
    { id: 'classification', name: 'Classification' },
    { id: 'ranking', name: 'Ranking' },
    { id: 'seating-arrangement', name: 'Seating Arrangement' },
    { id: 'puzzles', name: 'Puzzles' },
    { id: 'statement-and-conclusion', name: 'Statement & Conclusion' },
    { id: 'statement-and-assumption', name: 'Statement & Assumption' },
    { id: 'data-sufficiency', name: 'Data Sufficiency' },
    { id: 'grammar', name: 'Grammar' },
    { id: 'error-detection', name: 'Error Detection' },
    { id: 'sentence-correction', name: 'Sentence Correction' },
    { id: 'fill-in-the-blanks', name: 'Fill in the Blanks' },
    { id: 'synonyms', name: 'Synonyms' },
    { id: 'antonyms', name: 'Antonyms' },
    { id: 'vocabulary', name: 'Vocabulary' },
    { id: 'sentence-rearrangement', name: 'Sentence Rearrangement' },
    { id: 'reading-comprehension', name: 'Reading Comprehension' },
    { id: 'para-jumbles', name: 'Para Jumbles' }
  ],

  OOPS: [
    { id: 'intro-to-oops', name: 'Introduction to OOPS' },
    { id: 'classes-and-objects', name: 'Class and Object' },
    { id: 'encapsulation', name: 'Encapsulation' },
    { id: 'abstraction', name: 'Abstraction' },
    { id: 'inheritance', name: 'Inheritance' },
    { id: 'polymorphism', name: 'Polymorphism' },
    { id: 'constructors', name: 'Constructors' },
    { id: 'method-overloading', name: 'Method Overloading' },
    { id: 'method-overriding', name: 'Method Overriding' },
    { id: 'interfaces', name: 'Interfaces' },
    { id: 'abstract-classes', name: 'Abstract Classes' },
    { id: 'access-modifiers', name: 'Access Modifiers' },
    { id: 'static-members', name: 'Static Members' },
    { id: 'this-self', name: 'this / self Keyword' },
    { id: 'super-keyword', name: 'super Keyword' },
    { id: 'association', name: 'Association' },
    { id: 'aggregation', name: 'Aggregation' },
    { id: 'composition', name: 'Composition' },
    { id: 'exception-handling', name: 'Exception Handling in OOPS' },
    { id: 'interview-revision', name: 'OOPS Interview Revision' }
  ],

  DBMS: [
    { id: 'dbms-architecture', name: 'DBMS Architecture' },
    { id: 'er-model', name: 'ER Model' },
    { id: 'relational-model-keys', name: 'Relational Model & Keys' },
    { id: 'sql-basics-ddl-dml', name: 'SQL Basics, DDL & DML' },
    { id: 'sql-joins', name: 'SQL Joins' },
    { id: 'sql-aggregation-groupby', name: 'SQL Aggregation & GROUP BY' },
    { id: 'sql-subqueries-nested', name: 'SQL Subqueries & Correlated Queries' },
    { id: 'normalization', name: 'Database Normalization' },
    { id: 'transactions-acid', name: 'Transactions & ACID Properties' },
    { id: 'concurrency-locking', name: 'Concurrency Control & Deadlocks' },
    { id: 'indexing-btrees', name: 'Indexing, B-Trees & B+ Trees' },
    { id: 'views-stored-procedures', name: 'Views, Triggers & Stored Procedures' }
  ],

  OS: [
    { id: 'intro-to-os', name: 'Introduction to Operating Systems' },
    { id: 'os-services-system-calls', name: 'OS Services and System Calls' },
    { id: 'os-structures-architectures', name: 'OS Structures and Architectures' },
    { id: 'interrupts-traps-dual-mode', name: 'Interrupts, Traps and Dual Mode' },
    { id: 'processes-process-states', name: 'Processes and Process States' },
    { id: 'pcb-context-switching', name: 'PCB and Context Switching' },
    { id: 'threads-multithreading', name: 'Threads and Multithreading' },
    { id: 'ipc', name: 'Inter-Process Communication (IPC)' },
    { id: 'cpu-scheduling-fundamentals', name: 'CPU Scheduling Fundamentals' },
    { id: 'fcfs-scheduling', name: 'FCFS Scheduling' },
    { id: 'sjf-srtf-scheduling', name: 'SJF and SRTF Scheduling' },
    { id: 'priority-scheduling-algo', name: 'Priority Scheduling' },
    { id: 'round-robin-scheduling', name: 'Round Robin Scheduling' },
    { id: 'mlq-mlfq-scheduling', name: 'Multilevel Queue and MLFQ' },
    { id: 'sync-critical-section', name: 'Process Synchronization and Critical Section' },
    { id: 'mutex-semaphores', name: 'Mutex and Semaphores' },
    { id: 'classical-sync-problems', name: 'Classical Synchronization Problems' },
    { id: 'deadlock-fundamentals', name: 'Deadlock Fundamentals' },
    { id: 'deadlock-prevention-avoidance', name: 'Deadlock Prevention and Avoidance' },
    { id: 'bankers-algorithm-safe-state', name: "Banker's Algorithm and Safe State" },
    { id: 'deadlock-detection-recovery', name: 'Deadlock Detection and Recovery' },
    { id: 'main-memory-allocation', name: 'Main Memory and Memory Allocation' },
    { id: 'fragmentation-allocation-strategies', name: 'Fragmentation and Allocation Strategies' },
    { id: 'paging-page-tables', name: 'Paging and Page Tables' },
    { id: 'segmentation', name: 'Segmentation' },
    { id: 'virtual-memory-demand-paging', name: 'Virtual Memory and Demand Paging' },
    { id: 'page-replacement-algorithms', name: 'Page Replacement Algorithms' },
    { id: 'tlb-effective-access-time', name: 'TLB and Effective Access Time' },
    { id: 'file-systems-allocation', name: 'File Systems and File Allocation' },
    { id: 'disk-structure-scheduling', name: 'Disk Structure and Disk Scheduling' }
  ],

  CN: [
    { id: 'intro-to-networks', name: 'Introduction to Computer Networks' },
    { id: 'network-types', name: 'Types of Networks (LAN, WAN, MAN, PAN, WLAN)' },
    { id: 'network-topologies', name: 'Network Topologies (Star, Mesh, Bus, Ring, Hybrid)' },
    { id: 'network-devices', name: 'Network Devices (Hub, Switch, Router, Gateway, Bridge)' },
    { id: 'osi-model', name: 'OSI 7-Layer Reference Model' },
    { id: 'tcp-ip-model', name: 'TCP/IP 4-Layer Architecture' },
    { id: 'osi-vs-tcp-ip', name: 'OSI vs TCP/IP Model Comparison' },
    { id: 'encapsulation-decapsulation', name: 'Encapsulation & Decapsulation (PDU Lifecycle)' },
    { id: 'mac-address', name: 'MAC Addressing (Physical 48-bit Hardware Address)' },
    { id: 'ethernet-frames', name: 'Ethernet & Frame Structure (802.3)' },
    { id: 'arp-protocol', name: 'ARP (Address Resolution Protocol) & Cache' },
    { id: 'switching-mac-table', name: 'Switching Mechanics & CAM/MAC Address Table' },
    { id: 'vlan', name: 'VLAN (Virtual Local Area Network) & 802.1Q Tagging' },
    { id: 'collision-broadcast-domains', name: 'Collision Domains vs Broadcast Domains' },
    { id: 'ip-addressing', name: 'IPv4 Addressing & Classful Architecture (A, B, C, D, E)' },
    { id: 'ipv4-vs-ipv6', name: 'IPv4 vs IPv6 Architecture & Migration' },
    { id: 'public-vs-private-ip', name: 'Public vs Private IP (RFC 1918 Ranges & CGNAT)' },
    { id: 'subnetting-cidr', name: 'Subnetting & CIDR (Classless Inter-Domain Routing)' },
    { id: 'routing-fundamentals', name: 'Routing Fundamentals (Static, Dynamic, Distance Vector, Link State)' },
    { id: 'routing-table-gateway', name: 'Routing Table Lookup & Default Gateway' },
    { id: 'nat-network-address-translation', name: 'NAT (Network Address Translation) & PAT / SNAT / DNAT' },
    { id: 'icmp-protocol', name: 'ICMP (Internet Control Message Protocol) & Diagnostics' },
    { id: 'tcp-protocol', name: 'TCP (Transmission Control Protocol) Architecture & Segment Header' },
    { id: 'tcp-3-way-handshake', name: 'TCP 3-Way Handshake (SYN, SYN-ACK, ACK)' },
    { id: 'tcp-connection-termination', name: 'TCP 4-Way Handshake Termination & TIME_WAIT State' },
    { id: 'tcp-reliability', name: 'TCP Reliability: Sequence Numbers, ACKs & Retransmission (RTO)' },
    { id: 'flow-control-sliding-window', name: 'TCP Flow Control & Sliding Window Protocol' },
    { id: 'congestion-control', name: 'TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Recovery)' },
    { id: 'udp-protocol', name: 'UDP (User Datagram Protocol) & 8-Byte Lightweight Header' },
    { id: 'tcp-vs-udp', name: 'TCP vs UDP Comparison & Protocol Decision Matrix' },
    { id: 'ports-and-sockets', name: 'Ports, Sockets & Multiplexing / Demultiplexing' },
    { id: 'dns-domain-name-system', name: 'DNS (Domain Name System) Hierarchy & Resolution Process' },
    { id: 'dhcp-protocol', name: 'DHCP (Dynamic Host Configuration Protocol) & DORA Process' },
    { id: 'http-protocol', name: 'HTTP (Hypertext Transfer Protocol) Evolution (1.0 vs 1.1 vs 2.0 vs 3.0)' },
    { id: 'https-protocol', name: 'HTTPS Architecture, Encryption & Certificate Authorities' },
    { id: 'http-methods', name: 'HTTP Request Methods, Idempotency & Safety' },
    { id: 'http-status-codes', name: 'HTTP Status Codes (1xx, 2xx, 3xx, 4xx, 5xx)' },
    { id: 'tls-ssl-handshake', name: 'TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange' },
    { id: 'cookies-and-sessions', name: 'Cookies, Sessions, JWT & State Management over HTTP' },
    { id: 'web-caching', name: 'Web Caching, Cache-Control Headers & ETag Validation' },
    { id: 'url-lifecycle', name: 'Complete URL Lifecycle' },
    { id: 'ping-and-traceroute', name: 'Ping & Traceroute Mechanics (TTL Exceeded & RTT Latency)' },
    { id: 'firewall', name: 'Firewalls: Packet Filtering, Stateful Inspection & WAF' },
    { id: 'proxy-servers', name: 'Forward Proxy Servers & Anonymity Mechanics' },
    { id: 'reverse-proxy', name: 'Reverse Proxy (NGINX) Architecture & SSL Offloading' },
    { id: 'load-balancer', name: 'Load Balancers (Layer 4 vs Layer 7 & Algorithms)' },
    { id: 'cdn-content-delivery-network', name: 'CDN (Content Delivery Network) & Edge Caching' },
    { id: 'network-troubleshooting', name: 'Network Troubleshooting Methodology' }
  ]
};

const TOPIC_TO_SUBJECT_MAP = {};
for (const [subjectKey, topics] of Object.entries(CANONICAL_TOPICS_BY_SUBJECT)) {
  for (const t of topics) {
    TOPIC_TO_SUBJECT_MAP[t.id] = subjectKey;
  }
}

function resolveSubject(rawSubject) {
  if (!rawSubject || typeof rawSubject !== 'string') return null;
  const clean = rawSubject.trim().toLowerCase();
  if (SUBJECT_ALIAS_MAP[clean]) {
    return SUBJECT_ALIAS_MAP[clean];
  }
  const canonical = CANONICAL_SUBJECTS.find(s => s.toLowerCase() === clean);
  return canonical || null;
}

function resolveStudentLevel(rawLevel) {
  if (!rawLevel || typeof rawLevel !== 'string') return null;
  const clean = rawLevel.trim().toLowerCase();
  if (LEVEL_ALIAS_MAP[clean]) {
    return LEVEL_ALIAS_MAP[clean];
  }
  const canonical = VALID_STUDENT_LEVELS.find(lvl => lvl.toLowerCase() === clean);
  return canonical || null;
}

function getCanonicalTopics(subject) {
  const canonicalSubject = resolveSubject(subject);
  if (!canonicalSubject) {
    throw new Error(`Subject "${subject}" is not a recognized canonical subject. Supported subjects: ${CANONICAL_SUBJECTS.join(', ')}`);
  }
  const list = CANONICAL_TOPICS_BY_SUBJECT[canonicalSubject];
  if (!list || !Array.isArray(list) || list.length === 0) {
    throw new Error(`Canonical subject "${canonicalSubject}" has no registered topics in PathPilot.`);
  }
  return list.map(t => ({ id: t.id, name: t.name }));
}

function isTopicInSubject(subject, topicId) {
  const canonicalSubject = resolveSubject(subject);
  if (!canonicalSubject || !topicId) return false;
  return TOPIC_TO_SUBJECT_MAP[topicId] === canonicalSubject;
}

function findSubjectForTopic(topicId) {
  if (!topicId || typeof topicId !== 'string') return null;
  return TOPIC_TO_SUBJECT_MAP[topicId.trim()] || null;
}

module.exports = {
  CANONICAL_SUBJECTS,
  SUBJECT_ALIAS_MAP,
  VALID_STUDENT_LEVELS,
  LEVEL_ALIAS_MAP,
  CANONICAL_TOPICS_BY_SUBJECT,
  resolveSubject,
  resolveStudentLevel,
  getCanonicalTopics,
  isTopicInSubject,
  findSubjectForTopic
};
