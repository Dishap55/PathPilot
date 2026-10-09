const { getSupabaseClient } = require('../config/supabaseAdmin');

/**
 * PathPilot Learning Personalization Service
 *
 * Implements core personalization rules:
 * 1. Programming Language Personalization:
 *    - Source of truth: student_profiles.preferred_language
 *    - Supported: C++, Java, Python, C, JavaScript
 *    - Changes syntax/presentation/worked examples without altering underlying DSA concepts.
 *
 * 2. Visual Learning Support:
 *    - Selective determination of when a visual materially improves comprehension.
 *    - Structured combination: Concept -> Explanation -> Visual -> Example -> Question -> Feedback.
 *    - Subject-specific visuals for DBMS, OS, CN, OOPS, Aptitude, and DSA.
 */

// Algorithms repository for standard DSA concepts with equivalent multi-language implementations
const ALGORITHM_TEMPLATES = {
  binary_search: {
    name: 'Binary Search',
    complexity: 'O(log N) Time, O(1) Space',
    snippets: {
      'C++': `int binarySearch(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      'Java': `public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      'Python': `def binary_search(arr: list[int], target: int) -> int:
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      'C': `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      'JavaScript': `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
    }
  },

  two_pointers: {
    name: 'Two Pointers (Pair Sum in Sorted Array)',
    complexity: 'O(N) Time, O(1) Space',
    snippets: {
      'C++': `bool hasPairWithSum(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}`,
      'Java': `public boolean hasPairWithSum(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}`,
      'Python': `def has_pair_with_sum(arr: list[int], target: int) -> bool:
    left, right = 0, len(arr) - 1
    while left < right:
        curr_sum = arr[left] + arr[right]
        if curr_sum == target:
            return True
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return False`,
      'C': `int hasPairWithSum(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return 1;
        if (sum < target) left++;
        else right--;
    }
    return 0;
}`,
      'JavaScript': `function hasPairWithSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}`
    }
  }
};

// Visual catalog for naturally visual topics
const VISUAL_TOPICS = {
  DBMS: {
    normalization: {
      type: 'table_decomposition',
      description: 'Normalization decomposition from un-normalized/1NF to 2NF & 3NF',
      diagram: `[Unnormalized Table] ──(Decompose)──> [Students(StudentID, Name, DeptID)] + [Departments(DeptID, DeptName, Building)]`
    },
    er_diagrams: {
      type: 'er_model',
      description: 'Entity Relationship: Student to Course enrollment',
      diagram: `[Student] (1) ────< Enrolls In >──── (N) [Course]`
    },
    transactions: {
      type: 'state_machine',
      description: 'ACID Transaction Lifecycle States',
      diagram: `Active ──> Partially Committed ──> Committed\n   │                │\n   └──> Failed ────> Aborted`
    }
  },
  OS: {
    process_states: {
      type: 'state_diagram',
      description: 'Five-state process lifecycle',
      diagram: `New ──> Ready ──(Scheduler)──> Running ──> Terminated\n          ^                       │\n          └──(I/O Complete)── Waiting <──(I/O Wait)`
    },
    cpu_scheduling: {
      type: 'gantt_chart',
      description: 'CPU Scheduling Timeline Comparison (FCFS vs Round Robin)',
      diagram: `Timeline: | P1 (4ms) | P2 (3ms) | P3 (2ms) |`
    },
    paging: {
      type: 'memory_layout',
      description: 'Virtual Page to Physical Frame Translation via Page Table',
      diagram: `[Virtual Address: Page # | Offset] ──> [Page Table] ──> [Physical Frame # | Offset]`
    }
  },
  CN: {
    osi_layers: {
      type: 'layer_stack',
      description: 'OSI vs TCP/IP Layer Mapping',
      diagram: `Application (L7) -> Transport (TCP/UDP, L4) -> Network (IP, L3) -> Data Link (MAC, L2) -> Physical (L1)`
    },
    handshake: {
      type: 'sequence_diagram',
      description: 'TCP Three-Way Handshake Connection Establishment',
      diagram: `Client ──[ SYN (seq=x) ]──────────> Server\nClient <─[ SYN-ACK (ack=x+1) ]──── Server\nClient ──[ ACK (ack=y+1) ]────────> Server`
    }
  },
  OOPS: {
    inheritance: {
      type: 'class_hierarchy',
      description: 'Inheritance & Polymorphism class hierarchy',
      diagram: `        [ Vehicle ] (Base)\n             ▲\n     ┌───────┴───────┐\n  [ Car ]        [ Bike ]`
    }
  },
  DSA: {
    trees: {
      type: 'tree_diagram',
      description: 'Binary Search Tree Node Structure',
      diagram: `       ( 50 )\n      /      \\\n   ( 30 )    ( 70 )\n   /   \\     /   \\\n (20) (40) (60)  (80)`
    },
    linked_list: {
      type: 'linked_nodes',
      description: 'Singly Linked List with Head and Tail Pointers',
      diagram: `[Head] -> [Val: 10 | Next] -> [Val: 20 | Next] -> [Val: 30 | NULL]`
    }
  }
};

const personalizationService = {
  /**
   * Retrieves the authoritative personalization context for a student.
   * Uses student_profiles.preferred_language as the singular source of truth.
   */
  async getStudentContext(userId, subjectCode = 'DSA', token = null) {
    const client = getSupabaseClient(token);

    // 1. Retrieve student profile to get preferred_language
    const { data: profile } = await client
      .from('student_profiles')
      .select('id, full_name, preferred_language, target_company')
      .eq('id', userId)
      .maybeSingle();

    const preferredLanguage = profile?.preferred_language || 'C++';

    // 2. Resolve subject ID and student's starting proficiency level for that subject
    const { data: subject } = await client
      .from('subjects')
      .select('id, name, code')
      .eq('code', subjectCode)
      .maybeSingle();

    let studentLevel = 'Beginner';
    if (subject) {
      const { data: levelRecord } = await client
        .from('student_subject_levels')
        .select('level')
        .eq('student_id', userId)
        .eq('subject_id', subject.id)
        .maybeSingle();

      if (levelRecord?.level) {
        studentLevel = levelRecord.level;
      }
    }

    return {
      student_id: userId,
      full_name: profile?.full_name || 'Student',
      preferred_language: preferredLanguage,
      subject_code: subjectCode,
      subject_name: subject?.name || subjectCode,
      level: studentLevel,
      target_company: profile?.target_company || null
    };
  },

  /**
   * Returns a language-specific code implementation for a given algorithm.
   * Guarantees identical complexity, edge cases, and algorithmic structure.
   */
  getPersonalizedCodeExample(algorithmKey, language = 'C++') {
    const algo = ALGORITHM_TEMPLATES[algorithmKey] || ALGORITHM_TEMPLATES.binary_search;
    const snippet = algo.snippets[language] || algo.snippets['C++'] || algo.snippets['Java'];

    return {
      name: algo.name,
      complexity: algo.complexity,
      language,
      code: snippet
    };
  },

  /**
   * Returns code string directly for a given concept and language.
   */
  getPersonalizedCodeSnippet(conceptOrAlgo, language = 'C++') {
    const res = this.getPersonalizedCodeExample('binary_search', language);
    return res.code;
  },

  /**
   * Returns starter code template tailored to student's preferred language.
   */
  getStarterCode(topic, language = 'C++') {
    const lang = (language || 'C++').trim();
    if (lang === 'Python') {
      return 'class Solution:\n    def searchInsert(self, nums: list[int], target: int) -> int:\n        # Write your solution here\n        pass';
    }
    if (lang === 'Java') {
      return 'class Solution {\n    public int searchInsert(int[] nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n}';
    }
    if (lang === 'JavaScript') {
      return 'function searchInsert(nums, target) {\n  // Write your solution here\n  return -1;\n}';
    }
    return '#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n};';
  },

  /**
   * Determines if a concept / topic materially benefits from visual support.
   * Adheres to rule: "Use a visual when it helps understanding, not for every question."
   */
  getVisualSupport(subjectCode, topicKey) {
    if (!subjectCode || !topicKey) {
      return { isVisualRecommended: false };
    }

    const subjectCatalog = VISUAL_TOPICS[subjectCode.toUpperCase()];
    if (!subjectCatalog) {
      return { isVisualRecommended: false };
    }

    const normalizedTopicKey = topicKey.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const visual = subjectCatalog[normalizedTopicKey];

    if (visual) {
      return {
        isVisualRecommended: true,
        type: visual.type,
        description: visual.description,
        diagram: visual.diagram
      };
    }

    return { isVisualRecommended: false };
  }
};

module.exports = personalizationService;
