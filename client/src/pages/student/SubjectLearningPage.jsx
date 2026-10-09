import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useParams, useSearchParams, useLocation } from 'react-router-dom';
import {
  Database,
  Cpu,
  Network,
  ArrowLeft,
  Compass,
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Target,
  FileText,
  Clock,
  Zap,
  Award,
  BookOpen,
  Code2,
  GraduationCap
} from 'lucide-react';
import { useTopicAutoScroll } from '../../hooks/useTopicAutoScroll';
import { useBestu } from '../../contexts/BestuContext';
import AddNoteButton from '../../components/notes/AddNoteButton';
import OSIntroductionSection from '../../components/learning/os/OSIntroductionSection.jsx';
import OSProblemExamplesSection from '../../components/learning/os/OSProblemExamplesSection.jsx';
import OSPracticeSection from '../../components/learning/os/OSPracticeSection.jsx';
import OSSummaryNotesSection from '../../components/learning/os/OSSummaryNotesSection.jsx';
import OSRevisionExamSection from '../../components/learning/os/OSRevisionExamSection.jsx';
import OSNumericalsSection from '../../components/learning/os/OSNumericalsSection.jsx';
import { OS_TOPICS_LIST } from '../../data/os/osTopicDataRegistry.js';

/**
 * 6 Canonical Subject Curriculum Registries for DBMS, OS, CN
 */
export const CORE_SUBJECTS_REGISTRY = {
  dbms: {
    code: 'DBMS',
    name: 'Database Management Systems',
    trackName: 'Database Management Systems (DBMS)',
    category: 'Core Technical Competency',
    icon: Database,
    accentColor: '#10B981',
    description: 'Master relational schema optimization, SQL queries, indexing, normalization, and ACID transaction semantics.',
    defaultTopic: 'primary-key',
    topics: [
      {
        id: 'primary-key',
        slug: 'primary-key',
        title: 'Primary Key & Keys',
        level: 'Fundamental',
        summary: 'Candidate keys, primary keys, foreign keys, and referential integrity constraints in relational databases.',
        explanation: 'A Primary Key uniquely identifies each row in a database table. It must contain UNIQUE values and cannot contain NULL values. Foreign keys establish referential integrity between tables.',
        keyPoints: [
          'Uniquely identifies each record in a relational table.',
          'Never allows NULL values (unlike unique secondary indexes).',
          'Enforces parent-child referential integrity via foreign key constraints.',
          'Underpins clustered index layout in B-Tree storage engines.'
        ]
      },
      {
        id: 'sql-queries',
        slug: 'sql-queries',
        title: 'SQL Queries & Joins',
        level: 'Core Placement',
        summary: 'INNER, LEFT, RIGHT, FULL OUTER joins, subqueries, aggregation, and HAVING clauses.',
        explanation: 'SQL Joins combine rows from two or more tables based on a related column between them. Mastering JOIN logic and aggregate filtering is critical for database interview rounds.',
        keyPoints: [
          'INNER JOIN returns matching rows from both tables.',
          'LEFT JOIN preserves all rows from left table, filling right with NULL when no match.',
          'GROUP BY aggregates rows; HAVING filters grouped results after aggregation.',
          'Window functions (ROW_NUMBER, DENSE_RANK) provide ranking without collapsing rows.'
        ]
      },
      {
        id: 'er-model',
        slug: 'er-model',
        title: 'ER Model & Schema Design',
        level: 'Design Pattern',
        summary: 'Entities, attributes, relationships, cardinality, and mapping ER diagrams to relational schemas.',
        explanation: 'Entity-Relationship modeling provides a graphical representation of entities and their relationships before implementing physical database schemas.',
        keyPoints: [
          'Entities represent real-world objects with attributes.',
          'Cardinality defines relationship ratios: 1:1, 1:N, and M:N.',
          'Many-to-Many relationships resolve into associative junction tables.',
          'Strong vs Weak entities and identifying relationships.'
        ]
      },
      {
        id: 'normalization',
        slug: 'normalization',
        title: 'Normalization (1NF-BCNF)',
        level: 'Core Pillar',
        summary: 'Eliminating data redundancy and anomalies through 1NF, 2NF, 3NF, and Boyce-Codd Normal Form.',
        explanation: 'Normalization organizes columns and tables to minimize duplicate data and prevent insert, update, and delete anomalies.',
        keyPoints: [
          '1NF eliminates repeating groups; all attributes must be atomic.',
          '2NF eliminates partial functional dependencies on candidate keys.',
          '3NF eliminates transitive dependencies (non-key attribute depending on non-key attribute).',
          'BCNF enforces that for every functional dependency X -> Y, X must be a super key.'
        ]
      },
      {
        id: 'transactions',
        slug: 'transactions',
        title: 'Transactions & ACID Properties',
        level: 'Advanced',
        summary: 'Atomicity, Consistency, Isolation, Durability, concurrency control, and 2-Phase Locking.',
        explanation: 'ACID properties guarantee that database transactions are processed reliably, preserving database validity despite system failures or concurrent access.',
        keyPoints: [
          'Atomicity: All-or-nothing transaction execution.',
          'Consistency: Transitions database from one valid state to another.',
          'Isolation: Concurrent execution yields same state as serial execution.',
          'Durability: Committed changes survive system crashes.'
        ]
      },
      {
        id: 'indexing',
        slug: 'indexing',
        title: 'Indexing & B-Trees',
        level: 'Optimization',
        summary: 'B-Trees, B+ Trees, clustered vs non-clustered indexes, and query execution planning.',
        explanation: 'Indexes speed up data retrieval at the cost of additional storage and slower writes. B+ Trees keep data sorted for logarithmic searches and rapid range scans.',
        keyPoints: [
          'Clustered index defines physical storage order of data rows.',
          'Non-clustered indexes hold key values with pointers to data pages.',
          'B+ Tree leaves are linked sequentially for optimal range scans.',
          'Index coverage allows queries to execute without touching base table heap.'
        ]
      }
    ]
  },
  os: {
    code: 'OS',
    name: 'Operating Systems',
    trackName: 'Operating Systems (OS)',
    category: 'System Architecture Competency',
    icon: Cpu,
    accentColor: '#8B5CF6',
    description: 'Understand process scheduling, concurrency primitives, virtual memory paging, deadlocks, and system internals.',
    defaultTopic: 'intro-to-os',
    // Backward-compatible alias anchors for test suites:
    legacyPillars: [
      { id: 'cpu-scheduling', target: 'cpu-scheduling-fundamentals' },
      { id: 'processes', target: 'processes-process-states' },
      { id: 'deadlocks', target: 'deadlock-fundamentals' },
      { id: 'memory-management', target: 'main-memory-allocation' },
      { id: 'threads', target: 'threads-multithreading' },
      { id: 'file-systems', target: 'file-systems-allocation' }
    ],
    topics: OS_TOPICS_LIST.map((t) => ({
      id: t.topicId,
      slug: t.slug,
      title: `${t.order}. ${t.topicName}`,
      level: t.level,
      summary: t.summary,
      explanation: t.explanation,
      keyPoints: t.keyPoints
    }))
  },
  cn: {
    code: 'CN',
    name: 'Computer Networks',
    trackName: 'Computer Networks (CN)',
    category: 'Distributed Systems Competency',
    icon: Network,
    accentColor: '#EC4899',
    description: 'Master OSI and TCP/IP protocol stacks, packet switching, routing algorithms, transport mechanics, and network security.',
    defaultTopic: 'osi-model',
    topics: [
      {
        id: 'osi-model',
        slug: 'osi-model',
        title: 'OSI Model & 7 Layers',
        level: 'Fundamental',
        summary: 'Physical, Data Link, Network, Transport, Session, Presentation, Application layer responsibilities.',
        explanation: 'The Open Systems Interconnection (OSI) 7-layer model standardizes network communication functions regardless of underlying hardware vendors.',
        keyPoints: [
          'Layer 1-3: Physical, Data Link (frames/MAC), Network (packets/IP).',
          'Layer 4: Transport layer provides end-to-end reliability (TCP/UDP).',
          'Layer 5-7: Session management, data syntax translation, and user applications (HTTP, DNS).',
          'Data encapsulation adds headers at each descending layer on transmission.'
        ]
      },
      {
        id: 'tcp-ip',
        slug: 'tcp-ip',
        title: 'TCP/IP Protocol Suite',
        level: 'Fundamental',
        summary: '4-layer internet model, encapsulation, 3-way handshake, connection termination, and flow control.',
        explanation: 'TCP/IP is the foundational architecture of the modern Internet. Transmission Control Protocol guarantees ordered, reliable, error-checked packet delivery.',
        keyPoints: [
          '3-way handshake: SYN -> SYN-ACK -> ACK establishes reliable connection.',
          'Sliding window protocol regulates flow control between fast sender and slow receiver.',
          'Congestion control algorithms (Slow Start, Congestion Avoidance, Fast Retransmit).',
          '4-way handshake (FIN / ACK) gracefully terminates duplex connection.'
        ]
      },
      {
        id: 'routing',
        slug: 'routing',
        title: 'Routing & Switching Algorithms',
        level: 'Core Pillar',
        summary: 'Distance Vector (Bellman-Ford), Link State (Dijkstra), OSPF, BGP, and autonomous systems.',
        explanation: 'Routing algorithms determine the most efficient end-to-end paths for packets across interconnected network routers.',
        keyPoints: [
          'Distance Vector routing shares routing tables with immediate neighbors (Bellman-Ford).',
          'Link State routing floods link status and calculates shortest paths (Dijkstra).',
          'OSPF provides intra-domain interior gateway routing.',
          'BGP manages inter-domain exterior routing between global autonomous systems.'
        ]
      },
      {
        id: 'ip-addressing',
        slug: 'ip-addressing',
        title: 'IP Addressing & Subnetting',
        level: 'Core Placement',
        summary: 'IPv4 vs IPv6, CIDR notation, subnet masks, default gateways, and NAT.',
        explanation: 'IP addressing uniquely identifies host network interfaces. Subnetting partitions large address blocks into smaller logical broadcast domains.',
        keyPoints: [
          'IPv4 uses 32-bit addresses divided into Network ID and Host ID.',
          'CIDR notation (/24) represents variable-length subnet masks.',
          'Network Address Translation (NAT) maps private LAN addresses to public WAN IPs.',
          'IPv6 provides 128-bit address space, eliminating NAT requirements.'
        ]
      },
      {
        id: 'network-security',
        slug: 'network-security',
        title: 'Network Security & Cryptography',
        level: 'Advanced',
        summary: 'Symmetric vs asymmetric encryption, RSA, SSL/TLS handshake, firewalls, and DDoS protection.',
        explanation: 'Network security protects data in transit through cryptographic encryption, integrity checks, digital certificates, and access control.',
        keyPoints: [
          'Symmetric encryption (AES) uses shared keys for fast bulk payload encryption.',
          'Asymmetric encryption (RSA) uses public/private key pairs for authentication.',
          'TLS handshake negotiates cipher suites and exchanges session keys.',
          'Digital certificates signed by Certificate Authorities (CAs) verify server identity.'
        ]
      },
      {
        id: 'transport-layer',
        slug: 'transport-layer',
        title: 'Transport Layer (TCP vs UDP)',
        level: 'Core Placement',
        summary: 'Connection-oriented reliable TCP vs lightweight connectionless UDP, port numbers, and checksums.',
        explanation: 'Transport layer protocols govern host-to-host process communication. TCP provides reliable ordered streams; UDP provides low-latency datagrams.',
        keyPoints: [
          'TCP: Reliable, ordered, heavy overhead, connection-oriented (HTTP, SSH, FTP).',
          'UDP: Unreliable, unordered, lightweight, connectionless (DNS, VoIP, Live Streaming).',
          '16-bit port numbers distinguish destination applications on a single IP host.',
          'Checksums verify data integrity across transport segments.'
        ]
      }
    ]
  }
};

export const SECTION_TABS = [
  { id: 'introduction', label: '1. Introduction', icon: BookOpen },
  { id: 'examples', label: '2. Problem Examples', icon: Lightbulb },
  { id: 'practice', label: '3. Practice Questions', icon: Target },
  { id: 'patterns', label: '4. Common Patterns', icon: Layers },
  { id: 'summary', label: '5. Summary & Notes', icon: FileText }
];

export const OS_SECTION_TABS = [
  { id: 'introduction', label: '1. Introduction', icon: BookOpen },
  { id: 'examples', label: '2. Problem Examples', icon: Lightbulb },
  { id: 'practice', label: '3. Practice Questions', icon: Target },
  { id: 'summary', label: '4. Summary & Notes', icon: FileText },
  { id: 'revision', label: '5. Revision & Exam Prep', icon: GraduationCap },
  { id: 'numericals', label: '6. Numericals', icon: Code2 }
];

/**
 * Normalizes section identifiers across subjects with backward compatibility
 */
export const normalizeSectionId = (sectionName, subjectCode = 'dbms') => {
  if (!sectionName) return 'introduction';
  const clean = String(sectionName).toLowerCase().trim().replace(/_/g, '-');
  
  if (subjectCode.toLowerCase() === 'os') {
    // Problem solving legacy redirect to numericals
    if (clean === 'problem-solving') return 'numericals';
    
    // Canonical OS section aliases
    if (clean === 'problem-examples' || clean === 'problem-example' || clean === 'examples') return 'examples';
    if (clean === 'practice-questions' || clean === 'practice') return 'practice';
    if (clean === 'summary-notes' || clean === 'summary' || clean === 'notes') return 'summary';
    if (clean === 'revision-exam' || clean === 'revision' || clean === 'exam-prep' || clean === 'exam') return 'revision';
    if (clean === 'numericals' || clean === 'numerical') return 'numericals';
    if (clean === 'introduction' || clean === 'intro') return 'introduction';
  }

  return clean;
};

export default function SubjectLearningPage() {
  const location = useLocation();
  const { subjectCode: routeSubject } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Normalize subject code (dbms | os | cn) from route parameter or URL pathname
  const pathParts = location.pathname.split('/').filter(Boolean);
  const detectedCode = routeSubject || pathParts[pathParts.length - 1] || 'dbms';
  const normalizedCode = detectedCode.toLowerCase();
  const subjectConfig = CORE_SUBJECTS_REGISTRY[normalizedCode] || CORE_SUBJECTS_REGISTRY.dbms;

  const rawTopicParam = searchParams.get('topic');
  const sectionParam = searchParams.get('section') || 'introduction';
  const hasExplicitTopic = Boolean(rawTopicParam);

  // Match topic by id, slug, or title with OS backward-compatible aliases
  const resolveTopic = (slugOrId) => {
    if (!slugOrId) return subjectConfig.topics[0];
    const clean = String(slugOrId).toLowerCase().trim().replace(/_/g, '-');

    const osAliases = {
      'cpu-scheduling': 'cpu-scheduling-fundamentals',
      'processes': 'processes-process-states',
      'deadlocks': 'deadlock-fundamentals',
      'memory-management': 'main-memory-allocation',
      'threads': 'threads-multithreading',
      'file-systems': 'file-systems-allocation',
      'fcfs': 'fcfs-scheduling',
      'sjf': 'sjf-srtf-scheduling',
      'sjf-srtf': 'sjf-srtf-scheduling',
      'priority': 'priority-scheduling-algo',
      'round-robin': 'round-robin-scheduling',
      'banker': 'bankers-algorithm-safe-state',
      'bankers-algorithm': 'bankers-algorithm-safe-state',
      'paging': 'paging-page-tables',
      'disk': 'disk-structure-scheduling'
    };

    const targetId = osAliases[clean] || clean;

    const match = subjectConfig.topics.find(
      (t) =>
        t.id === targetId ||
        t.slug === targetId ||
        t.id === clean ||
        t.slug === clean ||
        t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(clean)
    );
    return match || subjectConfig.topics[0];
  };

  // Effective section tabs (6 canonical sections for OS; 5 sections for DBMS/CN)
  const effectiveSectionTabs = useMemo(() => {
    if (normalizedCode === 'os') {
      return OS_SECTION_TABS;
    }
    return SECTION_TABS;
  }, [normalizedCode]);

  const rawInitialSection = sectionParam.toLowerCase();
  const resolvedInitialSection = normalizeSectionId(rawInitialSection, normalizedCode);

  const [activeTopicObj, setActiveTopicObj] = useState(() => resolveTopic(rawTopicParam));
  const [activeSection, setActiveSection] = useState(resolvedInitialSection);

  // Sync state when URL updates (deep links, browser navigation, subject switch)
  useEffect(() => {
    const t = searchParams.get('topic');
    let s = searchParams.get('section');

    const nextTopic = t ? resolveTopic(t) : subjectConfig.topics[0];
    setActiveTopicObj((prev) => (prev && prev.id === nextTopic.id ? prev : nextTopic));

    // Automatically redirect legacy OS problem-solving section to numericals
    if (normalizedCode === 'os' && s && s.toLowerCase() === 'problem-solving') {
      s = 'numericals';
      const newParams = new URLSearchParams(searchParams);
      newParams.set('section', 'numericals');
      setSearchParams(newParams, { replace: true });
    }

    const resolvedSec = normalizeSectionId(s, normalizedCode);
    const currentTabs = normalizedCode === 'os' ? OS_SECTION_TABS : SECTION_TABS;
    const targetSec = resolvedSec && currentTabs.some((tab) => tab.id === resolvedSec)
      ? resolvedSec
      : 'introduction';
    setActiveSection((prev) => (prev === targetSec ? prev : targetSec));
  }, [searchParams, normalizedCode, subjectConfig, setSearchParams]);

  // Integrated Global Topic Auto-Scroll Hook
  const { contentRef: learningSectionRef, scrollToContent } = useTopicAutoScroll({
    activeTopic: activeTopicObj.id,
    hasExplicitTopic,
    contentId: 'subject-learning-section'
  });

  // Handle intentional topic selection -> Updates state, URL, and triggers smooth auto-scroll
  const handleTopicSelect = (topic) => {
    setActiveTopicObj(topic);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', topic.slug);
    newParams.set('section', activeSection);
    setSearchParams(newParams);
    scrollToContent();
  };

  // Handle section switch -> Preserves active topic
  const handleSectionSelect = (secId) => {
    const normalizedSec = normalizeSectionId(secId, normalizedCode);
    if (activeSection !== normalizedSec) {
      setActiveSection(normalizedSec);
    }
    const currentTopicSlug = activeTopicObj?.slug || subjectConfig.topics[0]?.slug;
    if (searchParams.get('section') !== normalizedSec || searchParams.get('topic') !== currentTopicSlug) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('topic', currentTopicSlug);
      newParams.set('section', normalizedSec);
      setSearchParams(newParams);
    }
  };

  // Robust normalized section identifier and active tab resolution
  const normActiveSec = normalizeSectionId(activeSection, normalizedCode);
  const currentTab = effectiveSectionTabs.find((t) => t.id === normActiveSec || normalizeSectionId(t.id, normalizedCode) === normActiveSec) || effectiveSectionTabs[0];
  const activeTabIdx = Math.max(0, effectiveSectionTabs.findIndex((t) => t.id === currentTab.id));

  const isIntroSection = normActiveSec === 'introduction';
  const isExamplesSection = normActiveSec === 'examples';
  const isPracticeSection = normActiveSec === 'practice';
  const isPatternsSection = normActiveSec === 'patterns' && normalizedCode !== 'os';
  const isSummarySection = normActiveSec === 'summary';
  const isRevisionSection = normActiveSec === 'revision';
  const isNumericalsSection = normActiveSec === 'numericals';

  // Bestu Context Synchronization - Damped to fire only when section, topic, or subject actually change
  const { setPageContext } = useBestu();
  const lastContextKeyRef = useRef('');
  const availableSectionLabels = useMemo(() => effectiveSectionTabs.map((t) => t.label), [effectiveSectionTabs]);

  useEffect(() => {
    const contextKey = `${normalizedCode}|${activeTopicObj?.id}|${normActiveSec}`;
    if (lastContextKeyRef.current === contextKey) {
      return;
    }
    lastContextKeyRef.current = contextKey;

    setPageContext({
      route: `/subjects/${normalizedCode}?topic=${activeTopicObj.slug}&section=${normActiveSec}`,
      page: `${subjectConfig.name} Studio`,
      subject: subjectConfig.code,
      topic: activeTopicObj.title,
      topicId: activeTopicObj.id,
      section: currentTab.label || 'Introduction',
      sectionId: normActiveSec,
      availableSections: availableSectionLabels
    });
  }, [normalizedCode, activeTopicObj?.slug, activeTopicObj?.title, activeTopicObj?.id, normActiveSec, setPageContext, subjectConfig?.name, subjectConfig?.code, availableSectionLabels, currentTab?.label]);

  const Icon = subjectConfig.icon;

  return (
    <div className="w-full min-h-screen bg-[#F4EFE8] -m-4 sm:-m-6 lg:-m-8 p-3 sm:p-5 lg:p-6 space-y-4 select-none">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* ------------------------------------------------------------- */}
        {/* 1. TOP BREADCRUMB & NAVIGATION                                */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-[#475569]">
          <div className="flex items-center gap-2.5">
            {normalizedCode !== 'os' ? (
              <>
                <Link
                  to="/roadmap"
                  id="back-to-roadmap-link"
                  className="flex items-center gap-1.5 font-bold text-[#6574C4] hover:text-[#0F172A] transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Roadmap
                </Link>
                <span className="text-[#CBD5E1]">/</span>
                <Link
                  to="/subjects"
                  id="back-to-subjects-link"
                  className="font-bold text-[#475569] hover:text-[#0F172A] transition-colors"
                >
                  Core Subjects
                </Link>
              </>
            ) : (
              <Link
                to="/subjects"
                id="back-to-subjects-link"
                className="flex items-center gap-1.5 font-bold text-[#6574C4] hover:text-[#0F172A] transition-colors"
              >
                <ArrowLeft size={14} /> Back to Core Subjects
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span>Track: <strong className="text-[#0F172A] font-bold">{subjectConfig.trackName}</strong></span>
            <span className="px-2 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] font-bold">
              {subjectConfig.category}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. COMPACT SUBJECT HEADER                                     */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#D9D1C7] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6574C4]">
                  {subjectConfig.code} LEARNING STUDIO
                </span>
                <span className="text-[#D9D1C7]">&bull;</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Beginner to Placement Ready
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight flex items-center gap-2">
                <Icon size={22} className="text-[#6574C4]" />
                {subjectConfig.name} Studio
              </h1>
            </div>

            {normalizedCode !== 'os' && (
              <div className="flex items-center gap-2">
                <Link to="/roadmap">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFFDF9] border border-[#D9D1C7] text-[#0F172A] hover:bg-[#EDE9F6] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <Compass size={13} className="text-[#6574C4]" />
                    <span>Roadmap</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          <p className="text-xs text-[#334155] font-medium leading-relaxed max-w-3xl">
            {subjectConfig.description} Select any topic below to learn key principles, examine solved benchmark questions, practice problems, and study placement notes.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. TOPIC SELECTION MENU ({subjectConfig.topics.length} TOPICS)*/}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
              <Layers size={13} className="text-[#6574C4]" />
              Curriculum Topics ({subjectConfig.topics.length} Topics)
            </h3>
            <span className="text-xs text-[#475569]">
              Selected: <strong className="text-[#6574C4] font-black">{activeTopicObj.title}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {subjectConfig.topics.map((top, idx) => {
              const isSelected = activeTopicObj.id === top.id;

              return (
                <div
                  key={top.id}
                  id={`subject-topic-card-${top.slug}`}
                  onClick={() => handleTopicSelect(top)}
                  className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer shadow-2xs flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-2 border-[#6574C4] ring-2 ring-[#6574C4]/15 shadow-xs scale-[1.01]'
                      : 'bg-[#FFFDF9] border-[#D9D1C7] hover:border-[#6574C4] hover:bg-[#F8F4EE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#6574C4] text-white'
                          : 'bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-[#475569]">
                      {top.level}
                    </span>
                  </div>

                  <h4 className="text-xs font-extrabold text-[#0F172A] line-clamp-1">
                    {top.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. 5-SECTION LEARNING AREA (SCROLL TARGET)                     */}
        {/* ------------------------------------------------------------- */}
        <div
          id="subject-learning-section"
          ref={learningSectionRef}
          className="space-y-4 pt-2 scroll-mt-20 sm:scroll-mt-24"
        >
          {/* Section Navigation Header */}
          <div className="bg-[#F8F4EE] border border-[#D9D1C7] rounded-2xl p-2.5 sm:p-3 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#475569]">
                  Active Topic:
                </span>
                <span className="font-black text-[#0F172A] text-xs">
                  {activeTopicObj.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] text-[10px] font-black">
                  {subjectConfig.code} &bull; {activeTopicObj.level}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <AddNoteButton
                  subject={subjectConfig.code}
                  topicId={activeTopicObj.slug}
                  topicName={activeTopicObj.title}
                  section={activeSection}
                  size="sm"
                  variant="subtle"
                />
                <span className="text-[11px] font-bold text-[#6574C4]">
                  Section {activeTabIdx + 1} of {effectiveSectionTabs.length} &bull; {currentTab.label}
                </span>
              </div>
            </div>

            {/* Section Buttons Tablist */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0"
              role="tablist"
              aria-label={`${subjectConfig.code} ${effectiveSectionTabs.length} Learning Sections`}
            >
              {effectiveSectionTabs.map((sec) => {
                const isActive = sec.id === currentTab.id || normalizeSectionId(sec.id, normalizedCode) === normActiveSec;
                const TabIcon = sec.icon;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`subject-section-btn-${sec.id}`}
                    onClick={() => handleSectionSelect(sec.id)}
                    className={`flex-1 min-w-[130px] sm:min-w-0 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#6574C4] text-white shadow-xs'
                        : 'bg-[#FFFDF9] text-[#475569] hover:bg-[#EDE9F6] hover:text-[#0F172A] border border-[#D9D1C7]'
                    }`}
                  >
                    <TabIcon size={14} className={isActive ? 'text-white' : 'text-[#6574C4]'} />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 1: Introduction */}
          {isIntroSection && (
            normalizedCode === 'os' ? (
              <div className="space-y-4 animate-fadeIn">
                <OSIntroductionSection
                  topic={activeTopicObj}
                  onSelectTopic={handleTopicSelect}
                  allTopics={subjectConfig.topics}
                />
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
                  <div className="border-b border-[#E2D9CC] pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4]">
                      Concept Classroom
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                      {activeTopicObj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                      {activeTopicObj.summary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#475569]">
                      Core Principles &amp; Placement Essentials
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeTopicObj.keyPoints.map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3.5 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] flex items-start gap-2.5 text-xs text-[#1E293B]"
                        >
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[#6574C4] shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <span className="font-extrabold text-[#0F172A] block">Deep Technical Explanation</span>
                      <p className="text-[#334155] leading-relaxed font-medium">
                        {activeTopicObj.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Section 2: Problem Examples (OS Section 2 / Non-OS Section 2) */}
          {isExamplesSection && (
            normalizedCode === 'os' ? (
              <div className="space-y-4 animate-fadeIn">
                <OSProblemExamplesSection
                  topic={activeTopicObj}
                  onSelectTopic={handleTopicSelect}
                  allTopics={subjectConfig.topics}
                  onGoToNumericals={() => handleSectionSelect('numericals')}
                  onGoToPractice={() => handleSectionSelect('practice')}
                />
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
                  <div className="border-b border-[#E2D9CC] pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4]">
                      Section 2 &bull; Solved Benchmark Walkthrough
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                      {activeTopicObj.title} Solved Problems
                    </h3>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs text-[#334155] space-y-2">
                    <span className="font-extrabold text-[#0F172A] block">Benchmark Problem Scenario</span>
                    <p className="leading-relaxed font-medium">
                      Examine how <strong>{activeTopicObj.title}</strong> is queried, evaluated, and optimized in placement interviews.
                    </p>
                    <div className="font-mono text-[11px] bg-slate-900 text-emerald-400 p-3 rounded-lg overflow-x-auto">
                      {`-- Benchmark Query & Execution Pattern for ${activeTopicObj.title}\n-- Subject: ${subjectConfig.code}\nSELECT * FROM system_catalog WHERE concept = '${activeTopicObj.slug}';`}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Section 3: Practice Questions */}
          {isPracticeSection && (
            normalizedCode === 'os' ? (
              <div className="space-y-4 animate-fadeIn">
                <OSPracticeSection
                  topic={activeTopicObj}
                  onSelectTopic={handleTopicSelect}
                  allTopics={subjectConfig.topics}
                  onGoToRevision={() => handleSectionSelect('revision')}
                />
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
                  <div className="border-b border-[#E2D9CC] pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4]">
                      Section 3 &bull; Deliberate Practice Lab
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                      {activeTopicObj.title} Practice Exercises
                    </h3>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs text-[#334155] space-y-2">
                    <span className="font-extrabold text-[#0F172A] block">Interactive Questions</span>
                    <p className="leading-relaxed font-medium">
                      Solve questions on <strong>{activeTopicObj.title}</strong> to strengthen retention and evaluate speed.
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Section 4: Common Patterns (Non-OS) */}
          {isPatternsSection && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
                <div className="border-b border-[#E2D9CC] pb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4]">
                    Section 4 &bull; Architectural Patterns
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                    {activeTopicObj.title} Design Patterns &amp; Common Pitfalls
                  </h3>
                </div>
                <div className="p-4 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs text-[#334155] space-y-2">
                  <span className="font-extrabold text-[#0F172A] block">Design Rule &amp; Anti-Patterns</span>
                  <p className="leading-relaxed font-medium">
                    Recognize recurring design patterns and avoid common failure points when applying {activeTopicObj.title}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Summary & Notes */}
          {isSummarySection && (
            normalizedCode === 'os' ? (
              <div className="space-y-4 animate-fadeIn">
                <OSSummaryNotesSection
                  topic={activeTopicObj}
                  onSelectTopic={handleTopicSelect}
                  allTopics={subjectConfig.topics}
                  onGoToExamPrep={() => handleSectionSelect('revision')}
                />
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
                  <div className="border-b border-[#E2D9CC] pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6574C4]">
                      Section 5 &bull; Official Placement Revision &amp; My Notes
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                      {activeTopicObj.title} Summary Sheet
                    </h3>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8F4EE] border border-[#D9D1C7] text-xs text-[#334155] space-y-2">
                    <span className="font-extrabold text-[#0F172A] block">Rapid Revision Checklist</span>
                    <p className="leading-relaxed font-medium">
                      Review summary points, formulas, and your saved personal notes for {activeTopicObj.title}.
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Section 6: Revision & Exam Prep (OS Section 5) */}
          {isRevisionSection && normalizedCode === 'os' && (
            <div className="space-y-4 animate-fadeIn">
              <OSRevisionExamSection
                topic={activeTopicObj}
                onSelectTopic={handleTopicSelect}
                onGoToIntroduction={() => handleSectionSelect('introduction')}
              />
            </div>
          )}

          {/* Section 6: Numericals (OS Section 6) */}
          {isNumericalsSection && normalizedCode === 'os' && (
            <div className="space-y-4 animate-fadeIn">
              <OSNumericalsSection
                topic={activeTopicObj}
                onSelectTopic={handleTopicSelect}
                allTopics={subjectConfig.topics}
                onGoToExamples={() => handleSectionSelect('examples')}
              />
            </div>
          )}

          {/* Fallback Section (guarantees NO BLANK AREA on unknown section) */}
          {!isIntroSection && !isExamplesSection && !isPracticeSection && !isPatternsSection && !isSummarySection && !isRevisionSection && !isNumericalsSection && (
            <div className="space-y-4 animate-fadeIn">
              {normalizedCode === 'os' ? (
                <OSIntroductionSection
                  topic={activeTopicObj}
                  onSelectTopic={handleTopicSelect}
                  allTopics={subjectConfig.topics}
                />
              ) : (
                <div className="bg-[#FFFDF9] border border-[#D9D1C7] rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
                  <h3 className="text-xl font-black text-[#0F172A]">{activeTopicObj.title}</h3>
                  <p className="text-xs text-[#475569]">{activeTopicObj.summary}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
