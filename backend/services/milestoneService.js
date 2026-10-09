const { getSupabaseClient, supabaseAdmin } = require('../config/supabaseAdmin');
const judge0Service = require('./judge0Service');
const sqlExecutionService = require('./sqlExecutionService');
const personalizationService = require('./personalizationService');

/**
 * PathPilot Milestone Learning & Practice Service
 *
 * Orchestrates:
 * 1. Milestone content delivery (Learn -> Understand -> Practice -> Feedback -> Progress).
 * 2. Strict student ownership (req.user.id) and milestone access control.
 * 3. Locked milestone boundary enforcement (locked milestones do not leak content).
 * 4. Authoritative topic curriculum and practice blueprint engine.
 * 5. Multi-modal practice execution (MCQ, Judge0 Coding, Read-Only SQL sandbox).
 * 6. Real-time topic progress updates in public.topic_progress.
 * 7. Server-side milestone completion validation and sequential dynamic unlocking in public.roadmap_levels.
 */

// In-memory session store for temporary milestone practice attempts
const milestoneAttemptStore = new Map();

/**
 * Authoritative Milestone Curriculum Blueprints
 * Used to deliver rich, verifiable curriculum when public.notes / public.questions are empty.
 */
const CURRICULUM_BLUEPRINTS = {
  DBMS: {
    title: 'SQL Joins & Grouping Aggregations',
    subject: 'DBMS',
    concept: 'Relational Joins, Group By, Having Clauses & Aggregation Functions',
    why_selected: 'Diagnosed as a high-priority repair area during your diagnostic assessment to build strong relational data fluency.',
    learning_objectives: [
      'Master INNER, LEFT, RIGHT, and FULL OUTER JOIN mechanics',
      'Understand execution ordering: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT',
      'Aggregate effectively with COUNT, SUM, AVG, and filtering via HAVING'
    ],
    explanation: 'SQL Joins combine columns from one or more tables based on a related column between them. Grouping aggregations collapse multiple rows into summary metrics per group. Filtering on grouped aggregates must be performed using HAVING, not WHERE.',
    syntax: 'SELECT d.name, COUNT(e.id) AS emp_count, AVG(e.salary) AS avg_sal\nFROM departments d\nLEFT JOIN employees e ON d.id = e.department_id\nGROUP BY d.name\nHAVING COUNT(e.id) >= 2\nORDER BY avg_sal DESC;',
    edge_cases: [
      'Null values in foreign key columns during INNER JOIN (rows silently omitted)',
      'Difference between COUNT(*) and COUNT(column_name) with NULLs',
      'Cartesian products caused by missing or incomplete JOIN ON predicates'
    ],
    placement_patterns: 'Frequently tested in technical interview rounds for tech companies (Google, Amazon, Microsoft) through scenario queries requiring multi-table aggregation.',
    practice: {
      mcq: {
        id: 'pmcq-dbms-01',
        type: 'mcq',
        topic: 'SQL Joins & Grouping',
        difficulty: 'Medium',
        prompt: 'In SQL query execution, which clause is evaluated AFTER the GROUP BY clause to filter groups based on aggregate conditions?',
        options: [
          'WHERE clause',
          'HAVING clause',
          'ORDER BY clause',
          'JOIN ON predicate'
        ],
        correct_option: 1,
        explanation: 'HAVING is specifically designed to filter groups produced by GROUP BY based on aggregate functions. WHERE filters individual rows before grouping takes place.',
        same_logic_hint: 'Remember: WHERE filters individual records before grouping; HAVING filters aggregated groups.'
      },
      sql: {
        id: 'psql-dbms-02',
        type: 'sql',
        topic: 'SQL Joins & Grouping',
        difficulty: 'Medium',
        prompt: 'Write a SQL query to list all department names and their total employee count from the departments and employees tables. Include departments even if they have 0 employees.',
        schema_context: 'Tables:\n- departments (id INT PRIMARY KEY, name VARCHAR(50))\n- employees (id INT PRIMARY KEY, department_id INT, name VARCHAR(50), salary INT)',
        sample_solution: 'SELECT d.name, COUNT(e.id) AS employee_count FROM departments d LEFT JOIN employees e ON d.id = e.department_id GROUP BY d.name;',
        hint: 'Use a LEFT JOIN from departments to employees so departments with no employees are preserved, and count e.id instead of *.'
      }
    }
  },
  DSA: {
    title: 'Binary Search & Monotonic Arrays',
    subject: 'DSA',
    concept: 'Binary Search Algorithm, Invariant Boundaries, and Monotonic Conditions',
    why_selected: 'Core problem-solving foundation tested across almost all Tier-1 and product placement rounds.',
    learning_objectives: [
      'Establish search space and monotonic predicate condition',
      'Handle boundary conditions safely without infinite while loops',
      'Compute mid-point safely avoiding integer overflow'
    ],
    explanation: 'Binary search finds the position of a target value within a sorted or monotonic array by repeatedly halving the search interval. Its logarithmic O(log N) time complexity makes it fundamentally superior to linear search.',
    syntax: '// Language-specific syntax generated dynamically based on preferred_language',
    edge_cases: [
      'Integer overflow when computing mid = (low + high) / 2 -> use low + (high - low) / 2',
      'Arrays with 0 or 1 element',
      'Search space boundary termination: low <= high vs low < high',
      'Duplicate elements when searching for lower_bound or upper_bound'
    ],
    placement_patterns: 'Extremely popular pattern for Google, Amazon, and Uber interviews, often disguised as "Binary Search on Answer" or "Minimum Capacity" problems.',
    practice: {
      mcq: {
        id: 'pmcq-dsa-01',
        type: 'mcq',
        topic: 'Binary Search & Complexity',
        difficulty: 'Easy',
        prompt: 'Why is `mid = low + (high - low) / 2` preferred over `mid = (low + high) / 2` in typed programming languages like C++, Java, and C#?',
        options: [
          'It executes in fewer CPU clock cycles',
          'It prevents integer overflow when low + high exceeds the maximum integer limit',
          'It allows searching descending arrays automatically',
          'It automatically handles odd array lengths'
        ],
        correct_option: 1,
        explanation: 'In 32-bit signed integers, if low + high exceeds 2^31 - 1, it overflows to a negative value. Using low + (high - low) / 2 mathematically prevents this overflow.',
        same_logic_hint: 'Think about maximum allowable values for 32-bit integers in typed runtimes.'
      },
      coding: {
        id: 'pcode-dsa-02',
        type: 'coding',
        topic: 'Binary Search',
        difficulty: 'Medium',
        prompt: 'Given a sorted array of distinct integers `nums` and a target value `target`, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
        test_cases: [
          { input: '[1,3,5,6], target = 5', expected: '2' },
          { input: '[1,3,5,6], target = 2', expected: '1' },
          { input: '[1,3,5,6], target = 7', expected: '4' }
        ]
      }
    }
  },
  CN: {
    title: 'TCP/IP Transport Protocols & Flow Control',
    subject: 'CN',
    concept: 'Transmission Control Protocol (TCP), Three-Way Handshake, Flow & Congestion Control',
    why_selected: 'Diagnosed as a target gap in computer networks fundamentals during diagnostic evaluation.',
    learning_objectives: [
      'Understand SYN -> SYN-ACK -> ACK three-way handshake sequence',
      'Differentiate Flow Control (Sliding Window) from Congestion Control (AIMD)',
      'Compare TCP reliable byte-stream guarantees against UDP datagram transmission'
    ],
    explanation: 'TCP provides reliable, ordered, and error-checked delivery of a stream of octets between applications. It uses sequence numbers, acknowledgments, sliding window flow control, and slow-start/congestion-avoidance algorithms.',
    syntax: 'TCP Header Format: Source Port (16b) | Dest Port (16b) | Sequence No (32b) | Ack No (32b) | Flags [SYN, ACK, FIN, RST, PSH, URG]',
    edge_cases: [
      'SYN flood attacks exhausting backlog connection queues',
      'Silly window syndrome when receiver advertises small buffer space',
      'TIME_WAIT state duration (2 * MSL) preventing delayed segment collision'
    ],
    placement_patterns: 'Core networking interview question for backend software engineering and systems roles.',
    practice: {
      mcq: {
        id: 'pmcq-cn-01',
        type: 'mcq',
        topic: 'Transport Protocols',
        difficulty: 'Medium',
        prompt: 'In TCP connection establishment, which flag sequence correctly represents the client-server 3-way handshake?',
        options: [
          'SYN -> ACK -> SYN-ACK',
          'SYN -> SYN-ACK -> ACK',
          'ACK -> SYN -> ACK-SYN',
          'FIN -> ACK -> FIN-ACK'
        ],
        correct_option: 1,
        explanation: 'Client sends SYN, Server responds with SYN-ACK, Client completes handshake with ACK.',
        same_logic_hint: 'Client initiates with SYN, receiver acknowledges and synchronizes (SYN-ACK), client finishes with ACK.'
      }
    }
  },
  OOPS: {
    title: 'OOP Design Principles & Encapsulation',
    subject: 'OOPS',
    concept: 'Virtual Dispatch, Polymorphism, Abstraction & SOLID Design Principles',
    why_selected: 'Essential software design competency for scalable system development and coding interviews.',
    learning_objectives: [
      'Differentiate runtime vs compile-time polymorphism',
      'Master interface-based programming and loose coupling',
      'Apply Single Responsibility and Open-Closed principles'
    ],
    explanation: 'Object-Oriented Programming models systems as collections of interacting objects that encapsulate state and behavior. Dynamic polymorphism enables subclasses to provide custom implementations of polymorphic interfaces.',
    syntax: 'class Shape { public: virtual double area() const = 0; }; // Pure virtual interface',
    edge_cases: [
      'Diamond inheritance ambiguity in multiple inheritance (solved with virtual base classes in C++)',
      'Object slicing when passing derived objects by value rather than pointer/reference',
      'Memory leaks from non-virtual base destructors'
    ],
    placement_patterns: 'Standard low-level design (LLD) interview topic for tech roles.',
    practice: {
      mcq: {
        id: 'pmcq-oops-01',
        type: 'mcq',
        topic: 'Polymorphism & Design',
        difficulty: 'Medium',
        prompt: 'Why should a base class containing virtual methods always declare a virtual destructor in C++?',
        options: [
          'To increase heap memory allocation performance',
          'To ensure the derived class destructor is invoked when deleting a derived object through a base pointer',
          'To prevent subclasses from overriding base methods',
          'It is required by the compiler for all classes'
        ],
        correct_option: 1,
        explanation: 'Without a virtual destructor, deleting a derived object via a base pointer causes undefined behavior and leaks derived class resources.',
        same_logic_hint: 'Consider what happens to resources allocated by derived classes when deleted via base pointer.'
      }
    }
  },
  OS: {
    title: 'Virtual Memory Paging & Replacement',
    subject: 'OS',
    concept: 'Paging Architecture, Page Fault Handling & Replacement Algorithms (LRU, FIFO, Optimal)',
    why_selected: 'Core computer science systems knowledge tested during technical rounds.',
    learning_objectives: [
      'Understand Virtual Address translation using Page Tables and TLB',
      'Analyze Page Fault trap handling lifecycle',
      'Compare LRU, FIFO, and Optimal page replacement algorithms'
    ],
    explanation: 'Virtual memory creates the illusion of a large contiguous memory address space. Pages in virtual memory map to physical frames via page tables, with the TLB acting as a hardware cache for fast address translation.',
    syntax: 'Virtual Address = [ Page Number (p) | Offset (d) ] -> TLB Hit / Page Table -> Physical Frame',
    edge_cases: [
      'Belady\'s Anomaly in FIFO page replacement (more frames causing more page faults)',
      'Thrashing when the working set of active processes exceeds physical memory',
      'TLB shootdown overhead in multi-core systems'
    ],
    placement_patterns: 'High-frequency systems question for Google, Microsoft, and Qualcomm technical rounds.',
    practice: {
      mcq: {
        id: 'pmcq-os-01',
        type: 'mcq',
        topic: 'Virtual Memory',
        difficulty: 'Medium',
        prompt: 'Which page replacement algorithm suffers from Belady\'s Anomaly, where increasing the number of page frames can result in an increase in page faults?',
        options: [
          'Least Recently Used (LRU)',
          'First-In, First-Out (FIFO)',
          'Optimal Page Replacement (OPT)',
          'Least Frequently Used (LFU)'
        ],
        correct_option: 1,
        explanation: 'FIFO does not belong to the class of stack algorithms, which means the set of pages in a smaller memory is not necessarily a subset of pages in a larger memory.',
        same_logic_hint: 'Belady\'s Anomaly is uniquely characteristic of simple queue-based replacement.'
      }
    }
  },
  APT: {
    title: 'Logical Deduction & Sequence Puzzles',
    subject: 'APT',
    concept: 'Analytical Reasoning, Pattern Sequences & Critical Deductions',
    why_selected: 'First-round placement screening round filter used by campus recruiters.',
    learning_objectives: [
      'Identify arithmetic, geometric, and alternating sequence patterns',
      'Construct truth tables and deduction matrices for logical puzzle solving',
      'Maximize speed and elimination accuracy under strict time constraints'
    ],
    explanation: 'Logical aptitude tests pattern recognition and deductive inference. Systematic modeling of constraints using deduction tables eliminates guessing and boosts speed.',
    syntax: 'Pattern Rule: T(n) = T(n-1) * 2 - 1 | Alternating Series: a, b, a+d1, b+d2...',
    edge_cases: [
      'Multiple valid patterns in short sequences - look for simplest common rule',
      'Negative or fractional sequence terms',
      'Constraint contradictions in logic puzzles'
    ],
    placement_patterns: 'Standard component of online assessment (OA) screening tests.',
    practice: {
      mcq: {
        id: 'pmcq-apt-01',
        type: 'mcq',
        topic: 'Sequence Reasoning',
        difficulty: 'Easy',
        prompt: 'What is the next number in the series: 3, 7, 15, 31, 63, ...?',
        options: [
          '125',
          '127',
          '128',
          '129'
        ],
        correct_option: 1,
        explanation: 'Each term is generated by (previous * 2) + 1: 63 * 2 + 1 = 127. Alternatively, the sequence represents 2^(n+1) - 1.',
        same_logic_hint: 'Notice that each term is one less than a power of 2.'
      }
    }
  }
};

const milestoneService = {
  /**
   * Retrieves milestone detail, verifying student ownership and locked status.
   */
  async getMilestone(milestoneId, userId, token) {
    const client = getSupabaseClient(token);

    // 1. Fetch milestone level from public.roadmap_levels
    let level = null;
    try {
      const { data: dbLevel } = await client
        .from('roadmap_levels')
        .select('*')
        .eq('id', milestoneId)
        .maybeSingle();

      if (dbLevel) level = dbLevel;
    } catch (e) {
      console.warn('[Milestone Service] Level lookup error:', e.message);
    }

    // Fallback: check roadmapCache if not found in DB
    if (!level) {
      const roadmapService = require('./roadmapService');
      const active = await roadmapService.getRoadmap(userId, token);
      if (active?.roadmap?.levels) {
        level = active.roadmap.levels.find(l => l.id === milestoneId);
      }
    }

    if (!level) {
      const error = new Error('Milestone not found.');
      error.statusCode = 404;
      throw error;
    }

    // 2. Enforce student ownership via parent roadmap
    if (level.roadmap_id) {
      const { data: parentRoadmap } = await client
        .from('roadmap')
        .select('student_id, target_date')
        .eq('id', level.roadmap_id)
        .maybeSingle();

      if (parentRoadmap && parentRoadmap.student_id !== userId) {
        const error = new Error('Forbidden: You do not have permission to access another student\'s milestone.');
        error.statusCode = 403;
        throw error;
      }
    }

    // Parse milestone metadata
    let meta = {};
    try {
      meta = typeof level.prerequisite_ref === 'string' ? JSON.parse(level.prerequisite_ref) : (level.prerequisite_ref || {});
    } catch (e) {
      meta = {};
    }

    const subjectCode = meta.subject || level.subject || 'DSA';
    const topicTitle = meta.topic || level.topic || 'Practice Milestone';
    const stage = meta.stage || level.stage || (level.sequence_no === 1 ? 'Weak Topic Repair' : 'Core Practice');

    // 3. Locked Milestone Boundary Enforcement
    if (level.status === 'locked') {
      return {
        success: true,
        isLocked: true,
        milestone: {
          id: level.id,
          roadmap_id: level.roadmap_id,
          sequence_no: level.sequence_no,
          status: 'locked',
          subject: subjectCode,
          topic: topicTitle,
          stage: stage
        },
        message: 'This milestone is locked. Complete the previous milestone to continue.'
      };
    }

    // 4. Milestone is UNLOCKED or COMPLETED: Load rich curriculum & progress
    // Fetch student's preferred language and profile context
    let preferredLanguage = 'C++';
    try {
      const { data: profile } = await client
        .from('student_profiles')
        .select('preferred_language, target_company')
        .eq('id', userId)
        .maybeSingle();

      if (profile?.preferred_language) {
        preferredLanguage = profile.preferred_language;
      }
    } catch (pErr) {}

    // Check public.notes table first
    let noteContent = null;
    try {
      if (level.topic_id) {
        const { data: dbNotes } = await client
          .from('notes')
          .select('title, content_ref')
          .eq('topic_id', level.topic_id)
          .eq('active', true)
          .maybeSingle();

        if (dbNotes) {
          noteContent = dbNotes.content_ref;
        }
      }
    } catch (nErr) {}

    // Retrieve blueprint for subject
    const blueprint = CURRICULUM_BLUEPRINTS[subjectCode] || CURRICULUM_BLUEPRINTS.DSA;

    // Generate personalized language demonstration
    const codeExample = personalizationService.getPersonalizedCodeSnippet(
      blueprint.concept,
      preferredLanguage
    );

    // Fetch existing progress from public.topic_progress
    let progressRecord = {
      attempted_count: 0,
      completed_count: level.status === 'completed' ? 1 : 0,
      correct_count: 0,
      wrong_count: 0,
      accuracy: 0
    };

    if (level.topic_id) {
      try {
        const { data: dbProgress } = await client
          .from('topic_progress')
          .select('attempted_count, completed_count, correct_count, wrong_count, accuracy')
          .eq('student_id', userId)
          .eq('topic_id', level.topic_id)
          .maybeSingle();

        if (dbProgress) {
          progressRecord = {
            ...progressRecord,
            ...dbProgress
          };
        }
      } catch (prErr) {}
    }

    return {
      success: true,
      isLocked: false,
      milestone: {
        id: level.id,
        roadmap_id: level.roadmap_id,
        topic_id: level.topic_id,
        sequence_no: level.sequence_no,
        status: level.status,
        subject: subjectCode,
        topic: topicTitle,
        stage: stage,
        estimated_days: meta.estimated_days || 14,
        unlocked_at: level.unlocked_at,
        completed_at: level.completed_at
      },
      content: {
        title: topicTitle,
        subject: subjectCode,
        concept: blueprint.concept,
        why_selected: meta.focus || blueprint.why_selected,
        learning_objectives: blueprint.learning_objectives,
        explanation: noteContent || blueprint.explanation,
        syntax: blueprint.syntax,
        code_example: codeExample,
        edge_cases: blueprint.edge_cases,
        placement_patterns: blueprint.placement_patterns,
        preferred_language: preferredLanguage
      },
      progress: progressRecord
    };
  },

  /**
   * Retrieves practice exercises for an unlocked milestone.
   * Strips answer keys to prevent leaking solutions.
   */
  async getPracticeQuestions(milestoneId, userId, token) {
    const milestoneData = await this.getMilestone(milestoneId, userId, token);

    if (milestoneData.isLocked) {
      const error = new Error('Forbidden: Cannot access practice for a locked milestone.');
      error.statusCode = 403;
      throw error;
    }

    const subject = milestoneData.milestone.subject;
    const blueprint = CURRICULUM_BLUEPRINTS[subject] || CURRICULUM_BLUEPRINTS.DSA;
    const preferredLanguage = milestoneData.content.preferred_language || 'C++';

    // Construct questions without leaking answer keys
    const questions = [];

    // 1. Conceptual MCQ
    if (blueprint.practice?.mcq) {
      const q = blueprint.practice.mcq;
      questions.push({
        id: q.id,
        type: 'mcq',
        topic: q.topic,
        difficulty: q.difficulty,
        prompt: q.prompt,
        options: q.options
        // correct_option, explanation, and answers are STRIPPED
      });
    }

    // 2. Practical Coding Exercise (for DSA)
    if (blueprint.practice?.coding) {
      const c = blueprint.practice.coding;
      const starterCode = personalizationService.getStarterCode(c.topic, preferredLanguage);
      questions.push({
        id: c.id,
        type: 'coding',
        topic: c.topic,
        difficulty: c.difficulty,
        prompt: c.prompt,
        language: preferredLanguage,
        starter_code: starterCode,
        sample_input: c.test_cases?.[0]?.input || '[1,3,5,6], target = 5',
        sample_output: c.test_cases?.[0]?.expected || '2'
      });
    }

    // 3. Practical SQL Exercise (for DBMS)
    if (blueprint.practice?.sql) {
      const s = blueprint.practice.sql;
      questions.push({
        id: s.id,
        type: 'sql',
        topic: s.topic,
        difficulty: s.difficulty,
        prompt: s.prompt,
        schema_context: s.schema_context,
        starter_query: '-- Write your SQL solution below\nSELECT '
      });
    }

    return {
      success: true,
      milestoneId,
      subject,
      topic: milestoneData.milestone.topic,
      preferred_language: preferredLanguage,
      questions
    };
  },

  /**
   * Evaluates practice attempt (MCQ, Judge0 Coding, or SQL Sandbox) and updates topic_progress.
   */
  async submitAttempt(milestoneId, userId, payload, token) {
    const client = getSupabaseClient(token);

    // Enforce student identity - reject spoofing
    if (payload.student_id && payload.student_id !== userId) {
      const err = new Error('Bad Request: Supplying or spoofing student_id is forbidden.');
      err.statusCode = 400;
      throw err;
    }

    const milestoneData = await this.getMilestone(milestoneId, userId, token);
    if (milestoneData.isLocked) {
      const error = new Error('Forbidden: Cannot submit attempt on a locked milestone.');
      error.statusCode = 403;
      throw error;
    }

    const { question_id, question_type, selected_option, code, language, sql_query } = payload;
    const subject = milestoneData.milestone.subject;
    const blueprint = CURRICULUM_BLUEPRINTS[subject] || CURRICULUM_BLUEPRINTS.DSA;

    let evaluation = null;
    let isCorrect = false;

    // 1. Evaluate MCQ
    if (question_type === 'mcq') {
      const mcqRef = blueprint.practice?.mcq;
      const expectedOption = mcqRef?.correct_option ?? 1;
      isCorrect = Number(selected_option) === expectedOption;

      evaluation = {
        question_id,
        type: 'mcq',
        is_correct: isCorrect,
        explanation: mcqRef?.explanation || 'Evaluation completed based on concept ground truth.',
        same_logic_hint: isCorrect ? null : mcqRef?.same_logic_hint
      };
    }
    // 2. Evaluate Coding via Judge0
    else if (question_type === 'coding') {
      const userCode = code || '';
      const userLang = language || milestoneData.content.preferred_language || 'C++';

      let judgeResult = null;
      try {
        judgeResult = await judge0Service.executeCode({
          source_code: userCode,
          language: userLang,
          stdin: '5\n1 3 5 6 7'
        });
      } catch (jErr) {
        judgeResult = {
          status: 'Wrong Answer',
          stdout: null,
          stderr: jErr.message || 'Execution error in sandbox',
          runtime_ms: 0,
          memory_kb: 0
        };
      }

      isCorrect = judgeResult.status === 'Accepted';
      evaluation = {
        question_id,
        type: 'coding',
        is_correct: isCorrect,
        status: judgeResult.status,
        stdout: judgeResult.stdout,
        stderr: judgeResult.stderr || null,
        runtime_ms: judgeResult.runtime_ms,
        memory_kb: judgeResult.memory_kb,
        explanation: isCorrect ? 'Solution passed test evaluation cleanly.' : 'Runtime mismatch or logic error encountered.'
      };
    }
    // 3. Evaluate SQL via Sandbox
    else if (question_type === 'sql') {
      const userQuery = sql_query || '';
      let sqlResult = null;

      try {
        sqlResult = await sqlExecutionService.executeReadOnlyQuery({
          sqlQuery: userQuery,
          studentId: userId
        });
      } catch (sErr) {
        sqlResult = {
          success: false,
          error: sErr.message || 'SQL execution failed in sandbox',
          columns: [],
          rows: [],
          rowCount: 0
        };
      }

      isCorrect = sqlResult.success === true;
      evaluation = {
        question_id,
        type: 'sql',
        is_correct: isCorrect,
        columns: sqlResult.columns || [],
        rows: sqlResult.rows || [],
        rowCount: sqlResult.rowCount || 0,
        explanation: isCorrect ? 'SQL query executed successfully in read-only sandbox.' : sqlResult.error
      };
    } else {
      const err = new Error('Invalid question_type specified.');
      err.statusCode = 400;
      throw err;
    }

    // 4. Update public.topic_progress
    const topicId = milestoneData.milestone.topic_id;
    let updatedProgress = null;

    if (topicId) {
      try {
        const { data: existingProgress } = await supabaseAdmin
          .from('topic_progress')
          .select('*')
          .eq('student_id', userId)
          .eq('topic_id', topicId)
          .maybeSingle();

        const prevAttempted = existingProgress?.attempted_count || 0;
        const prevCorrect = existingProgress?.correct_count || 0;
        const prevWrong = existingProgress?.wrong_count || 0;
        const prevCompleted = existingProgress?.completed_count || 0;

        const newAttempted = prevAttempted + 1;
        const newCorrect = prevCorrect + (isCorrect ? 1 : 0);
        const newWrong = prevWrong + (isCorrect ? 0 : 1);
        const newAccuracy = Math.round((newCorrect / newAttempted) * 100);

        const { data: upserted } = await supabaseAdmin
          .from('topic_progress')
          .upsert({
            student_id: userId,
            topic_id: topicId,
            attempted_count: newAttempted,
            completed_count: prevCompleted,
            correct_count: newCorrect,
            wrong_count: newWrong,
            accuracy: newAccuracy,
            total_practice_seconds: (existingProgress?.total_practice_seconds || 0) + 60,
            last_practiced_at: new Date().toISOString()
          }, { onConflict: 'student_id,topic_id' })
          .select('*')
          .single();

        updatedProgress = upserted;
      } catch (tpErr) {
        console.warn('[Milestone Service] topic_progress update notice:', tpErr.message);
      }
    }

    // Record session attempt history
    const sessionAttempts = milestoneAttemptStore.get(`${userId}:${milestoneId}`) || [];
    sessionAttempts.push({
      question_id,
      isCorrect,
      submitted_at: new Date().toISOString()
    });
    milestoneAttemptStore.set(`${userId}:${milestoneId}`, sessionAttempts);

    // Persist to public.question_attempts if question_id is a valid UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(question_id);
    if (isUuid) {
      try {
        await supabaseAdmin
          .from('question_attempts')
          .insert({
            student_id: userId,
            question_id: question_id,
            result: isCorrect ? 'correct' : 'wrong',
            code_submission_ref: question_type === 'coding' ? code : null,
            sql_submission_ref: question_type === 'sql' ? sql_query : null,
            feedback_state: evaluation?.explanation || 'Practice evaluated',
            time_spent: 30
          });
      } catch (qaErr) {
        console.warn('[Milestone Service] question_attempts persistence notice:', qaErr.message);
      }
    }

    return {
      success: true,
      milestoneId,
      evaluation,
      progress: updatedProgress || {
        attempted_count: sessionAttempts.length,
        correct_count: sessionAttempts.filter(a => a.isCorrect).length,
        accuracy: Math.round((sessionAttempts.filter(a => a.isCorrect).length / sessionAttempts.length) * 100)
      }
    };
  },

  /**
   * Completes current milestone and dynamically unlocks the next sequence step.
   * Backend-controlled: verifies student practice activity before unlocking.
   */
  async completeMilestone(milestoneId, userId, token) {
    const milestoneData = await this.getMilestone(milestoneId, userId, token);

    if (milestoneData.isLocked) {
      const error = new Error('Forbidden: Cannot complete a locked milestone.');
      error.statusCode = 403;
      throw error;
    }

    const currentLevel = milestoneData.milestone;

    // Idempotent check
    if (currentLevel.status === 'completed') {
      return {
        success: true,
        message: 'Milestone is already completed.',
        completedMilestone: currentLevel
      };
    }

    // Verify completion rule: Student must have practiced at least 1 exercise
    const sessionKey = `${userId}:${milestoneId}`;
    const sessionAttempts = milestoneAttemptStore.get(sessionKey) || [];
    const topicProgressAttempted = milestoneData.progress?.attempted_count || 0;

    if (sessionAttempts.length === 0 && topicProgressAttempted === 0) {
      const error = new Error('Cannot complete milestone: Please attempt the practice questions before completing this milestone.');
      error.statusCode = 400;
      throw error;
    }

    // 1. Mark current milestone completed using supabaseAdmin (RLS restricted)
    const now = new Date().toISOString();

    let updatedCurrent = null;
    try {
      const { data: dbCurrent } = await supabaseAdmin
        .from('roadmap_levels')
        .update({
          status: 'completed',
          completed_at: now
        })
        .eq('id', milestoneId)
        .select('*')
        .single();

      updatedCurrent = dbCurrent;
    } catch (cErr) {
      console.warn('[Milestone Service] DB complete error:', cErr.message);
    }

    // 2. Dynamically unlock the next milestone in sequence
    const nextSeq = currentLevel.sequence_no + 1;
    let nextMilestone = null;

    try {
      // Find next level in this roadmap
      const { data: dbNext } = await supabaseAdmin
        .from('roadmap_levels')
        .select('*')
        .eq('roadmap_id', currentLevel.roadmap_id)
        .eq('sequence_no', nextSeq)
        .maybeSingle();

      if (dbNext) {
        const { data: unlockedNext } = await supabaseAdmin
          .from('roadmap_levels')
          .update({
            status: 'unlocked',
            unlocked_at: now
          })
          .eq('id', dbNext.id)
          .select('*')
          .single();

        let nextMeta = {};
        try {
          nextMeta = JSON.parse(unlockedNext.prerequisite_ref || '{}');
        } catch (e) {}

        nextMilestone = {
          id: unlockedNext.id,
          sequence_no: unlockedNext.sequence_no,
          status: 'unlocked',
          subject: nextMeta.subject || 'DSA',
          topic: nextMeta.topic || 'Next Practice Milestone'
        };
      }
    } catch (nErr) {
      console.warn('[Milestone Service] Next level unlock notice:', nErr.message);
    }

    // 3. Update completed_count in public.topic_progress
    if (currentLevel.topic_id) {
      try {
        const { data: exProgress } = await supabaseAdmin
          .from('topic_progress')
          .select('completed_count')
          .eq('student_id', userId)
          .eq('topic_id', currentLevel.topic_id)
          .maybeSingle();

        await supabaseAdmin
          .from('topic_progress')
          .upsert({
            student_id: userId,
            topic_id: currentLevel.topic_id,
            completed_count: (exProgress?.completed_count || 0) + 1,
            last_practiced_at: now
          }, { onConflict: 'student_id,topic_id' });
      } catch (tErr) {}
    }

    return {
      success: true,
      message: 'Milestone completed successfully. Next milestone unlocked.',
      completedMilestone: {
        id: milestoneId,
        sequence_no: currentLevel.sequence_no,
        status: 'completed',
        completed_at: now
      },
      nextMilestone
    };
  }
};

module.exports = milestoneService;
