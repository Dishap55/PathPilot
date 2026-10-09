/**
 * MASTER DBMS TOPIC REGISTRY
 * Single source of truth for PathPilot's DBMS Learning Studio.
 * 
 * 12 Canonical DBMS Topics covering University Curriculum & Tech Placement Mastery:
 * 1. dbms-architecture: DBMS Architecture & File System vs DBMS
 * 2. er-model: ER Model & Schema Design
 * 3. relational-model-keys: Relational Model, Keys & Integrity Constraints
 * 4. sql-basics-ddl-dml: SQL DDL, DML & Basic Queries
 * 5. sql-joins: SQL Joins & Set Operations
 * 6. sql-aggregation-groupby: SQL Aggregation, GROUP BY & HAVING
 * 7. sql-subqueries-nested: SQL Subqueries & Correlated Queries
 * 8. normalization: Database Normalization (1NF to BCNF)
 * 9. transactions-acid: Transactions & ACID Properties
 * 10. concurrency-locking: Concurrency Control, Deadlocks & 2PL
 * 11. indexing-btrees: Indexing, B-Trees & B+ Trees
 * 12. views-stored-procedures: Views, Triggers & Stored Procedures
 */

export const DBMS_TOPIC_REGISTRY = {
  'dbms-architecture': {
    topicId: 'dbms-architecture',
    slug: 'dbms-architecture',
    topicName: 'DBMS Architecture & File System vs DBMS',
    shortName: 'Architecture & 3-Tier Schema',
    level: 'Fundamental',
    category: 'Architecture & Data Modeling',
    questionCount: '20 Problems',
    description: 'Limitations of OS file systems, 3-tier ANSI-SPARC architecture, and physical vs logical data independence.',
    iconName: 'Server',
    tags: ['Architecture', '3-Tier', 'Data Independence', 'File System']
  },
  'er-model': {
    topicId: 'er-model',
    slug: 'er-model',
    topicName: 'ER Model & Schema Design',
    shortName: 'ER Modeling & Relational Mapping',
    level: 'Core Pillar',
    category: 'Architecture & Data Modeling',
    questionCount: '25 Problems',
    description: 'Entities, attributes (simple, composite, multivalued), relationships, cardinality (1:1, 1:N, M:N), and conversion to relational tables.',
    iconName: 'Network',
    tags: ['ER Diagram', 'Cardinality', 'Weak Entities', 'Schema Design']
  },
  'relational-model-keys': {
    topicId: 'relational-model-keys',
    slug: 'relational-model-keys',
    topicName: 'Relational Model, Keys & Constraints',
    shortName: 'Keys & Referential Integrity',
    level: 'Fundamental',
    category: 'Architecture & Data Modeling',
    questionCount: '30 Problems',
    description: 'Super keys, candidate keys, primary keys, alternate keys, foreign keys, and entity/referential integrity constraints.',
    iconName: 'Key',
    tags: ['Primary Key', 'Foreign Key', 'Candidate Key', 'Referential Integrity']
  },
  'sql-basics-ddl-dml': {
    topicId: 'sql-basics-ddl-dml',
    slug: 'sql-basics-ddl-dml',
    topicName: 'SQL DDL, DML & Basic Queries',
    shortName: 'DDL, DML & Query Basics',
    level: 'Fundamental',
    category: 'SQL Query Mastery',
    questionCount: '35 Problems',
    description: 'CREATE, ALTER, DROP, TRUNCATE, INSERT, UPDATE, DELETE, and SELECT filtering with WHERE, ORDER BY, and operators.',
    iconName: 'Database',
    tags: ['DDL', 'DML', 'SELECT', 'WHERE', 'ORDER BY']
  },
  'sql-joins': {
    topicId: 'sql-joins',
    slug: 'sql-joins',
    topicName: 'SQL Joins & Multi-Table Queries',
    shortName: 'SQL Joins & Set Operations',
    level: 'Core Placement',
    category: 'SQL Query Mastery',
    questionCount: '40 Problems',
    description: 'INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN, CROSS JOIN, and SELF JOIN scenarios.',
    iconName: 'GitMerge',
    tags: ['INNER JOIN', 'LEFT JOIN', 'SELF JOIN', 'Cartesian Product']
  },
  'sql-aggregation-groupby': {
    topicId: 'sql-aggregation-groupby',
    slug: 'sql-aggregation-groupby',
    topicName: 'SQL Aggregation, GROUP BY & HAVING',
    shortName: 'Aggregation, GROUP BY & HAVING',
    level: 'Core Placement',
    category: 'SQL Query Mastery',
    questionCount: '35 Problems',
    description: 'COUNT, SUM, AVG, MIN, MAX aggregate functions, grouping mechanics with GROUP BY, and group-filtering with HAVING.',
    iconName: 'BarChart2',
    tags: ['GROUP BY', 'HAVING', 'COUNT', 'SUM', 'Aggregation']
  },
  'sql-subqueries-nested': {
    topicId: 'sql-subqueries-nested',
    slug: 'sql-subqueries-nested',
    topicName: 'SQL Subqueries & Correlated Queries',
    shortName: 'Subqueries & Correlated Queries',
    level: 'Advanced Placement',
    category: 'SQL Query Mastery',
    questionCount: '30 Problems',
    description: 'Scalar subqueries, multi-row subqueries with IN / ANY / ALL, and correlated subqueries with EXISTS / NOT EXISTS.',
    iconName: 'Layers',
    tags: ['Subquery', 'EXISTS', 'Correlated Query', 'Second Highest Salary']
  },
  'normalization': {
    topicId: 'normalization',
    slug: 'normalization',
    topicName: 'Database Normalization (1NF to BCNF)',
    shortName: 'Normalization & Functional Dependencies',
    level: 'Core Pillar',
    category: 'Database Design & Normalization',
    questionCount: '35 Problems',
    description: 'Eliminating insertion, deletion, and update anomalies through functional dependencies, 1NF, 2NF, 3NF, and BCNF.',
    iconName: 'Minimize2',
    tags: ['1NF', '2NF', '3NF', 'BCNF', 'Anomalies', 'Lossless Decomposition']
  },
  'transactions-acid': {
    topicId: 'transactions-acid',
    slug: 'transactions-acid',
    topicName: 'Transactions & ACID Properties',
    shortName: 'Transactions & ACID Semantics',
    level: 'Core Pillar',
    category: 'Transactions & Concurrency',
    questionCount: '30 Problems',
    description: 'Atomicity, Consistency, Isolation, Durability, transaction states, and write-ahead logging (WAL).',
    iconName: 'ShieldCheck',
    tags: ['ACID', 'Atomicity', 'Isolation', 'Commit', 'Rollback']
  },
  'concurrency-locking': {
    topicId: 'concurrency-locking',
    slug: 'concurrency-locking',
    topicName: 'Concurrency Control & Deadlocks',
    shortName: 'Concurrency, Schedules & 2PL',
    level: 'Advanced',
    category: 'Transactions & Concurrency',
    questionCount: '25 Problems',
    description: 'Dirty reads, lost updates, serializability, two-phase locking (2PL), deadlock prevention and detection graphs.',
    iconName: 'Lock',
    tags: ['Serializability', '2PL', 'Deadlock', 'Isolation Levels', 'Phantom Read']
  },
  'indexing-btrees': {
    topicId: 'indexing-btrees',
    slug: 'indexing-btrees',
    topicName: 'Indexing, B-Trees & B+ Trees',
    shortName: 'Indexing & Query Optimization',
    level: 'Optimization',
    category: 'Storage & Advanced DBMS',
    questionCount: '25 Problems',
    description: 'Primary vs secondary indexes, clustered vs non-clustered, B-Tree and B+ Tree node structures, and query execution plans.',
    iconName: 'Search',
    tags: ['B-Tree', 'B+ Tree', 'Clustered Index', 'Non-Clustered', 'Query Optimizer']
  },
  'views-stored-procedures': {
    topicId: 'views-stored-procedures',
    slug: 'views-stored-procedures',
    topicName: 'Views, Triggers & Stored Procedures',
    shortName: 'Views, Triggers & Procedures',
    level: 'Advanced',
    category: 'Storage & Advanced DBMS',
    questionCount: '20 Problems',
    description: 'Virtual views, updatable views, before/after triggers, stored procedures, functions, and database access control.',
    iconName: 'Cpu',
    tags: ['Views', 'Triggers', 'Stored Procedures', 'Security', 'Automation']
  }
};

export const DBMS_TOPICS_LIST = Object.values(DBMS_TOPIC_REGISTRY);

export const DBMS_TOPIC_GROUPS = [
  {
    groupId: 'architecture-modeling',
    title: 'Architecture & Data Modeling',
    description: 'Core relational foundations, 3-tier schema, and ER modeling',
    topicIds: ['dbms-architecture', 'er-model', 'relational-model-keys']
  },
  {
    groupId: 'sql-mastery',
    title: 'SQL Query Mastery',
    description: 'From fundamental queries to advanced joins, grouping, and subqueries',
    topicIds: ['sql-basics-ddl-dml', 'sql-joins', 'sql-aggregation-groupby', 'sql-subqueries-nested']
  },
  {
    groupId: 'design-normalization',
    title: 'Database Design & Normalization',
    description: 'Functional dependencies, 1NF through BCNF, and anomaly elimination',
    topicIds: ['normalization']
  },
  {
    groupId: 'transactions-concurrency',
    title: 'Transactions & Concurrency',
    description: 'ACID semantics, conflict serializability, 2PL, and deadlock handling',
    topicIds: ['transactions-acid', 'concurrency-locking']
  },
  {
    groupId: 'storage-optimization',
    title: 'Storage & Advanced DBMS',
    description: 'B+ Tree indexing, physical data layout, views, and automated triggers',
    topicIds: ['indexing-btrees', 'views-stored-procedures']
  }
];

// Slug/Alias Resolver supporting legacy and alternative names
const SLUG_ALIASES = {
  // Legacy aliases from SubjectLearningPage
  'primary-key': 'relational-model-keys',
  'keys': 'relational-model-keys',
  'primary-keys': 'relational-model-keys',
  'sql-queries': 'sql-joins',
  'queries': 'sql-basics-ddl-dml',
  'er-model': 'er-model',
  'er-diagram': 'er-model',
  'er-modeling': 'er-model',
  'normalization': 'normalization',
  'normal-forms': 'normalization',
  'transactions': 'transactions-acid',
  'acid': 'transactions-acid',
  'transaction': 'transactions-acid',
  'indexing': 'indexing-btrees',
  'b-trees': 'indexing-btrees',
  'btree': 'indexing-btrees',
  'indexes': 'indexing-btrees',
  // Canonical aliases
  'architecture': 'dbms-architecture',
  'dbms-architecture': 'dbms-architecture',
  'joins': 'sql-joins',
  'sql-joins': 'sql-joins',
  'groupby': 'sql-aggregation-groupby',
  'aggregation': 'sql-aggregation-groupby',
  'subqueries': 'sql-subqueries-nested',
  'nested-queries': 'sql-subqueries-nested',
  'concurrency': 'concurrency-locking',
  'locking': 'concurrency-locking',
  'deadlocks': 'concurrency-locking',
  'views': 'views-stored-procedures',
  'triggers': 'views-stored-procedures'
};

export function resolveDBMSTopicId(rawInput) {
  if (!rawInput) return 'dbms-architecture';
  const clean = String(rawInput).trim().toLowerCase().replace(/_/g, '-');
  if (DBMS_TOPIC_REGISTRY[clean]) return clean;
  if (SLUG_ALIASES[clean]) return SLUG_ALIASES[clean];
  
  // Substring match fallback
  const match = DBMS_TOPICS_LIST.find(t => 
    t.topicId.includes(clean) || clean.includes(t.topicId) || t.slug.includes(clean)
  );
  return match ? match.topicId : 'dbms-architecture';
}

export function getDBMSTopic(topicId) {
  const resolved = resolveDBMSTopicId(topicId);
  return DBMS_TOPIC_REGISTRY[resolved] || DBMS_TOPIC_REGISTRY['dbms-architecture'];
}
